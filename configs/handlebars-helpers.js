function convertPriority (priority) {
    const list = ["높음", "보통", "낮음"];
    return list[priority];
}

function convertPriorityColor (priority) {
    const list = ["btn-error", "btn-warning", "btn-success"];
    return list[priority];
}

module.exports = {
    convertPriority,
    convertPriorityColor
};