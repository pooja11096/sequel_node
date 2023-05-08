const express = require('express');
const app = express();
const db = require('./models/index');


db.sequelize.sync();

app.use(express.json());
app.set('view engine', 'ejs')


const selection = require('./routes/selection.route');
app.use('/', selection);

app.listen(3003, () => {
    console.log("Server started on port 3003");
});