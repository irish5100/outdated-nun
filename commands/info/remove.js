const { Command } = require("reconlx");
const moment = require("moment");
const schema = require("../../models/code");
const User = require("../../models/User");

module.exports = new Command({
  // options
  name: "rempremium",
  description: `Remove Premium From A Member`,
  userPermissions: [],
  category: "Premium",
  options: [
    {
      name: "user",
      description: `Mention A Member`,
      type: "USER",
      required: true,
    },
  ],
  // command start
  run: async ({ client, interaction, args }) => {
    // Code
    let user = interaction.options.getUser("user");
    let data = client.userSettings.get(user.id);
    if (!data.isPremium) {
      return interaction.followUp(`:x: Error | ${user} Has Not Got Premium`);
    } else {
      await User.findOneAndRemove({ Id: user.id });
      await client.userSettings.delete(user.id);
      interaction.followUp(`:white_check_mark: Success | ${user} Was Removed From Premium`);
    }
  },
});