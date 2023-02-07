const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clears messages in a channel',
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('You do not have sufficient permissions to use this command!');
        }

        let deleteCount;
        if (!args.length) {
            deleteCount = 1;
        } else if (args[0].toLowerCase() === 'all') {
            deleteCount = 100;
        } else {
            deleteCount = parseInt(args[0]);
        }

        if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
            return message.reply('Please provide a number between 1 and 100 for the number of messages to delete');
        }

        message.channel.messages.fetch({ limit: deleteCount })
            .then(messages => {
                let messagesArray = messages.array();
                if (args.length === 0) {
                    let index = messagesArray.findIndex(msg => msg.id === message.reply.id);
                    messagesArray = messagesArray.slice(0, index + 1);
                }
                message.channel.bulkDelete(messagesArray)
                    .then(() => {
                        let clearEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setDescription('Successfully cleared messages');
                        message.channel.send(clearEmbed)
                            .then(msg => {
                                msg.delete({ timeout: 5000 });
                            });
                    });
            });
    },
};