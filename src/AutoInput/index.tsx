import React, { useState, KeyboardEvent, useRef, LegacyRef } from 'react';
import classNames from 'classnames';
import Input, { InputSize, IInputProps } from '../Input';

// 引入自定义hooks
import useDidUpdateEffect from '../hooks/useDidUpdateEffect';
import useDebounce from '../hooks/useDebounce';
import useClickExceptA from '../hooks/useClickExceptA';
import usePropsValue from '../hooks/usePropsValue';

interface IAutoIconProps extends Omit<IInputProps, 'onChange'> {
  value?: string,
  onChange?: (value: string) => void
  className?: string;
  children?: React.ReactNode,
  style?: React.CSSProperties,
  /* 返回输入建议的函数，支持同步/异步 */
  fetchSuggestions: (keyWord: string) => Promise<string[]> | string[],
  /* 点击选中建议项时触发 */
  select?: (keyWord: string) => void,
  /*激活即是否列出输入建议，默认是false */
  triggerOnFocus?: boolean,
  /*支持自定义下拉菜单*/
  createMenus?: (item: string, index: number) => string
}


const AutoInput: React.FC<IAutoIconProps> = (props) => {
  const {
    className,
    children,
    style,
    fetchSuggestions,
    select,
    triggerOnFocus,
    createMenus,
    value,
    onChange,
    ...AutoInputEvent
  } = props;

  const classAutoInput = classNames('my-autoInput', className, {

  });
  const [autoInputValue, setAutoInputValue] = usePropsValue<string>({
    value, onChange
  });
  const [suggestions, setSuggestions] = useState<string[]>();
  const [selectIndex, setSelectIndex] = useState<number>(0);

  const debounceValue = useDebounce(autoInputValue, 500);
  const divRef: LegacyRef<HTMLDivElement> = useRef(null);

  // 解决选择下拉菜单中的某一项，依然会触发查询的问题
  const lastClickWasMenu = useRef(false);

  // 点击其他地方，收起下拉菜单
  useClickExceptA(divRef, () => {
    setSuggestions([]);
  })

  // 实现input框的防抖，点击多次，以最后一次开始计时
  useDidUpdateEffect(() => {
    const returnSuggestions = fetchSuggestions(debounceValue);
    if (returnSuggestions instanceof Promise) {
      returnSuggestions.then(
        v => {
          setSuggestions(v)
        }
      ).catch(e => {
        throw "autoInput组件fetchSuggestions函数出错,报错信息为" + e;
      })
    } else {
      setSuggestions(returnSuggestions);
    }
  }, [debounceValue], !!triggerOnFocus)

  const handleLiClick = (item: string) => {
    return () => {
      setAutoInputValue(item);
      setSuggestions([]);
      if (select) {
        select(item);
      }
      lastClickWasMenu.current = true;
    }
  }

  // 创建下拉菜单
  const createDropDownMenu = (item: string, index: number) => {
    const classLi = classNames('amy', {
      'hover': index === selectIndex
    });
    return (
      <li
        key={index}
        className={classLi}
        onMouseEnter={() => {
          setSelectIndex(index);
        }}
        onClick={handleLiClick(item)}>
        {createMenus ? createMenus(item, index) : item}
      </li>
    )
  }

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    const handleSelectIndexChange = (index: number) => {
      if (index < 0 || (suggestions && index > suggestions.length)) return;
      setSelectIndex(index);
    }
    if (suggestions && suggestions.length === 0) return;
    switch (e.code) {
      case 'ArrowDown':
        handleSelectIndexChange(selectIndex + 1);
        break;
      case 'ArrowUp':
        handleSelectIndexChange(selectIndex - 1);
        break;
      case 'Escape':
        setSuggestions([]);
        break;
      case 'Enter':
        if (suggestions) {
          handleLiClick(suggestions[selectIndex])();
        }
        break;
      default:
        break;
    }
  }
  return (
    <>
      <div
        ref={divRef}
        className='autoInput-wrapper'
        style={{
          width: style?.width
        }}>
        <Input
          size={InputSize.Middle}
          style={style}
          className={classAutoInput}
          prefixIcon="v"
          placeholder="请输入"
          value={autoInputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setAutoInputValue(value);
            lastClickWasMenu.current = false;
          }}
          onKeyUp={handleKeyup}
          {...AutoInputEvent}
        />
        <div className="bottomPart">
          {
            suggestions && suggestions.length !== 0
              ? (
                <>
                  <div className="triangle"></div>
                  <ul>
                    {
                      suggestions?.map((item, index) => {
                        return createDropDownMenu(item, index);
                      })
                    }
                  </ul>
                </>
              )
              : null
          }
        </div>
      </div>
    </>
  )
}

AutoInput.defaultProps = {
  triggerOnFocus: false,
}

export default AutoInput;