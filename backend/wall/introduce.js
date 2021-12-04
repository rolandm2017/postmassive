const massivesDb = require("../_helpers/db").Massive;

function introduceWallForTheDay(username, stylizedOnly) {
    console.log(4, stylizedOnly, "stylized only");
    if (stylizedOnly) {
        return new Promise((resolve, reject) => {
            massivesDb
                .find({ stylings: { $exists: true } })
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
                        "posts.length@@@@",
                        12
                    );
                    resolve(posts);
                });
        });
    }
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
                    363636,
                    "373737",
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
