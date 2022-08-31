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

client.on("messageCreate", (message) => {
    if (commands[message.content]){
        commands[message.content](message)
    }
})

client.login(process.env.TOKEN)