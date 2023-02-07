const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'mute',
    description: 'Mutes a specified user for the specified amount of time (in seconds).',
    usage: '!mute @user <time in seconds> <reason>',
    execute(message, args) {
        if (message.channel.type === 'dm') return message.reply('This command is not available in Direct Messages.');
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission to use this command.');

        const user = message.mentions.users.first();
        if (!user) return message.channel.send('You did not specify a user to mute.');

        const time = parseInt(args[1]);
        if (!time || isNaN(time)) return message.channel.send('You did not specify a valid time.');

        const reason = args.slice(2).join(' ') || 'No reason provided.';
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) return message.channel.send('There is no Muted role in this server.');

        const muteEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`Muted User: ${user.username}`)
            .addFields({ name: 'Muted By:', value: message.author.username }, { name: 'Time:', value: `${time} seconds` }, { name: 'Reason:', value: reason })
            .setTimestamp()
            .setFooter(`ID: ${user.id}`);
        message.channel.send(muteEmbed);

        message.guild.member(user).roles.add(muteRole);
        setTimeout(() => {
            message.guild.member(user).roles.remove(muteRole);
            message.channel.send(`${user.username} has been unmuted.`);
        }, time * 1000);
    },
};