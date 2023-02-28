/**
 * imports
 */

import { onCleanup, onMount, createSignal } from "solid-js";
import "./input.scss";

/**
 * props
 */

export type Props = {
  type: "text" | "password" | "email";
  name: string;
  required?: string;
  placeholder?: string;
  validation?: (value: string) => string | null;
};

/**
 * component
 */

export default function Input(props: Props) {
  /**
   * refs
   */

  let input: HTMLInputElement;

  /**
   * hooks & signals
   */

  const [error, setError] = createSignal<string | null>(null);

  /**
   * private: methods
   */

  const onSubmit = (event: SubmitEvent) => {
    const { value } = input;
    let inputError = null;
    if (props.required && !value) {
      inputError = props.required;
    } else if (props.validation) {
      inputError = props.validation(value);
    }
    setError(inputError);
    if (inputError) {
      event.preventDefault();
      input.scrollIntoView({ block: "center", inline: "center" });
    }
  };

  const onInput = () => {
    if (error()) {
      setError(null);
    }
  };

  /**
   * effects
   */

  onMount(() => {
    input?.form?.addEventListener("submit", onSubmit, { capture: true });
  });

  onCleanup(() => {
    input?.form?.removeEventListener("submit", onSubmit, { capture: true });
  });

  /**
   * render
   */

  return (
    <div data-error={error() ? true : null} class="sha3-component sha3-input">
      <input ref={input!} name={props.name} type={props.type} placeholder={props.placeholder} onInput={onInput} />
      {error ? <div class="sha3-input__error">{error()}</div> : null}
    </div>
  );
}
