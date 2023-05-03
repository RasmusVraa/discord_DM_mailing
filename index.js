const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});
const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('ready', async () => {
  try {
    const guild = client.guilds.cache.get('1034860943399714888');
    const members = await guild.members.fetch();

    for (const [, member] of members) {
      try {
        const dmChannel = await member.createDM();
        await dmChannel.send('Здравствуйте! Уважаемый Игрок, Вам, как и всем игрокам вручена повестка, чтобы мобилизировать Вас, на второй сезон SplashRP. Повестка, считается полученной, с момента её отправки.');
        await delay(10000); // Задержка в 10 секунд
      } catch (error) {
        if (error.code === 50007) {
          console.log(`Пропускаю ${member.user.tag}, потому что ЛС закрыт.`);
        } else {
          console.error(`Ошибка при отправке сообщения ${member.user.tag}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Ошибка при получении участников сервера:', error);
  }
});


client.login('OTg3NDExOTY0NDI4OTc2MTc5.GKJ2eY.tAR-SQZO2IKiPta2asIIr9m4nwEiWRi3tscAfo');