# Dev Log

## Create Folder Structure

### Step 1: Create Backend and FrontEnd folders

```zsh
mkdir spotify-clone
cd spotify-clone
mkdir backend frontend
```

## Create Frontend Project

### Step 2: vite react and typescript frontend

```zsh
cd frontend
npm create vite@latest .
# select *React* and *Typescript*
npm install
npm run dev
```

### Step 3: Install tailwind v3

```zsh
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### Step 4: Cleanup

- remove assets folder
- remove App.css
- remove content of index.css file
- modify App.tsx to remove references of removed files

## Add Shadcn

### Step 5: Shadcn Pre Requisites

Modify tsconfig.json

```json
{
  ...existing config...
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Modify tsconfig.app.json

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

Modify `vite.config.ts`

```ts
/* vite.config.ts */
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})
```

### Step 6: ShadCn Initialisation

`npx shadcn@latest init`

> [!Important]
>
> As of 31 May 2025, React 19 support is not yet there for release version of shadcn.
> Choose `--legacy-peer-deps` during installation when prompted

`npx shadcn@latest add button` - choose `--legacy-peer-deps` during install

## Authentication

### Step 7: Clerk Signin

Login to Clerk
Create Project
Follow through steps for integrating Clerk Authentication to React

## Create Backend Project

### Step 8:

- `cd <projectroot>/backend`
- `npm init -y`
- `npm install express mongoose dotenv cloudinary socket.io cors @clerk/express`
- `npm install -D nodemon`

### Step 9:

- `cd <projectroot>/backend`
- `mkdir src; touch src/index.js`
- add a `.env` in backend folder for server port, cloudinary and mongodb keys and other secrets
- edit package.json to use src/index.js
- add `"type": "module"` to package.json to support `import` statements
- add build and run scripts to package.json

### Step 10:

- install `chalk` package for coloured logs
- proceed with actual application

### Step 11:

```js
// TODO:
```
