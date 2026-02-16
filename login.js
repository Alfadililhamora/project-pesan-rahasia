document.getElementById('btnMasuk').addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Tentukan username & password statis di sini
    if (user === "admin" && pass === "admin123") {
        // Simpan sesi login sederhana
        localStorage.setItem("adminLoggedIn", "true");
        alert("✅ Login Berhasil!");
        window.location.href = "admin.html"; // Ke dashboard pesan
    } else {
        alert("❌ Username atau Password salah!");
    }
});