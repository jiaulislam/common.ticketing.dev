import {Subject} from "./subject";

export interface TicketCreatedUpdatedEvent {
    subject: Subject.TICKET_CREATED | Subject.TICKET_UPDATED;
    data: {
        id: number;
        title: string;
        price: number;
        userId: number;
    };
}

export interface TicketDeletedEvent {
    subject: Subject.TICKET_DELETED;
    data: {
        id: number;
    };
}

