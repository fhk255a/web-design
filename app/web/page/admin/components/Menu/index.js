import React, { Component } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { TagsOutlined, FileOutlined } from "@ant-design/icons";
class Side extends Component {
  state = {
    defaultPath: ["/admin"],
  };

  componentDidMount() {
    this.setState({
      defaultPath: [this.props.history.location.pathname],
    });
  }

  onSelect = (val) => {
    this.setState({
      defaultPath: [val.key],
    });
  };

  render() {
    // const item = isActive(node.url, this.props.history);
    // console.log(item);
    const { defaultPath } = this.state;
    return (
      <Menu
        theme="dark"
        selectedKeys={defaultPath}
        onSelect={this.onSelect}
        mode="inline"
      >
        <Menu.Item key="/admin">
          <Link to="/admin">
            <FileOutlined />
            作品列表
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/tagList">
          <Link to="/admin/tagList">
            <TagsOutlined />
            标签列表
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Side);
