const introduce = require("./introduce");
const retrieve = require("./retrieve");
const refresh = require("./refresh");

// todo: if I really wanted to I could...
// const massivesDb = require("../_helpers/db").Massive; and then export it here via wallDb, and
// import it in all 3 of the modules to save rewriting the same 3 lines over & over.

module.exports = {
    introduce, // for the first time the user hits the site in that session
    retrieve, // fetches new batch of posts, 15-25 per, to Show More
    refresh, // works on currently loaded posts
};
