import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import QRCode from 'qrcode'

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
      select: { slug: true, name: true }
    })

    if (!restaurant) {
      return NextResponse.json({ error: 'المطعم غير موجود' }, { status: 404 })
    }

    const url = new URL(request.url)
    const format = url.searchParams.get('format') || 'png'
    const size = parseInt(url.searchParams.get('size') || '300')

    // Generate menu URL
    const menuUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/menu/${restaurant.slug}`

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(menuUrl, {
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    if (format === 'svg') {
      const qrCodeSvg = await QRCode.toString(menuUrl, {
        type: 'svg',
        width: size,
        margin: 2
      })
      
      return new NextResponse(qrCodeSvg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Content-Disposition': `attachment; filename="${restaurant.slug}-qr.svg"`
        }
      })
    }

    return NextResponse.json({
      qrCode: qrCodeDataUrl,
      menuUrl,
      restaurantName: restaurant.name
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json({ error: 'حدث خطأ أثناء إنشاء رمز QR' }, { status: 500 })
  }
}
