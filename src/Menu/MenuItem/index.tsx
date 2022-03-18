import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext, IMenuContext } from '../index';


export interface IMenuItemProps {
  index?: string;
  disable?: boolean;
  className?: string;
  style?: React.CSSProperties
}


const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const [swActive, setSwActive] = useState<boolean>(false);
  const {
    index,
    style,
    className,
    children,
    disable
  } = props;
  const current = useContext<IMenuContext>(MenuContext);
  const myClassName = classNames('menuItem', className, {
    'menu-disable': disable,
    'menu-active': current.activeNumber === index
  });
  console.log(current.activeColor);

  return (
    <>
      <li
        style={{
          height: current.itemHeight,
          lineHeight: current.itemHeight,
          ...style,
          color: swActive ? current.activeColor : current.fontColor,

        }}
        className={myClassName}
        onMouseEnter={() => { setSwActive(true) }}
        onMouseLeave={() => { setSwActive(false) }}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          index !== undefined
            && !disable
            && current.handleClickFn
            && current.handleClickFn(index, children as string);
        }}>
        {children}
      </li>
    </>
  )
}

MenuItem.defaultProps = {
  disable: false
}

export default MenuItem;