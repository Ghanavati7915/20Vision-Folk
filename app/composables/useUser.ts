import { navigateTo } from "#app"

export interface UserInfo {
    firstName: string
    lastName: string
    isLegal: boolean
    permissions: string[]
    title: string
    userName: string
    avatar: string
}
export interface Token {
    title: string
    access: string
    isLegal: boolean
}

export async function useUser(): Promise<UserInfo> {
    const accessToken = await IndexDBGet("config", "Access-Token")
    const userInfo = await IndexDBGet("config", "UserInfo")

    if (!accessToken || !userInfo) {
        await navigateTo("/login")
    }

    return userInfo as UserInfo
}

export async function useTenants(): Promise<UserInfo> {
    const tokens = await IndexDBGet("config", "All-Tokens")
    const currentToken = await IndexDBGet("config", "Current-Token")
    if (!tokens) {
        await navigateTo("/login")
    }
    return {tokens,currentToken} as Token
}

