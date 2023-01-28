# Hephiav2

---

## This is Hephia

-   ![Hephia Mascot](https://github.com/MaximeLaf29/Hephiav2/blob/main/mascot.png?raw=true)

## This is a Personal project Called Hephia V2

This is a multi purpose Discord bot made in nodejs with Discordjs and uses a mongo database. This is the second version, the first is not on Github and will never be released

My attempt with this work is to keep better track of this insane project I'm getting into and to log what my Discord Bot can do here as it gets updated with time.

This will also be with the goal of teaching me more about Github and getting used to it's environment.

With time this description will be growing as I document all the changes and describe the functionality.

Hephia V2 uses a MongoDB database and is meant to be self hosted.

Current functionality:

-   Connection to local database.
-   Implementation of a few database calls to edit the number of message sent in chat.
-   All functions, commands and client events are in separated files and registered on bot's launch.
-   Multiple type of database schemas was created for multiple purpose and some in the wait of more development.
-   The bot can connect to Discord fine and is already able to listen to most events.
-   Any new functions or new event listener can be added and refreshed without having to restart the bot.
-   Includes a few slash commands already like /ping, /generate (for stable diffusion web server, if you have one running, just specify the port) and /reload with 2 sub commands: events and commands to reload the one specified.
-   Each slash commands can be designed for a group of people specified by a userID in the config.json.
-   Client can store information about all the guild's configuration

Following the Second commit on January 24th, 2022, a dev brand will be used.

#How to install
---
clone the repertory__
run ``npm i`` to install the dependencies__
run ``npm run dev`` for now__
