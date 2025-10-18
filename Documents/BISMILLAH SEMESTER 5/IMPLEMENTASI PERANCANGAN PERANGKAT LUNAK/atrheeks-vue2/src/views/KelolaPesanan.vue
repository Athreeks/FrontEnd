<template>
  <div class="kelola-pesanan">
    <!-- 🌸 Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
      <button class="home-btn" @click="$router.push('/dashboard-admin')">
        <i class="fas fa-home"></i> Home
      </button>
    </header>

    <main>
      <h1 class="judul-halaman">Kelola Pesanan 🌸</h1>

      <!-- 🌼 Tabel: Sedang Dibuat -->
      <section class="tabel-section">
        <h2>🧁 Sedang Dibuat</h2>
        <table class="pesanan-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Pemesan</th>
              <th>Pesanan</th>
              <th>Total</th>
              <th>Status</th>
              <th>Status Pembayaran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in sedangDibuat" :key="p.id">
              <td>{{ p.id }}</td>
              <td>{{ p.nama }}</td>
              <td>
                <ul class="rincian-pesanan">
                  <li v-for="(item, idx) in p.pesanan" :key="idx">
                    {{ item.nama }} — {{ item.jumlah }} pcs
                    <span v-if="item.warna" class="warna-box-container">
                      🎨 Warna:
                      <span
                        v-for="(w, wi) in pisahWarna(item.warna)"
                        :key="wi"
                        class="color-box"
                        :style="{ backgroundColor: ubahKeCSSWarna(w) }"
                        :title="w"
                      ></span>
                      <span class="warna-text">{{ item.warna }}</span>
                    </span>
                  </li>
                </ul>
              </td>
              <td>Rp{{ p.total.toLocaleString() }}</td>
              <td>{{ p.status }}</td>
              <td>
                <span
                  :class="[
                    'pembayaran-status',
                    p.pembayaran === 'Berhasil' ? 'berhasil' : 'gagal',
                  ]"
                >
                  {{ p.pembayaran }}
                </span>
              </td>
              <td>
                <select v-model="p.status" @change="ubahStatus(p)">
                  <option>Sedang Dibuat</option>
                  <option>Sedang Diantar</option>
                  <option>Selesai</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- 🚚 Tabel: Sedang Diantar -->
      <section class="tabel-section">
        <h2>🚚 Sedang Diantar</h2>
        <table class="pesanan-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Pemesan</th>
              <th>Pesanan</th>
              <th>Total</th>
              <th>Status</th>
              <th>Status Pembayaran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in sedangDiantar" :key="p.id">
              <td>{{ p.id }}</td>
              <td>{{ p.nama }}</td>
              <td>
                <ul class="rincian-pesanan">
                  <li v-for="(item, idx) in p.pesanan" :key="idx">
                    {{ item.nama }} — {{ item.jumlah }} pcs
                    <span v-if="item.warna" class="warna-box-container">
                      🎨 Warna:
                      <span
                        v-for="(w, wi) in pisahWarna(item.warna)"
                        :key="wi"
                        class="color-box"
                        :style="{ backgroundColor: ubahKeCSSWarna(w) }"
                        :title="w"
                      ></span>
                      <span class="warna-text">{{ item.warna }}</span>
                    </span>
                  </li>
                </ul>
              </td>
              <td>Rp{{ p.total.toLocaleString() }}</td>
              <td>{{ p.status }}</td>
              <td>
                <span
                  :class="[
                    'pembayaran-status',
                    p.pembayaran === 'Berhasil' ? 'berhasil' : 'gagal',
                  ]"
                >
                  {{ p.pembayaran }}
                </span>
              </td>
              <td>
                <select v-model="p.status" @change="ubahStatus(p)">
                  <option>Sedang Dibuat</option>
                  <option>Sedang Diantar</option>
                  <option>Selesai</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- ✅ Tabel: Selesai -->
      <section class="tabel-section">
        <h2>✅ Selesai</h2>
        <table class="pesanan-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Pemesan</th>
              <th>Pesanan</th>
              <th>Total</th>
              <th>Status</th>
              <th>Status Pembayaran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in selesai" :key="p.id">
              <td>{{ p.id }}</td>
              <td>{{ p.nama }}</td>
              <td>
                <ul class="rincian-pesanan">
                  <li v-for="(item, idx) in p.pesanan" :key="idx">
                    {{ item.nama }} — {{ item.jumlah }} pcs
                    <span v-if="item.warna" class="warna-box-container">
                      🎨 Warna:
                      <span
                        v-for="(w, wi) in pisahWarna(item.warna)"
                        :key="wi"
                        class="color-box"
                        :style="{ backgroundColor: ubahKeCSSWarna(w) }"
                        :title="w"
                      ></span>
                      <span class="warna-text">{{ item.warna }}</span>
                    </span>
                  </li>
                </ul>
              </td>
              <td>Rp{{ p.total.toLocaleString() }}</td>
              <td>{{ p.status }}</td>
              <td>
                <span
                  :class="[
                    'pembayaran-status',
                    p.pembayaran === 'Berhasil' ? 'berhasil' : 'gagal',
                  ]"
                >
                  {{ p.pembayaran }}
                </span>
              </td>
              <td>
                <select v-model="p.status" @change="ubahStatus(p)">
                  <option>Sedang Dibuat</option>
                  <option>Sedang Diantar</option>
                  <option>Selesai</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "KelolaPesanan",
  data() {
    return {
      pesananList: [
        {
          id: 1,
          nama: "Alya",
          pesanan: [
            { nama: "Salad Buah", jumlah: 2 },
            { nama: "Bagcharm", jumlah: 1, warna: "Pink" },
          ],
          total: 55000,
          status: "Sedang Dibuat",
          pembayaran: "Berhasil",
        },
        {
          id: 2,
          nama: "Budi",
          pesanan: [{ nama: "Gelang", jumlah: 2, warna: "Hitam & Putih" }],
          total: 20000,
          status: "Sedang Dibuat",
          pembayaran: "Gagal",
        },
        {
          id: 3,
          nama: "Citra",
          pesanan: [
            { nama: "Salad Jelly", jumlah: 1 },
            { nama: "Bagcharm", jumlah: 2, warna: "Biru & Ungu" },
          ],
          total: 70000,
          status: "Sedang Dibuat",
          pembayaran: "Berhasil",
        },
        {
          id: 4,
          nama: "Dinda",
          pesanan: [
            { nama: "Salad Jelly", jumlah: 2 },
            { nama: "Gelang", jumlah: 1, warna: "Pink" },
          ],
          total: 60000,
          status: "Sedang Diantar",
          pembayaran: "Berhasil",
        },
        {
          id: 5,
          nama: "Eka",
          pesanan: [{ nama: "Salad Buah", jumlah: 1 }],
          total: 30000,
          status: "Sedang Diantar",
          pembayaran: "Berhasil",
        },
        {
          id: 6,
          nama: "Farhan",
          pesanan: [
            { nama: "Salad Buah", jumlah: 1 },
            { nama: "Bagcharm", jumlah: 1, warna: "Hijau" },
          ],
          total: 55000,
          status: "Sedang Diantar",
          pembayaran: "Gagal",
        },
        {
          id: 7,
          nama: "Gina",
          pesanan: [{ nama: "Gelang", jumlah: 3, warna: "Merah, Putih, Biru" }],
          total: 25000,
          status: "Selesai",
          pembayaran: "Berhasil",
        },
        {
          id: 8,
          nama: "Hana",
          pesanan: [
            { nama: "Salad Buah", jumlah: 2 },
            { nama: "Bagcharm", jumlah: 1, warna: "Kuning" },
          ],
          total: 70000,
          status: "Selesai",
          pembayaran: "Berhasil",
        },
        {
          id: 9,
          nama: "Indra",
          pesanan: [{ nama: "Salad Jelly", jumlah: 1 }],
          total: 30000,
          status: "Selesai",
          pembayaran: "Gagal",
        },
      ],
    };
  },
  computed: {
    sedangDibuat() {
      return this.pesananList.filter((p) => p.status === "Sedang Dibuat");
    },
    sedangDiantar() {
      return this.pesananList.filter((p) => p.status === "Sedang Diantar");
    },
    selesai() {
      return this.pesananList.filter((p) => p.status === "Selesai");
    },
  },
  methods: {
    ubahStatus(pesanan) {
      const index = this.pesananList.findIndex((item) => item.id === pesanan.id);
      if (index !== -1) this.pesananList[index].status = pesanan.status;
    },
    pisahWarna(warna) {
      return warna.split(/,|&/).map((w) => w.trim());
    },
    ubahKeCSSWarna(w) {
      const map = {
        merah: "red",
        pink: "pink",
        hitam: "black",
        putih: "white",
        biru: "blue",
        ungu: "purple",
        hijau: "green",
        kuning: "yellow",
        abu: "gray",
        abuabu: "gray",
        coklat: "brown",
        oranye: "orange",
      };
      const key = w.toLowerCase().replace(/\s/g, "");
      return map[key] || "transparent"; // default transparan jika tidak dikenal
    },
  },
};
</script>

<style scoped>
/* 🌸 Navbar */
.navbar {
  background: #e53935;
  color: white;
  display: flex;
  justify-content: space-between; /* 🌷 brand kiri, tombol kanan */
  align-items: center;
  padding: 12px 40px; /* tambahkan sedikit padding agar seimbang */
  font-weight: bold;
  font-family: "Fredoka One", cursive;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
}
.brand {
  font-size: 22px;
  letter-spacing: 2px;
  text-shadow: 1px 1px 2px rgba(255, 182, 193, 0.6);
}
.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.home-btn {
  background: #fff0f5;
  color: #e53935;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: 0.3s;
}

.home-btn:hover {
  background: #ffe4ec;
  transform: translateY(-2px);
}

main {
  padding: 100px 30px 60px;
  background: #fff5f8;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

.judul-halaman {
  text-align: center;
  font-size: 2.2rem;
  color: #ad1457;
  margin-bottom: 30px;
  text-shadow: 1px 1px 3px rgba(255, 192, 203, 0.6);
}

/* 🌸 Tabel */
.tabel-section {
  margin-bottom: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.tabel-section h2 {
  color: #d81b60;
  margin-bottom: 15px;
}

.pesanan-table {
  width: 100%;
  border-collapse: collapse;
}
.pesanan-table th,
.pesanan-table td {
  border: 1px solid #ffc1e3;
  padding: 10px;
  text-align: center;
}
.pesanan-table th {
  background-color: #f8bbd0;
  color: #880e4f;
}

/* 🌿 Status Pembayaran */
.pembayaran-status {
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 8px;
  display: inline-block;
}
.pembayaran-status.berhasil {
  background-color: #c8e6c9;
  color: #2e7d32;
}
.pembayaran-status.gagal {
  background-color: #ffcdd2;
  color: #c62828;
}

/* 🌸 Rincian Pesanan */
.rincian-pesanan {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  font-size: 0.95rem;
}
.rincian-pesanan li {
  padding: 4px 0;
}

/* 🎨 Color Box */
.warna-box-container {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 6px;
}
.color-box {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  display: inline-block;
}
.warna-text {
  font-style: italic;
  font-size: 0.9rem;
  color: #7b1fa2;
}

select {
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #d81b60;
  color: #ad1457;
  font-weight: 500;
  background: #fff0f5;
}
select:focus {
  outline: none;
  border-color: #f48fb1;
}
</style>
