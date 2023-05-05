require("./database/config");
const Order = require("./models/Order");
const cron = require("node-cron");
const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config();

const bot = new TelegramBot(process.env.TELEGRAM, { polling: true });
///get chat id when started
const chatIds = (process.env.CHAT_IDS?.split(",") || []).map((id) => +id);
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const senderName = msg.from.first_name;
  console.log(`Received message from ${senderName} (chat ID ${chatId})`);
  bot.sendMessage(chatId, `Hi ${senderName}, your chat ID is: ${chatId}`);
});

//in html
const genAlertMessageFromOrder = (order) => {
  return `
<b>New Order Received</b>
<b>Vendor:</b> ${order.vendor.name}
<b>Customer Name:</b> ${order.user.name}
<b>Customer Phone:</b> ${order.user.phone}
  `;
};
let last_order_id;

const alertOnOrderChange = async () => {
  const order_id = await Order.getLatestOrderId();
  //if last order doesn't match the last order id, then log the order
  if (order_id !== last_order_id) {
    const order = await Order.getOrderByIdForTelegram(order_id);
    // console.log("New order:", order);
    const message = genAlertMessageFromOrder(order);
    await Promise.all(
      chatIds.map((chatId) =>
        bot.sendMessage(chatId, message, {
          parse_mode: "HTML",
        })
      )
    );
    last_order_id = order_id;
  }
};

cron.schedule("*/5 * * * * *", () => {
  alertOnOrderChange();
});

module.exports = Order;
