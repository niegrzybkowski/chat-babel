<template>
  <section>
    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card shadow">
              <div class="card-body py-5 px-md-5" style="overflow: hidden; white-space: nowrap;">
                <h3 class="text-primary text-center">{{ localizations[current_language].join_header }}</h3>
                <hr/>
                <clip-loader v-if="loadingRooms" color="gray" class="pt-2"></clip-loader>
                <!-- Room container -->
                <table class="w-100" v-else>
                  <tr class="border w-96 p-4" v-for="room in room_list">
                    <td>
                      <p class="m-2">
                          {{ room.NAME }}
                      </p>
                    </td>
                    <td class="text-end">
                      <a class="btn float-right btn-primary btn-block m-2 btn-sm" :href="'/rooms/' + room.NAME">
                        {{ localizations[current_language].enter_button }}
                      </a>
                    </td>
                  </tr>
                </table>
                <div class="text-center" v-if="!loadingRooms">
                  <a class="btn float-right btn-secondary btn-block mt-3" @click="fetch_rooms">
                    {{ localizations[current_language].refresh }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-5 mb-lg-0" id="register-wrap">
            <div class="card shadow">
              <div class="card-body py-5 px-md-5">
                <!-- Room container -->
                <form>
                  <h3 class="text-primary text-center">{{ localizations[current_language].create_header }}</h3>
                  <hr/>
                  <Notification v-if="notification" :message="message" :type="type"/>

                  <!-- Roomname input -->
                  <div class="form-outline mb-2">
                    <label class="form-label" for="roomName">{{ localizations[current_language].room_name_label }}</label>
                    <input id="roomName" v-model="roomName" class="form-control" required/>
                  </div>

                  <!-- Checkboxes -->
                  <div class="form-outline mb-3" style="overflow: hidden; white-space: nowrap;">
                    <input type="checkbox"  v-model="formal" id="formal" name="formal">
                    <label class="form-label m-2" for="formal">{{ localizations[current_language].formal_label }}</label>
                    
                    <input type="checkbox"  v-model="profanities" id="profanities" name="profanities">
                    <label class="form-label m-2" for="profanities">{{ localizations[current_language].profanities_label }}</label>
                  </div>

                  <!-- Submit button -->
                  <div class="text-center" style="height: 50px;">
                    <pulse-loader v-if="creatingRoom" color="#0D6EFD" class="pt-2"></pulse-loader>
                    <a v-else class="btn btn-primary btn-block w-100" @click="create_room">
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
  import axios from 'axios'
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import Notification from './Notification.vue'

  export default {
    mounted() {
      this.fetch_rooms()
    },
    data() {
      return {
        url: "https://ek5ajs509b.execute-api.us-east-1.amazonaws.com",
        loadingRooms: true,
        creatingRoom: false,
        notification: false,
        message: '',
        type: 'error',
        roomName: '',
        formal: false,
        profanities: false,
        room_list: [],
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
      join_room(room) {
        console.log(room)
      },
      error(message) {
        this.notification = true
        this.message = message
        this.type = "error"
      },
      async fetch_rooms() {
        this.loadingRooms = true;
        let component = this;
        axios.get(this.url + "/getRooms")
        .then((res) => {
          component.room_list = res.data.items;
          this.loadingRooms = false;
        })
      },
      async create_room() {
        if (this.roomName == '') {
          this.error('Invalid room name.');
          return;
        }
        this.creatingRoom = true;
        axios.post(this.url + "/createRoom", {
          "NAME": this.roomName,
          "Formality": this.formal, 
          "Profanity": this.profanities
        }).then(() => {
          window.location.href = "/rooms/" + this.roomName;
        }).catch((err) => {
          this.error(err.response.data);
        }).finally(() => {
          this.creatingRoom = false;
        });
      }
    },
    components: {
      ClipLoader,
      PulseLoader,
      Notification
    }
}
</script>