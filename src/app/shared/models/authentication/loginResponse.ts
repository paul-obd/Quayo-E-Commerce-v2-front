export class LoginResponse {
  public authResponse: AuthResponse;
  public language: string;
  public defaultDashboardId:number;
}

export class AuthResponse {
  public token: string;
  public expiration: string;
}
