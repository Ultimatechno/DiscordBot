const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
  ]
})

let bot = {
  client,
  prefix: "*",
  owners: ["566006539232739358"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands.js")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)

module.exports = bot

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return
  if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server")

  const slashcmd = client.slashcommands.get(interaction.commandName)

  if (!slashcmd) return interaction.reply("Invalid slash command")

  if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm))
    return  interaction.reply("You do not have permission for this command")

  slashcmd.run(client, interaction)

})

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}`)
// })

// client.on("messageCreate", (message) => {
//   if (message.content == "hi"){
//     message.reply("Hello World!")
//   }
// })

// const welcomeChannelId = "762780000936001626"

// client.on("guildMemberAdd", async (member) => {
//   const img = await generateImage(member)
//   member.guild.channels.cache.get(welcomeChannelId).send({
//     content: `<@${member.id}> Welcome to the server!`,
//     files: [img]
//   })
// })

client.login(process.env.TOKEN)