<template>
  <div class="d-flex justify-content-center">
    <div class="col-lg-6 mb-5 mb-lg-0" style="width: 42.5%;">
      <div class="card shadow">
        <div class="card-body py-5 px-md-5">
          <form>
            <h4 class="mb-3 text-center"> {{ current_localization.login_header }} </h4>
            <hr/>
            <Notification v-if="notification" :message="message" :type="type"/>
          
            <!-- Username input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="username">{{ current_localization.username_label }}</label>
              <input type="username" id="username" v-model="username" class="form-control" />
            </div>
          
            <!-- Password input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="password">{{ current_localization.password1_label }}</label>
              <input type="password" id="password" v-model="password" class="form-control" />
            </div>
          
            <!-- Submit button -->
            <div class="text-center" style="height: 50px;">
              <a v-if="!logging" class="btn btn-primary btn-block mb-4 w-100" @click="login">
                {{ current_localization.login_button }}
              </a>
              <pulse-loader v-else color="#0D6EFD" class="pt-2"></pulse-loader>
            </div>
          
            <div class="text-center">
              <p>{{ current_localization.register_alternative_label }} <a href="/"> {{ current_localization.register_alternative_link }} </a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Notification from './Notification.vue'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import userPool from '../modules/cognito'
  import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

  export default {
    data() {
      return {
        logging: false,
        notification: false,
        username: '',
        password: '',
        message: '',
        type: 'info',
        default_language: "en",
        localizations: {
          "en": {
            login_header: "Create your account",
            username_label: "Username:",
            password1_label: "Password:",
            login_button: "ACCESS",
            register_alternative_label: "Not registered yet?",
            register_alternative_link: "Register"
          },
        }
      }
    },
    computed: {
       current_localization() {
        if (!this.localizations[this.$store.state.language]){
          return this.localizations[this.default_language]
        }
        return this.localizations[this.$store.state.language]
      },
    },
    methods: {
      error(message) {
        this.notification = true
        this.message = message
        this.type = "error"
      },
      info(message) {
        this.notification = true
        this.message = message
        this.type = "info"
      },
      async login() {
        const authenticationData = {
          Username: this.username,
          Password: this.password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData)
        const userData = {
          Username: this.username,
          Pool: userPool,
        }
        const cognitoUser = new CognitoUser(userData)

        let component = this
        this.logging = true
        await new Promise((resolve, reject) => 
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
              const accessToken = result.getAccessToken().getJwtToken()
              localStorage.setItem('accessToken', accessToken)
              component.$store.commit('updateAccessToken', accessToken)
              localStorage.setItem('username', userData.Username)
              component.$store.commit('updateUsername', userData.Username)
              window.location.href = '/rooms'
            },
            onFailure: err => resolve(component.error(err.message))
          })
        )
        this.logging = false
      }
    },
    components: {
      Notification,
      PulseLoader
    }
}
</script>