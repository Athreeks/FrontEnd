<template>
  <div class="pembeli-page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
    </header>

    <!-- Konten -->
    <div class="overlay">
      <div class="pembeli-card">
        <h2>Register Pembeli</h2>
        <p>Silakan buat akun kamu 🌸</p>

        <!-- Form Register -->
        <form @submit.prevent="registerManual">
          <div class="input-group">
            <label for="nama">Nama Lengkap</label>
            <input
              type="text"
              id="nama"
              v-model="nama"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div class="input-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Masukkan username"
              required
            />
          </div>
          
          <div class="input-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Masukkan alamat email"
              required
            />
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              :class="passwordClass"
              placeholder="Masukkan password"
              required
            />
            <small :class="passwordHintClass">
              {{ passwordHint }}
            </small>
          </div>

          <div class="input-group">
            <label for="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              v-model="confirmPassword"
              placeholder="Ulangi password"
              required
            />
          </div>

          <button type="submit" class="register-btn">Register</button>
        </form>

        <!-- Tombol Kembali -->
        <button class="btn-back" @click="goBack">
          ⬅ Kembali ke Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2"

export default {
  name: "PembeliPage",
  data() {
    return {
      nama: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  },
  computed: {
    // 🟢 Kelas warna border password
    passwordClass() {
      if (this.password.length === 0) return ""
      return this.password.length >= 8 ? "valid-password" : "invalid-password"
    },
    // 🟢 Teks petunjuk di bawah input
    passwordHint() {
      if (this.password.length === 0) return ""
      return this.password.length >= 8
        ? "✅ Password sudah cukup kuat!"
        : "❌ Minimal 8 karakter ya!"
    },
    passwordHintClass() {
      return this.password.length >= 8 ? "hint-valid" : "hint-invalid"
    }
  },
  methods: {
    registerManual() {
      if (!this.nama || !this.email || !this.username || !this.password || !this.confirmPassword) {
        Swal.fire({
          title: "Oops! 😢",
          text: "Harap isi semua field dengan lengkap!",
          icon: "error",
          background: "#ffe4ec",
          color: "#d32f2f",
          confirmButtonColor: "#f48fb1"
        })
        return
      }

      if (this.password.length < 8) {
        Swal.fire({
          title: "Password Terlalu Pendek! 😣",
          text: "Minimal 8 karakter ya!",
          icon: "error",
          background: "#ffe4ec",
          color: "#d32f2f",
          confirmButtonColor: "#f48fb1"
        })
        return
      }

      if (this.password !== this.confirmPassword) {
        Swal.fire({
          title: "Password Tidak Sama! 🔒",
          text: "Pastikan password dan confirm password sama ya 💗",
          icon: "error",
          background: "#ffe4ec",
          color: "#d32f2f",
          confirmButtonColor: "#f48fb1"
        })
        return
      }

      let users = JSON.parse(localStorage.getItem("users")) || []
      let exist = users.find(u => u.username === this.username || u.email === this.email)
      if (exist) {
        Swal.fire({
          title: "Username / Gmail sudah digunakan 😢",
          text: "Silakan pilih data lain!",
          icon: "error",
          background: "#ffe4ec",
          color: "#d32f2f",
          confirmButtonColor: "#f48fb1"
        })
        return
      }

      users.push({
        nama: this.nama,
        email: this.email,
        username: this.username,
        password: this.password
      })
      localStorage.setItem("users", JSON.stringify(users))

      Swal.fire({
        title: `Registrasi Berhasil 🎉`,
        html: `
          <p>Selamat datang, <b>${this.nama}</b> 🌸</p>
          <p style="margin-top:10px;">Silakan login untuk melanjutkan 💖</p>
        `,
        icon: "success",
        background: "#fff0f6",
        color: "#ad1457",
        confirmButtonColor: "#f06292",
        confirmButtonText: "Ke Login 🚀"
      }).then(() => {
        this.$router.push("/login")
      })
    },
    goBack() {
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.pembeli-page {
  background: url("@/assets/Gemini_Generated_Image_j9l6y3j9l6y3j9l6-removebg-preview.png") no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffcdd2;
  width: 100%;
  font-family: 'Fredoka One', cursive;
}

/* Navbar */
.navbar {
  background-color: #e53935;
  color: white;
  display: flex;
  justify-content: flex-start;
  padding: 15px 30px;
  font-weight: bold;
  align-items: center;
}

.navbar .brand {
  font-size: 22px;
  letter-spacing: 2px;
}

/* Card */
.overlay {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pembeli-card {
  background: #f8bbd0;
  color: #880e4f;
  padding: 40px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  width: 360px;
  text-align: center;
}

.pembeli-card h2 {
  margin-bottom: 10px;
  color: #ad1457;
}

.input-group {
  margin-bottom: 15px;
  text-align: center;
}

label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #880e4f;
  margin-bottom: 5px;
}

input {
  width: 90%;
  padding: 10px;
  border: 2px solid #f48fb1;
  border-radius: 8px;
  outline: none;
  text-align: center;
  transition: 0.3s;
}

input:focus {
  border-color: #ad1457;
  box-shadow: 0 0 6px rgba(173, 20, 87, 0.5);
}

/* 🟢 Warna password */
.valid-password {
  border-color: #4caf50 !important;
  box-shadow: 0 0 6px rgba(76, 175, 80, 0.6);
}
.invalid-password {
  border-color: #e53935 !important;
  box-shadow: 0 0 6px rgba(229, 57, 53, 0.6);
}

.hint-valid {
  color: #2e7d32;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}
.hint-invalid {
  color: #c62828;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

/* Tombol */
button {
  margin-top: 15px;
  padding: 12px 40px;
  border: none;
  border-radius: 25px;
  background: #ec407a;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  opacity: 0.9;
}

button:hover {
  background: #ad1457;
  opacity: 1;
}

/* Register Button */
.register-btn {
  margin-top: 10px;
  background: #f06292;
  width: 100%;
}

.register-btn:hover {
  background: #ec407a;
}

/* Tombol kembali */
.btn-back {
  margin-top: 20px;
  background: #ab47bc;
  padding: 8px 20px;
  font-size: 13px;
  border-radius: 18px;
  width: auto;
}

.btn-back:hover {
  background: #6a1b9a;
}
</style>
