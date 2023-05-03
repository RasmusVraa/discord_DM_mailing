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
    const guild = client.guilds.cache.get('GUILD_ID'); // ID вашего сервера
    const members = await guild.members.fetch();

    for (const [, member] of members) {
      try {
        const dmChannel = await member.createDM();
        await dmChannel.send('Привет от бота!'); //сообщение рассылки
        await delay(10000); // Задержка в 10 секунд
      } catch (error) {
        if (error.code === 50007) {
          console.log(`Пропускаю ${member.user.tag}, потому что ЛС закрыт.`); //уведомление о там что ЛС пользователя закрыт
        } else {
          console.error(`Ошибка при отправке сообщения ${member.user.tag}:`, error); //сообщение об ошибке отправки сообщения
        }
      }
    }
  } catch (error) {
    console.error('Ошибка при получении участников сервера:', error); //сообщение ошибки получения игроков
  }
});


client.login('BOT_TOKEN'); //токен вашего бота
