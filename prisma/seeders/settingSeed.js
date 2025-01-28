const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed(){
    await prisma.setting.createMany({
        data:[
            {'nama_aplikasi': 'Auto Center Parts', 'logo_aplikasi': '/images/logo-sementara.png'},
        ]
    })
}

module.exports = seed;
