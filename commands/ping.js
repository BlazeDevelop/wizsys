const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping command',
    execute(message, args) {
        const pingEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Pong!')
            .setDescription(`Latency is ${Math.floor(message.client.ws.ping)}ms`)
            .setTimestamp();
        message.channel.send(pingEmbed);
    },
};