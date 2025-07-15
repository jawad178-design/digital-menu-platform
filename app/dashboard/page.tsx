"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  QrCode,
  Plus,
  Settings,
  Eye,
  Share2,
  BarChart3,
  Users,
  ShoppingBag,
  Palette,
  Upload,
  MessageCircle,
  Calendar,
  TrendingUp,
  Loader2,
  LogOut,
  Edit,
  Trash2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Restaurant {
  id: string
  name: string
  email: string
  slug: string
  subscriptionType: string
  subscriptionEndDate: string | null
  categories: Category[]
  _count: {
    categories: number
    products: number
  }
}

interface Category {
  id: string
  name: string
  description: string | null
  products: Product[]
  _count: {
    products: number
  }
}

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  isAvailable: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: ""
  })
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: ""
  })

  useEffect(() => {
    fetchRestaurantData()
    fetchQRCode()
  }, [])

  const fetchRestaurantData = async () => {
    try {
      const response = await fetch('/api/restaurant')
      const data = await response.json()

      if (response.ok) {
        setRestaurant(data.restaurant)
      } else {
        if (response.status === 401) {
          router.push('/login')
        } else {
          toast({
            title: "خطأ",
            description: data.error,
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل البيانات",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchQRCode = async () => {
    try {
      const response = await fetch('/api/qr')
      const data = await response.json()

      if (response.ok) {
        setQrCode(data.qrCode)
      }
    } catch (error) {
      console.error('Error fetching QR code:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return

    setIsAddingCategory(true)
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "نجح",
          description: data.message
        })
        setNewCategory({ name: "", description: "" })
        fetchRestaurantData()
      } else {
        toast({
          title: "خطأ",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة الفئة",
        variant: "destructive",
      })
    } finally {
      setIsAddingCategory(false)
    }
  }

  const handleAddProduct = async () => {
    if (!newProduct.name.trim() || !newProduct.price || !newProduct.categoryId) return

    setIsAddingProduct(true)
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "نجح",
          description: data.message
        })
        setNewProduct({ name: "", description: "", price: "", categoryId: "" })
        fetchRestaurantData()
      } else {
        toast({
          title: "خطأ",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المنتج",
        variant: "destructive",
      })
    } finally {
      setIsAddingProduct(false)
    }
  }

  const copyMenuLink = () => {
    const menuUrl = `${window.location.origin}/menu/${restaurant?.slug}`
    navigator.clipboard.writeText(menuUrl)
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط القائمة إلى الحافظة"
    })
  }

  const downloadQR = () => {
    if (!qrCode) return
    
    const link = document.createElement('a')
    link.download = `${restaurant?.slug}-qr.png`
    link.href = qrCode
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">خطأ في التحميل</h1>
          <p className="text-gray-600">لم يتم العثور على بيانات المطعم</p>
        </div>
      </div>
    )
  }

  const daysLeft = restaurant.subscriptionEndDate 
    ? Math.ceil((new Date(restaurant.subscriptionEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0

  const menuUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/menu/${restaurant.slug}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{restaurant.name}</h1>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {restaurant.subscriptionType === 'trial' ? 'تجربة مجانية' : restaurant.subscriptionType}
                </Badge>
                <span className="text-sm text-gray-500">{daysLeft} يوم متبقي</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href={menuUrl} target="_blank">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                معاينة القائمة
              </Button>
            </Link>
            <Button size="sm" onClick={copyMenuLink} className="bg-gradient-to-r from-orange-500 to-red-500">
              <Share2 className="w-4 h-4 mr-2" />
              مشاركة
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              خروج
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-right">إجمالي الأصناف</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-right">{restaurant._count.products}</div>
              <p className="text-xs text-muted-foreground text-right">في جميع الفئات</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-right">التصنيفات</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-right">{restaurant._count.categories}</div>
              <p className="text-xs text-muted-foreground text-right">فئة نشطة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-right">رابط القائمة</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-mono break-all">{restaurant.slug}</div>
              <p className="text-xs text-muted-foreground text-right">الرابط المخصص</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-right">رمز QR</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline" onClick={downloadQR} disabled={!qrCode}>
                تحميل QR
              </Button>
              <p className="text-xs text-muted-foreground text-right mt-1">للطباعة والعرض</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="categories">الفئات</TabsTrigger>
            <TabsTrigger value="qr">رمز QR</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-right">إدارة المنتجات</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        <Plus className="w-4 h-4 mr-2" />
                        إضافة منتج
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-right">إضافة منتج جديد</DialogTitle>
                        <DialogDescription className="text-right">
                          أدخل تفاصيل المنتج الجديد
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="productName" className="text-right">اسم المنتج</Label>
                          <Input
                            id="productName"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="text-right"
                            placeholder="مثال: كبسة لحم"
                          />
                        </div>
                        <div>
                          <Label htmlFor="productDescription" className="text-right">الوصف</Label>
                          <Textarea
                            id="productDescription"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            className="text-right"
                            placeholder="وصف المنتج..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="productPrice" className="text-right">السعر (ريال)</Label>
                          <Input
                            id="productPrice"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="text-right"
                            placeholder="25"
                          />
                        </div>
                        <div>
                          <Label htmlFor="productCategory" className="text-right">الفئة</Label>
                          <select 
                            className="w-full p-2 border rounded-md text-right"
                            value={newProduct.categoryId}
                            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                          >
                            <option value="">اختر الفئة</option>
                            {restaurant.categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <Button 
                          onClick={handleAddProduct} 
                          disabled={isAddingProduct}
                          className="w-full bg-orange-500 hover:bg-orange-600"
                        >
                          {isAddingProduct && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                          إضافة المنتج
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {restaurant.categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3 text-right">{category.name}</h3>
                      <div className="grid gap-3">
                        {category.products.map((product) => (
                          <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-gray-600">{product.price} ريال</p>
                              {!product.isAvailable && (
                                <Badge variant="secondary" className="text-red-600">غير متوفر</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                        {category.products.length === 0 && (
                          <p className="text-gray-500 text-center py-4">لا توجد منتجات في هذه الفئة</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-right">إدارة الفئات</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        <Plus className="w-4 h-4 mr-2" />
                        إضافة فئة
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-right">إضافة فئة جديدة</DialogTitle>
                        <DialogDescription className="text-right">
                          أدخل تفاصيل الفئة الجديدة
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="categoryName" className="text-right">اسم الفئة</Label>
                          <Input
                            id="categoryName"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            className="text-right"
                            placeholder="مثال: الأطباق الرئيسية"
                          />
                        </div>
                        <div>
                          <Label htmlFor="categoryDescription" className="text-right">الوصف</Label>
                          <Textarea
                            id="categoryDescription"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            className="text-right"
                            placeholder="وصف الفئة..."
                          />
                        </div>
                        <Button 
                          onClick={handleAddCategory} 
                          disabled={isAddingCategory}
                          className="w-full bg-orange-500 hover:bg-orange-600"
                        >
                          {isAddingCategory && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                          إضافة الفئة
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {restaurant.categories.map((category) => (
                    <div key={category.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category._count.products} منتج</p>
                        {category.description && (
                          <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {restaurant.categories.length === 0 && (
                    <p className="text-gray-500 text-center py-8">لم يتم إنشاء أي فئات بعد</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qr">
            <Card>
              <CardHeader>
                <CardTitle className="text-right">رمز QR للقائمة</CardTitle>
                <CardDescription className="text-right">
                  قم بتحميل رمز QR وطباعته لعرضه في مطعمك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  {qrCode ? (
                    <div>
                      <img src={qrCode} alt="QR Code" className="mx-auto border rounded-lg" />
                      <div className="mt-4 space-y-2">
                        <Button onClick={downloadQR} className="bg-orange-500 hover:bg-orange-600">
                          <Upload className="w-4 h-4 mr-2" />
                          تحميل رمز QR
                        </Button>
                        <p className="text-sm text-gray-600">
                          رابط القائمة: {menuUrl}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                      <p>جاري إنشاء رمز QR...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="text-right">إعدادات المطعم</CardTitle>
                <CardDescription className="text-right">
                  قم بتحديث معلومات مطعمك وإعدادات القائمة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="restaurantName" className="text-right">اسم المطعم</Label>
                    <Input
                      id="restaurantName"
                      value={restaurant.name}
                      className="text-right"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="restaurantEmail" className="text-right">البريد الإلكتروني</Label>
                    <Input
                      id="restaurantEmail"
                      value={restaurant.email}
                      className="text-right"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="restaurantSlug" className="text-right">الرابط المخصص</Label>
                    <Input
                      id="restaurantSlug"
                      value={restaurant.slug}
                      className="text-right"
                      readOnly
                    />
                  </div>
                  <Button disabled className="bg-gray-400">
                    <Settings className="w-4 h-4 mr-2" />
                    حفظ التغييرات
                  </Button>
                  <p className="text-sm text-gray-500">سيتم إضافة المزيد من الإعدادات قريباً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
