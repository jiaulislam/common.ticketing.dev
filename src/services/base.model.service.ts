export abstract class BaseModelService<Delegate extends {
    findUnique: Function;
    findMany: Function;
    create: Function;
    update: Function;
    delete: Function;
}, Entity, CreateInput = Partial<Entity>, UpdateInput = Partial<Entity>> {
    protected abstract getModel(): Delegate;

    public async findById(id: number): Promise<Entity | null> {
        const model = this.getModel();
        return await model.findUnique({ where: { id } });
    }

    public async findAll(): Promise<Entity[]> {
        const model = this.getModel();
        return await model.findMany();
    }

    public async create(data: CreateInput): Promise<Entity> {
        const model = this.getModel();
        return await model.create(data);
    }

    public async update(id: number, data: UpdateInput): Promise<Entity | null> {
        const model = this.getModel();
        return await model.update({ where: { id }, data });
    }

    public async delete(id: number): Promise<boolean> {
        const model = this.getModel();
        return await model.delete({ where: { id } });
    }
}