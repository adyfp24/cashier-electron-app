const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

async function seed(){
    await prisma.product.createMany({
        data: [
            {
                'nama': 'product A',
                'harga': 5000,
                'hargaBeli': 50000,
                'kode': '32FF1Q',
                'merk': 'Merk A',
                'stok' : 5,
                'jenisProdukId' : 1,
                'gambar': '/products/product_a.png'
            },
            {
                'nama': 'product B',
                'harga': 10000,
                'hargaBeli': 50000,
                'kode': '32FF1Q',
                'merk': 'Merk B',
                'stok' : 3,
                'jenisProdukId' : 2,
                'gambar': '/products/product_b.png'
            },
            {
                'nama': 'product C',
                'harga': 7000,
                'hargaBeli': 50000,
                'kode': '32FF1Q',
                'merk': 'Merk C',
                'stok' : 10,
                'jenisProdukId' : 3,
                'gambar': '/products/product_c.png'
            }
        ]
    });
}

module.exports = seed;