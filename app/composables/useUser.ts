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

export async function useUser(redirectToLogin : boolean = false): Promise<UserInfo> {
    const accessToken = await IndexDBGet("config", "Access-Token")
    const userInfo = await IndexDBGet("config", "UserInfo")

    if (!accessToken || !userInfo) {
        if (redirectToLogin)  await navigateTo("/login")
        else return null;
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

