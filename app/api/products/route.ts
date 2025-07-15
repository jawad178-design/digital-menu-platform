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

    const url = new URL(request.url)
    const categoryId = url.searchParams.get('categoryId')

    const where: any = { restaurantId: decoded.id }
    if (categoryId) {
      where.categoryId = categoryId
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true
      },
      orderBy: { sortOrder: 'asc' }
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
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
    const { name, description, price, image, categoryId, sortOrder, isAvailable } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        categoryId,
        sortOrder: sortOrder || 0,
        isAvailable: isAvailable !== false,
        restaurantId: decoded.id
      },
      include: {
        category: true
      }
    })

    return NextResponse.json({
      message: 'تم إنشاء المنتج بنجاح',
      product
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'حدث خطأ أثناء إنشاء المنتج' }, { status: 500 })
  }
}
