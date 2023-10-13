(() => {
  // src/navigator.ts
  var NavigatorElement = class extends HTMLElement {
    router;
    constructor(router2, initialRoute) {
      super();
      this.router = router2;
      this.pushAndReplace(initialRoute, /* @__PURE__ */ new Date());
    }
    builder(routeName, _) {
      const route = this.router.map.get(routeName);
      if (route) {
        try {
          return route(_);
        } catch (err) {
          return this.router.errorBuilder(`Route Build Error ${routeName}: ${err}`);
        }
      } else {
        return this.router.errorBuilder(`Route Not Found ${routeName}`);
      }
    }
    push(routeName, _) {
      const el = this.builder(routeName, _);
      const currentEl = this.lastElementChild;
      if (currentEl) {
        currentEl.style.display = "none";
      }
      this.appendChild(el);
      const state = {
        level: 0,
        data: _
      };
      const prevState = history.state;
      if (prevState && "level" in prevState && typeof prevState.level === "number") {
        state.level = prevState.level + 1;
      }
      window.history.pushState(state, "", routeName);
    }
    pop() {
      const state = window.history.state;
      console.log(state);
      if (this.lastChild) {
        this.removeChild(this.lastChild);
      }
      if (this.lastElementChild) {
        this.lastElementChild.style.display = "block";
      }
    }
    pushAndReplace(routeName, _) {
      const el = this.builder(routeName, _);
      this.replaceChildren(el);
      const state = {
        level: 0,
        data: _
      };
      const prevState = history.state;
      if (prevState && "level" in prevState && typeof prevState.level === "number") {
        state.level = prevState.level;
      }
      window.history.replaceState(state, "", routeName);
    }
    popAndReplace(routeName, _) {
    }
  };
  customElements.define("navigator-element", NavigatorElement);

  // src/router.ts
  var Router = class {
    map;
    errorBuilder;
    constructor(map2, errorBuilder2) {
      this.map = map2;
      this.errorBuilder = errorBuilder2;
    }
  };

  // src/index.ts
  var firstPageBuilder = (_) => {
    const d = document.createElement("div");
    d.innerText = `first ${_}`;
    const p = document.createElement("p");
    p.innerText = "0";
    d.appendChild(p);
    const btn = document.createElement("button");
    btn.innerText = "+";
    btn.addEventListener("click", (_2) => {
      p.innerText = `${Number(p.innerText) + 1}`;
    });
    d.appendChild(btn);
    return d;
  };
  var secondPageBuilder = (_) => {
    const d = document.createElement("div");
    d.innerText = `second ${_}`;
    const p = document.createElement("p");
    p.innerText = "0";
    d.appendChild(p);
    const btn = document.createElement("button");
    btn.innerText = "+";
    btn.addEventListener("click", (_2) => {
      p.innerText = `${Number(p.innerText) + 1}`;
    });
    d.appendChild(btn);
    return d;
  };
  var errorBuilder = (_) => {
    const d = document.createElement("div");
    d.innerText = `error ${_}`;
    return d;
  };
  var map = /* @__PURE__ */ new Map();
  map.set("/", firstPageBuilder);
  map.set("/second", secondPageBuilder);
  var router = new Router(map, errorBuilder);
  var navigatorEl = new NavigatorElement(router, "/");
  document.body.appendChild(navigatorEl);
  document.getElementById("second-btn").addEventListener("click", (_) => {
    navigatorEl.push("/second", /* @__PURE__ */ new Date());
  });
  document.getElementById("first-btn").addEventListener("click", (_) => {
    navigatorEl.push("/", /* @__PURE__ */ new Date());
  });
  window.addEventListener("popstate", (_) => {
    console.log(`Back button pressed ${window.location.href}`);
    console.log(_);
    navigatorEl.pop();
  });
})();
