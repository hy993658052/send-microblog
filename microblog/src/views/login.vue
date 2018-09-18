<template>
    <div class="container">
        <form class="form-horizontal row">
            <div class="form-group">
                <legend class="col-sm-offset-1 col-sm-5">用户登录</legend>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">用户名:</label>
                <div class="col-sm-4">
                    <input id="username" class="form-control" type="text" placeholder="请输入用户名" v-model="user">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">密码:</label>
                <div class="col-sm-4">
                    <input id="pwd" class="form-control" type="password" placeholder="请输入密码" v-model="pwd">
                </div>
            </div>
            <div class="col-sm-offset-2 col-sm-8">
                <button class="btn btn-primary" type="submit" v-on:click="login" >登录</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.form-group{
    padding-left: 30%;
}
</style>

<script>
import {setCookie, getCookie} from '../assets/cookie.js'

export default {
    data(){
        return{
            user: '',
            pwd: ''
        }
    },
    methods: {
        login: function () {
            if(this.user == '' || this.pwd == ''){
                alert("请输入用户名或密码");
            }
            else{
            let data = {'username': this.user, 'password' : this.pwd};
            this.$http.post('http://localhost:3000/select', data, {emulateJSON: true}).then((res) =>{
                console.log(res);
                if(res.data == -2){
                    alert("登录发送错误");
                }
                else if(res.data == -1){
                    alert("用户不存在");
                }
                else if(res.data == 0){
                    alert("密码错误");
                }
                else if(res.data == 1){
                    setCookie('username', this.user, 1000*60*60);
                    console.log("登录成功");
                    this.$router.push('/user');
                }
                else{
                    alert("登录失败");
                }
            }, (err) =>{
                console.log(err);
                alert("登录失败");
            });
            }
        }
    }
}
</script>
