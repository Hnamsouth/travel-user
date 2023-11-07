

import { EditTicket, TKdata, Tickets } from "@app/api/main/ticket.api";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Card, Space, Radio, Button, message, Row } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PaymentSuccessModal from "./PaymentSuccessModal";


interface IPaymentMethod {
    TicketCreated: Tickets,
}

const initialOptions = {
    clientId: "ARhIk8S1SjumPvjUXqmKwGEGHXs7sy3qnhYMOkOdiC51L3yzfIT6Py5ZgLWkjlhf8JZGcaK1KSYzg-vb",
    currency: "USD",
    intent: "capture",
};

const PaymentMethod: React.FC<IPaymentMethod> = React.memo(({ TicketCreated }) => {
    const {t} =useTranslation();
    const [PMmodal,setPMmodal]=useState({visible:false,orderId:""});

    const [paymentMethod, setPaymentMethod] = useState({ method: 0, checkout: false,loading:false,required:false,orderId:"" });

    const CheckOut = () => {
        if(paymentMethod.method!=0){
            setPaymentMethod({ ...paymentMethod, checkout: true})
        }else{
            setPaymentMethod({...paymentMethod,required:true})
        }
    }
    const PaymentCompleted = async (orderData: any) => {
        let old = { ...TicketCreated };
        old.paypalOrderId = orderData.orderID;
        const rs = await EditTicket(old);
        if (rs) {
            message.success("Transaction Completed");
            setPMmodal({visible:true,orderId:orderData.orderID});
        } else {
            message.error("Transaction faild");
        }
    }


    return (
        <Card >
            <Row gutter={[20, 20]} style={{flexDirection:"column"}}>
                <h3>Payment Method</h3>
                <Space direction="vertical"  >
                    <Radio.Group style={{ display: "flex", flexDirection: "column" }} onChange={(e) => setPaymentMethod({ ...paymentMethod, method: e.target.value,required:false })}>
                        <Radio value={1}>Paypal</Radio>
                        <Radio value={2}>Other </Radio>
                    </Radio.Group>
                    {paymentMethod.required && (<span style={{color:"red"}}><strong>{t("notifications.paymentMethodRequired")}</strong></span>)}
                </Space>

                {!paymentMethod.checkout ? (
                    <Button type='primary' onClick={() => CheckOut()} loading={paymentMethod.loading}>Payment</Button>
                ) : (
                    paymentMethod.method === 1 ? (
                        <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons
                                createOrder={(data: any, actions: any) => {
                                    return actions.order.create({
                                        purchase_units: [{
                                            description: "ticket created",
                                            "amount": {
                                                "value": 10
                                            },
                                        }]
                                    });
                                }}
                                onApprove={async (data: any, actions: any) => {
                                    // const order = await actions.order.capture();
                                    PaymentCompleted(data)
                                }}
                                onError={(err: any) => {
                                    console.error("PayPal Checkout onError", err);
                                }}
                            />
                        </PayPalScriptProvider>
                    ) : <></>
                )}
            </Row>
        <PaymentSuccessModal PMmodal={PMmodal} onCancel={()=>{}}/>
        </Card>
    )
})
export default PaymentMethod;