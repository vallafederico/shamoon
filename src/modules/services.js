/*
- [ ] _Services Links_
  data-serv="trig" [wrapper]
  data-serv="item" [wrapper]
*/

export class Services {
  trigger = [...document.querySelectorAll("[data-serv='trig']")];
  items = [...document.querySelectorAll("[data-serv='item']")];
  current = null;

  constructor() {
    // console.log("services", this.trigger, this.items);
    this.create();
  }

  create() {
    this.trigger.forEach((trig, i) => {
      trig.onclick = (e) => this.toggle(i);
    });
  }

  destroy() {
    this.trigger.forEach((trig) => (trig.onclick = null));
  }

  toggle(i) {
    const item = this.items.filter(
      (item) => item.dataset.id === this.trigger[i].dataset.id
    )[0];

    if (item.length < 1) return;

    this.items.forEach((it) => (it.style.display = "none"));

    if (this.current !== i) item.style.display = "block";

    this.current = i;

    // if (item.style.display == "none" || item.style.display == "") {
    //   item.style.display = "block";
    // } else {
    //   item.style.display = "none";
    // }

    // console.log(item);
  }
}
