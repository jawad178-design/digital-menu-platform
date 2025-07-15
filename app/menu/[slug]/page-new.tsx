"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, MapPin, Phone, Clock, Star, Facebook, Instagram, Twitter, Loader2 } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image: string | null
  isAvailable: boolean
  sortOrder: number
}

interface Category {
  id: string
  name: string
  description: string | null
  image: string | null
  sortOrder: number
  products: Product[]
}

interface Restaurant {
  id: string
  name: string
  description: string | null
  logo: string | null
  address: string | null
  phone: string | null
  whatsappNumber: string | null
  themeColors: any
  socialLinks: any
  categories: Category[]
}

export default function MenuPage() {
  const params = useParams()
  const slug = params.slug as string
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`/api/menu/${slug}`)
        const data = await response.json()

        if (response.ok) {
          setRestaurant(data.restaurant)
          if (data.restaurant.categories.length > 0) {
            setSelectedCategory(data.restaurant.categories[0].id)
          }
        } else {
          setError(data.error || 'المطعم غير موجود')
        }
      } catch (err) {
        setError('حدث خطأ في تحميل القائمة')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchRestaurant()
    }
  }, [slug])

  const handleWhatsAppOrder = (productName: string, price: number) => {
    if (!restaurant?.whatsappNumber) return

    const message = `مرحباً، أريد طلب ${productName} بسعر ${price} ريال من مطعم ${restaurant.name}`
    const whatsappUrl = `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل القائمة...</p>
        </div>
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">القائمة غير متوفرة</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  const themeColors = restaurant.themeColors || {
    primary: '#f97316',
    secondary: '#dc2626',
    text: '#1f2937'
  }

  const filteredProducts = selectedCategory 
    ? restaurant.categories.find(cat => cat.id === selectedCategory)?.products || []
    : restaurant.categories.flatMap(cat => cat.products)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4 justify-center md:justify-start">
            {restaurant.logo && (
              <Image
                src={restaurant.logo}
                alt={restaurant.name}
                width={60}
                height={60}
                className="rounded-lg"
              />
            )}
            <div className="text-center md:text-right">
              <h1 className="text-2xl font-bold" style={{ color: themeColors.text }}>
                {restaurant.name}
              </h1>
              {restaurant.description && (
                <p className="text-gray-600 text-sm">{restaurant.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurant.address && (
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <MapPin className="w-5 h-5" style={{ color: themeColors.primary }} />
                <span className="text-gray-700">{restaurant.address}</span>
              </div>
            )}
            {restaurant.phone && (
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <Phone className="w-5 h-5" style={{ color: themeColors.primary }} />
                <span className="text-gray-700">{restaurant.phone}</span>
              </div>
            )}
            <div className="flex items-center space-x-3 justify-center md:justify-start">
              <Clock className="w-5 h-5" style={{ color: themeColors.primary }} />
              <span className="text-gray-700">السبت - الخميس: 11:00 ص - 11:00 م</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
              <h2 className="text-xl font-bold mb-4" style={{ color: themeColors.text }}>
                الفئات
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                    selectedCategory === null
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === null ? themeColors.primary : 'transparent'
                  }}
                >
                  جميع المنتجات
                </button>
                {restaurant.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-right px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: selectedCategory === category.id ? themeColors.primary : 'transparent'
                    }}
                  >
                    {category.name}
                    <span className="text-sm opacity-75 block">
                      {category.products.length} منتج
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold" style={{ color: themeColors.text }}>
                {selectedCategory 
                  ? restaurant.categories.find(cat => cat.id === selectedCategory)?.name 
                  : 'جميع المنتجات'
                }
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} منتج متوفر
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">لا توجد صورة</span>
                      </div>
                    )}
                    {!product.isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="secondary" className="text-white bg-red-500">
                          غير متوفر
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="text-right">
                      <h3 className="text-xl font-bold mb-2" style={{ color: themeColors.text }}>
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <Button
                          onClick={() => handleWhatsAppOrder(product.name, product.price)}
                          disabled={!product.isAvailable || !restaurant.whatsappNumber}
                          className="flex items-center space-x-2 text-white"
                          style={{ backgroundColor: themeColors.primary }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>اطلب الآن</span>
                        </Button>
                        <div className="text-left">
                          <span className="text-2xl font-bold" style={{ color: themeColors.primary }}>
                            {product.price} ر.س
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">لا توجد منتجات في هذه الفئة</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600 mb-4">
            تم إنشاء هذه القائمة باستخدام منصة MenuPro
          </p>
          {restaurant.socialLinks && (
            <div className="flex justify-center space-x-4">
              {restaurant.socialLinks.facebook && (
                <a href={restaurant.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5 text-blue-600" />
                </a>
              )}
              {restaurant.socialLinks.instagram && (
                <a href={restaurant.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 text-pink-600" />
                </a>
              )}
              {restaurant.socialLinks.twitter && (
                <a href={restaurant.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-5 h-5 text-blue-400" />
                </a>
              )}
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
