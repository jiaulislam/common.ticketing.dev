import {Subject} from "./subject";

export interface OrderCreatedUpdatedEvent {
    subject: Subject.ORDER_CREATED | Subject.ORDER_UPDATED;
    data: {
        id: number;
        status: string;
        userId: number;
        ticketId: number;
    };
}

export interface OrderDeletedEvent {
    subject: Subject.ORDER_DELETED;
    data: {
        id: number;
    };
}