<template>
    <div class="container">
        <div class="row">
            <div class="header col-sm-12 col-sm-offset-1">
                <div class="welcome">
                    <b>{{ user }}</b>欢迎你
                </div>
                <div class="showbtn col-sm-offset-7">
                    <button v-on:click="open" class="btn btn-info">{{ btnText }}</button>
                </div>
            </div>
            <transition name="fade">
                <form v-show="sendBlog" class="col-sm-10 col-sm-offset-1">
                    <textarea class="blogText" placeholder="请写下你想说的话,100字以下" name="blog" maxlength="100" v-model="message"></textarea>
                    <div class="sendbtn">
                        <button type="submit" class="btn btn-success" v-on:click="writeblog">发布</button>
                    </div>
                </form>
            </transition>
            <div  class="col-sm-10 col-sm-offset-1 publicBlog" >
                <div class="item" v-for="blog in blogs">
                    <h3>{{ blog.name }} 说：</h3>
                    <p>{{ blog.blog }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header{
    position: relative;
    text-align: left;
    vertical-align: bottom;
    margin-bottom: 20px;
}
.welcome{
    display: inline-block;
    font-size: 20px;
}
b{
    font-size: 35px;
    margin-right: 20px;
}
.showbtn{
    display: inline-block;
    text-align: right;
}
.btn{
    outline: none;
}
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
  transform: translateX(10px);
  opacity: 0;
}
.blogText{
    display: block;
    width: 100%;
    height: 100px;
    resize: none;
    font-size: 15px;
}
.sendbtn{
    margin-top: 20px;
    margin-right: 50px;
    float: right;
}
.item{
    width: 31%;
    display: inline-block;
    vertical-align: top;
    margin-right: 2%;
}
.publicBlog{
    vertical-align: top;
    text-align: left;
}
</style>


<script>
import {getCookie} from '../assets/cookie.js'
export default {
    beforeMount(){
        if(getCookie('username') == ''){
            this.$router.push('/');
        }
        else{
            this.user = getCookie('username');
        }
    },
    mounted(){
        this.$http.get('http://localhost:3000/read', {emulateJSON: true}).then((res) => {
                console.log(res);
                this.blogs = res.data
            }, (err) =>{
                console.log(err);
        });
    },
    data: function(){
        return{
            user: '王五',
            sendBlog: false,
            btnText: '发布微博',
            blogs: [
                {name : '李白' , blog : '君不见，黄河之水天上来，奔流到海不复回。'},
                {name : '杜甫' , blog : '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。'},
                {name : '张三' , blog: '今天天气不错,阳光明媚，万里无云。'},
                {name : '李四' , blog: '今天天气不错,阳光明媚，万里无云。'}
            ],
            message: ''
        }
    },
    methods: {
        open: function(){
            this.sendBlog =  (this.sendBlog == false ? true : false);
            this.btnText = (this.btnText == '发布微博' ? '暂时不发' : '发布微博');
        },
        readblog: function(){
            this.$http.get('http://localhost:3000/read', {emulateJSON: true}).then((res) => {
                    console.log(res);
                    this.blogs = res.data
                }, (err) =>{
                    console.log(err);
            });
        },
        writeblog: function(){
            var data = { 'name' : this.user, 'blog' : this.message}
            this.$http.post('http://localhost:3000/write', data, {emulateJSON: true}).then((res) => {
                    console.log(res);
                    if(res.data == '1'){
                        readblog();
                    }
                    else{
                        alert('发布失败');
                    }
                }, (err) =>{
                    console.log(err);
            });
        }
    }
    
}
</script>

