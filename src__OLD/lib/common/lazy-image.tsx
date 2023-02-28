/* eslint-disable no-param-reassign */

/**
 * imports
 */

import React, { useEffect, useRef } from "react";
import "./lazy-image.scss";

/**
 * declares
 */

declare const window: Window & {
  lazyImageObserver?: IntersectionObserver;
};

/**
 * consts
 */

/**
 * types
 */

export type LazyImageProps = {
  src: string;
  priority?: boolean;
};

/**
 * component
 */

export default function LazyImage(props: LazyImageProps) {
  /**
   * refs
   */

  const $ = useRef<HTMLDivElement>(null);

  /**
   * private: attributes
   */

  /**
   * signals
   */

  /**
   * private: methods
   */

  const processImage = (img: HTMLImageElement) => {
    if (!img.src && img.dataset.src) {
      const loaderImg = new Image();
      loaderImg.src = img.dataset.src;
      loaderImg.addEventListener("load", () => {
        img.src = loaderImg.src;
        setTimeout(() => {
          img.dataset.loaded = "true";
        }, 100);
      });
      loaderImg.addEventListener("error", () => {
        img.src = "";
        setTimeout(() => {
          img.dataset.loaded = "error";
        }, 100);
      });
    }
  };

  /**
   * effects
   */

  useEffect(() => {
    const img = $?.current?.querySelector<HTMLImageElement>("img");
    if (img && !img.src) {
      if ("IntersectionObserver" in window) {
        if (!window.lazyImageObserver) {
          window.lazyImageObserver = new IntersectionObserver(
            (entries: any[]) => {
              entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                  window!.lazyImageObserver!.unobserve(entry.target);
                  processImage(entry.target as HTMLImageElement);
                }
              });
            }
          );
        }
        window.lazyImageObserver.observe(img);
      } else {
        img.src = props.src;
      }
    }
  }, []);

  /**
   * render
   */

  return (
    <div ref={$} className="sha3-lazyImage">
      <img
        data-src={!props.priority ? props.src : undefined}
        src={props.priority ? props.src : undefined}
      />
    </div>
  );
}
