<template>
  <div
    class="view login"
    v-if="state.username === '' || state.username === null"
  >
 
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Se connecter à Electric Chat ⚡</h1>
        <label for="username">Username</label>
        <input
          type="text"
          v-model="inputUsername"
          placeholder="Merci de saisir votre username..."
        />
        <input type="submit" value="Se connecter" />
      </div>
    </form>
  </div>

  <div class="view chat" v-else>
    <header>
      <button class="logout" @click="Logout">Se déconnecter</button>
      <h1>Bienvenue, {{ state.username }}</h1>
    </header>

    <section class="chat-box">
      <!-- boucle sur les messages de la base en changeant la classe si c'est un message envoyé ou reçu -->
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="
          message.username == state.username
            ? 'message current-user'
            : 'message'
        "
      >
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="SendMessage">
        <input
          type="text"
          v-model="inputMessage"
          placeholder="Écrire un message..."
        />
        <input type="submit" value="Envoyer" />
      </form>
    </footer>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import db from "./db";

export default {
  setup() {
    // lier zone de texte à cette variable
    const inputUsername = ref("");
    const inputMessage = ref("");

    const state = reactive({
      username: "",
      messages: [],
    });

    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    };

    const Logout =() =>{
      state.username = "";
    }
    const SendMessage = () => {
      const messageRef = db.database().ref("messages");

      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      const message = {
        username: state.username,
        content: inputMessage.value,
      };
      // envoi à la base de donnée message avec username
      messageRef.push(message);
      inputMessage.value = "";
    }
    
    onMounted(() => {
      const messagesRef = db.database().ref("messages");
      // verifie si nouveau message ajouté si changement il envoi snapshot de la base de donné et mettra à jour
      messagesRef.on('value', snapshot => {
        const data = snapshot.val();
        // met les messages dans un tableau
        let messages = [];
        // parcourir l'ensemble des messages de la base avec username id et content
        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          });
        });
        state.messages = messages;
      });
    });

    return {
      inputUsername,
      Login,
      state,
      inputMessage,
      SendMessage,
      Logout
    }
  }
}
</script>

<style lang="scss">
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@media screen and (min-width: 402px)
{
  body{
 width: 375px;
height: 812px;
margin-left: auto;
margin-right: auto;
 }
}


:root {
  --couleur-principale: #fbc531;
  --couleur-secondaire: #242424;
  
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--couleur-secondaire);

  &.login {
    align-items: center;
    .login-form {
      display: block;
      width: 100%;
      padding: 15px;

      .form-inner {
        display: block;
        background-color: #fff;
        padding: 50px 15px;
        border-radius: 16px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
        h1 {
          color: #aaa;
          font-size: 28px;
          margin-bottom: 30px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          color: #aaa;
          font-size: 16px;
          transition: 0.4s;
        }
        input[type="text"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }
        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          background-color: var(--couleur-principale);
          border-radius: 8px;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
        &:focus-within {
          label {
            color: var(--couleur-principale);
          }
          input[type="text"] {
            background-color: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
            &::placeholder {
              color: #666;
            }
          }
        }
      }
    }
  }
  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
      h1 {
        color: var(--couleur-principale);
      }
    }
    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      .message {
        display: flex;
        margin-bottom: 15px;

        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 999px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }
        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;
          .message-inner {
            max-width: 75%;
            .content {
              color: #fff;
              font-weight: 600;
              background-color: var(--couleur-principale);
            }
          }
        }
      }
    }
    footer {
      position: sticky;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      form {
        display: flex;
        input[type="text"] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;
          background-color: var(--couleur-principale);
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
