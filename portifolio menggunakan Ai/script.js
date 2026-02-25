// --- 1. Typing Animation ---
const words = ["Amira", "a Designer", "an Illustrator", "a Visual Artist"]; // Tambahkan kata sesukamu di sini
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 200; // Kecepatan mengetik
const backSpeed = 100; // Kecepatan menghapus
const delayBetweenWords = 2000; // Jeda sebelum ganti kata (2 detik)

function typeWriter() {
    const target = document.getElementById("nameType");
    const currentWord = words[wordIndex];

    if (isDeleting) {
        // Proses menghapus teks
        target.innerHTML = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Proses mengetik teks
        target.innerHTML = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Logika kontrol
    let currentSpeed = isDeleting ? backSpeed : typeSpeed;

    // Jika kata sudah selesai diketik
    if (!isDeleting && charIndex === currentWord.length) {
        currentSpeed = delayBetweenWords; // Berhenti sebentar di akhir kata
        isDeleting = true;
    } 
    // Jika kata sudah selesai dihapus
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Pindah ke kata berikutnya
        currentSpeed = 500; // Jeda sebelum mulai ngetik kata baru
    }

    setTimeout(typeWriter, currentSpeed);
}

// Jalankan saat halaman dimuat
window.addEventListener('DOMContentLoaded', typeWriter);

// --- 2. Image Switcher (Profile Photo) ---
const profileImages = [
    "gwe.jpeg" 
];
let imgIndex = 0;

function switchProfileImage() {
    const imgEl = document.getElementById("profileImg");
    if (imgEl && profileImages.length > 1) { // Hanya berganti jika foto lebih dari satu
        imgEl.style.opacity = 0;
        setTimeout(() => {
            imgIndex = (imgIndex + 1) % profileImages.length;
            imgEl.src = profileImages[imgIndex];
            imgEl.style.opacity = 1;
        }, 500);
    }
}

// Jalankan pengecekan ganti gambar
setInterval(switchProfileImage, 3000);


// --- 3. Heart Particles (Light Mode) ---
function createHeart() {
    // Partikel hanya muncul jika tidak di Dark Mode (agar tidak mengganggu estetik bulan)
    if (!document.body.classList.contains('dark-mode')) {
        const container = document.getElementById('heartContainer');
        if (container) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.opacity = Math.random();
            container.appendChild(heart);
            
            // Hapus elemen setelah animasi selesai agar RAM tidak berat
            setTimeout(() => heart.remove(), 6000);
        }
    }
}

// Buat hati baru setiap 400ms
setInterval(createHeart, 400);


// --- 4. Theme Toggle (Light/Dark) ---
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        // Bersihkan semua hati saat pindah ke Dark Mode
        document.getElementById('heartContainer').innerHTML = '';
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}