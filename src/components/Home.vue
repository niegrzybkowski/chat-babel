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
                  <NotificationGroup group="all">
                    <Notification v-slot="{ notifications }">
                      <div
                        v-for="notification in notifications.slice(0, 1)"
                        :key="notification.id"
                      >
                        <div class="alert alert-primary w-100 opacity-75 justify-content-center p-1" role="alert"
                          v-if="notification.type === 'info'">
                          {{ notification.text }}
                        </div>
                        <div class="alert alert-danger w-100 opacity-75 justify-content-center p-2" role="alert"
                          v-if="notification.type === 'error'">
                          {{ notification.text }}
                        </div>
                      </div>
                    </Notification>
                  </NotificationGroup>

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
                  <div class="text-center">
                    <a class="btn btn-primary btn-block mb-4 w-100" @click="register">
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
import { userPool } from '/modules/cognito'
import { notify } from 'notiwind'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'

export default {
  data() {
    return {
      username: '',
      email: '',
      password1: '',
      password2: ''
    }
  },
  methods: {
    register() {
      if (this.password1 != this.password2) {
        return notify({
          group: "all",
          type: "error",
          text: "Passwords do not match!"
        }, -1)
      }

      if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email))) {
        return notify({
          group: "all",
          type: "error",
          text: "Invalid email address"
        }, -1)
      }

      let attributeList = [];

      const dataEmail = {
        Name: 'email',
        Value: 'jaimegimillo@gmail.com',
      };

      const attributeEmail = new CognitoUserAttribute(dataEmail);
      attributeList.push(attributeEmail);

      userPool.signUp(this.username, this.password1, attributeList, null, function(
        err,
        result
      ) {
        if (err) {
          return notify({
            group: "all",
            type: "error",
            text: err.message
          }, -1)
        }
        else {
          return notify({
            group: "all",
            type: "info",
            text: "Your account has been successfully created. You will now receive an email for verification"
          }, -1)
        }
      });
    }
  }
}
</script>

