import { EditOutlined } from "@ant-design/icons";
import { TKDTdata, TKdata, TicketDetail, Tickets } from "@app/api/main/ticket.api";
import { Card, Col, Row, Button, Space } from "antd";
import React from "react";
import TicketDetailC from "./TicketDetailC";


export interface ITicketInfo {
    Ticket: Tickets,
    setTicket: React.Dispatch<React.SetStateAction<Tickets>>
}

const TicketInfo: React.FC<ITicketInfo> = React.memo(({ Ticket, setTicket }) => {

    return (
        <Card>
            {Ticket && (
                <>
                    <Col style={{ marginBottom: "15px" }}>
                        <h3>Ticket Holder</h3>
                        <Row justify="end">
                            <Col span={21}>
                                <Row gutter={[20, 20]} style={{ flexDirection: "column" }}>
                                    <Col><strong>Name:</strong> {Ticket.name}</Col>
                                    <Col><strong>Phone:</strong> {Ticket.phone}</Col>
                                    <Col><strong>Email:</strong> {Ticket.email}</Col>
                                </Row>
                            </Col>
                            <Col span={2}>
                                <Button type='text' icon={<EditOutlined />}>Edit</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <h3>Ticket Detail</h3>
                        <Space>
                            <TicketDetailC Ticket={Ticket} setTicket={setTicket} />
                        </Space>
                    </Col>
                    <Row style={{marginTop:"20px"}} justify={"end"}>
                        <Col>
                            <h2><strong style={{color:"GrayText"}}>Total:</strong> <strong >{Ticket.total}</strong> $</h2>
                        </Col>
                    </Row>
                </>
            )}

        </Card>
    )
})
export default TicketInfo;