const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { format } = require('date-fns');

const db = require('../utils/db-conn');

const createOrder = async (products) => {
    return new Promise((resolve, reject) => {
        // Use transaction to ensure data integrity
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');

            // Create transaction first
            createTransaction()
                .then(transaction => {
                    let total = 0;
                    let processedItems = 0;
                    
                    // Process each product
                    products.forEach(item => {
                        getProductById(item.productId)
                            .then(product => {
                                if (!product || product.stok < item.quantity) {
                                    db.run('ROLLBACK');
                                    reject(new Error(`Product with id ${item.productId} is out of stock or not available`));
                                    return;
                                }
                                
                                // Process the product
                                processProduct(transaction.id, product, item.quantity)
                                    .then(subtotal => {
                                        // Update product stock
                                        updateProductStock(product.id, product.stok - item.quantity)
                                            .then(() => {
                                                total += subtotal;
                                                processedItems++;
                                                
                                                // If all items processed, update transaction total
                                                if (processedItems === products.length) {
                                                    updateTransactionTotal(transaction.id, total)
                                                        .then(() => {
                                                            // Get complete transaction details
                                                            getTransactionDetails(transaction.id)
                                                                .then(transactionWithDetails => {
                                                                    db.run('COMMIT');
                                                                    resolve(formatTransactionResponse(transactionWithDetails));
                                                                })
                                                                .catch(error => {
                                                                    db.run('ROLLBACK');
                                                                    reject(new Error('Error getting transaction details: ' + error.message));
                                                                });
                                                        })
                                                        .catch(error => {
                                                            db.run('ROLLBACK');
                                                            reject(new Error('Error updating transaction total: ' + error.message));
                                                        });
                                                }
                                            })
                                            .catch(error => {
                                                db.run('ROLLBACK');
                                                reject(new Error('Error updating product stock: ' + error.message));
                                            });
                                    })
                                    .catch(error => {
                                        db.run('ROLLBACK');
                                        reject(new Error('Error processing product: ' + error.message));
                                    });
                            })
                            .catch(error => {
                                db.run('ROLLBACK');
                                reject(new Error('Error getting product: ' + error.message));
                            });
                    });
                })
                .catch(error => {
                    db.run('ROLLBACK');
                    reject(new Error('Error creating transaction: ' + error.message));
                });
        });
    }).catch(error => {
        throw new Error('Internal server error: ' + error.message);
    });
};

const createTransaction = () => {
    return new Promise((resolve, reject) => {
        const now = new Date().toISOString();
        db.run(
            'INSERT INTO transactions (tanggal, total) VALUES (?, ?)',
            [now, 0],
            function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ id: this.lastID, tanggal: now, total: 0 });
            }
        );
    });
};

const getProductById = (productId) => {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM products WHERE id = ?',
            [productId],
            (err, product) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(product);
            }
        );
    });
};

const processProduct = (transactionId, product, quantity) => {
    return new Promise((resolve, reject) => {
        const subtotal = quantity * product.harga;
        db.run(
            'INSERT INTO detail_transactions (transaction_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)',
            [transactionId, product.id, quantity, subtotal],
            function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(subtotal);
            }
        );
    });
};

const updateProductStock = (productId, newStock) => {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE products SET stok = ? WHERE id = ?',
            [newStock, productId],
            function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            }
        );
    });
};

const updateTransactionTotal = (transactionId, total) => {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE transactions SET total = ? WHERE id = ?',
            [total, transactionId],
            function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            }
        );
    });
};

const getTransactionDetails = (transactionId) => {
    return new Promise((resolve, reject) => {
        // First get the transaction
        db.get(
            'SELECT * FROM transactions WHERE id = ?',
            [transactionId],
            (err, transaction) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (!transaction) {
                    reject(new Error(`Transaction with id ${transactionId} not found`));
                    return;
                }

                // Get all detail transactions with product info
                db.all(
                    `SELECT dt.*, p.nama, p.harga 
                     FROM detail_transactions dt
                     JOIN products p ON dt.product_id = p.id
                     WHERE dt.transaction_id = ?`,
                    [transactionId],
                    (err, details) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        
                        // Format details to match the expected structure
                        transaction.details = details.map(detail => ({
                            id: detail.id,
                            transactionId: detail.transaction_id,
                            productId: detail.product_id,
                            quantity: detail.quantity,
                            subtotal: detail.subtotal,
                            product: {
                                id: detail.product_id,
                                nama: detail.nama,
                                harga: detail.harga
                            }
                        }));
                        
                        resolve(transaction);
                    }
                );
            }
        );
    });
};

const formatTransactionResponse = (transaction) => {
    const transactionDetails = transaction.details.map(detail => ({
        produk: detail.product.nama,
        jumlahProduk: detail.quantity,
        harga: detail.product.harga
    }));

    return {
        id: transaction.id,
        tanggal: transaction.tanggal,
        total: transaction.total,
        detailTransaksi: transactionDetails
    };
};

// Payment processing function - similar structure to the rest
const processPayment = (paymentData) => {
    return new Promise((resolve, reject) => {
        // Get transaction by ID to verify it exists
        db.get(
            'SELECT * FROM transactions WHERE id = ?',
            [paymentData.id],
            (err, transaction) => {
                if (err) {
                    reject(new Error('Database error: ' + err.message));
                    return;
                }

                if (!transaction) {
                    reject(new Error(`Transaction with id ${paymentData.id} not found`));
                    return;
                }

                // Create payment record
                db.run(
                    'INSERT INTO payments (total, uang_masuk, kembali, transaction_id) VALUES (?, ?, ?, ?)',
                    [
                        paymentData.total,
                        paymentData.uangMasuk,
                        paymentData.kembali,
                        paymentData.id
                    ],
                    function(err) {
                        if (err) {
                            reject(new Error('Error creating payment: ' + err.message));
                            return;
                        }
                        
                        // Get complete transaction with payment details
                        getTransactionWithPayment(paymentData.id)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(error => {
                                reject(new Error('Error getting transaction with payment: ' + error.message));
                            });
                    }
                );
            }
        );
    });
};

const getTransactionWithPayment = (transactionId) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT t.*, p.total as payment_total, p.uang_masuk, p.kembali 
             FROM transactions t
             JOIN payments p ON t.id = p.transaction_id
             WHERE t.id = ?`,
            [transactionId],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (!result) {
                    reject(new Error(`Transaction with payment for id ${transactionId} not found`));
                    return;
                }
                
                resolve({
                    id: result.id,
                    tanggal: result.tanggal,
                    total: result.total,
                    payment: {
                        total: result.payment_total,
                        uangMasuk: result.uang_masuk,
                        kembali: result.kembali
                    }
                });
            }
        );
    });
};

// const createOrder = async (products) => {
//     try {
//         const newTransaction = await prisma.$transaction(async (prisma) => {
//             const transaction = await createTransaction(prisma);
//             let total = 0;

//             for (const item of products) {
//                 const product = await getProductById(prisma, item.productId);
//                 if (!product || product.stok < item.quantity) {
//                     throw new Error(`Product with id ${item.productId} is out of stock or not available`);
//                 }
//                 const subtotal = await processProduct(prisma, transaction.id, product, item.quantity);
//                 await updateProductStock(prisma, product.id, product.stok - item.quantity);
//                 total += subtotal;
//             }

//             await updateTransactionTotal(prisma, transaction.id, total);
//             return transaction;
//         });

//         const transactionWithDetails = await getTransactionDetails(prisma, newTransaction.id);

//         return formatTransactionResponse(transactionWithDetails);
//     } catch (error) {
//         throw new Error('internal server error :' + error.message);
//     }
// };

// const createTransaction = async (prisma) => {
//     return prisma.transaction.create({
//         data: {
//             tanggal: new Date(),
//             total: 0
//         }
//     });
// };

// const getProductById = async (prisma, productId) => {
//     return prisma.product.findUnique({
//         where: { id: productId },
//     });
// };

// const processProduct = async (prisma, transactionId, product, quantity) => {
//     const subtotal = quantity * product.harga;
//     await prisma.detailTransaction.create({
//         data: {
//             transactionId: transactionId,
//             productId: product.id,
//             quantity: quantity,
//             subtotal: subtotal
//         }
//     });
//     return subtotal;
// };

// const updateProductStock = async (prisma, productId, newStock) => {
//     await prisma.product.update({
//         where: { id: productId },
//         data: { stok: newStock }
//     });
// };

// const updateTransactionTotal = async (prisma, transactionId, total) => {
//     await prisma.transaction.update({
//         where: { id: transactionId },
//         data: { total: total },
//     });
// };

// const getTransactionDetails = async (prisma, transactionId) => {
//     return prisma.transaction.findUnique({
//         where: { id: transactionId },
//         include: {
//             details: {
//                 include: {
//                     product: true
//                 }
//             }
//         }
//     });
// };

// const formatTransactionResponse = (transaction) => {
//     const transactionDetails = transaction.details.map(detail => ({
//         produk: detail.product.nama,
//         jumlahProduk: detail.quantity,
//         harga: detail.product.harga
//     }));

//     return {
//         id: transaction.id,
//         tanggal: transaction.tanggal,
//         total: transaction.total,
//         detailTransaksi: transactionDetails
//     };
// };

const exportStruck = async (transactionId, uangMasuk) => {
    // try {
    //     const transaction = await prisma.transaction.findUnique({
    //         where: { id: parseInt(transactionId) },
    //         include: {
    //             details: {
    //                 include: {
    //                     product: true
    //                 }
    //             }
    //         }
    //     });

    //     if (!transaction) {
    //         throw new Error('Transaction not found');
    //     }

    //     const payment = await prisma.payment.create({
    //         data: {
    //             total: transaction.total,
    //             uangMasuk: parseInt(uangMasuk),
    //             kembali: uangMasuk - transaction.total,
    //             transactionId: transaction.id
    //         }
    //     });

    //     const structData = {
    //         transaction,
    //         payment
    //     };

    //     const pdfBytes = await generateStructPDF(structData);
    //     return pdfBytes;
    // } catch (error) {
    //     throw new Error(error.message);
    // }
};

const generateStructPDF = async (structData) => {
    const pdfDoc = await PDFDocument.create();

    const pageWidth = 226.77;
    const minHeight = 500;
    const margin = {
        top: 30,
        bottom: 30,
        left: 15,
        right: 15
    };

    const page = pdfDoc.addPage([pageWidth, minHeight]);
    const { width } = page.getSize();
    const contentWidth = width - margin.left - margin.right;
    const centerX = width / 2;

    const headerSize = 12;
    const subHeaderSize = 10;
    const normalSize = 8;
    const smallSize = 7;

    let y = minHeight - margin.top;

    // Fungsi helper untuk text centering yang konsisten
    const getTextCenterX = (text, fontSize) => {
        let widthFactor;
        if (fontSize === headerSize) {
            widthFactor = 0.6;
        } else if (fontSize === subHeaderSize) {
            widthFactor = 0.55; 
        } else {
            widthFactor = 0.5; 
        }
        const estimatedWidth = text.length * (fontSize * widthFactor);
        return centerX - (estimatedWidth / 2);
    };

    // Header - Store Name (perfectly centered)
    const storeName = 'AUTO CENTER PARTS';
    const storeNameX = getTextCenterX(storeName, headerSize);
    page.drawText(storeName, {
        x: storeNameX,
        y: y,
        size: headerSize
    });
    y -= headerSize + 3;

    // Store Address (centered like footer)
    const addressLines = [
        'Jl. Pahlawan Duriman No.20, Sumbersari',
        'Banyuwangi'
    ];

    addressLines.forEach(line => {
        const addressX = getTextCenterX(line, smallSize);
        page.drawText(line, {
            x: addressX,
            y: y,
            size: smallSize
        });
        y -= smallSize + 2;
    });

    // Separator line dengan margin
    const drawSeparator = (yPos) => {
        page.drawLine({
            start: { x: margin.left, y: yPos },
            end: { x: width - margin.right, y: yPos },
            thickness: 0.5,
            color: rgb(0.7, 0.7, 0.7)
        });
    };

    // Sisanya sama seperti sebelumnya
    y -= 5;
    drawSeparator(y);
    y -= 10;

    // Transaction Details dengan margin
    page.drawText(`No. Transaksi: #${structData.transaction.id}`, {
        x: margin.left,
        y,
        size: normalSize
    });
    y -= normalSize + 3;

    const dateStr = format(new Date(structData.transaction.tanggal), 'dd/MM/yyyy HH:mm');
    page.drawText(`Tanggal: ${dateStr}`, {
        x: margin.left,
        y,
        size: normalSize
    });
    y -= normalSize + 8;

    // Items Header dengan spacing yang lebih baik
    const itemHeaderY = y;
    page.drawText('Item', {
        x: margin.left,
        y: itemHeaderY,
        size: normalSize
    });
    page.drawText('Qty', {
        x: width - margin.right - 60,
        y: itemHeaderY,
        size: normalSize
    });
    page.drawText('Total', {
        x: width - margin.right - 30,
        y: itemHeaderY,
        size: normalSize
    });
    y -= normalSize + 3;

    drawSeparator(y);
    y -= normalSize + 3;

    // Items dengan layout yang lebih rapi
    structData.transaction.details.forEach((detail) => {
        const itemName = detail.product.nama;
        const maxLength = 20;
        if (itemName.length > maxLength) {
            const lines = [
                itemName.substring(0, maxLength),
                itemName.substring(maxLength)
            ];
            lines.forEach((line, index) => {
                page.drawText(line, {
                    x: margin.left,
                    y,
                    size: normalSize
                });
                y -= normalSize + 2;
            });
        } else {
            page.drawText(itemName, {
                x: margin.left,
                y,
                size: normalSize
            });
            y -= normalSize + 2;
        }

        page.drawText(`@Rp ${detail.product.harga.toLocaleString('id-ID')}`, {
            x: margin.left + 5,
            y,
            size: smallSize,
            color: rgb(0.4, 0.4, 0.4)
        });

        page.drawText(`${detail.quantity}x`, {
            x: width - margin.right - 60,
            y: y + smallSize,
            size: normalSize
        });

        page.drawText(`${(detail.quantity * detail.product.harga).toLocaleString('id-ID')}`, {
            x: width - margin.right - 30,
            y: y + smallSize,
            size: normalSize
        });
        y -= normalSize + 6;
    });

    drawSeparator(y);
    y -= normalSize + 3;

    // Payment Details dengan ukuran font yang konsisten
    const paymentDetails = [
        { label: 'Total:', value: structData.transaction.total },
        { label: 'Tunai:', value: structData.payment.uangMasuk },
        { label: 'Kembali:', value: structData.payment.kembali }
    ];

    paymentDetails.forEach((item, index) => {
        const textColor = index === 0 ? rgb(0, 0, 0) : rgb(0.3, 0.3, 0.3);

        page.drawText(item.label, {
            x: width - margin.right - 90,
            y,
            size: smallSize,
            color: textColor
        });

        page.drawText(`Rp ${item.value.toLocaleString('id-ID')}`, {
            x: width - margin.right - 40,
            y,
            size: smallSize,
            color: textColor
        });
        y -= smallSize + 3;
    });

    // Footer dengan centering yang konsisten
    y -= 15;
    const footerLines = [
        'Terima kasih atas kunjungan Anda!',
        'Harap simpan struk ini sebagai',
        'bukti pembelian.'
    ];

    footerLines.forEach(line => {
        const xPos = getTextCenterX(line, smallSize);
        page.drawText(line, {
            x: xPos,
            y: y,
            size: smallSize
        });
        y -= smallSize + 2;
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};


function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

module.exports = {
    createOrder,
    exportStruck
};