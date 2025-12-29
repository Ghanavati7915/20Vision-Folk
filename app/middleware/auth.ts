// app/middleware/auth.ts
import { jwtDecode, type JwtPayload } from "jwt-decode"

export default defineNuxtRouteMiddleware(async (to) => {
    // اگر کاربر روی صفحه لاگین هست → اجازه بده
    if (to.path === "/login") {
        return true
    }

    const accessToken = await IndexDBGet("config", "Access-Token")
    const userInfo = await IndexDBGet("config", "UserInfo")

    if (!accessToken || !userInfo) {
        return navigateTo("/login")
    }

    try {
        const jwt = jwtDecode<JwtPayload>(accessToken)
        const now = Math.floor(Date.now() / 1000)

        if (jwt?.exp && now > jwt.exp) {
            const { refreshToken } = useCapAuth()
            const response = await refreshToken()

            if (!response?.result) {
                return navigateTo("/login")
            }
        }
    } catch (error) {
        console.error("JWT decode error:", error)
        return navigateTo("/login")
    }

    return true
})