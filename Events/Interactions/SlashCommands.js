const { ChatInputCommandInteraction } = require('discord.js')
ChatInputCommandInteraction

// Event Listener for slash commands
module.exports = {
    name: 'interactionCreate',
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return

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
                        "Can't reply to Interaction! " +
                            __filename +
                            ', ' +
                            this.execute.name +
                            ' | Error: ' +
                            err.message
                    )
                })

        if (
            command.developer &&
            !client.config.developersID.includes(interaction.user.id)
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
                            this.execute.name +
                            ' | Error: ' +
                            err.message
                    )
                })
        }

        if (
            command.creator &&
            interaction.user.id !== client.config.creatorID
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
                            this.execute.name +
                            ' | Error: ' +
                            err.message
                    )
                })
        }

        const subCommand = interaction.options.getSubcommand(false)
        if (subCommand) {
            const subCommandFile = client.subCommands.get(
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
                                this.execute.name +
                                ' | Error: ' +
                                err.message
                        )
                    })
            }
            subCommandFile.execute(interaction, client)
        } else {
            // if the command wasn't using a subcommand, then just return the command itself
            command.execute(interaction, client)
        }
    }
}
