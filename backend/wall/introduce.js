const massivesDb = require("../_helpers/db").Massive;

async function introduceWallForTheDay(username) {
    // todo: why did i want to put username in here? maybe to mark that username has seen these posts today
    const thirtyPostsToStartWith = await massivesDb
        .find({})
        .sort({ date: "desc" })
        .exec((err, posts) => {
            if (err) {
                console.log(7, err);
            }
            console.log(12, "12", posts[0], posts[1]);
            return posts;
        });
    // .limit(30)
    // .then((docs) => {
    //     return docs;
    // });

    // console.log(13, "introduce", thirtyPostsToStartWith);
    return thirtyPostsToStartWith;
}

module.exports = introduceWallForTheDay;
