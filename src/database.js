import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS wallets (
    wallet TEXT PRIMARY KEY,
    balance REAL DEFAULT 0
  )`);
});

export function getBalance(wallet) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT balance FROM wallets WHERE wallet = ?`, [wallet], (err, row) => {
      if (err) return reject(err);
      resolve(row ? row.balance : 0);
    });
  });
}

export function updateBalance(wallet, balance) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT OR REPLACE INTO wallets (wallet, balance) VALUES (?, ?)`, [wallet, balance], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export function addWallet(wallet) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT OR IGNORE INTO wallets (wallet) VALUES (?)`, [wallet], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export function removeWallet(wallet) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM wallets WHERE wallet = ?`, [wallet], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export function getTrackedWallets() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT wallet FROM wallets`, (err, rows) => {
      if (err) return reject(err);
      resolve(rows.map(row => row.wallet));
    });
  });
}

export default db;
