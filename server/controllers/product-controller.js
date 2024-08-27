const productService = require('../services/product-service');

const getAllProduct = (req, res) => {
    try {
        const allProductDummy = [
            'pelumas',
            'mesin 250cc',
            'lampu',
            'velg',
            'spion'
        ];
        res.status(200).json({
            'status' : 'success',
            'message' : 'succes fetch all products',
            'data' : allProductDummy
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getAllProduct
};