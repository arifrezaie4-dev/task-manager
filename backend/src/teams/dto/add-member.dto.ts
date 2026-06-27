import { IsInt } from "class-validator";

export class AddMemberDto {
  @IsInt()
  teamId!: number;
  @IsInt()
  adminId!: number;
  @IsInt()
  targetUserId;
}
