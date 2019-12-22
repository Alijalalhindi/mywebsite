var mongoose = require('mongoose');
function startConnection() {
    mongoose.connect('mongodb://localhost/schools', { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Start Connection");
    });
    mongoose.set('useFindAndModify', false);
}

module.exports = {
    startConnection,
}