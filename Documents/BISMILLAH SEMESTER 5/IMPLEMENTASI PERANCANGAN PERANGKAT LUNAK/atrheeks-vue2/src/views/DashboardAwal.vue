```vue
<template>
  <div class="login-page">
    <!-- Header -->
    <header class="navbar">
      <div class="brand">ATHREEKS</div>
      <nav>
        <a href="#" @click.prevent="goDashboardGuest">ETALASE</a>
      </nav>
    </header>

    <!-- Content -->
    <div class="content">
      <!-- Left Section -->
      <div class="left">
        <p class="tagline">LETS SHOPING IN HERE !</p>
        <h1>Get your <br/> fruit charm <br/> on!</h1>

        <button class="btn" @click="masuk('login')">LOGIN</button>
        <button class="btn" @click="masuk('registrasi')">REGISTER</button>
      </div>

      <!-- Right Section -->
      <div class="right">
        <img 
          src="@/assets/Screenshot_2025-09-27_062833-removebg-preview.png" 
          alt="Main Illustration" 
          class="main-img"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardAwal",
  methods: {
    masuk(role) {
      if (role === "login") {
        this.$router.push("/login");
      } else if (role === "registrasi") {
        this.$router.push("/registrasi");
      }
    },
    goDashboardGuest() {
      this.$router.push("/dashboard-guest");
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

.login-page {
  background-color: #ffcdd2; /* pink muda */
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Fredoka One', cursive;
}

.navbar {
  background-color: #e53935;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  font-weight: bold;
  align-items: center;
}

.navbar .brand {
  font-size: 22px;
  letter-spacing: 2px;
}

.navbar nav a {
  margin: 0 15px;
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: 0.3s;
}

.navbar nav a:hover {
  color: #ffeb3b;
}

.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 80px;
}

.left {
  flex: 1;
  text-align: center;
}

.tagline {
  font-size: 14px;
  color: #b71c1c;
  margin-bottom: 10px;
  font-weight: bold;
}

.left h1 {
  font-size: 56px;
  font-weight: bold;
  color: #e91e63;
  line-height: 1.2;
  margin-bottom: 30px;
}

.btn {
  display: block;
  width: 220px;
  margin: 12px auto;
  padding: 14px;
  border-radius: 50px;
  border: 2px solid #e53935;
  background: none;
  color: #e53935;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background-color: #e53935;
  color: white;
}

.right {
  flex: 1;
  display: flex;
  justify-content: center;
}

.main-img {
  width: 500px;
}
</style>
```
