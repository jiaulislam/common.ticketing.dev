
/**
 * Abstract base service for Prisma model delegates.
 * Provides type-safe CRUD operations, error handling, and enterprise-ready hooks.
 *
 * @template Delegate Prisma delegate type (e.g., Prisma.UserDelegate<false>)
 * @template Entity Model entity type (e.g., Prisma.User)
 * @template FindUniqueArgs Args for findUnique
 * @template FindManyArgs Args for findMany
 * @template CreateArgs Args for create
 * @template UpdateArgs Args for update
 * @template DeleteArgs Args for delete
 * @template CountArgs Args for count
 * @template UpsertArgs Args for upsert
 */
export abstract class BaseModelService<
    Delegate extends {
        findUnique(args: FindUniqueArgs): Promise<Entity | null>;
        findMany(args?: FindManyArgs): Promise<Entity[]>;
        create(args: CreateArgs): Promise<Entity>;
        update(args: UpdateArgs): Promise<Entity>;
        delete(args: DeleteArgs): Promise<Entity>;
        count?: (args?: CountArgs) => Promise<number>;
        upsert?: (args: UpsertArgs) => Promise<Entity>;
    },
    Entity,
    FindUniqueArgs = any,
    FindManyArgs = any,
    CreateArgs = any,
    UpdateArgs = any,
    DeleteArgs = any,
    CountArgs = any,
    UpsertArgs = any
> {
    /**
     * Returns the Prisma model delegate instance.
     */
    protected abstract getModel(): Delegate;

    /**
     * Optional: Override to provide custom logging.
     */
    protected log(message: string, meta?: Record<string, unknown>): void {
        // Implement logging integration here (e.g., Winston, Pino)
        // console.log(`[BaseModelService] ${message}`, meta);
    }

    /**
     * Optional: Override to provide custom error handling.
     */
    protected handleError(error: unknown, operation: string, args?: unknown): never {
        this.log(`Error in ${operation}`, { error, args });
        throw error;
    }

    /**
     * Find entity by unique criteria.
     */
    public async findUnique(args: FindUniqueArgs, delegate?: Delegate): Promise<Entity | null> {
        try {
            return await (delegate ?? this.getModel()).findUnique(args);
        } catch (error) {
            this.handleError(error, 'findUnique', args);
        }
    }

    /**
     * Find all entities matching criteria.
     */
    public async findAll(args?: FindManyArgs, delegate?: Delegate): Promise<Entity[]> {
        try {
            return await (delegate ?? this.getModel()).findMany(args);
        } catch (error) {
            this.handleError(error, 'findAll', args);
        }
    }

    /**
     * Create a new entity.
     */
    public async create(args: CreateArgs, delegate?: Delegate): Promise<Entity> {
        try {
            return await (delegate ?? this.getModel()).create(args);
        } catch (error) {
            this.handleError(error, 'create', args);
        }
    }

    /**
     * Update an entity.
     */
    public async update(args: UpdateArgs, delegate?: Delegate): Promise<Entity> {
        try {
            return await (delegate ?? this.getModel()).update(args);
        } catch (error) {
            this.handleError(error, 'update', args);
        }
    }

    /**
     * Delete an entity.
     */
    public async delete(args: DeleteArgs, delegate?: Delegate): Promise<Entity> {
        try {
            return await (delegate ?? this.getModel()).delete(args);
        } catch (error) {
            this.handleError(error, 'delete', args);
        }
    }

    /**
     * Count entities matching criteria (if supported by delegate).
     */
    public async count(args?: CountArgs, delegate?: Delegate): Promise<number> {
        try {
            if (!this.getModel().count) throw new Error('Count method not implemented on delegate');
            return await (delegate ?? this.getModel()).count!(args);
        } catch (error) {
            this.handleError(error, 'count', args);
        }
    }

    /**
     * Upsert an entity (if supported by delegate).
     */
    public async upsert(args: UpsertArgs, delegate?: Delegate): Promise<Entity> {
        try {
            if (!this.getModel().upsert) throw new Error('Upsert method not implemented on delegate');
            return await (delegate ?? this.getModel()).upsert!(args);
        } catch (error) {
            this.handleError(error, 'upsert', args);
        }
    }
}