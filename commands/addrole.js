const Discord = require('discord.js');

module.exports = {
    name: 'addrole',
    description: 'Add role to a member',
    execute(message, args) {
        if (message.channel.type === 'dm') return message.reply('This command is not available in Direct Messages.');
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.channel.send('You don\'t have permission to manage roles.');
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send('Please mention a valid member or provide a valid member ID.');
        }

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if (!role) {
            return message.channel.send('Please mention a valid role or provide a valid role ID.');
        }

        if (member.roles.cache.has(role.id)) {
            return message.channel.send(`${member.user.tag} already has the role ${role.name}.`);
        }

        member.roles.add(role)
            .then(() => {
                const addRoleEmbed = new Discord.MessageEmbed()
                    .setTitle("Role added")
                    .setColor('RANDOM')
                    .setDescription(`The role ${role.name} has been added to ${member.user.tag}.`);
                message.channel.send(addRoleEmbed);

                const dmEmbed = new Discord.MessageEmbed()
                    .setTitle("Role added")
                    .setColor('RANDOM')
                    .setDescription(`The role ${role.name} has been added to you on the server ${message.guild.name}.`)
                    .setFooter(`By: ${message.author.tag}`);
                member.send(dmEmbed);
            })
            .catch(error => {
                console.error(error);
                message.channel.send(`An error occured while adding the role ${role.name} to ${member.user.tag}.`);
            });
    },
};