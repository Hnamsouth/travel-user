import React, { useCallback, useEffect, useState } from 'react';
import { Col, Input, Row, Image, Tooltip, Form, Card, Tag, Space, Radio, message, FormListFieldData, InputNumber } from 'antd';

const Luxury: React.FC = () => {
  return (
    <Row gutter={[30, 30]}>
      <Col span={24}><h2>Vehicles / Luxury</h2></Col>
      <Row justify="center" align="middle">
        <Col span={7}></Col>
        <Col span={9}>
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
        </Col>
        <Col span={7}></Col>
      </Row>
      <Col span={24}>
        <p>The three parts of this practice Reading test are presented over three separate web pages. 
          Make sure you move swiftly from one page to the next so that your practice is as realistic as possible.</p>
        <p>The three parts of this practice Reading test are presented over three separate web pages. 
          Make sure you move swiftly from one page to the next so that your practice is as realistic as possible.</p>
      </Col>
      <Row gutter={[15, 15]} justify="space-around" align="middle"> 
        <Col span={9}>
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
        </Col>
        <Col span={15}>
          <p>The three parts of this practice Reading test are presented over three separate web pages. 
            Make sure you move swiftly from one page to the next so that your practice is as realistic as possible.</p>
          <p>The three parts of this practice Reading test are presented over three separate web pages. 
            Make sure you move swiftly from one page to the next so that your practice is as realistic as possible.</p>
        </Col>
      </Row>
    </Row>
  );
};
export default Luxury;
