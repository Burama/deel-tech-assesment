export type Job = {
  id?: number;
  contractId: number;
  price: number;
  description: string;
  paymentDate?: Date;
  paid?: boolean;
}
