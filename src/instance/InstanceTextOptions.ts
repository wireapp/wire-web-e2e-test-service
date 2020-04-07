import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsOptional, IsString, IsUUID, ValidateNested, IsEnum, IsBoolean, IsNumber} from 'class-validator';
import {Type} from 'class-transformer';
import {LegalHoldStatus} from '@wireapp/core/dist/conversation/content';

class QuoteMeta {
  @ApiProperty()
  @IsUUID('4')
  quotedMessageId!: string;

  @ApiProperty()
  @IsString()
  quotedMessageSha256!: string;
}

class MentionsMeta {
  @ApiProperty()
  @IsUUID('4')
  userId!: string;

  @ApiProperty()
  @IsNumber()
  length!: number;

  @ApiProperty()
  @IsNumber()
  start!: number;
}

class TweetMeta {
  @ApiPropertyOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional()
  @IsString()
  username?: string;
}

class ImageMeta {
  @ApiProperty()
  @IsString()
  data!: string;

  @ApiProperty()
  @IsNumber()
  height!: number;

  @ApiProperty()
  @IsNumber()
  width!: number;

  @ApiProperty()
  @IsString()
  type!: string;

  @ApiPropertyOptional({
    enum: [LegalHoldStatus.UNKNOWN, LegalHoldStatus.DISABLED, LegalHoldStatus.ENABLED],
  })
  @IsOptional()
  @IsEnum(LegalHoldStatus)
  legalHoldStatus?: LegalHoldStatus;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  expectsReadConfirmation?: boolean;

  @ApiProperty()
  @IsOptional()
  messageTimer?: number;
}

class LinkPreviewMeta {
  @ApiProperty()
  @IsString()
  url!: string;

  @ApiProperty()
  @IsNumber()
  urlOffset!: number;

  @ApiPropertyOptional()
  @IsString()
  permanentUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => TweetMeta)
  tweet?: TweetMeta;

  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => ImageMeta)
  image?: ImageMeta;
}

export class InstanceTextOptions {
  @ApiProperty()
  @IsUUID('4')
  conversationId!: string;

  @ApiProperty()
  @IsString()
  text!: string;

  @ApiPropertyOptional()
  @IsOptional()
  messageTimer?: number;

  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => QuoteMeta)
  quote?: QuoteMeta;

  @ApiPropertyOptional({
    enum: [LegalHoldStatus.UNKNOWN, LegalHoldStatus.DISABLED, LegalHoldStatus.ENABLED],
  })
  @IsOptional()
  @IsEnum(LegalHoldStatus)
  legalHoldStatus?: LegalHoldStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  expectsReadConfirmation?: boolean;

  @ApiProperty()
  @IsString({each: true})
  buttons?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => MentionsMeta)
  mentions?: MentionsMeta[];

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LinkPreviewMeta)
  linkPreview?: LinkPreviewMeta;
}