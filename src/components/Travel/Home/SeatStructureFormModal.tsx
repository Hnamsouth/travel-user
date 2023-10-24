import React, { useState, useCallback, useEffect } from 'react';
import { Button, Form, Modal, Row, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useResetFormOnCloseModal } from '@app/components/forms/ControlForm/useResetFormOnCloseModal';
import { BusStructure, BusStructureData, GetBusStructureData, SeatStructure, TypeBus } from '@app/api/main/bus.api';
import { FormInstance } from 'antd/es/form/Form';
import { Spinner } from '@app/components/common/Spinner/Spinner';
import { ButtonType } from 'antd/lib/button';
import { Tickets } from '@app/api/main/ticket.api';



interface SeatStructureFormModal {
    visible: boolean;
    onCancel: () => void;
    BusStructureData: BusStructureData,
    seatSelected:string[];
    setSeatSelected:React.Dispatch<React.SetStateAction<string[]>>
}

export const SeatStructureFormModal: React.FC<SeatStructureFormModal> = React.memo(
    ({ visible, onCancel, BusStructureData,seatSelected,setSeatSelected}) => {
        const { t } = useTranslation();
        const [formAddTKDT]=Form.useForm();
    
        const setArray = (number: number) => {
            let data = [];
            for (let i = 0; i < number; i++) {
                data.push(i);
            }
            return data;
        }
        let letter = 'A';
        const setSeat = (seat: string) => {
            let oldSeat = [...seatSelected];
            let index = oldSeat.indexOf(seat);
            index > -1 ? oldSeat.splice(index, 1) : oldSeat.push(seat);
            setSeatSelected(oldSeat)
        }
        // seat stt, bus stt, tb-ts
        const onOk = () => {
            formAddTKDT.setFieldValue('seat', seatSelected);
            formAddTKDT.submit();
            onCancel();
        };

        return (
            <Modal title={t('forms.bus.newTypeSeat')} visible={visible} onOk={onOk} onCancel={onCancel}>
                <Form form={formAddTKDT} layout="vertical"  name='selectSeat'>
                    <Form.Item
                        name="seat"
                        label={"Pick Seat"}
                        rules={[{ required: true, message: t('common.requiredField') }]}
                    >
                        {BusStructureData.busStructure != null &&
                            setArray(BusStructureData.busStructure.row).map((r, i) => {
                                return (
                                    <Row key={i} gutter={[0, 8]} justify='center'>
                                        {
                                            setArray(BusStructureData.busStructure.col).map((c, j) => {
                                                let checkSpace = BusStructureData.busStructure.seatStructures.filter(e => e.rowIndex === r && e.colIndex === c).length > 0;
                                                let k = ((BusStructureData.busStructure.col * i) + j);
                                                let nameSeat = i > 0 ?
                                                    (String.fromCharCode(letter.charCodeAt(0) + j) + (k < 10 ? "0" + k : k)) :
                                                    (letter + (j < 10 ? "0" + j : j));
                                                let checkSeatSelected = seatSelected.includes(nameSeat);
                                                let checkSeatSold = BusStructureData.seat.includes(nameSeat);
                                                let types = checkSeatSelected ? "primary" : "default" as ButtonType;
                                                return (
                                                    <Button key={(BusStructureData.busStructure.col * i) + j}
                                                        type={types}
                                                        disabled={checkSpace || checkSeatSold}
                                                        onClick={() => setSeat(nameSeat)}
                                                        style={{ "marginRight": 10 + 'px', "marginBottom": 10 + 'px' }}>
                                                        {nameSeat}
                                                    </Button>
                                                )
                                            })
                                        }
                                    </Row>
                                );
                            })
                        }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
);
