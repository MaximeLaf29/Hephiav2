import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandsOnlyBuilder
} from 'discord.js'
import DiscordBot from '../Client/discordBot'

type SlashCommandRegister = {
    developer?: boolean
    creator?: boolean
    default?: boolean
    subCommand?: string
    // eslint-disable-next-line no-unused-vars
    data: SlashCommandSubcommandsOnlyBuilder
    // eslint-disable-next-line no-unused-vars
    execute: (...args: ChatInputCommandInteraction, client: DiscordBot) => void
}
