class Course {
    constructor(name, timeslots, possibleRooms){
        this.name = name
        this.timeslots = timeslots
        this.neighbors = []
        this.possibleRooms = possibleRooms
    }
}

allRooms = [101, 102, 103]

CourseWA = new Course("WA", [], allRooms)
CourseNT = new Course("NT", [], allRooms)
CourseSA = new Course("SA", [], allRooms)
CourseQLI = new Course('QLI', [], allRooms)
CourseNSW = new Course('NSW', [], allRooms)
CourseVIC = new Course('VIC', [], allRooms)
CourseT = new Course('T', [], allRooms)

CourseWA.neighbors = [CourseNT, CourseSA]
CourseNT.neighbors = [CourseWA, CourseSA, CourseQLI]
CourseSA.neighbors =  [CourseWA, CourseNT,  CourseQLI, CourseNSW, CourseVIC]
CourseQLI.neighbors = [CourseNT, CourseSA, CourseNSW]
CourseNSW.neighbors = [CourseSA, CourseQLI, CourseVIC]
CourseVIC.neighbors = [CourseSA, CourseNSW]

CSPProblem = [CourseWA, CourseNT, CourseSA, CourseQLI, CourseNSW, CourseVIC, CourseT]

//Assignment functions begin here

function backtrackingSearch(csp){
    return recursiveBacktrackingSearch({}, csp)
}

function recursiveBacktrackingSearch(assignment, csp){
    if (isComplete(assignment, csp)){
        return assignment
    }

    const selectedCourse = selectCourseMRV(assignment, csp)
    const orderedRooms = orderDomainValues(selectedCourse, selectedCourse.possibleRooms, assignment, csp)

    for (let room in orderedRooms){

        if (isConsistent(selectedCourse, selectedCourse.possibleRooms[room], assignment, csp)){
            assignment[selectedCourse.name] = selectedCourse.possibleRooms[room]
            let result = recursiveBacktrackingSearch(assignment, csp)

            if (result !== null){
                return result
            }

            delete assignment[selectedCourse]
        }
    }

    return null
}

function isComplete(assignment, csp){
    console.log(assignment)
    return Object.keys(assignment).length === csp.length
}

function selectCourseMRV(assignment, csp){
    const unassignedCourses = csp.filter(course => !(course.name in assignment))

    return unassignedCourses.reduce((minCourse, course) => {
        return course.possibleRooms.length < minCourse.possibleRooms.length ? course : minCourse
    }, unassignedCourses[0])

}

function orderDomainValues(course, possibleRooms, assignment, csp){
    return possibleRooms.slice().sort((a, b) => {
        return countConflicts(course, a, assignment, csp) - countConflicts(course, b, assignment, csp)
    })
}

function countConflicts(course, room, assignment, csp){

    let count = 0

    for(const neighbor of course.neighbors){
        if (neighbor.name in assignment && assignment[neighbor] == room){
            count++
        }
    }

    return count
}

function isConsistent(course, room, assignment, csp){
    for (let neighbor in course.neighbors){
        let courseName = course.neighbors[neighbor].name
        if ( courseName in assignment && assignment[courseName] == room){
            return false
        }
    }

    return true
}

console.log(backtrackingSearch(CSPProblem))