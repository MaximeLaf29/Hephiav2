import userSchema from './schemas/user-schema'
import { Guild, User, GuildMember } from 'discord.js'

async function userExistInDB(guild: Guild, userObj: User) {
    let userFound = false
    try {
        const result = await userSchema.find({
            guildID: guild.id,
            userID: userObj.id
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

/**
 *
 * @param {Guild} guild
 * @param {User} userObj
 */
async function memberCreateInDB(guild: Guild, userObj: User) {
    try {
        const user = {
            guildID: guild.id,
            userID: userObj.id,
            discordUsername: userObj.username,
            discordTag: userObj.discriminator
        }
        await new userSchema(user).save()
    } catch (err) {
        console.log(err)
    } finally {
        // Possible sanity check here
    }
}

/**
 *
 * @param {Guild} guild
 * @param {GuildMember} oldMember
 * @param {GuildMember} newMember
 * @returns
 */
async function memberGuildNicknameChanged(
    guild: Guild,
    oldMember: GuildMember,
    newMember: GuildMember
) {
    if (!(await userExistInDB(guild, oldMember.user))) {
        await memberCreateInDB(guild, oldMember.user)
    }

    try {
        const result = await userSchema.findOneAndUpdate(
            {
                guildID: guild.id,
                userID: oldMember.id
            },
            {
                $push: {
                    discordNicknameHistory: oldMember.nickname
                },
                discordNickname: newMember.nickname
            },
            {
                upsert: true
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

/**
 *
 * @param {Guild} guild
 * @param {User} userObj
 * @returns {boolean} whether if the user message increments in the database was successful
 */
async function memberMessageIncrement(guild: Guild, userObj: User) {
    if (!(await userExistInDB(guild, userObj))) {
        await memberCreateInDB(guild, userObj)
    }

    try {
        const result = await userSchema.findOneAndUpdate(
            {
                guildID: guild.id,
                userID: userObj.id
            },
            {
                $inc: {
                    numberOfMessagesSent: 1
                }
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

export default {
    userExistInDB,
    memberMessageIncrement,
    memberCreateInDB,
    memberGuildNicknameChanged
}
