import IUser from './users.model';

export default interface ITasks {
  id: number;
  title: string;
  deadline: string;
  persons: IUser[];
  isCompleted: boolean;
}
