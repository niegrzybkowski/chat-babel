<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="nav-link" href="/">
      <span class="mx-3 mark lead">
        Chat Babel
      </span>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="p-5 mt-5">
    <div class="d-flex justify-content-center">
      <router-view/>
    </div>
  </div>
</template>
