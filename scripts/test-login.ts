import { prisma } from '../lib/prisma'
import { comparePassword } from '../lib/auth'

async function testLogin() {
  try {
    console.log('Testing login process...')
    
    const email = 'demo@menupro.com'
    const password = '123456'
    
    // Find restaurant
    const restaurant = await prisma.restaurant.findUnique({
      where: { email }
    })
    
    if (!restaurant) {
      console.log('❌ Restaurant not found')
      return
    }
    
    console.log('✅ Restaurant found:', restaurant.name)
    console.log('✅ Stored password hash:', restaurant.password.substring(0, 20) + '...')
    
    // Test password comparison
    const isValidPassword = await comparePassword(password, restaurant.password)
    console.log('✅ Password valid:', isValidPassword)
    
    // Check JWT_SECRET
    console.log('✅ JWT_SECRET exists:', !!process.env.JWT_SECRET)
    
    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Login test failed:', error)
  }
}

testLogin()
