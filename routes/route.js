const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const subjectController = require('../controllers/subjectController');
const lessonController = require('../controllers/lessonController');

//User signup 
router.post('/api/v1/signup',userController.signUp);
//User signin 
router.post('/api/v1/signin',userController.signIn);
//Create Category 
router.post('/api/v1/category',userController.allowIfLoggedIn,userController.grantAcces("admin"),categoryController.createCategory);
//Create Subject 
router.post('/api/v1/subject',userController.allowIfLoggedIn,userController.grantAcces("admin"),subjectController.createSubject);
//Create Lesson 
router.post('/api/v1/lesson',userController.allowIfLoggedIn,userController.grantAcces("admin","student"),lessonController.createLesson);


//Get all Categories 
router.get('/api/v1/categories',categoryController.getCategories);
//Get a Category by Id 
router.get('/api/v1/category/:categoryId',categoryController.getCategory);
//Get all Subjects 
router.get('/api/v1/subjects',subjectController.getSubjects);
//Get a Subject by Id 
router.get('/api/v1/subject/:subjectId',subjectController.getSubject);
//Get a Suject by Name 
router.get('/api/v1/subject/subjectName',subjectController.getSubjectName);
//Get all lessons 
router.get('/api/v1/lessons',lessonController.getLessons);
//Get a lesson by Id 
router.get('/api/v1/lesson/:lessonId',lessonController.getLesson);
//Get a User by Id 
router.get('/api/v1/user/:userId',userController.allowIfLoggedIn,userController.getUser);
//Get all Tutors
router.get('/api/v1/tutors',userController.getTutors);
//Get Tutor by Id
router.get('/api/v1/tutor/:tutorId',userController.getTutor);
//Get Tutor by Name
router.get('/api/v1/tutor/tutorName',userController.getTutorName);
//Get all Users
router.get('/api/v1/users',userController.allowIfLoggedIn,userController.grantAcces("readAny","subject"),userController.getUsers);



//Update a Category
router.put('/api/v1/category/:categoryId',userController.allowIfLoggedIn,userController.grantAcces("admin"),categoryController.updateCategory);
//Update a Subject
router.put('/api/v1/subject/:subjectId',userController.allowIfLoggedIn,userController.grantAcces("admin","tutor"),subjectController.updateSubject);
//Update a Lesson
router.put('/api/v1/lesson/:lessonId',userController.allowIfLoggedIn,userController.grantAcces(),lessonController.updateLesson);
//Update a User
router.put('/api/v1/user/:userId',userController.allowIfLoggedIn,userController.grantAcces("updateAny","subject"),userController.updateUser);


//Delete a User
router.delete('/api/v1/user/:userId',userController.allowIfLoggedIn,userController.grantAcces("deleteAny","subject"),userController.deleteUser);
//Delete a Category
router.delete('/api/v1/category/:categoryId',userController.allowIfLoggedIn,userController.grantAcces(),categoryController.deleteCategory);
//Delete a Subject
router.delete('/api/v1/subject/:subjectId',userController.allowIfLoggedIn,userController.grantAcces(),subjectController.deleteSubject);
//Delete a Lesson
router.delete('/api/v1/lesson/:lessonId',userController.allowIfLoggedIn,userController.grantAcces(),lessonController.deleteLesson);
//Delete a Tutor
router.delete('/api/v1/tutor/:tutorId',userController.allowIfLoggedIn,userController.grantAcces(),userController.deleteTutor);
module.exports = router;