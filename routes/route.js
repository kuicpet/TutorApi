const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/api/v1/signup',userController.signup);
router.post('/api/v1/signin',userController.signin);
router.get('/api/v1/user/:userId',userController.allowIfLoggedIn,userController.getUser);
router.get('/api/v1/users',userController.allowIfLoggedIn,userController.grantAcces("readAny","subject"),userController.getUsers);
router.put('/api/v1/user/:userId',userController.allowIfLoggedIn,userController.grantAcces("updateAny","subject"),userController.updateUser);
<<<<<<< HEAD
router.delete('/api/v1/user/:userId',userController.allowIfLoggedIn,userController.grantAcces("deleteAny","subject"),userController.deleteUser);
=======
router.delete('/api/v1/user/:userId',userController.allowIfLoggedIn,userController.grantAcces("deleteAny","subject"),userController.deleteuser);
>>>>>>> develop


module.exports = router;