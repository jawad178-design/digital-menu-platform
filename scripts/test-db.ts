import { prisma } from '../lib/prisma'

async function testConnection() {
  try {
    console.log('Testing database connection...')
    
    // Try to find the demo restaurant
    const restaurant = await prisma.restaurant.findUnique({
      where: { email: 'demo@menupro.com' }
    })
    
    if (restaurant) {
      console.log('✅ Database connected successfully!')
      console.log('✅ Demo restaurant found:', restaurant.name)
      console.log('✅ Restaurant ID:', restaurant.id)
      console.log('✅ Email:', restaurant.email)
    } else {
      console.log('❌ Demo restaurant not found')
    }
    
    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  }
}

testConnection()
