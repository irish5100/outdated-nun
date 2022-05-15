const {Client,CommandInteraction,ntegrationApplication,} = require("discord.js");
const Levels = require("discord-xp");
module.exports = {
  name: "rank",
  description: "Get rank of a user.",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const user = interaction.options.getUser("user");
    const levels = await Levels.fetch(user.id, interaction.guildId);
    if (!levels) {
      return interaction.followUp("User has no xp.");
    }
    interaction.followUp(
      `${user.tag} has ${levels.xp} XP and is on ${levels.level}`
    );
  },
};