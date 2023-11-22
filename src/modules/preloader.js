import Tween from "gsap";

/*
- [ ] _Preloader_
  data-loader="w"
  data-loader="bar"

*/

export class Preloader {
  wrapper = document.querySelector('[data-loader="w"]');
  bar = [...document.querySelector('[data-loader="bar"]').children];
  constructor() {
    this.current = 0;
    console.log("preloadr");

    this.run();
  }

  run() {
    this.interval = setInterval(() => {
      this.current++;
      if (this.current > this.bar.length - 1) {
        this.kill();
        return;
      }

      this.bar[this.current].classList.add("loaded");
    }, 100);
  }

  kill() {
    clearInterval(this.interval);
    Tween.to(this.wrapper, {
      autoAlpha: 0,
      duration: 0.2,
      onComplete: () => {
        this.wrapper.remove();
      },
    });
  }
}
