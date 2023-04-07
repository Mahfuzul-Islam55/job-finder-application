export interface IJobType {
  title: string;
  type: string;
  salary: string;
  deadline: string;
  id: number;
}

export interface IInitialState {
  allJob: IJobType[];
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
}
