<template>
    <div id="body" style="background-image: url('/fundo-1.jpg');">
      <div class="login-container" style="background-image: url('/fundo_login.png');">
          <div style="position: relative; z-index: 99;">
          <h2 style="color: #ffeb3b; margin-bottom: 1px;">Acessar</h2>
          <p>BMVE Comércio</p>  
            <div class="input-field">
                <input type="text" placeholder="B.I">
            </div>
            <div class="input-field">
                <input type="password" placeholder="Senha">

            </div>
            <br><br><br>
            <button @click="logar" style="width: 100% !important;"> <img v-show="conectar" src="/loader.gif" alt="" width="22"> Conectar</button>
          </div>
          <div style="position: absolute; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.4); top: 0; left: 0;">
          </div>
      </div>
    </div>
  </template>


<script>
    export default {
        data() {
            return {
                conectar: false
            }
        },

        methods: {
            logar() {
                this.conectar = true

                setTimeout(() => {
                    this.$router.push("/funcionarios")
                }, 2000)

            }
        }
    }

</script>


  <style>
    #body {
        font-family: 'Verdana', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-size: cover;
        background-position: center;
        height: 100%;
        color: #ffeb3b !important;
    }
  
    .login-container {
        position: relative;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        overflow: hidden;
        height: 450px;
        width: 400px;
    }
  
    .input-field {
        position: relative;
        margin-bottom: 25px;
    }
  
    .input-field input {
        width: 100%;
        padding: 15px;
        border: none;
        border-bottom: 2px solid #ffeb3b;
        background-color: transparent;
        font-size: 18px;
        color: #fff;
    }

    .input-field input::placeholder {
        color: rgba(255, 255, 255, 0.8);
    }
  
    .input-field input:focus {
        outline: none;
        border-color: #ff5722;
    }
  
    button {
        border: 1px solid #ffeb3b !important;
        background: none !important;
        color: #fff;
        padding: 15px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
  
    button:hover {
        background-color: #e64a19;
    }
  </style>
  