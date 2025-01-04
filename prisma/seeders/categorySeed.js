const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed(){
    await prisma.category.createMany({
        data:[
            {'name': 'oli'},
            {'name': 'mesin'},
            {'name': 'vleg'},
        ]
    })
}

module.exports = seed;