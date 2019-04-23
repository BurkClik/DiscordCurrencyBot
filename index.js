const { Client, Attachment } = require('discord.js');
const auth = require('./auth.json');
// const currency = new Currency();
const fetch = require('node-fetch')

const token = auth.token;
const prefix = auth.prefix;

const client = new Client();

//! OOP ile currency.js den çek
async function getData(currency) {
    const response = await fetch(auth.fromCurrency + currency + auth.toCurrency + auth.api)
    const data = await response.json()
    return data["Realtime Currency Exchange Rate"]
}
//!


client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    //! Prefixi eklemeyi bul
    getData(message.content)
        .then(response => {
            switch (message.content) {
                case "USD":
                    if (Number(response["5. Exchange Rate"]).toFixed(3) > 5.5) {
                        const attachment = new Attachment('./images/money.PNG');
                        message.channel.send(`${ message.author }` + Number(response["5. Exchange Rate"]).toFixed(3) + `:dollar:\n` + response["6. Last Refreshed"]);
                        message.channel.send(attachment);    
                    } else {
                        message.channel.send(Number(response["5. Exchange Rate"]).toFixed(3) + ':dollar:\n' + response["6. Last Refreshed"]);
                    }
                    break;
                case "EUR":
                    message.channel.send(Number(response["5. Exchange Rate"]).toFixed(3) + ':euro:\n' + response["6. Last Refreshed"]);
                    break;
                case "GBP":
                    message.channel.send(Number(response["5. Exchange Rate"]).toFixed(3) + ':pound:\n' + response["6. Last Refreshed"]);
                    break;
                case "BTC":
                    message.channel.send(Number(response["5. Exchange Rate"]).toFixed(0) + ' TRY\n' + response["6. Last Refreshed"]);
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