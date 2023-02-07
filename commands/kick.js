const Discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick a member from the server",
    execute(message, args) {
        if (message.channel.type === 'dm') return message.reply('This command is not available in Direct Messages.');
        // Check if the user has the necessary permissions
        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.send(
                "You do not have permission to use this command."
            );

        // Check if a member was mentioned
        let member = message.mentions.members.first();
        if (!member)
            return message.channel.send(
                "You need to mention a member in order to kick them."
            );

        // Check if the author can kick the mentioned member
        if (!member.kickable)
            return message.channel.send(
                "You do not have sufficient permissions to kick this member."
            );

        // Define the reason for the kick
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason provided";

        // Create the kick embed
        let kickEmbed = new Discord.MessageEmbed()
            .setTitle("Member Kicked")
            .setColor("#ff0000")
            .addField("Kicked Member", `${member.user.tag}`)
            .addField("Kicked By", `${message.author.tag}`)
            .addField("Reason", reason);

        // Kick the member and send the kick embed
        member
            .kick(reason)
            .then(() => message.channel.send(kickEmbed))
            .catch(err => {
                console.error(err);
                message.channel.send(
                    "There was an error while trying to kick the member."
                );
            });
    }
};