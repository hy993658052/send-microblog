<template>
    <div class="container">
        <form class="form-horizontal row">
            <div class="form-group">
                <legend class="col-sm-offset-1 col-sm-5">用户注册</legend>
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
            <div class="form-group">
                <label class="col-sm-2 control-label">重复输入密码:</label>
                <div class="col-sm-4">
                    <input id="pwdAgain" class="form-control" type="password" placeholder="请重复输入密码" v-model="pwda">
                </div>
            </div>
            <div class="col-sm-offset-2 col-sm-8">
                <button class="btn btn-primary" type="submit" v-on:click="register">注册</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user: '',
            pwd: '',
            pwda: ''
        }
    },
    methods: {
        register: function(){
            if(this.user == "" || this.pwd == "" || this.pwda == ""){
                alert("请输入用户名或密码");
            }
            else if(this.pwd != this.pwda){
                alert("重复输入密码不一致");
            }
            else{
                let data = {'username': this.user, 'password' : this.pwd};
                this.$http.post('http://localhost:3000/add', data, {emulateJSON: true}).then((res) =>{
                    console.log(res.data);
                    if(res.data ==-1){
                        alert("用户名重复，注册失败");
                    }
                    else{
                        console.log("注册成功");
                        this.$router.push('/login');
                    }
                }, (err) =>{
                    console.log(err);
                    alert("注册失败");
                });
            }
        }
    }
}
</script>


<style scoped>
.form-group{
    padding-left: 30%;
}
</style>
