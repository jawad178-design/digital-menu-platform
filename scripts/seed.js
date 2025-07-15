const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create a sample subscription plan
  const trialPlan = await prisma.subscription.create({
    data: {
      name: 'التجربة المجانية',
      duration: 30,
      price: 0,
      features: ['إنشاء قائمة رقمية', 'رمز QR مخصص', 'طلبات واتساب', 'حتى 50 منتج'],
      isActive: true
    }
  })

  // Create a sample restaurant
  const hashedPassword = await bcrypt.hash('123456', 12)
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'مطعم الأصالة التجريبي',
      email: 'demo@menupro.com',
      password: hashedPassword,
      phone: '+966501234567',
      address: 'شارع الملك فهد، الرياض',
      slug: 'demo-restaurant',
      whatsappNumber: '966501234567',
      description: 'مطعم متخصص في المأكولات العربية الأصيلة',
      subscriptionType: 'trial',
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      themeColors: {
        primary: '#f97316',
        secondary: '#dc2626',
        text: '#1f2937'
      },
      socialLinks: {
        facebook: 'https://facebook.com/demo',
        instagram: 'https://instagram.com/demo',
        twitter: 'https://twitter.com/demo'
      }
    }
  })

  // Create sample categories
  const mainDishes = await prisma.category.create({
    data: {
      name: 'الأطباق الرئيسية',
      description: 'مجموعة متنوعة من الأطباق الرئيسية الشهية',
      restaurantId: restaurant.id,
      sortOrder: 1
    }
  })

  const appetizers = await prisma.category.create({
    data: {
      name: 'المقبلات',
      description: 'مقبلات طازجة ولذيذة',
      restaurantId: restaurant.id,
      sortOrder: 2
    }
  })

  const beverages = await prisma.category.create({
    data: {
      name: 'المشروبات',
      description: 'مشروبات منعشة ومتنوعة',
      restaurantId: restaurant.id,
      sortOrder: 3
    }
  })

  // Create sample products
  await prisma.product.createMany({
    data: [
      {
        name: 'كبسة لحم',
        description: 'أرز بسمتي مع لحم الخروف المطبوخ بالتوابل العربية الأصيلة',
        price: 45,
        categoryId: mainDishes.id,
        restaurantId: restaurant.id,
        sortOrder: 1
      },
      {
        name: 'مندي دجاج',
        description: 'دجاج مشوي مع الأرز المدخن بطريقة تقليدية',
        price: 35,
        categoryId: mainDishes.id,
        restaurantId: restaurant.id,
        sortOrder: 2
      },
      {
        name: 'مضغوط لحم',
        description: 'أرز مضغوط مع قطع اللحم الطرية',
        price: 40,
        categoryId: mainDishes.id,
        restaurantId: restaurant.id,
        sortOrder: 3
      },
      {
        name: 'حمص بالطحينة',
        description: 'حمص كريمي مع الطحينة وزيت الزيتون',
        price: 15,
        categoryId: appetizers.id,
        restaurantId: restaurant.id,
        sortOrder: 1
      },
      {
        name: 'متبل باذنجان',
        description: 'متبل الباذنجان المشوي مع التوابل',
        price: 12,
        categoryId: appetizers.id,
        restaurantId: restaurant.id,
        sortOrder: 2
      },
      {
        name: 'سلطة فتوش',
        description: 'سلطة خضار مشكلة مع الخبز المحمص',
        price: 18,
        categoryId: appetizers.id,
        restaurantId: restaurant.id,
        sortOrder: 3
      },
      {
        name: 'عصير برتقال طازج',
        description: 'عصير برتقال طبيعي 100%',
        price: 8,
        categoryId: beverages.id,
        restaurantId: restaurant.id,
        sortOrder: 1
      },
      {
        name: 'شاي أحمر',
        description: 'شاي أحمر تقليدي مع النعناع',
        price: 5,
        categoryId: beverages.id,
        restaurantId: restaurant.id,
        sortOrder: 2
      },
      {
        name: 'قهوة عربية',
        description: 'قهوة عربية أصيلة مع الهيل',
        price: 6,
        categoryId: beverages.id,
        restaurantId: restaurant.id,
        sortOrder: 3
      }
    ]
  })

  console.log('✅ Sample data created successfully!')
  console.log('Demo restaurant login:')
  console.log('Email: demo@menupro.com')
  console.log('Password: 123456')
  console.log(`Menu URL: /menu/${restaurant.slug}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
