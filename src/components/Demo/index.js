import React, { Component } from 'react';
import Link from 'react-toolbox/lib/link';
import JbButton from '../../components/JbButton/';

class Demo extends Component {
  render() {
    return ( <nav>
      <Link active href="/#/list" label="Transactions"/>
      <Link href="/#/login" label="Login"/>
      <Link href="/#/settings" label="Setting" />
    </nav>
);
}
}

export default Demo;