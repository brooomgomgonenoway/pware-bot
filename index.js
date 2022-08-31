const Discord = require("discord.js")
const https = require("https")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent",
        "GuildMembers",
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

function httpGet(url) {
    return new Promise((resolve, reject) => {
      const http = require('http'),
        https = require('https');
  
      let client = http;
  
      if (url.toString().indexOf("https") === 0) {
        client = https;
      }
  
      client.get(url, (resp) => {
        let chunks = [];
  
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          chunks.push(chunk);
        });
  
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
  
      }).on("error", (err) => {
        reject(err);
      });
    });
}

const delay = async(ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const randomFacts1 = [
    "I know this is weird but i",
    "Sometimes i",
    "So basically i",
    "I actually"
]

const randomFacts2 = [
    "sometimes shit my bed",
    "get aroused to furries",
    "put the phone in my left hand and started twisting it so hard :sob:",
    "think i have aids"
]

const prefix = ";"

const commands = {
    [`${prefix}hi`]: function(message){
        message.reply(`Hello, <@${message.author.id}> (i know your ip)`)
    },
    /*[`${prefix}annoy`]: async function(message){
        for (let i = 1; i <= 10; i++){
            message.channel.send("@everyone")
        }
    },*/
    [`${prefix}randomsaucecode`]: function(message){
        if (message.channel.nsfw){
            const sauceCode = Math.floor(Math.random()*418020)
            message.reply(`Sauce Code: **${sauceCode}**\nLink: https://nhentai.net/g/${sauceCode}/`)
        }
        else {
            message.reply("You can only use this command in an NSFW channel.")
        }
    },
    [`${prefix}randomfact`]: function(message){
        const fact1 = randomFacts1[Math.floor(Math.random()*randomFacts1.length)]
        const fact2 = randomFacts2[Math.floor(Math.random()*randomFacts2.length)]
        message.reply(`${fact1} ${fact2}`)
    },
    [`${prefix}requestwebtest`]: function(message){
        //let getGayManga;
        let webInfo = "";
        let gaylink = "";
        let getGayManga = function(){
            const randomsauce = Math.floor(Math.random()*402314);
            let currentlink = `https://nhentai.to/g/${randomsauce}`
            (async(url) => {
                var buf = await httpGet(url);
                webInfo = buf.toString('utf-8');
            })(currentlink);
            if(!webInfo.search("yaoi")){
                getGayManga()
            }
            else {
                gaylink = currentlink
            }
        }
        
        while (gaylink == ""){
            getGayManga()
        }
        console.log(gaylink)
    },
}

const specialMessages = {
    ["535652276396621834"]: "Omg  guyse i cant believe king dream talked to me im youruer bigest fast plss its an honor :sob:", // king dream

    //["239340460466765824"]: "Omg  guyse i cant believe mister steven abdluuah talked to me im youruer bigest fast plss its an honor :sob:", // mister steven
}

client.on("messageCreate", (message) => {
    if (specialMessages[message.author.id]){
        const sendChance = Math.random()
        if (sendChance > 0.9){
            message.channel.send(specialMessages[message.author.id])
        }
    }
    if (commands[message.content]){ // message.member.roles.cache.some(role => role.name === "pwarebotwhitelist") // checks for a role
        commands[message.content](message) 
        
    }
})

const welcomeChannelId = "1014612524173373520"

client.on("guildMemberAdd", (member) => {
    member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Bro really joinned the server ong frrrr :sob: :skull:`)
})

client.login(process.env.TOKEN)