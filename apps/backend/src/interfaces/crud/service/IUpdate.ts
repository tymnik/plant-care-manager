export interface IUpdateService {
  update(params: { where: unknown; data: unknown }): Promise<unknown>;
}
