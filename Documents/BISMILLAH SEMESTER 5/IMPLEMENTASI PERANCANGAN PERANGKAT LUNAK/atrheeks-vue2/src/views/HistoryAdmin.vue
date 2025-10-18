<template>
  <div class="history-admin">
    <!-- 🌸 Navbar -->
    <header class="navbar">
      <div class="brand">ATHREEKS - History Penjualan</div>
      <div class="navbar-right">
        <button class="home-btn" @click="$router.push('/dashboard-admin')">
          <i class="fas fa-home"></i> Home
        </button>
      </div>
    </header>

    <main class="content">
      <!-- Judul -->
      <h1 class="title">📊 HISTORY PENJUALAN PER BULAN DAN TAHUN</h1>

      <!-- Filter Tahun -->
      <div class="filter-container year-filter">
        <label for="tahun">Pilih Tahun:</label>
        <!-- 🌼 Sekarang hanya update bar chart -->
        <select id="tahun" v-model="selectedYear" @change="updateBarChart">
          <option v-for="tahun in availableYears" :key="tahun" :value="tahun">
            {{ tahun }}
          </option>
        </select>
      </div>

      <!-- Chart Section -->
      <div class="chart-row">
        <!-- Bar Chart -->
        <div class="chart-container">
          <h2>📅 Total Penjualan per Bulan ({{ selectedYear }})</h2>
          <canvas id="salesChart"></canvas>
        </div>

        <!-- Pie Chart -->
        <div class="chart-container pie-small">
          <h2>🍰 Rincian Produk ({{ selectedMonth }})</h2>
          <!-- Pilihan Bulan -->
          <div class="filter-container">
            <label for="bulan">Pilih Bulan:</label>
            <!-- 🌸 Sekarang hanya update pie chart -->
            <select id="bulan" v-model="selectedMonth" @change="updatePieChart">
              <option v-for="bulan in salesData.labels" :key="bulan" :value="bulan">
                {{ bulan }}
              </option>
            </select>
          </div>

          <div class="pie-wrapper">
            <canvas id="pieChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Tabel Penjualan -->
      <div class="table-container">
        <h2>🧾 Rincian Penjualan Bulan {{ selectedMonth }} {{ selectedYear }}</h2>
        <table>
          <thead>
            <tr>
              <th>ID Pesanan</th>
              <th>Nama Pemesan</th>
              <th>Pesanan</th>
              <th>Total (Rp)</th>
              <th>Status Pembayaran</th>
              <th>Bulan</th>
              <th>Tahun</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.nama }}</td>
              <td>{{ order.pesanan.join(', ') }}</td>
              <td>{{ order.total.toLocaleString('id-ID') }}</td>
              <td class="status">{{ order.status }}</td>
              <td>{{ order.bulan }}</td>
              <td>{{ order.tahun }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import { nextTick } from "vue";
import {
  Chart,
  BarController,
  PieController,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(BarController, PieController, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

export default {
  name: "HistoryAdmin",
  data() {
    return {
      selectedMonth: "Januari",
      selectedYear: 2025,
      availableYears: [2024, 2025],
      barChart: null,
      pieChart: null,
      orders: [
        // 🩷 Data 2025
        { id: "P001", nama: "Alya", pesanan: ["Salad Buah"], total: 15000, status: "Lunas", bulan: "Januari", tahun: 2025 },
        { id: "P002", nama: "Rizky", pesanan: ["Salad Jelly", "Gelang"], total: 27000, status: "Lunas", bulan: "Februari", tahun: 2025 },
        { id: "P003", nama: "Dina", pesanan: ["Bagcharm"], total: 20000, status: "Lunas", bulan: "Maret", tahun: 2025 },
        { id: "P004", nama: "Nia", pesanan: ["Salad Buah", "Salad Jelly"], total: 30000, status: "Lunas", bulan: "April", tahun: 2025 },
        { id: "P005", nama: "Bima", pesanan: ["Gelang"], total: 12000, status: "Lunas", bulan: "Mei", tahun: 2025 },
        { id: "P006", nama: "Citra", pesanan: ["Bagcharm", "Gelang"], total: 32000, status: "Lunas", bulan: "Juni", tahun: 2025 },
        { id: "P007", nama: "Lina", pesanan: ["Salad Jelly"], total: 14000, status: "Lunas", bulan: "Juli", tahun: 2025 },
        { id: "P008", nama: "Dewi", pesanan: ["Salad Buah", "Bagcharm"], total: 35000, status: "Lunas", bulan: "Agustus", tahun: 2025 },
        { id: "P009", nama: "Sinta", pesanan: ["Gelang"], total: 12000, status: "Lunas", bulan: "September", tahun: 2025 },
        { id: "P010", nama: "Rani", pesanan: ["Salad Buah", "Salad Jelly", "Gelang"], total: 40000, status: "Lunas", bulan: "Oktober", tahun: 2025 },
        { id: "P011", nama: "Tina", pesanan: ["Bagcharm"], total: 20000, status: "Lunas", bulan: "November", tahun: 2025 },
        { id: "P012", nama: "Mila", pesanan: ["Salad Buah", "Bagcharm", "Gelang"], total: 45000, status: "Lunas", bulan: "Desember", tahun: 2025 },

        // 💜 Data 2024
        { id: "A001", nama: "Doni", pesanan: ["Salad Buah"], total: 12000, status: "Lunas", bulan: "Januari", tahun: 2024 },
        { id: "A002", nama: "Rara", pesanan: ["Bagcharm"], total: 18000, status: "Lunas", bulan: "Maret", tahun: 2024 },
        { id: "A003", nama: "Ayu", pesanan: ["Salad Jelly"], total: 15000, status: "Lunas", bulan: "Mei", tahun: 2024 },
        { id: "A004", nama: "Kiki", pesanan: ["Gelang"], total: 10000, status: "Lunas", bulan: "Juni", tahun: 2024 },
        { id: "A005", nama: "Reno", pesanan: ["Salad Buah", "Bagcharm"], total: 30000, status: "Lunas", bulan: "Agustus", tahun: 2024 },
      ],
      salesData: {
        labels: [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni",
          "Juli", "Agustus", "September", "Oktober", "November", "Desember",
        ],
      },
      productColors: ["#f48fb1", "#ce93d8", "#ffb74d", "#81c784"],
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(
        (o) => o.bulan === this.selectedMonth && o.tahun === this.selectedYear
      );
    },
  },
  mounted() {
  nextTick(() => {
      this.updateBarChart();
      setTimeout(() => this.updatePieChart(), 100); // beri waktu Vue render dulu
    });
  },
  methods: {
    // 🌸 Pisahkan fungsi agar tidak tumpang tindih
    updateBarChart() {
      this.renderBarChart();
    },
    updatePieChart() {
      this.renderPieChart();
    },

    // 🩷 Bar Chart per tahun
    renderBarChart() {
      const ctx = document.getElementById("salesChart").getContext("2d");
      if (this.barChart) this.barChart.destroy();

      const monthlyTotals = this.salesData.labels.map((bulan) => {
        const orders = this.orders.filter(
          (o) => o.bulan === bulan && o.tahun === this.selectedYear
        );
        return orders.reduce((sum, o) => sum + o.total, 0);
      });

      this.barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.salesData.labels,
          datasets: [
            {
              label: `Total Penjualan (${this.selectedYear})`,
              data: monthlyTotals,
              backgroundColor: "#f48fb1",
              borderColor: "#c2185b",
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { labels: { color: "#880e4f" } } },
          scales: {
            x: { ticks: { color: "#ad1457" }, grid: { display: false } },
            y: { ticks: { color: "#ad1457" } },
          },
        },
      });
    },

    // 💜 Pie Chart per bulan & tahun
    // 💜 Pie Chart per bulan & tahun
    renderPieChart() {
      const canvas = document.getElementById("pieChart");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (this.pieChart) this.pieChart.destroy();

        const orders = this.orders.filter(
          (o) => o.bulan === this.selectedMonth && o.tahun === this.selectedYear
        );

        const productCount = { "Salad Buah": 0, "Salad Jelly": 0, "Bagcharm": 0, "Gelang": 0 };

        orders.forEach((order) => {
          order.pesanan.forEach((item) => {
            if (productCount[item] !== undefined) productCount[item]++;
          });
        });

        // 🩷 Pindahkan log ke sini!
        console.log("Pie data:", productCount);

        this.pieChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: Object.keys(productCount),
            datasets: [
              {
                data: Object.values(productCount),
                backgroundColor: this.productColors,
                borderColor: "#fff",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: { color: "#ad1457", font: { size: 14 } },
              },
            },
          },
        });
    },
  },
};
</script>

<style scoped>
.history-admin {
  font-family: "Fredoka One", cursive;
  background: #fce4ec;
  min-height: 100vh;
  padding-bottom: 40px;
  padding-top: 100px;
}

/* 🌸 Navbar */
.navbar {
  background: #e53935;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 40px;
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

/* Judul */
.title {
  text-align: center;
  font-size: 28px;
  color: #c2185b;
  margin: 30px 0;
}

/* Filter Tahun */
.year-filter {
  text-align: center;
  margin-bottom: 30px;
}
.year-filter select {
  margin-left: 8px;
  padding: 6px 12px;
  border-radius: 10px;
  border: 2px solid #f48fb1;
  color: #ad1457;
  background: #fff0f5;
  font-family: "Fredoka One", cursive;
}

/* Chart sejajar */
.chart-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  padding: 0 20px;
  margin-top: 20px;
}

/* Chart Card */
.chart-container {
  flex: 1 1 45%;
  background: #f8bbd0;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  max-width: 500px;
}

.chart-container h2 {
  color: #ad1457;
  text-align: center;
  margin-bottom: 15px;
}

/* Filter Bulan */
.filter-container {
  text-align: center;
  margin-bottom: 15px;
  font-size: 16px;
  color: #ad1457;
}
.filter-container select {
  margin-left: 8px;
  padding: 6px 12px;
  border-radius: 10px;
  border: 2px solid #f48fb1;
  color: #ad1457;
  background: #fff0f5;
  font-family: "Fredoka One", cursive;
}

/* Tabel */
.table-container {
  width: 90%;
  margin: 40px auto 0;
  background: #fff0f5;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
.table-container h2 {
  color: #c2185b;
  text-align: center;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background: #f48fb1;
  color: white;
  padding: 10px;
}
td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #f8bbd0;
  color: #880e4f;
}
.status {
  color: #43a047;
  font-weight: bold;
}
tr:hover {
  background-color: #fce4ec;
  transition: 0.3s;
}
.pie-wrapper {
  position: relative;
  height: 300px; /* atau 350px biar proporsional */
  width: 300px;
  margin: 0 auto;
}

</style>
