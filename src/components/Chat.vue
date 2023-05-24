<template>
  <section>
    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0 m-auto">
            <div class="card shadow">
              <div class="card-body py-5 px-md-5">
                <h3 class="text-primary text-center">{{ localizations[this.language].chat_header }} {{ $route.params.roomName }}</h3>
                <hr/>
                <div class="m-auto">
                  <div class="border p-4" v-for="message in translated_messages">
                    <div style="width: 64rem;">
                      <p style="font-weight: bold;" class="m-2">
                          {{ message.Sender }}:
                      </p>
                      <p>
                        {{ message.Text }}
                      </p>
                      <p v-if="message.hasOwnProperty('Translation')">
                        {{ localizations[language].translation_prefix }} {{ message.Translation }}
                      </p>
                      <a v-else class="btn float-right btn-primary btn-block m-2 w-10" @click="join_room(room)">
                        {{ localizations[language].translate }}
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="form-outline mb-4">
                    <input type="message" id="message" v-model="newMessage" class="form-control m-2"/>
                    <a class="btn float-right btn-primary btn-block m-2 mt-0 w-10" @click="send_message">
                      {{ localizations[language].send }}
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

  export default {
    mounted() {
      this.fetch_messages();
    },
    data() {
      return {
        /*
        messages: [
          {
            "Sender": "John",
            "Text": "hello world",
            "Time": "1684606665856",
            "Translations": {
              "es":  "Hola Mundo",
              "fr": "Bonjour le monde",
              "pl":"Witaj świecie"
            }
          },
          {
            "Sender": "John2",
            "ROOM_ID": "testaaaaaaaaaaaa",
            "Text": "hello world"
          },
          {
            "Sender": "John",
            "ROOM_ID": "testaaaaaaaaaaaa",
            "Text": "hello world"
          },
          {
            "Sender": "John2",
            "ROOM_ID": "testaaaaaaaaaaaa",
            "Text": "hello world"
          }
        ],*/
        url: "https://ek5ajs509b.execute-api.us-east-1.amazonaws.com",
        roomName: this.$route.params.roomName,
        newMessage: '',
        messages: [],
        localizations: {
          "en": {
            chat_header: "Room:",
            translate: "Translate Message",
            translation_prefix: "Translation:",
            send: "Send message",
            room_name_label: "Room name:",
            formal_label: "Formal",
            profanities_label: "Do not filter profanities",
            create_submit: "CREATE ROOM"
          }
        }
      }
    },
    computed: {
      ...mapState([
        'username',
        'language'
      ]),
      translated_messages() {
        let component = this
        return this.messages.map((message) => {
          let translated_message = {
            "Sender": message.Sender,
            "Text": message.Text
          }
          if (message.hasOwnProperty("Translations") && message.Translations.hasOwnProperty(component.language)) {
            translated_message.Translation = message.Translations[component.language]
          }
          return translated_message
        })
      }
    },
    methods: {
      join_room() {
        console.log(this.language);
      },
      async fetch_messages() {
        let component = this;
        axios.get(this.url + "/getMessages" + "?RoomID=" + this.roomName)
        .then((res) => {
          component.messages = res.data.items;
          console.log(component.messages);
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
          this.fetch_messages();
        })
      }
    },
  }
</script>