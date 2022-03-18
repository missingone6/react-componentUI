import React from 'react';
import classNames from 'classnames';
import IconComponent, { IconProp } from '../Icon';

export enum InputSize {
  Small = 'small',
  Middle = 'middle',
  Large = 'large'
}

interface IconProps {
  className?: string;
  size?: InputSize,
  children?: React.ReactNode,
  disabled?: boolean,
  style?: React.CSSProperties,
  prefixIcon?: IconProp,
  postfixIcon?: IconProp,
  prefixString?: string,
  postfixString?: string,
}

export type IInputProps = Partial<
  IconProps & Omit<React.InputHTMLAttributes<HTMLElement>, 'size'>
>;


const Input: React.FC<IInputProps> = (props) => {
  const {
    className,
    size,
    disabled,
    children,
    style,
    prefixIcon,
    postfixIcon,
    prefixString,
    postfixString,
    ...InputEvent
  } = props;
  const classButton = classNames('my-input', className, {
    [`input-${size}`]: size,
  });
  const classWrapper = classNames('input-wrapper',{
    [`input-${size}`]: size,
    disabled: disabled
  })
  return (
    <>
      <div className={classWrapper}>
        {
          prefixString
            ? <div className='fl prefixString'>{prefixString}</div>
            : null
        }
        <div className='fl middleBox'>
          {prefixIcon
            ? <IconComponent size='xs' className='prefixIcon' icon={prefixIcon} />
            : null
          }
          <input type="text"
            className={classButton}
            style={style}
            {...InputEvent} />
          {postfixIcon
            ? <IconComponent size='xs' className='postfixIcon' icon={postfixIcon} />
            : null
          }
        </div>
        {
          postfixString
            ? <div className='fl postfixString'>{postfixString}</div>
            : null
        }
      </div>
    </>
  )
}

Input.defaultProps = {
  disabled: false,
  size: InputSize.Middle,
}

export default Input;