import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X, Home, Headphones, FileText, MessageSquare } from 'lucide-react'
import { Link } from '../Router.jsx'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const menuItems = [
    { to: '/', icon: Home, label: 'ホーム' },
    { to: '/episodes', icon: Headphones, label: '過去の配信' },
    { to: '/producer-notes', icon: FileText, label: '編集後記' },
    { to: '/', icon: MessageSquare, label: '質問・リクエスト', scrollTo: 'contact' }
  ]

  return (
    <>
      {/* ハンバーガーボタン */}
      <Button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 creative-button"
        size="sm"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* オーバーレイ */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* メニュー */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-8 pt-20">
          <h2 className="text-2xl font-bold mb-8 strong-gothic text-gray-800">
            メニュー
          </h2>
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.to + (item.scrollTo || '')}
                to={item.to}
                onClick={() => {
                  closeMenu()
                  if (item.scrollTo) {
                    setTimeout(() => {
                      const element = document.getElementById(item.scrollTo)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }, 100)
                  }
                }}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-lg">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navigation

