/**
 * imports
 */

import { children, createSignal, For, JSXElement, onMount, Show } from "solid-js";
import { FaSolidAngleRight, FaSolidAngleLeft } from "solid-icons/fa";
import "./carousel.scss";

/**
 * props
 */

export type Props = {
  autoSlide?: boolean;
  children: JSXElement;
};

/**
 * consts
 */

const IS_TOUCH_DEVICE =
  "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0;

/**
 * component
 */

export default function Carousel(props: Props) {
  /**
   * refs
   */

  let slides: HTMLOListElement;
  const childrenArray = children(() => props.children).toArray();

  /**
   * hooks & signals
   */

  const [currentSlide, setCurrentSlide] = createSignal<number>(0);

  /**
   * private: methods
   */

  const move = (direction: number) => {
    slides.scrollLeft += direction * slides.clientWidth;
  };

  /**
   * effects
   */

  onMount(() => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = Number((entry.target as HTMLLIElement).dataset.index);
            if (entry.isIntersecting) {
              setCurrentSlide(index);
            }
          });
        },
        { root: slides, threshold: 0.99 }
      );
      Array.from(slides.querySelectorAll("li[data-index]")).forEach((item: any) => observer.observe(item));
    }
  });

  /**
   * render
   */

  return (
    <div data-currentslide={currentSlide()} class="sha3-component sha3-carousel">
      <Show when={childrenArray.length}>
        <ol ref={slides!} class="sha3-carousel__slides">
          <For each={childrenArray}>
            {(child, index) => (
              <li data-index={index()} class="sha3-carousel__slide" data-active={currentSlide() === index()}>
                {child}
              </li>
            )}
          </For>
        </ol>
        <Show when={childrenArray.length > 1}>
          <ol class="sha3-carousel__bullets">
            <For each={childrenArray}>
              {(slide, index) => (
                <li
                  class="sha3-carousel__bullet"
                  data-active={currentSlide() === index() || (index() === 0 && currentSlide() === childrenArray.length)}
                  onClick={() => move(index() - currentSlide())}
                />
              )}
            </For>
          </ol>
        </Show>
        <Show when={!IS_TOUCH_DEVICE}>
          <div class="sha3-carousel__arrows">
            <button
              class="sha3-carousel__arrow"
              data-move="prev"
              onClick={() => move(-1)}
              data-disabled={currentSlide() === 0}
            >
              <FaSolidAngleLeft />
            </button>
            <button
              class="sha3-carousel__arrow"
              data-move="next"
              onClick={() => move(1)}
              data-disabled={currentSlide() === childrenArray.length - 1}
            >
              <FaSolidAngleRight />
            </button>
          </div>
        </Show>
      </Show>
    </div>
  );
}
