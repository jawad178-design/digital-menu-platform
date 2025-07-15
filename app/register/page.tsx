"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { QrCode, ArrowRight, Building, Mail, Phone, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "خطأ",
        description: "يجب الموافقة على الشروط والأحكام",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "نجح إنشاء الحساب",
          description: data.message,
        })
        router.push('/dashboard')
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
        description: "حدث خطأ أثناء إنشاء الحساب",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              MenuPro
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب جديد</h1>
          <p className="text-gray-600">ابدأ تجربتك المجانية لمدة 30 يوماً</p>
        </div>

        <Card className="border-orange-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-right">معلومات المطعم</CardTitle>
            <CardDescription className="text-right">أدخل معلومات مطعمك لإنشاء قائمة رقمية احترافية</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Restaurant Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right flex items-center justify-end">
                  <span>اسم المطعم</span>
                  <Building className="w-4 h-4 mr-2" />
                </Label>
                <Input
                  id="name"
                  placeholder="مثال: مطعم الأصالة"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-right"
                  required
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-right flex items-center justify-end">
                    <span>رقم الهاتف</span>
                    <Phone className="w-4 h-4 mr-2" />
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+966501234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="text-right"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-right flex items-center justify-end">
                    <span>البريد الإلكتروني</span>
                    <Mail className="w-4 h-4 mr-2" />
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="restaurant@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-right"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-right">
                    تأكيد كلمة المرور
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="تأكيد كلمة المرور"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="text-right"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-right">
                    كلمة المرور
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="كلمة المرور"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="text-right"
                    required
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-center space-x-2 justify-end">
                <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 cursor-pointer">
                  أوافق على{" "}
                  <Link href="/terms" className="text-orange-600 hover:underline">
                    الشروط والأحكام
                  </Link>
                </Label>
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                ) : (
                  <ArrowRight className="w-4 h-4 ml-2" />
                )}
                {isLoading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  لديك حساب بالفعل؟{" "}
                  <Link href="/login" className="text-orange-600 hover:underline font-medium">
                    تسجيل الدخول
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ماذا ستحصل عليه؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
              <QrCode className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">رمز QR مخصص</h3>
              <p className="text-gray-600 text-sm">احصل على رمز QR فريد لقائمتك</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
              <Building className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">تصميم احترافي</h3>
              <p className="text-gray-600 text-sm">قائمة رقمية بتصميم أنيق ومتجاوب</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
              <Phone className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">طلبات واتساب</h3>
              <p className="text-gray-600 text-sm">استقبل الطلبات مباشرة عبر واتساب</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
