<template>
  <div class="pembayaran-page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
      <nav>
        <router-link to="/dashboard-pembeli">HOME</router-link>
        <router-link to="/history">HISTORY</router-link>
      </nav>
    </header>

    <!-- Konten Utama -->
    <div class="container">
      <h2>💖 Pembayaran Pesanan</h2>
      <p class="subtitle">Yuk selesaikan pembayaranmu biar pesanan segera diproses! 💕</p>

      <!-- Jumlah Pembayaran -->
      <div class="card total-card">
        <h3>Jumlah yang Harus Dibayar</h3>
        <p class="nominal">Rp {{ totalPembayaran.toLocaleString('id-ID') }}</p>
      </div>

      <!-- QRIS -->
      <div class="card qris-card">
        <h3>💳 Pembayaran via QRIS</h3>
        <img src="@/assets/qr code.jpg" alt="QRIS Code" class="qris-img" />
        <p>Scan QR Code di atas menggunakan aplikasi e-wallet kamu (DANA, OVO, GoPay, dll).</p>
      </div>

      <!-- Upload Bukti Pembayaran -->
      <div class="card upload-card">
        <h3>📤 Upload Bukti Pembayaran</h3>
        <input type="file" @change="onFileChange" accept="image/*" />
        <div v-if="preview" class="preview">
          <img :src="preview" alt="Bukti Pembayaran" />
        </div>
        <button class="kirim-btn" @click="konfirmasiPembayaran">Kirim Bukti Pembayaran 💌</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "PembayaranPage",
  data() {
    return {
      totalPembayaran: 55000, // bisa nanti diambil dari state/pesanan
      buktiFile: null,
      preview: null,
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.buktiFile = file;
        this.preview = URL.createObjectURL(file);
      }
    },
    konfirmasiPembayaran() {
      if (!this.buktiFile) {
        Swal.fire({
          icon: "warning",
          title: "Oops 💭",
          text: "Kamu belum mengunggah bukti pembayaran!",
          background: "#fff0f5",
          confirmButtonColor: "#ec407a",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Pembayaran Terkirim 🎉",
        text: "Terima kasih! Admin akan segera memverifikasi pembayaranmu 💕",
        background: "#fff0f5",
        confirmButtonColor: "#ec407a",
      }).then(() => {
        this.$router.push("/history-pembeli");
      });
    },
  },
};
</script>

<style scoped>
.pembayaran-page {
  background-color: #ffe4ec;
  min-height: 100vh;
  font-family: "Fredoka One", cursive;
  color: #880e4f;
  padding-bottom: 40px;
}

/* Navbar */
.navbar {
  background: linear-gradient(135deg, #e53935, #ec407a);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  box-shadow: 0 4px 10px rgba(229, 57, 53, 0.25);
}

.navbar .brand {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1.2px;
}

.navbar nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar nav a {
  color: white;
  font-weight: bold;
  text-decoration: none;
  font-size: 16px;
  transition: 0.3s;
}

.navbar nav a:hover {
  color: #ffe6ee;
  text-shadow: 0 0 6px rgba(255, 204, 204, 0.8);
}

/* Container */
.container {
  max-width: 680px;
  margin: 40px auto;
  background: #fff8f9;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.2);
}

.container h2 {
  text-align: center;
  color: #e91e63;
  margin-bottom: 8px;
}

.subtitle {
  text-align: center;
  color: #ad1457;
  margin-bottom: 25px;
}

/* Card */
.card {
  background: #ffffff;
  border: 2px solid #ffc1cc;
  border-radius: 14px;
  padding: 20px 25px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

/* Total */
.total-card h3 {
  color: #c2185b;
  margin-bottom: 8px;
}

.nominal {
  font-size: 26px;
  color: #e91e63;
  font-weight: bold;
  text-align: center;
}

/* QRIS */
.qris-card {
  text-align: center;
}

.qris-img {
  width: 220px;
  height: 220px;
  object-fit: contain;
  border: 3px solid #f8bbd0;
  border-radius: 12px;
  margin: 15px 0;
  box-shadow: 0 4px 12px rgba(236, 64, 122, 0.3);
}

/* Upload Bukti */
.upload-card input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 2px solid #f8bbd0;
  border-radius: 10px;
  background: #fff0f5;
  color: #880e4f;
  font-family: inherit;
  margin-bottom: 15px;
  cursor: pointer;
}

.preview {
  margin-top: 10px;
  margin-bottom: 25px; /* ✅ Tambahkan jarak antara gambar dan tombol */
  text-align: center;
}

.preview img {
  width: 200px;
  border-radius: 10px;
  border: 3px solid #f8bbd0;
  box-shadow: 0 4px 10px rgba(236, 64, 122, 0.25);
}

/* Tombol Kirim */
.kirim-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, #f06292, #ec407a);
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 8px rgba(236, 64, 122, 0.3);
}

.kirim-btn:hover {
  background: linear-gradient(135deg, #ec407a, #d81b60);
  transform: scale(1.03);
}

</style>
