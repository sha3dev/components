/**
 * imports: externals
 */

import React, { useRef } from "react";

/**
 * imports: internals
 */

import "./mockup.scss";

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
  autoScroll?: boolean;
};

/**
 * component
 */

export default function Mockup(props: Props) {
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
   * lifecycle
   */

  /**
   * render
   */

  return (
    <div ref={$} className="sha3-mockup">
      <div className="sha3-mockup__container">
        <div className="sha3-mockup__mockup sha3-mockup__mockup--desktop">
          <div className="sha3-mockup__placeholder sha3-mockup__placeholder--desktop">
            <img />
          </div>
          <img className="sha3-mockup__device sha3-mockup__device--desktop" />
        </div>
        <div className="sha3-mockup__mockup sha3-mockup__mockup--mobile">
          <div className="sha3-mockup__placeholder sha3-mockup__placeholder--mobile">
            <img />
          </div>
          <img className="sha3-mockup__device sha3-mockup__device--mobile" />
        </div>
      </div>
    </div>
  );
}
