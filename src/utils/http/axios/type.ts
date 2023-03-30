import { AxiosRequestConfig } from 'axios';

// 繼承 AxiosRequestConfig 並添加自訂的條件，在 Axios 調用或攔截器（Interceptors）中可以使用
export interface CreateAxiosOptions extends AxiosRequestConfig {
    requestOptions?: RequestOptions; // customize setting
}

// 自訂 Axios Request 觸發時的一些參數
export interface RequestOptions {
}

// 定義回傳的 res.data 格式，這部份要配合 API 的回傳格式，方便取值
export interface Result<T = any> {
    code: number;
    type?: 'success' | 'error' | 'warning';
    message: string;
    result?: T;
}


// 作者: Lonka Liu
// 連結: https://lonka.github.io/blog/2022/07/04/vue3-append-axios-in-vue3/
// 來源: Lonka's Blog
// 著作權歸作者所有。商業轉載請聯絡作者獲得授權，非商業轉載請註明出處。