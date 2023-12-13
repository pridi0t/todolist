const { ObjectId } = require("mongodb");

async function getList(collection) {
    try {
        const result = await collection.find({ "checked": false }).sort({ "todoPriority": 1 });
        return await result.toArray();
    } catch (err) {
        console.error(err);
    }
}

async function addList(collection, data) {
    data.checked = false;

    try {
        await collection.insertOne(data);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function updateList(collection, data) {
    try {
        await collection.updateOne({ _id: new ObjectId(data.id) }, { $set: { todo: data.todo } });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function deleteList(collection, data) {
    try {
        await collection.deleteOne(data);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    getList,
    addList,
    updateList,
    deleteList
};