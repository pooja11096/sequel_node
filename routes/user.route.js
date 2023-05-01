const userData = require('../controllers/user.controller');
const router = require('express').Router();

router.get('/onetoone',userData.onetoOne);

router.get('/onetomany',userData.onetoMany);

router.get('/manytomany',userData.manyToMany);

router.get('/',userData.getAllData);

router.get('/:id',userData.getById);

router.post('/',userData.createUser);

// router.put('/:id',userData.Update);

router.delete('/:id',userData.deleteIt);

module.exports = router;