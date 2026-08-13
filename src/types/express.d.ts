declare global {
    namespace Express {
        interface Request {
            ClientData?:{
                id:number;
                username:string;
                email:string;
            }
        }
    }
}

export {}