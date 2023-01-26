const { Error } = require('discord.js')
Error

// Event Listener for error events
module.exports = {
    name: 'error',
    /**
     *
     * @param {Error} error
     */
    execute(error) {
        console.log('An error occurred! -> ' + error)
    }
}
