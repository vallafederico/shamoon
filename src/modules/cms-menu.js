import Tween from "gsap";

/*
- [ ] _Project Menu_
  data-pmenu="trigger" [wrapper]
  data-pmenu="item" [wrapper] (starts hidden)
*/

export class CmsMenu {
  triggers = [...document.querySelector("[data-pmenu=trigger]").children];
  items = [...document.querySelector("[data-pmenu=item]").children];
  current = null;
  constructor() {
    this.create();

    this.triggerWrapper = document.querySelector("[data-pmenu=trigger]");
    this.itemWrapper = document.querySelector("[data-pmenu=item]");
  }

  create() {
    this.triggers.forEach((item, i) => (item.onclick = () => this.toggle(i)));
  }

  destroy() {
    this.triggers.onclick = () => null;
  }

  /** Events */

  toggle(i) {
    if (this.current === i) return;
    if (this.current !== null) {
      this.items[this.current].style.display = "none";
    }

    this.current = i;
    this.items[i].style.display = "block";
  }
}
