const Discord = require("discord.js");

module.exports = (client, member) => {
    const roleID = "1070611516128239666";
    const role = member.guild.roles.cache.get(roleID);
    member.roles.add(role);

    const welcomeMessage = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL())
        .setDescription(`Welcome to the server ${member.guild.name}! Good luck.`)
        .setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setColor('RANDOM');

    const welcomeMessagedm = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL())
        .setDescription(`Welcome to the server ${member.guild.name}! Be sure to read the rules in #📋︱rules channel. Good luck.`)
        .setThumbnail(member.guild.iconURL())
        .setColor('RANDOM');

    client.channels.cache.get("1070244380419555368").send(welcomeMessage);
    member.send(welcomeMessagedm);
}