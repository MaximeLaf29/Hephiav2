import client from '../..'
import { Command } from '../../Structures/Command'

export default new Command({
    name: 'reload',
    description: 'Reload bot commands',
    run: ({ interaction }) => {
        client.registerModules()
        interaction.followUp('Commands reloaded')
    }
})
