import Home from '../components/Home';
import About from '../components/About';
import Student from '../components/Student';

export default {
    student: {
        path: '/student',
        method: 'get',
        page: 'student',
        title: 'Student',
        handler: Student
    },
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: Home
    }
};
