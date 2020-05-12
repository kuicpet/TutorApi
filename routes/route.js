const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const subjectController = require('../controllers/subjectController');
const lessonController = require('../controllers/lessonController');

//User signup route
router.post('/api/v1/signup',userController.signUp);
//User signin route
router.post('/api/v1/signin',userController.signIn);
//Create Category route
router.post('/api/v1/category',categoryController.createCategory);
//Create Subject route
router.post('/api/v1/subject',subjectController.createSubject);
//Create Lesson route
router.post('/api/v1/lesson',lessonController.createLesson);
//Get all Categories route
router.get('/api/v1/categories',categoryController.getCategories);
//Get a Category by Id route
router.get('/api/v1/category/:categoryId',categoryController.getCategory);
//Get all Subjects route
router.get('/api/v1/subjects',subjectController.getSubjects);
//Get a Subject by Id route
router.get('/api/v1/subject/:subjectId',subjectController.getSubject);
//Get a Suject by Name route
router.get('/api/v1/subject/subjectName',subjectController.getSubjectName);
//Get all lessons route
router.get('/api/v1/lessons',lessonController.getLessons);
//Get a lesson by Id route
router.get('/api/v1/lesson/:lessonId',lessonController.getLesson);
//Get a User by Id route
router.get('/api/v1/user/:userId',userController.allowIfLoggedIn,userController.getUser);
//Get all Users
router.get('/api/v1/users',userController.allowIfLoggedIn,userController.grantAcces("readAny","subject"),userController.getUsers);
router.put('/api/v1/user/:userId',userController.allowIfLoggedIn,userController.grantAcces("updateAny","subject"),userController.updateUser);
router.delete('/api/v1/user/:userId',userController.allowIfLoggedIn,userController.grantAcces("deleteAny","subject"),userController.deleteUser);


module.exports = router;