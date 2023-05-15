# TODO-Server

This is a Node.JS application that can interact with REST controller

The different chose of repo implemenetion is inject at App.js

The application will save a local file into the current directory if no file present.

Implementation for other databases can simply swapt out at app.js

An example of method that need to override and implmenet are in MongoFiileTaskRepository

```bash
req.taskRepository = localFileTaskRepository;
```

# How To Start

```bash
npm install
npm start
```

The default address is: http://localhost:8080, port number can be change inside package.json "start": "PORT=8080 node app.js"

There are simple test cases that mock a repo response for Express Router
