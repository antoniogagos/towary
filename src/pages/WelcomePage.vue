<template>
  <div id="container">
    <div class="welcome-page">
      <div class="welcome-page--container">
        <div class="logo-container">
          <svg class="logo-img" width="96" height="96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390.307 390.307"><g fill="#ffc10d"><path d="M230.386 292.655v75.895h-70.465v-75.895c0-19.523 15.709-35.232 35.232-35.232s35.233 15.708 35.233 35.232z"/><path d="M279.194 136.016l23.273 232.533h-50.424v-75.895c0-31.418-25.471-56.889-56.889-56.889s-56.889 25.471-56.889 56.889v75.895H87.84l14.61-147.976h17.325c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.848-10.861-10.861-10.861h-15.127l2.198-21.657h34.651c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.913-10.861-10.861-10.861H108.98l2.133-19.523c0-7.046-4.331-11.895-10.861-11.895H62.305v-102.4h36.331v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861V21.657h42.796v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861V21.657h35.749v102.465H289.99c-5.948-.583-10.796 4.331-10.796 11.894z"/></g><path d="M159.921 368.549h70.465v-75.895c0-19.523-15.709-35.232-35.232-35.232s-35.232 15.709-35.232 35.232v75.895z" fill="#56ace0"/><path d="M338.798 0H280.81c-5.947 0-10.861 4.848-10.861 10.861v44.412h-32V10.861c0-5.948-4.848-10.861-10.86-10.861h-64.517c-5.947 0-10.861 4.848-10.861 10.861v44.412h-32V10.861C119.711 4.913 114.863 0 108.85 0H51.509c-5.947 0-10.861 4.848-10.861 10.861v124.121c0 5.947 4.848 10.861 10.861 10.861h36.848L65.085 378.376c-.517 5.947 4.331 12.477 10.861 11.895h238.481c7.564 0 11.895-7.046 10.279-13.576l-23.273-230.853h37.366c5.947 0 10.861-4.848 10.861-10.861V10.861C349.594 4.848 344.745 0 338.798 0zM230.386 368.549h-70.465v-75.895c0-19.523 15.709-35.232 35.232-35.232s35.232 15.709 35.232 35.232v75.895zm97.551-244.428H289.99c-5.947-.517-10.861 4.331-10.861 11.895l23.273 232.533h-50.424v-75.895c0-31.418-25.471-56.889-56.889-56.889s-56.889 25.471-56.889 56.89v75.895H87.776l14.61-147.976h17.325c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.848-10.861-10.861-10.861h-15.063l2.198-21.657h34.651c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.848-10.861-10.861-10.861H108.98l2.198-19.523c0-7.046-4.331-11.895-10.861-11.895H62.37v-102.4h36.331v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861v-44.41h42.796v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861V21.657h35.749v102.465h-.067z" fill="#194f82"/></svg>
          Towary
        </div>
        <div id="firebaseui-auth-container"></div>
      </div>
    </div>
  </div>
</template>

<script>

import { firebase, firebaseui } from '../firebase-connection.js';

export default {
  name: 'app',
  mounted: function() {
    var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult) {
          document.body.dispatchEvent(new CustomEvent('user-logged', {
            detail: {
              user: authResult.user
            }
          }));
          return false;
        },
      },
      signInFlow: 'popup',
      signInOptions: [{
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      }],
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  },
}

</script>

<style scoped>

header {
  align-items: center;
  background: #fff;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.16);
  color: #464646;
  display: flex;
  font-size: 28px;
  font-weight: bold;
  height: 48px;
  justify-content: space-between;;
  left: 0;
  padding: 0 16px;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

#container {
  color: #333;
  width: 100%;
  height: 100%;
  font-size: 16px;
}

.welcome-page {
  background: url(../assets/welcome-bg.png);
  box-sizing: border-box;
  display: block;
  height: 100%;
  padding: 25px;
}

.logo-container {
  display: flex;
  align-items: center;
  font-size: 62px;
  font-weight: bold;
  justify-content: center;
  padding-bottom: 60px;
  background: #FAFAFA;
}

.firebaseui-idp-google {
  width: 100%;
  border-radius: 4px;
  max-width: none;
}

.welcome-page--container {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-img {
  border-radius: 16px;
  box-shadow: 0 2px 2px 0px rgba(0,0,0,0.2);
  height: 80px;
  width: 80px;
  margin-right: 15px;
  padding: 4px;
  box-sizing: border-box;
}


</style>
