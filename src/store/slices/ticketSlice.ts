import { TKDTdata, TicketDetail, Tickets } from '@app/api/main/ticket.api';
import { createAction, createSlice, PrepareAction } from '@reduxjs/toolkit';


export interface TicketSlice {
    ticketInfo: {
        ticket: Tickets;
        ticketDetail: TKDTdata[]
    }
}

const initialState: TicketSlice = {
    ticketInfo: {
        ticket: {} as Tickets,
        ticketDetail: []
    }
};

export const ticketSlice = createSlice({
    name: 'ticketInfo',
    initialState,
    reducers: {
        setTicketInfo: (state, action) => {
            state.ticketInfo = action.payload;
        },
        setTicketDetail:(state, action)=>{
            state.ticketInfo.ticketDetail= action.payload;
        },
        setTicket:(state, action)=>{
            state.ticketInfo.ticket= action.payload;
        },

    },

});

export const {setTicketInfo,setTicketDetail,setTicket} = ticketSlice.actions;

export default ticketSlice.reducer;
