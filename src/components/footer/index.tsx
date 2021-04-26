import * as React from 'react';

interface IFooterProps {
    company: string,
    className: string
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return <footer className={props.className}><h1>{props.company}</h1></footer>;
};

export default Footer;
