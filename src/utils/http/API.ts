import axios from "axios";

import {categoryRequest} from '../../assets/js/dataclass/category';
import { slideRequest } from "../../assets/js/dataclass/slide";
import { NoteModel } from "../../assets/js/highlight";

const instance = axios.create({
    baseURL: 'http://3.112.206.105:8081',
    timeout: 10000,
});

export const CategoryAPI = {
    ＧetCategory: () => instance.get('/category/'),
    CreateCategory: (category: categoryRequest) => instance.put('/category/', category),
    ＵpdateCategory: (category: categoryRequest) => instance.put('/category/update/' + category.category_id, category),
    ＧetUderSlide: (id: number) => instance.get('/category/find/slide?category_id='+id)
}

export const NoteAPI = {
    getＣategoryNote: (category_id: number) => instance.get<Array<NoteModel>>('category/find/note?category_id=' + category_id),
    CreateNote: (note: any) => instance.put('/note/', note)
}

export const SlideAPI = {
    getHtml: (url: string) => instance.post('/slide/html', {httpMethod:"Get",headers:{},url:url,body:""}),
    getＡll: () => instance.get('/slide/'),
    CreateSlide: (slide: slideRequest) => instance.put('/slide/',slide)
}
