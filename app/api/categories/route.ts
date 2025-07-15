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

    const categories = await prisma.category.findMany({
      where: { restaurantId: decoded.id },
      include: {
        products: true,
        _count: {
          select: { products: true }
        }
      },
      orderBy: { sortOrder: 'asc' }
    })

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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
    const { name, description, image, sortOrder } = body

    const category = await prisma.category.create({
      data: {
        name,
        description,
        image,
        sortOrder: sortOrder || 0,
        restaurantId: decoded.id
      }
    })

    return NextResponse.json({
      message: 'تم إنشاء الفئة بنجاح',
      category
    })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'حدث خطأ أثناء إنشاء الفئة' }, { status: 500 })
  }
}
