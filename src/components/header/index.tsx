import * as React from 'react';

interface IHeaderProps {
    title: string
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return <h1>{props.title}</h1>;
};

export default Header;
