import Header from 'components/header';
import Footer from 'components/footer';
import * as React from 'react';

interface ILayoutProps {
  children: React.ReactNode[];
  header?: React.ReactNode;
  className?: string;
  hasFooter?: boolean;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  return <section className={`h-screen ${props.className}`}>
    { props.header && <Header>{props.header}</Header> }
    <main className="">
      {props.children}
    </main>
    
    { props.hasFooter && <Footer company="Something Else" className='footer gb-green-500' /> }
  </section>
};

Layout.defaultProps = {
  header: false,
  hasFooter: false,
  className: 'block'
}
export default Layout;
