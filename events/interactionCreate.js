module.exports = {
  name: "interactionCreate",
  run: async (bot, interaction) => {
    if (interaction.isCommand()) handleSlashCommand(bot, interaction)
    else if (interaction.isButton()) handleButton(bot, interaction)

  },
}

const handleButton = (bot, interaction) => {
  const {client} = bot

  const [name, ...params] = interaction.customId.split("-")

  const button = client.buttons.get(name)

  if (!button) return
  button.run(client, interaction, params)
}

const handleSlashCommand = (bot, interaction) => {
  const {client} = bot
  if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server")

  const slashcmd = client.slashcommands.get(interaction.commandName)

  if (!slashcmd) return interaction.reply("Invalid slash command")

  if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm))
    return  interaction.reply("You do not have permission for this command")

  slashcmd.run(client, interaction)
}