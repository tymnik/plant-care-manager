import { BasePrismaCrudService } from './BasePrismaCrudService';

export class BaseCrudController<
  T,
  Create,
  FindManyBody,
  IdPathParams extends { id: number },
  UpdateBody,
> {
  constructor(
    private readonly baseCrudService: BasePrismaCrudService<
      T,
      unknown,
      unknown,
      unknown,
      unknown,
      unknown
    >,
  ) {}
  create(createPlantDto: Create): Promise<T> {
    return this.baseCrudService.create(createPlantDto);
  }
  findAll(body: FindManyBody): Promise<T[]> {
    return this.baseCrudService.findMany({});
  }
  findOne(params: IdPathParams): Promise<T> {
    return this.baseCrudService.findOne({ id: +params.id });
  }
  update(params: IdPathParams, updatePlantDto: UpdateBody): Promise<T> {
    return this.baseCrudService.update({
      where: { id: params.id },
      data: updatePlantDto,
    });
  }
  remove(params: IdPathParams): Promise<T> {
    return this.baseCrudService.delete({ id: params?.id });
  }
}
