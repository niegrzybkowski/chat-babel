<template>
  <section>
    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-7 mb-5 mb-lg-0 m-auto">
            <div class="card shadow">
              <div class="card-body py-5 px-md-5">
                <h3 class="text-primary text-center">{{ current_localization.chat_header }} {{ $route.params.roomName }}</h3>
                <hr/>
                <clip-loader v-if="fetchingMessages" color="gray" class="pt-2"></clip-loader>
                <div v-else>
                  <div class="m-auto">
                    <div class="border p-4" v-for="message in messages">
                      <p class="mb-2">
                        <b>{{ message.Sender }}</b>:
                      </p>
                      <p style="text-align: justify;">
                        {{ message.Text }}
                      </p>
                      <!--
                      <p v-if="message.hasOwnProperty('Translation')">
                        {{ localizations[language].translation_prefix }} {{ message.Translation }}
                      </p>
                      <a v-else class="btn float-right btn-primary btn-block m-2 w-10" @click="join_room(room)">
                        {{ localizations[language].translate }}
                      </a>
                      -->
                      <p v-if="message.Translations[this.language]" class="mb-0 text-success" style="text-align: justify">
                        <i>{{ message.Translations[this.language]}}</i>
                      </p>
                      <pulse-loader v-else-if="message.translating" color="gray" size="11px"></pulse-loader>
                      <a v-else class="btn float-right btn-outline-success btn-sm text-uppercase" @click="translate_message(message)">
                        {{current_localization.translate }}
                      </a>
                    </div>
                  </div>
                  <div class="form-outline mt-4 w-50 mx-auto">
                    <textarea id="message" v-model="newMessage" class="form-control" style="resize: none;"></textarea>
                    <a class="btn float-right btn-primary btn-block mt-2" @click="send_message">
                      {{ current_localization.send }}
                    </a>
                  </div>
                </div>
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
  import { mapState } from 'vuex'
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

  export default {
    mounted() {
      this.fetch_messages();
    },
    data() {
      return {
        url: "https://ek5ajs509b.execute-api.us-east-1.amazonaws.com",
        roomName: this.$route.params.roomName,
        newMessage: '',
        fetchingMessages: true,
        messages: [],
      }
    },
    computed: {
      ...mapState([
        'username',
        'language'
      ]),
      current_localization() {
        if (!this.localizations[this.$store.state.language]){
          return this.localizations[this.default_language]
        }
        return this.localizations[this.$store.state.language]
       }
    },
    methods: {
      join_room() {
        console.log(this.language);
      },
      async fetch_messages() {
        //this.fetchingMessages = true;
        axios.get(this.url + "/getMessages?RoomID=" + this.roomName)
        .then((res) => {
          this.messages = res.data.items.sort((m1, m2) => m1.Time - m2.Time);
          this.messages.map(message => message['translating'] = false);
        })
        .finally(() => {
          this.fetchingMessages = false;
        })
      },
      async send_message() {
        if (this.newMessage == '') {
          return;
        }
        axios.post(this.url + "/sendMessage", {
          "ROOM_ID": this.roomName,
          "Sender": this.username,
          "Text": this.newMessage
        })
        .then(() => {
          this.newMessage = '';
          this.fetch_messages();
        })
        .catch((err) => {
          console.log(err);
        })
      },
      async translate_message(message) {
        message.translating = true;
        axios.get(this.url + "/translate?ID=" + message.ID + "&lang=" + this.language)
        .then((res) => {
          message.Translations[this.language] = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          message.translating = false;
        })
      }
    },
    components: {
      ClipLoader,
      PulseLoader
    }
  }
</script>