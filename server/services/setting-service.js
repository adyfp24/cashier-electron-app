const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateSettingName = async (updatedData) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(updatedData).filter(([_, value]) => value !== undefined)
        );

        const newSetting = await prisma.setting.update({
            where: {
                id: 1,
            },
            data: filteredData,
        });

        return newSetting;
    } catch (error) {
        console.error('Error di service:', error.message);
        throw new Error('internal server error: ' + error.message);
    }
};

const updateSettingLogo = async (updatedData) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(updatedData).filter(([_, value]) => value !== undefined)
        );

        const newSetting = await prisma.setting.update({
            where: {
                id: 1,
            },
            data: filteredData,
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
    updateSettingName,
    updateSettingLogo,
    getAllSetting
}