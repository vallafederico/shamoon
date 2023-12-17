import "./style/main.css";

import { Dom } from "./modules/dom";
import { Viewport } from "./modules/viewport";
// import { Scroll } from "./modules/scroll";
import { Pages } from "./modules/pages";

class App {
  constructor() {
    this.body = document.querySelector("body");
    this.viewport = new Viewport();

    this.time = 0;

    const ex = getComputedStyle(document.documentElement);
    window.defaults = {
      colors: [
        ex.getPropertyValue("--col--blue"),
        ex.getPropertyValue("--col--darkblue"),
        ex.getPropertyValue("--col--green"),
        ex.getPropertyValue("--col--white"),
      ],
      state: {
        txColor: ex.getPropertyValue("--col--white"),
        accColor: ex.getPropertyValue("--col--green"),
        bgColor: ex.getPropertyValue("--col--blue"),
      },
      systemSlider: [0, 0, 0, 0],
    };

    this.init();
  }

  init() {
    // this.scroll = new Scroll();
    this.pages = new Pages();
    this.dom = new Dom();

    this.initEvents();
    this.render();
  }

  initEvents() {
    // prettier-ignore
    new ResizeObserver((entry) => this.resize(entry[0])).observe(this.body);
  }

  resize({ contentRect }) {
    window.isMobile = contentRect.width <= 768;
    window.isTablet = contentRect.width <= 1024;

    this.viewport?.resize();
    this.dom?.resize();
  }

  render(t) {
    // this.time += 0.1;
    this.scroll?.render(t);
    this.dom?.render();

    window.requestAnimationFrame(this.render.bind(this));
  }

  /* Events */
}

window.app = new App();
