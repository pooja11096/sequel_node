const st_data = require('../controllers/student.controller');
const  router = require('express').Router();

router.get('/',st_data.getAllData);

router.post('/',st_data.createStudent);

router.get('/pagination',st_data.pagination);

router.get('/search',st_data.searching);

router.get('/sort',st_data.sorting);

router.put('/:id',st_data.updateData)

router.get('/:id',st_data.getById)

router.delete('/:id',st_data.deleteData);

module.exports = router;