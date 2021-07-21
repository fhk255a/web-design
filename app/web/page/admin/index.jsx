import React, { Component } from 'react';
import Menu from './components/Menu';
import { Layout } from 'antd';
import { SmileOutlined } from "@ant-design/icons";
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import routerList from './router.js';
import './index.scss';
const { Content, Footer, Sider } = Layout;

export default class SiderDemo extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div className="logo" >
              <SmileOutlined />
              ZHIHONG</div>
            <Menu />
          </Sider>
          <Layout className="site-layout">
            <Content className="site-content">
              <Switch>
                {routerList.map((item, index) => {
                  if (item.redirect) {
                    return <Redirect key={index} to={item.redirect} />
                  }
                  return (
                    <Route key={index}
                      path={item.path}
                      exact={item.exact}
                      strict={item.strict}
                      component={item.component}
                    ></Route>
                  )
                })}
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Desgin By ZHIHONG</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}