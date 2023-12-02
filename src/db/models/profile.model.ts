import {
  Model,
  Table,
  Column,
  Default,
  DataType,
  DefaultScope,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';

import { PROFILE_TYPE } from '../../const/enums';
import { ContractModel } from './contract.model';

@DefaultScope(() => ({
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
}))
@Table({
  modelName: 'profiles',
})
export class ProfileModel extends Model<ProfileModel> {
  @Default(0)
  @Column({
    type: DataType.DECIMAL(12, 2),
    get() {
      const balance = this.getDataValue('balance');
      return Number(balance.toString());
    },
  })
  public balance: number;

  @AllowNull(false)
  @Column
  public firstName: string;

  @AllowNull(false)
  @Column
  public lastName: string;

  @AllowNull(false)
  @Column
  public profession: string;

  @AllowNull(false)
  @Column(DataType.ENUM(PROFILE_TYPE.CLIENT, PROFILE_TYPE.CONTRACTOR))
  public type: PROFILE_TYPE;

  /** Mapping */
  @HasMany(() => ContractModel)
  public readonly contractor: ContractModel[];

  @HasMany(() => ContractModel)
  public readonly client: ContractModel[];
}
