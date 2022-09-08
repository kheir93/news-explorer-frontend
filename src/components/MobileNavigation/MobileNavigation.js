import React from 'react';

export default function MobileNavigation(props) {
  if (props.mobile) {
    return <div className="header__navigation-container">{props.children}</div>;
  }
  return props.children;
}
