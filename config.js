module.exports = {
  appConfig: {
    url: 'http://testtest.twreporter.org:3000',
    domain: 'twreporter.org',
    expirationDays: 7,
    title: '專案名稱 - 報導者 The Reporter',
    description: '專案簡介專案簡介專案簡介',
  },
  slideConfig: {
    totalCnt: 5,
  },
  scrollConfig: {
    offset: 0.42,      // 42% of the window height, let the content of next slide appear earlier
  },
  swipeConfig: {
    threshold: 0.11,    // 11% of the window height
    duration: 400,     // animation duration (ms)
    sDuration: 100,    // shorter animation duration - for the reverse directions (ms)
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
