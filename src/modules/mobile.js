/*

data-mmenu'trig'
.open

*/

export class MobMenu {
  constructor(element) {
    this.element = element;
    this.trigger = document.querySelector("[data-mmenu='trig']");
    // console.log("mobile menu!", this.element, this.trigger);

    if (this.element.classList.contains("open")) {
      this.element.classList.remove("open");
    }

    this.state = {
      open: false,
    };

    this.create();
  }
  create() {
    this.trigger.addEventListener("click", () => {
      this.toggle();
    });
  }

  toggle() {
    if (this.state.open) {
      this.element.classList.remove("open");
      this.state.open = false;
    } else {
      this.element.classList.add("open");
      this.state.open = true;
    }
  }
}
