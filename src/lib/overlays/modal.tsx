/**
 * imports
 */

import { JSXElement } from "solid-js";
import "./modal.scss";

/**
 * props
 */

export type Props = {
  isOpen?: boolean;
  children: JSXElement;
  type?: "modal";
  title?: string;
  closeIcon?: any;
  onClose?: () => void;
};

/**
 * component
 */

export default function Button(props: Props) {
  /**
   * refs
   */

  /**
   * hooks
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
    <div class="sha3-component sha3-modal" data-isopen={props.isOpen} data-type={props.type}>
      <div class="sha3-modal__content">
        <div class="sha3-modal__head">
          <div class="sha3-modal__title">{props.title}</div>
          <div class="sha3-modal__closeIcon" onClick={() => props.onClose?.()}>
            {props.closeIcon || "X"}
          </div>
        </div>
        <div class="sha3-modal__body">{props.children}</div>
      </div>
    </div>
  );
}
