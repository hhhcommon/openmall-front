/**
 * DOM 数据存储位置
*/
export const mixinsDom =  {
    data(){
        return {
            wWitdth: 0,
            wHeight: 0
        }
    },
    mounted(){
        this.formatArea()
        let _this = this
        window.onresize = function(){
            _this.formatArea()
        }
    },
    methods:{
        formatArea(){
            this.wWitdth = document.body.clientWidth
            this.wHeight  = document.body.clientHeight
        }
    }
}