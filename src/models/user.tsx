export class User{

    constructor(
        public user_id :number = 0,
        public first_name:string = '',
        public last_name:string = '',
        public email:string = '',
        public password:string = ''
    ){
        
    }
    get name(){
        return this.first_name + ' ' + this.last_name;
    }

}