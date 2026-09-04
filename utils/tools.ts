export const getSlug = (str: string) => {
	 
	const path = str
 
    const strArr = path.split('/');// '/about/services/'
    let slugArr: string[] = [];

    strArr.map((value)=>{
        if(value){
            slugArr.push(value);
        }
    });
    
    let slug: any = slugArr.length >= 1 ? slugArr.pop() : '/';
    
    if(slug.indexOf('.') >= 0){
        slug = '/'
    }
    
    return slug; 
}