const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'unmute',
    description: 'Removes the Muted role from a specified user.',
    usage: '!unmute @user <reason>',
    execute(message, args) {
        if (message.channel.type === 'dm') return message.reply('This command is not available in Direct Messages.');
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission to use this command.');

        const user = message.mentions.users.first();
        if (!user) return message.channel.send('You did not specify a user to unmute.');

        const reason = args.slice(1).join(' ') || 'No reason provided.';
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) return message.channel.send('There is no Muted role in this server.');

        const unmuteEmbed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle(`Unmuted User: ${user.username}`)
            .addFields({ name: 'Unmuted By:', value: message.author.username }, { name: 'Reason:', value: reason })
            .setTimestamp()
            .setFooter(`ID: ${user.id}`);
        message.channel.send(unmuteEmbed);

        message.guild.member(user).roles.remove(muteRole);
    },
};