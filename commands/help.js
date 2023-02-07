const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists all available commands.',
    execute(message, args) {
        const commands = message.client.commands;
        const commandList = commands.map(command => `!${command.name} - ${command.description}`).join('\n');

        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Command List')
            .setDescription(commandList)
            .setFooter('©2023 All rights reserved');

        message.channel.send(helpEmbed);
    },
};