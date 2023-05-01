const userData = require('../controllers/data.controller');
const router = require('express').Router();


router.get('/', function(req,res,next){
    res.render('index', {title:'Express'});
});

router.get('/get_data',userData.getData);

module.exports = router;