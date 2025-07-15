import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    const restaurantCount = await prisma.restaurant.count()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      restaurantCount,
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrl: process.env.DATABASE_URL?.substring(0, 30) + '...'
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasDatabaseUrl: !!process.env.DATABASE_URL
    }, { status: 500 })
  }
}
