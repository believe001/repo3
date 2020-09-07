export const request=(params)=>{
    //定义公共的url
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: function(result) {
                resolve(result);
            },
            fail: function(err) {
                reject(err);
            }
        })

        }
    )
}