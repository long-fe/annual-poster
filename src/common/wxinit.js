import axios from 'axios'

export const weixinInit = {
    data() {
        return {
            appId: '', // 绑定的公众号的appId
        }
    },
    methods: {
        wxConfig(appId, timestamp, nonceStr, signature) {
            wx.config({
                debug: false,
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'updateAppMessageShareData', // 分享到朋友圈
                    'updateTimelineShareData', // 分享给好友
                ]
            });
            // 验证通过
            wx.ready(() => {
                this.shareInit()
            })
        },
        getWxInfo() {
            axios.get(`http://www.nexusest.com/api/annual/wechat/getJsTicket?url=${encodeURIComponent(window.location.href)}`)
            .then(res => {
                if(res && res.data.code === '200') {
                    let data = res.data.data;
                    console.log(data);
                    this.wxConfig(this.appId, data.timestamp, data.nonceStr, data.signature);
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 分享初始化配置
        shareInit(options = {
            title: '星青年 新峰景',
            desc: '平安人寿深圳分公司2020年人才高峰启动会暨新春团拜',
            link: '...', // 你的项目的url
            imgUrl: ''
        }) {
            this.shareAppMessage(options); // 分享给好友
            this.shareTimeline(options); // 分享到朋友圈
        },
        shareAppMessage(options) {
            wx.updateAppMessageShareData({ 
                title: options.title, // 分享标题
                desc: options.desc, // 分享描述
                link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: options.imgUrl, // 分享图标
                success: (res) => {
                    // 用户点击了分享后执行的回调函数
                    console.log('分享好友成功：' + res)
                },
                cancel: (can) => {
                    console.log('分享好友取消：' + can)
                },
                fail: (err) => {
                    console.log('分享好友失败：' + err)
                }
            })
        },
        shareTimeline(options) {
            wx.updateTimelineShareData({
                title: options.title, // 分享标题
                desc: options.desc, // 分享描述
                link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: options.imgUrl, // 分享图标
                success: (res) => {
                    // 用户点击了分享后执行的回调函数
                    console.log('分享朋友圈成功：' + res)
                },
                cancel: (can) => {
                    console.log('分享朋友圈取消：' + can)
                },
                fail: (err) => {
                    console.log('分享朋友圈失败：' + err)
                }
            })
        }
    },
}