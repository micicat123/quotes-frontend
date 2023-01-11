export class Quote{

    constructor(
        public quote_id :number = 0,
        public quote :string = '',
        public upvotes :number = 0,
        public user :any = {},
        public created_at :string = ''
    ){}
}