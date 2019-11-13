import { Model, Document, DocumentQuery } from 'mongoose';

export function findWithoutId(model: Model<Document, {}>, conditions: any = {}): DocumentQuery<Document[], Document, {}> {
  return model.find(conditions, { _id: 0 });
}
