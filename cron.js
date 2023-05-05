require("./database/config");
const Order = require("./models/Order");
const cron = require("node-cron");
const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config();

const bot = new TelegramBot(process.env.TELEGRAM, { polling: true });
///get chat id when started
const chatIds = [342833991, 1167478253];
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  console.log(`Received message from chat ID ${chatId}`);
  //send chat id ass meeage
  bot.sendMessage(chatId, "Your chat id is: " + chatId);
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
