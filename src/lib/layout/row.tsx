/**
 * imports
 */

import { children, createSignal, For, JSXElement, onCleanup, onMount, Show } from "solid-js";
import { FaSolidAngleRight, FaSolidAngleLeft } from "solid-icons/fa";
import "./row.scss";

/**
 * props
 */

export type Props = {
  children: JSXElement;
};

/**
 * consts
 */

const EXTRA_MARGIN = 5;

const IS_TOUCH_DEVICE =
  "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0;

/**
 * component
 */

export default function Row(props: Props) {
  /**
   * refs
   */

  let row: HTMLDivElement;
  let content: HTMLDivElement;
  let items: HTMLDivElement;
  const childrenArray = children(() => props.children).toArray();

  /**
   * hooks & signals
   */

  const [isOverflowing, setIsOverflowing] = createSignal<null | "both" | "left" | "right">(null);

  /**
   * private: methods
   */

  const checkOveflow = (scrollLeft?: number) => {
    const calculatedScrollLeft = scrollLeft !== undefined ? scrollLeft : content.scrollLeft;
    let value: "both" | "left" | "right" | null = null;
    const contentOverflows = content.scrollWidth > content.clientWidth;
    if (contentOverflows) {
      const left = calculatedScrollLeft > EXTRA_MARGIN; // se puede scrollar hacia la izquierda?
      const right = calculatedScrollLeft + content.clientWidth < content.scrollWidth - EXTRA_MARGIN; // se puede scrollar hacia la derecha?
      if (left && right) {
        value = "both";
      } else if (left) {
        value = "left";
      } else if (right) {
        value = "right";
      }
    }
    setIsOverflowing(value);
  };

  const move = (direction: 1 | -1) => {
    const itemsCount = childrenArray.length || 1;
    if (items) {
      const width = items.scrollWidth / itemsCount;
      const scrollLeft = content.scrollLeft + direction * width;
      content.scrollLeft = scrollLeft;
      setTimeout(() => checkOveflow(scrollLeft < 0 ? 0 : Math.round(scrollLeft)));
    }
  };

  /**
   * events
   */

  const onResize = () => checkOveflow();

  /**
   * lifecycle
   */

  onMount(() => {
    window.addEventListener("resize", onResize);
    setTimeout(checkOveflow);
  });

  onCleanup(() => {
    window.removeEventListener("resize", onResize);
  });

  /**
   * effects
   */

  /**
   * render
   */

  return (
    <div ref={row!} class="sha3-component sha3-row" data-overflow={isOverflowing()} data-touch={IS_TOUCH_DEVICE}>
      <Show when={childrenArray?.length}>
        <div ref={content!} class="sha3-row__content">
          <div ref={items!} class="sha3-row__items">
            <For each={childrenArray}>{(child: any) => <div class="sha3-row__item">{child}</div>}</For>
          </div>
        </div>
      </Show>
      <div class="sha3-row__arrows">
        <button class="sha3-row__arrow" data-move="prev" onClick={() => move(-1)}>
          <FaSolidAngleLeft />
        </button>
        <button class="sha3-row__arrow" data-move="next" onClick={() => move(1)}>
          <FaSolidAngleRight />
        </button>
      </div>
    </div>
  );
}
