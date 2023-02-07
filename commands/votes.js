const Discord = require('discord.js');

module.exports = {
    name: 'votes',
    description: 'Sends an embed with a poll. Only administrators can use this command.',
    execute(message, args) {
        if (message.channel.type === 'dm') return message.reply('This command is not available in Direct Messages.');
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Only administrators can use this command.');
        }

        if (args[0] !== 'create') {
            return message.reply('Incorrect usage. Use `!votes create` to create a poll.');
        }

        let channelId;
        let text;
        let imageUrl;

        message.reply('Please enter the channel ID where the poll should be sent. (Enter `skip` to skip)').then(() => {
            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                if (collected.first().content === 'skip') {
                    channelId = message.channel.id;
                } else {
                    channelId = collected.first().content;
                }
                message.reply('Please enter the text for the poll. (Enter `skip` to skip)').then(() => {
                    message.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 30000,
                        errors: ['time']
                    }).then(collected => {
                        if (collected.first().content === 'skip') {
                            text = 'Poll';
                        } else {
                            text = collected.first().content;
                        }
                        message.reply('Please enter the image URL for the poll. (Enter `skip` to skip)').then(() => {
                            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                                max: 1,
                                time: 30000,
                                errors: ['time']
                            }).then(collected => {
                                if (collected.first().content === 'skip') {
                                    imageUrl = null;
                                } else {
                                    imageUrl = collected.first().content;
                                }
                                const embed = new Discord.MessageEmbed()
                                    .setTitle('Poll!')
                                    .setDescription(text)
                                    .setImage(imageUrl)
                                message.guild.channels.cache.get(channelId).send(embed).then(sentMessage => {
                                    sentMessage.react('👍');
                                    sentMessage.react('👎');
                                });
                            }).catch(() => {
                                return message.reply('No image URL provided.');
                            });
                        });
                    }).catch(() => {
                        return message.reply('No text provided.');
                    });
                });
            }).catch(() => {
                return message.reply('No channel ID provided.');
            });
        });
    }
}