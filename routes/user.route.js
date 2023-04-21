const userData = require('../controllers/user.controller');
const router = require('express').Router();

router.get('/onetoone',userData.onetoOne);
router.get('/onetomany',userData.onetoMany);
router.get('/manytomany',userData.manyToMany);

router.get('/',userData.getAllData);

router.post('/',userData.createUser);

router.get('/pagination',userData.paginationSorting);

router.get('/search',userData.searching);

router.put('/:id',userData.updateUser);

router.delete('/:id',userData.deleteData);



module.exports = router;