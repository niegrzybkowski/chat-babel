<template>
  <section>
    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="my-5 display-3 fw-bold ls-tight">
              {{ current_localization.welcome }} <br/>
              <span class="text-primary">Chat Babel</span>
            </h1>
            <p style="color: hsl(217, 10%, 50.8%)">
              {{ current_localization.intro }}
            </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0" id="register-wrap">
            <div class="card shadow">
              <div class="card-body py-5 px-md-5">
                <form>
                  <h4 class="mb-3 text-center">{{ current_localization.create_account_header }}</h4>
                  <hr/>
                  <Notification v-if="notification" :message="message" :type="type"/>

                  <!-- Username input -->
                  <div class="form-outline mb-4">
                    <label class="form-label" for="username">{{ current_localization.username_label }}</label>
                    <input type="username" id="username" v-model="username" class="form-control"/>
                  </div>

                  <!-- Email input -->
                  <div class="form-outline mb-4">
                    <label class="form-label" for="email">{{ current_localization.email_label }}</label>
                    <input type="email" id="email" v-model="email" class="form-control" />
                  </div>

                  <!-- Password input -->
                  <div class="form-outline mb-4">
                    <label class="form-label" for="password">{{ current_localization.password1_label }}</label>
                    <input type="password" id="password" v-model="password1" class="form-control" />
                  </div>

                  <!-- Repeat password input -->
                  <div class="form-outline mb-4">
                    <label class="form-label" for="repeat-password">{{ current_localization.password2_label }}</label>
                    <input type="password" id="repeat-password" v-model="password2" class="form-control" />
                  </div>

                  <!-- Submit button -->
                  <div class="text-center" style="height: 50px;">
                    <pulse-loader v-if="registering" color="#0D6EFD" class="pt-2"></pulse-loader>
                    <a v-else class="btn btn-primary btn-block mb-4 w-100" @click="register">
                      {{ current_localization.register_button }}
                    </a>
                  </div>
                  <div class="text-center">
                    <p> {{ current_localization.login_alternative_label }} <a href="/login"> {{ current_localization.login_alternative_link }} </a></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script allowsJS="true">
  import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
  import userPool from '../modules/cognito'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import Notification from './Notification.vue'

  export default {
    data() {
      return {
        registering: false,
        notification: false,
        username: '',
        email: '',
        password1: '',
        password2: '',
        message: '',
        type: 'info',
        default_language: "en",
        localizations: {
          "en": {
            welcome: "Welcome to",
            intro: "Chat Babel is a serverless application built in the AWS Cloud that allows users to chat\nacross languages, using a machine learning translation model to translate messages. Create your own account now and start chatting with your friends!",
            create_account_header: "Create your account",
            username_label: "Username:",
            email_label: "Email address:",
            password1_label: "Password:",
            password2_label: "Repeat password:",
            register_button: "SIGN UP",
            login_alternative_label: "Already registered?",
            login_alternative_link: "Sign in",
            password_mismatch: "Passwords do not match!",
            email_error: "Invalid email address.",
            register_success: "Your account has been successfully created. You will now receive an email for verification.",
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
       }
    },
    methods: {
      get_localization() {
        if (!this.localizations[this.$store.state.language]){
          return this.localizations[this.default_language]
        }
        return this.localizations[this.$store.state.language]
      },
      error(message) {
        this.notification = true;
        this.message = message;
        this.type = "error";
      },
      info(message) {
        this.notification = true;
        this.message = message;
        this.type = "info";
      },
      async register() {
        if (this.password1 != this.password2) {
          return this.error(this.get_localization().password_mismatch)
        }
        if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email))) {
          return this.error(this.get_localization().email_error)
        }

        let attributeList = [];
        const dataEmail = {
          Name: "email",
          Value: this.email,
        };
        const attributeEmail = new CognitoUserAttribute(dataEmail);
        attributeList.push(attributeEmail);

        let component = this;
        this.registering = true;
        await new Promise((resolve, reject) =>
          userPool.signUp(this.username, this.password1, attributeList, null, function (err, result) {
            if (err) {
              resolve(component.error(err.message)) // no real way to localize this...
            }
            else {
              resolve(component.info(this.get_localization().register_success))
            }
          })
        )
        this.registering = false;
      }
    },
    components: {
      Notification,
      PulseLoader
    }
}
</script>
