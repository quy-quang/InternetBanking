<template>
  <div class="verifyOTP">
    <form @submit.prevent ="verify">
      <div class="form-group">
        <label for="OTP">OTP</label>
        <input type="text" name="OTP" id="OTP" class="form-control" v-model="otp">
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
  method: {
    verify () {
      this.errors = null
      const constraints = this.getConstraints()
      const errors = validate(this.$data.transfer, constraints)
      if (errors) {
        this.errors = errors
      } else {
        verifyOTP({
          OTP: this.otp,
          transactionId: this.$store.state.transactionId
        })
          .then(res => {

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
          numericality: true,
          length: {
            minimum: 3,
            message: 'must be at least 3 numbers long'
          }
        }
      }
    }
  }
}
</script>
