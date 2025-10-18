<template>
  <div class="dashboard-admin">
    <!-- Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS - Admin</div>
      <button @click="logout" class="logout-btn">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </header>

    <!-- Konten Utama -->
    <main class="main-content">
      <!-- Sapaan -->
      <div class="welcome">
        Hello guys, Athreeks is here !!
      </div>

      <!-- Judul -->
      <h1 class="dashboard-title">DASHBOARD ADMIN</h1>

      <!-- Menu Card -->
      <div class="menu-container">
        <!-- Kelola Produk -->
        <div class="menu-card" @click="$router.push('/kelola-produk')">
          <i class="fas fa-cart-plus menu-icon"></i>
          <h3>KELOLA PRODUK</h3>
          <p>Tambah, edit, dan hapus produk</p>
        </div>

        <!-- Kelola Pesanan -->
        <div class="menu-card" @click="$router.push('/kelola-pesanan')">
          <i class="fas fa-clipboard-list menu-icon"></i>
          <h3>KELOLA PESANAN</h3>
          <p>Lihat daftar, proses, dan update status</p>
        </div>

        <!-- Lihat History -->
        <div class="menu-card" @click="$router.push('/history-admin')">
          <i class="fas fa-history menu-icon"></i>
          <h3>LIHAT HISTORY</h3>
          <p>Akses riwayat lengkap penjualan</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "DashboardAdmin",
  methods: {
    logout() {
      Swal.fire({
        title: 'Yakin ingin logout? 🚪',
        text: "Kamu akan kembali ke halaman login.",
        icon: 'warning',
        background: "#ffe4ec",
        color: "#880e4f",
        showCancelButton: true,
        confirmButtonColor: "#e53935",
        cancelButtonColor: "#f48fb1",
        confirmButtonText: '🔥 Ya, Logout',
        cancelButtonText: 'Batal',
        customClass: {
          popup: "swal-pink-popup"
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Logout Berhasil 👋',
            text: 'Sampai jumpa lagi Admin!',
            icon: 'success',
            background: "#fff0f5",
            color: "#ad1457",
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              popup: "swal-pink-popup"
            }
          });
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }
      });
    }
  }
};
</script>

<style scoped>
.dashboard-admin {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fce4ec;
  font-family: 'Fredoka One', cursive;
  overflow: hidden;
}

/* Navbar */
.navbar {
  background: #e53935;
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-weight: bold;
  font-size: 18px;
}

/* Tombol Logout */
.logout-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;
}
.logout-btn:hover {
  color: #ffccbc;
}

/* Konten utama */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome {
  font-size: 18px;
  color: #ad1457;
  opacity: 0.7;
  margin-bottom: 10px;
  position: relative;
  top: -15px;
}

.dashboard-title {
  font-size: 28px;
  font-weight: bold;
  color: #c62828;
  margin: 10px 0 25px 0;
  position: relative;
}
.dashboard-title::before,
.dashboard-title::after {
  content: "";
  display: inline-block;
  width: 60px;
  height: 2px;
  background: #c62828;
  margin: 0 10px;
  vertical-align: middle;
}

/* Menu Container */
.menu-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 30px;
  flex-wrap: nowrap;
  max-width: 100%;
  overflow-x: auto;
  padding: 20px 10px;
}

/* Menu Card */
.menu-card {
  background: #f8bbd0;
  border-radius: 20px;
  width: 250px;
  height: 200px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  transition: transform 0.4s ease, box-shadow 0.4s ease, opacity 0.3s;
  opacity: 0;
  animation: fadeZoomIn 0.6s ease forwards;
  flex-shrink: 0;
  cursor: pointer; /* ✨ Bisa diklik */
}
.menu-card:nth-child(1) { animation-delay: 0.2s; }
.menu-card:nth-child(2) { animation-delay: 0.4s; }
.menu-card:nth-child(3) { animation-delay: 0.6s; }
.menu-card:nth-child(4) { animation-delay: 0.8s; }

.menu-card:hover {
  transform: translateY(-15px) scale(1.05);
  box-shadow: 0 12px 25px rgba(0,0,0,0.35);
}

.menu-icon {
  font-size: 50px;
  color: #d81b60;
  margin-bottom: 12px;
}
.menu-card h3 {
  font-size: 18px;
  font-weight: bold;
  color: #c2185b;
  margin-bottom: 8px;
}
.menu-card p {
  font-size: 14px;
  color: #4a148c;
}

/* Animasi */
@keyframes fadeZoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Swal Custom */
.swal-pink-popup {
  border-radius: 20px !important;
  box-shadow: 0 6px 20px rgba(236, 64, 122, 0.4) !important;
  font-family: 'Fredoka One', cursive !important;
}

/* Responsif */
@media (max-width: 768px) {
  .menu-container {
    gap: 20px;
  }
  .menu-card {
    width: 220px;
    height: 180px;
  }
}
</style>
