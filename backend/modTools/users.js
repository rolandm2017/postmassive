const User = require("../models/user.model");
const express = require("express");
const router = express.router;

module.exports = {
    getUser: router.get("/moderator/user")
    createUser: router.post("/moderator/user")
    updateUser: router.patch("/moderator/user")
    deleteUser: router.del("/moderator/user")
}