//#region Imports
import CapModule from "#capModule"
//#endregion

//#region Interfaces
export interface LoginPayload {
    username: string
    password: string
}
export interface RegisterPayload {
    username: string
    password: string
    firstname: string
    lastname: string
}
export interface ApiResult {
    result: boolean
    message?: string
}
//#endregion

//#region Methods
export async function login(payload: LoginPayload): Promise<ApiResult> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "post",
            url: "/Auth/Login",
            data: {
                username: payload.username,
                password: payload.password,
            },
        })

        if (data) {

            // ذخیره توکن‌ها در IndexedDB
            await IndexDBInsert("config", "Current-Token", data.access, data.accessExpireDate)
            await IndexDBInsert("config", "Access-Token", data.access, data.accessExpireDate)
            await IndexDBInsert("config", "Refresh-Token", data.refresh, data.refreshExpireDate)

            // گرفتن پروفایل کاربر
            const profile = await userInfo()
            if (profile.result) {
                return { result: true }
            } else {
                return { result: false, message: "Profile Error" }
            }
        }

        return { result: false, message: "Login Error" }
    } catch (error: any) {
        const status = error?.response?.status
        const message = error?.response?.data?.message

        if (status === 401) {
            const capAuth = useCapAuth()
            await capAuth.logout()
            return { result: false, message: "خطا در دریافت اطلاعات" }
        }

        if (status === 410) {
            console.error("410 Error:", error.response)
            return { result: false, message: message || "اطلاعات صحیح نیست" }
        }

        return { result: false, message: "خطای شبکه" }
    }
}

export async function register(payload: RegisterPayload): Promise<ApiResult> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "post",
            url: "Auth/Register",
            data: {
                username: payload.username,
                password: payload.password,
                firstname: payload.firstname,
                lastname: payload.lastname,
            },
        })

        if (data) {

            // ذخیره توکن‌ها در IndexedDB
            await IndexDBInsert("config", "Current-Token", data.access, data.accessExpireDate)
            await IndexDBInsert("config", "Access-Token", data.access, data.accessExpireDate)
            await IndexDBInsert("config", "Refresh-Token", data.refresh, data.refreshExpireDate)

            // گرفتن پروفایل کاربر
            const profile = await userInfo()
            if (profile.result) {
                return { result: true }
            } else {
                return { result: false, message: "Profile Error" }
            }
        }

        return { result: false, message: "Login Error" }
    } catch (error: any) {
        const status = error?.response?.status
        const message = error?.response?.data?.message

        if (status === 401) {
            const capAuth = useCapAuth()
            await capAuth.logout()
            return { result: false, message: "خطا در دریافت اطلاعات" }
        }

        if (status === 410) {
            console.error("410 Error:", error.response)
            return { result: false, message: message || "اطلاعات صحیح نیست" }
        }

        return { result: false, message: "خطای شبکه" }
    }
}

export async function userInfo(): Promise<ApiResult> {
    try {
        // شبیه‌سازی تاخیر
        await new Promise((r) => setTimeout(r, 1000))

        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "get",
            url: CapModule.api_methods.user_info,
        })

        // ذخیره اطلاعات کاربر در IndexedDB
        await IndexDBInsert("config", "UserInfo", data)

        return { result: true }
    } catch (e) {
        return { result: false }
    }
}
//#endregion