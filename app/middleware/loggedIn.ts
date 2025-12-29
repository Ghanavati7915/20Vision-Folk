// app/middleware/loggedIn.ts
import { jwtDecode, type JwtPayload } from "jwt-decode"

export default defineNuxtRouteMiddleware(async (to) => {
    const nuxt = useNuxtApp()

    // گرفتن توکن و اطلاعات کاربر از IndexedDB
    const accessToken = await IndexDBGet("config", "Access-Token")
    const userInfo = await IndexDBGet("config", "UserInfo")

    if (!accessToken || !userInfo) {
        return true // کاربر لاگین نیست → اجازه بده وارد صفحه لاگین بشه
    }

    try {
        const jwt = jwtDecode<JwtPayload>(accessToken)
        const now = Math.floor(Date.now() / 1000)

        if (jwt?.exp && now < jwt.exp) {
            // اگر توکن معتبره و هنوز منقضی نشده → کاربر لاگین هست
            return navigateTo("/")
        }
    } catch (error) {
        console.error("JWT decode error:", error)
        return true
    }

    return true
})