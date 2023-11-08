import { Step } from "@app/components/common/Steps/Steps";
import { Row, Col, Card, Button, Rate, Steps, message } from "antd";
import { parse, format, addMinutes } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineGpsFixed, MdAvTimer, MdOutlineFmdGood } from "react-icons/md";
import { IBigData } from "./Home";
import { TravelRoute } from "@app/api/main/route.api";
import { BusStructure, GetBusStructureData } from "@app/api/main/bus.api";
import AddTickets from "./AddTicket/AddTicket";
import { PriceForAge, TKdata } from "@app/api/main/ticket.api";

interface IScheduleList {
    BigData: IBigData,
    setBigData: React.Dispatch<React.SetStateAction<IBigData>>,
    PriceForAge: PriceForAge[]
}

const BusScheduleList: React.FC<IScheduleList> = React.memo(({ BigData, setBigData, PriceForAge }) => {
    const { t } = useTranslation();

    // select travel route
    const SelectTraverRoute = async (data: TravelRoute) => {
        await GetBusStructureData( data.id).then((res) => {
            setBigData({ ...BigData, BusStructureData: res, TravelRouteSelected: data,fieldTKDT:[] })
        });
        message.success("Selected")
    }
    const RemoveTraverRoute = () => {
        setBigData({ ...BigData, BusStructureData: { busStructure: {} as BusStructure, seat: [] }, TravelRouteSelected: {} as TravelRoute, TicketDetailData: [], TicketData: {} as TKdata, fieldTKDT: [] })
    }

    return (
        <>
            {BigData.TravelRouteData.length > 0 ? (
                <Row gutter={[20, 20]}>
                    {/* render  Travel Route */}
                    {BigData.TravelRouteData.map((e, i) => {
                        const price = e.idRouteNavigation?.price as number + (e.idBusScheduleNavigation?.idBusNavigation?.idTypeBusNavigation?.pricePlus as number);
                        const time = e.idRouteNavigation?.time as number;
                        const timeRender = ((time % 60) === 0 ? (time / 60) + "h" : (time / 60) > 0 ? Math.floor(time / 60) + "h" + (time % 60) + "m" : time + "m");
                        const timeObject = parse(e.timeStart, 'HH:mm:ss', new Date());
                        return (
                            <Col span={24}>
                                <Card className="card-asd">
                                    <Row gutter={[15, 15]} style={{ paddingBottom: "20px", alignItems: "center" }}>
                                        <Col span={6}>
                                            <img height={200} width={200} alt='asd' src='https://static.vexere.com/production/images/1692761942490.jpeg?w=250&h=250'></img>
                                        </Col>
                                        <Col span={18}>
                                            <Row gutter={[15, 15]}>
                                                <Col span={16}>
                                                    <h3> {e.idBusScheduleNavigation?.idBusNavigation?.idTypeBusNavigation?.name}  <span><Rate disabled defaultValue={1} count={1} /> 4.5</span></h3>
                                                </Col>
                                                <Col span={8}>
                                                    <Button type='text'>Adult Ticket: {price} $ </Button>
                                                </Col>
                                                <Col span={16}>
                                                    <h3>{e.tickets.length}/{e.idBusScheduleNavigation?.idBusNavigation?.idTypeBusNavigation?.busStructures[0].numberOfSeat} Seats Purchased</h3>
                                                </Col>
                                                <Col span={24}>
                                                    <Row>
                                                        <Col span={18}>
                                                            <Steps direction="vertical" size="small" >
                                                                <Step status="finish" title={format(timeObject, "HH:mm")}
                                                                    icon={<MdOutlineGpsFixed color='#484848' scale={0.8} />}
                                                                    subTitle={<><strong>{e.idRouteNavigation?.idFromLocationNavigation?.name}</strong> :{e.idRouteNavigation?.idFromLocationNavigation?.addres}</>}
                                                                />
                                                                <Step subTitle={timeRender} status="finish"
                                                                    icon={<MdAvTimer scale={0.5} color='#BEC0C6' />}
                                                                />
                                                                <Step status="finish" title={format(addMinutes(timeObject, e.idRouteNavigation?.time as number), "HH:mm")}
                                                                    subTitle={<><strong>{e.idRouteNavigation?.idToLocationNavigation?.name}</strong> :{e.idRouteNavigation?.idToLocationNavigation?.addres}</>}
                                                                    icon={<MdOutlineFmdGood color='#787878' scale={0.8} />}
                                                                />
                                                            </Steps>
                                                        </Col>
                                                        <Col span={6} style={{ display: "flex", alignItems: "flex-end" }}>
                                                            <Col span={24}>
                                                                {e.id === BigData.TravelRouteSelected.id ? (
                                                                    <Button type='default' onClick={() => RemoveTraverRoute()} >{t('common.route.close')}</Button>
                                                                ) : (
                                                                    <Button type='primary' onClick={() => SelectTraverRoute(e)}>{t('common.route.book')}</Button>
                                                                )}
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>
                                        </Col>
                                    </Row>
                                    {e.id === BigData.TravelRouteSelected.id && (
                                        <>
                                            <AddTickets BigData={BigData} setBigData={setBigData} PriceForAge={PriceForAge} />
                                        </>
                                    )}
                                </Card>
                            </Col>
                        )
                    })}

                </Row>
            ) : (<h3>Empty</h3>)}</>
    );
})
export default BusScheduleList;