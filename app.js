const express = require('express');
const faker = require('@faker-js/faker');
const app = express();
const {student_table,Sequelize, sequelize} = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sequelize.sync({force:true}).then(async ()=>{
//     for(let i=1;i<= 25;i++){
//          const st = {
//             name: faker.lorem.word(),
//             class_id:`${i}`
//          }

//          await student_table.create(st);
//     }
// })

app.get("/", (req, res) => {
res.json({ message: "Welcome" });
});

// app.get("/st", (req,res)=>{
//     const {page,size} = req.query;

//     let data = student_table.findAndCountAll({
       
//     })
//     return res.status(200).json({
//         data:data
//     })

// })

const st_data = require('./routers/student.route');
app.use('/data',st_data);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});
