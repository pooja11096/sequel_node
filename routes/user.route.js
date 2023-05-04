const userData = require('../controllers/user.controller');
const router = require('express').Router();

router.get('/onetoone',userData.onetoOne);

router.get('/onetomany',userData.onetoMany);

router.get('/manytomany',userData.manyToMany);

router.get('/',userData.getAllData);

router.get('/:id',userData.getById);

router.get('/update/:id',userData.updateIt);

router.get('/updatee/:id',userData.updateData);

router.get('/search',userData.searchData);

router.post('/',userData.createUser);

router.put('/:id',userData.Update);

router.delete('/:id',userData.deleteIt);

module.exports = router;