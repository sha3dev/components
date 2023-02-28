/**
 * imports
 */

import { JSXElement } from "solid-js";
import "./button.scss";

/**
 * props
 */

export type Props = {
  children: JSXElement;
  type?: "button" | "submit";
  format?: "link";
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
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
    <div class="sha3-component sha3-button" data-format={props.format}>
      <button type={props.type} disabled={props.disabled} onClick={props.onClick}>
        {props.children}
      </button>
    </div>
  );
}
