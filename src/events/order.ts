export type OrderCreatedUpdatedEvent = {
    id: number;
    status: string;
    userId: number;
    ticketId: number;
    expiresAt?: string;
}

export type OrderDeletedEvent = {
    id: number;
}
