export class Preview {
  constructor() {
    this.target = document.querySelector("[data-previewTarget]");
    this.original = this.target.style.backgroundImage;
    // console.log("Preview", this.target);
  }

  create() {
    document.querySelectorAll("[data-preview]").forEach((item) => {
      //   console.log(item.dataset.preview);

      item.onmouseenter = () => {
        this.target.style.backgroundImage = `url(${item.dataset.preview})`;
      };

      item.onmouseleave = () => {
        this.target.style.backgroundImage = this.original;
      };
    });
  }

  destroy() {
    document.querySelectorAll("[data-preview]").forEach((item) => {
      item.onmouseenter = () => null;
      item.onmouseleave = () => null;
    });
  }
}
