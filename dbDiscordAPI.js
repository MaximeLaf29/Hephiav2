const { User } = require("discord.js")
const mongo = require("./mongo")
const userSchema = require("./schemas/user-schema")

async function userExistInDB(guild, userObj) {
  var userFound = false

  //   console.log(user.guild)
  await mongo().then(async (mongoose) => {
    try {
      let result = await userSchema.find({
        guildID: guild.id,
        userID: userObj.id
      })
      //   console.log("User exist? -> " + result.length)
      if (result.length == 1) {
        userFound = true
      } else {
        userFound = false
      }
    } catch (err) {
      console.log(err)
    } finally {
      mongoose.connection.close()
    }
  })
  return userFound
}

async function memberCreateInDB(guild, userObj) {
  await mongo().then(async (mongoose) => {
    try {
      const user = {
        guildID: guild.id,
        userID: userObj.id,
        discordUsername: userObj.username,
        discordTag: userObj.discriminator
      }
      await new userSchema(user).save()
      //   return true
    } catch (err) {
      console.log(err)
    } finally {
      mongoose.connection.close()
    }
  })
}

async function memberGuildNicknameChanged(guild, oldMember, newMember) {
  if (!(await userExistInDB(guild, oldMember.user))) {
    await memberCreateInDB(guild, oldMember.user)
  }

  await mongo().then(async (mongoose) => {
    try {
      let result = await userSchema.findOneAndUpdate(
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
      //   console.log("User exist? -> " + result.length)
      //   console.log(result)
      return true
    } catch (err) {
      console.log(err)
    } finally {
      mongoose.connection.close()
    }
  })
}

async function memberMessageIncrement(guild, userObj) {
  if (!(await userExistInDB(guild, userObj))) {
    await memberCreateInDB(guild, userObj)
  }

  await mongo().then(async (mongoose) => {
    try {
      let result = await userSchema.findOneAndUpdate(
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
      //   console.log("User exist? -> " + result.length)
      // console.log(result)
      return true
    } catch (err) {
      console.log(err)
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports = {
  userExistInDB,
  memberMessageIncrement,
  memberCreateInDB,
  memberGuildNicknameChanged
}
