Component({
    ready: function(t) {
        var e = this;
        this.data.language;
        this.setData({
            placeholder: e.placeholder()
        });
    },
    properties: {
        language: {
            type: String,
            value: "zhCN",
            observer: "languageChanges"
        },
        text: {
            type: String,
            value: ""
        },
        show: {
            type: Boolean,
            value: !1
        },
        dialog_id: {
            type: String,
            value: ""
        },
        editor_title: {
            type: String,
            value: "编辑内容"
        },
        editor_status: {
            type: String,
            value: "最多只能输入140个字符"
        },
        align: {
            type: String,
            value: "left"
        },
        direction: {
            type: String,
            value: "ltr"
        }
    },
    data: {
        placeholder: ""
    },
    methods: {
        placeholder: function() {
            return "zhCN" == this.data.language ? "请输入内容" : "مەزمۇن كىرگۈزۈڭ";
        },
        languageChanges: function(t, e) {
            if (t != e) {
                var a = "zhCN" == t ? "ltr" : "rtl";
                this.setData({
                    placeholder: this.placeholder(),
                    direction: a
                });
            }
        },
        onTapConfirim: function(t) {
            var e = t.detail.value;
            this.setData({
                text: e
            });
            var a = this.data.dialog_id, i = this.data.text;
            this.triggerEvent("onTapConfirmEvent", {
                text: i,
                dialog_id: a
            }), this.setData({
                show: !1
            });
        }
    }
});