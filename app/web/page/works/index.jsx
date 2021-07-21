import React, { Component } from 'react';
import Layout from '~/component/layout';
import Header from 'component/header/header.jsx';
export default class Home extends Component {
  componentDidMount() {
    console.log('----componentDidMount-----');
  }

  render() {
    console.log('this.props',this.props);
    return <Layout>
      <Header></Header>
      <div className="main"></div>
    </Layout>;
  }
}