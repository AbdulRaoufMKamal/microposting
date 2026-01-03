import { PrismaClient } from "@/src/generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})
const prismaClientSingelton = () => new PrismaClient({
    adapter: adapter
});

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingelton>;
} & typeof global;
const prisma = globalThis.prismaGlobal ?? prismaClientSingelton()

export default prisma
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma