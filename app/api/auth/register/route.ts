import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken, generateSlug } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, phone } = body

    // Check if restaurant already exists
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { email }
    })

    if (existingRestaurant) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مستخدم بالفعل' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate unique slug
    let slug = generateSlug(name)
    let slugExists = await prisma.restaurant.findUnique({ where: { slug } })
    let counter = 1

    while (slugExists) {
      slug = `${generateSlug(name)}-${counter}`
      slugExists = await prisma.restaurant.findUnique({ where: { slug } })
      counter++
    }

    // Set trial subscription end date (30 days from now)
    const subscriptionEndDate = new Date()
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30)

    // Create restaurant
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        slug,
        subscriptionType: 'trial',
        subscriptionEndDate,
        themeColors: {
          primary: '#f97316',
          secondary: '#dc2626',
          text: '#1f2937'
        }
      }
    })

    // Generate JWT token
    const token = generateToken({
      id: restaurant.id,
      email: restaurant.email,
      name: restaurant.name
    })

    const response = NextResponse.json({
      message: 'تم إنشاء الحساب بنجاح',
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        slug: restaurant.slug,
        subscriptionType: restaurant.subscriptionType,
        subscriptionEndDate: restaurant.subscriptionEndDate
      }
    })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 500 }
    )
  }
}
