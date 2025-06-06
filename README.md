# Proyek SBD

## Anggota
- Yehezkiel Jonatan - 2006520235 (Frontend Developer)
- Muhammad Hafiz Widyawan - 2006468762 (Backend Developer)
- Darmawan Hanif - 2206829175 (Backend Developer)
- Nahl Syareza Rahidra - 2206830340 (Frontend Developer + Integration)

## Penjelasan

Kami membuat proyek game sederhana yang diimplementasikan menggunakan JavaScript. Game kami terbagi menjadi bagian, yaitu backend dan frontend. Frontend berinteraksi langsung dengan player dari game. Ia menampilkan fungsionalitas dari game, data dari database, dan juga melihat/menambahkan/mengurangi data dari database

## Dokumentasi Page

Terdapat berbagai page yang akan digunakan, yaitu

### Game

- **Home.jsx** </br>
  Ini merupakan landing page ketika pengguna masuk ke web. Di sini, terdapat pilihan play, login, dan register. Jika belom ada user yang register, maka ia tidak bisa memainkan game

- **Login.jsx** </br>
  Page ini berfungsi untuk mencari User berdasarkan kredensial yang diberikan. Jika berhasil, maka player bisa memainkan game

- **Register.jsx** </br>
  Page ini berfungsi untuk membuat User baru sesuai dengan parameter-parameter yang dibutuhkan. Kemudian, player bisa memasukkan kredensial yang baru dibuat ketika login untuk mulai bermain

- **World.jsx**</br>
  Page ini merupakan laman utama bagi game. Terdapat beberapa jenis biome pada world yang hanya bisa diakses pada level-level tertentu.

- **RenderBiome.jsx, Forest.jsx, Jungle.jsx, Corruption.jsx, Crimsonjsx, dan Hallow.jsx**</br>
  Ini merupakan biome-biome yang ada pada world. Untuk mempermudah proses, dibuat wrapper berupa RenderBiome yang bisa menampilkan biome yang berbeda.

- **Travel.jsx**</br>
  Page ini bertindak seperti 'map', dimana User bisa navigasi ke biome lain yang bisa mereka akses sesuai level mereka

- **Duel.jsx, DuelDungeon.jsx**</br>
  Page Duel.jsx itu sendiri merupakan page dimana Duel terjadi. Enemy pada Duel ini akan diambil secara otomatis berdasarkan biome tempat User berada. DuelDungeon.jsx merupakan sebuah component yang mempermudah penempatan icon yang bisa berinteaksi dengan user untuk memulai duel.

- **Inventory.jsx**</br>
  Page ini menampilkan semua Inventory yang dimiliki oleh User tersebut. User juga memiliki opsi untuk menghapus Item pada page ini.

- **Stats.jsx**</br>
  Page ini menampilkan atribut-atribut user, misalnya nama, level, xp, dan attribute.

### Admin

- **Admin.jsx**</br>
  Page utama bagi admin. Di sini akan ditampilkan semua entry dari semua collection yang ada

- **Navbar.ksx**</br>
  Component Navbar untuk navigasi ke beberapa page selanjutnya ini

- **Item.jsx, ItemCreate.jsx, ItemDelete.jsx**</br>
  Page yang menampilkan opsi untuk memasukkan/menghapus data yang berhubungan dengan Item.

- **Enemy.jsx, EnemyCreate.jsx, EnemyDelete.jsx**</br>
  Page yang menampilkan opsi untuk memasukkan/menghapus data yang berhubungan dengan Enemy.

- **Inv.jsx, InvAdd.jsx, InvDelete.jsx**</br>
  Page yang menampilkan opsi untuk memasukkan/menghapus data yang berhubungan dengan Inventory.

- **Loot.jsx, LootCreate.jsx, LootDelete.jsx**</br>
  Page yang menampilkan opsi untuk memasukkan/menghapus data yang berhubungan dengan Delete.

## Walkthrough Aplikasi

Ketika mengakses aplikasi frontend ini, user akan membuka halaman /home. Di dalam /home terdapat tiga pilihan yaitu Play, Login, dan Register. Jika belum melakukan login, maka user tidak bisa memilih option Play. User bisa login dengan cara membuat akun dengan register atau langsung login jika sudah memiliki akun.</br></br>
Di dalam game, user bisa mengakses NPC terdekat untuk mengambil starter item. Setelah itu, dia bisa masuk ke dungeon dengan cara menekan icon di kanan. Sistem combat dari game ini adalah turn based, dan setiap aksi penyerangan memiliki cost. Selain menyerang, user bisa mengonsumsi potion atau menggunakan armor untuk meningkatkan defense. Jika user berhasil mengalahkan musuh, maka ia akan diberikan reward secara random. Jika kalah, maka ia tidak mendapatkan reward. Selain reward, user juga mendapatkan XP apabila ia memenangkan pertarungan.</br></br>
Seiring dengan meningkatknya level user, ia mampu mengakses area-area lainnya sesuai dengan ketentuan level area tersebut. Area baru memiliki musuh baru dan juga reward baru.</br></br>

## Dokumentasi Docker

Docker Hub: https://hub.docker.com/r/nahlsyareza/fe-mc

### Requirement

1. Pastikan Docker sudah terinstall

2. Instalasi Docker bisa diverifikasi dengan command docker version di command prompt

3. Pastikan juga kalian sudah menjalankan Docker Desktop

### Menjalankan Docker

1. Melakukan pull untuk ketiga image ini:

```
docker pull nahlsyareza/be-mc:latest
docker pull nahlsyareza/fe-mc:latest
docker pull mongo
```

2. Membuat file docker compose dengan isi berikut:

```
version: "3.8"
services:
  frontend:
    image: nahlsyareza/fe-mc
    container_name: fe-mc
    ports:
      - 4002:4002
    networks:
      - mc-network
  backend:
    image: nahlsyareza/be-mc
    container_name: be-mc
    ports:
      - 4001:4001
    networks:
      - mc-network
  database:
    image: mongo
    container_name: mongodb
    ports:
      - 27017:27017
    networks:
      - mc-network

networks:
  mc-network:
    external: true
```

3. Jalankan
```
docker compose up
```

4. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass) dan buat koneksi baru dengan connection string ini

```
mongodb://localhost:27017
```

5. Backend bisa diakses pada [http://localhost:4001](http://localhost:4001). Frontend dapat diakses pada [http://localhost:4002](http://localhost:4002)

