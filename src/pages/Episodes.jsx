import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ArrowLeft, Play, Calendar, Clock, ExternalLink } from 'lucide-react'
import { Link } from '../Router.jsx'
import episodeThumbnail from '/src/assets/episode_thumbnail_sample.png'

const Episodes = () => {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // JSONファイルからエピソードデータを取得
    fetch('/data/episodes.json')
      .then(res => res.json())
      .then(data => {
        setEpisodes(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('エピソードデータの読み込みに失敗:', err)
        setLoading(false)
      })
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
          <h1 className="text-4xl md:text-6xl font-bold strong-gothic text-gray-800 text-center english-text">
            All Episodes
          </h1>
        </div>
      </header>

      {/* エピソード一覧 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg">エピソードを読み込み中...</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {episodes.map((episode) => (
                <Card key={episode.id} className="hover-bounce">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      <div>
                        <img
                          src={episode.thumbnail || episodeThumbnail}
                          alt={episode.title}
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">{episode.title}</h2>
                        <div className="flex items-center gap-4 text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(episode.date).toLocaleDateString('ja-JP')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{episode.duration}</span>
                          </div>
                        </div>
                        <p className="mb-6 leading-relaxed">{episode.description}</p>
                        <div className="flex flex-wrap gap-4">
                          {episode.links.spotify && (
                            <Button
                              className="creative-button english-text"
                              asChild
                            >
                              <a href={episode.links.spotify} target="_blank" rel="noopener noreferrer">
                                <Play className="w-4 h-4 mr-2" />
                                Spotify
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </a>
                            </Button>
                          )}
                          {episode.links.apple && (
                            <Button
                              className="creative-button english-text"
                              asChild
                            >
                              <a href={episode.links.apple} target="_blank" rel="noopener noreferrer">
                                <Play className="w-4 h-4 mr-2" />
                                Apple Podcasts
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </a>
                            </Button>
                          )}
                          {episode.links.youtube && (
                            <Button
                              className="creative-button english-text"
                              asChild
                            >
                              <a href={episode.links.youtube} target="_blank" rel="noopener noreferrer">
                                <Play className="w-4 h-4 mr-2" />
                                YouTube
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Episodes

