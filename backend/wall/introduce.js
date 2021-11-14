const massivesDb = require("../_helpers/db").Massive;

function introduceWallForTheDay(username) {
    // todo: why did i want to put username in here? maybe to mark that username has seen these posts today
    return new Promise((resolve, reject) => {
        massivesDb
            .find({})
            .sort({ date: "desc" })
            .exec((err, posts) => {
                if (err) {
                    console.log(7, err);
                    reject(err);
                }
                console.log(
                    151515,
                    "161616",
                    posts[0],
                    posts.length,
                    "posts.length****",
                    12
                );
                resolve(posts);
            });
    });
    // return thirtyPostsToStartWith;
}

module.exports = introduceWallForTheDay;
