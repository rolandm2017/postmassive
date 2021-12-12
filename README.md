<div align="center">
  <h1>PostMassive</h1>
</div>

<div align="center">
  <strong>A Twitter Clone With An Oddball Streak</strong>
  <p>I have no evidence that anyone reads this.</p>
</div>

<div align="center">
  Will be less and less like Twitter until suddenly it's not Twitter at all.
</div>

<br>

<br>

## Table of Contents

- [What makes PostMassive special?](#what-makes-postmassive-special)
- [Features](#features)
- [Installation](#installation)
- [Demo](#demo)
- [Your feedback](#your-feedback)
- [License](#license)

## What makes PostMassive special?

It is a flagship portfolio project. This project does not get put down permanently. It only rests while it gathers strength to come back for another round.

PostMassive started in the pandemic's early days, 2019, when the author tried and failed at writing user authentication code from scratch. A lesson learned: Do not reinvent the wheel.

User authentication continued to be a headscratcher until the author found Jason Watmore's boilerplate for setting up MERN stack authentication. Many thanks to Jason Watmore.

Since implementing user auth, the work has been mostly uneventful and unchallenging. (Ask me how I know I need to install Redux.)

## Features

- **Colored posting text**: There's so much fun you can have styling text with CSS, why not get the user involved? This feature is fully functional and can be accessed via the Post button.
- **User to user private messaging**: Messaging like any standard application.
- **Editable profile bio**: Update your profile and see a demo loading of hypothetical posts.
- **Excellent resizing**: Copied Twitter's breakpoints so that it resizes properly on all modern monitors.

## Installation

Step by step installation instructions are as follows.

Note:
The `12/03/allowUpdateProfile` branch is the latest functional branch. Its name reflects that the developer intends to come back and improve his product more in the future, with zany, wild features.

The current production-ready version is 0.1.0 (alpha) because no one is around to see that number change. So it's left unchanged but will be updated at the end of 2021.

**To install:**

(1) In your terminal, `git clone https://github.com/plutownium/postmassive.git .` in an empty folder.

(2) Type `git checkout 12/03/allowUpdateProfile` to change to that branch.

(3) In the `frontend` folder, `npm install`.

(4) Go to the `backend` folder and `npm install`.

(5) Write your own `config.json` for the NodeJS server to look at. You'll need to supply a MongoDB connection string and a few other values.

(6) Use `nodemon server.js` to run the backend in a terminal. You must be in the /backend folder to run the command.

(7) Write a .env file in the /frontend folder and input a REACT_APP_API_URL matching the backend's startup address.

(7) Use `npm run build` to build a production version of the frontend, or `npm start` to run the dev server.

## Demo

Want to see PostMassive in action?

[Visit PostMassive](https://www.postmassive.com/) |

Login credentials:

marle // ilovecronoa

Alternatively:

test // test

## Contributing

I cannot write this README.md honestly without thanking an Indian programmer named Nigel who helped me learn Bootstrap two years ago.

## Your feedback

Has someone actually read this README?

Email me.

Did someone actually visit PostMassive and navigate around?

Email me.

Did someone _read the code_ as well?

Email me.

If the answers to any above question was affirmative, I would love to hear your brutal and honest feedback via LinkedIn. Feel free to send an email or a LinkedIn connect. I have never heard of anyone reading this program's code so, any review on the code is cherished.

## License

No license granted.

#### Crafted with ❤️ by Roland Mackintosh
