import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library ,type IconProp} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export enum IconType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Warn = "warn",
  Success = 'success'
}
export {
  IconProp
}
interface IconProps extends FontAwesomeIconProps {
  type?: IconType
  className?: string;
  style?: React.CSSProperties,
}

const Icon: React.FC<IconProps> = (props) => {
  const {
    className,
    style,
    type,
    ...IconEvent
  } = props;
  const classButton = classNames('icon', className, {
    [`icon-${type}`]: type,
  });

  return (
    <FontAwesomeIcon
      className={classButton}
      style={style}
      {...IconEvent}
    />
  )
}


Icon.defaultProps = {
  type: IconType.Default
}

export default Icon;