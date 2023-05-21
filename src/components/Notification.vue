<template>
  <div class="alert alert-danger w-100 opacity-75 justify-content-center p-2" role="alert"
    v-if="type == 'error'">
    {{ message }}
  </div>
  <div class="alert alert-primary w-100 opacity-75 justify-content-center p-1" role="alert"
    v-else>
    {{ message }}
  </div>
</template>

<script>
  export default {
    props: ["message", "type"]
  }
</script>
