const { toLength } = require("lodash");

class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            },
            // surname: {
            //     $regex: this.queryStr.keyword,
            //     $options: 'i'
            // }

        } : {}
        console.log("Search process started"); 
        this.query = this.query.find({...keyword}); 
        console.log("Search process finished"); 
        return this;
      
    }
     //filter by speciality 
filter()
{
    const queryCopy ={ ...this.queryStr}; 

     //removing fields from the query 
     const removeFields = ['keyword','limit', 'page']
     removeFields.forEach(el => delete queryCopy[el]); 
     console.log('Speciality filtring',queryCopy);

}


 
//pagination
pagination(resPerPage){
    const currentPage= Number(this.queryStr.page)|| 1; 
    const skip= resPerPage *(currentPage - 1); 
    //limit: function to limit the number of products per page 
    this.query = this.query.limit(resPerPage).skip(skip); 
    return this; 
    console.log("paginatione made");
}
}
module.exports= APIFeatures; 