const { toLength } = require("lodash");

class APIFeatures {

    constructor(query, queryStr) {
       this.query = query;
       this.queryStr = queryStr;
    }
     
    search() {
        console.log("entred in search")
    
        const keyword = this.queryStr.nameDoctor!='' ? {
            
            surname: {
                $regex: new RegExp(this.queryStr.nameDoctor, 'i')
            },
            city :{
                $regex: new RegExp(this.queryStr.city, 'i'),
            },
            speciality:{
                $regex:new RegExp(this.queryStr.speciality, 'i')
              
            }

        } : {}
      
        this.query = this.query.find(keyword); 
    
        return this;
      
    }


 
//pagination
pagination(resPerPage){
    const currentPage= Number(this.queryStr.page)|| 1; 
    const skip= resPerPage *(currentPage - 1); 
    //limit: function to limit the number of products per page 
    this.query = this.query.limit(resPerPage).skip(skip); 
    console.log("paginatione made");
    return this; 
    
}
}
module.exports= APIFeatures; 