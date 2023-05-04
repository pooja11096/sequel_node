const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models/index');


db.sequelize.sync();

app.get('/',(req,res)=>{
    res.json({ message: "Welcome" });
});

const user_data = require('./routes/user.route');
app.use('/data',user_data)

app.listen(3002,()=>{
    console.log("SERVER IS LISTNING");
})



