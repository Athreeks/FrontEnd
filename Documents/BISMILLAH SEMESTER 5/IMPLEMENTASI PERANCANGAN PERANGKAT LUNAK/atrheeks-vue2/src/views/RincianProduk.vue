<template>
  <div class="rincian-produk">
    <!-- Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
      <button class="home-btn" @click="$router.push('/dashboard-pembeli')">
        <i class="fas fa-home"></i> Home
      </button>
    </header>

    <main>
      <h1>Detail Produk</h1>

      <transition name="fade-scale" appear>
        <div v-if="produk" class="produk-detail-card">
          <!-- Gambar produk di kiri -->
          <div class="produk-gambar">
            <img :src="produk.image" :alt="produk.nama" />
          </div>

          <!-- Info produk di kanan -->
          <div class="produk-info">
            <h2>{{ produk.nama }}</h2>
            <p class="deskripsi">{{ produk.deskripsi }}</p>
            <p class="harga">Harga: Rp {{ formatHarga(produk.harga) }}</p>

            <!-- 🌈 Pilihan Warna hanya untuk Bagcharm & Gelang -->
            <div v-if="produk.warna" class="warna-section">
              <label>Pilih Warna:</label>
              <div class="warna-list">
                <div
                  v-for="(color, index) in produk.warna"
                  :key="index"
                  class="warna-box"
                  :style="{ backgroundColor: color.hex }"
                  :class="{ active: selectedColor === color.hex }"
                  @click="selectedColor = color.hex"
                ></div>
              </div>
              <!-- Nama warna -->
              <p v-if="selectedColor" class="warna-terpilih">
                Warna terpilih: <b>{{ getWarnaNama(selectedColor) }}</b>
              </p>
            </div>

            <div class="quantity">
              <label>Jumlah:</label>
              <input type="number" v-model.number="count" min="1" />
            </div>

            <button class="add-cart-btn" @click="addToCart">
              <i class="fas fa-cart-plus"></i> Masukkan Keranjang
            </button>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "RincianProduk",
  data() {
    return {
      count: 1,
      selectedColor: null,
      produkData: {
        "salad-buah": {
          nama: "Salad Buah",
          harga: 15000,
          deskripsi: "Beragam potongan buah segar dengan saus manis lembut.",
          image: require("@/assets/SaladBuah.jpg"),
        },
        "salad-jelly": {
          nama: "Salad Jelly",
          harga: 12000,
          deskripsi: "Jelly warna-warni yang imut dan segar dengan saus manis.",
          image: require("@/assets/SaladJelly.jpg"),
        },
        bagcharm: {
          nama: "Bagcharm",
          harga: 25000,
          deskripsi:
            "Aksesoris lucu seperti bagcharm handmade warna-warni 💕",
          image: require("@/assets/Bagcharm.jpg"),
          warna: [
            { hex: "#ffc0cb", nama: "Pink" },
            { hex: "#b39ddb", nama: "Ungu" },
            { hex: "#90caf9", nama: "Biru Muda" },
            { hex: "#a5d6a7", nama: "Hijau Mint" },
          ],
        },
        gelang: {
          nama: "Gelang",
          harga: 25000,
          deskripsi: "Gelang handmade imut dengan warna cerah dan lembut 🌸",
          image: require("@/assets/Gelang.jpg"),
          warna: [
            { hex: "#f48fb1", nama: "Pink Cerah" },
            { hex: "#ba68c8", nama: "Ungu Muda" },
            { hex: "#4fc3f7", nama: "Biru Langit" },
            { hex: "#ffcc80", nama: "Peach" },
          ],
        },
      },
    };
  },
  computed: {
    produk() {
      return this.produkData[this.$route.params.nama];
    },
  },
  methods: {
    formatHarga(angka) {
      return angka.toLocaleString("id-ID");
    },
    getWarnaNama(hex) {
      const produk = this.produk;
      if (!produk.warna) return "";
      const warnaObj = produk.warna.find((w) => w.hex === hex);
      return warnaObj ? warnaObj.nama : "";
    },
    addToCart() {
      if (this.produk.warna && !this.selectedColor) {
        Swal.fire({
          title: "Pilih warna dulu ya 🎨",
          icon: "warning",
          confirmButtonColor: "#ec407a",
          background: "#fff0f5",
        });
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const index = cart.findIndex(
        (item) =>
          item.name === this.produk.nama && item.color === this.selectedColor
      );

      if (index !== -1) {
        cart[index].quantity += this.count;
      } else {
        cart.push({
          name: this.produk.nama,
          price: this.produk.harga,
          quantity: this.count,
          image: this.produk.image,
          color: this.selectedColor,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(cart));

      Swal.fire({
        title: "Berhasil ditambahkan! 🛒",
        text: `${this.count} x ${this.produk.nama} ${
          this.selectedColor
            ? `(Warna: ${this.getWarnaNama(this.selectedColor)})`
            : ""
        } telah masuk keranjang.`,
        icon: "success",
        background: "#fff0f5",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  },
};
</script>

<style scoped>
/* Styling yang hanya untuk elemen di dalam komponen */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.rincian-produk {
  font-family: "Baloo 2", cursive;
  color: #880e4f;
  min-height: 100vh;
  background-color: #f8bbd0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

/* ====== NAVBAR ====== */
.navbar {
  background: #e53935;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  font-weight: bold;
  font-family: "Baloo 2", cursive;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.brand {
  font-size: 22px;
  letter-spacing: 2px;
  text-shadow: 1px 1px 2px rgba(255, 182, 193, 0.6);
}

.home-btn {
  background: #fff0f5;
  color: #e53935;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: 0.3s;
}

.home-btn:hover {
  background: #ffe4ec;
  transform: translateY(-2px);
}

/* ====== MAIN ====== */
main {
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 60px 20px;
  flex: 1;
}

main h1 {
  font-size: 32px;
  margin-bottom: 25px;
  color: #c2185b;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.7);
}

/* ====== CARD PRODUK ====== */
.produk-detail-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fce4ec;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  gap: 25px;
  width: 90%;
  max-width: 850px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.produk-detail-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
}

/* GAMBAR PRODUK */
.produk-gambar img {
  width: 300px;
  height: 220px;
  border-radius: 16px;
  object-fit: cover;
  border: 3px solid #f48fb1;
}

/* INFORMASI PRODUK */
.produk-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  gap: 8px;
}

.produk-info h2 {
  color: #ad1457;
  font-size: 24px;
}

.produk-info .deskripsi {
  font-size: 15px;
  color: #6a1b9a;
  line-height: 1.5;
  font-family: "Poppins", sans-serif;
}

.produk-info .harga {
  font-size: 16px;
  font-weight: bold;
  color: #d81b60;
}

/* 🌈 WARNA BOX */
.warna-section {
  margin: 10px 0;
}
.warna-section label {
  font-weight: bold;
  color: #ad1457;
}
.warna-list {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}
.warna-box {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s, border 0.2s;
}
.warna-box:hover {
  transform: scale(1.1);
}
.warna-box.active {
  border: 2px solid #ec407a;
  box-shadow: 0 0 6px rgba(236, 64, 122, 0.6);
}
.warna-terpilih {
  font-size: 14px;
  color: #7b1fa2;
  margin-top: 5px;
  font-style: italic;
}

/* JUMLAH */
.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.quantity input {
  width: 60px;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #d81b60;
  text-align: center;
}

/* TOMBOL TAMBAH KERANJANG */
.add-cart-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  background: #ec407a;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  align-self: flex-start;
}

.add-cart-btn:hover {
  background: #d81b60;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .produk-detail-card {
    flex-direction: column;
    text-align: center;
    max-width: 400px;
  }

  .produk-info {
    text-align: center;
    align-items: center;
  }

  .add-cart-btn {
    align-self: center;
  }
}
</style>

<style>
html, body, #app {
  background-color: #f8bbd0 !important;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
}
</style>
