/**
 * imports
 */

import { Link } from "@solidjs/router";
import { For, Show } from "solid-js";
import "./banner.scss";
import LazyImage from "../common/lazy-image";

/**
 * props
 */

export type Props = {
  imageUrl?: string;
  backgroundImageUrl?: string;
  videoUrl?: string;
  link?: string;
  texts?: string[];
};

/**
 * component
 */

export default function Banner(props: Props) {
  /**
   * refs
   */

  /**
   * hooks & signals
   */

  /**
   * private: methods
   */

  /**
   * effects
   */

  /**
   * render
   */

  return (
    <div class="sha3-component sha3-banner">
      <Link href={props.link || "#"}>
        <Show when={props.backgroundImageUrl}>
          <div class="sha3-banner__backgroundImage">
            <LazyImage src={props.backgroundImageUrl!} />
          </div>
        </Show>
        <Show when={props.imageUrl}>
          <div class="sha3-banner__backgroundImage">
            <LazyImage src={props.imageUrl!} />
          </div>
        </Show>
        <Show when={props.videoUrl}>
          <video class="sha3-banner__video" src={props.videoUrl} />
        </Show>
        <Show when={props.texts?.length}>
          <div class="sha3-banner__texts">
            <For each={props.texts}>
              {(text, index) => (
                <div data-index={index} class="sha3-banner__text">
                  <span>{text}</span>
                </div>
              )}
            </For>
          </div>
        </Show>
      </Link>
    </div>
  );
}
