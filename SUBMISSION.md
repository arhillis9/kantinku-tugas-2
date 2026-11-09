# Isi Form Tugas 2 — FrontendLab

Tautan di bawah sudah disesuaikan dengan akun GitHub kamu. Salin isi yang sesuai ke form pengumpulan.

## Repositori

- **Tautan repo GitHub (publik):** `https://github.com/arhillis9/kantinku-tugas-2`
- **Tautan GitHub Pages / demo (opsional):** `https://arhillis9.github.io/kantinku-tugas-2/`
- **Halaman wireframe Tugas 1 yang diimplementasikan:** KantinKu — halaman pemesanan makanan kampus

## Komponen 1

- **Nama komponen:** Header dan menu ponsel
- **Lokasi di kode (berkas/selektor):** `index.html` (`header.situs-header`, `#tombol-menu`, `#menu-utama`), `styles.css` (`.situs-header`, `.navigasi`), `script.js` (bagian “Menu ponsel”)
- **Perilaku:** Menampilkan navigasi utama. Di layar kecil, tombol Menu membuka dan menutup navigasi, `aria-expanded` ikut berubah, tombol Escape menutup menu, dan fokus kembali ke tombol Menu.

## Komponen 2

- **Nama komponen:** Kartu produk
- **Lokasi di kode (berkas/selektor):** `index.html` (`#menu`, `.kartu-produk`, `.tambah`), `styles.css` (`.daftar-produk`, `.kartu-produk`), `script.js` (bagian “Data produk” dan listener `.tambah`)
- **Perilaku:** Menampilkan tiga menu beserta harga. Tombol Tambah memasukkan item ke keranjang, memperbarui lencana jumlah, dan menampilkan pesan status.

## Komponen 3

- **Nama komponen:** Keranjang belanja dan tombol simpan pesanan
- **Lokasi di kode (berkas/selektor):** `index.html` (`#keranjang`, `#daftar-keranjang`, `#total`, `#simpan-pesanan`), `styles.css` (`.keranjang-panel`, `.item-keranjang`), `script.js` (`renderKeranjang`, `ubahJumlah`, bagian “Simpan pesanan dengan status memuat”)
- **Perilaku:** Menampilkan item, jumlah, dan total dalam format Rupiah. Tombol `+`/`−` mengubah jumlah; tombol Simpan pesanan menonaktifkan tombol, menampilkan `Menyimpan…` dengan `aria-busy`, lalu `Tersimpan ✓` beserta pesan status.

## Komponen 4

- **Nama komponen:** Dialog konfirmasi kosongkan keranjang
- **Lokasi di kode (berkas/selektor):** `index.html` (`#dialog-kosongkan`, `#tidak`, `#ya`), `styles.css` (`.dialog`), `script.js` (bagian “Dialog kosongkan keranjang”)
- **Perilaku:** Keranjang hanya dikosongkan setelah pengguna menekan “Ya, kosongkan”. Dialog memakai elemen native `<dialog>`, `showModal()`, `close()`, dan mengembalikan fokus ke tombol pemicu.

## Komponen 5

- **Nama komponen:** Form masuk dengan validasi
- **Lokasi di kode (berkas/selektor):** `index.html` (`#form-masuk`, `#email`, `#password`, `#galat-email`, `#galat-password`), `styles.css` (`.form-masuk`, `.galat`), `script.js` (bagian “Validasi form masuk”)
- **Perilaku:** Memvalidasi email wajib/format email dan password minimal 8 karakter. Pesan error ditampilkan, `aria-invalid` dipasang, fokus berpindah ke field pertama yang salah, dan pesan berhasil muncul setelah data valid.

## Catatan pengerjaan

Tantangan utama adalah menjaga state keranjang tetap sinkron dengan tampilan dan memastikan interaksi tetap dapat diakses. Saya memakai `Map` untuk menyimpan jumlah per produk, memisahkan fungsi render dari event handler, dan merender ulang daftar setiap ada perubahan. Untuk menu ponsel, saya menambahkan `aria-expanded`, dukungan tombol Escape, dan pengembalian fokus. Pada form, saya memakai `novalidate` agar pesan error konsisten dan fokus diarahkan ke field pertama yang salah.

## Pernyataan penggunaan AI

**Apakah kamu memakai AI?** Ya.

**Pernyataan:** Saya memakai AI (OpenCode) untuk membantu menyusun struktur HTML, styling CSS, dan logika JavaScript. Saya meninjau, menyesuaikan, dan menguji hasilnya di browser sebelum mengumpulkan tugas.

## Checklist sebelum mengumpulkan

1. Repo GitHub **publik** sudah dibuat: `https://github.com/arhillis9/kantinku-tugas-2`.
2. `index.html` sudah berada di **folder akar** repo.
3. GitHub Pages sudah diaktifkan dari branch `main` dan folder `/ (root)`.
4. Isi form pengumpulan memakai tautan repo dan demo di atas.
5. Pilih pernyataan penggunaan AI dengan jujur, lalu kumpulkan.
6. Jika pemeriksaan otomatis memberi catatan, perbaiki dan kumpulkan ulang sebelum tenggat.

## Perintah git untuk update berikutnya

Repo lokal sudah terhubung ke GitHub. Setelah mengubah file, jalankan dari folder `tugas-2`:

```bash
git add .
git commit -m "Perbarui proyek Tugas 2"
git push
```
