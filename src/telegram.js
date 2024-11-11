import TelegramBot from 'node-telegram-bot-api';
import config from '../config.js';
import { addWallet, removeWallet, getTrackedWallets } from './database.js';

const bot = new TelegramBot(config.bot_token, { polling: true });

bot.onText(/\/add (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const walletAddress = match[1];

  try {
    await addWallet(walletAddress);
    bot.sendMessage(chatId, `Кошелек ${walletAddress} добавлен для отслеживания.`);
  } catch (error) {
    bot.sendMessage(chatId, `Ошибка при добавлении кошелька: ${error.message}`);
  }
});

bot.onText(/\/remove (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const walletAddress = match[1];

  try {
    await removeWallet(walletAddress);
    bot.sendMessage(chatId, `Кошелек ${walletAddress} удален из отслеживания.`);
  } catch (error) {
    bot.sendMessage(chatId, `Ошибка при удалении кошелька: ${error.message}`);
  }
});

bot.onText(/\/list/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const wallets = await getTrackedWallets();
    const walletList = wallets.length > 0 ? wallets.join('\n') : 'Список пуст.';
    bot.sendMessage(chatId, `Отслеживаемые кошельки:\n${walletList}`);
  } catch (error) {
    bot.sendMessage(chatId, `Ошибка при получении списка кошельков: ${error.message}`);
  }
});

export async function sendTelegramNotification(wallet, change, newBalance) {
  const message = `
🟢 Обновление баланса TON кошелька!

Адрес: ${wallet}
Изменение: ${change > 0 ? '+' : ''}${((change / 1e9).toFixed(2))} TON
Новый баланс: ${(newBalance / 1e9).toFixed(2)} TON
  `;
  await bot.sendMessage(config.chat_id, message);
}

export default bot;
