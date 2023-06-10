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
                  <div class="m-auto" v-for="message in messages">
                    <div :class="message.Sender == this.username ? 'border p-3 rounded mb-2 w-75 float-end' : 'border p-3 rounded mb-2 w-75'">
                      <p class="mb-2" :style="message.Sender == this.username ? 'color: #0D6EFD;' : ''">
                        <b>{{ message.Sender }}:</b>
                      </p>
                      <p style="text-align: justify;">
                        {{ message.Text }}
                      </p>
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
  import { mapState } from 'vuex'
  import { Mutex } from 'async-mutex'
  import axios from 'axios'
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

  export default {
    mounted() {
      this.load_latest_messages();
      this.timer = setInterval(() => {
        this.fetch_messages();
      }, 500)
    },
    data() {
      return {
        url: "https://ek5ajs509b.execute-api.us-east-1.amazonaws.com",
        roomName: this.$route.params.roomName,
        newMessage: '',
        fetchingMessages: true,
        messages: [],
        timer: null,
        mutex: new Mutex() // mutex for fetching and translating actions
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
        let release = await this.mutex.acquire();
        axios.get(this.url + "/getMessages?RoomID=" + this.roomName)
        .then((res) => {
          const old_messages = [...this.messages];
          this.messages = res.data.items.sort((m1, m2) => m1.Time - m2.Time);
          this.messages.map(message => {
            const old_message = old_messages.filter(old_message => old_message.ID == message.ID);
            if (old_message.length) message['translating'] = old_message[0].translating;
            else message['translating'] = false;
          });
        })
        .finally(() => {
          this.fetchingMessages = false;
          release();
        })
      },
      async load_latest_messages() {
        let release = await this.mutex.acquire();
        axios.get(this.url + "/joinFetch?RoomID=" + this.roomName)
        .then((res) => {
          const old_messages = [...this.messages];
          this.messages = res.data.items.sort((m1, m2) => m1.Time - m2.Time);
          this.messages.map(message => {
            const old_message = old_messages.filter(old_message => old_message.ID == message.ID);
            if (old_message.length) message['translating'] = old_message[0].translating;
            else message['translating'] = false;
          });
        })
        .finally(() => {
          this.fetchingMessages = false;
          release();
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
        let release = await this.mutex.acquire();
        const newMessage = this.messages.filter(m => message.ID == m.ID)[0] // the one after the fetch
        axios.get(this.url + "/translate?ID=" + message.ID + "&lang=" + this.language)
        .then((res) => {
          newMessage.Translations[this.language] = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          newMessage.translating = false;
          release();
        })
      }
    },
    components: {
      ClipLoader,
      PulseLoader
    },
    beforeUnmount() {
      clearInterval(this.timer);
    }
  }
</script>