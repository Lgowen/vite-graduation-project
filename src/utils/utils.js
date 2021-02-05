export function loadFn(fn) {
    if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL)
        window.addEventListener('popstate', e => { 
           console.log(e.state.current)
           e.state.current === '/' ? fn(false) : console.log('没有回退到首页')
        },  false)
    }
}

export function destroyFn(fn) {
    console.log(fn)
    window.removeEventListener("popstate", fn, false)
}