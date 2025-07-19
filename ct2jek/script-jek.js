document.addEventListener('DOMContentLoaded', function() {
    const appContainer = document.getElementById('app-container');
    const mainContent = document.getElementById('main-content');
    const navItems = document.querySelectorAll('.nav-item');
    const serviceCards = document.querySelectorAll('.service-card');
    const headerBar = document.getElementById('header-bar');
    const searchBtn = document.getElementById('search-btn');
    const notificationBtn = document.getElementById('notification-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const customAlert = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    // --- Utility Functions ---
    /**
     * Menampilkan pesan kustom (toast/alert) di bagian bawah layar.
     * @param {string} message - Pesan yang akan ditampilkan.
     * @param {'info'|'success'|'error'|'warning'} type - Tipe pesan untuk styling (info, success, error, warning).
     * @param {number} duration - Durasi pesan ditampilkan dalam milidetik.
     */
    function showCustomAlert(message, type = 'info', duration = 3000) {
        alertMessage.textContent = message;
        customAlert.className = `custom-alert active bg-${type} text-white`; // Reset classes and activate with Bootstrap color
        // For custom colors, ensure they are defined in style.css and mapped here if needed.
        // Example: customAlert.classList.add(`bg-${type}`);

        setTimeout(() => {
            customAlert.classList.remove('active');
            // Remove specific type classes after fading out to allow for new types
            customAlert.classList.remove(`bg-${type}`);
        }, duration);
    }

    // --- SPA Routing ---
    let currentPageId = 'home-page'; // Halaman default saat aplikasi dimuat

    /**
     * Menampilkan halaman SPA yang ditentukan dan menyembunyikan halaman saat ini.
     * Menerapkan transisi visual antar halaman.
     * @param {string} pageId - ID dari elemen section halaman yang akan ditampilkan (misal: 'home-page', 'ride-page').
     */
    function showPage(pageId) {
        // Jika halaman yang diminta sudah aktif, tidak perlu melakukan apa-apa
        if (currentPageId === pageId) return;

        const currentPage = document.getElementById(currentPageId);
        const nextPage = document.getElementById(pageId);

        if (currentPage && nextPage) {
            // Tambahkan kelas 'leaving' untuk memulai animasi keluar halaman saat ini
            currentPage.classList.add('leaving');
            currentPage.classList.remove('active');

            // Setelah animasi keluar selesai (sesuai durasi CSS transition),
            // sembunyikan halaman saat ini dan tampilkan halaman berikutnya
            setTimeout(() => {
                currentPage.style.display = 'none'; // Sembunyikan setelah animasi
                nextPage.style.display = 'block'; // Tampilkan sebelum animasi masuk
                nextPage.classList.add('active'); // Tambahkan kelas 'active' untuk animasi masuk
                nextPage.classList.remove('leaving'); // Hapus kelas 'leaving'
                mainContent.scrollTop = 0; // Gulir ke atas halaman baru
            }, 300); // Durasi harus sesuai dengan CSS transition .page

            currentPageId = pageId; // Perbarui ID halaman aktif

            // Perbarui status aktif di navigasi bawah
            navItems.forEach(item => {
                // Bootstrap's active class for nav-item is 'active'
                if (item.dataset.page === pageId.replace('-page', '')) { // Hapus '-page' untuk mencocokkan data-page
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }

    // Panggil showPage untuk memuat halaman awal saat DOM selesai dimuat
    showPage(currentPageId);

    // --- Bottom Navigation Click Handlers ---
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            // Penanganan khusus untuk 'orders' (saat ini hanya placeholder)
            if (page === 'orders') {
                showCustomAlert('Fitur Pesanan sedang dalam pengembangan!', 'info');
                return;
            }
            showPage(page + '-page'); // Navigasi ke halaman yang sesuai
        });
    });

    // --- Service Card Click Handlers (Home Page) ---
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const page = card.dataset.page;
            // Navigasi ke halaman layanan spesifik atau tampilkan pesan pengembangan
            if (page === 'ride' || page === 'food' || page === 'send' || page === 'wallet' || page === 'profile') {
                showPage(page + '-page');
            } else if (page === 'mart' || page === 'bill' || page === 'more') {
                showCustomAlert(`Fitur ${card.querySelector('span').textContent} sedang dalam pengembangan!`, 'info');
            }
        });
    });

    // --- Header Bar Button Handlers ---
    // Tombol pencarian di header
    searchBtn.addEventListener('click', () => showPage('search-page'));
    // Tombol notifikasi di header
    notificationBtn.addEventListener('click', () => showPage('notification-page'));

    // --- Dark Mode Toggle ---
    const body = document.body;
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark'); // Toggle kelas 'dark' pada body
        const isDarkMode = body.classList.contains('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Simpan preferensi ke Local Storage
        // Perbarui ikon tombol dark mode
        darkModeToggle.querySelector('i').classList.toggle('fa-moon', !isDarkMode);
        darkModeToggle.querySelector('i').classList.toggle('fa-sun', isDarkMode);
    });

    // Terapkan tema yang tersimpan saat halaman dimuat
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    } else {
        // Pastikan ikon default adalah bulan jika tema bukan dark
        darkModeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    // --- Ride Booking Logic ---
    const findDriverBtn = document.getElementById('find-driver-btn');
    const rideConfirmModalElement = document.getElementById('ride-confirm-modal');
    // Initialize Bootstrap Modal instance
    const rideConfirmModal = new bootstrap.Modal(rideConfirmModalElement);
    const modalOrigin = document.getElementById('modal-origin');
    const modalDestination = document.getElementById('modal-destination');
    const bookRideBtn = document.getElementById('book-ride-btn');

    if (findDriverBtn) {
        findDriverBtn.addEventListener('click', () => {
            const origin = document.getElementById('origin-input').value;
            const destination = document.getElementById('destination-input').value;

            // Validasi input untuk lokasi penjemputan dan tujuan
            if (origin && destination) {
                modalOrigin.textContent = origin;
                modalDestination.textContent = destination;
                rideConfirmModal.show(); // Tampilkan modal Bootstrap
            } else {
                showCustomAlert('Harap masukkan lokasi penjemputan dan tujuan.', 'error');
            }
        });
    }

    if (bookRideBtn) {
        bookRideBtn.addEventListener('click', () => {
            rideConfirmModal.hide(); // Sembunyikan modal Bootstrap
            showCustomAlert('Mencari driver terdekat...', 'info', 2000); // Pesan info
            setTimeout(() => {
                showCustomAlert('Driver ditemukan! Pesanan Anda sedang dalam perjalanan.', 'success', 3000); // Pesan sukses
                // Reset input setelah simulasi booking berhasil
                document.getElementById('origin-input').value = '';
                document.getElementById('destination-input').value = '';
                showPage('home-page'); // Kembali ke halaman beranda
            }, 2500); // Jeda simulasi pencarian driver
        });
    }

    // --- Send Page Logic ---
    const requestSendBtn = document.getElementById('request-send-btn');
    if (requestSendBtn) {
        requestSendBtn.addEventListener('click', () => {
            const pickup = document.getElementById('pickup-input').value;
            const delivery = document.getElementById('delivery-input').value;
            const itemDesc = document.getElementById('item-description').value;

            // Validasi input untuk pengiriman
            if (pickup && delivery && itemDesc) {
                showCustomAlert('Permintaan pengiriman Anda sedang diproses...', 'info', 2000);
                setTimeout(() => {
                    showCustomAlert('Pengiriman berhasil dijadwalkan! Driver akan segera menjemput barang.', 'success', 3000);
                    document.getElementById('pickup-input').value = '';
                    document.getElementById('delivery-input').value = '';
                    document.getElementById('item-description').value = '';
                    showPage('home-page'); // Kembali ke halaman beranda
                }, 2500);
            } else {
                showCustomAlert('Harap lengkapi semua detail pengiriman.', 'error');
            }
        });
    }

    // --- Food Page Logic (Basic Modal for Food Item) ---
    const foodDetailModalElement = document.getElementById('food-detail-modal');
    // Initialize Bootstrap Modal instance
    const foodDetailModal = new bootstrap.Modal(foodDetailModalElement);

    // Menambahkan event listener ke setiap kartu item makanan untuk menampilkan modal detail
    document.querySelectorAll('.restaurant-card, .food-item-card').forEach(item => { // Added restaurant card as well for demo
        item.addEventListener('click', () => {
            // Dalam aplikasi nyata, ini akan memuat data item makanan spesifik dari backend
            foodDetailModal.show(); // Tampilkan modal detail makanan
        });
    });

    // --- Location Update (Placeholder) ---
    const currentLocationSpan = document.getElementById('current-location');
    if (currentLocationSpan) {
        // Simulasikan pembaruan lokasi setelah penundaan
        setTimeout(() => {
            currentLocationSpan.textContent = 'Jl. Contoh No. 123';
        }, 1500);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const appContainer = document.getElementById('app-container');
    const mainContent = document.getElementById('main-content');
    const navItems = document.querySelectorAll('.nav-item');
    const serviceCards = document.querySelectorAll('.service-card');
    const headerBar = document.getElementById('header-bar');
    const searchBtn = document.getElementById('search-btn');
    const notificationBtn = document.getElementById('notification-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const customAlert = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    // --- Utility Functions ---
    /**
     * Menampilkan pesan kustom (toast/alert) di bagian bawah layar.
     * @param {string} message - Pesan yang akan ditampilkan.
     * @param {'info'|'success'|'error'|'warning'} type - Tipe pesan untuk styling (info, success, error, warning).
     * @param {number} duration - Durasi pesan ditampilkan dalam milidetik.
     */
    function showCustomAlert(message, type = 'info', duration = 3000) {
        alertMessage.textContent = message;
        customAlert.className = `custom-alert active bg-${type} text-white`; // Reset classes and activate with Bootstrap color
        // For custom colors, ensure they are defined in style.css and mapped here if needed.
        // Example: customAlert.classList.add(`bg-${type}`);

        setTimeout(() => {
            customAlert.classList.remove('active');
            // Remove specific type classes after fading out to allow for new types
            customAlert.classList.remove(`bg-${type}`);
        }, duration);
    }

    // --- SPA Routing ---
    let currentPageId = 'home-page'; // Halaman default saat aplikasi dimuat

    /**
     * Menampilkan halaman SPA yang ditentukan dan menyembunyikan halaman saat ini.
     * Menerapkan transisi visual antar halaman.
     * @param {string} pageId - ID dari elemen section halaman yang akan ditampilkan (misal: 'home-page', 'ride-page').
     */
    function showPage(pageId) {
        // Jika halaman yang diminta sudah aktif, tidak perlu melakukan apa-apa
        if (currentPageId === pageId) return;

        const currentPage = document.getElementById(currentPageId);
        const nextPage = document.getElementById(pageId);

        if (currentPage && nextPage) {
            // Tambahkan kelas 'leaving' untuk memulai animasi keluar halaman saat ini
            currentPage.classList.add('leaving');
            currentPage.classList.remove('active');

            // Setelah animasi keluar selesai (sesuai durasi CSS transition),
            // sembunyikan halaman saat ini dan tampilkan halaman berikutnya
            setTimeout(() => {
                currentPage.style.display = 'none'; // Sembunyikan setelah animasi
                nextPage.style.display = 'block'; // Tampilkan sebelum animasi masuk
                nextPage.classList.add('active'); // Tambahkan kelas 'active' untuk animasi masuk
                nextPage.classList.remove('leaving'); // Hapus kelas 'leaving'
                mainContent.scrollTop = 0; // Gulir ke atas halaman baru
            }, 300); // Durasi harus sesuai dengan CSS transition .page

            currentPageId = pageId; // Perbarui ID halaman aktif

            // Perbarui status aktif di navigasi bawah
            navItems.forEach(item => {
                // Bootstrap's active class for nav-item is 'active'
                if (item.dataset.page === pageId.replace('-page', '')) { // Hapus '-page' untuk mencocokkan data-page
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }

    // Panggil showPage untuk memuat halaman awal saat DOM selesai dimuat
    showPage(currentPageId);

    // --- Bottom Navigation Click Handlers ---
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            // Penanganan khusus untuk 'orders' (saat ini hanya placeholder)
            if (page === 'orders') {
                showCustomAlert('Fitur Pesanan sedang dalam pengembangan!', 'info');
                return;
            }
            showPage(page + '-page'); // Navigasi ke halaman yang sesuai
        });
    });

    // --- Service Card Click Handlers (Home Page) ---
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const page = card.dataset.page;
            // Navigasi ke halaman layanan spesifik atau tampilkan pesan pengembangan
            if (page === 'ride' || page === 'food' || page === 'send' || page === 'wallet' || page === 'profile') {
                showPage(page + '-page');
            } else if (page === 'mart' || page === 'bill' || page === 'more') {
                showCustomAlert(`Fitur ${card.querySelector('span').textContent} sedang dalam pengembangan!`, 'info');
            }
        });
    });

    // --- Header Bar Button Handlers ---
    // Tombol pencarian di header
    searchBtn.addEventListener('click', () => showPage('search-page'));
    // Tombol notifikasi di header
    notificationBtn.addEventListener('click', () => showPage('notification-page'));

    // --- Dark Mode Toggle ---
    const body = document.body;
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark'); // Toggle kelas 'dark' pada body
        const isDarkMode = body.classList.contains('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Simpan preferensi ke Local Storage
        // Perbarui ikon tombol dark mode
        darkModeToggle.querySelector('i').classList.toggle('fa-moon', !isDarkMode);
        darkModeToggle.querySelector('i').classList.toggle('fa-sun', isDarkMode);
    });

    // Terapkan tema yang tersimpan saat halaman dimuat
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    } else {
        // Pastikan ikon default adalah bulan jika tema bukan dark
        darkModeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    // --- Ride Booking Logic ---
    const findDriverBtn = document.getElementById('find-driver-btn');
    const rideConfirmModalElement = document.getElementById('ride-confirm-modal');
    // Initialize Bootstrap Modal instance
    const rideConfirmModal = new bootstrap.Modal(rideConfirmModalElement);
    const modalOrigin = document.getElementById('modal-origin');
    const modalDestination = document.getElementById('modal-destination');
    const bookRideBtn = document.getElementById('book-ride-btn');

    if (findDriverBtn) {
        findDriverBtn.addEventListener('click', () => {
            const origin = document.getElementById('origin-input').value;
            const destination = document.getElementById('destination-input').value;

            // Validasi input untuk lokasi penjemputan dan tujuan
            if (origin && destination) {
                modalOrigin.textContent = origin;
                modalDestination.textContent = destination;
                rideConfirmModal.show(); // Tampilkan modal Bootstrap
            } else {
                showCustomAlert('Harap masukkan lokasi penjemputan dan tujuan.', 'error');
            }
        });
    }

    if (bookRideBtn) {
        bookRideBtn.addEventListener('click', () => {
            rideConfirmModal.hide(); // Sembunyikan modal Bootstrap
            showCustomAlert('Mencari driver terdekat...', 'info', 2000); // Pesan info
            setTimeout(() => {
                showCustomAlert('Driver ditemukan! Pesanan Anda sedang dalam perjalanan.', 'success', 3000); // Pesan sukses
                // Reset input setelah simulasi booking berhasil
                document.getElementById('origin-input').value = '';
                document.getElementById('destination-input').value = '';
                showPage('home-page'); // Kembali ke halaman beranda
            }, 2500); // Jeda simulasi pencarian driver
        });
    }

    // --- Send Page Logic ---
    const requestSendBtn = document.getElementById('request-send-btn');
    if (requestSendBtn) {
        requestSendBtn.addEventListener('click', () => {
            const pickup = document.getElementById('pickup-input').value;
            const delivery = document.getElementById('delivery-input').value;
            const itemDesc = document.getElementById('item-description').value;

            // Validasi input untuk pengiriman
            if (pickup && delivery && itemDesc) {
                showCustomAlert('Permintaan pengiriman Anda sedang diproses...', 'info', 2000);
                setTimeout(() => {
                    showCustomAlert('Pengiriman berhasil dijadwalkan! Driver akan segera menjemput barang.', 'success', 3000);
                    document.getElementById('pickup-input').value = '';
                    document.getElementById('delivery-input').value = '';
                    document.getElementById('item-description').value = '';
                    showPage('home-page'); // Kembali ke halaman beranda
                }, 2500);
            } else {
                showCustomAlert('Harap lengkapi semua detail pengiriman.', 'error');
            }
        });
    }

    // --- Food Page Logic (Basic Modal for Food Item) ---
    const foodDetailModalElement = document.getElementById('food-detail-modal');
    // Initialize Bootstrap Modal instance
    const foodDetailModal = new bootstrap.Modal(foodDetailModalElement);

    // Menambahkan event listener ke setiap kartu item makanan untuk menampilkan modal detail
    document.querySelectorAll('.restaurant-card, .food-item-card').forEach(item => { // Added restaurant card as well for demo
        item.addEventListener('click', () => {
            // Dalam aplikasi nyata, ini akan memuat data item makanan spesifik dari backend
            foodDetailModal.show(); // Tampilkan modal detail makanan
        });
    });

    // --- Location Update (Placeholder) ---
    const currentLocationSpan = document.getElementById('current-location');
    if (currentLocationSpan) {
        // Simulasikan pembaruan lokasi setelah penundaan
        setTimeout(() => {
            currentLocationSpan.textContent = 'Jl. Contoh No. 123';
        }, 1500);
    }
});
