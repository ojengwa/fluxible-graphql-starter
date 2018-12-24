import createStore from 'fluxible/addons/createStore';

const StudentStore = createStore({
    storeName: 'StudentStore',
    handlers: {
        'FETCH_STUDENTS_SUCCESS': '_receiveStudents',
        'ADD_STUDENT_START': '_createStudentStart',
        'ADD_STUDENT_FAILURE': '_createStudentFailure',
        'ADD_STUDENT_SUCCESS': '_createStudentSuccess',
        'UPDATE_STUDENT_START': '_updateStudentStart',
        'UPDATE_STUDENT_SUCCESS': '_updateStudentSuccess',
        'DELETE_STUDENT_SUCCESS': '_receiveStudents',
        'TOGGLE_ALL_STUDENT_SUCCESS': '_receiveStudents'
    },
    initialize: function () {
        this.students = [];
    },
    _receiveStudents: function (students) {
        this.students = students;
        this.emitChange();
    },
    _createStudentStart: function (student) {
        this.students.push(student);
        this.emitChange();
    },
    _createStudentSuccess: function (newStudent) {
        this.students.forEach(function (student, index) {
            if (student.id === newStudent.id) {
                this.students.splice(index, 1, newStudent);
            }
        }, this);

        this.emitChange();
    },
    _createStudentFailure: function (failedStudent) {
        this.students.forEach(function (student, index) {
            if (student.id === failedStudent.id) {
                student.failure = true;
            }
        }, this);

        this.emitChange();
    },
    _updateStudentStart: function (theStudent) {
        this.students.forEach(function (student, index) {
            if (student.id === theStudent.id) {
                this.students.splice(index, 1, theStudent);
            }
        }, this);

        this.emitChange();
    },
    _updateStudentSuccess: function (theStudent) {
        this.students.forEach(function (student, index) {
            if (student.id === theStudent.id) {
                this.students.splice(index, 1, theStudent);
            }
        }, this);

        this.emitChange();
    },
    getAll: function () {
        return this.students;
    },
    createStudent: function(details) {
        // name, last name, birth date, hobbies and a photo.
        return {
            id: String(details.timestamp),
            firstName: String(details.firstName),
            lastName: String(details.lastName),
            birthday: Date(details.birthday),
            hobbies: String(details.hobbies),
            photo: details.photo
        };
    },
    dehydrate: function () {
        return {
            students: this.students
        };
    },
    rehydrate: function (state) {
        this.students = state.students;
    }
});

export default StudentStore;
