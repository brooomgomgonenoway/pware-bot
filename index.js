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

const commands = {
    ["hi"]: function(message){
        message.reply(`Hello, <@${message.author.id}> (i know your ip)`)
    },
    ["annoy"]: function(message){
        message.reply(`will soon be added handsome`)
    },
}

const specialMessages = {
    ["535652276396621834"]: "Omg  guyse i cant believe king dream talked to me im youruer bigest fast plss its an honor :sob:", // king dream
}

client.on("messageCreate", (message) => {
    if (specialMessages[message.author.id]){
        const sendChance = Math.random()
        if (sendChance > 0.75){
            message.channel.send(specialMessages[message.author.id])
        }
    }
    if (commands[message.content]){
        commands[message.content](message)
    }
})

const welcomeChannelId = "1014612524173373520"

client.on("guildMemberAdd", (member) => {
    member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Bro really joinned the server ong frrrr :sob: :skull:`)
})

client.login(process.env.TOKEN)