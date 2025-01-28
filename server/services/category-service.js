const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (data) => {
    try {
        console.log('Data yang diterima di service:', data); // Debugging
        const newCategory = await prisma.category.create({
            data: {
                name: data, // Pastikan data adalah string
            },
        });
        return newCategory;
    } catch (error) {
        console.error('Error di service:', error.message);
        throw new Error('internal server error: ' + error.message);
    }
};

const getAllCategory = async () => {
    try {
        const allCategory = await prisma.category.findMany();
        return allCategory;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

module.exports = {
    createCategory,
    getAllCategory
}