import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from "@prisma/adapter-pg";

const bcrypt = require('bcrypt');

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})
const prismaClientSingelton = () => new PrismaClient({
    adapter: adapter
});
async function main() {
    const alice = await prismaClientSingelton().user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            name: 'Alice',
            passwordHash: await bcrypt.hash('123456789', 12)
        },
    })

    const bob = await prismaClientSingelton().user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            name: 'Bob',
            passwordHash: await bcrypt.hash('123456789', 12)
        },
    })

    const sam = await prismaClientSingelton().user.upsert({
        where: { email: 'sam@prisma.io' },
        update: {},
        create: {
            email: 'sam@prisma.io',
            name: 'Sam',
            passwordHash: await bcrypt.hash('123456789', 12)
        },
    })

    await prismaClientSingelton().post.createMany({
    data: [
      {
        title: "Alice First Post",
        content: "Hello from Alice 👋",
        userId: alice.userId,
      },
      {
        title: "Bob First Post",
        content: "Bob is here 🚀",
        userId: bob.userId,
      },
      {
        title: "Sam First Post",
        content: "Sam joined the platform 🎉",
        userId: sam.userId,
      },
    ],
  });

    console.log({ alice, bob, sam });
}
main()
    .then(async () => {
        await prismaClientSingelton().$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prismaClientSingelton().$disconnect()
        process.exit(1)
    })