# TON Wallet Tracker

Приложение для отслеживания балансов TON-кошельков и отправки уведомлений в Telegram при изменении баланса.

## Описание

Это приложение отслеживает балансы указанных TON-кошельков с использованием TONAPI и отправляет уведомления через Telegram при изменении баланса. Приложение работает в фоновом режиме и позволяет управлять списком отслеживаемых кошельков прямо через команды Telegram бота.

## Функционал

1. **Отслеживание балансов TON-кошельков**: приложение регулярно проверяет баланс каждого кошелька в базе данных.
2. **Уведомления через Telegram**: при изменении баланса приложение отправляет уведомление с информацией о новом балансе.
3. **Управление кошельками**: добавление и удаление кошельков для отслеживания через команды в Telegram.

## Установка и настройка

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/qrewy/ton-tracker
cd ton-tracker
```

### 2. Установите зависимости

```bash
npm install
```

### 3. Настройка переменных окружения

Отредоктируйте config.js в корневой директории проекта и укажите следующие переменные:

```js
  bot_token: <токен_телеграм_бота>,
  chat_id: <ваш_telegram_chat_id>,
  interval: 10000 // интервал проверки в миллисекундах, например, 10 секунд,
```

- `API_TOKEN` — токен Telegram бота.
- `CHAT_ID` — ID чата, куда будут отправляться уведомления.
- `INTERVAL_MS` — интервал проверки балансов (по умолчанию каждые 10 минут).

### 4. Инициализация базы данных

База данных SQLite будет создана автоматически при первом запуске приложения. Вам не нужно выполнять дополнительные настройки для инициализации базы данных.

## Запуск приложения

Чтобы запустить приложение, выполните команду:

```bash
npm start
```

Приложение будет проверять балансы указанных кошельков с заданным интервалом и отправлять уведомления при изменении баланса.

## Управление кошельками через Telegram

Используйте следующие команды в чате с ботом для управления списком отслеживаемых кошельков:

- **Добавить кошелек для отслеживания**:

  ```
  /add <адрес_кошелька>
  ```

- **Удалить кошелек из отслеживания**:

  ```
  /remove <адрес_кошелька>
  ```

- **Просмотреть список отслеживаемых кошельков**:

  ```
  /list
  ```

## Используемые технологии

- **Node.js** — платформа для выполнения кода на JavaScript.
- **SQLite** — база данных для хранения информации о кошельках и их балансах.
- **Telegram Bot API** — для отправки уведомлений и обработки команд.
- **Axios** — для выполнения HTTP-запросов к TON API.