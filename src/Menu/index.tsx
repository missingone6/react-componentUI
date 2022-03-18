import React, { createContext, useState } from 'react';
import { IMenuItemProps } from './MenuItem';
import filterObj from '../utils/filterObj';
import classNames from 'classnames';


type MenuMode = "vertical" | "horizontal";
interface IMenuProps {
  mode?: MenuMode;
  defaultNumber: string;
  handleClick?: (index: string, keyWord: string) => void;
  className?: string;
  style?: React.CSSProperties,
  fontColor?: string,//字体颜色
  fontSize?: string,//字体大小
  textBackgroundColor?: string,//背景颜色
  activeColor?: string,//高亮颜色
  itemHeight?: string,//每个选项卡的高度
}

export interface IMenuContext {
  activeNumber: string;
  handleClickFn?: (index: string, keyWord: string) => void;
  activeColor: string,
  fontColor: string,
  itemHeight: string,
  userSetStyle: React.CSSProperties
}

export const MenuContext = createContext<IMenuContext>({
  activeNumber: "0",
  activeColor: "",
  fontColor: "",
  itemHeight: "",
  userSetStyle: {}
})

const Menu: React.FC<IMenuProps> = (props) => {

  const {
    mode,
    defaultNumber,
    handleClick,
    className,
    style,
    children,

    fontColor,//字体颜色
    activeColor,//高亮颜色
    itemHeight,//每个选项卡的高度
  } = props;
  //用户设置的样式:
  const userSetStyleArr = ["color", "fontSize", "backgroundColor"]
  const userSetStyleObj = filterObj(style, userSetStyleArr);


  const [selectedNumber, setSelectedNumber] = useState<string>(defaultNumber);
  // 通过useContext传递的初始值
  const contextValue: IMenuContext = {
    activeNumber: selectedNumber,
    handleClickFn: (index: string, keyWord: string) => {
      setSelectedNumber(index);
      if (handleClick) {
        handleClick(index, keyWord);
      }
    },
    userSetStyle: userSetStyleObj,
    activeColor: activeColor === undefined ? "red" : activeColor,
    fontColor: fontColor === undefined ? "blue" : fontColor,
    itemHeight: itemHeight === undefined ? "30px" : itemHeight
  };

  const myClassName = classNames('menu', className, {
    [`menu-vertical`]: mode === "vertical",
    [`menu-horizontal`]: mode === "horizontal"
  });

  // 自动添加index属性
  const renderChildren = () => {
    return React.Children.map(children, (child, index: number) => {
      const element = child as React.FunctionComponentElement<IMenuItemProps>;
      if (element.type.name === "MenuItem") {
        return React.cloneElement(
          element,
          {
            index: (index).toString()
          }
        )
      } else if (element.type.name === "SubMenu") {
        return React.cloneElement(
          element,
          {
            index: (index).toString()
          }
        )
      }
    })
  }
  return (
    <ul style={style} className={myClassName}>
      <MenuContext.Provider value={contextValue}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultNumber: "0",
  mode: "horizontal"
}


export default Menu;