const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

async function seed(){
    await prisma.product.createMany({
        data: [
            {
                'nama': 'product A',
                'harga': 5000,
                'stok' : 5,
                'jenisProdukId' : 1,
                'gambar': '/products/product_a.png'
            },
            {
                'nama': 'product B',
                'harga': 10000,
                'stok' : 3,
                'jenisProdukId' : 2,
                'gambar': '/products/product_b.png'
            },
            {
                'nama': 'product C',
                'harga': 7000,
                'stok' : 10,
                'jenisProdukId' : 3,
                'gambar': '/products/product_c.png'
            }
        ]
    });
}

module.exports = seed;