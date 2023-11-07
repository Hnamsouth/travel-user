import React, { useEffect, useState } from 'react';
import { Card, Form, Modal, Row, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { BusStructureData } from '@app/api/main/bus.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import SeatIcon from './SeatIcon';


interface SeatStructureFormModal {
    visible: boolean;
    onCancel: () => void;
    BusStructureData: BusStructureData,
    seatBooked: string
}

export const SeatStructureFormModal: React.FC<SeatStructureFormModal> = React.memo(
    ({ visible, onCancel, BusStructureData, seatBooked }) => {
        const { t } = useTranslation();
        const [formAddTKDT] = Form.useForm();
        const [seatSelected, setSeatSelected] = useState<string[]>([]);
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
                if (index > -1) {
                    seatBooked !== "" ? message.warning("Please choose other Seat.") : oldSeat.splice(index, 1)
                } else {
                    seatBooked !== "" ? oldSeat.splice(0, 1, seat) : oldSeat.push(seat)
                }
                setSeatSelected(oldSeat)
        }
        // seat stt, bus stt, tb-ts
        const onOk = () => {
            formAddTKDT.setFieldValue('seat', seatSelected);
            formAddTKDT.submit();
            onCancel();
        };
        const setSeatBooked = () => {
            if (seatBooked !== "") {
                setSeatSelected([seatBooked]);
            }
        }
        useEffect(() => {
            setSeatBooked();
            return () => { };
        }, [seatBooked])
        return (
            <Modal title={t('forms.bus.newTypeSeat')} visible={visible} onOk={onOk} onCancel={onCancel}>
                <Card>
                    <Form form={formAddTKDT} layout="vertical" name='selectSeat'>
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
                                                    let checkSeatSold = BusStructureData.seat.filter(c => c.seat === nameSeat && c.status === 1).length > 0;
                                                    let checkWaiting = BusStructureData.seat.filter(c => c.seat === nameSeat && c.status === 0 && c.seat !==seatBooked).length > 0;
                                                    return (
                                                        <Button key={(BusStructureData.busStructure.col * i) + j}
                                                            disabled={checkSpace || checkSeatSold || (checkWaiting && !checkSeatSelected)}
                                                            onClick={() => setSeat(nameSeat)}
                                                            style={{ "marginRight": 10 + 'px', "marginBottom": 10 + 'px', opacity: checkSpace ? 0 : 1, border: "none", background: "none" }}
                                                            icon={<SeatIcon type={checkSeatSold ? "disable" : checkSeatSelected ? "selected" : checkWaiting?"waiting": "default"} />}
                                                        >
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
                </Card>
            </Modal>
        );
    }
);
