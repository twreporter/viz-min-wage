import { slideConfig } from '../config'
import ImgAmei from '../static/salary-amei-d.svg'
import ImgShufun from '../static/salary-shufun-d.svg'

const coverTitle = '到了 2018 年才 22K！'
const coverSubTitle = '基本工資凍漲十年的真相'
const publishedDate = '2017.8.21'

const slidesContent = [
  {
    key: 'case-amei',
    title: '## 阿美／台中／醫院清潔工',
    text: '「啊我都吃泡麵啦！很難生活啊！所以之前都有同事月底都一直在跟人家借錢啊！甚至有些人借到後來沒辦法還，就直接落跑了！」',
    sideImg: <ImgAmei />,
  },
  {
    key: 'case-shufun',
    title: '## 淑芬／桃園／零食業廠工',
    text: '「我工作24年了，但沒有用，20年都沒調薪，都是跟著基本工資，直到工會爭取才調五百…同事只能瘋狂加班，有的人加到身體都壞了。」',
    sideImg: <ImgShufun />,
  },
  {
    key: 'intro-1',
    title: '',
    text: '## 基本工資是什麼?\n 為什麼我們要在乎基本工資能不能幫助勞工生活呢?',
    sideImg: null,
  },
  {
    key: 'intro-2',
    title: '## 誰讓基本工資養不了家？ ',
    text: '回顧台灣的基本工資變化史，1970到1995年有大幅度的成長，但到了1997到2007間卻出現長達十年的凍漲，' +
    '當時凍漲基本工資的原因包括亞洲金融風暴、企業外移等，許多人認為這是目前基本工資偏低的主因。\n' +
    '然而，並不是每個亞洲國家都選擇以凍漲基本工資來面對風暴。',
    sideImg: null,
  },
  {
    key: 'intro-3',
    title: '## 真的好想贏韓國！',
    text: '若以經濟發展歷程類似的南韓來比較，可以發現南韓的基本工資呈現穩定成長，與台灣的不自然波動大不同，' +
      '甚至在台灣凍漲的十年內一舉超越台灣。' +
      '難道，韓國沒受到亞洲金融風暴波及嗎?',
    sideImg: null,
  },
  {
    key: 'problem-law',
    title: '## 基本工資未完成法制化',
    text: '<p>目前基本工資調整的法源為勞基法第21條與「基本工資審議辦法」。</p>' +
      '<p>而主要依據的「基本工資審議辦法」是行政命令而非法律，對政府的約束力不夠高。</p>' +
      '<p>辦法中明訂的事項也不多，缺乏對決策機制、時程以及對應罰則做明確規範，這也是造就十年凍漲的主因。</p>',
    sideImg: null,
  },
  {
    key: 'problem-agenda',
    title: '## 未明定時程與調整流程',
    text: '<p>辦法僅規範應於第三季進行審議，並未明定每年開會、決議以及新工資生效的時間。</p>' +
      '<p>去年就曾發生資方集體拒絕出席審議會。</p>' +
      '<p>而<u>韓國明確將基本工資審議時間</u>，維持勞資政三方暢通的對話，才有年年調整的結果。</p>',
    sideImg: null,
  },
]

const authorsText = '<p>數據、文字整理 ｜ <span itemprop="author">葉瑜娟</span>、<span itemprop="author">王珣沛</span></p>' +
                    '<p>設計 ｜ <span itemprop="author">黃禹禛</span></p>' +
                    '<p>工程 ｜ <span itemprop="author">王珣沛</span>、<span itemprop="author">黃詩晏</span></p>'


const slideBeginingKey = 'cover'

const slideEndingKey = 'footer'

const slidesCnt = slidesContent.length + slideConfig.extraCnt

export { slidesContent, slidesCnt, coverTitle, coverSubTitle, publishedDate, slideBeginingKey, slideEndingKey, authorsText }
