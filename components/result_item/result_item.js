var t = wx.createInnerAudioContext();

Component({
    properties: {
        created_at: {
            type: String,
            value: ""
        },
        language: {
            type: String,
            value: "zhCN"
        },
        text: {
            type: String,
            value: "正在处理，请稍候..."
        },
        translateText: {
            type: String,
            value: "بىر تەرەپ قىلىنىۋاتىدۇ، سەل ساقلاڭ ...",
            observer: "translateTextChanges"
        },
        translateVoicePath: {
            type: String,
            value: "",
            observer: "translateVoicePathChanges"
        },
        converted: {
            type: Boolean,
            value: !1,
            observer: "convertedChanges"
        },
        voicePlayed: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        playing: !1
    },
    methods: {
        convertedChanges: function(t, e, a) {
            var n = this;
            if (t) {
                var i = this.data.text;
                this.translateText(i, function(t) {
                    n.triggerEvent("overTranslateEvent", {
                        translator: t
                    });
                });
            }
        },
        translateTextChanges: function(t, e, a) {},
        translateVoicePathChanges: function(e, a, n) {
            var i = this.data.voicePlayed, o = this;
            e == a || "" == e || i || (t.autoplay = !0, t.src = o.data.translateVoicePath, t.play(), 
            o.updatePlaying(!0), t.onStop(function() {
                o.updatePlaying(!1);
            }), t.onEnded(function() {
                o.updatePlaying(!1);
            }), o.updateVoicePlayed(!0), o.triggerEvent("voicePlayedEvent"));
        },
        translateText: function(t, e) {
            var a = this;
            wx.request({
                url: "https://rasimler.ilchin.cn/api/terjiman/translator",
                data: {
                    t: t
                },
                header: {},
                method: "POST",
                dataType: "json",
                responseType: "text",
                success: function(t) {
                    a.setData({
                        translateText: t.data.result,
                        translateVoicePath: t.data.voice.url,
                        voicePlayed: !1
                    }), e && e(t.data);
                }
            });
        },
        playTranslationVoice: function(e) {
            var a = this.data.translateVoicePath, n = this;
            t.autoplay = !0, t.src = a, t.play(), n.updatePlaying(!0), t.onStop(function() {
                n.updatePlaying(!1);
            }), t.onEnded(function() {
                n.updatePlaying(!1);
            }), t.onPause(function() {
                console.log("pause"), n.updatePlaying(!1);
            });
        },
        editText: function(t) {
            this.setData({
                converted: !1
            }), this.triggerEvent("editTextEvent", {
                text: this.data.text,
                language: this.data.language
            });
        },
        onTapDelete: function(t) {
            this.triggerEvent("deleteDialogEvent");
        },
        onTapTranslateText: function(t) {
            var e = [ "正在处理，请稍候...", "بىر تەرەپ قىلىنىۋاتىدۇ، سەل ساقلاڭ ..." ], a = this.data.translateText;
            a != e[0] && a != e[1] && wx.setClipboardData({
                data: a,
                success: function(t) {
                    wx.showToast({
                        title: "复制成功！",
                        icon: "none"
                    });
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        },
        updateVoicePlayed: function(t) {
            this.setData({
                voicePlayed: t
            });
        },
        updatePlaying: function(t) {
            this.setData({
                playing: t
            });
        }
    }
});