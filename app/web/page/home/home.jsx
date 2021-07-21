import React, { Component } from 'react';
import Layout from '~/component/layout';
import WordCard from '~/component/word';
import Header from 'component/header/header.jsx';
import { Pagination, Modal } from 'antd';
import {
  getWordList,
  getTagList,
} from "~/service";

import './index.scss';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      tagList: [],
      // Pagination;
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      showImageModal: false,
      currentImage: "",
    }
  }

  // 搜索
  search = () => {
    const { keyWord, pagination } = this.state;
    const params = {
      pageSize: pagination.pageSize,
      current: pagination.current,
      word_name: keyWord,
      status: 1,
    };
    getWordList(params)
      .then((res) => {
        const { pagination, list = [] } = res.result;
        this.setState({
          pagination,
          wordList: list,
        });
      })
      .catch((err) => { });
  };

  getTagList = () => {
    getTagList().then((res) => {
      this.setState({ tagList: res.result });
    });
  }

  onShowImage = (item) => {
    this.setState({ currentImage: item.image, showImageModal: true });
  }

  componentDidMount() {
    this.getTagList();
    this.search();
  }

  changePage = (current) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        current
      }
    }, () => {
      this.search();
    })
  }

  render() {
    const { pagination, wordList, tagList, currentImage, showImageModal } = this.state;
    return <Layout className="word-page">
      <Header url="/" />
      <div className="container">
        <div className="word-lists">
          {
            wordList && wordList.map(item => <div key={item.id}>
              <WordCard onShowImage={this.onShowImage} key={item.id} word={item} tagList={tagList}></WordCard>
            </div>)
          }
        </div>
        <Pagination onChange={this.changePage} defaultCurrent={pagination.current} total={pagination.total} defaultPageSize={pagination.pageSize} />
      </div>
      <Modal
        visible={showImageModal}
        maskClosable={true}
        width="60%"
        footer={null}
        onCancel={() => {
          this.setState({
            showImageModal: false
          })
        }}
      >
        <img width="100%" height="auto" src={currentImage} />
      </Modal>
    </Layout>;
  }
}