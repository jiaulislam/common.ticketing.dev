export type TicketCreatedUpdatedEvent = {
    id: number;
    title: string;
    price: number;
    userId: number;
}

export type TicketDeletedEvent = {
    id: number;
}
