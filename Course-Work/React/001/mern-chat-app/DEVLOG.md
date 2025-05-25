# Dev Log for MERN-CHAT-APP

1. `cd mern-chat-app`
2. `mkdir frontend; mkdir backend;`

## Backend Structure

1. `cd backend`
2. `npm init -y`
3. `npm install express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudinary socket.io`
4. `npm install --save-dev nodemon @types/dotenv @types/express @types/mongoose @types/node nodemon ts-node typescript`
5. `tsc --init`
6. Modify tsconfig to include following
   1. `"include": ["src/**/*.ts"],`
   2. `"exclude": ["node_modules", "dist"]`
   3. `"outDir": "./dist"`
7. add to scripts in package.json following

    ```json
    {
        "scripts": {
            "dev": "nodemon dist/server.js",
            "start": "ts-node src/server.ts",
            "build": "tsc",
            "serve": "node dist/server.js"
        }
    }
    ```

8. src/server.ts

   ```ts
   import express from 'express'
   const app = express()
   const port = process.env.PORT || 5001
   app.listen(port, () => {
    console.log(`Server is running in Port: ${port}`)
   })
   ```

9. `tsc; npm run dev;`

## Backend - Folder Structure

```console
Root
  ├─ 📁 backend
  │  └─ 📁 src
  │     ├─ 📁 controllers
  │     ├─ 📁 lib
  │     ├─ 📁 middlewares
  │     ├─ 📁 models
  │     ├─ 📁 routes
  │     ├─ 📜 .env
  │     ├─ 📜 tsconfig.json
  │     └─ 📜 package.json
  └─ 📁 frontend
     └─ ...
```

## Front End Structure

- `cd frontend`
- `npm create vite@latest .` - React and Typescript
- `npm install --save react-router-dom react-hot-toast`
- install tailwind css

  ```console
  npm install -D tailwindcss@3 postcss autoprefixer
  npx tailwindcss init -p
  ```
- follow through tailwindcss@3 documentaiton for few more steps
- `npm i -D daisyui@latest`

