const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models/index');

// const userData = require('./controllers/user.controller')

db.sequelize.sync();

app.get('/',(req,res)=>{
    res.json({ message: "Welcome" });
});

const user_data = require('./routes/user.route');
app.use('/data',user_data)

app.listen(3002,()=>{
    console.log("SERVER IS LISTNING");
})



