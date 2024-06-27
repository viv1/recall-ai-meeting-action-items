## Client App
This is an example client app to showcase a basic UI starting point.

## Application Structure

```
...
public/
src/
|-- components/
|-- styles/
|-- App.tsx
|-- index.tsx
```

- `public/`: Static assets (images, fonts, etc)

- `components/`: Reusable UI components used across the client app

- `styles/`: Common Folder for CSS styling for components across the client app

- `App.tsx` & `index.tsx` : Starting point for the React app

- The root folder contains configurations for `tailwind`, `typescript` and `node`


## Installation and Setup

1. Navigate to the `client-app` directory
2. Install dependencies: `npm install`
3. Run the build command: `npm run build`
4. Start the client server: `npm run start`

The frontend will be available at `http://localhost:3000` (i.e uses 3000 Port by default. However, if that Port is not available, it uses the next available Port. You can modify port by using `PORT` environment variable in `.env` file.
