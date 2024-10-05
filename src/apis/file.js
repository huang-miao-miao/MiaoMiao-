import instance from '@/utils/http'
import { ref } from 'vue'
import qs from 'qs'
export const FileList = ({ fileId }) => {
    return instance({
        url: '/file/FileList',
        method: 'POST',
        data: {
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
export const uploadFile = (file,pid,fileMd5) => {
    const formData = new FormData()
    formData.append('file', file)
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
//检查文件是否存在
export const checkfile = (formData) => {
    return instance({
        url: 'file/checkfile',
        method: 'post',
        data: formData 
    })
}
//上传分块文件
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
//合并分块
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
//检查分块文件是否存在
export const CheckChunk = (formData) => {
    return instance({
        url: 'file/checkchunk',
        method: 'post',
        data: formData
    })
}
export const DeleteFile = (deletefile) => {
    return instance({
        url: 'file/deletefile',
        method: 'delete',
        params: {deletefile},
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
}
export const createFolder = ({userId,fileId,fileName}) => {
    return instance({
        url: '/file/createfolder',
        method: 'post',
        data: {
            userId,
            fileId,
            fileName
        }
    })
}
export const downloadfile = (fileId) => {
    return instance({
        url: '/file/download',
        method: 'post',
        params: {
            fileId
        }
    })
}