import mongoose from 'mongoose'

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

const leaderboardSchema = new mongoose.Schema({
    guildID: {
        // the ID of the guild that owns these Datas
        type: String,
        required: true
    },
    listOfMembers: [userInfos]
})

export default mongoose.model('leaderboard', leaderboardSchema)
