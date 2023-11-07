import { Row, Col } from "antd";
import TicketInfo from "./TicketInfo/TicketInfo";
import PaymentMethod from "./PaymentMerhod";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Tickets, getTicketById } from "@app/api/main/ticket.api";
import { useMounted } from "@app/hooks/useMounted";

const Payment: React.FC = () => {

    const params = useParams();
    const [Ticket, setTicket] = useState<Tickets>({} as Tickets);
    const { isMounted } = useMounted();

    // const ticket = useAppSelector((state)=>state.ticket);
    const fetchData = useCallback( async() => {
        await getTicketById(params.id as string).then((res)=>{
            console.log(res)
            setTicket(res);
        })
    }, [isMounted])

    useEffect(() => {
        fetchData();
        return () => {
        };
    }, []);


    return (
        <Row gutter={[30, 30]}>
            <Col span={18}>
                <TicketInfo Ticket={Ticket} setTicket={setTicket}/>
            </Col>
            <Col span={6}>
                <PaymentMethod TicketCreated={Ticket} />
            </Col>
        </Row>
    )
}
export default Payment;