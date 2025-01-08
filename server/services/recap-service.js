const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllRecapData = async () => {
    try {
        const totalTransaction = await prisma.transaction.count();
        const totalProduct = await prisma.product.aggregate({
            _sum: {
                stok: true
            }
        });
        const totalProductSold = await prisma.detailTransaction.aggregate({
            _sum: {
                quantity: true
            }
        });
        const totalIncome = await prisma.payment.aggregate({
            _sum: {
                total: true
            }
        })

        return {
            totalTransaction: totalTransaction,
            totalProduct: totalProduct._sum.stok,
            totalProductSold: totalProductSold._sum.quantity,
            totalIncome: totalIncome._sum.total
        };
    } catch (e) {
        throw new Error(e.message)
    }
};

module.exports = {
    getAllRecapData
}
