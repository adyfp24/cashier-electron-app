const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTransaction = async () => {
    try {
        const allTransaction = await prisma.transaction.findMany({
            include:{
                details: {
                    include:{
                        product: true
                    }
                }
            }
        });
        return allTransaction;
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