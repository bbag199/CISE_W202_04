export class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly email: string;
  }
  
  export class LoginUserDto {
    readonly username: string;
    readonly password: string;
  }
  