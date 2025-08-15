import { OrderStatusEnum } from "../enums/order-enums";

export type OrderCreatedUpdatedEvent = {
    id: number;
    status: OrderStatusEnum;
    userId: number;
    ticketId: number;
    expiresAt?: string;
}

export type OrderDeletedEvent = {
    id: number;
}
