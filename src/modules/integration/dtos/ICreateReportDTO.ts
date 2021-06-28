import { ObjectID } from 'typeorm';

export default interface ICreateReportDTO {
  id?: ObjectID;
  amount: number;
}
