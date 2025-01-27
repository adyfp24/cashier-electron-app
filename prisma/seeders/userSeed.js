const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function seed(){
    await prisma.user.create({
        data:{
            username: 'admin',
            password: 'autocenter2025'
        }
    })
}

module.exports = seed;