import React, { useCallback, useEffect, useState } from 'react';
import { Col, Input, Row, Tooltip, Form, Card, Tag, Space, Radio, message, FormListFieldData, InputNumber, Image } from 'antd';
import { Button } from '@app/components/common/buttons/Button/Button';
import { CheckBox } from '@app/components/header/components/searchDropdown/searchOverlay/SearchFilter/SearchFilter.styles';
import { Rating } from '@app/components/medical-dashboard/favoriteDoctors/DoctorCard/DoctorCard.styles';
import Title from 'antd/lib/skeleton/Title';
import { RightButtons } from '@app/pages/uiComponentsPages/modals/PopoversPage';

const Vehicle: React.FC = () => {
  return (
    <Row gutter={[30, 30]}>
      <Col span={24}><h2>Vehicles</h2></Col>
      <Col span={12}>
        <Card>
          <h3>Express</h3>
          <Row gutter={10}>
            <Col className="gutter-row" span={12}>
              <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </Col>
            <Col className="gutter-row" span={12}>
              <h4>Express</h4>
              <p>7 Seats</p>
              <p>The three parts of this practice Reading test are presented over three separate web pages. </p>
              <p>100/100</p>
            </Col>
          </Row>
          <Row>
            <Button type="primary">More</Button>
          </Row>
        </Card>
      </Col>

      <Col span={12}>
        <Card>
          <h3>Luxury</h3>
          <Row gutter={10}>
            <Col className="gutter-row" span={12}>
              <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </Col>
            <Col className="gutter-row" span={12}>
              <h4>Luxury</h4>
              <p>24 Seats</p>
              <p>The three parts of this practice Reading test are presented over three separate web pages. </p>
              <p>100/100</p>
            </Col>
          </Row>
          <Row>
            <Button type="primary">More</Button>
          </Row>
        </Card>
      </Col>

      <Col span={12}>
        <Card>
          <h3>Volvo (non A/C)</h3>
          <Row gutter={10}>
            <Col className="gutter-row" span={12}>
              <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </Col>
            <Col className="gutter-row" span={12}>
              <h4>Volvo (non A/C)</h4>
              <p>45 Seats</p>
              <p>The three parts of this practice Reading test are presented over three separate web pages. </p>
              <p>100/100</p>
            </Col>
          </Row>
          <Row>
            <Button type="primary">More</Button>
          </Row>
        </Card>
      </Col>

      <Col span={12}>
        <Card>
          <h3>Volco A/C</h3>
          <Row gutter={10}>
            <Col className="gutter-row" span={12}>
              <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </Col>
            <Col className="gutter-row" span={12}>
              <h4>Volvo A/C</h4>
              <p>45 Seats</p>
              <p>The three parts of this practice Reading test are presented over three separate web pages. </p>
              <p>100/100</p>
            </Col>
          </Row>
          <Row>
            <Button type="primary">More</Button>
          </Row>
        </Card>
      </Col>

      
    </Row>
  );
};
export default Vehicle;
