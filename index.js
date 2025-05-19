require('dotenv').config();
const { Client, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.once('ready', () => {
    console.log(`Botul este online!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const member = await interaction.guild.members.fetch(interaction.user.id);
    if (interaction.customId === 'accept') {
        await member.roles.add(process.env.ROLE_ACCEPTED);
        await interaction.reply({ content: 'Ai fost acceptat!', ephemeral: true });
    } else if (interaction.customId === 'reject') {
        await member.roles.add(process.env.ROLE_REJECTED);
        await interaction.reply({ content: 'Ai fost respins!', ephemeral: true });
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.content.startsWith('!aplicatie')) {
        const embed = new EmbedBuilder()
            .setTitle('Aplicatie Noua')
            .setDescription('A fost trimisă o aplicație.')
            .setColor(0x00AE86);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('accept')
                .setLabel('Acceptă')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('reject')
                .setLabel('Respinge')
                .setStyle(ButtonStyle.Danger),
        );

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

client.login(process.env.DISCORD_TOKEN);