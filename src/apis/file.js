import instance from '@/utils/http'
export const FileList = ({ userId, fileId }) => {
    return instance({
        url: '/file/FileList',
        method: 'POST',
        data: {
            userId,
            fileId
        }
    })
}