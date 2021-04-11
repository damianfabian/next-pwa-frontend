import * as React from 'react';

export interface IButtonProps {
    children: any;
    onClick?: () => {};
    className?: string,
    type?: 'primary' | 'secundary' | 'alert' | 'dark' | 'default' | 'link' | 'info'
}

const Button: React.FunctionComponent<IButtonProps> = ({ children, onClick, type }) => {
  return <div className="flex justify-center">
      <button className={`p-2 px-8 m-4 min-w-1/2 w-auto ${type} border rounded-tl-2xl rounded-br-2xl`} onClick={onClick}>{children}</button>
  </div>;
};

Button.defaultProps = {
  type: 'default'
}

export default Button;
