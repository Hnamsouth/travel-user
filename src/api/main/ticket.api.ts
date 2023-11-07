import { httpApi } from "../http.api";
import { BusSchedule, TravelRoute } from "./route.api";
import { Users } from "./user.api";

export interface Pagination {
    current?: number;
    pageSize?: number;
    total?: number;
}
export interface TableData<d> {
    data: d[],
    pagination: Pagination;
}

export interface Tickets {
    "id": number,
    "name": string,
    "phone": string,
    "status": number,
    "createAt": string,
    "departureDate": string,
    "email": string,
    "total":number,
    "paypalOrderId": string | null,
    "price": number | null,
    "idTravelRoute": number,
    "idTravelRouteNavigation": TravelRoute | null,
    "idUser": null,
    "idUserNavigation": Users | null,
    "ticketDetails": TicketDetail[] | []
}


export interface TicketDetail {
    "id": number,
    "ownerName": string,
    "ownerAge": number,
    "seat": string,
    "price": number,
    "idTicket": number,
    "idTicketNavigation": Tickets | null,
    "refundRequests": []
}
export interface PriceForAge {
    "id":number,
    "ageFrom":number,
    "ageTo":number,
    "percentPrice":number
}

export interface TKDTdata {
    seat: string, 
    ownerName: string, 
    ownerAge: number | null, 
    key: number, 
    price: number | string,
    id:number|0,
}
export interface TKdata {
    name: string, 
    phone: string, 
    email: string, 
    idUser: number , 
    idTravelRoute: number | string, 
    total: number | string,
    id:number|0
}

export interface CreateTicketInfo{
    "ticket":TKdata,
    "ticketDetails":TKDTdata[]
}

export const getTicketTableData = (pagination: Pagination): Promise<TableData<Tickets>> => {
    return new Promise((res) => {
        setTimeout(() => {
            res({
                data: [],
                pagination: { ...pagination, total: 20 },
            });
        }, 1000);
    });
};

export const getPriceForAgeData = async ():Promise<PriceForAge[]> => httpApi.get<PriceForAge[]>('ticket/get-data?type=pfa').then((res)=>res.data).catch((err)=>err);
export const CreateTicket = async (data:CreateTicketInfo):Promise<Tickets>=>httpApi.post<Tickets>('ticket/create',data).then((res)=>res.data).catch((err)=>err);
export const EditTicket = async (data:Tickets):Promise<Tickets>=>httpApi.put<Tickets>('ticket/edit',data).then((res)=>res.data).catch((err)=>err);
export const getTicketById = (id:string):Promise<Tickets> =>httpApi.get(`ticket/get-data?type=${id}`).then((res)=>res.data).catch((err)=>err);
export const EditTicketDetail =async (data:TicketDetail):Promise<TicketDetail> => httpApi.put<TicketDetail>("ticket/edit-tkdt",data).then((res)=>res.data).catch(err=>err);