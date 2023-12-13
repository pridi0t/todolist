const { ObjectId } = require("mongodb");

async function getList(collection) {
    try {
        const result = await collection.find({}).sort({ checked: 1, todoPriority: 1});
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
        await collection.updateOne({ _id: new ObjectId(data.id) }, { $set: data });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function deleteList(collection, id) {
    try {
        await collection.deleteOne({ _id: new ObjectId(id) });
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