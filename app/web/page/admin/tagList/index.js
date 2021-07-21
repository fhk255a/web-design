import React, { Component } from "react";
import "./index.scss";
import { Table, Button, Modal, Input, message, Popconfirm } from "antd";
import moment from "moment";
import { getTagList, updateOrAddTag } from "~/service";
export default class List extends Component {
  state = {
    // 当前选中的作品
    currentItem: {
      id: null,
      create_time: {},
      tag_name: "",
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
    // 标签列表
    tagList: [],
  };
  componentDidMount() {
    this.search();
  }
  // 切换表格
  onChangeTable = (pagination) => {
    this.setState({ pagination }, () => {
      this.search();
    });
  };
  // 更改modal的状态
  changeVisible = (status) => {
    this.setState({ visible: status });
  };
  // 保存
  submit = () => {
    // TODO 保存或创建
    const { currentItem } = this.state;
    if (currentItem.tag_name === "") {
      message.error("标签名称不能为空");
      return;
    }
    const params = {
      ...currentItem,
      create_time: moment(currentItem.create__time).format(),
    };
    updateOrAddTag(params).then((res) => {
      if (res && res.code === 200) {
        message.success(res.msg);
        this.search();
        this.changeVisible(false);
      } else {
        message.error(res.msg);
      }
    });
  };
  // 表格数据
  tableColums = () => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "标签名",
      dataIndex: "tag_name",
      key: "tag_name",
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      key: "create_time",
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
          <Popconfirm title="确定删除该标签？" okText="确定" cancelText="取消">
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
      tag_name: keyWord,
    };
    getTagList(params)
      .then((res) => {
        const { pagination, list = [] } = res.result;
        console.log(list);
        this.setState({
          pagination,
          tagList: list,
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
          tag_name: "",
          create_time: {},
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
      keyWord,
      pagination,
    } = this.state;
    return (
      <div className="admin-tag-list-page">
        <div className="form-search">
          <div className="form-item">
            <div className="form-item-label">标签名称：</div>
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
          className="tag-list-table"
          bordered
          rowKey="id"
          pagination={pagination}
          onChange={this.onChangeTable}
          dataSource={tagList}
          columns={this.tableColums()}
        />
        <Modal
          title={currentItem && currentItem.id ? "编辑标签" : "添加标签"}
          visible={visible}
          maskClosable={true}
          confirmLoading={confirmLoading}
          footer={null}
          onCancel={() => this.changeVisible(false)}
        >
          <div className="tag-modal-container">
            {this.renderFormItem(
              "标签名称",
              <Input
                value={currentItem.tag_name}
                onChange={(e) => this.changeForm("tag_name", e.target.value)}
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
