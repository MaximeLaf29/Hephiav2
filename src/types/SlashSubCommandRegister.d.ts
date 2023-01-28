import {
    ChatInputCommandInteraction
    // SlashCommandSubcommandsOnlyBuilder
} from 'discord.js'
import DiscordBot from '../Client/discordBot'

type SlashSubCommandRegister = {
    developer?: boolean
    creator?: boolean
    subCommand?: string
    default?: boolean
    // eslint-disable-next-line no-unused-vars
    // data: SlashCommandSubcommandsOnlyBuilder
    // eslint-disable-next-line no-unused-vars
    execute: (...args: ChatInputCommandInteraction, client: DiscordBot) => void
}
