import React, { useState } from "react";
import { Col, Row, Tooltip, Form, Button, Card, message } from 'antd';
import { Select, Option } from "@app/components/common/selects/Select/Select";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { DayjsDatePicker } from "@app/components/common/pickers/DayjsDatePicker";
import { FormInstance } from "antd/lib/form";
import { IsearchData, FormData, IBigData } from "./Home";
import { useTranslation } from "react-i18next";
import { Spinner } from "@app/components/common/Spinner/Spinner.styles";
import { SearchTravelRoute } from "@app/api/main/route.api";
import dayjs from "dayjs";


interface SearchData {
    BigData: IBigData,
    setBigData: React.Dispatch<React.SetStateAction<IBigData>>,
    form: FormInstance<any>,
    searchData: FormData,
}

const SearchSchedule: React.FC<SearchData> = React.memo(({ BigData, setBigData, form, searchData }) => {
    const { t } = useTranslation();
    const [isReturnDate, setIsReturnDate] = useState(false);
    const [searchResult, setSearchResult] = useState<IsearchData>({ from: 0, to: 0 });


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


    return (
        <Card style={{ alignItems: "center" }}  >
            {searchData.loading ? (
                <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                    <Spinner />
                </Col>
            ) : (
                <Form form={form}  >
                    <Row gutter={[20, 20]} justify='center'>
                        <Col xl={6} md={12} xs={24}>
                            <Form.Item
                                name="from_id"
                                rules={[{ required: true, message: "Please select departure" }]}
                            >
                                <Select placeholder={t("page.home.searchSchedule.from")} width={180} onChange={(e) => setSearchResult({ ...searchResult, from: e as number })}>
                                    {
                                        searchData.LocationList.filter(f => searchData.Routes.filter(r => r.idFromLocation === f.id).length > 0 && f.id != searchResult.to).
                                            map((e, i) => <Option key={"to" + i} value={e.id}>{e.name} ({e.area})</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xl={6} md={12}  xs={24}>
                            <Form.Item
                                name="to_id"
                                rules={[{ required: true, message: "Please select destination" }]}
                            >
                                <Select placeholder={t("page.home.searchSchedule.to")} width={180} onChange={(e) => setSearchResult({ ...searchResult, to: e as number })} >
                                    {
                                        searchData.LocationList.filter(f => searchData.Routes.filter(r => r.idToLocation === f.id).length > 0 && f.id != searchResult.from).
                                            map((e, i) => <Option key={"to" + i} value={e.id}>{e.name} ({e.area})</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        {isReturnDate ? (
                            <Col xl={6} md={12}>
                                <Row gutter={[20,20]}>
                                    <Col span={20} >
                                        <Form.Item name="date">
                                            <DayjsDatePicker.RangePicker/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Tooltip title={t('page.home.btn.tooltip.removeReturnDate')}>
                                            <Button><CloseOutlined onClick={setOnlyDate} /></Button>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Col>
                        ) : (
                            <Col xl={6} md={12} xs={24}>
                                <Form.Item name="date" rules={[{ required: true, message: "Please Choose Departure Date" }]}>
                                    <DayjsDatePicker placeholder={t("page.home.searchSchedule.departureDate")}  style={{width:"100%"}}/>
                                </Form.Item>
                            </Col>
                        )
                        }
                        <Col xl={6} md={12} >
                            <Row gutter={[20, 20]}>
                                {!isReturnDate && (
                                    <Col span={15} >
                                        <Button icon={<PlusCircleOutlined />} onClick={setRangeDate}>{t('page.home.searchSchedule.returnDate')}</Button>
                                    </Col>
                                )}
                                <Col span={!isReturnDate?8:24}>
                                    <Button type='primary' onClick={() => CheckBusSchedule()}>{t("page.home.searchSchedule.search")}</Button>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Form>
            )}
        </Card>

    )
});

export default SearchSchedule;