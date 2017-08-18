import { slideConfig } from '../config'

const coverTitle = '22K夠用嗎？基本工資 12 年凍漲的真相'

const slidesContent = [
  {
    key: 'intro-1',
    text: '## 基本工資是什麼?\n 為什麼我們要在乎基本工資能不能幫助勞工生活呢?',
    sideImg: null,
  },
  {
    key: 'intro-2',
    text: '## 誰讓基本工資養不了家？ \n' +
    '回顧台灣的基本工資變化史，1970到1995年有大幅度的成長，但到了1997到2007間卻出現長達十年的凍漲，' +
    '當時凍漲基本工資的原因包括亞洲金融風暴、企業外移等，許多人認為這是目前基本工資偏低的主因。\n' +
    '然而，並不是每個亞洲國家都選擇以凍漲基本工資來面對風暴。',
    sideImg: null,
  },
  {
    key: 'intro-3',
    text: '## 真的好想贏韓國！ \n' +
      '若以經濟發展歷程類似的南韓來比較，可以發現南韓的基本工資呈現穩定成長，與台灣的不自然波動大不同，' +
      '甚至在台灣凍漲的十年內一舉超越台灣。' +
      '難道，韓國沒受到亞洲金融風暴波及嗎?',
    sideImg: null,
  },
  {
    key: 'problem-law',
    text: '## 基本工資未完成法制化 \n' +
      '<p>目前基本工資調整的法源為勞基法第21條與「基本工資審議辦法」。</p>' +
      '<p>而主要依據的「基本工資審議辦法」是行政命令而非法律，對政府的約束力不夠高。</p>' +
      '<p>辦法中明訂的事項也不多，缺乏對決策機制、時程以及對應罰則做明確規範，這也是造就十年凍漲的主因。</p>',
    sideImg: null,
  },
  {
    key: 'problem-agenda',
    text: '## 未明定時程與調整流程 \n' +
      '<p>辦法僅規範應於第三季進行審議，並未明定每年開會、決議以及新工資生效的時間。</p>' +
      '<p>為避免流會，政府常需要拜託資方出席審議委員會。去年就曾發生資方集體拒絕出席審議會。</p>' +
      '<p>而<u>韓國明確將基本工資審議時間、參與者權責明訂於法令中，若一定時間內未完成審議便算違法</u>，維持勞資政三方暢通的對話，才有年年調整的結果。</p>',
    sideImg: null,
  },
]

const slideBeginingKey = 'cover'

const slideEndingKey = 'footer'

const slidesCnt = slidesContent.length + slideConfig.extraCnt

export { slidesContent, slidesCnt, coverTitle, slideBeginingKey, slideEndingKey }
