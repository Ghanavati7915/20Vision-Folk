//#region Imports
//#endregion

//#region Interfaces
export interface userUpdatePayload {
    isArtist: boolean
    firstname: string
    lastname: string
    password: string
    extentionname?: string
    gender?: string
    avatar?: string
    bio_small?: string
    bio_long?: string
    address?: string
    email?: string
    website?: string
    nationalCode?: string
    socialNetworks?: string
    birthDate?: string
    city_ref?: number
    skills?: number[]
}
//#endregion

//#region Methods
export async function update (payload: userUpdatePayload): Promise<any> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "patch",
            url: 'user',
            data: {
                isArtist : payload.isArtist,
                gender : payload.gender,
                firstname : payload.firstname,
                lastname : payload.lastname,
                password : payload.password,
                extentionname : payload.extentionname,
                avatar : payload.avatar,
                bio_small : payload.bio_small,
                bio_long : payload.bio_long,
                address : payload.address,
                email : payload.email,
                website : payload.website,
                nationalCode : payload.nationalCode,
                socialNetworks : payload.socialNetworks,
                birthDate : payload.birthDate,
                city_ref : payload.city_ref,
                skills : payload.skills,
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

export async function get (): Promise<any> {
    try {
        const capAPI = useCapApi()
        const { data } = await (await capAPI.useAPI())({
            method: "get",
            url: 'user'
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



