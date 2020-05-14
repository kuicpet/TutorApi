# TutorApi
Api for Online Tutoring App


NODE JS Task 4: Build a server for an online tutoring app.


You are to build an online tutoring app that has three categories of users: Admin, tutors and students. A user can register as a student on this platform. Afterwards, they can view all categories they can belong to. They can also view all subjects taught in a category. Other actions they can carry out are outlined further down this page.

A user can also register as a tutor. Afterwards, they can perform actions specific to tutors as outlined below. 

The last category of users is the admin. No one can sign up as an admin. Only tutors can become admins. Making a tutor an admin is up to you as to how you want to implement that. You are, however, expected to provide admin log in details on your readme when documenting your APIs.

I will be testing the admin routes with the admin details you provide on your readme, However, I will sign up as a tutor and a student to test other functionalities. Ideally, a user should not be able to carry out actions they are not privileged to. You should take this into consideration and protect your routes.

 

The users on your platform have different privileges based on their roles as outlined below. 


General: (For Admin, Tutors and Students);

1) Admin/Students /tutors can retrieve a subject in a category (by Id)

2) Admin/Students /tutors can retrieve all subjects, by category

3) Admin/Students /tutors can retrieve all categories

4) Admin/Students /tutors can search for subjects by name, sorted alphabetically in ascending order.

5) Admin/Students  can search for tutors by first name, sorted alphabetically in ascending order.

6) Admin/Students /tutors can sign in.



Admin:

1) Admin can create subjects under 3 categories: primary, JSS, SSS

2) Admin can update a subject in a category (by Id)

3) Admin can delete a subject in a category (by Id)

4) Admin can delete or update a category

5) Admin can retrieve all tutors

6) Admin can get a tutor (by Id)

7) Admin can deactivate a tutor (by Id)

8) Admin can book lessons

9). Admin can retrieve all lessons

10). Admin can get a lesson (by Id)

11). Admin can update a lesson (by Id)

12). Admin can delete a lesson (by Id)

13 Admin signs up as a tutor but you can make a tutor of your choice an admin by giving them the admin role. Not all tutors must be admin. Just a few.

 

Tutors:

1) Tutors can register to take a subject in a category

2) Tutors can see all subjects they registered to take

3) Tutors can update a registered subject

4) Tutors can delete a registered subject

 

Students:

1) Students can sign up.

2) Students can see all tutors taking a subject in a category

3) Students can book lessons

 

 

Caveats to consider: 

A subject should belong to a category. A category can have many subjects. This is a one-to-many relationship. (Research on how to establish this with mongoose).

Deleting a category should delete all subjects under that category too. (HINT: Look into middleware in the mongoose docs). 

 

Points to Note:

You are to create endpoints as relevant following the standard API conventions as outlined in class: 

Version your API using URL versioning starting with the letter "v". A simple ordinal number would be appropriate and avoid dot notation such as 1.0. An example of this will be https://somewebapp.com/api/v1.

Identify which routes requires authentication and implement token-based authentication using JSON Web Token (JWT) and secure those routes using JSON Web Token (JWT)

Ensure you break down your task into subtasks with different github branches for each subtask and eventually merge all to a develop branch. Don't push directly to your develop branch. (HINT: You can implement the different categories on different branches)

Document your endpoints clearly and descriptively in a README.md file and push to git. You are expected to start this project on a new github repository. 

Host your app on Heroku (a free hosting platform). All your endpoints must be live(hosted on heroku) for easy testing. 

Finally, ensure to test all endpoints and see that they work using POSTMAN.



TOTAL OBTAINABLE POINTS: 10 
 

HELPFUL RESOURCES:

https://mongoosejs.com/docs/guide.html

https://expressjs.com/

https://dev.to/mkilmer/how-create-relationships-with-mongoose-and-node-js-with-real-example-43ei

https://bezkoder.com/mongoose-one-to-many-relationship/

https://stackoverflow.com/questions/38039767/mongoose-delete-all-referenced-objects-in-an-array-when-deleting-referencing-ob

 


Deadline: 08/05/2020 11:55 PM
Node JS Back End
