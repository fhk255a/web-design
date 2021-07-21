import React, { Component } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getCookie } from "~/utils";

class UploadComponent extends Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const { onChange } = this.props;
      const { response } = info.file;
      if (response.result && response.code === 200) {
        const imageUrl = response.result.url;
        this.setState(
          {
            imageUrl,
            loading: false,
          },
          () => {
            onChange(imageUrl);
          }
        );
      }
    }
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传「 PNG 」或「 JPG 」!");
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error("图片不能超过4M!");
    }
    return isJpgOrPng && isLt4M;
  };

  render() {
    const { loading } = this.state;
    const { image } = this.props;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>请选择图片</div>
      </div>
    );
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/common.uploadImage"
        headers={{
          "x-csrf-token": getCookie("csrfToken"),
        }}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {image ? (
          <img src={image} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default UploadComponent;
