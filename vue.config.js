module.exports = {
    devServer:{
        proxy:{
            '/go':{
                target:'http://127.0.0.1:8088/api/V1',
                changeOrigin:true,
                pathRewrite:{
                    '^/go':''
                }
            },
        }
    }
}
