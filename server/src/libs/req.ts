import {KEY_APP_DEBOUNCE_PRE,readCache,writeCache} from './redis'

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

export function getClientIP(req:any) {
  let ip = req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.ip  ||
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress || ''
  if(ip) {
    ip = ip.replace('::ffff:', '')
  }
  return ip;
}

export async function debounce(key:string,ctx:any):Promise<boolean>{
        // 程序中如果正在处理该请求，则返回真，不在往下进行
       if(await readCache(KEY_APP_DEBOUNCE_PRE+key)) return true;
       else {
           // 没有处理则进行记录，处理完后再删除。
        await writeCache(KEY_APP_DEBOUNCE_PRE+key,true); {ctx.body='Processing'; return false;}
       }
}
export async function undebounce(key:string):Promise<void>{

    await writeCache(KEY_APP_DEBOUNCE_PRE+key,false)
     
}
