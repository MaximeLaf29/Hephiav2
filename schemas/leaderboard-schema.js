const mongoose = require("mongoose")

const reqString = {
  type: String,
  required: true
}

const reqDefNumber = {
  type: Number,
  required: true,
  default: 0
}

const userInfos = {
  memberID: reqString,
  memberUsername: reqString,
  memberExpNextLvl: reqDefNumber,
  memberLvl: reqDefNumber,
  memberExp: reqDefNumber,
  memberRank: reqDefNumber,
  serverLeft: {
    type: Boolean,
    default: true
  }
}

const leaderboardSchema = mongoose.Schema({
  guildID: {
    // the ID of the guild that owns these Datas
    type: String,
    required: true
  },
  listOfMembers: [userInfos]
})

module.exports = mongoose.model("leaderboard", leaderboardSchema)
