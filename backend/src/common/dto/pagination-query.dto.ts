import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page = 1;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit = 5;
}
