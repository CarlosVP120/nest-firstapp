// src/transformers/buffer-to-hex.transformer.ts
import { ValueTransformer } from 'typeorm';

export const BufferToHexTransformer: ValueTransformer = {
  to: (value: string | null) => value,
  from: (value: Buffer | null) => {
    if (value === null) return null;
    return Buffer.from(value).toString('hex').toUpperCase();
  },
};
