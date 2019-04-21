const { Client, Attachment } = require('discord.js');
const auth = require('./auth.json');
// const currency = new Currency();
const fetch = require('node-fetch')

const token = auth.token;
const prefix = auth.prefix;

const client = new Client();

//! OOP ile currency.js den çek
async function getData(currency) {
    const response = await fetch(auth.api + 'base=' + currency)
    const data = await response.json()
    return data.rates.TRY
}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    //! Prefixi eklemeyi bul
    getData(message.content)
        .then(response => {
            switch (message.content) {
                case "USD":
                    if (Number(response.toFixed(2)) > 5.50) {
                        const attachment = new Attachment('./images/money.PNG');
                        message.channel.send(`${ message.author }` + response.toFixed(2) + `:dollar:`);
                        message.channel.send(attachment);    
                    } else {
                        message.channel.send(response.toFixed(2) + ':dollar:');
                    }
                    break;
                case "EUR":
                    message.channel.send(response.toFixed(2) + ':euro:');
                    break;
                case "GBP":
                    message.channel.send(response.toFixed(2) + ':pound:');
                    break;
                // default:
                //     message.channel.send("404!");
                //     break;
            }
        })
        .catch(err => console.log(err))
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Hoşgeldin ${member}`);
})

client.on('guildMemberUpdate', member => {
    
})

client.login(token)