const SUPABASE_URL = "https://hgddabrckebqtatonjvn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZGRhYnJja2VicXRhdG9uanZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MTY2OTIsImV4cCI6MjA4NjQ5MjY5Mn0.g3rjmMEh7MVYvn41F76c4OhdcyRowmoKuoa-9JmMfjQ";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function sendReport() {
    const messageInput = document.getElementById('message');
    const msg = messageInput.value.trim();

    if (!msg) {
        alert("Tulis laporan dulu!");
        return;
    }

    try {
        // 1. Simpan ke Database
        const { error: dbError } = await _supabase
            .from('reports')
            .insert([{ message: msg }]);

        if (dbError) throw dbError;

        // 2. Kirim ke WA dengan TOKEN BARU
        const tokenFonnte = "QEzhJK5UWKbo9GMS49ra"; // Token baru dari lu
        const nomorTujuan = "6285199742483";

        const formData = new FormData();
        formData.append('target', nomorTujuan);
        formData.append('message', "🚀 LAPORAN BARU: " + msg);

        const response = await fetch('https://api.fonnte.com/send', {
            method: 'POST',
            headers: { 'Authorization': tokenFonnte },
            body: formData
        });

        const resWA = await response.json();
        console.log("Respon Fonnte:", resWA);

        if (resWA.status === true) {
            alert("✅ SUKSES! Masuk Database & WA.");
        } else {
            alert("⚠️ Tersimpan di Database, tapi WA GAGAL: " + resWA.reason);
        }

        messageInput.value = ""; 

    } catch (err) {
        console.error("EROR:", err);
        alert("GAGAL TOTAL: " + err.message);
    }
}