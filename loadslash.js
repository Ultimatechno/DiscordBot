const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
  ]
})

let bot = {
  client
}

const guildId = "762628042702192680"

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands.js")(bot, reload)
client.loadSlashCommands(bot, false)

client.on("ready", async () => {
  const guild = client.guilds.cache.get(guildId)
  if (!guild)
    return console.error("Target guild not found")

  await guild.commands.set([...client.slashcommands.values()])
  console.log(`Successfully loaded in ${client.slashcommands.size} slash command`)
  process.exit(0)
})


client.login(process.env.TOKEN)