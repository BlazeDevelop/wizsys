const Discord = require('discord.js');
const cooldown = new Set();

module.exports = {
    name: '8ball',
    description: 'Answers a yes/no question with a random response.',
    execute(message, args) {
        if (cooldown.has(message.author.id)) {
            return message.channel.send('Please wait 1 second before using this command again.');
        }
        if (!args[0]) {
            return message.channel.send('Please ask a question.');
        }
        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 1000);

        const responses = [
            'Yes.',
            'No.',
            'Maybe.',
            'Ask again later.',
            'Definitely not.',
            'Of course!',
            'I am not sure.',
            'It is certain.',
            'Without a doubt.',
            'Very likely.',
            'I don\'t think so.',
            'It is possible.',
            'Probably not.',
            'You may rely on it.',
            'Better not tell you now.'
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('8Ball')
            .setDescription(`${response}`)
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());
        message.channel.send(embed);
    },
};