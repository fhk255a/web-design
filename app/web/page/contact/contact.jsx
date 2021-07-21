import React, { Component } from 'react';
import Layout from '~/component/layout';
import Header from 'component/header/header.jsx';

import './index.scss';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        username: "范志鸿",
        zhuanli: "大专",
        age: (new Date().getFullYear()) - 2002,
        phone: 15813211592,
        email: "1459483383@qq.com",
      },
      jiaoyu: {
        time: "2018.09 - 2021.06",
        name: "广东松山职业技术学院",
        zhanye: "数学媒体应用技术"
      },
      work: [
        {
          time: "2019.07 - 2020.04",
          type: "兼职",
          name: "广州市庆缘景观园林设计有限公司",
          list: [
            "分类、保存、记录和整理公司的商品图片以及相关资料",
            "协助主管完成相关的前置工作",
            "参与公司的日常宣传、线上线下活动物料、企业宣传资料的设计、制作",
          ]
        },
        {
          time: "2021.02 - 至今",
          type: "实习",
          name: "网易有道信息技术（北京）有限公司广州分公司",
          list: [
            "对接客户顾问，根据顾问需求设计、制作广告图",
            "负责相关活动的宣传海报、易拉宝制作",
            "参与创意策略的研讨和制定，负责平面设计以及广告图",
          ]
        },
      ],
      jineng: [
        {
          label: "PS",
          content: "80%",
          color: "azure",
        },
        {
          label: "AI",
          content: "70%",
          color: "#e8a4a3",
        },
        {
          label: "CDR",
          content: "70%",
          color: "#8adc62",
        },
        {
          label: "C4D",
          content: "40%",
          color: "#ffbda6",
        },
        {
          label: "Flash",
          content: "40%",
          color: "#b3b1ff",
        },
        {
          label: "H5",
          content: "40%",
          color: "#ffb1f4",
        },
      ]
    }
  }

  render() {
    const { userInfo, jiaoyu, work, jineng } = this.state;
    return <Layout className="contact-page">
      <Header url="/contact" />
      <div className="container">
        <div className="pr">
          <div className="hd f-z-30">{userInfo.username}</div>
          <div className="userinfo-info">
            <div className="userinfo-info-item">
              <div className="userinfo-info-item-f1">
                <span className="label">学历：</span>
                <span className="content">{userInfo.zhuanli}</span>
              </div>
              <div className="userinfo-info-item-f1">
                <span className="label">电话：</span>
                <span className="content">{userInfo.phone}</span>
              </div>
            </div>
            <div className="userinfo-info-item">
              <div className="userinfo-info-item-f1">
                <span className="label">年龄：</span>
                <span className="content">{userInfo.age}</span>
              </div>
              <div className="userinfo-info-item-f1">
                <span className="label">邮箱：</span>
                <span className="content">{userInfo.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pr">
          <div className="hd f-s-24">
            技能水平
          </div>
          <div className="jineng">
            {jineng.map((item, index) => {
              return <div className="jineng-item" key={index}>
                <div className="label">{item.label}</div>
                <div className="content jineng-wrap">
                  <div className="jineng-dot" style={{ background: item.color, width: item.content }} />
                </div>
              </div>
            })}
          </div>
        </div>
        <div className="pr">
          <div className="hd f-s-24">
            教育背景
          </div>
          <div className="jiaoyu">
            <div className="time">{jiaoyu.time}</div>
            <div className="c-name">{jiaoyu.name}</div>
            <div className="c-sub-name">{jiaoyu.zhanye}</div>
          </div>
        </div>
        <div className="pr">
          <div className="hd f-s-24">
            工作经历
          </div>
          <div className="work">
            {work.map((item, index) => {
              return <div key={index} className="work-item">
                <div className="time">{item.time}</div>
                <div className="c-name">{item.name}</div>
                <ul className="c-sub-name">
                  {item.list.map((it, id) => {
                    return <li key={id}>{id + 1}、{it}</li>
                  })}
                </ul>
              </div>
            })}

          </div>
        </div>
      </div>
    </Layout>;
  }
}