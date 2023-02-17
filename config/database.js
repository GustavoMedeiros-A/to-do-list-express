const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set("strictQuery", true)

mongoose.connect('mongodb://127.0.0.1/todo-list', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>console.log('Connected to MongoDB'))
.catch((err) => console.error(err))