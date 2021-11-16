
const recorder = wx.getRecorderManager();
Component({
    properties: {},
    data: {
        touchStatus: !1
    },
    methods: {
        onTapStart: function(t) {
            this.updateTouchStatus(!0);
            console.log("onTapStart");
            let from = t.currentTarget.dataset.from;
            this.triggerEvent("recordStart", {
                from: from
            });
            const options = {
                // duration: 10000, //指定录音的时长，单位 ms
                // sampleRate: 8000, //采样率
                // numberOfChannels: 1, //录音通道数
                // encodeBitRate: 24000, //编码码率
                format: 'mp3', //音频格式，有效值 aac/mp3
                // audioSource: 'auto',
                // frameSize: 12, //指定帧大小，单位 KB
              }
              recorder.start(options) //开始录音

        },
        onTapEnd: function(t) {
            var r = t.currentTarget.dataset.from;
            console.log("onTapEnd");
            recorder.stop()
            recorder.onStop((res)=>{
                // let filePath=res.tempFilePath

                this.triggerEvent("recordEnd", {
                    from: r,
                    filePath:res.tempFilePath
                });
            })
            this.updateTouchStatus(!1);
           
            
        },
        updateTouchStatus: function(t) {
            this.setData({
                touchStatus: t
            });
        }
    }
});