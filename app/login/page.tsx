"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { QrCode, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: data.message,
        })
        router.push('/menu/demo-restaurant')
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
        description: "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
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

          <h1 className="text-3xl font-bold text-gray-900 mb-2">تسجيل الدخول</h1>
          <p className="text-gray-600">ادخل إلى لوحة تحكم مطعمك</p>
        </div>

        <Card className="border-orange-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-right">مرحباً بعودتك</CardTitle>
            <CardDescription className="text-right">أدخل بياناتك للوصول إلى حسابك</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right flex items-center justify-end">
                  <span>البريد الإلكتروني</span>
                  <Mail className="w-4 h-4 mr-2" />
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-right"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-right flex items-center justify-end">
                  <span>كلمة المرور</span>
                  <Lock className="w-4 h-4 mr-2" />
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="text-right"
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-orange-600 hover:underline">
                  نسيت كلمة المرور؟
                </Link>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    تذكرني
                  </Label>
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg py-6"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <ArrowRight className="w-5 h-5 mr-2" />
                )}
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ليس لديك حساب؟{" "}
                <Link href="/register" className="text-orange-600 hover:underline font-semibold">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Account */}
        <Card className="mt-6 border-blue-100 bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-blue-900 mb-2">حساب تجريبي</h3>
              <p className="text-sm text-blue-700 mb-4">جرب المنصة باستخدام الحساب التجريبي</p>
              <div className="space-y-2 text-sm text-blue-800">
                <p>
                  <strong>البريد:</strong> demo@menupro.com
                </p>
                <p>
                  <strong>كلمة المرور:</strong> 123456
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-4 border-blue-200 text-blue-700 hover:bg-blue-100 bg-transparent"
                onClick={() => setFormData({ email: "demo@menupro.com", password: "123456", rememberMe: false })}
              >
                استخدام الحساب التجريبي
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
