<template>
  <div class="login-face">
    <div class="login-form">
      <el-form 
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="login-panel"
      >
        <div class="title">MiaoMiao网盘</div>
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码"/>
        </el-form-item>
        <el-button @click="submit" class="sumbit-button" type="primary">登录</el-button>
      </el-form>
    </div>
    <div class="bg">

    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { logincheck } from '@/apis/user'
  import { useRoute, useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  const ruleForm = ref({
    phone: '',
    password: ''
  })
  const rules = ref({
    phone: [
        {required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '请填写正确的手机号', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur' }
    ]
  })
  // 获取form表单引用
  const ruleFormRef = ref(null)

  const userstore = useUserStore()
  const router = useRouter()
  const route = useRoute()
  // 当点击登录按钮时的函数
  const submit = () => {
    // 获取到真正的表单元素
    ruleFormRef.value.validate(async(isValid, invalidFields) => {
      if (isValid) {
        // 表单所有元素验证通过，可以提交了
        console.log('验证通过')
        const { phone, password } = ruleForm.value
        const res = await logincheck({ phone, password });
        console.log(res.data)
        if(res.success===true){
          userstore.setuserid(res.data)
          router.push('/index')
        } 
      } else {
        console.log(invalidFields)
        console.log('验证不通过,不能提交,请检查')
      }
    })
    
  }
</script>

<style lang="scss" scoped>
  .login-face {
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
    background-image: url("@/common/image/login.png");
    display: flex;
    .login-form {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .login-panel {
        background-color: #fff;
        display: flex;
        flex-direction: column;
        padding: 18px;
        .title {
          margin: 18px auto;
        }
        .sumbit-button {
          width: 100%;
        }
      }
    }
    .bg {
      flex: 1;
    }
  }
</style>