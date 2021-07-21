import React, { Component } from "react";
import Upload from "../components/Upload";
import "./index.scss";
import {
  Table,
  Switch,
  Button,
  Tag,
  Modal,
  Select,
  Input,
  DatePicker,
  message,
  Popconfirm,
} from "antd";
import moment from "moment";
import {
  getWordList,
  getTagList,
  updateOrAddWord,
  changeWordStatus,
} from "~/service";
export default class List extends Component {
  state = {
    // 当前选中的作品
    currentItem: {
      id: null,
      image: "",
      name: "",
      description: "",
      sort: 1,
      tag: [],
      finish_time: {},
      status: true,
    },
    // table Pagination;
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    // modal编辑框的开关
    visible: false,
    // 提交作品状态
    confirmLoading: false,
    // 作品列表
    wordList: [],
    // 标签列表
    tagList: [],
  };
  componentDidMount() {
    this.search();
    getTagList().then((res) => {
      this.setState({ tagList: res.result });
    });
  }
  // 更改modal的状态
  changeVisible = (status) => {
    this.setState({ visible: status });
  };
  // 更改上下架状态
  changeStatus = (val, item) => {
    changeWordStatus({ id: item.id, status: ~~val }).then((res) => {
      if (res.code === 200) {
        message.success(res.msg);
      }
    });
  };
  // 切换表格
  onChangeTable = (pagination) => {
    this.setState({ pagination }, () => {
      this.search();
    });
  };
  // 保存
  submit = () => {
    // TODO 保存或创建
    const { currentItem } = this.state;
    if (currentItem.word_name === "") {
      message.error("作品名称不能为空");
      return;
    }
    if (currentItem.word_desc === "") {
      message.error("作品简介不能为空");
      return;
    }
    if (currentItem.image_url === "") {
      message.error("作品图片不能为空");
      return;
    }
    const params = {
      ...currentItem,
      status: currentItem.status ? 1 : 0,
      finish_time: moment(currentItem.finish_time).format(),
    };
    updateOrAddWord(params).then((res) => {
      if (res && res.code === 200) {
        message.success(res.msg);
        this.search();
        this.changeVisible(false);
      } else {
        message.error(res.msg);
      }
    });
  };
  // 上传图片回调
  changeUpload = (url) => {
    this.setState({
      currentItem: { ...this.state.currentItem, image_url: url },
    });
  };
  // 表格数据
  tableColums = () => [
    {
      title: "作品名",
      dataIndex: "word_name",
      key: "word_name",
      align: "center",
    },
    {
      title: "图片",
      dataIndex: "image_url",
      key: "image_url",
      render: (val) => (
        <div className="word-image">
          <img src={val} />
        </div>
      ),
    },
    {
      title: "简介",
      dataIndex: "word_desc",
      key: "word_desc",
    },
    {
      title: "标签",
      dataIndex: "tags_id",
      key: "tags_id",
      render: (val) => (
        <div className="word-tag">
          {val.map((item) => {
            const It =
              this.state.tagList &&
              this.state.tagList.find((it) => it.id === item);
            if (It) {
              return (
                <Tag color="#55acee" key={It.id}>
                  {It.tag_name}
                </Tag>
              );
            }
          })}
        </div>
      ),
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (val, item) => (
        <Switch
          checkedChildren="展示"
          unCheckedChildren="隐藏"
          defaultChecked={val}
          onChange={(e) => this.changeStatus(e, item)}
        />
      ),
    },
    {
      title: "作品时间",
      dataIndex: "finish_time",
      key: "finish_time",
      render: (val) => <span>{moment(val).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "操作",
      dataIndex: "option",
      key: "option",
      render: (val, item) => (
        <div className="option-btn">
          <a
            onClick={() => {
              this.setState({ currentItem: item }, () => {
                this.changeVisible(true);
              });
            }}
          >
            编辑
          </a>
          <Popconfirm title="确定删除该作品？" okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </div>
      ),
    },
  ];
  // 搜索
  search = () => {
    const { keyWord, pagination } = this.state;
    const params = {
      pageSize: pagination.pageSize,
      current: pagination.current,
      word_name: keyWord,
    };
    getWordList(params)
      .then((res) => {
        const { pagination, list = [] } = res.result;
        this.setState({
          pagination,
          wordList: list,
        });
      })
      .catch((err) => {});
  };
  // 渲染表单节点
  renderFormItem = (label, content) => {
    return (
      <div className="form-item">
        <div className="form-item-label">{label ? `${label}：` : ""}</div>
        <div className="form-item-content">{content}</div>
      </div>
    );
  };
  // 更改表单数据
  changeForm = (key, value) => {
    this.setState({
      currentItem: {
        ...this.state.currentItem,
        [key]: value,
      },
    });
  };
  // 初始化表单数据
  initCurrentItem = () => {
    this.setState(
      {
        currentItem: {
          id: null,
          image_url: "",
          word_name: "",
          word_desc: "",
          sort: 1,
          tags_id: [],
          finish_time: {},
          status: true,
        },
      },
      () => {
        this.changeVisible(true);
      }
    );
  };
  render() {
    const {
      currentItem,
      visible,
      confirmLoading,
      tagList = [],
      wordList,
      keyWord,
      pagination,
    } = this.state;
    return (
      <div className="admin-word-list-page">
        <div className="form-search">
          <div className="form-item">
            <div className="form-item-label">作品名称：</div>
            <div className="form-item-content">
              <Input
                value={keyWord}
                onChange={(e) => this.setState({ keyWord: e.target.value })}
              />
            </div>
          </div>
          <div className="form-item">
            <Button type="primary" onClick={this.search}>
              搜索
            </Button>
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Button type="primary" onClick={this.initCurrentItem}>
            新增
          </Button>
        </div>
        <Table
          className="word-list-table"
          bordered
          rowKey="id"
          onChange={this.onChangeTable}
          pagination={pagination}
          dataSource={wordList}
          columns={this.tableColums()}
        />
        <Modal
          title={currentItem && currentItem.id ? "编辑作品" : "添加作品"}
          visible={visible}
          maskClosable={true}
          confirmLoading={confirmLoading}
          footer={null}
          onCancel={() => this.changeVisible(false)}
        >
          <div className="word-modal-container">
            {this.renderFormItem(
              "作品图片",
              <Upload
                onChange={this.changeUpload}
                image={currentItem.image_url}
              />
            )}
            {this.renderFormItem(
              "作品名称",
              <Input
                value={currentItem.word_name}
                onChange={(e) => this.changeForm("word_name", e.target.value)}
              />
            )}
            {this.renderFormItem(
              "简介说明",
              <Input.TextArea
                rows={4}
                value={currentItem.word_desc}
                onChange={(e) => this.changeForm("word_desc", e.target.value)}
              />
            )}
            {this.renderFormItem(
              "作品分类",
              <Select
                rows={4}
                value={currentItem.tags_id}
                mode="multiple"
                placeholder="请选择作品分类"
                onChange={(e) => this.changeForm("tags_id", e)}
              >
                {tagList &&
                  tagList.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.tag_name}
                    </Select.Option>
                  ))}
              </Select>
            )}
            {this.renderFormItem(
              "作品排序",
              <Input
                type="number"
                value={currentItem.sort}
                onChange={(e) => this.changeForm("sort", e.target.value)}
              />
            )}
            {this.renderFormItem(
              "制作时间",
              <DatePicker
                placeholder="请选择完成时间"
                onChange={(e) => this.changeForm("finish_time", e)}
                value={moment(currentItem.finish_time)}
              />
            )}
            {this.renderFormItem(
              "",
              <Button type="primary" onClick={this.submit}>
                Submit
              </Button>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
