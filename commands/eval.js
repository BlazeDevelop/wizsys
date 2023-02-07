const Discord = require("discord.js");
const ownerID = require('./config.json').ownerID;

module.exports = {
    name: "eval",
    description: "Evaluates arbitrary JavaScript code.",
    execute(message, args) {
        if (message.author.id !== ownerID) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Error")
                .setColor("#000000")
                .setDescription("You are not the owner of the bot.")
                .setFooter("Evaluation failed");
            message.channel.send(embed);
            return;
        }

        try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            const embed = new Discord.MessageEmbed()
                .setTitle("Output Console")
                .setColor("#000000")
                .setDescription(evaled)
                .setFooter(`Executed in ${Math.round(process.uptime())}ms. \nCharacter count: ${evaled.length}`);
            message.channel.send(embed);
        } catch (error) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Error")
                .setColor("#000000")
                .setDescription(error)
                .setFooter(`Executed in ${Math.round(process.uptime())}ms. \nCharacter count: ${error.length}`);
            message.channel.send(embed);
        }
    }
};
