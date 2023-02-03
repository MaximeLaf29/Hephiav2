import DiscordBot from '../Client/discordBot'
import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    ChatInputApplicationCommandData,
    PermissionResolvable,
    GuildMember
} from 'discord.js'

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember
}

interface RunOptions {
    client: DiscordBot
    interaction: ExtendedInteraction
    args: CommandInteractionOptionResolver
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
type RunFunction = (options: RunOptions) => any

export type CommandType = {
    userPermissions?: PermissionResolvable[]
    cooldown?: number
    run: RunFunction
} & ChatInputApplicationCommandData
