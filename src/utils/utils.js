export function loadFn (fn) {
  if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', e => {
      console.log(e.state.current)
      e.state.current === '/' ? fn(false) : console.log('没有回退到首页')
    }, false)
  }
}

export function destroyFn (fn) {
  console.log(fn)
  window.removeEventListener("popstate", fn, false)
}

export function getRandomPic () {
  const rans = [-100, -50, 0, 50, 100]
  const randomIndex = (num) => Math.floor(num * rans.length)
  const randomLength = (num) => 300 + rans[randomIndex(num)]
  const baseUrl = 'https://picsum.photos'
  const width = randomLength(Math.random())
  const height = randomLength(Math.random())
  const random = Math.random().toString(16).slice(2, 8)
  return {
    url: `${baseUrl}/${width}/${height}`,
    width,
    height
  }
}

export function getScrollTop (element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
  }

  return element.scrollTop;
}

export function formatDate (date) {
  return new Date(date).toLocaleDateString()
}