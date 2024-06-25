## Server App
This is an example server app to showcase a basic backend starting point.

## Application Structure

```
...
src/
|-- controllers/
|-- routes/
|-- services/
|-- index.ts
```


- `routes/`: Backend API routes

- `controllers/`: Internal functions which handle any calls coming the backend API routes

- `services/`: Actual service core logic

- `index.ts` : Starting point for the ExpressJS app

- The root folder contains configurations for `typescript` and `node`.


## Installation and Setup

1. Navigate to the `server-app` directory
2. Install dependencies: `npm install`
3. Run the build command: `npm run build`
4. Start the backend server: `npm run start`

The backend will be available at `http://localhost:3002` . You can use another port by defining an environment variable named `PORT` in the `server-app/.env` file.