import { NavigatorElement } from "./navigator";
import { Router } from "./router";

const firstPageBuilder = (_: any) => { 
    const d = document.createElement("div")
    d.innerText = `first ${_}`
    const p = document.createElement("p")
    p.innerText = '0'
    d.appendChild(p)
    const btn = document.createElement("button")
    btn.innerText = '+'
    btn.addEventListener('click', _ => {
        p.innerText = `${Number(p.innerText) + 1}`
    })
    d.appendChild(btn)
    return d
}

const secondPageBuilder = (_: any) => { 
    const d = document.createElement("div")
    d.innerText = `second ${_}`
    const p = document.createElement("p")
    p.innerText = '0'
    d.appendChild(p)
    const btn = document.createElement("button")
    btn.innerText = '+'
    btn.addEventListener('click', _ => {
        p.innerText = `${Number(p.innerText) + 1}`
    })
    d.appendChild(btn)
    return d
}

const errorBuilder = (_: any) => {
    const d = document.createElement("div")
    d.innerText = `error ${_}`
    return d
}

const map = new Map();
map.set('/', firstPageBuilder);
map.set('/second', secondPageBuilder);
const router = new Router(map, errorBuilder);
const navigatorEl = new NavigatorElement(router, '/')
document.body.appendChild(navigatorEl)

document.getElementById('second-btn')!.addEventListener('click', _ => {
    navigatorEl.push('/second', new Date())
})

document.getElementById('first-btn')!.addEventListener('click', _ => {
    navigatorEl.push('/', new Date())
})


window.addEventListener('popstate', _ => {
    console.log(`Back button pressed ${window.location.href}`)
    console.log(_)
    navigatorEl.pop()
})