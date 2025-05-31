const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
const Recipe = require("./models/Recipe.model");


mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ...

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async(req, res) => {

    const {
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created
    } = req.body;

    const recipeData = {
        "title": title,
        "instructions": instructions,
        "level": level,
        "ingredients": ingredients,
        "image": image,
        "duration": duration,
        "isArchived": isArchived,
        "created": created,
    };

    try {
        const newRecipe = await Recipe.create(recipeData);
        res.status(201).json(newRecipe)
    } catch(err) {
        res.status(500).json(err.message)
    }
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async(req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const recipe = await Recipe.findById(id);
        res.status(200).json(recipe);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
    const {id} = req.params;
    const {title, instructions, level} = req.body
    const updatedRecipe = {
        title: title,
        instructions: instructions,
        level: level
    }
    try {
        const recipe = await Recipe.findByIdAndUpdate(id, updatedRecipe);
        res.status(200).json(recipe);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
    const {id} = req.params;
    

    try {
        const recipe = await Recipe.findByIdAndDelete(id);
        res.status(200).json(recipe);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
