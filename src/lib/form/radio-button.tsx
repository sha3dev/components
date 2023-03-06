/**
 * imports
 */

import { JSXElement, Show } from "solid-js";
import "./button.scss";

/**
 * props
 */

export type Props = {
  disabled?: boolean;
  value?: string | number;
  name?: string;
  onChange?: () => void;
  children?: JSXElement;
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
    <div class="sha3-component sha3-radioButton">
      <input type="radio" value={props.value} name={props.name} onChange={props.onChange} />
      <Show when={props.children}>{props.children}</Show>
    </div>
  );
}
