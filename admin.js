// 1. Cek Sesi (Proteksi halaman)
if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// 2. Konfigurasi Supabase
const SB_URL = "https://hgddabrckebqtatonjvn.supabase.co";
const SB_KEY = "sb_publishable_XuBtVYy-FOw_XxLCMkMLTQ_DorVuxdg";
const _supabase = supabase.createClient(SB_URL, SB_KEY);

// 3. Ambil Data dari Tabel 'reports'
async function fetchMessages() {
    const { data, error } = await _supabase
        .from('reports') // Pastikan nama tabel di Supabase adalah 'reports'
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Gagal ambil data:", error.message);
        return;
    }

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ""; // Bersihkan pesan lama

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(item.created_at).toLocaleString('id-ID')}</td>
            <td>${item.message}</td>
        `;
        tableBody.innerHTML += row.outerHTML;
    });
}

// 4. Fungsi Logout
document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "login.html";
});

// Jalankan fungsi ambil data saat halaman dimuat
fetchMessages();