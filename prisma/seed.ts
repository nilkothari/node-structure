import { PrismaClient, Prisma } from '@prisma/client';
console.log('asdasdadsadas');
const prisma = new PrismaClient();

const roleData = [
  {
    name: 'Fan',
  },
  {
    name: 'Performer',
  },
  {
    name: 'Coach',
  },
  {
    name: 'Recruiter',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  const roles = await prisma.role.createMany({
    data: roleData,
  });
  console.log(`inserted roles ${roles}`);
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
