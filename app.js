const express = require('express');
const app = express();
const db = require('./models/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.json({ message: "Welcome" });
});

db.sequelize.sync();


const image = require('./routes/image.route');
app.use('/data',image);

app.listen(3001,()=>{
    console.log("SERVER IS LISTNING");
})