import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: decoded.id },
      include: {
        categories: {
          include: {
            products: true,
            _count: {
              select: { products: true }
            }
          },
          orderBy: { sortOrder: 'asc' }
        },
        _count: {
          select: {
            categories: true,
            products: true
          }
        }
      }
    })

    if (!restaurant) {
      return NextResponse.json({ error: 'المطعم غير موجود' }, { status: 404 })
    }

    // Remove password from response
    const { password, ...restaurantData } = restaurant

    return NextResponse.json({ restaurant: restaurantData })
  } catch (error) {
    console.error('Error fetching restaurant:', error)
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, address, whatsappNumber, description, themeColors, socialLinks } = body

    const restaurant = await prisma.restaurant.update({
      where: { id: decoded.id },
      data: {
        name,
        phone,
        address,
        whatsappNumber,
        description,
        themeColors,
        socialLinks
      }
    })

    const { password, ...restaurantData } = restaurant

    return NextResponse.json({
      message: 'تم تحديث معلومات المطعم بنجاح',
      restaurant: restaurantData
    })
  } catch (error) {
    console.error('Error updating restaurant:', error)
    return NextResponse.json({ error: 'حدث خطأ أثناء التحديث' }, { status: 500 })
  }
}
