import Tween from "gsap";

/* -- DATA
- [x] Colors x4
- [ ] Image upload
- [ ] Font Switch
- [ ] Reset Button

(wf vars)
  --col--white: white;
  --col--green: #8fff00;
  --col--blue: #0c31e9;
  --col--darkblue: #092eaf;
  --col--tr: rgba(255, 255, 255, 0);
  --scrollbar--sc-width: 5px;

*/
const colors100 = [
  "",
  "#FF0000",
  "#FF1900",
  "#FF3300",
  "#FF4D00",
  "#FF6600",
  "#FF8000",
  "#FF9900",
  "#FFB300",
  "#FFCC00",
  "#FFE600",
  "#FFFF00",
  "#E6FF00",
  "#CCFF00",
  "#B3FF00",
  "#99FF00",
  "#80FF00",
  "#66FF00",
  "#4DFF00",
  "#33FF00",
  "#19FF00",
  "#00FF00",
  "#00FF19",
  "#00FF33",
  "#00FF4D",
  "#00FF66",
  "#00FF80",
  "#00FF99",
  "#00FFB3",
  "#00FFCC",
  "#00FFE6",
  "#00FFFF",
  "#00E6FF",
  "#00CCFF",
  "#00B3FF",
  "#0099FF",
  "#0080FF",
  "#0066FF",
  "#004DFF",
  "#0033FF",
  "#0019FF",
  "#0000FF",
  "#1900FF",
  "#3300FF",
  "#4D00FF",
  "#6600FF",
  "#8000FF",
  "#9900FF",
  "#B300FF",
  "#CC00FF",
  "#E600FF",
  "#FF00FF",
  "#FF00E6",
  "#FF00CC",
  "#FF00B3",
  "#FF0099",
  "#FF0080",
  "#FF0066",
  "#FF004D",
  "#FF0033",
  "#FF0019",
  "#FF0000",
  "#FF1919",
  "#FF3333",
  "#FF4D4D",
  "#FF6666",
  "#FF8080",
  "#FF9999",
  "#FFB3B3",
  "#FFCCCC",
  "#FFE6E6",
  "#FFFFFF",
  "#E6E6E6",
  "#CCCCCC",
  "#B3B3B3",
  "#999999",
  "#808080",
  "#666666",
  "#4D4D4D",
  "#333333",
  "#1A1A1A",
  "#000000",
  "#1A1A1A",
  "#333333",
  "#4D4D4D",
  "#666666",
  "#808080",
  "#999999",
  "#B3B3B3",
  "#CCCCCC",
  "#E6E6E6",
  "#FFFFFF",
  "#E6E6E6",
  "#CCCCCC",
  "#B3B3B3",
  "#999999",
  "#808080",
  "#666666",
  "#4D4D4D",
  "#333333",
  "#666666",
];

const fonts = [
  "--font-50",
  "--font-10",
  "--font-20",
  "--font-35",
  "--font-70",
  "--font-100",
];

export class System {
  constructor(wrapper) {
    this.wrapper = wrapper;

    this.create();
  }

  create() {
    // bg images | data-bg='{}' | data-bg='trigger' | data-bg='w'
    this.bgWrap = document.querySelector("[data-bg='w']");
    this.bgTrigger = document.querySelector("[data-bg='trigger']");
    this.bgImgs = [...this.bgWrap.querySelectorAll("[data-bg]")];
    this.closeImgs = this.bgWrap.querySelector("[data-bg='close']");
    this.closeImgs.onclick = () => (this.bgWrap.style.display = "none");

    this.bgTrigger.onclick = () => (this.bgWrap.style.display = "flex");
    this.bgImgs.forEach((item, i) => {
      item.onclick = () => {
        this.bgWrap.style.display = "none";
        document.body.style.backgroundImage = `url(${item.dataset.bg})`;
      };
    });

    // **  fonts
    const ex = getComputedStyle(document.documentElement);
    this.fonts = document.querySelector('[data-system="font"]');
    const fontName = document.querySelector("[data-fontName]");
    const fontDropDown = this.fonts.children[1];
    this.fontDropDownElements = [...fontDropDown.children];

    this.fontDropDownElements.forEach((item, i) => {
      item.onclick = () => {
        document.body.style.fontFamily = ex.getPropertyValue(fonts[i]);
        fontName.innerHTML = item.innerHTML;
      };
    });

    // **  colors
    this.colors = [...document.querySelectorAll("[data-system='color']")].map(
      (item, i) => {
        const range = item.querySelector("input[type='range']");
        const bg = item.querySelector("[data-bg]");
        const text = item.querySelector("[data-tx]");

        text.innerHTML = window.defaults.colors[i];
        bg.style.backgroundColor = window.defaults.colors[i];

        range.value = window.defaults.systemSlider[i];
        range.oninput = (e) => this.changeColor(i, e.target.value, item);

        return {
          item,
          range,
          bg,
          text,
        };
      }
    );

    // * clocks
    this.clock = document.querySelector("[data-system='clock']");
    const clockDropDown = this.clock.children[1];
    this.clockDropDownElements = [...clockDropDown.children];

    this.clockDropDownElements.forEach((item, i) => {
      item.onclick = () => {
        window.app.dom.clock.changeClock(i);
      };
    });
  }

  changeColor(index, value) {
    const val =
      value === "0" ? window.defaults.colors[index] : colors100[+value];

    switch (index) {
      case 0:
        document.documentElement.style.setProperty("--col--blue", val);
        window.defaults.state.bgColor = val;
        document.body.style.backgroundImage = "none"; // reset bg image
        break;
      case 1:
        document.documentElement.style.setProperty("--col--darkblue", val);

        break;
      case 2:
        document.documentElement.style.setProperty("--col--green", val);
        window.defaults.state.accColor = val;
        break;
      case 3:
        document.documentElement.style.setProperty("--col--white", val);
        window.defaults.state.txColor = val;
        break;
    }

    this.colors[index].text.innerHTML = val;
    this.colors[index].bg.style.backgroundColor = val;
    window.defaults.systemSlider[index] = value;
  }

  destroy() {
    this.colors.forEach((item, i) => (item.range.oninput = null));
    this.fontDropDownElements.forEach((item, i) => (item.onclick = null));
    this.bgTrigger.onclick = null;
    this.bgImgs.forEach((item, i) => (item.onclick = null));
  }
}
