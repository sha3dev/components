/**
 * imports: externals
 */

import React from "react";
import "./features.scss";

/**
 * declares
 */

/**
 * consts
 */

/**
 * types
 */

type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type Props = {
  title: string;
  features: Feature[];
};

/**
 * component
 */

export default function Features(props: Props) {
  /**
   * refs
   */

  /**
   * private: attributes
   */

  /**
   * signals
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
    <div className="sha3-features">
      <ul>
        {props.features.map((i, index) => (
          <li key={index}>
            <div className="sha3-features__icon">
              <img src={i.icon} />
            </div>
            <div className="sha3-features__text">
              <div className="sha3-features__title">{i.title}</div>
              <div className="sha3-features__description">{i.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
