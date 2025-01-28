const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateSetting = async (data) => {
    try {
        const newSetting = await prisma.setting.create({
            data: {
                namaAplikasi: data.nama,
                logoAplikasi: data.logo
            },
        });
        return newSetting;
    } catch (error) {
        console.error('Error di service:', error.message);
        throw new Error('internal server error: ' + error.message);
    }
};

const getAllSetting = async () => {
    try {
        const allSetting = await prisma.setting.findMany();
        return allSetting;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
}

module.exports = {
    updateSetting,
    getAllSetting
}