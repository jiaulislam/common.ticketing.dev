export type TicketCreatedUpdatedEvent = {
    id: number;
    title: string;
    price: number;
    userId: number;
    version: number;
}

export type TicketDeletedEvent = {
    id: number;
}
