const mongoose = require('mongoose');

function callSchema() {
    let Schema = mongoose.Schema;
    let studentSchema = new Schema({
        StudentNo: Number,
        FirstName: String,
        LastName: String,
        Age: Number,
        Gender: String
    }, { collection: 'student' });

    return mongoose.model('student', studentSchema);
}


module.exports = {
    callSchema,
}