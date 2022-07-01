export interface IPasswordHasher {
  hash: (password: string, saltRounds: number) => Promise<string>;
  compare: (password1: string, password2: string) => Promise<boolean>;
}
