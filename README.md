* **Typescript as programming language**: The type safety at build time and having intellisense for it in the IDE like vscode is unparalleled to productivity.
* **Separation of concern principle is applied**: Each component has been given a particular role. The role of the components is mutually exclusive. This makes the project easy to be unit tested.
* **Feature encapsulation is adopted**: The files or components that are related to a particular feature have been grouped unless those components are required in multiple features. This enhances the ability to share code across projects.
* **Centralised Error handling is done**: We have created a framework where all the errors are handled centrally. This reduces the ambiguity in the development when the project grows larger.
* **Centralised Response handling is done**: Similar to Error handling we have a response handling framework. This makes it very convenient to apply a common API response pattern.
* **Async execution is adopted**: We have used async/await for the promises and made sure to use the non-blocking version of all the functions with few exceptions.

## How to build and run this project

* Project setup
    * Install Postrges on your local.
    * Clone this repo.
    * From the root of the project executes in terminal `npm install`.
    * Make changes to **.env** file accordingly.
    * Make a copy of **keys/private.pem.example** file to **keys/private.pem**.
    * Make a copy of **keys/public.pem.example** file to **keys/public.pem**.
    * For migration run `npx prisma migrate dev` command (development) to apply pending migrations on database.
    * For deployed environment run `npx prisma migrate deploy` command to apply pending migrations on database.
    * Run `npm start` to run project, open localhost:3000/graphql to see graphql playground.
