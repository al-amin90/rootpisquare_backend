import { Types } from "mongoose";

export type TBatch = {
  title: string;
  className: Types.ObjectId;
  price: number;
  discountPersent: number;
  description: string;
  icon: string;
  slots: string;
};
