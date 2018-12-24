/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';


var _students = [];
var randomResponseTime = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


module.exports = {
    name: 'student',
    read: function (req, resource, params, config, callback) {
        setTimeout(function () {
            callback(null, _students.concat());
        }, randomResponseTime(100, 1000));
    },
    create: function (req, resource, params, body, config, callback) {
        var newStudent = {
            id: params.id,
            text: params.text
        };

        if (params.text.indexOf('fail') > -1) {
            var err = new Error('Shenanigans');
            setTimeout(function () {
                callback(err);
            }, randomResponseTime(800, 1000));
            return;
        }
        else {
            _students.push(newStudent);

            setTimeout(function () {
                callback(null, newStudent);
            }, randomResponseTime(100, 1000));
        }
    },
    update: function (req, resource, params, body, config, callback) {
        if (resource === 'student.toggleAll') {
            _students.forEach(function (student, index) {
                student.completed = params.checked;
            });

            setTimeout(function () {
                callback(null, _students);
            }, randomResponseTime(100, 1000));
        }
        else {
            var foundStudent;

            _students.forEach(function (student, index) {
                if (params.id === student.id) {
                    student.text = params.text;
                    student.completed = params.completed;
                    _students[index] = student;
                    foundStudent = student;
                }
            });

            setTimeout(function () {
                callback(null, foundStudent);
            }, randomResponseTime(100, 1000));
        }
    },
    delete: function(req, resource, params, config, callback) {
        _students = _students.filter(function (student, index) {
            return params.ids.indexOf(student.id) === -1;
        });

        setTimeout(function () {
            callback(null, _students);
        }, randomResponseTime(100, 1000));
    }
};
