export type RouteBuilder = (_: any) => HTMLElement

export class Router {
    map: Map<string, RouteBuilder>
    errorBuilder: RouteBuilder
    constructor(map: Map<string, RouteBuilder>, errorBuilder: RouteBuilder) {
        this.map = map
        this.errorBuilder = errorBuilder
    }
}
