import Vue from 'vue'
import Router from 'vue-router'
import Awal from './views/DashboardAwal.vue'
import Login from './views/DashboardLogin.vue'
import Registrasi from './views/DashboardRegister.vue'
import DashboardAdmin from './views/DashboardAdmin.vue'
import DashboardPembeli from './views/DashboardPembeli.vue'
import DashboardGuest from './views/DashboardGuest.vue'
import ProsesPesanan from './views/ProsesPesanan.vue'
import Pembayaran from './views/Pembayaran.vue'
import HistoryPembeli from './views/HistoryPembeli.vue'
import RincianProduk from './views/RincianProduk.vue'
import ProfilePengguna from './views/ProfilePengguna.vue'
import KelolaProduk from './views/KelolaProduk.vue'
import KelolaPesanan from './views/KelolaPesanan.vue'
import HistoryAdmin from './views/HistoryAdmin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Awal },
    { path: '/login', component: Login },
    { path: '/registrasi', component: Registrasi },
    { path: '/dashboard-admin', component: DashboardAdmin },
    { path: '/dashboard-pembeli', component: DashboardPembeli },
    { path: '/dashboard-guest', component: DashboardGuest },
    { path: '/proses-pesanan', component: ProsesPesanan },
    { path: '/pembayaran', component: Pembayaran },
    { path: '/history-pembeli', component: HistoryPembeli },
    { path: '/rincian-produk/:nama', component: RincianProduk },
    { path: '/profile', component: ProfilePengguna },
    { path: '/kelola-produk', component: KelolaProduk },
    { path: '/kelola-pesanan', component: KelolaPesanan },
    { path: '/history-admin', component: HistoryAdmin }
  ]
})
