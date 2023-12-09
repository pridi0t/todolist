const express = require("express");
const handlebars = require("express-handlebars");
const mongodbConnection = require("./configs/mongodb-connection");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs",
    handlebars.create({
        extname: "hbs"
    }).engine);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
    res.render("home", { message: "test" });
});

let collection;
app.listen(3000, async () => {
    console.log("[Server START]");
    const mongoClient = await mongodbConnection();
    collection = mongoClient.db().collection("todo");
    console.log("[MongoDB Connected]")
});