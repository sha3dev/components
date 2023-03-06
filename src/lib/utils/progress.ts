/**
 * imports
 */

import "./progress.scss";

/**
 * props
 */

/**
 * consts
 */

const COMPLETED_TIMEOUT_MS = 200;

/**
 * component
 */

export default abstract class Progress {
  /**
   * private static: attributes
   */

  private static progress: any = null;

  /**
   * private static: methods
   */

  private static repaint() {
    if (this.progress) {
      const newInc = (100 - this.progress.dataset.value) * (Math.random() * 0.1);
      this.progress.dataset.value = parseFloat(this.progress.dataset.value) + newInc;
      this.progress.style.width = `${this.progress.dataset.value}%`;
      window.requestAnimationFrame(this.repaint.bind(this, this.progress));
    }
  }

  /**
   * public static: methods
   */

  public static start() {
    if (this.progress) {
      document.body.removeChild(this.progress);
    }
    this.progress = document.createElement("div");
    this.progress.className = "sha3-progress";
    this.progress.dataset.value = 0;
    document.body.appendChild(this.progress);
    this.repaint();
  }

  public static async stop() {
    return new Promise((resolve: Function) => {
      window.requestAnimationFrame(() => {
        if (this.progress) {
          this.progress.style.width = "100%";
        }
        setTimeout(() => {
          if (this.progress) {
            document.body.removeChild(this.progress);
            this.progress = null;
          }
          resolve();
        }, COMPLETED_TIMEOUT_MS);
      });
    });
  }
}
