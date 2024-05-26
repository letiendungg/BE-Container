import { IsNotEmpty } from 'class-validator';

export class QuickQuoteDto {
  @IsNotEmpty()
  from: string;
  @IsNotEmpty()
  to: string;
  @IsNotEmpty()
  product_type: string;
  @IsNotEmpty()
  weight: number;
  @IsNotEmpty()
  container_type: string;
}