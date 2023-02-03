import dotenv from 'dotenv'
dotenv.config()
import DiscordBot from './Client/discordBot'

const client = new DiscordBot()

client.start()

export default client
