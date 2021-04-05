import * as React from 'react';

interface IHeaderProps {
    company: string
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return <h1>{props.company}</h1>;
};

export default Header;
