export class slideRequest {
    constructor(category_id: number,title: string, webUrl: string, pictureUrl: string) {
        this.category_id = category_id;
        this.title = title;
        this.webUrl = webUrl;
        this.pictureUrl = pictureUrl;
    }
    webUrl: string | undefined;
    title: string | undefined;
    pictureUrl: string | undefined;;
    category_id!: number;
}