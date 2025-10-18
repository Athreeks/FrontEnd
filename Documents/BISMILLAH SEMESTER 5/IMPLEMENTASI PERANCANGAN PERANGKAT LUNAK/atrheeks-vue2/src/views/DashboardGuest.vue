<template>
  <div class="dashboard-guest">
    <!-- Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
      <nav>
        <!-- Tombol Back to Login -->
        <div class="dropdown" @click="toggleDropdown">
          <i class="fas fa-sign-in-alt"></i> <!-- icon login -->
          <div v-if="dropdownOpen" class="dropdown-menu">
            <button @click="backToLogin" class="dropdown-link back-login">
              <i class="fas fa-arrow-left"></i> Back to Login
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
        <!-- Produk 1 -->
        <div class="produk-card">
          <img src="@/assets/SaladBuah.jpg" alt="Salad Buah" />
          <h3>SALAD BUAH</h3>
          <p>Beragam potongan buah yang dilumuri dengan saus mayonais yang manis.</p>
        </div>

        <!-- Produk 2 -->
        <div class="produk-card">
          <img src="@/assets/SaladJelly.jpg" alt="Salad Jelly" />
          <h3>SALAD JELLY</h3>
          <p>Potongan jelly yang sangat imut dengan berbagai rasa dan diatasnya ada saus mayonais manis.</p>
        </div>

        <!-- Produk 3 -->
        <div class="produk-card">
          <img src="@/assets/Bagcharm.jpg" alt="BagCharm" />
          <h3>BAGCHARM</h3>
          <p>Berbagai accessories seperti bagcharm dan gelang yang lucu.</p>
        </div>

        <!-- Produk 4 -->
        <div class="produk-card">
          <img src="@/assets/Gelang.jpg" alt="Gelang" />
          <h3>GELANG</h3>
          <p>Berbagai accessories seperti bagcharm dan gelang yang lucu.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from "sweetalert2"

export default {
  name: "DashboardGuest",
  data() {
    return {
      dropdownOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    backToLogin() {
      Swal.fire({
        title: 'Kembali ke Login?',
        text: "Kamu akan diarahkan ke halaman login.",
        icon: 'question',
        background: '#fce4ec', // pink lembut
        color: '#880e4f',      // teks ungu tua
        showCancelButton: true,
        confirmButtonColor: '#ec407a', // pink terang
        cancelButtonColor: '#f48fb1',  // pink muda
        confirmButtonText: 'Ya, Kembali!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Kembali ke halaman login 👋',
            icon: 'success',
            background: '#fce4ec',
            color: '#880e4f',
            confirmButtonColor: '#ec407a',
            timer: 2000,
            showConfirmButton: false
          })
          setTimeout(() => {
            this.$router.push("/")
          }, 2000)
        }
      })
    }
  }
}
</script>

<style scoped>
.dashboard-guest {
  background: #f8bbd0;
  min-height: 100vh;
  font-family: 'Fredoka One', cursive;
  color: #880e4f;
  overflow-x: hidden;
}

/* Navbar */
.navbar {
  background: #e53935;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  position: relative;
}

.navbar .brand {
  font-size: 20px;
  font-weight: bold;
}

.navbar nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar nav i {
  cursor: pointer;
  font-size: 18px;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 30px;
  background: #fff;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  min-width: 160px;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.dropdown-link {
  padding: 10px;
  text-align: left;
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: #333 !important;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal !important;
}

.dropdown-link:hover {
  background: #f8bbd0;
  color: #880e4f;
}

.back-login {
  color: #880e4f !important;
  font-weight: normal;
}

/* Welcome */
.welcome {
  text-align: center;
  margin: 25px 0;
  font-size: 22px;
  font-weight: bold;
  color: #c2185b;
}

/* Animasi */
.animate-text {
  animation: fadePulse 3s ease-in-out infinite;
}

@keyframes fadePulse {
  0% { opacity: 0; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.9; transform: scale(0.95); }
}

/* Etalase */
.etalase {
  text-align: center;
  margin-top: 30px;
}

.etalase h1 {
  font-size: 40px;
  color: #d32f2f;
  margin-bottom: 30px;
  position: relative;
}

.etalase h1::before,
.etalase h1::after {
  content: "";
  display: inline-block;
  width: 100px;
  height: 3px;
  background: #d32f2f;
  margin: 0 20px;
  vertical-align: middle;
}

/* Produk List */
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
</style>
