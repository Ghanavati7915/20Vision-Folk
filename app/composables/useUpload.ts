const allowTypes = ref<string[]>([
    'image/png',
    'image/gif',
    'image/jpg',
    'image/jpeg',
    'image/*',
]);
const allowSize = ref<number>(2000000); // 20 MB



export async function isValidFileType (file: File) {
    return allowTypes.value.includes(file.type);
}
export async function isValidFileSize (file: File) {
    return file.size <= allowSize.value;
}
