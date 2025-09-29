import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Twitter, ExternalLink } from 'lucide-react'
import ContactForm from './components/ContactForm.jsx'
import Navigation from './components/Navigation.jsx'
import { Link } from './Router.jsx'

// 画像のインポート
import mainLogo from '/src/assets/MetaCreative_Radio.png'
import oyaProfile from '/src/assets/T02EJJV8DGR-U02EVK1Q8FJ-00771b167d7c-512.png'
import tamkaiProfile from '/src/assets/pasted_file_UTcbo8_image.png'
import episodeThumbnail from '/src/assets/episode_thumbnail_sample.png'
import osatoProfile from '/src/assets/osato_profile.png'

const HomePage = () => {
  const [latestEpisode, setLatestEpisode] = useState(null)
  const [latestEditorialNote, setLatestEditorialNote] = useState(null)

  useEffect(() => {
    // JSONファイルから最新エピソードを取得
    fetch('/data/episodes.json')
      .then(res => res.json())
      .then(episodes => {
        if (episodes.length > 0) {
          setLatestEpisode(episodes[0]) // 最新エピソード
        }
      })
      .catch(err => console.error('エピソードデータの読み込みに失敗:', err))

    // JSONファイルから最新編集後記を取得
    fetch('/data/editorial-notes.json')
      .then(res => res.json())
      .then(notes => {
        if (notes.length > 0) {
          setLatestEditorialNote(notes[0]) // 最新編集後記
        }
      })
      .catch(err => console.error('編集後記データの読み込みに失敗:', err))
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8DCC6' }}>
      <Navigation />

      {/* ヘッダー */}
      <header className="py-8 px-4">
        <div className="container mx-auto text-center">
          <img
            src={mainLogo}
            alt="タムカイ、おぴたんのメタクリエイティブラジオ"
            className="mx-auto max-w-md w-full h-auto hover-bounce"
          />
        </div>
      </header>

      {/* ファーストビュー */}
      <section className="py-12 px-4 text-center spray-effect">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold strong-gothic text-gray-800 mb-8">
            これからの<br />クリエイティブを<br />メタな視点で語ろう
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 english-text">
            毎週月曜AM更新 | 30-40分
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-left">
              タムカイ・おぴたんのメタクリエイティブ・レイディオ、通称「メタクリラジオ」<br />
              この番組は、いわゆる「クリエイティブ」を仕事にしてきた、元NAKEDで空間演出が得意なおぴたんこと大屋友紀雄と株式会社AFFLATUS代表/富士通株式会社デザインフェローでラクガキライフコーチのタムカイことタムラカイが、これまでの人生で磨いてきたアンテナと感性とルサンチマンを総動員して、「これからクリエイティブ」についてメタに考え、もがき、遊ぶ、実験ラジオショーです
            </p>
          </div>
        </div>
      </section>

      {/* 最新エピソード */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold graffiti-text text-center mb-12 english-text">
            Latest Episode
          </h2>
          {latestEpisode ? (
            <Card className="max-w-4xl mx-auto hover-bounce">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <img
                      src={latestEpisode.thumbnail || episodeThumbnail}
                      alt="最新エピソード"
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {latestEpisode.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {latestEpisode.date}配信
                    </p>
                    <p className="mb-8 leading-relaxed">
                      {latestEpisode.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {latestEpisode.links?.spotify && (
                        <Button className="creative-button english-text" asChild>
                          <a href={latestEpisode.links.spotify} target="_blank" rel="noopener noreferrer">
                            Spotify
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                      {latestEpisode.links?.apple && (
                        <Button className="creative-button english-text" asChild>
                          <a href={latestEpisode.links.apple} target="_blank" rel="noopener noreferrer">
                            Apple Podcasts
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                      {latestEpisode.links?.youtube && (
                        <Button className="creative-button english-text" asChild>
                          <a href={latestEpisode.links.youtube} target="_blank" rel="noopener noreferrer">
                            YouTube
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                      {latestEpisode.links?.amazon && (
                        <Button className="creative-button english-text" asChild>
                          <a href={latestEpisode.links.amazon} target="_blank" rel="noopener noreferrer">
                            Amazon
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center">
              <p>エピソード情報を読み込み中...</p>
            </div>
          )}
        </div>
      </section>

      {/* 出演者プロフィール */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold graffiti-text text-center mb-12 english-text">
            Host Profiles
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* 大屋友紀雄さん */}
            <Card className="hover-bounce">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <img 
                    src={oyaProfile} 
                    alt="大屋友紀雄" 
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-primary"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">大屋友紀雄</h3>
                <p className="text-accent font-semibold mb-4 english-text">@opi</p>
                <div className="text-left space-y-3">
                  <p className="font-semibold">元NAKED Inc. 創業メンバー</p>
                  <p className="font-semibold">現在：株式会社FULL 代表</p>
                  <p className="text-sm leading-relaxed">
                    1997年、村松亮太郎らとともにNAKED Inc.を設立。東京駅の3Dプロジェクションマッピング『TOKYO HIKARI VISION』をはじめ、空間全体を演出するプロジェクションマッピングや映像技術で国内屈指のクリエイティブを誇る。コンテンツプロデュース/クリエイティブ・ディレクションを中心に活動。
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="english-text"
                    onClick={() => window.open('https://x.com/opi', '_blank')}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    @opi
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* タムラカイさん */}
            <Card className="hover-bounce">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <img 
                    src={tamkaiProfile} 
                    alt="タムラカイ" 
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-primary"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">タムラカイ（タムカイ）</h3>
                <p className="text-accent font-semibold mb-4 english-text">@tamkai</p>
                <div className="text-left space-y-3">
                  <p className="font-semibold">株式会社AFFLATUS 代表</p>
                  <p className="font-semibold">富士通株式会社 デザインフェロー</p>
                  <p className="text-sm leading-relaxed">
                    「世界の創造性のレベルを1つあげる」をミッションとして活動。ラクガキコーチ・グラフィックカタリストとして、企業・自治体向けに人材育成、チームビルディング、組織マネジメントなどの講演・講座を行う。富士通の全社変革プロジェクト「フジトラ」にも参画。
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="english-text"
                    onClick={() => window.open('https://x.com/tamkai', '_blank')}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    @tamkai
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 大里プロデューサーの編集後記 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold graffiti-text text-center mb-12 english-text">
            Producer's Note
          </h2>
          <Card className="hover-bounce">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6 items-start">
                {/* 大里Pのプロフィール画像 */}
                <div className="md:col-span-1 text-center">
                  <img
                    src={osatoProfile}
                    alt="大里P"
                    className="w-24 h-24 mx-auto rounded-full object-cover border-3 border-primary mb-3"
                  />
                  <p className="text-sm font-semibold text-gray-800">大里P</p>
                </div>

                {/* メインコンテンツ */}
                <div className="md:col-span-3">
                  <h3 className="text-xl font-bold mb-4">大里Pの編集後記</h3>
                  <p className="text-muted-foreground mb-6">
                    元大手出版社から大手SaaSに転職したばかりの大里Pが、毎回番組収録後の気づきやトピックをNOTEにまとめています。
                  </p>
                  {latestEditorialNote ? (
                    <div className="border-l-4 border-primary pl-6 mb-6">
                      <h4 className="font-semibold mb-2">最新記事：{latestEditorialNote.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {latestEditorialNote.date}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {latestEditorialNote.excerpt.replace(/続きをみる$/, '')}
                        <a
                          href={latestEditorialNote.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          続きをみる
                        </a>
                      </p>
                    </div>
                  ) : (
                    <div className="border-l-4 border-primary pl-6 mb-6">
                      <h4 className="font-semibold mb-2">編集後記を読み込み中...</h4>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-4">
                    {latestEditorialNote && (
                      <Button variant="outline" className="english-text" asChild>
                        <a href={latestEditorialNote.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Read on Note
                        </a>
                      </Button>
                    )}
                    <Link to="/producer-notes">
                      <Button variant="outline" className="english-text">
                        Past Notes
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 質問・リクエストフォーム */}
      <section id="contact" className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <ContactForm />
        </div>
      </section>

      {/* フッター */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <img 
              src={mainLogo} 
              alt="タムカイ、おぴたんのメタクリエイティブラジオ" 
              className="mx-auto max-w-xs w-full h-auto opacity-50"
            />
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <Button variant="ghost" size="sm" className="english-text">
              <Twitter className="w-4 h-4 mr-2" />
              @tamkai
            </Button>
            <Button variant="ghost" size="sm" className="english-text">
              <Twitter className="w-4 h-4 mr-2" />
              @opi
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Tamkai & Opi's MetaCreative Radio
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

