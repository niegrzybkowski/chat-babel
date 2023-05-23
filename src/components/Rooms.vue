<template>
  <section>
    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0" id="register-wrap">
            <div class="card shadow">
              <div class="card-body py-5 px-md-5">
                  <h3 class="text-primary">{{ localizations[current_language].join_header }}</h3>
                  <hr/>
                  <!-- Room container -->
                  <table class="m-auto">
                    <tr class="border w-96 p-4" v-for="room in room_list">
                      <td>
                        <p class="m-2">
                            {{ room.room_name }}
                        </p>
                      </td>
                      <td>
                        <a class="btn float-right btn-primary btn-block m-2 w-10" @click="join_room(room)">
                          {{ localizations[current_language].enter_button }}
                        </a>
                      </td>
                    </tr>
                  </table>
                  <a class="btn float-right btn-primary btn-block my-2 w-10" @click="refresh_room_list">
                    {{ localizations[current_language].refresh }}
                  </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-5 mb-lg-0" id="register-wrap">
            <div class="card shadow">
              <div class="card-body py-5 px-md-5">
                  <h3 class="text-primary">{{ localizations[current_language].create_header }}</h3>
                  <!-- Room container -->
                  <form>
                    <hr/>
                    <Notification v-if="notification" :message="message" :type="type"/>

                    <!-- Username input -->
                    <div class="form-outline mb-4">
                      <label class="form-label" for="roomname">{{ localizations[current_language].room_name_label }}</label>
                      <input id="roomname" v-model="roomname" class="form-control" />
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-2">
                      <input type="checkbox"  v-model="formal" id="formal" name="formal">
                      <label class="form-label m-2" for="formal">{{ localizations[current_language].formal_label }}</label>
                      
                      <input type="checkbox"  v-model="profanities" id="profanities" name="profanities">
                      <label class="form-label m-2" for="profanities">{{ localizations[current_language].profanities_label }}</label>
                    </div>

                    <!-- Submit button -->
                    <div class="text-center" style="height: 50px;">
                      <a class="btn btn-primary btn-block mb-4 w-100" @click="login">
                        {{ localizations[current_language].create_submit }}
                      </a>
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
  export default {
    data() {
      return {
        room_list: [
          {
            room_name: "Test1",
            room_id: "123"
          },
          {
            room_name: "Test2",
            room_id: "123"
          },
          {
            room_name: "Test3",
            room_id: "123"
          },
          {
            room_name: "Test4 but with a very very long name",
            room_id: "123"
          },
        ],
        current_language: "en",
        localizations: {
          "en": {
            join_header: "Join an existing room:",
            enter_button: "Enter",
            refresh: "Refresh",
            create_header: "Or create a new one:",
            room_name_label: "Room name:",
            formal_label: "Formal",
            profanities_label: "Do not filter profanities",
            create_submit: "CREATE ROOM"
          }
        }
      }
    },
    methods: {
      refresh_room_list() {
        this.room_list.push({room_name: "Test from refresh", room_id: "123"})
      },
      join_room(room) {
        console.log(room)
      }
    },
}
</script>