# How to setup and run the server

1. Open a new terminal and type the following commands <br />
```
cd server
npm install
```
2. Install [MongoDB Compass](https://www.mongodb.com/try/download/compass)
3. In MongoDB Compass create a database called ==zynkle==
4. Create new [Firebase](https://firebase.google.com/) app
5. [Follow this guide to set-up file storage](https://firebase.google.com/docs/storage/web/start)
6. Create ==.env== file in 'server' folder
```
// server/.env
NODE_ENV=development // Always set to 'development', otherwise it will not connect to the right database and throw an error
DB_NAME=zynkle
ACCESS_TOKEN_SECRET=something // Type a random word here
REFRESH_TOKEN_SECRET=something // Type a random word here
FIREBASE_API_KEY='Your api key of the created firebase app'
FIREBASE_PROJECT_ID='The project id of the created app'
FIREBASE_APP_ID='The app id of the created app'
```
7. Change server/src/config/firebase.config.ts
```
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_PROJECT_ID + ".firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROJECT_ID + ".appspot.com",
  messagingSenderId: "Your id",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "Your id"
};
```
8. When everything is ready, type one of the following commands
```
npm start
npm run start:dev
```