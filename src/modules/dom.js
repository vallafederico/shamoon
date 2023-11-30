// import { Alpha } from "./animation/alpha";

import { Nav } from "./nav.js";
import { Preloader } from "./preloader.js";
import { Clock } from "./clock.js";

import { CmsMenu } from "./cms-menu.js";
import { Cdd } from "./cdd.js";
import { System } from "./system.js";
import { Services } from "./services.js";
import { Preview } from "./preview.js";

import { MobMenu } from "./mobile.js";

export class Dom {
  constructor() {
    this.wrap = document.querySelector("[data-taxi]");

    // console.log(document.querySelector("[data-loader]"));
    if (document.querySelector("[data-loader]"))
      this.preloader = new Preloader();

    this.createOnce();
    this.create();
  }

  resize() {}

  render(t) {
    // this.track?.render();
  }

  createOnce() {
    this.nav = new Nav(document.querySelector("[data-cdnav]"));
    this.clock = new Clock();
    this.preview = new Preview();
  }

  create() {
    if (this.wrap.querySelector("[data-pmenu]")) {
      this.cmsMenu = new CmsMenu();
    } else this.cmsMenu = null;

    if (this.wrap.querySelector("[data-serv]")) {
      this.services = new Services();
    } else this.services = null;

    if (this.wrap.querySelector("[data-cdd]")) {
      this.cdds = [...this.wrap.querySelectorAll("[data-cdd]")].map((el) => {
        // console.log(el);
        return new Cdd(el);
      });
    } else this.cdds = null;

    if (this.wrap.querySelector("[data-system]")) {
      this.system = new System(this.wrap.querySelector("[data-system]"));
    } else this.system = null;

    if (document.querySelector("[data-mmenu]")) {
      this.mmenu = new MobMenu(document.querySelector("[data-mmenu]"));
    }

    this.preview.create();

    // start
    this.start();
  }

  start() {}

  destroy() {
    this.preview?.destroy();
    this.cmsMenu?.destroy();
    this.services?.destroy();
    this.system?.destroy();
    this.cdds?.forEach((cdd) => {
      cdd.destroy();
    });
  }

  /* --  Pages */
  transitionOut(page) {
    this.destroy();
    // console.log("DOM::transitionOut", page);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

  transitionIn(page) {
    this.create();
    // console.log("DOM::transitionIn", page);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
}
