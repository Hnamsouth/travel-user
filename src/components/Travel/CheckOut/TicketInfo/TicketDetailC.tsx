import { BusStructureData, DeleteBusData, GetBusStructureData, GetSeatSelected, Seat } from "@app/api/main/bus.api";
import { Button, Form, Popconfirm, Space, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditTicketDetailTableCell } from "./EditTicketDetailTableCell";
import { EditTicketDetail, TicketDetail } from "@app/api/main/ticket.api";
import { SeatStructureFormModal } from "../../Home/AddTicket/SeatStructureFormModal";
import { ITicketInfo } from "./TicketInfo";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PusherSV } from "@app/services/pusher.service";
import { useNavigate } from "react-router-dom";



const TicketDetailC: React.FC<ITicketInfo> = React.memo(({ Ticket, setTicket }) => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [editingKey, setEditingKey] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)
    const [visible, setVisible] = useState(false);
    const [seatBooked,setSeatBooked]=useState<string>("");

    const [busStt, setBusStt] = useState<BusStructureData>( {} as BusStructureData);
    const isEditing = (record: TicketDetail) => record.id === editingKey;
    const save = async (key: React.Key) => {
        try {
            const newItem = (await form.validateFields());
            const newTkDt = [...Ticket.ticketDetails];
            const index = newTkDt.findIndex((item) => key === item.id);
            const oldItem = newTkDt[index];
            if (index > -1) {
                oldItem["ownerName"] = newItem["ownerName"];
                oldItem["ownerAge"] = newItem["ownerAge"];
                oldItem["seat"] = seatBooked;
                const rs = await EditTicketDetail(oldItem);
                if (rs) {
                    newTkDt.splice(index, 1, { ...rs });
                    setTicket({ ...Ticket, ticketDetails: newTkDt,total:Ticket.total+(rs.price -oldItem.price) });
                    message.success("Edit success");
                } else {
                    message.error("Edit Faild");
                }
            } else {
                message.error("Edit not found");
            }
            setEditingKey(0);
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }
    const FetchbusStt = useCallback(async () => {
        setLoading(true);
        await GetBusStructureData(Ticket.idTravelRoute)
            .then((res) => {
                setBusStt(res);
                setLoading(false);
            });
    },[Ticket.idTravelRoute,seatBooked]);

    const showChooseSeat = useCallback(() => {
        setVisible(true);
    }, []);

    const edit = async (record: Partial<TicketDetail> & { id: React.Key }) => {
        form.setFieldsValue({ ...record });
        setSeatBooked(record.seat as string);
        setEditingKey(record.id as number);
    };
    const cancel = useCallback(() => {
        setVisible(false);
    }, []);
    const handleDeleteRow = async (rowId: number) => {
        try {
            const rs = await DeleteBusData({ name: "type-bus", id: rowId });
            message.success("Delete success");
            // setTableData({ ...tableData, data: tableData.data.filter((item) => item.id !== rowId) });
        } catch (error) {
            message.success("Delete failed");
        }
    };
    const columns = [
        {
            title: t('common.ticket.detail.name'),
            dataIndex: 'ownerName',
            width: '30%',
            editable: true,
            key: "name",
        },
        {
            title: t('common.ticket.detail.age'),
            dataIndex: 'ownerAge',
            width: '10%',
            editable: true,
            key: "age"
        },
        {
            title: t('common.ticket.detail.seat'),
            dataIndex: 'seat',
            width: '10%',
            editable: true,
            key: "seat",
        },
        {
            title: t('common.ticket.detail.price'),
            dataIndex: 'price',
            width: '15%',
            key: "price",
        },
        {
            title: t('tables.actions'),
            dataIndex: 'actions',
            key: "actions",
            width: '10%',
            render: (text: string, record: TicketDetail) => {
                const editable = isEditing(record);
                return (
                    <Space>
                        {editable ? (
                            <>
                                <Popconfirm title={t('tables.cancelInfo')} onConfirm={() => save(record.id)}>
                                    <Button type="primary"  >
                                        {t('common.save')}
                                    </Button>
                                </Popconfirm>
                                <Popconfirm title={t('tables.cancelInfo')} onConfirm={() => { setEditingKey(0) }}>
                                    <Button type="ghost">{t('common.cancel')}</Button>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <Popconfirm title={t('tables.deleteInfo')} onConfirm={() => edit(record)}>
                                    <Button type="ghost" disabled={editingKey !== 0} icon={<EditOutlined />}></Button>
                                </Popconfirm>
                                <Popconfirm title={t('tables.deleteInfo')} onConfirm={() => handleDeleteRow(record.id)}>
                                    <Button type="default" disabled={editingKey !== 0} danger icon={<DeleteOutlined />}></Button>
                                </Popconfirm>
                            </>
                        )}
                    </Space>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: TicketDetail) => ({
                record,
                inputType: col.dataIndex,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                showChooseSeat: showChooseSeat
            }),
        };
    });

    const SeatChanged = async () => {
        const p = PusherSV();
        const channel = p.subscribe("tickets");
        channel.bind(`seat-update`, async (rs: {IdTravelRoute:number,IsRemove:boolean}|any) => {
            if(rs.IsRemove){
                // ask ctm payment or not => true: set create_at+= 3 minute false:remove

            }else{
                FetchbusStt();
            }
        })
        return () => p.unsubscribe("tickets");
    }

    useEffect(() => {
        FetchbusStt();
        SeatChanged();
        return ()=>{}
    }, [Ticket]);

    return (
        <Form.Provider
            onFormFinish={(name, { values, forms }) => {
                if (name === 'selectSeat') {
                    setSeatBooked(values.seat[0]);
                }
            }}
        >
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditTicketDetailTableCell,
                        },
                    }}
                    bordered
                    dataSource={Ticket.ticketDetails}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    loading={loading}
                    scroll={{ x: 800 }}
                    pagination={false}
                />
                <SeatStructureFormModal BusStructureData={busStt} seatBooked={seatBooked} onCancel={cancel} visible={visible} />
            </Form>

        </Form.Provider>


    )
});

export default TicketDetailC;