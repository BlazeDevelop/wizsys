const Discord = require("discord.js");


module.exports = (client, member) => {
    member.roles.cache.forEach(role => {
        member.roles.remove(role);
    });
    const goodbyeMessage = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL())
        .setDescription(`Goodbye ${member.user.username}!`)
        .setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setColor('RANOM');


    const goodbyeMessagedm = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL())
        .setDescription(`Goodbye ${member.user.username}! We'll be waiting for you again on ${member.guild.name} server. If you left by mistake, here's an invitation to the server: https://discord.gg/nwc3Bs4Pzt`)
        .setThumbnail(member.guild.iconURL())
        .setColor('RANOM');

    client.channels.cache.get("1070244380419555368").send(goodbyeMessage);
    member.send(goodbyeMessagedm);
}