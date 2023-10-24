
import React, { useCallback, useEffect, useState } from 'react';
import { Col, Input, Row, Tooltip, Form, Card, Tag, Space, Radio, message, FormListFieldData, InputNumber } from 'antd';


import { SearchInput as CommonSearchInput } from 'components/common/inputs/SearchInput/SearchInput';
import { CalendarOutlined, CloseOutlined, EditOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, SwapOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DayjsDatePicker } from '@app/components/common/pickers/DayjsDatePicker';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { BusSchedule, Location, Route, SearchTravelRoute, TravelRoute, getBusScheduleTableData, getLocationTableData, getRouteTableData } from '@app/api/main/route.api';
import { useMounted } from '@app/hooks/useMounted';
import { Spinner } from '@app/components/common/Spinner/Spinner';
import { Steps, Step } from '@app/components/common/Steps/Steps';
import { Rate } from '@app/components/common/Rate/Rate';
import { MdAvTimer, MdOutlineFmdGood, MdOutlineGpsFixed } from 'react-icons/md'
import { OnApproveBraintreeData, PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import dayjs from 'dayjs';
import { parse, format, addMinutes } from 'date-fns';
import { SeatStructureFormModal } from './SeatStructureFormModal';
import { BusStructure, BusStructureData, GetBusStructureData } from '@app/api/main/bus.api';
import { CreateTicket, EditTicket, PriceForAge, TKDTdata, TKdata, TicketDetail, Tickets, getPriceForAgeData } from '@app/api/main/ticket.api';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { InternalNamePath } from 'antd/lib/form/interface';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { CheckBox } from '@app/components/header/components/searchDropdown/searchOverlay/SearchFilter/SearchFilter.styles';
import { Rating } from '@app/components/medical-dashboard/favoriteDoctors/DoctorCard/DoctorCard.styles';

const initialOptions = {
    clientId: "ARhIk8S1SjumPvjUXqmKwGEGHXs7sy3qnhYMOkOdiC51L3yzfIT6Py5ZgLWkjlhf8JZGcaK1KSYzg-vb",
    currency: "USD",
    intent: "capture",
};

interface FormData {
    BusScheduleList: BusSchedule[],
    LocationList: Location[],
    Routes: Route[],
    loading: boolean,
    from_selected: number | null,
    to_selected: number | null,
    PriceForAge: PriceForAge[]
}

interface IBigData {
    TravelRouteData: TravelRoute[] | [],
    TravelRouteSelected: TravelRoute,
    BusStructureData: BusStructureData,
    TicketSold: Tickets[] | [],
    TicketDetailData: TKDTdata[],
    TicketData: TKdata,
    fieldTKDT: FormListFieldData[],
    TicketCreated: Tickets

}

const Home: React.FC = () => {
    const user = useAppSelector((state) => state.user);
    const { t } = useTranslation();
    const { isMounted } = useMounted();
    const [form] = Form.useForm();
    const [formAddTicket] = Form.useForm();
    const [BigData, setBigData] = useState<IBigData>({
        TravelRouteData: [],
        TravelRouteSelected: {} as TravelRoute,
        BusStructureData: { busStructure: {} as BusStructure, seat: [] },
        TicketSold: [],
        TicketDetailData: [],
        fieldTKDT: [],
        TicketData: {} as TKdata,
        TicketCreated: {} as Tickets
    });
    const [seatSelected, setSeatSelected] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState({ method: 0, checkout: false });
    const [isReturnDate, setIsReturnDate] = useState(false);
    const [searchData, setSearchData] = useState<FormData>({ BusScheduleList: [], LocationList: [], Routes: [], loading: false, from_selected: null, to_selected: null, PriceForAge: [] });
    const [searchResult, setSearchResult] = useState<{ from: number, to: number }>({ from: 0, to: 0 });

    const fetchData = useCallback((p: { current: number, pageSize: number }) => {
        setSearchData({ ...searchData, loading: true })
        getBusScheduleTableData(p).then((res) => {
            getLocationTableData(p).then((res1) => {
                getRouteTableData(p).then((res2) => {
                    getPriceForAgeData().then((res3) => {
                        if (isMounted) {
                            setSearchData({ BusScheduleList: res.data, LocationList: res1.data, Routes: res2.data, loading: false, from_selected: null, to_selected: null, PriceForAge: res3 })
                        }
                    })
                })
            })
        })
    }, [isMounted, BigData.TicketCreated])

    useEffect(() => {
        fetchData({ current: 1, pageSize: 16 })
        return () => {
        }
    }, [])
    const showFormModal = () => setVisible(true);

    const hideFormModal = () => setVisible(false);

    // filter
    const setOnlyDate = () => {
        form.setFieldValue('date', '');
        setIsReturnDate(false)
    }
    const setRangeDate = () => {
        setIsReturnDate(true)
    }
    const CheckBusSchedule = async () => {
        let formData = await form.validateFields();
        formData.date = formData.date.length ? formData.date.map((e: string | number | Date | dayjs.Dayjs | null | undefined) => dayjs(e).day()) : [dayjs(formData.date).day()];
        const travelRouteData = await SearchTravelRoute(formData);
        if (travelRouteData) {
            setBigData({ ...BigData, TravelRouteData: travelRouteData });
        }
    }
    // select travel route
    const SelectTraverRoute = async (data: TravelRoute) => {
        await GetBusStructureData(data.idBusScheduleNavigation?.idBusNavigation?.idTypeBus as number, data.id).then((res) => {
            setBigData({ ...BigData, BusStructureData: res, TravelRouteSelected: data })
        });
        message.success("Selected")
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
                ownerAge: BigData.TicketDetailData[i] && BigData.TicketDetailData[i].ownerAge || 0,
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



    const checkTickHolder = async (add: any) => {
        let row = await formAddTicket.validateFields()
        add();
    }

    const AddTicket = async () => {
        const data = await formAddTicket.validateFields();
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

            console.log({ ticket: ticket, ticketDetails: tkdt })
            const rs = await CreateTicket({ ticket: ticket, ticketDetails: tkdt });
            if (rs != null) {
                ticket.id = rs.id;
                setBigData({ ...BigData, TicketData: ticket, TicketDetailData: tkdt, TicketCreated: rs })
                message.success("Ticket Created");
            } else {
                message.error("Create Ticket Faild");
            }
        }
    }
    const PaymentCompleted = async (orderData: any) => {
        let old = { ...BigData.TicketCreated };
        old.paypalOrderId = orderData.orderID;
        const rs = await EditTicket(old);
        if (rs) {


            message.success("Transaction Completed")
        } else {
            message.error("Transaction faild");
        }
    }

    const onFinish = (value: any) => {
        console.log(value)
    }

    const CheckOut = () => {


        setPaymentMethod({ ...paymentMethod, checkout: true })
    }

    const ticketPrice = (e: TKDTdata) => {
        let p = BigData.TravelRouteSelected.idRouteNavigation?.price as number + (BigData.BusStructureData.busStructure.idTypeBusNavigation?.pricePlus as number);
        console.log(searchData.PriceForAge)
        let p2 = searchData.PriceForAge.find(a => a.ageFrom <= e.ownerAge && a.ageTo >= e.ownerAge)?.percentPrice as number;
        console.log(p2)
        console.log(p + (p * p2 / 100))
        return p + (p * p2 / 100);
    }

    return (
        <Row gutter={[30, 30]}>
            {/* search */}
            <Col span={24}>
                <Card title={t('autoCompletes.categories')} style={{ alignItems: "center" }}  >
                    {searchData.loading ? (
                        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                            <Spinner />
                        </Col>
                    ) : (
                        <Form form={form}  >
                            <Row gutter={[20, 20]} justify='center'>
                                <Col span={5}>
                                    <Form.Item
                                        name="from_id"
                                        rules={[{ required: true, message: "Please select departure" }]}
                                    >
                                        <Select placeholder={"From"} width={180} onChange={(e) => setSearchResult({ ...searchResult, from: e as number })}>
                                            {
                                                searchData.LocationList.filter(f => searchData.Routes.filter(r => r.idFromLocation === f.id).length > 0 && f.id != searchResult.to).
                                                    map((e, i) => <Option key={"to" + i} value={e.id}>{e.name} ({e.area})</Option>)
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item
                                        name="to_id"
                                        rules={[{ required: true, message: "Please select destination" }]}
                                    >
                                        <Select placeholder={"To"} width={180} onChange={(e) => setSearchResult({ ...searchResult, to: e as number })} >
                                            {
                                                searchData.LocationList.filter(f => searchData.Routes.filter(r => r.idToLocation === f.id).length > 0 && f.id != searchResult.from).
                                                    map((e, i) => <Option key={"to" + i} value={e.id}>{e.name} ({e.area})</Option>)
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>

                                {isReturnDate ? (
                                    <Col span={8}>
                                        <Row gutter={[5, 0]}>
                                            <Col span={20}>
                                                <Form.Item name="date">
                                                    <DayjsDatePicker.RangePicker />
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Tooltip title={t('page.home.btn.removeReturnDate')}>
                                                    <CloseOutlined onClick={setOnlyDate} />
                                                </Tooltip>
                                            </Col>
                                        </Row>
                                    </Col>
                                ) : (<Col span={8}>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item name="date" rules={[{ required: true, message: "Please Choose Departure Date" }]}>
                                                <DayjsDatePicker  placeholder='Start' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Button icon={<PlusCircleOutlined />} onClick={setRangeDate}>{t('page.home.btn.addReturnDate')}</Button>
                                        </Col>
                                    </Row>
                                </Col>)
                                }
                                <Col span={2}>
                                    <Button type='primary' onClick={() => CheckBusSchedule()}> Check</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}


                </Card>
            </Col>
            {/* bus schedule */}
            <Col span={24}>
                <Row gutter={[30, 30]}>
                    <Col xl={6}>
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
                    </Col>
                    <Col xl={18}>
                        {BigData.TravelRouteData.length > 0 ? (
                            <Row gutter={[20, 20]}>
                                {/* render  Travel Route */}
                                {BigData.TravelRouteData.map((e, i) => {
                                    const price = e.idRouteNavigation?.price as number + (e.idRouteNavigation?.price as number * (e.idBusScheduleNavigation?.idBusNavigation?.idTypeBusNavigation?.pricePlus as number) / 100)
                                    const time = e.idRouteNavigation?.time as number;
                                    const timeRender = ((time % 60) === 0 ? (time / 60) + "h" : (time / 60) > 0 ? Math.floor(time / 60) + "h" + (time % 60) + "m" : time + "m");
                                    const timeObject = parse(e.timeStart, 'HH:mm:ss', new Date());
                                    return (
                                        <Col span={24}>
                                            <Card>
                                                <Row gutter={[15, 15]}>
                                                    <Col span={6}>
                                                        <img height={200} width={200} alt='asd' src='https://static.vexere.com/production/images/1692761942490.jpeg?w=250&h=250'></img>
                                                    </Col>
                                                    <Col span={18}>
                                                        <Row gutter={[15, 15]}>
                                                            <Col span={16}>
                                                                <Button type='text'>
                                                                    <h3> {e.idBusScheduleNavigation?.idBusNavigation?.idTypeBusNavigation?.name} ({e.idBusScheduleNavigation?.idBusNavigation?.number})  <span><Rate disabled defaultValue={1} count={1} /> 4.5</span></h3>
                                                                </Button>
                                                            </Col>
                                                            <Col span={8}>
                                                                <Button type='text'>Adult Ticket: {price} $ </Button>
                                                            </Col>
                                                            <Col span={16}>
                                                                <h3>15/30 Seats Purchased</h3>
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
                                                                            <Button type='primary' onClick={() => SelectTraverRoute(e)}> Buy Ticket</Button>
                                                                        </Col>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    )
                                })}

                            </Row>
                        ) : (<h3>Empty</h3>)}


                    </Col >
                </Row >
            </Col >
            {/* add ticket */}
            <Col span={24}>
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
                            onFinish={onFinish}
                            form={formAddTicket}
                        >
                            <h3>Add Ticket Holder Info</h3>
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
                            {/*  */}
                            <Form.List
                                name={"ticketDetail"}
                            >
                                {(fields, { add, remove }) => (
                                    <>
                                        <h3>Add Ticket</h3>
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
                                            {/* <Button type="dashed" onClick={()=>addTicketDT(["asd"])} block icon={<PlusOutlined />}>
                                                Add Ticket
                                            </Button> */}
                                            <Button type="dashed" onClick={() => ChooseSeat()} block icon={<PlusOutlined />}>
                                                Choose Seat
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            {/*  */}
                            <Form.Item>
                                <Row justify="end" align="bottom">
                                    <Col span={3}>
                                        <Button type="primary" onClick={AddTicket}>
                                            Check Out
                                        </Button>
                                    </Col>
                                    <Col span={3}>
                                        <h3><strong>Total:200$</strong></h3>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                        <SeatStructureFormModal visible={visible} onCancel={hideFormModal} BusStructureData={BigData.BusStructureData} seatSelected={seatSelected} setSeatSelected={setSeatSelected} />
                    </BaseForm.Provider>

                </Card>
            </Col>
            {/* payment */}
            <Col span={24}>
                <Row gutter={[30, 30]}>
                    <Col span={18}>
                        <Card>
                            {BigData.TicketData && BigData.TicketDetailData.length > 0 && (
                                <>
                                    <Col style={{ marginBottom: "15px" }}>
                                        <h3>Ticket Holder</h3>
                                        <hr />
                                        <Row justify="end">
                                            <Col span={19}>
                                                <Row gutter={[20, 20]} style={{ flexDirection: "column" }}>
                                                    <Col><strong>Name:</strong> {BigData.TicketData.name}</Col>
                                                    <Col><strong>Phone:</strong> {BigData.TicketData.phone}</Col>
                                                    <Col><strong>Email:</strong> {BigData.TicketData.email}</Col>
                                                </Row>
                                            </Col>
                                            <Col span={2}>
                                                <Button type='text' icon={<EditOutlined />}>Edit</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <h3>Tickets</h3>
                                        <hr />
                                        {BigData.TicketDetailData.map((e, i) => {

                                            return (
                                                <Row key={i} style={{ alignItems: "center" }}>
                                                    <Col span={22} >
                                                        <Row gutter={[20, 20]} justify="space-around">
                                                            <Col><strong>Name:</strong>{e.ownerName}</Col>
                                                            <Col><strong>Age:</strong> {e.ownerAge}</Col>
                                                            <Col><strong>Seat:</strong> {e.seat}</Col>
                                                            <Col><strong>Price:</strong> {e.price} $</Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={2}>
                                                        <Button type='text' icon={<EditOutlined />}>Edit</Button>
                                                    </Col>
                                                </Row>
                                            )
                                        })}

                                    </Col>
                                    <Row >
                                        <Col>
                                            <h3><strong>Total:</strong> {BigData.TicketData.total}$</h3>
                                        </Col>
                                    </Row>
                                </>
                            )}

                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card >
                            <h3>Payment Method</h3>
                            <Space direction="vertical"  >
                                <Radio.Group style={{ display: "flex", flexDirection: "column" }} onChange={(e) => setPaymentMethod({ ...paymentMethod, method: e.target.value })}>
                                    <Radio value={1}>Paypal</Radio>
                                    <Radio value={2}>Other </Radio>
                                </Radio.Group>
                            </Space>
                            {!paymentMethod.checkout ? (
                                <Button type='primary' onClick={() => CheckOut()}>Payment</Button>
                            ) : (
                                paymentMethod.method === 1 ? (
                                    <PayPalScriptProvider options={initialOptions}>
                                        <PayPalButtons
                                            createOrder={(data: any, actions: any) => {
                                                return actions.order.create({
                                                    purchase_units: [{
                                                        description: JSON.stringify(BigData.TicketData),
                                                        "amount": {
                                                            "value": 10
                                                        },
                                                    }]
                                                });
                                            }}
                                            onApprove={async (data: any, actions: any) => {
                                                const order = await actions.order.capture();
                                                PaymentCompleted(data)
                                            }}
                                            onError={(err: any) => {
                                                console.error("PayPal Checkout onError", err);
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                ) : <></>
                            )}
                        </Card>
                    </Col>
                </Row>

            </Col>
        </Row >

    )
}
// ^4.22.4
export default Home;