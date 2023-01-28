import { BaseInteraction, Events } from 'discord.js'
import DiscordBot from '../../Client/discordBot'
import { Event } from '../../types/Event'
// import { SlashCommandRegister } from '../../types/SlashCommandRegister'
import { SlashSubCommandRegister } from '../../types/SlashSubCommandRegister'

// Event Listener for slash commands
const slashCommand: Event<Events.InteractionCreate> = {
    name: Events.InteractionCreate,
    listener: async (interaction: BaseInteraction & { client: DiscordBot }) => {
        if (!interaction.isChatInputCommand()) return
        console.log('-> ' + interaction.client)
        const command = interaction.client.commands.get(interaction.commandName)

        if (!command)
            return interaction
                .reply({
                    content:
                        "This command is outdated or doesn't exist anymore.",
                    ephemeral: true
                })
                .catch((err) => {
                    console.log(
                        "Can't reply to Interaction! " +
                            __filename +
                            ', ' +
                            slashCommand.name +
                            ' | Error: ' +
                            err.message
                    )
                })

        if (
            command.developer &&
            !interaction.client.developers.includes(interaction.user.id)
        ) {
            return interaction
                .reply({
                    content: 'This command is only available for developers.',
                    ephemeral: true
                })
                .catch((err) => {
                    console.log(
                        "Can't reply to Interaction! " +
                            __filename +
                            ', ' +
                            slashCommand.name +
                            ' | Error: ' +
                            err.message
                    )
                })
        }

        if (
            command.creator &&
            interaction.user.id !== interaction.client.creator
        ) {
            return interaction
                .reply({
                    content: 'This command is only available for the creator.',
                    ephemeral: true
                })
                .catch((err) => {
                    console.log(
                        "Can't reply to Interaction! " +
                            __filename +
                            ', ' +
                            slashCommand.name +
                            ' | Error: ' +
                            err.message
                    )
                })
        }

        const subCommand = interaction.options.getSubcommand(false)
        if (subCommand) {
            const subCommandFile: SlashSubCommandRegister =
                interaction.client.subCommands.get(
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
                            "Can't reply to Interaction! " +
                                __filename +
                                ', ' +
                                slashCommand.name +
                                ' | Error: ' +
                                err.message
                        )
                    })
            }
            subCommandFile.execute(interaction, interaction.client)
        } else {
            // if the command wasn't using a subcommand, then just return the command itself
            command.execute(interaction, interaction.client)
        }
    }
}

export default slashCommand
