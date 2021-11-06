const massivesDb = require("../_helpers/db").Massive;

const POSTS_PER_RETRIEVAL = 30;

async function retrieve(username, marker) {
    // "marker" is a marker of where the user is currently in their db. could be a simple chronological check for now.
    // TODO:: Plan how the architecture will track how the user is viewing posts on the wall.
    let thirtyHigher = marker + POSTS_PER_RETRIEVAL;
    const nextThirty = await massivesDb
        .find({
            postNumber: { $gte: marker, $lte: thirtyHigher },
        })
        .sort()
        .exec();
    return nextThirty;
}
