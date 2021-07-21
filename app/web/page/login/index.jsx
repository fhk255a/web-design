import React, { Component } from "react";
import { message, Input, Button } from "antd";
import FormItem from '~/component/FormItem';
import { login } from '~/service';
import "./index.scss";
export default class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  }
  // 提交
  onFinish = () => {
    const { username, password } = this.state;
    if (!username || !password) {
      message.error("账号密码不能为空");
      return;
    }
    login({ username, password }).then(res => {
      if (res && res.code === 200) {
        message.success(res.msg);
        window.location.href = "/admin";
      } else {
        message.error(res.msg);
      }
    })
  };

  componentDidMount() {
    const { msg } = this.props;
    msg && message.error(msg);
  }

  render() {
    return (
      <div className="login-page">
        <div className="container">
          <FormItem
            label="账号"
            content={
              <Input onChange={(e) => this.setState({ username: e.target.value })} />
            }
          />
          <FormItem
            label="密码"
            content={
              <Input type="password" onChange={(e) => this.setState({ password: e.target.value })} />
            }
          />
          <FormItem
            content={
              <Button onClick={this.onFinish} type="primary" >
                登陆
              </Button>
            }
          />
        </div>
      </div>
    );
  }
}
