import instance from '@/utils/http'
export const logincheck = ({ phone, password }) => {
    return instance({
        url: '/user/login',
        method: 'POST',
        data: {
            phone,
            password
        }
    })
}