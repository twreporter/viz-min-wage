module.exports = {
  appConfig: {
    url: 'http://twreporter.org/a/min-wage-draft',
    domain: 'twreporter.org',
    expirationDays: 7,
    title: '到了 2018 年才 22K！曾經凍漲十年的基本工資 - 報導者 The Reporter',
    description: '日前基本工資調漲4.72%，將月薪提升到著名的「22K」，但22K夠了嗎？為什麼勞團會前喊出27K？又為什麼韓國能調16%？',
  },
  slideConfig: {
    extraCnt: 2,       // cover + footer => two additional slides
  },
  scrollConfig: {
    offset: 0.75,      // 75% of the window height, let the content of next slide appear earlier
  },
  swipeConfig: {
    threshold: 0.10,    // 10% of the window height
    duration: 450,     // animation duration (ms)
    sDuration: 120,    // shorter animation duration - for the reverse directions (ms)
  },
  debounceTime: {
    window: {
      threshold: 60,
      maxWait: 180,
    },
    scroll: {
      threshold: 30,
      maxWait: 60,
    },
  },
}
