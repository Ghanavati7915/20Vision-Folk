//#region Imports
//#endregion

//#region Interfaces
export interface getAllPayload {
    search: string
    page: number
    pageSize: number
}
//#endregion

//#region Methods
export async function getAll (payload: getAllPayload): Promise<any> {
    try {
        const capAPI = useCapApi()

        const { data } = await (await capAPI.useAPI())({
            method: "get",
            url:'artist',
            params: {
                search : payload.search,
                page : payload.page,
                pageSize : payload.pageSize,
            }
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



