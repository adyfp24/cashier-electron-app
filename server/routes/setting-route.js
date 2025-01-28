const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting-controller');
// const { validate } = require('../middlewares/validator');
// const productValidation = require('../validations/product-validation');
const multer = require('../middlewares/multer');

router.get('/setting', settingController.getAllSetting);
router.put('/setting/name', multer.none(), settingController.updateSettingName);
router.put('/setting/logo', multer.single('logo'), settingController.updateSettingLogo);

module.exports = router;