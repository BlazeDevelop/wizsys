const Discord = require("discord.js");

module.exports = {
    name: "remrole",
    description: "Remove role from a mentioned user",
    execute(message, args) {
        if (message.channel.type === 'dm') return message.reply('This command is not available in Direct Messages.');
        // Check if the user has permission to manage roles
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.channel.send("You do not have permission to manage roles.");
        }

        // Get the mentioned user and roles
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let roles = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        // Check if the user is found
        if (!user) {
            return message.channel.send("Please specify a user.");
        }

        // Check if the role is found
        if (!roles) {
            return message.channel.send("Please specify a role.");
        }

        // Check if the user has the role
        if (!user.roles.cache.has(roles.id)) {
            return message.channel.send("This user does not have the specified role.");
        }

        // Remove the role from the user
        user.roles.remove(roles).then(() => {
            // Successful removal embed
            const embed = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle("Role removed")
                .setDescription(`The role ${roles.name} has been removed from ${user.user.username}.`)
                .setFooter(`Removed from ${message.guild.name} by ${message.author.username}`);

            // Send the embed to the channel
            message.channel.send(embed);

            // DM embed to the user
            const dmEmbed = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle("Role removed")
                .setDescription(`The role ${roles.name} has been removed from you in ${message.guild.name}.`)
                .setFooter(`Removed by ${message.author.username}`);

            // Send the DM embed to the user
            user.send(dmEmbed);
        });
    }
};