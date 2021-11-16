Component({
    properties: {
        title: {
            type: String,
            value: ""
        },
        content: {
            type: String,
            value: ""
        },
        image: {
            type: String,
            value: ""
        },
        okText: {
            type: String,
            value: "بىلدىم"
        },
        isOpen: {
            type: Boolean,
            value: !1
        },
        show: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        show: function() {
            this.setData({
                show: !0
            });
        },
        close: function() {
            this.setData({
                show: !1
            });
        },
        onTapOK: function() {
            this.close(), this.triggerEvent("eventConfirm");
        },
        settingCallback: function(t) {
            var e = t.detail.authSetting;
            this.triggerEvent("settingCallbackEvent", {
                authSetting: e
            });
        }
    }
});