/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const fs = require('fs');
  const bodyParser = require('body-parser');
  const app = express();

  // app.use('*', function(req, res){
  //   res.status(404).send('Not Found');
  // })
  const PORT = 3000;

  app.use(bodyParser.json());

  app.get("/todos" , async function(req ,res){
    const id = req.query.id;
    if(!(id)){
      const data = await fs.promises.readFile("files/todolist.txt" , "utf-8")
      const userList = JSON.parse(data);
      res.status(200).send(userList);
    }
    else{
      const data = await fs.promises.readFile("files/todolist.txt" , "utf-8")
      const userList = JSON.parse(data);
      if (Array.isArray(userList) && userList.length > 0) {
        // Assuming there's only one user in the array
        for(let i = 0 ; i < userList.length ; i++){
          if(id == userList[i].id){
            res.status(200).send(userList[i]);
            return;
          }
        }
      } 
      res.status(404).send("Not Found");
    }
  })

  app.post("/todos" , async function(req ,res){
    const title = req.body.title;
    const completed = req.body.completed
    const description = req.body.description
    const data = await fs.promises.readFile("files/todolist.txt" , "utf-8")
      const userList = data ? JSON.parse(data) : [];
      if (!Array.isArray(userList)) {
        // If the existing data is not an array, initialize it as an empty array
        userList = [];
      }
      const existingUser = userList.find(function(user){
          if(user.title === title){
            return true;
          }
          else{
            return false;
          }
        });
      if (existingUser) {
        res.status(403).send("Already present, you have to update it.");
      }
        else{
          const id = Number(userList[(userList.length)-1].id) + 1;
          const ob = {
            title: title,
            completed: completed,
            description: description,
            id: id
          }
          userList.push(ob);
          await fs.promises.writeFile("files/todolist.txt",JSON.stringify(userList), "utf-8", (err) => {
            if (err) {
              console.error('Error writing to file:', err);
            } else {
              console.log('Data written to file successfully!');
            }
          });
          res.status(201).send("your id is "+ id);
        }
  })
  app.put("/todos" , async function(req ,res){
    const id = req.query.id;
    const title = req.body.title;
    const completed = req.body.completed
    const description = req.body.description
    const data = await fs.promises.readFile("files/todolist.txt" , "utf-8")
    if(!data){
      res(404).send("Empty data");
    }
    const userList = JSON.parse(data);
    let it = true;
    for(let i = 0 ; i < userList.length ; i++){
      if(id == userList[i].id){
        userList[i] = {
          title: title,
          completed: completed,
          description: description,
          id: Number(id)
        }
        await fs.promises.writeFile("files/todolist.txt",JSON.stringify(userList), "utf-8", (err) => {
          if (err) {
            console.error('Error writing to file:', err);
          } else {
            console.log('Data replacing to file successfully!');
          }
        });
        it = false;
        res.status(200).send("item was found and updated");
      }
    }
    if(it){
      res.status(404).send("Not Found");
    }
  })

  app.delete("/todos" , async function(req ,res){
    const id = req.query.id;
    const data = await fs.promises.readFile("files/todolist.txt" , "utf-8");
    if(!data){
      res.status(404).send("Empty data");
    }
    const userList = JSON.parse(data);
    var it = false;
    let n = Number(userList.length) - 1;
    console.log(n);
    for(let i = 0 ; i < n ; i++){
      console.log(`userlist${userList[i].id}   id${id}`)
      if(userList[i].id == id){
        console.log("it" + i);
        it = true;
        let temp = userList[i];
        userList[i] = userList[i+1]
        userList[i+1] = temp;
      }
    }
    if(it || (userList[(userList.length)-1].id == id)){
      userList.pop();
      await fs.promises.writeFile("files/todolist.txt" , JSON.stringify(userList), "utf-8" , function(err){
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Data changing to file successfully!');
        }
      })
      res.status(200).send("Found and deleted");
    }
    else{
      res.status(404).send("Not Found");
    }
  })


  app.listen(PORT, function(){
    console.log("online...");
  })
  
  module.exports = app;
  // files/todolist.txt
  // node todoServer.js