// import { Alpha } from "./animation/alpha";

import { Nav } from "./nav.js";
import { Preloader } from "./preloader.js";
import { Clock, Clocks } from "./clock.js";
import { CmsMenu } from "./cms-menu.js";
import { Cdd } from "./cdd.js";
import { System } from "./system.js";
import { Services } from "./services.js";
import { Preview } from "./preview.js";
import { Dropdown } from "./dropdown.js";
import { MobMenu } from "./mobile.js";
import { Scramble } from "./animation/scramble.js";

import Tween from "gsap";

export class Dom {
  constructor() {
    this.wrap = document.querySelector(".w");
    this.page = document.querySelector("[data-taxi]");
    Tween.set(this.wrap, { autoAlpha: 0 });

    if (document.querySelector("[data-loader]"))
      this.preloader = new Preloader();

    // animation nav
    this.scrambles = [...this.wrap.querySelectorAll("[data-a='sc']")].map(
      (el) => {
        return new Scramble({ element: el });
      }
    );

    this.createOnce();
    this.create();
    this.animateFirstIn();
  }

  resize() {}

  render(t) {
    // this.track?.render();
  }

  createOnce() {
    this.nav = new Nav(document.querySelector("[data-cdnav]"));
    this.clock = new Clocks();
    this.preview = new Preview();
  }

  create() {
    // console.log("test");
    if (this.wrap.querySelector("[data-dd='w']")) {
      this.dropdowns = [...this.wrap.querySelectorAll("[data-dd='w']")].map(
        (el) => new Dropdown({ element: el })
      );
    }

    if (this.wrap.querySelector("[data-pmenu]")) {
      this.cmsMenu = new CmsMenu();
    } else this.cmsMenu = null;

    if (this.wrap.querySelector("[data-servWrap]")) {
      this.services = [...this.wrap.querySelectorAll("[data-servWrap]")].map(
        (el) => {
          return new Services(el);
        }
      );
    } else this.services = null;

    if (this.wrap.querySelector("[data-cdd]")) {
      this.cdds = [...this.wrap.querySelectorAll("[data-cdd]")].map((el) => {
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

    // aniamtion
    this.pagescrambles = [...this.wrap.querySelectorAll("[data-a='scp']")].map(
      (el) => {
        return new Scramble({ element: el });
      }
    );

    this.obsscramble = [...this.wrap.querySelectorAll("[data-a='sco']")].map(
      (el) => {
        return new Scramble({ element: el, observed: true });
      }
    );

    // start
    this.start();
  }

  start() {
    this.pagescrambles.forEach((scramble) => scramble.animateIn());
  }

  destroy() {
    this.preview?.destroy();
    this.cmsMenu?.destroy();
    this.system?.destroy();
    this.services?.forEach((service) => service.destroy());
    this.cdds?.forEach((cdd) => cdd.destroy());
    this.dropdowns?.forEach((dd) => dd.destroy());
    this.obsscramble?.forEach((scramble) => scramble.destroy());
  }

  /* --  Animation */
  animateFirstIn() {
    Tween.to(this.wrap, {
      autoAlpha: 1,
      duration: 0.2,
      delay: 0.1,
      ease: "power2.in",
    });

    this.scrambles.forEach((scramble) => {
      scramble.animateIn();
    });
  }

  /* --  Pages */
  transitionOut(page) {
    this.destroy();

    // * transition page out
    Tween.to(this.page, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "steos(2)",
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 150);
    });
  }

  transitionIn(page) {
    this.create();

    // * transition page in
    Tween.to(this.page, {
      autoAlpha: 1,
      duration: 0.6,
      ease: "steps(6)",
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
}
