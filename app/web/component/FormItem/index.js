import React from "react";
import './index.scss';
// 渲染表单节点
const FormItem = ({ label, content }) => {
  return (
    <div className="form-item">
      <div className="form-item-label">{label ? `${label}：` : ""}</div>
      <div className="form-item-content">{content}</div>
    </div>
  );
};

export default FormItem;
