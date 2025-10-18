<template>
  <div class="profil-page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
      <button class="home-btn" @click="$router.push('/dashboard-pembeli')">
        <i class="fas fa-home"></i> Home
      </button>
    </header>

    <main class="profil-container">
      <h1>Profil Pengguna 🌸</h1>

      <div class="profil-card">
        <!-- Foto Profil -->
        <img :src="profil.foto" alt="Foto Pengguna" class="foto-profil" />

        <div class="info">
          <!-- MODE LIHAT -->
          <div v-if="!editMode" class="info-grid">
            <div class="info-row">
              <span class="label">Nama</span><span class="colon">:</span><span class="value">{{ profil.nama }}</span>
            </div>
            <div class="info-row">
              <span class="label">Email</span><span class="colon">:</span><span class="value">{{ profil.email }}</span>
            </div>
            <div class="info-row">
              <span class="label">No. Telepon</span><span class="colon">:</span><span class="value">{{ profil.telepon }}</span>
            </div>
            <div class="info-row">
              <span class="label">Alamat</span><span class="colon">:</span><span class="value">{{ profil.alamat }}</span>
            </div>

            <button class="edit-btn" @click="editMode = true">✏️ Edit Profil</button>
          </div>

          <!-- MODE EDIT -->
          <div v-else class="edit-form">
            <label>Ubah Foto Profil:</label>
            <input type="file" accept="image/*" @change="ubahFoto" />

            <label>Nama:</label>
            <input v-model="profil.nama" />

            <label>Email:</label>
            <input v-model="profil.email" />

            <label>No. Telepon:</label>
            <input v-model="profil.telepon" />

            <label>Alamat:</label>
            <textarea v-model="profil.alamat"></textarea>

            <div class="edit-actions">
              <button class="save-btn" @click="konfirmasiSimpan">💾 Simpan</button>
              <button class="cancel-btn" @click="batalEdit">❌ Batal</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ProfilPengguna",
  data() {
    return {
      editMode: false,
      profil: {
        foto: require("@/assets/OIP.jpeg"),
        nama: "Choi Seung-cheol",
        email: "Scoups@example.com",
        telepon: "0812-3456-7890",
        alamat: "Jl. Sakura No. 7, Tokyo Garden 🌸"
      }
    };
  },
  methods: {
    ubahFoto(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.profil.foto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    konfirmasiSimpan() {
      Swal.fire({
        title: "Simpan Perubahan Profil?",
        text: "Pastikan semua data sudah benar ya 🌸",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, simpan!",
        cancelButtonText: "Batal",
        background: "#fff0f6",
        color: "#ad1457",
        confirmButtonColor: "#f06292",
        cancelButtonColor: "#f48fb1",
        reverseButtons: true
      }).then(result => {
        if (result.isConfirmed) {
          this.simpanPerubahan();
        } else {
          Swal.fire({
            title: "Dibatalkan 💨",
            text: "Perubahan profil tidak disimpan.",
            icon: "info",
            background: "#ffe4ec",
            color: "#ad1457",
            confirmButtonColor: "#f48fb1"
          });
        }
      });
    },
    simpanPerubahan() {
      this.editMode = false;
      Swal.fire({
        title: "Berhasil Disimpan 💖",
        text: "Profil kamu sudah diperbarui! 🌷",
        icon: "success",
        background: "#fff0f6",
        color: "#ad1457",
        confirmButtonColor: "#f06292"
      });
    },
    batalEdit() {
      this.editMode = false;
    }
  }
};
</script>

<style scoped>
/* 🌸 Style sama kayak sebelumnya */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
  font-family: "Fredoka One", cursive;
  color: #880e4f;
  background: #f8bcd1;
  overflow-x: hidden;
}
.profil-page {
  height: 100vh;
  background: #f7aec7;
  display: flex;
  flex-direction: column;
  color: #880e4f;
}

/* 🌸 Navbar */
.navbar {
  background: #e53935;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  font-weight: bold;
  font-family: "Fredoka One", cursive;
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

/* 🌷 Profil Container */
.profil-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow-y: auto;
  padding: 100px 0 60px;
}
.profil-container h1 {
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #7b1145;
  text-shadow: 1px 1px 2px rgba(255, 182, 193, 0.6);
}
/* 🌷 Card Profil */
.profil-card {
  background: #fff0f6;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(255, 105, 180, 0.2);
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  transition: 0.3s;
}
.profil-card:hover {
  transform: scale(1.02);
}
.foto-profil {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ff80ab;
  margin-bottom: 1rem;
}

/* 🌼 Informasi Profil (rata :) */
.info-grid {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left;
  margin-top: 1rem;
}
.info-row {
  display: grid;
  grid-template-columns: 120px 10px 1fr; /* label | : | value */
  align-items: center;
}
.label {
  font-weight: bold;
  color: #7b1145;
}
.colon {
  text-align: center;
  color: #7b1145;
}
.value {
  color: #880e4f;
  word-wrap: break-word;
}

.edit-btn {
  background: #ff80ab;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 15px;
  margin-top: 1rem;
  cursor: pointer;
  transition: 0.3s;
}
.edit-btn:hover {
  background: #ff5fa2;
}
/* ✨ Form Edit */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}
.edit-form input,
.edit-form textarea {
  padding: 0.6rem;
  border: 2px solid #ffb6d9;
  border-radius: 10px;
  font-family: "Fredoka One", cursive;
  background: #fff;
  color: #880e4f;
}
.edit-form textarea {
  resize: none;
  height: 70px;
}
.edit-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.save-btn,
.cancel-btn {
  flex: 1;
  margin: 0 5px;
  border: none;
  border-radius: 15px;
  padding: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.save-btn {
  background: #ff66a3;
  color: white;
}
.save-btn:hover {
  background: #ff4081;
}
.cancel-btn {
  background: #ffd1e8;
  color: #7b1145;
}
.cancel-btn:hover {
  background: #ffadc9;
}
</style>
