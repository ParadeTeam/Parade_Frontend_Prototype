/**
 * @description: Request Verb
 */
export enum RequestEnum {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
    }
    
    /**
     * @description: Content Type
     */
    export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // json
    TEXT = 'text/plain;charset=UTF-8',
    // form-data 
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
    }
    
    
    // 作者: Lonka Liu
    // 連結: https://lonka.github.io/blog/2022/07/04/vue3-append-axios-in-vue3/
    // 來源: Lonka's Blog
    // 著作權歸作者所有。商業轉載請聯絡作者獲得授權，非商業轉載請註明出處。