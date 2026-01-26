
//#region Methods
export async function uploadFile (folderName : string , file: any, uploadPercentage: any): Promise<any> {
    try {
        const capAPI = useCapApi();
        let formData = new FormData();
        formData.append('file', file);
        const { data } = await (await capAPI.useAPI())({
            method: 'post',
            url: `upload/${folderName}`,
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData,
            onUploadProgress: (progressEvent: any) => {
                uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100).toString());
            }
        })
        return {result: true, data}
    } catch (error: any) {
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



