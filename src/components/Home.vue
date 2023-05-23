<template>
  <section>
    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="my-5 display-3 fw-bold ls-tight">
              Welcome to <br/>
              <span class="text-primary">Chat Babel</span>
            </h1>
            <p style="color: hsl(217, 10%, 50.8%)">
              Chat Babel is a serverless application built in the AWS Cloud that allows users to chat
              across languages, using a machine learning translation model to translate messages.
              Create your own account now and start chatting with your friends!
            </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0" id="register-wrap">
            <div class="card shadow">
              <div class="card-body py-5 px-md-5">
                <form>
                  <h4 class="mb-3 text-center">Create your account</h4>
                  <hr/>
                  <Notification v-if="notification" :message="message" :type="type"/>

                  <!-- Username input -->
                  <div class="form-outline mb-4">
                    <label class="form-label" for="username">Username:</label>
                    <input type="username" id="username" v-model="username" class="form-control"/>
                  </div>

                  <!-- Email input -->
                  <div class="form-outline mb-4">
                    <label class="form-label" for="email">Email address:</label>
                    <input type="email" id="email" v-model="email" class="form-control" />
                  </div>

                  <!-- Password input -->
                  <div class="form-outline mb-4">
                    <label class="form-label" for="password">Password:</label>
                    <input type="password" id="password" v-model="password1" class="form-control" />
                  </div>

                  <!-- Repeat password input -->
                  <div class="form-outline mb-4">
                    <label class="form-label" for="repeat-password">Repeat password:</label>
                    <input type="password" id="repeat-password" v-model="password2" class="form-control" />
                  </div>

                  <!-- Submit button -->
                  <div class="text-center" style="height: 50px;">
                    <pulse-loader v-if="registering" color="#0D6EFD" class="pt-2"></pulse-loader>
                    <a v-else class="btn btn-primary btn-block mb-4 w-100" @click="register">
                      SIGN UP
                    </a>
                    
                  </div>
                  <div class="text-center">
                    <p>Already registered? <a href="/login">Sign in</a></p>
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

<script>
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
        type: 'info'
      }
    },
    methods: {
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
          return this.error("Passwords do not match!")
        }
        if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email))) {
          return this.error("Invalid email address.")
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
              resolve(component.error(err.message))
            }
            else {
              resolve(component.info("Your account has been successfully created. "+
              "You will now receive an email for verification."))
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
