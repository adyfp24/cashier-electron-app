const { PrismaClient } = require('@prisma/client');
const { data } = require('autoprefixer');
const prisma = new PrismaClient();

const createProduct = async (product) => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                nama: product.nama,
                stok: product.stok,
                harga: product.harga,
                jenisProdukId: product.jenisProdukId,
                gambar: product.gambar,
                kode: product.kode,
                hargaBeli: product.hargaBeli,
                merk: product.merk
            }
        });
        return newProduct;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

const getAllProduct = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const allProducts = await prisma.product.findMany(
            {
                skip: offset,
                take: limit,
                include: {
                    jenisProduk: true,             
                }
            }
        );
        const totalProducts = await prisma.product.count();
        const totalPage = Math.ceil(totalProducts / limit);

        return {
            products: allProducts,
            pagination: {
                page,
                limit,
                total: totalProducts,
                totalPage,
            },
        };
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

const getProductById = async (productId) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(productId) },
            include:{
                jenisProduk: true
            }
        });
        return product;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

const deleteProduct = async (productId) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: { id: parseInt(productId) }
        });
        return deletedProduct;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

const updateProduct = async (productId, productUpdate) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(productId) },
            data: {
                nama: productUpdate.nama,
                stok: productUpdate.stok,
                harga: productUpdate.harga,
                hargaBeli: productUpdate.hargaBeli,
                merk: productUpdate.merk,
                kode: productUpdate.kode,
                jenisProdukId: productUpdate.jenisProdukId,
                updatedAt: new Date()
              }
        });
        console.log('Updated product from Prisma:', updatedProduct);
        return updatedProduct;
    } catch (error) {
        throw new Error('internal server error : ' + error.message)
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    deleteProduct,
    updateProduct
}