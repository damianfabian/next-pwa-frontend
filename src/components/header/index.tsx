import * as React from 'react';

interface IHeaderProps {
	children: any;
	className?: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
	return (
		<header className={props.className}>
			{props.children}
		</header>
	);
};

export default Header;
