import { Result } from "@app/components/common/Result/Result";
import { Button, Col, Modal, Row } from "antd";
import React from "react"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface IPaymentSuccessModal {
    PMmodal: {visible:boolean,orderId:string},
    onCancel: () => void,

}

const PaymentSuccessModal: React.FC<IPaymentSuccessModal> = React.memo(({ PMmodal, onCancel }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const buyAgain = () => {
        navigate("/");
    }
    return (
        <Modal title={t('forms.bus.newTypeSeat')} visible={PMmodal.visible} closable={false} footer={<></>}>
            <Result
                status="success"
                title={<span style={{margin:"10px 0"}}>{t('payment.titlests')}</span>}
                subTitle={"Order number: "+PMmodal.orderId+". "+t('payment.subtitle')}
                extra={[
                    <Row gutter={[20, 20]}>
                        <Col span={12}>
                            <Button type="primary" key="console">{t('results.goConsole')}</Button>,
                        </Col>
                        <Col span={12}>
                            <Button type="default" onClick={buyAgain}>{t('results.buyAgain')}</Button>
                        </Col>
                    </Row>
                ]}
            />
        </Modal>
    )
})

export default PaymentSuccessModal;