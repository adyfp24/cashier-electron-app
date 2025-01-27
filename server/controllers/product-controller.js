const productService = require('../services/product-service');
const { successResponse, clientErrorResponse, errorResponse,
    createdResponse, notFoundResponse } = require('../middlewares/response');

const getAllProduct = async (req, res) => {
    try {
        const { page, limit } = req.pagination;
        const allProducts = await productService.getAllProduct(page, limit);
        if (allProducts == 0) {
            return notFoundResponse(res, "data produk tidak tersedia")
        }
        return successResponse(res, allProducts, "data produk berhasil didapat");
    } catch (error) {
        return errorResponse(res, error);
    }
}

const createProduct = async (req, res) => {
    try {
        const image = req.file.filename;
        const {
            nama,
            stok,
            harga,
            merk,
            kode,
            hargaBeli,
            jenis_produk,
        } = req.body;

        const product = {
            nama,
            stok: parseInt(stok, 10),
            harga: parseInt(harga, 10),
            hargaBeli: parseInt(hargaBeli, 10),
            merk,
            kode,
            jenisProdukId: parseInt(jenis_produk, 10),
            gambar: '/products/' + image
        }
        const newProduct = await productService.createProduct(product);
        if (newProduct) {
            return createdResponse(res, newProduct, "produk berhasil ditambahkan");
        } else {
            return clientErrorResponse(res, "produk gagal ditambahkan")
        }
    } catch (error) {
        return errorResponse(res, error);
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await productService.getProductById(productId);
        if (product != 0) {
            return successResponse(res, product, "data produk dengan id tersebut tersedia")
        } else {
            return notFoundResponse(res, "data produk dengan id tersebut tidak tersedia");
        }
    } catch (error) {
        return errorResponse(res, error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId);
        if (deletedProduct) {
            return successResponse(res, "data produk berhasil dihapus")
        } else {
            return notFoundResponse(res, "data produk gagal dihapus karena id tidak valid");
        };
    } catch (error) {
        return errorResponse(res, error);
    }
}

const updateProduct = async (req, res) => {
    try {
        const {
            nama,
            stok,
            harga,
            merk,
            kode,
            hargaBeli,
            jenis_produk,
        } = req.body;

        const product = {
            nama,
            stok: parseInt(stok, 10),
            harga: parseInt(harga, 10),
            hargaBeli: parseInt(hargaBeli, 10),
            merk,
            kode,
            jenisProdukId: parseInt(jenis_produk, 10)
        }

        const productId = req.params.id;
        const updatedProduct = await productService.updateProduct(productId, product);
        if (updatedProduct) {
            return successResponse(res, updatedProduct, "data produk berhasil diperbarui")
        } else {
            return notFoundResponse(res, "data produk gagal diperbarui karena id tidak valid");
        };
    } catch (error) {
        return errorResponse(res, error);
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    deleteProduct,
    updateProduct
}


