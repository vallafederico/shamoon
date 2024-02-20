/*
- [ ] _Services Links_
  data-serv="trig" [wrapper]
  data-serv="item" [wrapper]
*/

export class Services {
  current = null;

  constructor(unit) {
    this.unit = unit;
    this.trigger = [...unit.querySelectorAll("[data-serv='trig']")];
    this.items = [...unit.querySelectorAll("[data-serv='item']")];
    this.create();

    // console.log("services", this.unit, this.trigger, this.items);
  }

  create() {
    this.trigger.forEach((trig, i) => {
      trig.onclick = (e) => this.toggle(i);
    });

    this.toggle(0);
  }

  destroy() {
    this.trigger.forEach((trig) => (trig.onclick = null));
  }

  toggle(i) {
    const item = this.items.filter(
      (item) => item.dataset.id === this.trigger[i].dataset.id
    )[0];

    // console.log(this.current);

    if (item.length < 1) return;

    this.items.forEach((it) => (it.style.display = "none"));

    this.trigger.forEach((trig) => trig.classList.remove("active"));

    if (this.current !== i) {
      item.style.display = "block";
      this.trigger[i].classList.add("active");
    }

    this.current = i;
  }
}
