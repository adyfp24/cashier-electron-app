/*
  Warnings:

  - Added the required column `hargaBeli` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "harga" REAL NOT NULL,
    "hargaBeli" REAL NOT NULL,
    "jenis_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "products_jenis_id_fkey" FOREIGN KEY ("jenis_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_products" ("createdAt", "gambar", "harga", "id", "jenis_id", "nama", "stok", "updatedAt") SELECT "createdAt", "gambar", "harga", "id", "jenis_id", "nama", "stok", "updatedAt" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
