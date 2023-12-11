const express = require("express");
const handlebars = require("express-handlebars");
const mongodbConnection = require("./configs/mongodb-connection");
const { MongoClient } = require("mongodb");
const listService = require("./services/list-service");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 위치
app.use("/static", express.static(__dirname + "/static"));

// handlebars
app.engine("hbs",
    handlebars.create({
        extname: "hbs",
        helpers: require("./configs/handlebars-helpers")
    }).engine
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

/* 할 일 목록 */
app.get("/", async (req, res) => {
    const list = await listService.getList(collection);
    res.render("home", { list });
});

/* 할 일 추가 */
app.post("/list", async (req, res) => {
    const data = req.body;
    const result = await listService.addList(collection, data);
    if (!result) {
        res.status(404).send();
    } else {
        res.status(201).send();
    }
});

/* 할 일 삭제 */
app.delete("/list", async (req, res) => {
    const data = req.body;
    const result = await listService.deleteList(collection, data);
    if (!result) {
        res.status(404).send();
    } else {
        res.status(200).send();
    }
});

let collection;
app.listen(3000, async () => {
    console.log("[Server START]");
    const mongoClient = await mongodbConnection();
    collection = mongoClient.db().collection("todo");
    console.log("[MongoDB Connected]");
});