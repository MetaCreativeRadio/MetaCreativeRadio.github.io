import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react'
import { Link } from '../Router.jsx'
import osatoProfie from '/src/assets/osato_profile.png'

const ProducerNotes = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    // JSONファイルから編集後記データを取得
    fetch('/data/editorial-notes.json')
      .then(res => res.json())
      .then(editorialNotes => {
        setNotes(editorialNotes)
      })
      .catch(err => console.error('編集後記データの読み込みに失敗:', err))
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8DCC6' }}>
      {/* ヘッダー */}
      <header className="py-8 px-4">
        <div className="container mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ホームに戻る
            </Button>
          </Link>
          <div className="text-center">
            <div className="mb-6">
              <img 
                src={osatoProfie} 
                alt="大里P" 
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-primary"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold strong-gothic text-gray-800">
              大里Pの<br />編集後記
            </h1>
          </div>
        </div>
      </header>

      {/* 編集後記一覧 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {notes.length > 0 ? (
            <div className="space-y-8">
              {notes.map((note) => (
                <Card key={note.id} className="hover-bounce">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{note.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
                    <div className="prose max-w-none mb-6">
                      <p className="mb-4 leading-relaxed">
                        {note.excerpt}
                      </p>
                    </div>
                    <Button variant="outline" className="english-text" asChild>
                      <a href={note.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read on Note
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>編集後記を読み込み中...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProducerNotes

