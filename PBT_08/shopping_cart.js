function createCart() {
  // Private data
  let items = [];
  let discount = 0;
  let shippingDiscount = 0;

  return {
    // Thêm sản phẩm
    addItem(product, quantity = 1) {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({ ...product, quantity });
      }
    },

    // Xóa sản phẩm
    removeItem(productId) {
      items = items.filter((item) => item.id !== productId);
    },

    // Cập nhật số lượng
    updateQuantity(productId, newQuantity) {
      const item = items.find((item) => item.id === productId);

      if (item) {
        item.quantity = newQuantity;

        if (item.quantity <= 0) {
          this.removeItem(productId);
        }
      }
    },

    // Tổng tiền
    getTotal() {
      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      return subtotal - subtotal * discount - shippingDiscount;
    },

    // Áp dụng mã giảm giá
    applyDiscount(code) {
      discount = 0;
      shippingDiscount = 0;

      if (code === "SALE10") {
        discount = 0.1;
      } else if (code === "SALE20") {
        discount = 0.2;
      } else if (code === "FREESHIP") {
        shippingDiscount = 30000;
      }
    },

    // In giỏ hàng
    printCart() {
      console.table(
        items.map((item) => ({
          "Sản phẩm": item.name,
          SL: item.quantity,
          "Đơn giá": item.price.toLocaleString() + "đ",
          Tổng: (item.price * item.quantity).toLocaleString() + "đ",
        })),
      );

      console.log("Tổng cộng:", this.getTotal().toLocaleString() + "đ");
    },

    // Tổng số sản phẩm
    getItemCount() {
      return items.reduce((total, item) => total + item.quantity, 0);
    },

    // Xóa giỏ hàng
    clearCart() {
      items = [];
      discount = 0;
      shippingDiscount = 0;
    },
  };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());

cart.removeItem(3);

console.log("Sau xóa:", cart.getItemCount());
