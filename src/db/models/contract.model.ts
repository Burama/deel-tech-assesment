import {
  Model,
  Table,
  Column,
  DataType,
  DefaultScope,
  AllowNull,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';

import { CONTRACT_STATUS } from '../../const/enums';
import { ProfileModel } from './profile.model';
import { JobModel } from './job.model';

@DefaultScope(() => ({
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
}))
@Table({
  modelName: 'contracts',
})
export class ContractModel extends Model<ContractModel> {
  @ForeignKey(() => ProfileModel)
  @Column
  public readonly contractorId?: number;

  @ForeignKey(() => ProfileModel)
  @Column
  public readonly clientId?: number;

  @AllowNull(false)
  @Column
  public terms: string;

  @AllowNull(false)
  @Column(
    DataType.ENUM(
      CONTRACT_STATUS.NEW,
      CONTRACT_STATUS.IN_PROGRESS,
      CONTRACT_STATUS.TERMINATED,
    ),
  )
  public status: CONTRACT_STATUS;

  /** Mapping */
  @HasMany(() => JobModel)
  public readonly job: JobModel[];

  @BelongsTo(() => ProfileModel)
  public contractor: ProfileModel;

  @BelongsTo(() => ProfileModel)
  public client: ProfileModel;
}
