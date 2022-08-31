const Discord = require("discord.js")
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

const delay = async(ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const prefix = ";"

const commands = {
    [`${prefix}hi`]: function(message){
        message.reply(`Hello, <@${message.author.id}> (i know your ip)`)
    },
    [`${prefix}annoy`]: async function(message){
        for (let i = 1; i <= 10; i++){
            message.channel.send("@everyone")
        }
    },
}

const specialMessages = {
    ["535652276396621834"]: "Omg  guyse i cant believe king dream talked to me im youruer bigest fast plss its an honor :sob:", // king dream

    //["239340460466765824"]: "Omg  guyse i cant believe mister steven abdluuah talked to me im youruer bigest fast plss its an honor :sob:", // mister steven
}

client.on("messageCreate", (message) => {
    if (specialMessages[message.author.id]){
        const sendChance = Math.random()
        if (sendChance > 0.75){
            message.channel.send(specialMessages[message.author.id])
        }
    }
    if (commands[message.content] && message.member.roles.cache.some(role => role.name === "pwarebotwhitelist")){
        commands[message.content](message) 
    }
})

const welcomeChannelId = "1014612524173373520"

client.on("guildMemberAdd", (member) => {
    member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Bro really joinned the server ong frrrr :sob: :skull:`)
})

client.login(process.env.TOKEN)