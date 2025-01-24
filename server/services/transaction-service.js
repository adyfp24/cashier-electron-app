const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const excelJs = require('exceljs');

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

const exportTransactionHistory = async () => {
    try {
        const transactions = await prisma.transaction.findMany({
            include: {
                details: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet('Transaction History');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Tanggal', key: 'tanggal', width: 20 },
            { header: 'Total', key: 'total', width: 20 },
            { header: 'Detail', key: 'detail', width: 60 },
        ];

        transactions.forEach((transaction) => {
            transaction.details.forEach((detail, index) => {
                worksheet.addRow({
                    id: index === 0 ? transaction.id : '', 
                    tanggal: index === 0 ? transaction.tanggal.toISOString().split('T')[0] : '', 
                    total: index === 0 ? transaction.total : '', 
                    detail: `Nama: ${detail.product.nama}, Kuantitas: ${detail.quantity}, Subtotal: ${detail.subtotal}`, 
                });
            });
        });

        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFF00' },
            };
            cell.font = { bold: true }; 
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    } catch (error) {
        throw new Error('internal server error :' + error.message);
    }
};

module.exports = {
    getAllTransaction,
    getTransactionById,
    exportTransactionHistory
}