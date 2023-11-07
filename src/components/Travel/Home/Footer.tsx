import { Col, Row } from "antd";
import React from "react";

const FooterComponent:React.FC = React.memo(()=>{
    return (
        <Row gutter={[30,30]} justify={"center"}>
            <Col span={6}>
                
            </Col>
            <Col span={6}>

            </Col>
            <Col span={6}>

            </Col>
            <Col span={6}>

            </Col>
            
        </Row>
    );
})
export default FooterComponent;