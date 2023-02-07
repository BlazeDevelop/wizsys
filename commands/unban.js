const Discord = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unbans a specified user by their user ID.',
    usage: '!unban <user ID> <reason>',
    execute(message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have permission to use this command.');

        const userID = args[0];
        if (!userID) return message.channel.send('You did not specify a user ID to unban.');

        const reason = args.slice(1).join(' ') || 'No reason provided.';
        message.guild.fetchBan(userID)
            .then(user => {
                message.guild.members.unban(user.user, reason)
                    .then(() => {
                        user.user.send(`You have been unbanned from the ${message.guild.name} server by ${message.author.username} for the reason: ${reason}.\nPlease join the server again.`)
                            .catch(error => {
                                console.error(error);
                                message.channel.send(`An error occurred while trying to send a message to ${user.user.username}.`);
                            });
                        const unbanEmbed = new Discord.MessageEmbed()
                            .setColor('#00ff00')
                            .setTitle(`Unbanned User: ${user.user.username}`)
                            .addFields({ name: 'Unbanned By:', value: message.author.username }, { name: 'Reason:', value: reason })
                            .setTimestamp();
                        message.channel.send(unbanEmbed);
                    })
                    .catch(error => {
                        console.error(error);
                        message.channel.send(`An error occurred while trying to unban ${user.user.username}.`);
                    });
            })
            .catch(error => {
                console.error(error);
                message.channel.send(`An error occurred while trying to find a banned user with ID ${userID}.`);
            });
    },
};