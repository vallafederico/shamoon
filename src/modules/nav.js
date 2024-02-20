import { Cdd } from "./cdd";

export class Nav extends Cdd {
  current = null;

  constructor(element) {
    super(element);

    this.links = [...this.element.querySelectorAll(".cdd-link")];
    // initial setup

    this.links.forEach((link, i) => {
      if (link.classList.contains("current")) link.classList.remove("current");
    });

    this.addEvents();
  }

  addEvents() {
    this.links.forEach((link, i) => {
      link.addEventListener("click", (e) => this.setCurrent(i));
    });
  }

  setCurrent(i) {
    // console.log("set current");
    if (this.current !== null)
      this.links[this.current].classList.remove("current");

    this.current = i;
    this.links[this.current].classList.add("current");
  }
}
