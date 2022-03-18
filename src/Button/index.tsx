import classNames from 'classnames';
import React from 'react';

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Warn = "warn",
  Success = 'success'
}

export enum ButtonSize {
  Small = 'small',
  Middle = 'middle',
  Large = 'large'
}


interface ButtonProps {
  className?: string;
  btnType?: ButtonType,//不能起名未type，会与button元素上的属性重合
  size?: ButtonSize,
  children?: React.ReactNode,
  disabled?: boolean,
  round?: boolean,
  style?:React.CSSProperties
}

type IButtonProps = Partial<
  ButtonProps & React.ButtonHTMLAttributes<HTMLElement>
>;

const Button: React.FC<IButtonProps> = (props) => {
  const {
    btnType,
    className,
    size,
    disabled,
    children,
    round,
    style,
    ...buttonEvent
  } = props;
  const classButton = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    [`btn-round`]: round,
    disabled: disabled
  });

  return (
    <>
      <button className={classButton} style={style} {...buttonEvent}>
        {children}
      </button>
    </>
  )
}
Button.defaultProps = {
  btnType: ButtonType.Default,
  size: ButtonSize.Middle,
  disabled: false,
  round: false
}

export default Button;