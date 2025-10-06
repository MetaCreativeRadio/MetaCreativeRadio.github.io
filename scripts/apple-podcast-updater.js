#!/usr/bin/env node

/**
 * Apple Podcasts URL Auto-Updater
 * iTunes Lookup APIを使用してエピソードURLを自動取得・更新
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 設定
const APPLE_PODCAST_ID = '1842051516';
const EPISODES_FILE = path.join(__dirname, '../public/data/episodes.json');
const ITUNES_API_URL = `https://itunes.apple.com/lookup?id=${APPLE_PODCAST_ID}&media=podcast&entity=podcastEpisode&limit=100`;

/**
 * HTTPSリクエストのPromiseラッパー
 */
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * タイトルを正規化（比較用）
 */
function normalizeTitle(title) {
  return title
    .replace(/\s+/g, '')
    .replace(/[「」『』【】()（）]/g, '')
    .toLowerCase();
}

/**
 * iTunes APIからエピソード情報を取得
 */
async function fetchApplePodcastEpisodes() {
  console.log('🍎 Apple Podcasts API からエピソード情報を取得中...');
  console.log(`🔗 URL: ${ITUNES_API_URL}`);

  const data = await httpsGet(ITUNES_API_URL);

  if (!data.results || data.results.length === 0) {
    throw new Error('エピソード情報が取得できませんでした');
  }

  // エピソードのみ抽出（wrapperType: "podcastEpisode"）
  const episodes = data.results.filter(item => item.wrapperType === 'podcastEpisode');

  console.log(`✅ ${episodes.length}個のエピソードを取得しました`);

  return episodes.map(ep => ({
    title: ep.trackName,
    url: ep.trackViewUrl,
    trackId: ep.trackId,
    releaseDate: ep.releaseDate
  }));
}

/**
 * エピソードデータにApple Podcasts URLを追加
 */
async function updateEpisodesWithAppleUrls() {
  try {
    // 既存のエピソードデータを読み込み
    const episodesData = JSON.parse(fs.readFileSync(EPISODES_FILE, 'utf-8'));

    // Apple Podcasts APIからエピソード情報を取得
    const appleEpisodes = await fetchApplePodcastEpisodes();

    let updateCount = 0;

    // タイトルでマッチング
    episodesData.forEach(episode => {
      const normalizedLocalTitle = normalizeTitle(episode.title);

      const matchedAppleEpisode = appleEpisodes.find(apEp => {
        const normalizedAppleTitle = normalizeTitle(apEp.title);
        return normalizedAppleTitle === normalizedLocalTitle;
      });

      if (matchedAppleEpisode) {
        // Apple Podcasts URLが未設定または異なる場合のみ更新
        if (!episode.links.apple || episode.links.apple !== matchedAppleEpisode.url) {
          console.log(`\n🔄 更新: ${episode.title}`);
          console.log(`   🔗 Apple URL: ${matchedAppleEpisode.url}`);
          episode.links.apple = matchedAppleEpisode.url;
          updateCount++;
        }
      } else {
        console.log(`\n⚠️  マッチなし: ${episode.title}`);
      }
    });

    if (updateCount > 0) {
      // ファイルに書き戻し
      fs.writeFileSync(
        EPISODES_FILE,
        JSON.stringify(episodesData, null, 2),
        'utf-8'
      );

      console.log(`\n✅ ${updateCount}個のエピソードにApple Podcasts URLを追加しました！`);
    } else {
      console.log('\n📭 更新対象のエピソードはありませんでした');
    }

    return updateCount;

  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    throw error;
  }
}

// メイン実行
if (import.meta.url === `file://${process.argv[1]}`) {
  updateEpisodesWithAppleUrls()
    .then(count => {
      process.exit(count > 0 ? 0 : 1);
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

export { updateEpisodesWithAppleUrls };
