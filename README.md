# Node.js Backend Architecture
Kick start backend project structure with following features:
<br>
* **Typescript as programming language**: The type safety at build time and having intellisense for it in the IDE like vscode is unparalleled to productivity.
* **Separation of concern principle is applied**: Each component has been given a particular role. The role of the components is mutually exclusive. This makes the project easy to be unit tested.
* **Feature encapsulation is adopted**: The files or components that are related to a particular feature have been grouped unless those components are required in multiple features. This enhances the ability to share code across projects.
* **Centralised Error handling is done**: We have created a framework where all the errors are handled centrally. This reduces the ambiguity in the development when the project grows larger.
* **Centralised Response handling is done**: Similar to Error handling we have a response handling framework. This makes it very convenient to apply a common API response pattern.
* **Mongodb is used through Mongoose**: Mongodb fits very well to the node.js application. Being NoSQL, fast, and scalable makes it ideal for modern web applications.
* **Async execution is adopted**: We have used async/await for the promises and made sure to use the non-blocking version of all the functions with few exceptions.
* **Unit test is favored**: The tests have been written to test the functions and routes without the need of the database server. Integration tests has also been done but the unit test is favored.

## How to build and run this project

* Project setup
    * Install MongoDB on your local.
    * Clone this repo.
    * From the root of the project executes in terminal `npm install`.
    * Make a copy of **.env.example** file to **.env**.
    * Make a copy of **keys/private.pem.example** file to **keys/private.pem**.
    * Make a copy of **keys/public.pem.example** file to **keys/public.pem**.
    * Make a copy of **tests/.env.test.example** file to **tests/.env.test**.
    * Create users in MongoDB and seed the data taking reference from the **addons/init-mongo.js** (using command `mongo addons/init-mongo.js`)

* Run The Tests
    * Install node.js and npm on your local machine.
    * Change the `DB_HOST` to `localhost` in **.env** and **tests/.env.test** files.
    * Execute `npm start` and You will be able to access the API from http://localhost:3000
    * *Use the latest version of node on the local machine if the build fails*.
    * To run the tests execute `npm test`.
 
 
 ## Project Directory Structure
 ```
├── src
│   ├── server.ts
│   ├── app.ts
│   ├── config.ts
│   ├── auth
│   │   ├── apikey.ts
│   │   ├── authUtils.ts
│   │   ├── authentication.ts
│   │   ├── authorization.ts
│   │   └── schema.ts
│   ├── core
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   ├── JWT.ts
│   │   └── Logger.ts
│   ├── database
│   │   ├── index.ts
│   │   ├── model
│   │   │   ├── ApiKey.ts
│   │   │   ├── Keystore.ts
│   │   │   ├── Role.ts
│   │   │   └── User.ts
│   │   └── repository
│   │       ├── ApiKeyRepo.ts
│   │       ├── KeystoreRepo.ts
│   │       ├── RoleRepo.ts
│   │       └── UserRepo.ts
│   ├── helpers
│   │   ├── asyncHandler.ts
│   │   ├── role.ts
│   │   └── validator.ts
│   ├── routes
│   │   └── v1
│   │       ├── access.ts
│   │       ├── index.ts
│   │       └── user.ts
│   ├── services
│   │   └── access
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   ├── schema.ts
│   │   │   ├── signup.ts
│   │   │   ├── token.ts
│   │   │   └── index.ts
│   │   └── user
│   │       ├── getPublicProfile.ts
│   │       ├── index.ts
│   │       ├── profile.ts
│   │       ├── schema.ts
│   │       └── update.ts
│   └── types
│       └── app-request.d.ts
├── tests
│   ├── auth
│   │   ├── apikey
│   │   │   ├── mock.ts
│   │   │   └── unit.test.ts
│   │   ├── authUtils
│   │   │   ├── mock.ts
│   │   │   └── unit.test.ts
│   │   ├── authentication
│   │   │   ├── mock.ts
│   │   │   └── unit.test.ts
│   ├── core
│   │   └── jwt
│   │       ├── mock.ts
│   │       └── unit.test.ts
│   ├── routes
│   │   └── v1
│   │       ├── login
│   │       │   ├── integration.test.ts
│   │       │   ├── mock.ts
│   │       │   └── unit.test.ts
│   │       └── signup
│   │           ├── mock.ts
│   │           └── unit.test.ts
│   ├── .env.test
│   └── setup.ts
├── addons
│   └── init-mongo.js
├── keys
│   ├── private.pem
│   └── public.pem
├── .env
├── .gitignore
├── .eslintrc
├── .eslintignore
├── .prettierrc
├── .prettierignore
├── .vscode
│   └── launch.json
├── package-lock.json
├── package.json
├── jest.config.js
└── tsconfig.json
 ```
 
 ## Directory Traversal for Signup API call
 `/src → server.ts → app.ts → /routes/v1/index.ts → /auth/apikey.ts → /routes/v1/access.ts → /services/access/schema.ts → /helpers/validator.ts → asyncHandler.ts → /services/access/signup.ts → asyncHandler.ts → /database/repository/UserRepo.ts → /database/model/User.ts → /core/ApiResponses.ts`
 
 ## API Examples
* Signup
    * Method and Headers
    ```
    POST /v1/access/signup HTTP/1.1
    Host: localhost:3000
    x-api-key: GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "name" : "Nilay Kothari",
        "email": "nilay.kothari@cygnetinfotech.com",
        "password": "admin"
    }
    ```
    * Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "Signup Successful",
      "data": {
        "user": {
          "_id": "5e7c9d32307a223bb8a4b12b",
          "name": "Nilay Kothari",
          "email": "nilay.kothari@cygnetinfotech.com",
          "roles": [
            "5e7b8acad7aded2407e078d7"
          ],
          "profilePicUrl": ""
        },
        "tokens": {
          "accessToken": "some_token",
          "refreshToken": "some_token"
        }
      }
    }
    ```
    * Response Body: 400
    ```json
    {
      "statusCode": "10001",
      "message": "Bad Parameters"
    }
    ```
* Profile Private
    * Method and Headers
    ```
    GET /v1/user/profile HTTP/1.1
    Host: localhost:3000
    x-api-key: GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj
    Content-Type: application/json
    Authorization: Bearer <your_token_received_from_signup_or_login>
    ```
    * Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "success",
      "data": {
        "name": "Nilay Kothari",
        "profilePicUrl": "",
        "roles": [
          {
            "_id": "5e7b8acad7aded2407e078d7",
            "code": "USER"
          }
        ]
      }
    }
    ```
