import config from '../config.js';
import { checkWallets } from './checkWallet.js';
import './telegram.js';

setInterval(checkWallets, config.interval);
checkWallets();
