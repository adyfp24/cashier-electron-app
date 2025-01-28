const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting-controller');
// const { validate } = require('../middlewares/validator');
// const productValidation = require('../validations/product-validation');

router.get('/setting', settingController.getAllSetting);
router.post('/setting', settingController.updateSetting);

module.exports = router;