export interface AuthState {
  token: string | null;
  role: 'EMPLOYER' | 'FREELANCER' | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}
