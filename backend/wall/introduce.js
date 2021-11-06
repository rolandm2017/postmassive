const massivesDb = require("../_helpers/db").Massive;

async function introduceWallForTheDay(username) {
    const thirtyPostsToStartWith = await massivesDb
        .find({})
        .sort({ date: "descending" })
        .limit(30)
        .then((docs) => {
            return docs;
        });
    return thirtyPostsToStartWith;
}

export default introduceWallForTheDay;

// I really DONT want users to be "Vortexed" into being here longer than 30-60 mins a day. If they want to go elsewhere after that, cool. But if they're clocking >6 hrs of screen time a week, I absolutely do want to unStuck them from social media permanently.
// could even like, use data to tell who is and isnt breaking this policy. but only if its profitable, obviously.
// Exclusiveness...
