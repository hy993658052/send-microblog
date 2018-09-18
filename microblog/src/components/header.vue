<template>
    <nav class="navbar navbar-default navbar-static-top row">
        <div class="container-fluid col-sm-10 col-sm-offset-1">
            <div class="navbar-header">
                <router-link  to="/"><img src="../assets/logo.png"></router-link>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li v-bind:class=" { 'active' : isActives} ">
                    <router-link to="/"><span class="glyphicon glyphicon-home"> 首页</span></router-link>
                </li>
                
                <li v-bind:class=" { 'active' : isActived} " v-show="!logined">
                    <router-link to="/login"><span class="glyphicon glyphicon-log-in"> 登录</span></router-link>
                </li>
                <li v-bind:class=" { 'active' : isActivez} " v-show="!logined">
                    <router-link to="/reg"><span class="glyphicon glyphicon-user"> 注册</span></router-link>
                </li>

                <li v-bind:class=" { 'active' : isActiveu} " v-show="logined">
                    <router-link to="/user"><span class="glyphicon glyphicon-user"> 用户中心</span></router-link>
                </li>
                <li v-show="logined">
                    <router-link to="/" v-on:click.native="unlogined"><span class="glyphicon glyphicon-log-out"> 登出</span></router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import {setCookie, getCookie, delCookie} from '../assets/cookie.js'
export default {
    data: function (){
        return{
            isActives: true,
            isActived: false,
            isActivez: false,
            isActiveu: false,
            logined: getCookie('username') == '' ? false : true
        }
    },
    watch: {
        "$route": "pathChange",
    },
    methods: {
        pathChange: function(){
            this.isActives = (this.$route.path == '/' ? true : false);
            this.isActived = (this.$route.path == '/login' ? true : false);
            this.isActivez = (this.$route.path == '/reg' ? true : false);
            if(this.$route.path == '/user'){
                this.logined = true;
                this.isActiveu = (this.$route.path == '/user' ? true : false);
            }
            else if(this.logined == true){
                this.isActiveu = false;
            }
        },
        unlogined: function(){
            delCookie('username');
            console.log('cookie: ' + getCookie('username'));
            this.logined = false;
            this.$router.push('/');
        }
    },
    mounted(){
        console.log('cookie: ' + getCookie('username'));
    }
}
</script>


<style scoped>
img{
    width: 60px;
    height: 50px;
    float: left;
    padding: 5px;
}
</style>
