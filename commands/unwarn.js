const Discord = require("discord.js");

module.exports = {
    name: "unwarn",
    description: "Unwarn a user",
    execute(message, args) {
        if (message.channel.type === 'dm') return message.reply('This command is not available in Direct Messages.');
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("Error")
            .setDescription("Oops! Can't be, we made a mistake! Error code: 404. Please send a screenshot of this error to the designated channel on the server (#bot-error). Thank you!")

        message.channel.send(embed);
    }
};