//#region Imports
//#endregion

//#region Interfaces
export interface personalPayload {
    isCustomer: boolean
    search: string
    pagination: IPagination
}
interface IPagination {
    page: number
    pageSize: number
}
//#endregion

//#region Methods
export async function getAllPersonal (payload: personalPayload): Promise<any> {
    try {
        const capAPI = useCapApi()

        let url = 'Users/GetAll'
        if  (payload.isCustomer) url = 'Users/GetAll/customers'

        const { data } = await (await capAPI.useAPI())({
            method: "post",
            url,
            data: {
                pagination : payload.pagination,
                search : payload.search,
                order : {
                    orderBy: "",
                    order: 0
                },
                advancedFilter : null,
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



