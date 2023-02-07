const fs = require('fs');

module.exports = {
    name: 'setbio',
    description: 'Set the bio of the user',
    execute(message, args) {
        let userId = message.author.id;
        let bio = args.join(" ");

        let data = JSON.parse(fs.readFileSync('./json/bio.json'));
        data[userId] = {
            "bio": bio
        };

        fs.writeFileSync('./json/bio.json', JSON.stringify(data));
        message.channel.send(`Your bio has been set to: ${bio}`);
    },
};