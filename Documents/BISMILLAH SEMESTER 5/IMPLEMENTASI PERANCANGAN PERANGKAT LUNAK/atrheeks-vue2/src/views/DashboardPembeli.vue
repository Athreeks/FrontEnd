<template>
  <div class="dashboard-pembeli">
    <!-- Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
      <nav>
        <router-link to="/history-pembeli">HISTORY</router-link>

        <!-- Ikon Keranjang -->
        <div class="dropdown" @click="toggleCart">
          <i class="fas fa-shopping-cart"></i>
          <div v-if="cartOpen" class="dropdown-cart" @click.stop>
            <h4>Keranjang</h4>

            <!-- Jika keranjang kosong -->
            <div v-if="cartItems.length === 0" class="empty-cart">Keranjang kosong</div>

            <!-- Jika ada item -->
            <div v-else>
              <div
                v-for="(item, index) in cartItems"
                :key="index"
                class="cart-item"
              >
                <!-- Checklist -->
                <input
                  type="checkbox"
                  v-model="item.selected"
                  class="cart-checkbox"
                />

                <img :src="item.image" :alt="item.name" />
                <div class="cart-info">
                  <p class="cart-name">{{ item.name }}</p>
                  <p class="cart-price">Rp {{ formatHarga(item.price) }} / pcs</p>

                  <!-- 🔢 Tombol tambah/kurang jumlah -->
                  <div class="qty-control">
                    <button class="qty-btn" @click="kurangiJumlah(index)" :disabled="item.quantity <= 1">-</button>
                    <span class="qty-number">{{ item.quantity }}</span>
                    <button class="qty-btn" @click="tambahJumlah(index)">+</button>
                  </div>

                  <!-- Tambahan Warna hanya untuk gelang dan bagcharm -->
                  <div
                    v-if="item.name === 'Gelang' || item.name === 'Bagcharm'"
                    class="cart-color"
                  >
                    <span>Warna:</span>
                    <div
                      class="color-box"
                      :style="{ backgroundColor: item.color }"
                    ></div>
                    <span class="color-name">{{ item.colorName }}</span>
                  </div>

                  <p class="cart-subtotal">
                    Subtotal: Rp {{ formatHarga(item.price * item.quantity) }}
                  </p>

                  <!-- 🗑️ Tombol hapus produk -->
                  <button class="hapus-btn" @click="hapusProduk(index)">
                    <i class="fas fa-trash"></i> Hapus
                  </button>
                </div>
              </div>

              <hr />
              <div class="cart-total">
                <p><strong>Total (Dipilih):</strong> Rp {{ formatHarga(totalDipilih) }}</p>
              </div>
              <button
                class="proses-btn"
                :disabled="totalDipilih === 0"
                @click="prosesPesanan"
              >
                Proses Pesanan
              </button>
            </div>
          </div>
        </div>

        <!-- Dropdown Profile -->
        <div class="dropdown profile-dropdown" @click="toggleDropdown">
          <i class="fas fa-user"></i>
          <div v-if="dropdownOpen" class="dropdown-menu">
            <router-link to="/profile" class="dropdown-link">
              <i class="fas fa-user-circle"></i> Profil
            </router-link>
            <button @click="logout" class="dropdown-link logout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Sapaan -->
    <div class="welcome animate-text">
      Hello guys, Athreeks is here !!
    </div>

    <!-- Etalase -->
    <section class="etalase">
      <h1>ETALASE</h1>
      <div class="produk-list">
        <div class="produk-card" @click="goToDetail('salad-buah')">
          <img src="@/assets/SaladBuah.jpg" alt="Salad Buah" />
          <h3>SALAD BUAH</h3>
          <p>Beragam potongan buah yang dilumuri dengan saus mayonais yang manis.</p>
        </div>

        <div class="produk-card" @click="goToDetail('salad-jelly')">
          <img src="@/assets/SaladJelly.jpg" alt="Salad Jelly" />
          <h3>SALAD JELLY</h3>
          <p>Potongan jelly yang sangat imut dengan berbagai rasa dan diatasnya ada saus mayonais manis.</p>
        </div>

        <div class="produk-card" @click="goToDetail('bagcharm')">
          <img src="@/assets/Bagcharm.jpg" alt="BagCharm" />
          <h3>BAGCHARM</h3>
          <p>Berbagai accessories seperti bagcharm dan gelang yang lucu.</p>
        </div>

        <div class="produk-card" @click="goToDetail('gelang')">
          <img src="@/assets/Gelang.jpg" alt="Gelang" />
          <h3>GELANG</h3>
          <p>Berbagai accessories seperti bagcharm dan gelang yang lucu.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "DashboardPembeli",
  data() {
    return {
      dropdownOpen: false,
      cartOpen: false,
      cartItems: [
        {
          name: "Salad Buah",
          price: 15000,
          quantity: 2,
          image: require("@/assets/SaladBuah.jpg"),
          selected: false,
        },
        {
          name: "Gelang",
          price: 25000,
          quantity: 1,
          color: "#9575cd",
          colorName: "Ungu Lembut",
          image: require("@/assets/Gelang.jpg"),
          selected: false,
        },
        {
          name: "Bagcharm",
          price: 30000,
          quantity: 1,
          color: "#f8bbd0",
          colorName: "Pink Pastel",
          image: require("@/assets/Bagcharm.jpg"),
          selected: false,
        },
      ],
    };
  },
  computed: {
    totalDipilih() {
      return this.cartItems
        .filter((item) => item.selected)
        .reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
      this.cartOpen = false;
    },
    toggleCart() {
      this.cartOpen = !this.cartOpen;
      this.dropdownOpen = false;
    },
    formatHarga(angka) {
      return angka.toLocaleString("id-ID");
    },
    goToDetail(namaProduk) {
      this.$router.push(`/rincian-produk/${namaProduk}`);
    },
    tambahJumlah(index) {
      this.cartItems[index].quantity++;
    },
    kurangiJumlah(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    hapusProduk(index) {
      Swal.fire({
        title: "Hapus Produk?",
        text: `Kamu yakin ingin menghapus ${this.cartItems[index].name} dari keranjang?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ec407a",
        cancelButtonColor: "#f48fb1",
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
        background: "#fff0f5",
      }).then((result) => {
        if (result.isConfirmed) {
          this.cartItems.splice(index, 1);
          Swal.fire({
            title: "Terhapus!",
            text: "Produk telah dihapus dari keranjang.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: "#fff0f5",
          });
        }
      });
    },
    prosesPesanan() {
      const dipilih = this.cartItems.filter((item) => item.selected);
      if (dipilih.length === 0) {
        Swal.fire({
          title: "Belum ada yang dipilih 🛒",
          text: "Silakan pilih produk yang ingin kamu proses!",
          icon: "warning",
          confirmButtonColor: "#ec407a",
        });
        return;
      }

      Swal.fire({
        title: "Proses Pesanan 🛍️",
        text: `Kamu akan memproses ${dipilih.length} item.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, proses!",
        cancelButtonText: "Batal",
        confirmButtonColor: "#ec407a",
        background: "#fff0f5",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Pesanan Diproses 🎉",
            text: "Pesananmu sedang diproses. Terima kasih sudah berbelanja di Athreeks!",
            icon: "success",
            background: "#fff0f5",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            this.cartItems = this.cartItems.filter((item) => !item.selected);
            this.$router.push("/proses-pesanan");
          }, 2000);
        }
      });
    },
    logout() {
      Swal.fire({
        title: "Yakin ingin logout? 🌸",
        text: "Kamu akan kembali ke halaman login.",
        icon: "warning",
        background: "#ffe4ec",
        color: "#880e4f",
        showCancelButton: true,
        confirmButtonColor: "#ec407a",
        cancelButtonColor: "#f48fb1",
        confirmButtonText: "💗 Ya, Logout",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Berhasil Logout! 👋",
            text: "Sampai jumpa lagi, tetap semangat ya!",
            icon: "success",
            background: "#fff0f5",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => this.$router.push("/"), 2000);
        }
      });
    },
  },
};
</script>

<style scoped>

.dashboard-pembeli {
  background: #f8bbd0;
  min-height: 100vh;
  font-family: "Fredoka One", cursive;
  color: #880e4f;
  overflow-x: hidden;
}

/* Navbar */
.navbar {
  background: #e53935; /* merah cerah khas Athreeks */
  color: white;
  display: flex;
  justify-content: space-between; /* kiri brand - kanan menu */
  align-items: center;
  padding: 12px 30px;
  font-weight: bold;
  font-family: "Fredoka One", cursive; /* tema utama */
  letter-spacing: 1px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2); /* efek elegan */
}

.navbar .brand {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(255, 182, 193, 0.6); /* efek lembut pink */
}

.navbar nav {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  top: -2px; /* biar posisi menu tetap seperti versi awal */
}

.navbar nav a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.3s ease, transform 0.2s ease;
}

.navbar nav a:hover {
  color: #ffe4ec; /* hover pink muda lembut */
  transform: translateY(-2px); /* efek melayang halus */
}

.navbar nav i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;
}

.navbar nav i:hover {
  color: #ffe4ec;
  transform: scale(1.1);
}


/* Dropdown umum */
.dropdown {
  position: relative;
}

/* Dropdown Cart */
.dropdown-cart {
  position: absolute;
  right: 0;
  top: 35px;
  background: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 260px;
  padding: 12px;
  z-index: 100;
}

/* Dropdown Profile */
.dropdown-menu {
  position: absolute;
  right: 0;
  top: 35px;
  background: #fff0f5; /* diganti jadi pink lembut agar kontras */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(236, 64, 122, 0.25);
  width: 180px;
  padding: 8px 0;
  z-index: 150;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* mencegah efek hover keluar batas */
  animation: fadeIn 0.25s ease-in-out;
}

/* 🔹 Link di dropdown */
.dropdown-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #ad1457 !important; /* merah keunguan lebih lembut */
  padding: 10px 15px;
  font-size: 14px;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  box-sizing: border-box;
}

/* Hover efek tetap lembut dan tidak keluar dari card */
.dropdown-link:hover {
  background: rgba(236, 64, 122, 0.15); /* lembut, tidak terlalu tebal */
  transform: translateX(3px);
  border-radius: 0; /* biar rata dengan batas card */
}

/* Ikon di dalam dropdown */
.dropdown-link i {
  color: #ec407a;
  width: 18px;
  text-align: center;
}

/* Logout section */
.dropdown-link.logout {
  border-top: 1px solid #f5c1d1;
  margin-top: 5px;
  color: #b71c1c;
}

.dropdown-link.logout i {
  color: #d81b60;
}

/* Tambahan: agar teks terlihat lebih tegas */
.dropdown-link:hover i {
  color: #d81b60;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Cart isi */
/* Tambahan gaya untuk checkbox di keranjang */
.cart-checkbox {
  margin-right: 8px;
  cursor: pointer;
  accent-color: #ec407a; /* warna pink khas Athreeks */
}


.cart-item {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
}
.cart-item img {
  width: 45px;
  height: 45px;
  border-radius: 6px;
  object-fit: cover;
}
.cart-info {
  font-size: 13px;
}
.cart-name {
  font-weight: bold;
  color: #880e4f;
}
.cart-price,
.cart-qty,
.cart-subtotal {
  color: #6a1b9a;
  margin: 2px 0;
}
.cart-total {
  text-align: right;
  margin-top: 10px;
  color: #c2185b;
}
.proses-btn {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: none;
  background: #ec407a;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.proses-btn:hover {
  background: #d81b60;
}

/* Sapaan */
.welcome {
  text-align: center;
  font-size: 26px;
  margin-top: 40px;
  font-weight: bold;
  color: #880e4f;
}

/* Etalase */
.etalase {
  text-align: center;
  margin-top: 30px;
  padding: 0 10px;
}
.etalase h1 {
  font-size: 40px;
  color: #d32f2f;
  margin-bottom: 30px;
}
.produk-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px; /* jarak antar card sedikit dikurangi */
  justify-items: center;
  padding: 0 60px; /* tambahkan padding kanan-kiri agar tidak mepet */
  max-width: 1400px; /* batasi lebar maksimum */
  margin: 0 auto; /* posisikan di tengah layar */
}


@media (max-width: 1200px) {
  .produk-list {
    grid-template-columns: repeat(3, 1fr); /* 📱 Tablet: 3 kolom */
  }
}

@media (max-width: 900px) {
  .produk-list {
    grid-template-columns: repeat(2, 1fr); /* 📱 HP besar: 2 kolom */
  }
}

@media (max-width: 600px) {
  .produk-list {
    grid-template-columns: 1fr; /* 📱 HP kecil: 1 kolom */
  }
}

.produk-card {
  background: #fce4ec;
  border-radius: 16px;
  padding: 18px;
  width: 240px; /* 🩷 dikurangi dari 280px → 240px */
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  cursor: pointer;
}

.produk-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(236, 64, 122, 0.3);
}

.produk-card img {
  width: 100%;
  height: 160px; /* 🩷 lebih proporsional dengan ukuran baru */
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 12px;
}

.produk-card h3 {
  color: #c2185b;
  margin-bottom: 8px;
}
.produk-card p {
  font-size: 14px;
  color: #6a1b9a;
}

/* Animasi sapaan */
.animate-text {
  animation: fadePulse 3s ease-in-out infinite;
}
@keyframes fadePulse {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.9;
    transform: scale(0.95);
  }
}

.cart-color {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 4px 0;
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
  font-weight: 600;
  color: #ad1457;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 4px 0;
}
.qty-btn {
  background-color: #ec407a;
  color: white;
  border: none;
  border-radius: 6px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}
.qty-btn:hover {
  background-color: #d81b60;
}
.qty-number {
  font-weight: bold;
  color: #6a1b9a;
  width: 24px;
  text-align: center;
}
.hapus-btn {
  background: #fce4ec;
  border: 1px solid #ec407a;
  color: #ec407a;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  padding: 4px 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(236, 64, 122, 0.2);
}

.hapus-btn i {
  color: #ec407a;
  transition: transform 0.3s ease, color 0.3s ease;
}

.hapus-btn:hover {
  background: #ec407a;
  color: white;
  border-color: #ec407a;
  box-shadow: 0 4px 10px rgba(236, 64, 122, 0.4);
  transform: translateY(-1px);
}

.hapus-btn:hover i {
  color: white;
  transform: rotate(-15deg);
}

/* ✨ Animasi lembut saat tombol muncul */
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hapus-btn {
  animation: fadeSlideIn 0.4s ease;
}



</style>
