// admin.js
if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
}

const SB_URL = "https://hgddabrckebqtatonjvn.supabase.co";
// GUNAKAN KEY PANJANG YANG SAMA DENGAN SCRIPT.JS
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZGRhYnJja2VicXRhdG9uanZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MTY2OTIsImV4cCI6MjA4NjQ5MjY5Mn0.g3rjmMEh7MVYvn41F76c4OhdcyRowmoKuoa-9JmMfjQ"; 

const _supabase = supabase.createClient(SB_URL, SB_KEY);

async function fetchMessages() {
    const { data, error } = await _supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Gagal ambil data:", error.message);
        return;
    }

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ""; 

    data.forEach(item => {
        const row = `<tr>
            <td>${new Date(item.created_at).toLocaleString('id-ID')}</td>
            <td>${item.message}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "login.html";
});

fetchMessages();