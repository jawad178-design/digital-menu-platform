import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { comparePassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Find restaurant by email
    const restaurant = await prisma.restaurant.findUnique({
      where: { email }
    })

    if (!restaurant) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // Check password
    const isValidPassword = await comparePassword(password, restaurant.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // Check if account is active
    if (!restaurant.isActive) {
      return NextResponse.json(
        { error: 'الحساب غير نشط' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      id: restaurant.id,
      email: restaurant.email,
      name: restaurant.name
    })

    const response = NextResponse.json({
      message: 'تم تسجيل الدخول بنجاح',
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
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    )
  }
}
