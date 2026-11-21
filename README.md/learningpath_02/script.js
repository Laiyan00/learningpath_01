// 1. SAKELAR HARGA BULANAN VS TAHUNAN
const toggleDurasi = document.getElementById('toggleDurasi');
const angkaHarga = document.querySelectorAll('.angka-harga');
const labelBulanan = document.getElementById('labelBulanan');
const labelTahunan = document.getElementById('labelTahunan');

toggleDurasi.addEventListener('change', function() {
  const isTahunan = toggleDurasi.checked;

  // Ubah gaya label aktif
  labelBulanan.classList.toggle('label-aktif', !isTahunan);
  labelTahunan.classList.toggle('label-aktif', isTahunan);

  // Perbarui angka harga pada semua kartu
  angkaHarga.forEach(el => {
    el.textContent = isTahunan ? el.dataset.tahunan : el.dataset.bulanan;
  });
});

// 2. MODAL CHECKOUT PESANAN
const modalCheckout = document.getElementById('modalCheckout');
const tombolPilih = document.querySelectorAll('.btn-pilih');

tombolPilih.forEach(btn => {
  btn.addEventListener('click', function() {
    const isTahunan = toggleDurasi.checked;
    const namaPaket = btn.dataset.paket;
    const totalHarga = isTahunan ? btn.dataset.tahunan : btn.dataset.bulanan;

    document.getElementById('checkoutPaket').textContent = namaPaket;
    document.getElementById('checkoutSiklus').textContent = isTahunan ? 'Tahunan (12 Bulan)' : 'Bulanan';
    document.getElementById('checkoutTotal').textContent = `Rp ${totalHarga}`;

    modalCheckout.hidden = false;
  });
});

document.getElementById('tutupModal').addEventListener('click', () => {
  modalCheckout.hidden = true;
});

// 3. KIRIM PESANAN KE WHATSAPP
document.getElementById('formOrder').addEventListener('submit', function(e) {
  e.preventDefault();
  const paket = document.getElementById('checkoutPaket').textContent;
  const siklus = document.getElementById('checkoutSiklus').textContent;
  const total = document.getElementById('checkoutTotal').textContent;
  const domain = document.getElementById('inputDomain').value.trim();
  const nama = document.getElementById('inputNama').value.trim();

  const pesanWa = encodeURIComponent(
    `Halo CloudHost, saya *${nama}* ingin memesan layanan:\n` +
    `• Paket: *${paket}*\n` +
    `• Siklus: *${siklus}*\n` +
    `• Domain: *${domain}*\n` +
    `• Total: *${total}*`
  );

  // Ganti nomor WA dengan nomor Anda jika ingin diuji langsung
  window.open(`https://wa.me{pesanWa}`, '_blank');
  modalCheckout.hidden = true;
});
