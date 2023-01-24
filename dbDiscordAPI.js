const userSchema = require('./schemas/user-schema')
const fileContext = 'dbDiscordAPI.js'
// removed useless requires

async function userExistInDB(guild, userObj) {
    let userFound = false
    try {
        const result = await userSchema.find({
            guildID: guild.id,
            userID: userObj.id,
        })

        if (result.length == 1) {
            userFound = true
        } else {
            userFound = false
        }
    } catch (err) {
        console.log(err)
    } finally {
        // Possible sanity check here
    }
    return userFound
}

async function memberCreateInDB(guild, userObj) {
    try {
        const user = {
            guildID: guild.id,
            userID: userObj.id,
            discordUsername: userObj.username,
            discordTag: userObj.discriminator,
        }
        await new userSchema(user).save()
    } catch (err) {
        console.log(err)
    } finally {
        // Possible sanity check here
    }
}

async function memberGuildNicknameChanged(guild, oldMember, newMember) {
    if (!(await userExistInDB(guild, oldMember.user))) {
        await memberCreateInDB(guild, oldMember.user)
    }

    try {
        const result = await userSchema.findOneAndUpdate(
            {
                guildID: guild.id,
                userID: oldMember.id,
            },
            {
                $push: {
                    discordNicknameHistory: oldMember.nickname,
                },
                discordNickname: newMember.nickname,
            },
            {
                upsert: true,
            }
        )
        if (!result) return false
    } catch (err) {
        console.log(err)
    } finally {
        // Possible sanity check here
    }

    return true
}

async function memberMessageIncrement(guild, userObj) {
    if (!(await userExistInDB(guild, userObj))) {
        await memberCreateInDB(guild, userObj)
    }

    try {
        const result = await userSchema.findOneAndUpdate(
            {
                guildID: guild.id,
                userID: userObj.id,
            },
            {
                $inc: {
                    numberOfMessagesSent: 1,
                },
            }
        )
        if (!result) return false
    } catch (err) {
        console.log(err)
    } finally {
        // Possible sanity check here
    }
    return true
}

module.exports = {
    userExistInDB,
    memberMessageIncrement,
    memberCreateInDB,
    memberGuildNicknameChanged,
}
