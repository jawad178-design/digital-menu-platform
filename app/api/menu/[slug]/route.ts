import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug

    const restaurant = await prisma.restaurant.findUnique({
      where: { 
        slug,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        address: true,
        phone: true,
        whatsappNumber: true,
        themeColors: true,
        socialLinks: true,
        categories: {
          where: { isActive: true },
          include: {
            products: {
              where: { isAvailable: true },
              orderBy: { sortOrder: 'asc' }
            }
          },
          orderBy: { sortOrder: 'asc' }
        }
      }
    })

    if (!restaurant) {
      return NextResponse.json(
        { error: 'المطعم غير موجود أو غير نشط' },
        { status: 404 }
      )
    }

    // Check if subscription is active (for trial accounts)
    // This would typically check subscription expiry date
    // For now, we'll allow all active restaurants

    return NextResponse.json({ restaurant })
  } catch (error) {
    console.error('Error fetching menu:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في تحميل القائمة' },
      { status: 500 }
    )
  }
}
