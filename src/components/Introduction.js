import React from 'react';
import {connect} from 'react-redux';

export default function Introduction() {
  return <div className="Introduction">
    <div className="so-back">
      <div className="so-chunk">
        <div className="Introduction__container">
          <h2>NBI（New Business Intelligent）实验室</h2>
          <p className="Introduction__lead">欢迎来到智牛区块链网络API实验室！</p>

<p>查看更多组件------<a href="/modelcenter.html">全球开发者中心</a>.</p>
<p>查看更多开发文档------<a href="https://www.stellar.org/developers/">全球开发者中心</a>.</p>
<p>查看更多操作文档------<a href="/">Lab实验室操作手册</a></p>
        </div>
      </div>
    </div>
  </div>
}
