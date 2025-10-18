<template>
  <div class="login-page">
    <!-- Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
    </header>

    <!-- Konten -->
    <div class="overlay">
      <div class="login-card">
        <h2>Login</h2>
        <p>Silakan login untuk masuk 🌸</p>

        <!-- Form Login -->
        <form @submit.prevent="login">
          <div class="input-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              placeholder="Masukkan username" 
              required />
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              placeholder="Masukkan password" 
              required />
          </div>

          <button type="submit" class="login-btn">Login</button>
        </form>

        <!-- Tombol ke Register -->
        <button class="btn-register" @click="$router.push('/registrasi')">
          Belum punya akun? Register 🌸
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2"

export default {
  name: "DashboardLogin",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      // Admin login (hardcode)
      if (this.username === "admin" && this.password === "admin123") {
        Swal.fire({
          title: "Login Admin Berhasil 🎉",
          text: "Selamat datang kembali, Admin 🌟",
          icon: "success",
          background: "#ffe4ec",
          color: "#d32f2f",
          confirmButtonColor: "#f48fb1"
        }).then(() => {
          this.$router.push("/dashboard-admin")
        })
        return
      }

      // Ambil user dari localStorage
      let users = JSON.parse(localStorage.getItem("users")) || []

      // Cek apakah user pembeli terdaftar
      let user = users.find(
        u => u.username === this.username && u.password === this.password
      )

      if (user) {
        Swal.fire({
          title: "Login Pembeli Berhasil 🎉",
          text: `Selamat datang kembali, ${user.nama} 🌸`,
          icon: "success",
          background: "#fff0f6",
          color: "#ad1457",
          confirmButtonColor: "#f06292"
        }).then(() => {
          this.$router.push("/dashboard-pembeli")
        })
      } else {
        Swal.fire({
          title: "Login Gagal 😢",
          text: "Username atau password salah!",
          icon: "error",
          background: "#ffe4ec",
          color: "#d32f2f",
          confirmButtonColor: "#f48fb1"
        })
      }
    }
  }
}
</script>

<style scoped>
.login-page {
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

/* Card */
.overlay {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  background: #f8bbd0;
  color: #880e4f;
  padding: 40px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  width: 360px;
  text-align: center;
}

.login-card h2 {
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

.login-btn {
  background: #f06292;
  width: 100%;
}

.btn-register {
  margin-top: 20px;
  background: #ab47bc;
  padding: 8px 20px;
  font-size: 13px;
  border-radius: 18px;
  width: auto;
}

.btn-register:hover {
  background: #6a1b9a;
}
</style>
