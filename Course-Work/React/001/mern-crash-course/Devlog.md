# Dev Log

## Step 1: Create Project Root - Sub Project

1. `cd <Root Folder of Mono Repo>`
2. `cd ./Course-Work/React/001/mern-crash-course`

## Step 2: Initialise Backend

1. `npm init -y`
2. `npm install express mongoose dotenv`
   1. Express as Web Framework
   2. Mongoose for mongodb Database
   3. dotenv to access environemnt variables
3. `touch .gitignore`
   1. add node_modules to .gitignore
4. `mkdir backend; cd backend`
5. Create entrypoint `touch server.js`
6. inside `package.json`
   1. add `"type": "module"` to use `import / export` syntax instead of `require` syntax
7. `npm install nodemon -D`

## Step 3: Create MongoDB

1. Use Free tier and create a cluster get the database credentials
2. use `mongoose` to connect to mongodb
3. Create `product.model.js` to create *productSchema* and *Product* Model

## Step 4: Create an API in server.js to create Product

1. create `.env` file to store secrets like database connection string with password and other sensitive data
2. add `.env` file to `.gitignore`
3. `app.use(express.json())` middleware to accept json in request body
4. add endpoints to add, delete, and get products

## Step 4a: Add Typescript and intellisense

1. `npm install --save-dev typescript @types/node @types/express @types/mongoose nodemon`
2. `npx tsc --init`

   ```console
   Created a new tsconfig.json with:
                                                                                                                  TS
   target: es2016
   module: commonjs
   strict: true
   esModuleInterop: true
   skipLibCheck: true
   forceConsistentCasingInFileNames: true


   You can learn more at https://aka.ms/tsconfig
   ```

3. Modify tsconfig.json as per needs
4. Modify .js to .ts and add Typed Code
5. reove `"type": "module"` from package.json

### Explanation for TsConfig changes

> [!IMPORTANT]
>
> **`target: "ESNext"`**
>
> - Target latest ECMAScript Standard and use newest JS Features
> - require a more recent Node.js version
>
> **`module: "NodeNext"`**
>
> - Specific module system for Node.js that
>   - aligns with the modern ECMAScript module (ESM) standard
>   - while also providing better interoperability with CommonJS.
> - It's the recommended setting for modern Node.js projects.
>
> Also,
>
> - Informs Typescript that the code will be run in a Node.js environment that supports both ESM and CommonJS and want the output to be in a format that best works with this environment
>
> **`moduleResolution: "nodenext"`**
>
> - specifies how TypeScript should resolve module imports
> - aligns with Node.js's modern module resolution algorithm, considering
>   - package.json exports,
>   - imports, and
>   - the .mjs and .cjs extensions
> - Helps TS understand module dependencies
>   - especially when dealing with packages that support both ESM and CommonJS
>
> **`outDir: "./dist"`**
>
> - Outputs the compiled js files into dist folder
> - This is a standard practice to keep your source TypeScript files separate from the compiled JavaScript code, making your project structure cleaner.
>
> **`esModuleInterop: true`**
>
> - enables better interoperability between ECMAScript modules (ESM) and CommonJS modules.
> - It allows you to import CommonJS modules as if they had default exports, even if they don't.
>   - TypeScript achieves this by creating a synthetic default export
> **`forceConsistentCasingInFileNames: true`**
>
> - enforces that all references to files and directories must use the same casing as the actual file system
>
> **`strict: true`**
>
> - Collection of strict type-checking options like `noImplicitAny, strictNullChecks, strictFunctionTypes` etc
>
> **`skipLibCheck: true`**
>
> - skip type checking of declaration files (.d.ts files), which are typically used for describing the types of JavaScript libraries
> - Speeds up compilation times
>
> **`include: ["backend/**/*", "frontend/**/*"]`**
>
> - specifies the files and directories that the TypeScript compiler should include in your project
>
> **`exclude: ["node_modules", "bower_components", "jspm_packages", "tmp", "output", ".git", "dist"]`**
>
> - Typescript usually ignores all in above array except dist.
> - I have added `dist` to exclude the configured output directory specifically.
