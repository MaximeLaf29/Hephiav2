import { Events } from 'discord.js'
import client from '../..'
import { Event } from '../../Structures/Event'
import { SlashSubCommandRegister } from '../../types/SlashSubCommandRegister'

// Event Listener for slash commands
const slashCommand: Event<Events.InteractionCreate> = {
    name: Events.InteractionCreate,
    listener: async (interaction) => {
        if (!interaction.isChatInputCommand()) return
        console.log(`-> ${interaction.client}`)
        const command = client.commands.get(interaction.commandName)

        if (!command)
            return interaction
                .reply({
                    content:
                        "This command is outdated or doesn't exist anymore.",
                    ephemeral: true
                })
                .catch((err) => {
                    console.log(
                        `Can't reply to Interaction! ${__filename}, ${slashCommand.name} | Error: ${err.message}`
                    )
                })

        if (
            command.developer &&
            !client.developers.includes(interaction.user.id)
        ) {
            return interaction
                .reply({
                    content: 'This command is only available for developers.',
                    ephemeral: true
                })
                .catch((err) => {
                    console.log(
                        `Can't reply to Interaction! ${__filename}, ${slashCommand.name} | Error: ${err.message}`
                    )
                })
        }

        if (command.creator && interaction.user.id !== client.creator) {
            return interaction
                .reply({
                    content: 'This command is only available for the creator.',
                    ephemeral: true
                })
                .catch((err) => {
                    console.log(
                        `Can't reply to Interaction! ${__filename}, ${slashCommand.name} | Error: ${err.message}`
                    )
                })
        }

        const subCommand = interaction.options.getSubcommand(false)
        if (subCommand) {
            const subCommandFile: SlashSubCommandRegister =
                client.subCommands.get(
                    `${interaction.commandName}.${subCommand}`
                )
            if (!subCommandFile) {
                return interaction
                    .reply({
                        content: 'This command is not available',
                        ephemeral: true
                    })
                    .catch((err) => {
                        console.log(
                            `Can't reply to Interaction! ${__filename}, ${slashCommand.name} | Error: ${err.message}`
                        )
                    })
            }
            subCommandFile.execute(interaction, client)
        } else {
            command.execute(interaction, client)
        }
    }
}

export default slashCommand
