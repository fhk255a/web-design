import React, { Component } from 'react';
import { Tag } from 'antd';
import moment from "moment";
import './index.scss';
export default class Header extends Component {

  showImage=()=>{
    const { onShowImage } = this.props;
    onShowImage && onShowImage(this.props.word);
  }

  render() {
    const { image_url = '', word_name = '', tags_id = [], finish_time = null, word_desc = '' } = this.props.word;
    const { tagList } = this.props;
    return <div className="word-card">
      <div className="word-image" onClick={this.showImage}>
        <img src={image_url} alt="" />
      </div>
      <div className="word-info">
        <div className="word-name">{word_name}</div>
        <p className="word-desc">{word_desc}</p>
        <p>
          {tags_id.map(item => {
            const It = tagList.find(it => it.id === item);
            return <Tag key={It.id}>{It.tag_name}</Tag>
          })}
        </p>
      </div>
      <div className="word-footer">
        <span>完成时间：</span>
        <span className="word-time">{moment(finish_time).format("YYYY-MM-DD")}</span>
      </div>
    </div>;
  }
}
