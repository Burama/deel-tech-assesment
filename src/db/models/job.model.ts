import {
  Model,
  Table,
  Column,
  DataType,
  DefaultScope,
  AllowNull,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { ContractModel } from './contract.model';

@DefaultScope(() => ({
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
}))
@Table({
  modelName: 'jobs',
})
export class JobModel extends Model<JobModel> {
  @ForeignKey(() => ContractModel)
  @Column
  public readonly contractId?: number;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(12, 2),
    get() {
      const price = this.getDataValue('price');
      return Number(price.toString());
    },
  })
  public price: number;

  @AllowNull(false)
  @Column
  public description: string;

  @Default(false)
  @Column
  public paid: boolean;

  @Column
  public paymentDate: Date;

  @BelongsTo(() => ContractModel)
  public contract: ContractModel;
  Sum: number;
}
