<template>
  <div class="kelola-produk">
    <!-- 🌸 Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
      <div class="navbar-right">
        <button class="home-btn" @click="$router.push('/dashboard-admin')">
          <i class="fas fa-home"></i> Home
        </button>
      </div>
    </header>


    <!-- 🌷 Konten Utama -->
    <main class="produk-container">
      <h1 class="judul-halaman">Kelola Produk 🌸</h1>
      <div class="top-bar">
        <button class="tambah-btn" @click="tambahProduk">+ Tambah Produk</button>
      </div>

      <!-- 🌼 Daftar Produk -->
      <div class="produk-list">
        <div v-for="(item, index) in produkList" :key="index" class="produk-card">
          <img :src="item.gambar" :alt="item.nama" class="produk-img" />
          <div class="produk-info">
            <h2>{{ item.nama }}</h2>
            <p><strong>Harga:</strong> Rp{{ item.harga.toLocaleString() }}</p>
            <p><strong>Deskripsi:</strong> {{ item.deskripsi }}</p>
          </div>

          <div class="produk-actions">
            <button class="edit" @click="editProduk(index)">✏️</button>
            <button class="delete" @click="hapusProduk(index)">🗑️</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "KelolaProduk",
  data() {
    return {
      produkList: [
        {
          nama: "Salad Buah 🍓",
          harga: 25000,
          deskripsi: "Salad buah segar dengan campuran yogurt manis dan keju parut.",
          gambar: require("@/assets/SaladBuah.jpg"),
        },
        {
          nama: "Salad Jelly 🍇",
          harga: 20000,
          deskripsi: "Campuran jelly warna-warni dan buah segar dalam satu cup manis.",
          gambar: require("@/assets/SaladJelly.jpg"),
        },
        {
          nama: "Bagcharm 🎀",
          harga: 15000,
          deskripsi: "Aneka accessories lucu dan stylish untuk melengkapi gayamu!",
          gambar: require("@/assets/Bagcharm.jpg"),
        },
        {
          nama: "Gelang 🧸",
          harga: 15000,
          deskripsi: "Aneka accessories lucu dan stylish untuk melengkapi gayamu!",
          gambar: require("@/assets/Gelang.jpg"),
        },
      ],
    };
  },
  methods: {
  tambahProduk() {
    Swal.fire({
      width: 600, // 🔹 popup lebih kecil
      title: "<h2 style='color:#ad1457;font-weight:bold'>Tambah Produk Baru 🌸</h2>",
      html: `
        <div style="
          display:flex;
          flex-direction:column;
          gap:8px;
          width:100%;
          text-align:left;
        ">
          <div style="display:flex;align-items:center;gap:10px;">
            <label style="flex:1;font-weight:bold;color:#c2185b;">Nama</label>
            <input id="nama" class="swal2-input" placeholder="Nama Produk" style="flex:2;height:30px;">
          </div>

           <div style="display:flex;align-items:flex-start;gap:10px;">
            <label style="flex:1;font-weight:bold;color:#c2185b;">Deskripsi</label>
            <textarea id="deskripsi" class="swal2-textarea" placeholder="Deskripsi Produk" 
              style="flex:2;height:120px;resize:none;"></textarea>
          </div>

          <div style="display:flex;align-items:center;gap:10px;">
            <label style="flex:1;font-weight:bold;color:#c2185b;">Harga</label>
            <input id="harga" type="number" class="swal2-input" placeholder="Harga (Rp)" style="flex:2;height:30px;">
          </div>

         
          <div style="display:flex;align-items:center;gap:10px;">
            <label style="flex:1;font-weight:bold;color:#c2185b;">Gambar</label>
            <input id="gambar" type="file" accept="image/*" class="swal2-file" style="flex:2;">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Tambah 💖",
      cancelButtonText: "Batal",
      background: "#fff0f6",
      color: "#ad1457",
      confirmButtonColor: "#f06292",
      cancelButtonColor: "#f48fb1",
      preConfirm: () => {
        const nama = document.getElementById("nama").value.trim();
        const harga = Number(document.getElementById("harga").value);
        const deskripsi = document.getElementById("deskripsi").value.trim();
        const file = document.getElementById("gambar").files[0];

        return new Promise((resolve) => {
          if (!nama || !harga || !deskripsi || !file) {
            Swal.showValidationMessage("Semua kolom wajib diisi 🌷");
            return;
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              nama,
              harga,
              deskripsi,
              gambar: e.target.result,
            });
          };
          reader.readAsDataURL(file);
        });
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.produkList.push(result.value);
        Swal.fire({
          icon: "success",
          title: "Produk Ditambahkan 💕",
          background: "#fff0f6",
          color: "#ad1457",
          confirmButtonColor: "#f06292",
        });
      }
    });
  },

  editProduk(index) {
    const produk = this.produkList[index];
    Swal.fire({
      width: 600, // 🔹 popup lebih kecil
      title: "<h2 style='color:#ad1457;font-weight:bold'>Edit Produk ✏️</h2>",
      html: `
        <div style="
          display:flex;
          flex-direction:column;
          gap:8px;
          width:100%;
          text-align:left;
        ">
          <div style="display:flex;align-items:center;gap:10px;">
            <label style="flex:1;font-weight:bold;color:#c2185b;">Nama</label>
            <input id="nama" class="swal2-input" value="${produk.nama}" style="flex:2;height:30px;">
          </div>

          <div style="display:flex;align-items:flex-start;gap:10px;">
            <label style="flex:1;font-weight:bold;color:#c2185b;">Deskripsi</label>
            <textarea id="deskripsi" class="swal2-textarea" style="flex:2;height:120px;resize:none;">${produk.deskripsi}</textarea>
          </div>

          <div style="display:flex;align-items:center;gap:10px;">
            <label style="flex:1;font-weight:bold;color:#c2185b;">Harga</label>
            <input id="harga" type="number" class="swal2-input" value="${produk.harga}" style="flex:2;height:30px;">
          </div>


          <div style="display:flex;align-items:center;gap:10px;">
            <label style="flex:1;font-weight:bold;color:#c2185b;">Gambar (opsional)</label>
            <input id="gambar" type="file" accept="image/*" class="swal2-file" style="flex:2;">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Simpan 💾",
      cancelButtonText: "Batal",
      background: "#fff0f6",
      color: "#ad1457",
      confirmButtonColor: "#f06292",
      cancelButtonColor: "#f48fb1",
      preConfirm: () => {
        const nama = document.getElementById("nama").value.trim();
        const harga = Number(document.getElementById("harga").value);
        const deskripsi = document.getElementById("deskripsi").value.trim();
        const file = document.getElementById("gambar").files[0];

        return new Promise((resolve) => {
          if (!nama || !harga || !deskripsi) {
            Swal.showValidationMessage("Semua kolom wajib diisi 🌷");
            return;
          }
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve({
                ...produk,
                nama,
                harga,
                deskripsi,
                gambar: e.target.result,
              });
            };
            reader.readAsDataURL(file);
          } else {
            resolve({ ...produk, nama, harga, deskripsi });
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.produkList.splice(index, 1, result.value);
        Swal.fire({
          icon: "success",
          title: "Perubahan Disimpan 💖",
          background: "#fff0f6",
          color: "#ad1457",
          confirmButtonColor: "#f06292",
        });
      }
    });
  },

  hapusProduk(index) {
    Swal.fire({
      title: "Hapus Produk?",
      text: "Kamu yakin ingin menghapus produk ini? 💔",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      background: "#fff0f6",
      color: "#ad1457",
      confirmButtonColor: "#f06292",
      cancelButtonColor: "#f48fb1",
    }).then((result) => {
      if (result.isConfirmed) {
        this.produkList.splice(index, 1);
        Swal.fire({
          icon: "success",
          title: "Produk Dihapus 💨",
          background: "#fff0f6",
          color: "#ad1457",
          confirmButtonColor: "#f06292",
        });
      }
    });
  },
}
};
</script>

<style scoped>
html, body {
  font-family: "Fredoka One", cursive;
  background: #f8bcd1;
  color: #880e4f;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: auto; /* ✅ Scroll aktif */
  box-sizing: border-box;
}

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

/* 🌷 Container */
.produk-container {
  padding: 110px 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 🌸 Judul */
.judul-halaman {
  text-align: center;
  font-size: 1.8rem;
  color: #ad1457;
  margin-bottom: 2.5rem; /* 🔹 jarak lebih lega dari card */
  text-shadow: 1px 1px 3px rgba(255, 192, 203, 0.6);
}

/* 🌼 Tombol Tambah */
.top-bar {
  position: fixed;              /* supaya tombol tetap di tempat */
  top: 80px;                    /* sedikit di bawah navbar */
  right: 40px;                  /* menempel di sisi kanan */
  z-index: 900;                 /* di atas elemen lain */
}

.tambah-btn {
  background: #ff80ab;
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}
.tambah-btn:hover {
  background: #ff5fa2;
}

/* 🌼 List Produk */
.produk-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, auto));
  gap: 30px;
  justify-content: start;
  padding: 0 60px;
  max-width: 1400px;
  margin: 0 auto;
}

.produk-card {
  background: #fff0f6;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(255, 105, 180, 0.2);
  padding: 1rem;
  width: 240px;
  text-align: center;
  transition: 0.3s;
  position: relative;
}


.produk-card:hover {
  transform: scale(1.03);
}
.produk-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 0.8rem;
}
.produk-info h2 {
  font-size: 1.1rem;
  color: #7b1145;
}
.produk-info p {
  font-size: 0.9rem;
  margin: 3px 0;
  color: #880e4f;
}
.produk-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
}
.edit,
.delete {
  background: #ffd1e8;
  border: none;
  border-radius: 8px;
  padding: 6px;
  cursor: pointer;
  transition: 0.3s;
}
.edit:hover {
  background: #ff80ab;
  color: white;
}
.delete:hover {
  background: #f06292;
  color: white;
}
</style>
