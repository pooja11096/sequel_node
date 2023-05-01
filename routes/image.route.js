// const { image } = require('../models');
const image = require('../controllers/image.controller');
const router = require('express').Router();

router.get('/image',image.getImages);
// router.post('/images',image.createImages);

router.get('/video',image.getVideos);
router.post('/image',image.createImage);
router.post('/video',image.createVideo);

router.get('/mtom',image.manyTomany);
router.get('/otom',image.oneTomany);


module.exports = router;

