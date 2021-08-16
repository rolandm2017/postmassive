const data = require("./data");

function getMessage() {
    return {
        author: data.author(),
        content: Array(12).fill(data.content()),
        deliveryDate: data.deliveryDate(),
        id: Math.floor(Math.random() * 100000),
    };
}

module.exports = getMessage;
