const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTransaction = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const allTransaction = await prisma.transaction.findMany({
            skip: offset,
            take: limit,
            include:{
                details: {
                    include:{
                        product: true
                    }
                }
            }
        });
        const totalTransaction = await prisma.transaction.count();
        const totalPage = Math.ceil(totalTransaction / limit);
        return {
            transactions: allTransaction,
            pagination: {
                page,
                limit,
                total: totalTransaction,
                totalPage
            }
        };
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
};

const getTransactionById = async (id) => {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id: parseInt(id) },
            include: {
                details: {
                    include: {
                        product: true
                    }
                }
            }
        });
        
        if (!transaction) {
            return null;
        }
        
        return transaction
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
};

module.exports = {
    getAllTransaction,
    getTransactionById
}