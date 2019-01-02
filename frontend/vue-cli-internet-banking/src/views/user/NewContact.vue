<template>
  <div id="user">
    <div class="content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card card-default">
              <div class="card-header">New Contact</div>
              <div class="card-body">
                <form @submit.prevent="add">
                  <div class="form-group">
                    <label for="bankAccountNumber">Bank Account Number</label>
                    <input type="number" name="bankAccountNumber" id="bankAccountNumber" class="form-control"
                      v-model="contact.accountNumber">
                  </div>
                  <div class="form-group">
                    <label for="accountHolder">Account Holder</label>
                    <input class="form-control" type="text" id="accountHolder" :placeholder="accountHolder" readonly>
                  </div>
                  <div class="form-group">
                    <label for="contactName">Contact Name</label>
                    <input type="text" name="contactName" id="contactName" class="form-control" v-model="contact.contactName">
                    <small class="text-muted">Maybe Alias, Nickname or Secret Name</small>
                  </div>
                  <button type="submit" class="btn btn-primary">Add Contact</button>
                </form>
                <div class="errors" v-if="errors">
                  <ul>
                    <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                      <strong>{{fieldName}}</strong> {{fieldsError.join('.\n')}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validate from 'validate.js'
import { getAccountName, getContactName, newContact } from '../../helper/user.js'
// Function debounce
function debounce (func, wait) {
  var timeout
  return function () {
    var context = this
    var args = arguments
    var executeFunction = function () {
      timeout = null
      func.apply(context, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(executeFunction, wait)
  }
}

export default {
  name: 'NewContact',
  data () {
    return {
      contact: {
        accountNumber: '',
        contactName: ''
      },
      accountHolder: 'Account Holder',
      checkAccount: '',
      errors: null
    }
  },
  watch: {
    'contact.accountNumber': function (newVal, oldVal) {
      this.accountHolder = 'Searching...'
      if (newVal === '') {
        this.accountHolder = 'Account Holder'
      } else {
        this.debouncedGetAnswer()
      }
    }
  },
  created () {
    var vm = this
    this.debouncedGetAnswer = debounce(function () {
      return vm.getHolder()
    }, 500)
  },
  methods: {
    getHolder () {
      console.log('called')
      getContactName({
        userId: this.$store.state.currentUser.userId,
        accountNumber: this.contact.accountNumber
      })
        .then(res => {
          console.log(res)
          if (res.status === 201) {
            this.accountHolder = res.data.accountName
            this.checkAccount = true
          } else {
            if (res.status === 204) {
              getAccountName({
                accountNumber: this.contact.accountNumber
              })
                .then(res => {
                  if (res.status === 201) {
                    this.accountHolder = res.data.accountName
                    this.checkAccount = true
                  } else {
                    if (res.status === 204) {
                      this.accountHolder = "This Account Number doesn't exist"
                      this.checkAccount = false
                    }
                  }
                })
            }
          }
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    add () {
      this.errors = null
      const constraints = this.getConstraints()
      const errors = validate(this.$data.contact, constraints)
      if (errors || this.checkAccount === false) {
        this.errors = errors
        if (this.checkAccount === false) {
          this.errors = {
            accountHolder: ["Doesn't exist"]
          }
        }
      } else {
        newContact({
          userId: this.$store.state.currentUser.userId,
          contactName: this.contact.contactName,
          accountNumber: this.contact.accountNumber
        })
          .then(res => {
            alert('Add successed')
            this.$store.dispatch('addContact', {
              name: this.contact.contactName,
              accountNumber: this.contact.accountNumber
            })
            this.$router.push('/contact')
          })
          .catch(errors => {
            console.log(errors)
          })
      }
    },
    getConstraints () {
      return {
        accountNumber: {
          presence: true,
          numericality: true,
          length: {
            minimum: 3,
            message: 'must be at least 3 numbers long'
          }
        },
        contactName: {
          presence: true,
          length: {
            minimum: 1,
            message: 'must be at least 1 characters long'
          }
        }
      }
    }
  }
}
</script>
<style>
.errors{
  background: lightcoral;
  border-radius: 5px;
  padding: 21px 0px 2px 0px;
  margin-top: 20px;
}
</style>
