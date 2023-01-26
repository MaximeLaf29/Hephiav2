"use strict";
const mongoose = require('mongoose');
// This schema is useful for the bot in case it crashes and some users join and/or leave while the bot is down
// It can then use this list to update everything after comparing who is still in the server and who is gone.
const userListLastSeenSchema = mongoose.Schema({
    guildID: {
        // the ID of the guild that owns these Datas
        type: String,
        required: true
    },
    memberList: [String] // List of members that are members of this guild and currently in the guild
});
module.exports = mongoose.model('lastseenUsers', userListLastSeenSchema);
