# Zynkle (Beta)

<h3>An incoming social media app, that will connect people around the world in a more real and socialized way.</h3>

| Table of Contents        |
|--------------------------|
| [Features](#features)                 |
| [Tech Stack](#tech-stack)               |
| [Getting Started](#getting-started)          |
| [Local Testing](#local-testing)            |

> [!WARNING]
> The deployment of this application uses free versions for hosting, database and file storage, so it can have slower speed and performance!

## Features

- [x] User authentication that uses more complex authentication flow, in order to bring more security.
- [x] Implementation of infinite scrolling on home page, which brings more discoverability to the users and their posts.
- [x] Notifications for follows, likes, comments, replies.
- [x] Creation of posts which uses memory storage for preparing the file, and then saves it to a cloud file storage.
- [x] Editing the post image
- [x] Interacting with posts - like/dislike, save/unsave, share and comment
- [x] Deletion of post with resource protection (owner only)
- [x] Commenting on a post
- [x] Like/dislike and reply to comments
- [x] Delete comment/s (comment owner or post owner)
- [x] Like/dislike replies
- [x] Delete reply/ies (reply owner or post owner)
- [x] Following and unfollowing other users
- [x] Editing your profile
- [x] Searching for users, based on their usernames or full names
- [x] Instant user feedback for every action
- [x] Beautiful error and message toasts
- [x] Logging out of the application
- [x] Clean and simple design with consistency and relation to the app's mission and name
- [x] Fully responsive design

## Tech stack

Front-end: React + Vite + Redux + Context API + TailwindCSS + Axios <br />
Back-end: Node.js + Express.js + Typescript + Firebase <br />
Database: MongoDB <br />
File storage: Firebase Storage <br />
Hosting: Render.com

## Getting started

For quick start, you can open the deployed demo site here: https://zynkle-1-gsu7.onrender.com/

## Local testing

1. Clone the repository on your machine
2. [How to setup and run the server](server/README.md) <br />
3. [How to setup and run the front-end](client/README.md)