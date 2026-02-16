const SUPABASE_URL = "https://hgddabrckebqtatonjvn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZGRhYnJja2VicXRhdG9uanZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MTY2OTIsImV4cCI6MjA4NjQ5MjY5Mn0.g3rjmMEh7MVYvn41F76c4OhdcyRowmoKuoa-9JmMfjQ"; 

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function sendReport() {
    const messageInput = document.getElementById('message');
    const msg = messageInput.value.trim();

    if (!msg) {
        alert("Tulis laporanmu dulu ya!");
        return;
    }

    try {
        const { error } = await _supabase
            .from('reports')
            .insert([{ message: msg }]);

        if (error) throw error;

        alert("✅ Laporan Berhasil Dikirim!");
        messageInput.value = ""; 
    } catch (err) {
        console.error("Detail Error:", err);
        alert("Gagal: " + err.message);
    }
}