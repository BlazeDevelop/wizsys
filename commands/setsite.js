const fs = require('fs');

module.exports = {
    name: 'setsite',
    description: 'Set the website of the user',
    execute(message, args) {
        let userId = message.author.id;
        let website = args.join(" ");

        let data = JSON.parse(fs.readFileSync('./json/site.json'));
        data[userId] = {
            "website": website
        };

        fs.writeFileSync('./json/site.json', JSON.stringify(data));
        message.channel.send(`Your website has been set to: ${website}`);
    },
};