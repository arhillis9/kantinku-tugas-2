/* =========================================================
   KantinKu — script.js
   Interaksi halaman: menu ponsel, keranjang, dialog
   konfirmasi, tombol simpan dengan status memuat, dan
   validasi form masuk.
   ========================================================= */

"use strict";

/* ---------- Menu ponsel ---------- */

const tombolMenu = document.querySelector("#tombol-menu");
const menuUtama = document.querySelector("#menu-utama");

function aturMenu(terbuka) {
  menuUtama.classList.toggle("terbuka", terbuka);
  tombolMenu.setAttribute("aria-expanded", String(terbuka));
}

tombolMenu.addEventListener("click", () => {
  const sedangTerbuka = tombolMenu.getAttribute("aria-expanded") === "true";
  aturMenu(!sedangTerbuka);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    tombolMenu.getAttribute("aria-expanded") === "true"
  ) {
    aturMenu(false);
    tombolMenu.focus();
  }
});

menuUtama.querySelectorAll("a").forEach((tautan) => {
  tautan.addEventListener("click", () => aturMenu(false));
});

/* ---------- Data produk ---------- */

const produk = new Map();

document.querySelectorAll(".tambah").forEach((tombol) => {
  produk.set(tombol.dataset.id, {
    nama: tombol.dataset.nama,
    harga: Number(tombol.dataset.harga),
  });
});

/* ---------- Keranjang ---------- */

const keranjang = new Map();

const daftarKeranjang = document.querySelector("#daftar-keranjang");
const pesanKeranjangKosong = document.querySelector("#keranjang-kosong");
const jumlahKeranjang = document.querySelector("#jumlah-keranjang");
const totalKeranjang = document.querySelector("#total");
const lencanaKeranjang = document.querySelector("#lencana-keranjang");
const tombolKosongkan = document.querySelector("#kosongkan-keranjang");
const tombolSimpan = document.querySelector("#simpan-pesanan");
const statusKeranjang = document.querySelector("#status-keranjang");
const dialogKosongkan = document.querySelector("#dialog-kosongkan");

function formatRupiah(nilai) {
  return "Rp" + nilai.toLocaleString("id-ID");
}

function buatItemKeranjang(id, jumlah) {
  const infoProduk = produk.get(id);
  const item = document.createElement("li");
  item.className = "item-keranjang";

  const info = document.createElement("div");
  info.className = "item-info";

  const nama = document.createElement("strong");
  nama.textContent = infoProduk.nama;

  const harga = document.createElement("span");
  harga.textContent = formatRupiah(infoProduk.harga * jumlah);

  info.append(nama, harga);

  const kontrol = document.createElement("div");
  kontrol.className = "item-kontrol";

  const kurangi = document.createElement("button");
  kurangi.type = "button";
  kurangi.className = "tombol-ikon";
  kurangi.textContent = "−";
  kurangi.setAttribute(
    "aria-label",
    jumlah === 1
      ? `Hapus ${infoProduk.nama} dari keranjang`
      : `Kurangi ${infoProduk.nama}`
  );
  kurangi.addEventListener("click", () => ubahJumlah(id, -1));

  const jumlahTeks = document.createElement("span");
  jumlahTeks.className = "item-jumlah";
  jumlahTeks.textContent = jumlah;

  const tambah = document.createElement("button");
  tambah.type = "button";
  tambah.className = "tombol-ikon";
  tambah.textContent = "+";
  tambah.setAttribute("aria-label", `Tambah ${infoProduk.nama}`);
  tambah.addEventListener("click", () => ubahJumlah(id, 1));

  kontrol.append(kurangi, jumlahTeks, tambah);
  item.append(info, kontrol);

  return item;
}

function renderKeranjang() {
  const sedangMenyimpan = tombolSimpan.getAttribute("aria-busy") === "true";
  let jumlahItem = 0;
  let totalHarga = 0;

  daftarKeranjang.replaceChildren();

  for (const [id, jumlah] of keranjang) {
    const infoProduk = produk.get(id);

    if (!infoProduk || jumlah <= 0) {
      continue;
    }

    jumlahItem += jumlah;
    totalHarga += infoProduk.harga * jumlah;
    daftarKeranjang.append(buatItemKeranjang(id, jumlah));
  }

  const adaItem = jumlahItem > 0;

  jumlahKeranjang.textContent = jumlahItem;
  totalKeranjang.textContent = formatRupiah(totalHarga);
  pesanKeranjangKosong.hidden = adaItem;
  daftarKeranjang.hidden = !adaItem;
  lencanaKeranjang.hidden = !adaItem;
  lencanaKeranjang.textContent = jumlahItem;
  tombolKosongkan.disabled = !adaItem || sedangMenyimpan;

  if (!sedangMenyimpan) {
    tombolSimpan.disabled = !adaItem;
    tombolSimpan.textContent = "Simpan pesanan";
  }
}

function ubahJumlah(id, perubahan) {
  const jumlahBaru = (keranjang.get(id) || 0) + perubahan;

  if (jumlahBaru <= 0) {
    keranjang.delete(id);
    statusKeranjang.textContent = `${produk.get(id).nama} dihapus dari keranjang.`;
  } else {
    keranjang.set(id, jumlahBaru);
  }

  renderKeranjang();
}

document.querySelectorAll(".tambah").forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const id = tombol.dataset.id;
    keranjang.set(id, (keranjang.get(id) || 0) + 1);
    renderKeranjang();
    statusKeranjang.textContent = `${tombol.dataset.nama} ditambahkan ke keranjang.`;
  });
});

/* ---------- Dialog kosongkan keranjang ---------- */

tombolKosongkan.addEventListener("click", () => {
  if (!dialogKosongkan.open) {
    dialogKosongkan.showModal();
  }
});

document.querySelector("#tidak").addEventListener("click", () => {
  dialogKosongkan.close();
});

document.querySelector("#ya").addEventListener("click", () => {
  keranjang.clear();
  renderKeranjang();
  dialogKosongkan.close();
  statusKeranjang.textContent = "Keranjang dikosongkan.";
});

/* ---------- Simpan pesanan dengan status memuat ---------- */

tombolSimpan.addEventListener("click", () => {
  if (
    tombolSimpan.disabled ||
    tombolSimpan.getAttribute("aria-busy") === "true"
  ) {
    return;
  }

  tombolSimpan.disabled = true;
  tombolSimpan.setAttribute("aria-busy", "true");
  tombolSimpan.textContent = "Menyimpan…";
  statusKeranjang.textContent = "Menyimpan pesanan…";
  tombolKosongkan.disabled = true;

  window.setTimeout(() => {
    tombolSimpan.setAttribute("aria-busy", "false");
    tombolSimpan.textContent = "Tersimpan ✓";
    statusKeranjang.textContent =
      "Pesanan berhasil disimpan. Tunjukkan nomor pesanan ke kasir.";
    tombolKosongkan.disabled = keranjang.size === 0;
  }, 800);
});

/* ---------- Validasi form masuk ---------- */

const formMasuk = document.querySelector("#form-masuk");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const galatEmail = document.querySelector("#galat-email");
const galatPassword = document.querySelector("#galat-password");
const statusMasuk = document.querySelector("#status-masuk");

function tampilkanGalat(input, elemenGalat, pesan) {
  elemenGalat.textContent = pesan;
  input.setAttribute("aria-invalid", "true");
}

function hapusGalat(input, elemenGalat) {
  elemenGalat.textContent = "";
  input.removeAttribute("aria-invalid");
}

formMasuk.addEventListener("submit", (event) => {
  event.preventDefault();

  hapusGalat(inputEmail, galatEmail);
  hapusGalat(inputPassword, galatPassword);
  statusMasuk.textContent = "";

  let salahPertama = null;

  if (inputEmail.validity.valueMissing) {
    tampilkanGalat(inputEmail, galatEmail, "Email wajib diisi.");
    salahPertama = inputEmail;
  } else if (inputEmail.validity.typeMismatch) {
    tampilkanGalat(inputEmail, galatEmail, "Format email belum benar.");
    salahPertama = inputEmail;
  }

  if (inputPassword.validity.valueMissing) {
    tampilkanGalat(inputPassword, galatPassword, "Password wajib diisi.");
    if (!salahPertama) {
      salahPertama = inputPassword;
    }
  } else if (inputPassword.value.length < inputPassword.minLength) {
    tampilkanGalat(
      inputPassword,
      galatPassword,
      "Password minimal 8 karakter."
    );
    if (!salahPertama) {
      salahPertama = inputPassword;
    }
  }

  if (salahPertama) {
    salahPertama.focus();
    return;
  }

  statusMasuk.textContent = "Berhasil masuk. Selamat datang!";
  formMasuk.reset();
});

[inputEmail, inputPassword].forEach((input) => {
  input.addEventListener("input", () => {
    if (input === inputEmail) {
      hapusGalat(inputEmail, galatEmail);
    } else {
      hapusGalat(inputPassword, galatPassword);
    }
    statusMasuk.textContent = "";
  });
});

/* ---------- Render awal ---------- */

renderKeranjang();
