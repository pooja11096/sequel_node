const userData = require('../controllers/user.controller');
const router = require('express').Router();

router.get('/onetoone',userData.onetoOne);

router.get('/onetomany',userData.onetoMany);

router.get('/manytomany',userData.manyToMany);

router.get('/',userData.getAllData);

// router.get('/posts',userData.getAllPosts);

router.get('/:id',userData.getById);

router.post('/',userData.createUser);

router.put('/:id',userData.updateIt);


router.delete('/:id',userData.deleteData);

router.get('/pagination',userData.paginationSorting);

router.get('/search',userData.searching);




module.exports = router;