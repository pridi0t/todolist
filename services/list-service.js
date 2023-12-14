const { ObjectId } = require("mongodb");

function getDate() {
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();
    return `${year}.${month}.${date} (${dayList[day]}요일)`;
}

async function getProgress(collection) {
    const total = await collection.count();
    if (!total) {
        return 0;
    }
    const done = await collection.count({ checked: true });
    return (done / total * 100).toFixed(2);
}

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
    const id = data.id;
    delete data.id;
    
    try {
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
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
    getDate,
    getProgress,
    getList,
    addList,
    updateList,
    deleteList
};