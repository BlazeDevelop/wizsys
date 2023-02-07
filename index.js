const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
}

const config = require('./config.json');
const prefix = config.prefix;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${config.prefix}help`, { type: "PLAYING" });
});

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
    }
});

client.login(config.token);
