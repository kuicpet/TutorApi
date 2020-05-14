const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const subjectController = require('../controllers/subjectController');
const lessonController = require('../controllers/lessonController');
const role = require('../roles');
const authorize = require('../controllers/userController');





//User signup 
/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     tags:
 *       - users
 *     description: Signsup a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User SignUp Successful
 */
router.post('/api/v1/signup',userController.signUp);

//User signin
 /**
 * @swagger
 * /api/v1/signin:
 *   post:
 *     tags:
 *       - users
 *     description: Signsin a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User SignIn Successful
 */
router.post('/api/v1/signin',userController.signIn);

//Create Category 
/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     tags:
 *       - users
 *     description: Create a new Category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: category
 *         description: Category object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: Category created Successfulyl
 */
router.post('/api/v1/category',userController.allowIfLoggedIn,authorize.authorize(role.Admin),categoryController.createCategory);

//Create Subject 
/**
 * @swagger
 * /api/v1/subject:
 *   post:
 *     tags:
 *       - subject
 *     description: Create a new Subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: subject
 *         description: Subject object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Subject'
 *     responses:
 *       200:
 *         description: subject created Successfully
 */
router.post('/api/v1/subject',userController.allowIfLoggedIn,authorize.authorize(role.Admin,role.Tutor),subjectController.createSubject);

//Create Lesson 
/**
 * @swagger
 * /api/v1/lesson:
 *   post:
 *     tags:
 *       - lesson
 *     description: Create a new lesson
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lesson
 *         description: Lesson object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Lesson created Successfully
 */
router.post('/api/v1/lesson',userController.allowIfLoggedIn,authorize.authorize(role.Admin,role.Student),lessonController.createLesson);


//Get all Categories
/**
 * @swagger
 * definitions:
 *   Category:
 *     properties:
 *       name:
 *         type: string
 *   
 */
/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     tags:
 *       - Categories
 *     description: Returns all categories
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of categories
 *         schema:
 *           $ref: '#/definitions/Category'
 */
router.get('/api/v1/categories',authorize.authorize(),categoryController.getCategories);

//Get a Category by Id
/**
 * @swagger
 * /api/category/:categoryId:
 *   get:
 *     tags:
 *       - Category
 *     description: Returns a single category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Category's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single category
 *         schema:
 *           $ref: '#/definitions/category'
 */
router.get('/api/v1/category/:categoryId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),categoryController.getCategory);

//Get all Subjects
/**
 * @swagger
 * /api/v1/subjects:
 *   get:
 *     tags:
 *       - Subjects
 *     description: Returns all subjects
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of subjects
 *         schema:
 *           $ref: '#/definitions/Subject'
 */
router.get('/api/v1/subjects',userController.allowIfLoggedIn,authorize.authorize(),subjectController.getSubjects);

//Get a Subject by Id
/**
 * @swagger
 * /api/subject/:subjectId:
 *   get:
 *     tags:
 *       - Subject
 *     description: Returns a single subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Subject's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single subject
 *         schema:
 *           $ref: '#/definitions/Subject'
 */
router.get('/api/v1/subject/:subjectId',userController.allowIfLoggedIn,authorize.authorize(),subjectController.getSubject);

//Get a Suject by Name
/**
 * @swagger
 * /api/subject/subjectName:
 *   get:
 *     tags:
 *       - Subject
 *     description: Returns a single subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Subject's Name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single subject
 *         schema:
 *           $ref: '#/definitions/subject'
 */
router.get('/api/v1/subject/subjectName',userController.allowIfLoggedIn,authorize.authorize(),subjectController.getSubjectName);

//Get all lessons
/**
 * @swagger
 * /api/v1/lessons:
 *   get:
 *     tags:
 *       - Lesssons
 *     description: Returns all lessons
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of lessons
 *         schema:
 *           $ref: '#/definitions/Lesson'
 */
router.get('/api/v1/lessons',userController.allowIfLoggedIn,authorize.authorize(role.Admin),lessonController.getLessons);

//Get a lesson by Id
/**
 * @swagger
 * /api/lesson/:lessonId:
 *   get:
 *     tags:
 *       - Lesson
 *     description: Returns a single lesson
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: lesson's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single lesson
 *         schema:
 *           $ref: '#/definitions/Lesson'
 */
router.get('/api/v1/lesson/:lessonId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),lessonController.getLesson);

//Get a User by Id
/**
 * @swagger
 * /api/user/:userId:
 *   get:
 *     tags:
 *       - User
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/api/v1/user/:userId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),userController.getUser);

//Get all Tutors
/**
 * @swagger
 * /api/v1/tutors:
 *   get:
 *     tags:
 *       - Tutors
 *     description: Returns all tutors
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of tutors
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/api/v1/tutors',userController.allowIfLoggedIn,authorize.authorize(role.Admin),userController.getTutors);

//Get Tutor by Id
/**
 * @swagger
 * /api/tutor/:tutorId:
 *   get:
 *     tags:
 *       - Tutor
 *     description: Returns a single tutor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Tutor's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single tutor
 *         schema:
 *           $ref: '#/definitions/Tutor'
 */
router.get('/api/v1/tutor/:tutorId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),userController.getTutor);

//Get Tutor by Name
/**
 * @swagger
 * /api/tutor/tutorName:
 *   get:
 *     tags:
 *       - Titor
 *     description: Returns a single tutor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Tutor's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single tutor
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/api/v1/tutor/tutorName',userController.allowIfLoggedIn,authorize.authorize(role.Admin,role.Student),userController.getTutorName);

//Get all Users
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/api/v1/users',userController.allowIfLoggedIn,authorize.authorize(role.Admin),userController.getUsers);



//Update a Category
/**
 * @swagger
 * /api/v1/category/categoryId:
 *   put:
 *     tags: Category
 *     description: Updates a single category
 *     produces: application/json
 *     parameters:
 *       name: category
 *       in: body
 *       description: Fields for the Category resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: Category Updated Successfully
 */
router.put('/api/v1/category/:categoryId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),categoryController.updateCategory);

//Update a Subject
/**
 * @swagger
 * /api/v1/subject/subjectId:
 *   put:
 *     tags: Subject
 *     description: Updates a single subject
 *     produces: application/json
 *     parameters:
 *       name: subject
 *       in: body
 *       description: Fields for the Subject resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/Subject'
 *     responses:
 *       200:
 *         description: Subject Updated Successfully
 */
router.put('/api/v1/subject/:subjectId',userController.allowIfLoggedIn,authorize.authorize(role.Admin,role.Tutor),subjectController.updateSubject);

//Update a Lesson
/**
 * @swagger
 * /api/v1/lesson/lessonId:
 *   put:
 *     tags: Lesson
 *     description: Updates a single lesson
 *     produces: application/json
 *     parameters:
 *       name: lesson
 *       in: body
 *       description: Fields for the Lesson resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/Lesson'
 *     responses:
 *       200:
 *         description: Lesson Updated Successfully
 */
router.put('/api/v1/lesson/:lessonId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),lessonController.updateLesson);

//Update a User
/**
 * @swagger
 * /api/v1/user/userId:
 *   put:
 *     tags: User
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *       name: user
 *       in: body
 *       description: Fields for the User resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User Updated Successfully
 */
router.put('/api/v1/user/:userId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),userController.updateUser);


//Delete a User
/**
 * @swagger
 * /api/v1/user/:userId:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: User has been Deleted
 */
router.delete('/api/v1/user/:userId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),userController.deleteUser);

//Delete a Category
/**
 * @swagger
 * /api/v1/category/:categoryId:
 *   delete:
 *     tags:
 *       - Category
 *     description: Deletes a single category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Category's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Category has been Deleted
 */
router.delete('/api/v1/category/:categoryId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),categoryController.deleteCategory);

//Delete a Subject
/**
 * @swagger
 * /api/v1/subject/:subjectId:
 *   delete:
 *     tags:
 *       - Subjects
 *     description: Deletes a single subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Subject's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Subject has been Deleted
 */
router.delete('/api/v1/subject/:subjectId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),authorize.authorize(role.Tutor),subjectController.deleteSubject);

//Delete a Lesson
/**
 * @swagger
 * /api/v1/lesson/:lessonId:
 *   delete:
 *     tags:
 *       - lessons
 *     description: Deletes a single lesson
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Lesson's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Lesson has been Deleted
 */
router.delete('/api/v1/lesson/:lessonId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),lessonController.deleteLesson);

//Delete a Tutor
/**
 * @swagger
 * /api/v1/tutor/:tutorId:
 *   delete:
 *     tags:
 *       - Tutors
 *     description: Deletes a single Tutor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Tutor's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Tutor has been Deleted
 */
router.delete('/api/v1/tutor/:tutorId',userController.allowIfLoggedIn,authorize.authorize(role.Admin),userController.deleteTutor);





module.exports = router;