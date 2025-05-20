# Proyek SBD

## Penjelasan

Kami membuat proyek game sederhana yang diimplementasikan menggunakan JavaScript. Game kami terbagi menjadi bagian, yaitu backend dan frontend. Frontend berinteraksi langsung dengan player dari game. Ia menampilkan fungsionalitas dari game, data dari database, dan juga melihat/menambahkan/mengurangi data dari database

## Dokumentasi Page

Terdapat berbagai page yang akan digunakan, yaitu

### Game

- **Home.jsx**
  Ini merupakan landing page ketika pengguna masuk ke web. Di sini, terdapat pilihan play, login, dan register. Jika belom ada user yang register, maka ia tidak bisa memainkan game

- **Login.jsx**
  Page ini berfungsi untuk mencari User berdasarkan kredensial yang diberikan. Jika berhasil, maka player bisa memainkan game

- **Register.jsx**
  Page ini berfungsi untuk membuat User baru sesuai dengan parameter-parameter yang dibutuhkan. Kemudian, player bisa memasukkan kredensial yang baru dibuat ketika login untuk mulai bermain

- **World.jsx**
  Page ini merupakan laman utama bagi game. Terdapat beberapa jenis biome pada world yang hanya bisa diakses pada level-level tertentu.

- **RenderBiome.jsx, Forest.jsx, Jungle.jsx, Corruption.jsx, Crimsonjsx, dan Hallow.jsx**
  Ini merupakan biome-biome yang ada pada world. Untuk mempermudah proses, dibuat wrapper berupa RenderBiome yang bisa menampilkan biome yang berbeda.

- **Travel.jsx**
  Page ini bertindak seperti 'map', dimana User bisa navigasi ke biome lain yang bisa mereka akses sesuai level mereka

- **Duel.jsx, DuelDungeon.jsx**
  Page Duel.jsx itu sendiri merupakan page dimana Duel terjadi. Enemy pada Duel ini akan diambil secara otomatis berdasarkan biome tempat User berada. DuelDungeon.jsx merupakan sebuah component yang mempermudah penempatan icon yang bisa berinteaksi dengan user untuk memulai duel.

- **Inventory.jsx**
  Page ini menampilkan semua Inventory yang dimiliki oleh User tersebut. User juga memiliki opsi untuk menghapus Item pada page ini.

- **Stats.jsx**
  Page ini menampilkan atribut-atribut user, misalnya nama, level, xp, dan attribute.

### Admin

- **Admin.jsx**
  Page utama bagi admin. Di sini akan ditampilkan semua entry dari semua collection yang ada

- **Navbar.ksx**
  Component Navbar untuk navigasi ke beberapa page selanjutnya ini

- **Item.jsx, ItemCreate.jsx, ItemDelete.jsx**
  Page yang menampilkan opsi untuk memasukkan/menghapus data yang berhubungan dengan Item.

- **Enemy.jsx, EnemyCreate.jsx, EnemyDelete.jsx**
  Page yang menampilkan opsi untuk memasukkan/menghapus data yang berhubungan dengan Enemy.

- **Inv.jsx, InvAdd.jsx, InvDelete.jsx**
  Page yang menampilkan opsi untuk memasukkan/menghapus data yang berhubungan dengan Inventory.

- **Loot.jsx, LootCreate.jsx, LootDelete.jsx**
  Page yang menampilkan opsi untuk memasukkan/menghapus data yang berhubungan dengan Delete.
