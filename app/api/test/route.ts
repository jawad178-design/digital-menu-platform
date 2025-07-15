import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // Show environment variables (safely)
    const databaseUrl = process.env.DATABASE_URL
    const jwtSecret = process.env.JWT_SECRET
    
    // Check if they exist and format
    const response = {
      success: true,
      message: 'Environment check',
      hasJwtSecret: !!jwtSecret,
      hasDatabaseUrl: !!databaseUrl,
      databaseUrlLength: databaseUrl?.length || 0,
      databaseUrlPrefix: databaseUrl?.substring(0, 15) || 'none',
      databaseUrlSuffix: databaseUrl?.substring(databaseUrl.length - 15) || 'none',
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV
    }

    // Try to import and test Prisma
    try {
      const { prisma } = await import('@/lib/prisma')
      const restaurantCount = await prisma.restaurant.count()
      
      return NextResponse.json({
        ...response,
        prismaSuccess: true,
        restaurantCount
      })
    } catch (prismaError: any) {
      return NextResponse.json({
        ...response,
        prismaSuccess: false,
        prismaError: prismaError.message,
        prismaCode: prismaError.code
      })
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasDatabaseUrl: !!process.env.DATABASE_URL
    }, { status: 500 })
  }
}
