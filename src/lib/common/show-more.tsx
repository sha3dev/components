/**
 * imports
 */

import Button from "../form/button";
import { createSignal, JSXElement, onCleanup, onMount } from "solid-js";
import "./show-more.scss";

/**
 * component
 */

export default function ShowMore(props: { children: JSXElement; viewMoreText: string }) {
  /**
   * refs
   */

  let content: HTMLDivElement;

  /**
   * hooks & signals
   */

  const [isOverflow, setIsOverflow] = createSignal(false);
  const [isOpen, setIsOpen] = createSignal(false);

  /**
   * private: methods
   */

  const checkOverflow = () => {
    setIsOverflow(content.scrollHeight > content.clientHeight + 2);
  };

  /**
   * resources
   */

  /**
   * effects
   */

  onMount(() => {
    window.addEventListener("resize", checkOverflow);
    setTimeout(checkOverflow);
  });

  onCleanup(() => {
    window.removeEventListener("resize", checkOverflow);
  });

  /**
   * render
   */

  return (
    <div class="sha3-showMore" data-isoverflow={isOverflow()} data-isopen={isOpen()}>
      <div ref={content!} class="sha3-showMore__content">
        {props.children}
      </div>
      <div class="sha3-showMore__footer">
        <Button onClick={() => setIsOpen(true)}>{props.viewMoreText}</Button>
      </div>
    </div>
  );
}
