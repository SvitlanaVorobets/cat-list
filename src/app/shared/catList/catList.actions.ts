export class GetCatList{
    static readonly type = '[Cat] Get';

    constructor(public limit: number) {
    }
}