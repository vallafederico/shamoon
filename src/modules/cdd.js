/* Items


*/

export class Cdd {
  current = null;
  constructor(element) {
    // console.log(element);
    this.element = element;
    this.triggers = [...this.element.querySelectorAll(".cdd-trig")];
    this.drops = [...this.element.querySelectorAll(".cdd-drop-w")];
    this.icons = [...this.element.querySelectorAll(".dd-icon")];

    this.create();
  }

  create() {
    this.triggers.forEach((trig, i) => {
      trig.addEventListener("click", (e) => this.toggle(i));
    });
  }

  toggle(i) {
    if (this.drops[i].style.display == "block") {
      // open
      this.drops[i].style.display = "none";
      this.icons[i].querySelector("#arrow").style.display = "none";
      this.icons[i].querySelector("#plus").style.display = "block";
    } else {
      // close
      this.drops[i].style.display = "block";
      this.icons[i].querySelector("#arrow").style.display = "block";
      this.icons[i].querySelector("#plus").style.display = "none";
    }
  }

  destroy() {
    this.triggers.forEach((trig) => {
      trig.removeEventListener("click", this.toggle);
    });
  }
}
