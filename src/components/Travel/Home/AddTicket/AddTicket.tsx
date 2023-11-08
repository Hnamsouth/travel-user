import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { Card, Form, Row, Col, Input, InputNumber, Button, message, FormInstance, FormListFieldData } from "antd";
import { InternalNamePath } from "antd/lib/form/interface";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SeatStructureFormModal } from "./SeatStructureFormModal";
import { IBigData } from "../Home";
import { CreateTicket, PriceForAge, TKDTdata } from "@app/api/main/ticket.api";
import {  useAppSelector } from "@app/hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { PusherSV } from "@app/services/pusher.service";
import { GetBusStructureData } from "@app/api/main/bus.api";
import { useTranslation } from "react-i18next";

interface IAddTicket {
    BigData: IBigData,
    setBigData: React.Dispatch<React.SetStateAction<IBigData>>,
    PriceForAge: PriceForAge[]
}
const ID_TICKET: number = 0;

const AddTickets: React.FC<IAddTicket> = React.memo(({ BigData, setBigData, PriceForAge }) => {
    const user = useAppSelector((state) => state.user);
    const [visible, setVisible] = useState(false);
    const [formAddTicket] = Form.useForm();
    const {t} = useTranslation();

    const navigate = useNavigate();
    const hideFormModal = () => setVisible(false);
    const AddTicket = async () => {
        await formAddTicket.validateFields();
        if (BigData.TicketDetailData.length > 0) {
            let ticket = { ...BigData.TicketData };
            let tkdtOld = [...BigData.TicketDetailData];
            let total = 0;
            let tkdt = tkdtOld.map(e => {
                e.price = ticketPrice(e);
                return e;
            })
            tkdtOld.map(e => { return total += ticketPrice(e) })
            ticket.total = total;
            ticket.idTravelRoute = BigData.TravelRouteSelected.id;
            ticket.idUser = user.user?.id as number;
            ticket.id = 0;
            const rs = await CreateTicket({ ticket: ticket, ticketDetails: tkdt });
            if (rs != null) {
                ticket.id = rs.id;
                navigate("/user/checkout/" + (ID_TICKET === 0 ? rs.id : ID_TICKET));
            } else {
                message.error("Create Ticket Faild");
            }
        }
    }
    const ChooseSeat = async () => {
        await formAddTicket.validateFields();
        setVisible(true);
    }
    const addTicketDT = (seat: string[]) => {
        formAddTicket.setFieldsValue({ name: BigData.TicketData.name, phone: BigData.TicketData.phone, email: BigData.TicketData.email })
        let ticketdata: TKDTdata[] = [];

        const newF: FormListFieldData[] = seat.map((e, i) => {
            ticketdata.push({
                seat: e,
                ownerName: BigData.TicketDetailData[i] && BigData.TicketDetailData[i].ownerName || "",
                ownerAge: BigData.TicketDetailData[i] && BigData.TicketDetailData[i].ownerAge || null,
                key: i,
                price: '',
                id: 0
            });
            return ({ name: i, key: i })
        })
        formAddTicket.setFieldValue("ticketDetail", ticketdata)
        setBigData({ ...BigData, TicketDetailData: ticketdata, fieldTKDT: newF });
    };
    const removeTKDT = (index: number) => {
        let oldFields = [...BigData.fieldTKDT];
        let oldTKDT = [...BigData.TicketDetailData];
        oldFields.splice(index, 1);
        oldTKDT.splice(index, 1);
        setBigData({ ...BigData, TicketDetailData: oldTKDT, fieldTKDT: oldFields });
    }
    const ticketPrice = useCallback((e: TKDTdata) => {
        let p = BigData.TravelRouteSelected.idRouteNavigation?.price as number + (BigData.BusStructureData.busStructure.idTypeBusNavigation?.pricePlus as number);
        let p2 = PriceForAge.find(a => a.ageFrom <= (e.ownerAge as number) && a.ageTo >= (e.ownerAge as number))?.percentPrice as number;
        return p + (p * p2 / 100);
    }, []);
    const SeatChanged = async () => {
        const p = PusherSV();
        const channel = p.subscribe("tickets");
        channel.bind(`seat-update`, async (rs: { IdTravelRoute: number, idTypeBus: number } ) => {
            await GetBusStructureData(rs.IdTravelRoute).then((res)=>{
                setBigData({ ...BigData, BusStructureData: res })
            })
        })
        return () => p.unsubscribe("tickets");
    }

    useEffect(() => {
        SeatChanged();
        return () => { }
    }, []);

    return (
        <Card>
            <BaseForm.Provider
                onFormFinish={(name, { values, forms }) => {
                    if (name === "selectSeat") {
                        addTicketDT(values.seat)
                    }
                }}
                onFormChange={(name, { changedFields, forms }) => {
                    if (name === "addTKDT") {
                        let name = changedFields[0].name as InternalNamePath;
                        if (name[0] === "ticketDetail") {
                            let oldTKDT = [...BigData.TicketDetailData];
                            name[2] === 'ownerAge' ? oldTKDT[name[1] as number].ownerAge = changedFields[0].value :
                                oldTKDT[name[1] as number].ownerName = changedFields[0].value;
                            setBigData({ ...BigData, TicketDetailData: oldTKDT });
                        } else {
                            let oldTK = { ...BigData.TicketData };
                            name[0] === "name" ? oldTK.name = changedFields[0].value :
                                name[0] === "phone" ? oldTK.phone = changedFields[0].value :
                                    oldTK.email = changedFields[0].value;
                            setBigData({ ...BigData, TicketData: oldTK });
                        }
                    }
                }}
            >
                <Form
                    name="addTKDT"
                    form={formAddTicket}
                >
                    <h3>{t("page.home.addTicket.purchaserInfo")}</h3>
                    <Row gutter={[30, 30]}>
                        <Col span={8}>
                            <Form.Item
                                name={"phone"}
                                rules={[{ required: true, message: 'Missing Phone' }]}
                            >
                                <Input placeholder={"Phone Holder"} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name={"email"}
                                rules={[{ required: true, message: 'email invalid', type: "email" }]}
                            >
                                <Input placeholder={"Email Holder"} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name={"name"}
                                rules={[{ required: true, message: 'Missing  name' }]}
                            >
                                <Input placeholder={"Name Holder"} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* add list  */}
                    <Form.List
                        name={"ticketDetail"}
                    >
                        {(fields, { add, remove }) => (
                            <>
                                {BigData.fieldTKDT.length>0 && (<h3>{t("page.home.addTicket.holderInfo")}</h3>)}
                                {BigData.fieldTKDT.map(({ key, name, ...restField }, i) =>
                                    <Row key={key} gutter={[30, 30]} align="middle" justify="space-between">
                                        <Col span={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'ownerName']}
                                                rules={[{ required: true, message: 'Name' }]}
                                            >
                                                <Input placeholder="Name" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'ownerAge']}
                                                rules={[{ required: true, message: 'Age' }]}
                                            >
                                                <InputNumber placeholder="age" style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'seat']}
                                                rules={[{ required: true, message: 'Seat' }]}
                                            >
                                                <Input disabled />
                                            </Form.Item>
                                        </Col>
                                        {/* <Col span={5}>
                                                    <strong>Price: 200$</strong>
                                                </Col> */}
                                        <MinusCircleOutlined onClick={() => removeTKDT(i)} />
                                    </Row>
                                )}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => ChooseSeat()} block icon={<PlusOutlined />}>
                                        Choose Seat
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    {/*  */}
                    <Form.Item>
                        <Row justify="start" align="bottom">
                            <Col span={3}>
                                <Button type="primary" htmlType="submit" onClick={AddTicket}>
                                    Check Out
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
                <SeatStructureFormModal visible={visible} onCancel={hideFormModal} BusStructureData={BigData.BusStructureData} seatBooked="" />
            </BaseForm.Provider>

        </Card>
    )
})
export default AddTickets;