const userData = require('../controllers/data.controller');
const router = require('express').Router();

router.get('/showdata',userData.showData);

router.post('/data',userData.InsertUser);

// router.get('/',userData.renderPage)

// router.get('/get_data',userData.getData);
router.get('/', function(req,res,next){
    res.render('index', {title:'Express'});
});

router.get('/get_data',userData.getData);

module.exports = router;    