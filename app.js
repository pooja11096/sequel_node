const express = require('express');
const app = express();

const { swaggerServe, swaggerSetup } = require('./swagger')


app.use(express.json());
app.use("/api-docs", swaggerServe, swaggerSetup );

app.get('/', (req, res)=>{
    res.send(result);
})

const user = require('./routes/user.route');
app.use('/', user);

app.listen(3001, () => {
    console.log("Server started on port 3001");
});