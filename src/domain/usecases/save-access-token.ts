export interface SaveAccessToken {
  save (token: string): Promise<void>
}
