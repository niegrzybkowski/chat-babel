<template>
  <section>
    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0 m-auto">
            <div class="card shadow">
              <div class="card-body py-5 px-md-5">
                  <h3 class="text-primary">{{ localizations[current_language].chat_header }} {{ $route.params.roomname }}</h3>
                  <hr/>
                  <div class="m-2">
                    <label class="m-2" for="lang">Translate language</label>
                    <select name="lang" id="lang" v-model="lang">
                      <option value="en">English</option>
                      <option value="pl">Polish</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <!-- Room container -->
                  <div style="" class="m-auto">
                    <div class="border p-4" v-for="message in translated_messages">
                      <div style="width: 64rem;">
                        <p style="font-weight: bold;" class="m-2">
                            {{ message.Sender }}:
                        </p>
                        <p>
                          {{ message.Text }}
                        </p>
                        <p v-if="message.hasOwnProperty('Translation')">
                          {{ localizations[current_language].translation_prefix }} {{ message.Translation }}
                        </p>
                        <a v-else class="btn float-right btn-primary btn-block m-2 w-10" @click="join_room(room)">
                          {{ localizations[current_language].translate }}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="form-outline mb-4">
                      <input type="message" id="message" v-model="message" class="form-control m-2"/>
                      <a class="btn float-right btn-primary btn-block m-2 mt-0 w-10" @click="send_message">
                        {{ localizations[current_language].send }}
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

  export default {
    mounted() {
    },
    data() {
      return {
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
        ],
        current_language: "en", //todo: move to navbar and global state
        lang: "en", //todo: move to navbar and global state
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
      translated_messages() {
        let component = this
        return this.messages.map((message) => {
          let translated_message = {
            "Sender": message.Sender,
            "Text": message.Text
          }
          if (message.hasOwnProperty("Translations") && message.Translations.hasOwnProperty(component.lang)) {
            translated_message.Translation = message.Translations[component.lang]
          }
          return translated_message
        })
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
      async fetch_messages() {
        let component = this;
        axios.get("https://ek5ajs509b.execute-api.us-east-1.amazonaws.com/getMessages")
        .then((res) => {
          component.room_list = res.data.items
        })
      },
    },
}
</script>