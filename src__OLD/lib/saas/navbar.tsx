/**
 * imports: externals
 */

import React, { useRef, useState } from "react";

/**
 * imports: internals
 */

import "./navbar.scss";

/**
 * declares
 */

/**
 * consts
 */

/**
 * types
 */

export type Props = {
  logo: JSX.Element;
  cta: JSX.Element;
  children: JSX.Element;
};

/**
 * component
 */

export default function Navbar(props: Props) {
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

  const [isOpen, setIsOpen] = useState(false);

  /**
   * lifecycle
   */

  /**
   * render
   */

  return (
    <div ref={$} data-isopen={isOpen} className="sha3-navbar">
      <div className="sha3-navbar__container">
        <div className="sha3-navbar__column">
          <div className="sha3-navbar__logo">{props.logo}</div>
        </div>
        <div className="sha3-navbar__column">
          <nav className="sha3-navbar__menu">{props.children}</nav>
          <div className="sha3-navbar__ctas">{props.cta}</div>
          <div
            className="sha3-navbar__burger"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="sha3-navbar__burgerIconContainer">
              <div className="sha3-navbar__icon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
