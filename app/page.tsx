import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, QrCode, Smartphone, Palette, Globe, MessageCircle, Star, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              MenuPro
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors">
              الميزات
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-orange-600 transition-colors">
              الأسعار
            </a>
            <a href="#contact" className="text-gray-600 hover:text-orange-600 transition-colors">
              تواصل معنا
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                ابدأ مجاناً
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-100">
            <Star className="w-4 h-4 mr-2" />
            جرب مجاناً لمدة 30 يوم
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 bg-clip-text text-transparent leading-tight">
            قائمة طعام رقمية
            <br />
            <span className="text-orange-600">احترافية لمطعمك</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            أنشئ قائمة طعام رقمية أنيقة ومتجاوبة مع جميع الأجهزة. اجعل عملاءك يطلبون بسهولة عبر واتساب مع إمكانيات تخصيص
            كاملة تناسب هوية مطعمك
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-6"
              >
                <Zap className="w-5 h-5 mr-2" />
                ابدأ الآن مجاناً
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-orange-200 hover:bg-orange-50 bg-transparent"
              >
                <Globe className="w-5 h-5 mr-2" />
                شاهد العرض التوضيحي
              </Button>
            </Link>
          </div>

          {/* Device Mockups */}
          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              {/* Mobile */}
              <div className="relative">
                <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
                  <div className="bg-white rounded-2xl overflow-hidden aspect-[9/19]">
                    <div className="p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">مطعم الأصالة</div>
                          <div className="text-xs text-gray-500">المأكولات العربية</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">كبسة لحم</span>
                          <span className="text-sm font-semibold text-red-600">45 ر.س</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">مندي دجاج</span>
                          <span className="text-sm font-semibold text-red-600">35 ر.س</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">مشاوي مشكلة</span>
                          <span className="text-sm font-semibold text-red-600">65 ر.س</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablet */}
              <div className="relative md:scale-110">
                <div className="bg-gray-900 rounded-2xl p-3 shadow-2xl">
                  <div className="bg-white rounded-xl overflow-hidden aspect-[4/3]">
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h3 className="font-semibold text-red-600">الأطباق الرئيسية</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>كبسة لحم</span>
                              <span className="text-red-600">45 ر.س</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>مندي دجاج</span>
                              <span className="text-red-600">35 ر.س</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-semibold text-red-600">المشروبات</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>عصير طازج</span>
                              <span className="text-red-600">12 ر.س</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>شاي أحمر</span>
                              <span className="text-red-600">8 ر.س</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop */}
              <div className="relative">
                <div className="bg-gray-900 rounded-lg p-2 shadow-2xl">
                  <div className="bg-white rounded-md overflow-hidden aspect-[16/10]">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                          <span className="font-semibold text-sm">مطعم الأصالة</span>
                        </div>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-xs">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          اطلب عبر واتساب
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>كبسة لحم</span>
                            <span className="text-red-600">45 ر.س</span>
                          </div>
                          <div className="flex justify-between">
                            <span>مندي دجاج</span>
                            <span className="text-red-600">35 ر.س</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>عصير طازج</span>
                            <span className="text-red-600">12 ر.س</span>
                          </div>
                          <div className="flex justify-between">
                            <span>شاي أحمر</span>
                            <span className="text-red-600">8 ر.س</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">ميزات متقدمة لمطعمك</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              كل ما تحتاجه لإنشاء قائمة طعام رقمية احترافية وجذابة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-right">رمز QR مخصص</CardTitle>
                <CardDescription className="text-right">أنشئ رمز QR أنيق بتصاميم متعددة لقائمة مطعمك</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-right">متجاوب مع جميع الأجهزة</CardTitle>
                <CardDescription className="text-right">
                  قائمة تعمل بشكل مثالي على الهواتف والأجهزة اللوحية والحاسوب
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-right">طلب عبر واتساب</CardTitle>
                <CardDescription className="text-right">
                  زر طلب مباشر يوجه العملاء لواتساب مطعمك لإتمام الطلب
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-right">تخصيص كامل</CardTitle>
                <CardDescription className="text-right">غير الألوان والخطوط والشعار ليناسب هوية مطعمك</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-right">رابط مخصص</CardTitle>
                <CardDescription className="text-right">
                  احصل على رابط خاص لقائمة مطعمك سهل المشاركة والحفظ
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-right">إدارة سهلة</CardTitle>
                <CardDescription className="text-right">لوحة تحكم بسيطة لإضافة وتعديل الأصناف والأسعار</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">خطط الاشتراك</h2>
            <p className="text-xl text-gray-600">اختر الخطة المناسبة لمطعمك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Trial */}
            <Card className="border-2 border-green-200 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">تجربة مجانية</Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">تجربة مجانية</CardTitle>
                <div className="text-4xl font-bold text-green-600 my-4">
                  مجاناً
                  <span className="text-lg text-gray-500 font-normal">/30 يوم</span>
                </div>
                <CardDescription>مثالي لتجربة الخدمة</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-right">
                  <li className="flex items-center justify-end">
                    <span>قائمة واحدة</span>
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>50 صنف كحد أقصى</span>
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>رمز QR أساسي</span>
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>دعم فني محدود</span>
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-green-500 hover:bg-green-600">ابدأ التجربة المجانية</Button>
              </CardContent>
            </Card>

            {/* Monthly */}
            <Card className="border-2 border-orange-200 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500">الأكثر شعبية</Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">الخطة الشهرية</CardTitle>
                <div className="text-4xl font-bold text-orange-600 my-4">
                  99 ر.س
                  <span className="text-lg text-gray-500 font-normal">/شهر</span>
                </div>
                <CardDescription>مثالي للمطاعم الصغيرة والمتوسطة</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-right">
                  <li className="flex items-center justify-end">
                    <span>قوائم غير محدودة</span>
                    <Check className="w-5 h-5 text-orange-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>أصناف غير محدودة</span>
                    <Check className="w-5 h-5 text-orange-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>تخصيص كامل</span>
                    <Check className="w-5 h-5 text-orange-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>رموز QR متقدمة</span>
                    <Check className="w-5 h-5 text-orange-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>دعم فني 24/7</span>
                    <Check className="w-5 h-5 text-orange-500 mr-2" />
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">اشترك شهرياً</Button>
              </CardContent>
            </Card>

            {/* Yearly */}
            <Card className="border-2 border-red-200 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500">وفر 20%</Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">الخطة السنوية</CardTitle>
                <div className="text-4xl font-bold text-red-600 my-4">
                  950 ر.س
                  <span className="text-lg text-gray-500 font-normal">/سنة</span>
                </div>
                <CardDescription>الأفضل للمطاعم الكبيرة</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-right">
                  <li className="flex items-center justify-end">
                    <span>جميع ميزات الخطة الشهرية</span>
                    <Check className="w-5 h-5 text-red-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>تحليلات متقدمة</span>
                    <Check className="w-5 h-5 text-red-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>نسخ احتياطية يومية</span>
                    <Check className="w-5 h-5 text-red-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>دعم مخصص</span>
                    <Check className="w-5 h-5 text-red-500 mr-2" />
                  </li>
                  <li className="flex items-center justify-end">
                    <span>تدريب مجاني</span>
                    <Check className="w-5 h-5 text-red-500 mr-2" />
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-red-500 hover:bg-red-600">اشترك سنوياً</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">جاهز لتحويل مطعمك رقمياً؟</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المطاعم التي تستخدم منصتنا لتقديم تجربة طعام رقمية مميزة
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6">
              <Zap className="w-5 h-5 mr-2" />
              ابدأ تجربتك المجانية الآن
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MenuPro</span>
              </div>
              <p className="text-gray-400 text-right">منصة رائدة لإنشاء قوائم الطعام الرقمية للمطاعم والمقاهي</p>
            </div>

            <div className="text-right">
              <h3 className="font-semibold mb-4">الخدمات</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    قوائم رقمية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    رموز QR
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    تخصيص التصميم
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    تكامل واتساب
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-right">
              <h3 className="font-semibold mb-4">الدعم</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    مركز المساعدة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    تواصل معنا
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الأسئلة الشائعة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الدعم الفني
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-right">
              <h3 className="font-semibold mb-4">الشركة</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    من نحن
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    سياسة الخصوصية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    شروط الاستخدام
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    اتصل بنا
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MenuPro. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
