/* Items


*/

export class Cdd {
  current = null;
  constructor(element) {
    this.element = element;
    this.triggers = [...this.element.querySelectorAll(".cdd-trig")];
    this.drops = [...this.element.querySelectorAll(".cdd-drop-w")];
    this.icons = [...this.element.querySelectorAll(".dd-icon")];

    this.create();
  }

  create() {
    this.triggers.forEach((trig, i) => {
      if (trig.dataset.mod === "open") {
        this.toggle(i);
      }

      trig.addEventListener("click", (e) => {
        this.toggle(i);
      });
    });

    if (this.element.dataset.cdd === "open") this.toggle(0);
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
