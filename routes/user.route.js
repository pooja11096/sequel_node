const userData = require('../controllers/user.controller');
const validateUser = require('../middleware/user.validator');

const router = require('express').Router();

router.get('/msg', userData.getMsg);

router.get('/getdata', userData.getData);

router.post('/adddata', validateUser,userData.createData);

router.get('/getbyid/:id', userData.getById);

router.put('/update/:id', userData.updateData);

router.delete('/delete/:id', userData.deleteData);


module.exports = router;