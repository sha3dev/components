/**
 * imports
 */

import { JSXElement, createSignal } from "solid-js";
import "./button.scss";

/**
 * props
 */

export type Props = {
  children: JSXElement;
  onSubmit?: (formData: FormData) => void;
  validation?: (formData: FormData) => string | null;
};

/**
 * component
 */

export default function Form(props: Props) {
  /**
   * refs
   */

  let $: HTMLFormElement;

  /**
   * hooks & signals
   */

  const [error, setError] = createSignal<string | null>(null);

  /**
   * private: methods
   */

  const onSubmit = (event: SubmitEvent) => {
    let formError: string | null = null;
    event.preventDefault();
    const formData = new FormData($);
    if (props.validation) {
      formError = props.validation(formData);
    }
    setError(formError);
    if (!formError) {
      props.onSubmit?.(formData);
    }
  };

  /**
   * effects
   */

  /**
   * render
   */

  return (
    <form ref={$!} class="sha3-component sha3-form" onSubmit={onSubmit}>
      {error ? <div class="sha3-form__error">{error()}</div> : null}
      <div class="sha3-form__components">{props.children}</div>
    </form>
  );
}
