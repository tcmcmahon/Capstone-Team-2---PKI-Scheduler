class Course {
    constructor(name, timeslots){
        this.name = name
        this.timeslots = timeslots
        this.neighbors = []
        this.possibleRooms = []
    }
}

allRooms = [101, 102, 103]

CourseA = new Course("A", [])
CourseB = new Course("B", [])
CourseC = new Course("C", [])

CourseA.neighbors = [CourseB, CourseC]
CourseA.possibleRooms = [101, 102]

CourseB.neighbors = [CourseA, CourseC]
CourseB.possibleRooms = [101, 102, 103]

CourseC.neighbors = [CourseA, CourseB]
CourseC.possibleRooms = [101, 102, 103]

CSPProblem = [CourseA, CourseB, CourseC]

function backtrackingSearch(csp){
    return recursiveBacktrackingSearch({}, csp)
}

function recursiveBacktrackingSearch(assignment, csp){
    if (isComplete(assignment, csp)){
        return assignment
    }

    let selectedCourse = selectCourse(assignment, csp)

    for (let room in selectedCourse.possibleRooms){

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

function selectCourse(assignment, csp){
    for (let course in csp){
        if (!(csp[course].name in assignment)){
            return csp[course]
        }
    }
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