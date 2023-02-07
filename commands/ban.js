const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'ban',
    description: 'Bans a specified user from the server.',
    usage: '!ban @user <reason>',
    execute(message, args) {
        if (message.channel.type === 'dm') return message.reply('This command is not available in Direct Messages.');
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have permission to use this command.');
        const user = message.mentions.users.first();
        if (!user) return message.channel.send('You did not specify a user to ban.');

        const reason = args.slice(1).join(' ') || 'No reason provided.';

        const banEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`Banned User: ${user.username}`)
            .addFields({ name: 'Banned By:', value: message.author.username }, { name: 'Reason:', value: reason })
            .setTimestamp()
            .setFooter(`ID: ${user.id}`);
        message.channel.send(banEmbed);
        user.send(`You have been banned on the ${message.guild.name} server by ${message.author.username} for the reason: ${reason}.`);

        message.guild.member(user).ban({ reason: reason });
    },
}