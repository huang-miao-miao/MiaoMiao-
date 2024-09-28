import instance from '@/utils/http'
import { ref } from 'vue'
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
export const MovieFileList = ({ userId, fileId, fileCategory }) => {
    return instance({
        url: '/file/FileList',
        method: 'POST',
        data: {
            userId,
            fileId,
            fileCategory
        }
    })
}
export const uploadFile = (file,fileMd5) => {
    const pid = '1'
    const formData = new FormData()
    formData.append('file', file.raw)
    formData.append('pid',pid)
    formData.append('fileMd5',fileMd5)
    return instance({
        url: '/file/upload',
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data",
          },
        data: formData
    })
}
export const checkfile = (formData) => {
    return instance({
        url: 'file/checkfile',
        method: 'post',
        data: formData 
    })
}
export const uploadchuckfile = (formData) => {
    return instance({
        url: 'file/uploadchunk',
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data",
          },
        data: formData
    })
}
export const merge = (formData) => {
    return instance({
        url: 'file/merge',
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data",
          },
        data: formData
    })
}
export const CheckChunk = (formData) => {
    return instance({
        url: 'file/checkchunk',
        method: 'post',
        data: formData
    })
}