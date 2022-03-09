export function ParesPostData(ctx:any){
    return new Promise((resolve,reject)=>{
        try{
           ctx.req.addListener('data',(data: string)=>{
               var postData = JSON.parse(data) 
               resolve(postData)
           })
        }catch(err){
            reject(err)
        }
    })
}