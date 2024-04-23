import { classData, readCSVData } from "./restrictions.js"
import rooms from "./uploads/rooms.json" assert {type: "json"}

await readCSVData()

let allRooms = Object.keys(rooms)

classData.forEach(course => { course.setPossibleRooms(allRooms) })

//Following code removes any classes with non-unique names from the list
const uniqueNames = {};
let uniqueClassData = classData.filter(obj => {
    if (!uniqueNames[obj.name]) {
        uniqueNames[obj.name] = true;
        return true;
    }
    return false;
});

function convertTimeToHHMM(timeString) {
    // Split the time string into hours and minutes
    const [hourString, minuteString] = timeString.split(/:|(?=[ap]m)/i);

    // Convert hours to 24-hour format
    let hour = parseInt(hourString);
    const isPM = /pm/i.test(timeString);
    if (isPM && hour !== 12) {
        hour += 12;
    } else if (!isPM && hour === 12) {
        hour = 0;
    }

    // Pad minutes with leading zero if necessary
    const minute = minuteString ? minuteString.padStart(2, '0') : '00';

    // Return the formatted time
    return `${hour.toString().padStart(2, '0')}:${minute}`;
}

class CourseAssignCSP {
    constructor(courses, allRooms) {
        this.courses = courses
        this.arcs = []
        this.allRooms = allRooms
    }

    buildArcs() {

        for (let i = 0; i < this.courses.length; i++) {
            for (let j = 1; j < this.courses.length; j++) {

                let courseA = this.courses[i]
                let courseB = this.courses[j]

                let courseAStartTime = convertTimeToHHMM(courseA.meetingDates[0].startTime)
                let courseAEndTime = convertTimeToHHMM(courseA.meetingDates[0].endTime)
                let courseBStartTime = convertTimeToHHMM(courseB.meetingDates[0].startTime)
                let courseBEndTime = convertTimeToHHMM(courseB.meetingDates[0].endTime)

                if (courseBStartTime < courseAEndTime && courseAStartTime < courseBEndTime) {
                    courseA.neighbors.push(courseB)
                    courseB.neighbors.push(courseA)
                    this.arcs.push([courseA, courseB])
                }
            }
        }
    }
}

let CSPProblem = new CourseAssignCSP(uniqueClassData, allRooms)

CSPProblem.buildArcs()

//Assignment functions begin here

function backtrackingSearch(csp) {
    return recursiveBacktrackingSearch({}, csp)
}

function recursiveBacktrackingSearch(assignment, csp) {
    if (isComplete(assignment, csp)) {
        return assignment
    }

    const selectedCourse = selectCourseMRV(assignment, csp)
    const orderedRooms = orderDomainValues(selectedCourse, selectedCourse.possibleRooms, assignment, csp)

    for (let room of orderedRooms) {

        if (isConsistent(selectedCourse, room, assignment, csp)) {
            assignment[selectedCourse.name] = room

            if (arc_consistency(assignment, csp)) {
                let result = recursiveBacktrackingSearch(assignment, csp)
                if (result) {
                    return result
                }
            }

            delete assignment[selectedCourse.name]
        }
    }

    return null
}

function isComplete(assignment, csp) {
    console.log(Object.keys(assignment).length)
    return Object.keys(assignment).length === csp.courses.length
}

function selectCourseMRV(assignment, csp) {
    const unassignedCourses = csp.courses.filter(course => !(course.name in assignment))

    return unassignedCourses.reduce((minCourse, course) => {
        return course.possibleRooms.length < minCourse.possibleRooms.length ? course : minCourse
    }, unassignedCourses[0])

}

function orderDomainValues(course, possibleRooms, assignment, csp) {
    return possibleRooms.slice().sort((a, b) => {
        return countConflicts(course, a, assignment, csp) - countConflicts(course, b, assignment, csp)
    })
}

function countConflicts(course, room, assignment, csp) {

    let count = 0

    for (let neighbor of course.neighbors) {
        if (neighbor.name in assignment && assignment[neighbor.name] == room) {
            count++
        }
    }

    return count
}

function isConsistent(course, room, assignment, csp) {
    for (const neighbor of course.neighbors) {
        let courseName = neighbor.name
        if (courseName in assignment && assignment[courseName] == room) {
            return false
        }
    }

    return true
}

function arc_consistency(assignment, csp) {

    let queue = []

    for (let arc in csp.arcs) {
        queue.push(csp.arcs[arc])
    }

    while (queue.length > 0) {
        let arc = queue.shift()

        if (revise(arc[0], arc[1], assignment, csp)) {
            if (arc[0].possibleRooms.length == 0) {
                return false
            }

            for (let course in arc[0].neighbors) {
                if (arc[0].neighbors[course] != arc[1]) {
                    queue.push([arc[0].neighbors[course], arc[0]])
                }
            }
        }
    }

    return true
}

function revise(courseA, courseB, assignment, csp) {

    let revised = false

    for (let room in courseA.possibleRooms) {

        if (!(courseB.possibleRooms.some(otherRoom => isConsistent(courseB, otherRoom, assignment, csp)))) {
            courseA.possibleRooms.splice(room, 1)
            revised = true
        }
    }

    return revised
}

let start = performance.now()
console.log(backtrackingSearch(CSPProblem))
let end = performance.now()

let result = end - start
console.log(end)