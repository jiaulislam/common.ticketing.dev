export type OrderCreatedUpdatedEvent = {
    id: number;
    status: string;
    userId: number;
    ticketId: number;
}

export type OrderDeletedEvent = {
    id: number;
}
