const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const categorySeed = require('./categorySeed');
const productSeed = require('./productSeed');

async function main() {
    await categorySeed();
    await productSeed();
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    });
