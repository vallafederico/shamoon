import { Text } from "./animation/text";
// import { Track } from "../util/track";
// import { Alpha } from "./animation/alpha";

import { CmsMenu } from "./cms-menu.js";

export class Dom {
  constructor() {
    this.create();
  }

  resize() {}

  render(t) {
    // this.track?.render();
  }

  create() {
    if (document.querySelector("[data-pmenu]")) {
      this.cmsMenu = new CmsMenu();
    } else this.cmsMenu = null;

    // start
    this.start();
  }

  start() {}

  destroy() {
    this.cmsMenu?.destroy();
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
