const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/api/v1/signup',userController.signup);
router.post('/api/v1/signin',userController.signin);
