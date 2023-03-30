import { ContentTypeEnum } from '../../../enums/httpEnum'
import { deepMerge } from '../../index'
import { LKAxios } from './Axios'
import type { CreateAxiosOptions } from './type'

function createAxios(opt?: Partial<CreateAxiosOptions>) {
    return new LKAxios(
        deepMerge({
            baseURL: '',
            timeout: 10 * 1000,
            headers: { 'Content-Type': ContentTypeEnum.JSON },
            requestOptions: {
            }
        }, opt || {}))
}

// 公開讓其它頁面去調用
export const http = createAxios();


// 作者: Lonka Liu
// 連結: https://lonka.github.io/blog/2022/07/04/vue3-append-axios-in-vue3/
// 來源: Lonka's Blog
// 著作權歸作者所有。商業轉載請聯絡作者獲得授權，非商業轉載請註明出處。