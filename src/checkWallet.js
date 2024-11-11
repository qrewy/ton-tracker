import axios from 'axios'
import { getBalance, updateBalance, getTrackedWallets } from './database.js';
import { sendTelegramNotification } from './telegram.js';

async function getWalletBalance(wallet) {
  const url = `https://tonapi.io/v2/accounts/${wallet}`;
  try {
    const response = await axios.get(url);
    return response.data.balance || 0;
  } catch (error) {
    console.error(`Ошибка при получении баланса кошелька ${wallet}:`, error);
    return null;
  }
}

export async function checkWallets() {
  console.log("Проверка балансов...");
  const wallets = await getTrackedWallets();
  for (const wallet of wallets) {
    const newBalance = await getWalletBalance(wallet);
    if (newBalance === null) continue;

    const oldBalance = await getBalance(wallet);
    const change = newBalance - oldBalance;

    if (change !== 0) {
      await sendTelegramNotification(wallet, change, newBalance);
      await updateBalance(wallet, newBalance);
    }
  }
}
