import { FindManyDto } from '@plant-care/dtos';
import { BasePrismaCrudService } from './BasePrismaCrudService';
import { skip } from 'node:test';
import { Pagination } from './pagination';

export class BaseCrudController<
  T,
  Create,
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
  async findAll(body: FindManyDto): Promise<Pagination<T>> {
    const count = await this.baseCrudService.count();

    const data = await this.baseCrudService.findMany({
      skip: (body.page - 1) * body.perPage,
      take: +body.perPage,
      orderBy:
        body.orderBy && body.order
          ? {
              [body.orderBy]: body.order,
            }
          : null,
    });
    return new Pagination<T>(data, count, body.perPage, body.page);
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
