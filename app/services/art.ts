//#region Imports
//#endregion

//#region Interfaces
export interface newArtPayload {
    code?: string
    title: string
    description?: string
    properties?: string
    files: filePayload[]
    cat_ref: number
}
export interface filePayload {
    title: string
    file: string
}
export interface getAllPayload {
    page: number
    pageSize: number
    search: string
}
export interface commentPayload {
    message: string
    rate: number
}
//#endregion

//#region Methods
export async function submit (payload: newArtPayload): Promise<any> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "post",
            url: '/art',
            data: {
                code : payload.code,
                title : payload.title,
                description : payload.description,
                properties : payload.properties,
                cat_ref : payload.cat_ref,
                files : payload.files,
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
export async function getAll (payload:getAllPayload): Promise<any> {
    try {
        const capAPI = useCapApi()

        const { data } = await (await capAPI.useAPI())({
            method: "get",
            url:'/art',
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
export async function getByID (id:number): Promise<any> {
    try {
        const capAPI = useCapApi()

        const { data } = await (await capAPI.useAPI())({
            method: "get",
            url:`/art/${id}`,
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
export async function getByArtistID (id:number,payload:getAllPayload): Promise<any> {
    try {
        const capAPI = useCapApi()

        const { data } = await (await capAPI.useAPI())({
            method: "get",
            url:`/art/artist/${id}`,
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
export async function like (id:number): Promise<any> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "post",
            url: `/art/like/${id}`,
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
export async function comment (id:number,payload:commentPayload): Promise<any> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "post",
            url: `/art/comment/${id}`,
            data: {
                message : payload.message,
                rate : payload.rate
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



