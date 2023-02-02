export interface LoginResponseDto {
    id: number,
    username: string,
    email: string,
    isActive: boolean,
    description?: string,
    sessionToken: string
}