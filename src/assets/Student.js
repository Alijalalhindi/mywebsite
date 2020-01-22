const mongoose = require('mongoose');

const { startConnection } = require('../Binding/db');
const { callSchema } = require("../Binding/schema");
startConnection();
let student = callSchema();

function getStudent(req, res) {
    let id = Number(req.body.StudentNo);
    let query = id ? { StudentNo: id } : {};

    student.find(query, (error, data) => {
        if (error) {
            throw error;
        }
        console.log(data);
        res.send(data);
    });
}

function insertStudent(req, res) {
    let query = student.find({}, { StudentNo: 1, _id: 0 }).sort({ StudentNo: -1 }).limit(1);
    query.exec((error, data) => {
        if (error) {
            throw error;
        }

        if (req.body) {
            let newStudent = new student({
                StudentNo: data[0].StudentNo + 1,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Age: Number(req.body.Age),
                Gender: String(req.body.Gender)
            });
            newStudent.save((error) => {
                if (error) {
                    throw error
                };
                res.send(newStudent);
            });
        }
    });
}

function updateStudent(req, res) {
    let request = req.body;
    let query = student.updateOne({ StudentNo: request.StudentNo }, { $set: request });

    query.exec((error, data) => {
        if (error) {
            return next(error);
        }
        console.log('Student update successfully from body');
    });
    setTimeout(() => {
        getStudent(req, res);
    }, 2000);
}

function removeStudent(req, res) {
    let request = req.body;
    student.findOneAndRemove({ StudentNo: request.StudentNo }, (error, data) => {
        if (error) {
            throw error;
        }
        res.send(data);
        console.log('Student deleted');
    });
}

module.exports = {
    getStudent,
    insertStudent,
    updateStudent,
    removeStudent
};
