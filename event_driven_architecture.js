// Import Event Emitter
const EventEmitter = require("events");

// 1. ORDER SERVICE (Producer)
class OrderService extends EventEmitter {
  createOrder(item) {
    console.log(`✅ Order created for: ${item}`);
    this.emit("orderCreated", item); // Emit event
  }
}

// 2. SERVICES (Consumers)
class EmailService {
  static sendEmail(item) {
    console.log(`📧 Email sent for: ${item}`);
  }
}

class InventoryService {
  static updateStock(item) {
    console.log(`📦 Stock updated for: ${item}`);
  }
}

// 3. SETUP EVENT LISTENERS
const orderService = new OrderService();

orderService.on("orderCreated", (item) => {
  EmailService.sendEmail(item);
});

orderService.on("orderCreated", (item) => {
  InventoryService.updateStock(item);
});

// 4. TRIGGER EVENT
orderService.createOrder("iPhone 15");