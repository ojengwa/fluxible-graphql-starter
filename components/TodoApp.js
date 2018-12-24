/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var provideContext = require('fluxible-addons-react/provideContext');
var connectToStores = require('fluxible-addons-react/connectToStores');
var StudentStore = require('../stores/StudentStore');
var StudentItem = require('./StudentItem');
var Footer = require('./Footer');
var createStudent = require('../actions/createStudent');
var updateStudent = require('../actions/updateStudent');
var deleteStudent = require('../actions/deleteStudent');
var toggleAll = require('../actions/toggleAll');

var ENTER_KEY = 13;

var StudentApp = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            nowShowing: 'ALL_STUDENTS'
        };
    },
    handleNewStudentKeyDown: function (event) {
        if (event.which !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        var text = this.refs.newField.value.trim();

        if (text) {
            this.context.executeAction(createStudent, {
                text: text
            });
            this.refs.newField.value = '';
        }
    },
    changeFilter: function (filter, event) {
        this.setState({ nowShowing: filter });
        event.preventDefault();
    },
    clearCompleted: function () {
        var ids = this.props.items.filter(function (student) {
            return student.completed;
        }).map(function (student) {
            return student.id;
        });

        this.context.executeAction(deleteStudent, {
            ids: ids
        });
    },
    toggleAll: function (event) {
        var checked = event.target.checked;
        this.context.executeAction(toggleAll, {
            checked: checked
        });
    },
    toggle: function (student) {
        this.context.executeAction(updateStudent, {
            id: student.id,
            completed: !student.completed,
            text: student.text
        });
    },
    destroy: function (student) {
        this.context.executeAction(deleteStudent, {
            ids: [student.id]
        });
    },
    edit: function (student, callback) {
        // refer StudentItem.handleEdit for the reasoning behind callback
        this.setState({ editing: student.id }, function () {
            callback();
        });
    },
    save: function (student, completed, text) {
        this.context.executeAction(updateStudent, {
            id: student.id,
            completed: completed,
            text: text
        });

        this.setState({ editing: null });
    },
    cancel: function () {
        this.setState({ editing: null });
    },
    render: function() {
        var students = this.props.items;
        var main;
        var footer;

        var shownStudents = students.filter(function (student) {
            switch(this.state.nowShowing) {
                case 'ACTIVE_STUDENTS':
                    return !student.completed;
                case 'COMPLETED_STUDENTS':
                    return student.completed;
                case 'ALL_STUDENTS':
                    return true;
            }
        }, this);

        var studentItems = shownStudents.map(function (student) {
            return (
                <StudentItem
                    key={student.id}
                    student={student}
                    onToggle={this.toggle.bind(this, student)}
                    onDestroy={this.destroy.bind(this, student)}
                    onEdit={this.edit.bind(this, student)}
                    editing={this.state.editing === student.id}
                    onSave={this.save.bind(this, student)}
                    onCancel={this.cancel}
                />
            );
        }, this);

        var activeStudentCount = students.reduce(function (total, student) {
            return student.completed ? total : total + 1;
        }, 0);

        var completedCount = students.length - activeStudentCount;

        if (activeStudentCount || completedCount) {
            footer = <Footer
                count={activeStudentCount}
                completedCount={completedCount}
                nowShowing={this.state.nowShowing}
                onClearCompleted={this.clearCompleted}
                onFilterChange={this.changeFilter}
            />;
        }

        if (students.length) {
            main = (
                <section id="main">
                    <input
                        id="toggle-all"
                        type="checkbox"
                        onChange={this.toggleAll}
                        checked={activeStudentCount === 0}
                    />
                    <ul id="student-list">
                        {studentItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <header id="header">
                    <h1>students</h1>
                    <input
                        ref="newField"
                        id="new-student"
                        placeholder="What needs to be done?"
                        onKeyDown={this.handleNewStudentKeyDown}
                        autoFocus={true}
                    />
                </header>
                {main}
                {footer}
            </div>
        );
    }
});

StudentApp = connectToStores(StudentApp, [StudentStore], function (context, props) {
    return {
        items: context.getStore(StudentStore).getAll()
    };
});

StudentApp = provideContext(StudentApp);

module.exports = StudentApp;
