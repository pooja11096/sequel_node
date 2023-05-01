const express = require('express');
const app = express();
const db = require('./models/index');

app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


// app.get('/',(req,res)=>{
//     res.json({ message: "Welcome" });
// });

// db.sequelize.sync();


const data = require('./routes/data.route');
app.use('/',data);

app.listen(3000,()=>{
    console.log("SERVER IS LISTNING");
})