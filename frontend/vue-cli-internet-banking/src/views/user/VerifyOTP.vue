<template>
  <div class="verify">
    <form @submit.prevent ="verifyotp">
      <div class="form-group">
        <label for="OTP">OTP</label>
        <input type="number" name="OTP" id="OTP" class="form-control" v-model="otp">
      </div>
      <button type="submit" class="btn btn-primary">Transfer</button>
    </form>
    <div class="errors" v-if="errors">
      <ul>
        <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
          <strong>{{fieldName}}</strong> {{fieldsError.join('.\n')}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import validate from 'validate.js'
import { verifyOTP } from '../../helper/user.js'
export default {
  name: 'OTP',
  data () {
    return {
      otp: '',
      errors: null
    }
  },
  methods: {
    verifyotp () {
      this.errors = null
      const constraints = this.getConstraints()
      const errors = validate(this.$data, constraints)
      if (errors) {
        this.errors = errors
      } else {
        verifyOTP({
          OTP: this.otp,
          transactionId: this.$store.state.transactionId
        })
          .then(res => {
            if (res.status === 200){
              if(res.data.msg === 'DONE') {
                alert('Success')
                this.$router.push('/user')
              }
              if(res.data.msg === 'FAILED') {
                alert('Wrongs OTP')
              }
            }
          })
          .catch(error => {
            console.log(error)
            alert('Something wrongs')
          })
      }
    },
    getConstraints () {
      return {
        otp: {
          presence: true,
          numericality: true
        }
      }
    }
  }
}
</script>
