const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")

module.exports = {
  name: "rolesselector",
  category: "roles",
  devOnly: true,
  run: async ({client, message, args}) => {
    message.channel.send({
      embeds: [
        new MessageEmbed().setTitle("Select Role").setDescription("Select roles from the buttons below").setColor("BLUE")
      ],
      components: [
        new MessageActionRow().addComponents([
          new MessageButton().setCustomId("role-1033932388872507453").setStyle("PRIMARY").setLabel("Monkey Purp")
        ])
      ]
    })
  }
}