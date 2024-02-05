import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const turn1 = await prisma.turn.upsert({
    where:{ number:1},
    update: {},
    create: {
      number: 1,
      range: '8:0-11:00'
    
    },
  })
  const turn2 = await prisma.turn.upsert({
    where:{ number:2},
    update: {},
    create: {
      number: 2,
      range: '11:0-14:00'
    
    },
  })
  const turn3 = await prisma.turn.upsert({
    where:{ number:3},
    update: {},
    create: {
      number: 3,
      range: '14:0-17:00'
    
    },
  })
  const turn4 = await prisma.turn.upsert({
    where:{ number:4},
    update: {},
    create: {
      number: 4,
      range: '17:0-20:00'
    
    },
  })
  const turn5 = await prisma.turn.upsert({
    where:{ number:5},
    update: {},
    create: {
      number: 5,
      range: '20:0-23:00'
    
    },
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
