import gsap from "gsap";
import { Observe } from "../../util/observe";

import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(ScrambleTextPlugin);

const chars1 = "▎▌▊▉█";
const chars2 = "▖▗ ▘ ▙ ▚ ▛ ▜ ▝ ▞ ▟";
const chars3 = "▎▎▎▎▎▎";

export class Scramble {
  constructor(
    { element, observed } = {
      observed: false,
    }
  ) {
    // super({ element });

    this.animated = element;
    this.text = element.textContent;
    // console.log(element.textContent.length);

    this.anim = {
      duration: 1.2,
      ease: "expo.out",
      delay: 0.1,
      stagger: {
        each: 0.05,
        from: "start",
      },
    };

    this.params = {
      in: {
        autoAlpha: 1,
      },
      out: {
        autoAlpha: 0,
      },
    };

    if (observed) {
      this.obs = new Observe({
        element: element,
        config: {
          autoStart: true,
        },
        cb: {
          in: () => this.animateIn(),
          out: () => this.setOut(),
        },
      });
    }

    this.setOut();
  }

  destroy() {
    if (this.obs) this.obs.stop();
  }

  animateIn(delay = 0.1) {
    if (this.animation) this.animation.kill();

    this.animation = gsap.to(this.animated, {
      ...this.params.in,
      ...this.anim,
    });

    if (this.scAnimation) this.scAnimation.kill();
    this.scAnimation = gsap.to(this.animated, {
      duration: 0.9 + Math.random() * 0.6 + this.text.length * 0.01,
      delay: delay,
      scrambleText: {
        chars: "lowerCase",
        revealDelay: 0,
        text: this.text,
        speed: 0.2,
        delimiter: "",
        rightToLeft: false,
      },
    });
  }

  setOut() {
    if (this.animation) this.animation.kill();
    gsap.set(this.animated, { ...this.params.out });
  }
}
