import { Rating } from "@app/components/common/DoctorProfile/DoctorProfile.styles";
import { CheckBox } from "@app/components/header/components/searchDropdown/searchOverlay/SearchFilter/SearchFilter.styles";
import { Row, Col, Card, Radio, Button } from "antd";
import React from "react";
import BusScheduleList from "./BusScheduleList";


const FilterTravelRoute: React.FC = React.memo(() => {
    return (
        <Row gutter={[30, 30]}>
            <Col span={24}>
                <Card>
                    <h2>Sort By</h2>
                    <Radio.Group defaultValue={1} style={{ display: "flex", flexDirection: "column" }} >
                        <Radio value={1}>Default</Radio>
                        <Radio value={2}>Highest Price</Radio>
                        <Radio value={3}>Lowest Price</Radio>
                        <Radio value={4}>Highest Rating</Radio>
                        <Radio value={5}>Earliest departure time</Radio>
                    </Radio.Group>
                </Card>
            </Col>

            <Col span={24}>
                <Card>
                    <Row gutter={[30, 30]}>
                        <Col span={24}>
                            <h3>Time</h3>
                            <Row gutter={[20, 20]}>
                                <Col span={12}>
                                    <Button type='ghost'>00:00 - 06:00</Button>
                                </Col>
                                <Col span={12}>
                                    <Button type='ghost'>06:01 - 12:00</Button>
                                </Col>
                                <Col span={12}>
                                    <Button type='ghost'>12:01 - 18:00</Button>
                                </Col>
                                <Col span={12}>
                                    <Button type='ghost'>18:01 - 23:59</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <h3>Type Bus</h3>
                            <CheckBox.Group style={{ display: "flex", flexDirection: "column" }} >
                                <CheckBox value={1}>Express</CheckBox>
                                <CheckBox value={2}>Luxury</CheckBox>
                                <CheckBox value={3}>Vovol(non A/C)</CheckBox>
                                <CheckBox value={4}>Vocol (A/C)</CheckBox>
                            </CheckBox.Group>
                        </Col>

                        <Col span={24}>
                            <h3>Rating</h3>
                            <span><Rating value={3} /> 3</span>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
})

export default FilterTravelRoute;