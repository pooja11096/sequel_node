const selectionData = require('../controllers/selection.controller.js');
const router = require('express').Router();


router.get('/', selectionData.showData);

router.post('/', selectionData.addData);

router.put('/', selectionData.updateData);

router.put('/update/:id', selectionData.updateIt);

router.get('/controls', selectionData.getControls)

module.exports = router;
