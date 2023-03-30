export class categoryRequest {
    constructor(category_id: number,title: string, sequence: number) {
        this.category_id = category_id;
        this.title = title;
        this.sequence = sequence;
    }
    category_id: number | undefined;
    title: string | undefined;
    sequence!: number;
}