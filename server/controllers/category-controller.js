const { successResponse, errorResponse, notFoundResponse } = require('../middlewares/response');
const categoryService = require('../services/category-service');

const getAllCategory = async (req, res) => {
    try {
        const allCategory = await categoryService.getAllCategory();
        if(allCategory.length == 0){
            return notFoundResponse(res, "data category tidak tersedia")
        }
        return successResponse(res, allCategory, 'data category berhasil didapat');
    } catch (error) {
        return errorResponse(res, error);
    }
}

const createCategory = async (req, res) => {
    try {
        const { nama_kategori } = req.body;
        console.log('Nama kategori dari req.body:', nama_kategori); // Debugging
        const data = nama_kategori;
        console.log('Data yang diteruskan ke service:', data); // Debugging
        const newCategory = await categoryService.createCategory(data);
        return successResponse(res, newCategory, 'kategori baru berhasil dibuat');
    } catch (error) {
        console.error('Error di controller:', error.message);
        return errorResponse(res, error);
    }
};

module.exports = {
    getAllCategory,
    createCategory
}