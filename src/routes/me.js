const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/meController');

router.get('/stored/khoa-hoc', meController.storedCourses);
router.get('/trash/khoa-hoc', meController.trashCourses);

module.exports = router;
