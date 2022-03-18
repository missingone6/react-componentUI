import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext, IMenuContext } from '../index';
import Icon from '../../Icon';

export interface ISubMenuProps {
  index?: string;
  disable?: boolean;
  className?: string;
  style?: React.CSSProperties,
  title: string;//标题
}


const SubMenu: React.FC<ISubMenuProps> = (props) => {
  const [swActive, setSwActive] = useState<boolean>(false);
  const {
    index,
    style,
    className,
    children,
    disable,
    title
  } = props;
  const current = useContext<IMenuContext>(MenuContext);
  const myClassName = classNames('menuItem', className, {
    'menu-disable': disable,
    'menu-active': current.activeNumber === index
  });

  // 自动添加index属性
  const renderChildren = (children: React.ReactNode) => {
    const returnLi = React.Children.map(children, (child, i: number) => {
      const element = child as React.FunctionComponentElement<ISubMenuProps>;
      if (element.type.name === 'MenuItem' && index) {
        return React.cloneElement(
          element,
          {
            index: index + '-' + (i).toString()
          }
        );
      }
    });
    return (
      <ul className="subMenu-ul" style={current.userSetStyle}>
        {returnLi}
      </ul>
    )
  }
  return (
    <li style={style} className={myClassName} onClick={() => {
      index !== undefined && !disable && current.handleClickFn && current.handleClickFn(index, title);
    }}>
      <div className="subMenu-title"
        style={{
          color: swActive ? current.activeColor : current.fontColor,
          height: current.itemHeight,
          lineHeight: current.itemHeight
        }}
        onMouseEnter={() => { setSwActive(true) }}
        onMouseLeave={() => { setSwActive(false) }}
      >
        <span>{title}</span>
        <Icon icon="caret-down" className="subMenu-icon"
          size='xs'
        />
      </div>

      {renderChildren(children)}
    </li>
  )
}

SubMenu.defaultProps = {
  disable: false
}

export default SubMenu;