import { Client, GatewayIntentBits, Partials, Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel]
});

client.once('ready', () => {
  console.log(`✅ Botul este online: ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isButton()) return;

  const member = await interaction.guild.members.fetch(interaction.message.mentions.users.first()?.id || interaction.user.id);
  const targetUser = member.user;

  if (interaction.customId.startsWith('accept_')) {
    await member.roles.add(process.env.ROLE_ACCEPTED);
    await targetUser.send(`✅ Felicitări! Ai fost acceptat în ${interaction.guild.name}.`);
    await interaction.reply({ content: `Ai acceptat aplicația. ✅`, ephemeral: true });
  } else if (interaction.customId.startsWith('reject_')) {
    await member.roles.add(process.env.ROLE_REJECTED);
    await targetUser.send(`❌ Din păcate, aplicația ta a fost respinsă pe ${interaction.guild.name}.`);
    await interaction.reply({ content: `Ai respins aplicația. ❌`, ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
