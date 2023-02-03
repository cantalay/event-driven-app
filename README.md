## Project Setup

###Welcome to VueJS 3 todo app project! 

This project is built using VueJS 3, pnpm (Fast, disk space efficient package manager), and Vite (a fast, zero-config development server for JavaScript).

###Getting Started
To get started with this project, you will need to have Node.js and pnpm installed on your system. If you don't have them, you can download the latest version of Node.js from the official website: https://nodejs.org/ and install pnpm by running the following command:
```sh
$ npm install -g pnpm
```
Once you have Node.js and pnpm installed, clone this repository and navigate to the project folder:

```sh
$ git clone https://github.com/cantalay/event-driven-app.git
$ cd event-driven-app
```
Next, install the project dependencies by running the following command:
```sh
$ pnpm install
```
##Running the Project
Before running the project, you may need to change backend-service host and port address. ('/service/http.service.ts'')
You can find it by searching the following lines at whole project: 
```
//TODO: Change here to BE host and port
```
To run the project, you can use the following command:

```sh
pnpm dev
```
This will start the Vite development server, which will compile and serve the project on http://localhost:3001 by default.You can change PORT under 'server' path from 'vite.config.ts' file. You can access the application in your browser at this URL.

### Type-Check, Compile and Building the Project(OPTIONAL)

To build the project for production, you can use the following command:
```sh
pnpm build
```
This will create a production-ready build in the dist directory.



### Lint with [ESLint](https://eslint.org/) (OPTIONAL)

```sh
pnpm lint
```
