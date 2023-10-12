import { Router } from "./router"

export interface State {
    level: number,
    data: any,
}

export class NavigatorElement extends HTMLElement {
    router: Router

    constructor(router: Router, initialRoute: string) {
        super()
        this.router = router
        this.pushAndReplace(initialRoute, new Date())
    }
    builder(routeName: string, _?: any) {
        const route = this.router.map.get(routeName)
        if (route) {
            try {
                return route(_)
            } catch (err) {
                return this.router.errorBuilder(`Route Build Error ${routeName}: ${err}`)
            }
        } else {
            return this.router.errorBuilder(`Route Not Found ${routeName}`)
        }

    }

    push(routeName: string, _?: any) {
        const el = this.builder(routeName, _)
        // this.replaceChildren(el)
        const currentEl = this.lastElementChild as HTMLElement | undefined
        if (currentEl) {
            currentEl!.style.display = "none"
        }
        this.appendChild(el)
        const state: State = {
            level: 0,
            data: _,
        }
        const prevState = history.state
        if (prevState && 'level' in prevState && typeof prevState.level === 'number') {
            state.level = prevState.level + 1
        }
        window.history.pushState(state, '', routeName)
    }

    pop() { 
        const state = window.history.state as State
        console.log(state)
        if (this.lastChild) {
            this.removeChild(this.lastChild!)
        }
        if (this.lastElementChild) {
            (this.lastElementChild as HTMLElement).style.display = "block"
        }
    }

    pushAndReplace(routeName: string, _?: any) { 
        const el = this.builder(routeName, _)
        this.replaceChildren(el)
        const state: State = {
            level: 0,
            data: _,
        }
        const prevState = history.state
        if (prevState && 'level' in prevState && typeof prevState.level === 'number') {
            state.level = prevState.level
        }
        window.history.replaceState(state, '', routeName)
    }

    popAndReplace(routeName: string, _?: any) { }

}

customElements.define('navigator-element', NavigatorElement)