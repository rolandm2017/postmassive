const massivesDb = require("../_helpers/db").Massive;

async function introduceWallForTheDay(username) {
    const thirtyPostsToStartWith = await massivesDb
        .find({}, { $orderby: { created_at: -1 } })
        .sort({ date: "descending" })
        .limit(30)
        .then((docs) => {
            return docs;
        });
    return thirtyPostsToStartWith;
}

export default introduceWallForTheDay;
