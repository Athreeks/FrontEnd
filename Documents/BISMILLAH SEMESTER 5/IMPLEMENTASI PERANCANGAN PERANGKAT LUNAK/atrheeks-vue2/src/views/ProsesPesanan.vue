<template>
  <div class="proses-pesanan">
    <!-- Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
      <nav>
        <router-link to="/dashboard-pembeli">HOME</router-link>
      </nav>
    </header>

    <!-- Konten Utama -->
    <div class="container">
      <h2>🛍️ Proses Pesanan Kamu</h2>
      <p class="subtitle">Isi detail pengirimanmu di bawah ini, ya~ 💗</p>

      <!-- Rincian Pesanan -->
      <div class="card rincian">
        <h3>Rincian Pesanan</h3>
        <ul>
          <li
            class="item"
            v-for="(produk, index) in pesanan"
            :key="index"
          >
            <img :src="produk.image" :alt="produk.nama" />
            <div class="info">
              <strong>{{ produk.nama }}</strong>
              <p>{{ produk.jumlah }} pcs — Rp {{ formatHarga(produk.harga * produk.jumlah) }}</p>

              <!-- Hanya tampilkan warna jika produk punya properti color -->
              <div v-if="produk.color" class="warna-produk">
                <span>Warna:</span>
                <div
                  class="color-box"
                  :style="{ backgroundColor: produk.color }"
                ></div>
                <span class="color-name">{{ produk.colorName }}</span>
              </div>
            </div>
          </li>
        </ul>
        <p class="total"><strong>Total:</strong> Rp {{ formatHarga(totalHarga) }}</p>
      </div>

      <!-- Formulir Pengisian -->
      <div class="card form-card">
        <h3>📦 Detail Pengiriman</h3>

        <div class="form-group">
          <label>Nomor Telepon</label>
          <input v-model="noTelepon" type="text" placeholder="Masukkan nomor telepon kamu" />
        </div>

        <div class="form-group">
          <label>Pilih Jenis Pengantaran</label>
          <select v-model="jenisPengantaran">
            <option disabled value="">-- Pilih Pengantaran --</option>
            <option>Diantar ke Rumah</option>
            <option>COD (Ambil di Telkom University Purwokerto)</option>
          </select>
        </div>

        <!-- Jika pilih diantar ke rumah -->
        <div v-if="jenisPengantaran === 'Diantar ke Rumah'" class="form-group">
          <label>Alamat Lengkap</label>
          <textarea v-model="alamat" rows="3" placeholder="Masukkan alamat lengkap kamu"></textarea>
        </div>

        <!-- Jika COD -->
        <div v-if="jenisPengantaran === 'COD (Ambil di Telkom University Purwokerto)'" class="info-cod">
          <h4>📍 Informasi COD</h4>
          <p>
            COD dilakukan di <strong>Telkom University Purwokerto</strong><br />
            Jl. DI Panjaitan No.128, Karangreja, Purwokerto Kidul,<br />
            Kec. Purwokerto Sel., Kabupaten Banyumas, Jawa Tengah 53147.
          </p>
          <p class="admin-info">
            Hubungi admin via WhatsApp:
            <a href="https://wa.me/6281234567890" target="_blank">0812-3456-7890</a>
          </p>
        </div>

        <button class="bayar-btn" @click="lanjutPembayaran">💖 Bayar Sekarang</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ProsesPesanan",
  data() {
    return {
      noTelepon: "",
      jenisPengantaran: "",
      alamat: "",
      pesanan: [
        {
          nama: "Salad Buah",
          harga: 15000,
          jumlah: 2,
          image: require("@/assets/SaladBuah.jpg"),
        },
        {
          nama: "Gelang",
          harga: 25000,
          jumlah: 1,
          color: "#9575cd",
          colorName: "Ungu Lembut",
          image: require("@/assets/Gelang.jpg"),
        },
      ],
    };
  },
  computed: {
    totalHarga() {
      return this.pesanan.reduce((acc, item) => acc + item.harga * item.jumlah, 0);
    },
  },
  methods: {
    formatHarga(angka) {
      return angka.toLocaleString("id-ID");
    },
    lanjutPembayaran() {
      if (!this.noTelepon || !this.jenisPengantaran) {
        Swal.fire({
          icon: "warning",
          title: "Oops... 😿",
          text: "Lengkapi nomor telepon dan jenis pengantaran ya~ 💗",
          background: "#fff0f5",
          confirmButtonColor: "#ec407a",
        });
        return;
      }

      if (this.jenisPengantaran === "Diantar ke Rumah" && !this.alamat) {
        Swal.fire({
          icon: "warning",
          title: "Alamat Kosong!",
          text: "Kamu perlu mengisi alamat lengkap dulu ya 🌸",
          background: "#fff0f5",
          confirmButtonColor: "#ec407a",
        });
        return;
      }

      Swal.fire({
        title: "Yakin mau lanjut ke pembayaran? 💕",
        text: "Pastikan data sudah benar ya~",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#ec407a",
        cancelButtonColor: "#f48fb1",
        confirmButtonText: "Ya, lanjut!",
        cancelButtonText: "Batal",
        background: "#fff0f5",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/pembayaran");
        }
      });
    },
  },
};
</script>

<style scoped>
.proses-pesanan {
  background-color: #f8bbd0;
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
  font-family: "Fredoka One", cursive;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(229, 57, 53, 0.25);
  border-bottom: 2px solid rgba(255, 255, 255, 0.15);
}

.navbar .brand {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(255, 182, 193, 0.7);
}

.navbar nav a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 16px;
  transition: 0.3s;
}

.navbar nav a:hover {
  color: #ffe6ee;
  text-shadow: 0 0 6px rgba(255, 204, 204, 0.8);
  transform: translateY(-2px);
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
  padding: 25px 30px;
  margin-bottom: 20px;
}

/* Rincian Pesanan */
.item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.item img {
  width: 110px;
  height: 110px;
  border-radius: 14px;
  margin-right: 18px;
  border: 3px solid #f8bbd0;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(236, 64, 122, 0.3);
}

.item .info strong {
  display: block;
  color: #ad1457;
  font-size: 20px;
}

.item .info p {
  margin: 5px 0;
  color: #880e4f;
  font-size: 17px;
}

.warna-produk {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 15px;
  color: #6a1b9a;
}

.color-box {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1px solid #aaa;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

.color-name {
  font-weight: bold;
  color: #ad1457;
}

.total {
  text-align: right;
  font-weight: bold;
  color: #c2185b;
  margin-top: 15px;
  font-size: 18px;
}

/* Form */
.form-group {
  margin-bottom: 20px;
}
.form-group input[type="text"] {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

label {
  display: block;
  color: #c2185b;
  margin-bottom: 6px;
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 2px solid #f8bbd0;
  background: #fff0f5;
  color: #880e4f;
  font-family: inherit;
  transition: 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #ec407a;
  box-shadow: 0 0 6px rgba(236, 64, 122, 0.4);
}

/* Info COD */
.info-cod {
  background: #fff0f3;
  padding: 15px;
  border-left: 5px solid #ff6b81;
  border-radius: 10px;
  margin-bottom: 15px;
}

.info-cod h4 {
  color: #c2185b;
  margin-bottom: 8px;
}

.info-cod a {
  color: #e91e63;
  font-weight: bold;
}

/* Tombol Bayar */
.bayar-btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, #f06292, #ec407a);
  color: white;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

.bayar-btn:hover {
  background: linear-gradient(135deg, #ec407a, #d81b60);
  transform: scale(1.03);
}
</style>
