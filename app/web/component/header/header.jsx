import React, { Component } from 'react';
import './header.scss';
export default class Header extends Component {
  state = {
    menu: [
      {
        url: "/",
        text: "作品展示",
      },
      // {
      //   url: "/info",
      //   text: "个人信息",
      // },
      {
        url: "/contact",
        text: "联系我",
      },
    ]
  }
  openUrl = (url) => {
    window.location.href = url;
  }

  render() {
    const { url = "/" } = this.props;
    return <header className="header">
      <div className="container">
        <div className="nav-list">
          {this.state.menu.map(item => {
            return <div
              key={item.url}
              className={`nav-list-item${item.url === url ? " active" : ""}`}
              onClick={() => this.openUrl(item.url)}
            >
              {item.text}
            </div>
          })}
        </div>
      </div>
    </header>;
  }
}
