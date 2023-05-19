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
                    <input type="repeat-password" id="repeat-password" v-model="password2" class="form-control" />
                  </div>

                  <!-- Submit button -->
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-block mb-4 w-100" @click="greet">
                      SIGN UP
                    </button>
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
  <button @click="register">CCCC</button>
</template>

<script>
import testCognito from '/modules/cognito'
import { userPool } from '/modules/cognito'
import { notify } from 'notiwind'

export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    register() {
      if (this.password1 != this.password2) {
        console.log("!=")
        notify({
          group: "foo",
          title: "Success",
          text: "Your account was registered!"
        }, 4000) // 4s
      }
      console.log(this.username)
    }
  }
}
</script>

