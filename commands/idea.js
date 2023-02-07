const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: "idea",
    description: "Create and store a new idea",
    async execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("Error")
            .setDescription("Oops! Can't be, we made a mistake! Error code: 404. Please send a screenshot of this error to the designated channel on the server (#bot-error). Thank you!")

        message.channel.send(embed);
    }
};