# Person_NodeTS_MongoDataBase
# Part I
to create a project, and in the context of creating a REST API with TypeScrip based nodeJs technologies:
1- command: npm init -y
2- install some dependencies to compile the typeScript:
     2-1. npm install --save-dev typescript
     2-2. npm install --save-dev nodemon
     2-1. npm install --save-dev concurrently
3- create a tsconfig.json JSON configuration file
4- add two script in the package.json file, to exucute and compile "tsc" the typescript file
5- install express: npm install --save express @ types / express
5-1- to facilitate access to the Mongo database, you need to install Mongoose
                    npm install --save mongoose @ types / mongoose
5-2- to paginate through your database, install mongoose-paginate:
                    npm install --save mongoose-paginate @ types / mongoose-paginate

6-create a folder src and into th file index.ts

7- To compile your application, you must type the command:
 npm run dev
a file of type js will be created in the folder dist

7-If you want to create your front-end part, and you work in two different areas, you have to install the dependency cros:
npm install --save cros @ types / cros
NB: can you test our API using Advenced Rest Client. Your database should be created automatically as soon as you make a recording
do you expect the Front-end part using angular 7 in the possible way :-)
