import React from 'react';
import { Input, InputNumber, Form, Button } from 'antd';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { useTranslation } from 'react-i18next';
import { BusStructure, TypeBus } from '@app/api/main/bus.api';
import { TKDTdata } from '@app/api/main/ticket.api';
import { SeatStructureFormModal } from '../../Home/AddTicket/SeatStructureFormModal';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: string;
    record: TKDTdata;
    showChooseSeat: ()=> void,
    index: number;
    children: React.ReactNode;
    typeBus: TypeBus[]
}

export const EditTicketDetailTableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    showChooseSeat,
    children,
    typeBus,
    ...restProps
}) => {
    const inputNode = dataIndex === 'ownerAge' ?<InputNumber/> : dataIndex === 'ownerName' ? <Input />  : <Button type="default" onClick={showChooseSeat}>Choose Seat</Button>
        ;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
