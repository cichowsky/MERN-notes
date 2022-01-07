# MERN notes

It's simple note app using MERN stack (Mongo, Express, React, Node) and thus it's my first project, in which I created my own backend. To authenticate users I used jwt (json web token).

On frontend side I implemented features like: useForm hook (included validation), own modal component and other components, which i styled with tailwind. As state menagement I used Context Api (for User and Notes state).

⚠️ Main goal of this project was to create working MERN app. I just wanted to learn basics of node, express and mongo (mongoose). I did not focus on UX, accessibility, testing, neither performance. The key was to join my backend and frontend into working app.
⚠️ App has a few things to fix/improve, but I'm not going to deal with it (at least at this point).

## Live preview: https://cichowsky-mern-notes.herokuapp.com

## Run in develop mode:

You need to install mongoDB locally on your computer: https://docs.mongodb.com/manual/release-notes/ and run it. Install mongo DB atlas: https://docs.mongodb.com/compass/current/install/ (if you want database preview).

### or

use web version - MongoDB Atlas (create account, add new database and remember to exchange database address in `.env` or `backend/config.js`)

In the terminal run backend:

- `cd backend`
- `npm install`
- `npm run startDev`

Now in second terminal run frontend:

- `cd frontend`
- `npm install`
- `npm start`
