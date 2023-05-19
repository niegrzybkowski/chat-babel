<template>
  <div class="col-lg-6 mb-5 mb-lg-0" style="width: 42.5%;">
    <div class="card shadow">
      <div class="card-body py-5 px-md-5">
        <form>
          <h4 class="mb-3 text-center">Enter your credentials</h4>
          <hr/>

          <!-- Username input -->
          <div class="form-outline mb-4">
            <label class="form-label" for="username">Username:</label>
            <input type="username" id="username" class="form-control" />
          </div>

          <!-- Password input -->
          <div class="form-outline mb-4">
            <label class="form-label" for="password">Password:</label>
            <input type="password" id="password" class="form-control" />
          </div>

          <!-- Submit button -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary btn-block mb-4 w-100">
              ACCESS
            </button>
          </div>

          <div class="text-center">
            <p>Not registered yet? <a href="/">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>