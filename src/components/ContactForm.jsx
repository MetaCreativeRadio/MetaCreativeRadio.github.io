import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Formspreeを使用（要設定）
      // 下記URLは設定後に有効なFormspree URLに変更してください
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
        console.error('Form submission failed')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Network error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <Mail className="w-16 h-16 mx-auto mb-4 text-primary" />
        <CardTitle className="text-2xl font-bold graffiti-text">
          番組への質問・リクエスト
        </CardTitle>
        <p className="text-muted-foreground text-left max-w-lg mx-auto">
          クリエイティブに関する質問や、お二人に聞いてみたいこと、番組で取り上げてほしいトピックなど、お気軽にお送りください。
        </p>
      </CardHeader>
      <CardContent>
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800">お問い合わせを受け付けました。ありがとうございます！</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">送信に失敗しました。もう一度お試しください。</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">お名前 *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="山田太郎"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="example@email.com"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">メッセージ *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="番組で取り上げてほしいテーマや、お二人への質問などをお聞かせください..."
              rows={6}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full creative-button"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                送信中...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                送信する
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm

