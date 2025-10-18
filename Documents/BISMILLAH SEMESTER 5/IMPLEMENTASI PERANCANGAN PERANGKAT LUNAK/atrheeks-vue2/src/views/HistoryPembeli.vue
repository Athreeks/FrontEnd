<template>
  <div class="history-page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
      <nav>
        <router-link to="/dashboard-pembeli">Dashboard</router-link>
      </nav>
    </header>

    <!-- Judul -->
    <div class="header">
      <h1>Riwayat Pesanan Kamu 💖</h1>
      <p>Cek status dan detail pesanan kamu di sini~</p>
    </div>

    <!-- Bagian Semua Status (Berjejer) -->
    <div class="status-container">
      <!-- Sedang Dibuat -->
      <section v-if="filteredOrders('Sedang Dibuat').length" class="status-section">
        <h2>🧁 Sedang Dibuat</h2>
        <div class="order-list">
          <div
            v-for="(order, index) in filteredOrders('Sedang Dibuat')"
            :key="index"
            class="order-card"
          >
            <div class="order-header">
              <h3>Pesanan #{{ order.id }}</h3>
              <span class="date">📅 {{ order.date }}</span>
            </div>

            <div class="items-container">
              <div v-for="(item, i) in order.items" :key="i" class="item">
                <img :src="item.image" alt="produk" class="item-img" />
                <div class="item-info">
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-qty">Jumlah: {{ item.quantity }}</p>
                  <p class="item-price">Rp{{ item.price.toLocaleString() }}</p>
                  <!-- Warna Produk -->
                  <div v-if="item.color" class="warna-produk">
                    <span>Warna:</span>
                    <div class="color-box" :style="{ backgroundColor: item.color }"></div>
                    <span class="color-name">{{ item.colorName }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="order-footer">
              <p><strong>Total:</strong> Rp{{ order.total.toLocaleString() }}</p>
              <span class="status dibuat">{{ order.status }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Sedang Diantar -->
      <section v-if="filteredOrders('Sedang Diantar').length" class="status-section">
        <h2>🚚 Sedang Diantar</h2>
        <div class="order-list">
          <div
            v-for="(order, index) in filteredOrders('Sedang Diantar')"
            :key="index"
            class="order-card"
          >
            <div class="order-header">
              <h3>Pesanan #{{ order.id }}</h3>
              <span class="date">📅 {{ order.date }}</span>
            </div>

            <div class="items-container">
              <div v-for="(item, i) in order.items" :key="i" class="item">
                <img :src="item.image" alt="produk" class="item-img" />
                <div class="item-info">
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-qty">Jumlah: {{ item.quantity }}</p>
                  <p class="item-price">Rp{{ item.price.toLocaleString() }}</p>
                  <!-- Warna Produk -->
                  <div v-if="item.color" class="warna-produk">
                    <span>Warna:</span>
                    <div class="color-box" :style="{ backgroundColor: item.color }"></div>
                    <span class="color-name">{{ item.colorName }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="order-footer">
              <p><strong>Total:</strong> Rp{{ order.total.toLocaleString() }}</p>
              <span class="status antar">{{ order.status }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Selesai -->
      <section v-if="filteredOrders('Selesai').length" class="status-section">
        <h2>🌸 Selesai</h2>
        <div class="order-list">
          <div
            v-for="(order, index) in filteredOrders('Selesai')"
            :key="index"
            class="order-card"
          >
            <div class="order-header">
              <h3>Pesanan #{{ order.id }}</h3>
              <span class="date">📅 {{ order.date }}</span>
            </div>

            <div class="items-container">
              <div v-for="(item, i) in order.items" :key="i" class="item">
                <img :src="item.image" alt="produk" class="item-img" />
                <div class="item-info">
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-qty">Jumlah: {{ item.quantity }}</p>
                  <p class="item-price">Rp{{ item.price.toLocaleString() }}</p>
                  <!-- Warna Produk -->
                  <div v-if="item.color" class="warna-produk">
                    <span>Warna:</span>
                    <div class="color-box" :style="{ backgroundColor: item.color }"></div>
                    <span class="color-name">{{ item.colorName }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="order-footer">
              <p><strong>Total:</strong> Rp{{ order.total.toLocaleString() }}</p>
              <span class="status selesai">{{ order.status }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryPembeli",
  data() {
    return {
      orders: [
        {
          id: "20251001",
          date: "1 Oktober 2025",
          items: [
            { name: "Salad Buah", quantity: 1, price: 35000, image: require("@/assets/SaladBuah.jpg") },
          ],
          total: 35000,
          status: "Sedang Dibuat",
        },
        {
          id: "20251003",
          date: "3 Oktober 2025",
          items: [
            { name: "Salad Buah", quantity: 1, price: 45000, image: require("@/assets/SaladBuah.jpg") },
          ],
          total: 45000,
          status: "Sedang Diantar",
        },
        {
          id: "20250927",
          date: "27 September 2025",
          items: [
            { name: "Salad Jelly", quantity: 2, price: 20000, image: require("@/assets/SaladJelly.jpg") },
            { name: "Salad Buah", quantity: 1, price: 25000, image: require("@/assets/SaladBuah.jpg") },
          ],
          total: 65000,
          status: "Selesai",
        },
        {
          id: "20250930",
          date: "30 September 2025",
          items: [
            { name: "Bagcharm", quantity: 3, price: 10000, color: "#9575cd", colorName: "Ungu Lembut", image: require("@/assets/Bagcharm.jpg") },
            { name: "Salad Buah", quantity: 1, price: 25000, image: require("@/assets/SaladBuah.jpg") },
          ],
          total: 55000,
          status: "Selesai",
        },
      ],
    };
  },
  methods: {
    filteredOrders(status) {
      return this.orders.filter((o) => o.status === status);
    },
  },
};
</script>

<style scoped>
.history-page {
  background: #f8bbd0;
  min-height: 100vh;
  padding-bottom: 40px;
  font-family: "Fredoka One", cursive;
}

/* Navbar */
.navbar {
  background: #e53935;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.navbar .brand {
  font-size: 22px;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(255, 182, 193, 0.6);
}

.navbar nav {
  display: flex;
  align-items: center;
  gap: 22px;
}

.navbar nav a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.3s ease, transform 0.2s ease;
}

.navbar nav a:hover {
  color: #ffe4ec;
  transform: translateY(-2px);
}

/* Header */
.header {
  text-align: center;
  margin: 30px 0 20px;
}
.header h1 {
  color: #e91e63;
  font-size: 28px;
  margin-bottom: 5px;
}
.header p {
  color: #555;
}

/* Status container */
.status-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 20px;
}

/* Section status */
.status-section {
  min-width: 340px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
}
.status-section h2 {
  color: #ec407a;
  text-align: center;
  margin-bottom: 15px;
  font-size: 20px;
}

/* Order list */
.order-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Order card */
.order-card {
  background: #fff0f6;
  border-radius: 10px;
  padding: 15px;
  border-left: 5px solid #f06292;
  transition: transform 0.2s;
}
.order-card:hover {
  transform: translateY(-3px);
}

/* Item */
.item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.item-img {
  width: 55px;
  height: 55px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 10px;
}
.item-name {
  font-weight: bold;
  color: #333;
}
.item-qty {
  font-size: 13px;
  color: #666;
}
.item-price {
  color: #e91e63;
  font-weight: bold;
}

/* Footer */
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.status {
  padding: 5px 12px;
  border-radius: 12px;
  font-weight: bold;
  color: white;
}
.status.dibuat { background: #ffb300; }
.status.antar { background: #42a5f5; }
.status.selesai { background: #66bb6a; }

.warna-produk {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  font-size: 13px;
  color: #6a1b9a;
}
.color-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #aaa;
  box-shadow: 0 0 2px rgba(0,0,0,0.2);
}
.color-name {
  font-weight: bold;
  color: #ad1457;
}
</style>
