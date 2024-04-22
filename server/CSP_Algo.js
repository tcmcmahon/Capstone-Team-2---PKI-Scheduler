import { classData, readCSVData } from "./restrictions.js"
import rooms from "./uploads/rooms.json" assert {type: "json"}

await readCSVData()

let allRooms = Object.keys(rooms)

classData.forEach(course => {course.setPossibleRooms(allRooms)})

//Following code removes any classes with non-unique names from the list
const uniqueNames = {};
let uniqueClassData = classData.filter(obj => {
    if (!uniqueNames[obj.name]) {
        uniqueNames[obj.name] = true;
        return true;
    }
    return false;
});

class CourseAssignCSP {
    constructor(courses, allRooms, arcs) {
        this.courses = courses
        this.arcs = arcs
        this.allRooms = allRooms
    }
}

let CSPProblem = new CourseAssignCSP(uniqueClassData, allRooms)

//Hardcoding these before I can simply get them from checking the entered courses
CSPProblem.arcs = []

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

    for (let room in orderedRooms) {

        if (isConsistent(selectedCourse, selectedCourse.possibleRooms[room], assignment, csp)) {
            assignment[selectedCourse.name] = selectedCourse.possibleRooms[room]

            if (arc_consistency(assignment, csp)) {
                let result = recursiveBacktrackingSearch(assignment, csp)
                if (result !== null) {
                    return result
                }
            }

            delete assignment[selectedCourse]
        }
    }

    return null
}

function isComplete(assignment, csp) {
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

    for (const neighbor of course.neighbors) {
        if (neighbor.name in assignment && assignment[neighbor] == room) {
            count++
        }
    }

    return count
}

function isConsistent(course, room, assignment, csp) {
    for (let neighbor in course.neighbors) {
        let courseName = course.neighbors[neighbor].name
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

            for (course in arc[0].neighbors) {
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

console.log(Object.keys(backtrackingSearch(CSPProblem)).length)