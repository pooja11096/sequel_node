const userData = require('../controllers/data.controller');
const router = require('express').Router();


router.get('/', function(req,res,next){
    res.render('index', {title:'Express'});
});
router.get('/data',userData.showData);
router.post('/', userData.insertData);
router.get('/get_data',userData.getData);

module.exports = router;