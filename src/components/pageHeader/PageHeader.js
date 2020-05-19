import React, { Component } from 'react';
import { Layout, Row } from 'antd';

const { Header } = Layout;

class PageHeader extends Component {
  render() {
    return (
      <Header className="page-header">
        <Row>
          <div className="col-12">
            <img className="img-container" src={`${process.env.PUBLIC_URL}/surify.png`} height={70} width={120} alt="surify" />
          </div>
        </Row>
      </Header>
    );
  }
}

export default PageHeader;
