
//#region Methods
export async function cities (): Promise<any> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "get",
            url: 'base/city'
        })
        return { result: true, data }
    } catch (error: any) {
        console.log('error : ', error)
        const status = error?.response?.status

        if (status === 401) {
            const capAuth = useCapAuth()
            await capAuth.logout()
            return { result: false, message: "خطا در دریافت اطلاعات" }
        }

        return { result: false, message: "خطای شبکه" }
    }
}

export async function skills (): Promise<any> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "get",
            url: 'base/skills'
        })
        return { result: true, data }
    } catch (error: any) {
        console.log('error : ', error)
        const status = error?.response?.status

        if (status === 401) {
            const capAuth = useCapAuth()
            await capAuth.logout()
            return { result: false, message: "خطا در دریافت اطلاعات" }
        }

        return { result: false, message: "خطای شبکه" }
    }
}

export async function categories (): Promise<any> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "get",
            url: 'base/categories'
        })
        return { result: true, data }
    } catch (error: any) {
        console.log('error : ', error)
        const status = error?.response?.status

        if (status === 401) {
            const capAuth = useCapAuth()
            await capAuth.logout()
            return { result: false, message: "خطا در دریافت اطلاعات" }
        }

        return { result: false, message: "خطای شبکه" }
    }
}

export async function search (text:string): Promise<any> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "get",
            url: `base/search/${text}`
        })
        return { result: true, data }
    } catch (error: any) {
        console.log('error : ', error)
        const status = error?.response?.status

        if (status === 401) {
            const capAuth = useCapAuth()
            await capAuth.logout()
            return { result: false, message: "خطا در دریافت اطلاعات" }
        }

        return { result: false, message: "خطای شبکه" }
    }
}
//#endregion



