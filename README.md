This project depends on a rails backend api that can be accessed at this url: https://github.com/Aaidenplays/music-school-backend

Welcome to my online music academy app. The purpose of this project is to create an online platform for music instructors to deploy video assignments to their students as well as facilitate consistent communication between students and their instructors.

Included features:
  1. User Authentication utilizing http web tokens
  2. User type specification (student or instructor)
  3. Instructor/student requests (similar to a friend request)
  4. Deploying Assignments
  5. Video submission via Youtube URL
  6. Instructor feedback
  
  This project utilizes a React front-end and Rails API back-end. 
  For authentication I use bcrypt to encrypt passwords.
  
  To use my app just clone this repo and the backend repo provided at the top. 
  Next, type `rails db:migrate` on the back-end repo then, `rails s -p 3001`
  Finally in the front-end repo type `npm install` then, `npm start`
  
  that should be it! I hope you have a good experience with this app.
