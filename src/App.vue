<template>
  <div class="app">
    <div id="shell" unresolved>
      <header v-show="!showSearchBar" v-if="user">
        <div class="header-logo">
          <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390.307 390.307"><g fill="#ffc10d"><path d="M230.386 292.655v75.895h-70.465v-75.895c0-19.523 15.709-35.232 35.232-35.232s35.233 15.708 35.233 35.232z"/><path d="M279.194 136.016l23.273 232.533h-50.424v-75.895c0-31.418-25.471-56.889-56.889-56.889s-56.889 25.471-56.889 56.889v75.895H87.84l14.61-147.976h17.325c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.848-10.861-10.861-10.861h-15.127l2.198-21.657h34.651c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.913-10.861-10.861-10.861H108.98l2.133-19.523c0-7.046-4.331-11.895-10.861-11.895H62.305v-102.4h36.331v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861V21.657h42.796v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861V21.657h35.749v102.465H289.99c-5.948-.583-10.796 4.331-10.796 11.894z"/></g><path d="M159.921 368.549h70.465v-75.895c0-19.523-15.709-35.232-35.232-35.232s-35.232 15.709-35.232 35.232v75.895z" fill="#56ace0"/><path d="M338.798 0H280.81c-5.947 0-10.861 4.848-10.861 10.861v44.412h-32V10.861c0-5.948-4.848-10.861-10.86-10.861h-64.517c-5.947 0-10.861 4.848-10.861 10.861v44.412h-32V10.861C119.711 4.913 114.863 0 108.85 0H51.509c-5.947 0-10.861 4.848-10.861 10.861v124.121c0 5.947 4.848 10.861 10.861 10.861h36.848L65.085 378.376c-.517 5.947 4.331 12.477 10.861 11.895h238.481c7.564 0 11.895-7.046 10.279-13.576l-23.273-230.853h37.366c5.947 0 10.861-4.848 10.861-10.861V10.861C349.594 4.848 344.745 0 338.798 0zM230.386 368.549h-70.465v-75.895c0-19.523 15.709-35.232 35.232-35.232s35.232 15.709 35.232 35.232v75.895zm97.551-244.428H289.99c-5.947-.517-10.861 4.331-10.861 11.895l23.273 232.533h-50.424v-75.895c0-31.418-25.471-56.889-56.889-56.889s-56.889 25.471-56.889 56.89v75.895H87.776l14.61-147.976h17.325c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.848-10.861-10.861-10.861h-15.063l2.198-21.657h34.651c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.848-10.861-10.861-10.861H108.98l2.198-19.523c0-7.046-4.331-11.895-10.861-11.895H62.37v-102.4h36.331v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861v-44.41h42.796v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861V21.657h35.749v102.465h-.067z" fill="#194f82"/></svg>
          Towary
        </div>
        <svg tabindex="0" v-show="$route.path === '/home'" @keyup.enter="showSearchBar = true" @click="showSearchBar = true" class="search-icon" fill="#000000b3" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966"><path d="M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"/></svg>
        <img @click="signOut" class="user-img" width="30" height="30" :src="user.providerData[0].photoURL"/>
      </header>
      <router-view :search-input="searchInput" :user-fav-books="userFavBooks" :user="user"></router-view>
      <footer v-if="user">
        <router-link to="/home" class="footer-item">
          <svg width="24" height="24" class="footer-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fill=""><path d="M14.72,17.64c-0.32,0.28-0.83,0.56-1.23,0.69c-1.14,0.38-2.27-0.07-3.05-0.71c-0.11-0.09-0.07-0.26,0.06-0.31  c1.19-0.38,1.89-1.3,2.09-2.22c0.2-0.88-0.16-1.64-0.31-2.51c-0.12-0.72-0.11-1.34,0.12-2c0.04-0.11,0.2-0.13,0.25-0.02  c0.71,1.59,2.72,2.29,3.07,4.04c0.03,0.16,0.05,0.32,0.05,0.48C15.8,16.02,15.4,17.03,14.72,17.64 M17.55,9.62  c-0.75-0.7-1.63-1.2-2.36-1.93c-1.49-1.51-2-3.64-1.34-5.66c0.11-0.33-0.2-0.63-0.51-0.49c-0.71,0.31-1.39,0.76-1.98,1.24  C8.38,5.2,7.27,9.26,8.65,12.92c0.03,0.13,0.08,0.26,0.08,0.39c0,0.26-0.16,0.5-0.39,0.6c-0.26,0.12-0.54,0.04-0.74-0.15  c-0.06-0.06-0.12-0.12-0.17-0.19c-0.96-1.26-1.32-2.95-1.05-4.52c0.07-0.4-0.43-0.62-0.67-0.31c-1.21,1.57-1.81,3.67-1.69,5.65  c0.04,0.59,0.13,1.18,0.29,1.75c0.2,0.71,0.49,1.4,0.88,2.03c1.21,2.01,3.34,3.46,5.63,3.75c2.43,0.31,5.06-0.14,6.94-1.87  c2.09-1.93,2.85-5,1.73-7.68c-0.04-0.11-0.09-0.21-0.14-0.32c-0.25-0.52-0.55-1.01-0.91-1.45C18.17,10.24,17.87,9.92,17.55,9.62z"></path></svg>
          <div class="footer-item-title">Top books</div>
        </router-link>
        <router-link to="/favs" class="footer-item">
          <svg class="footer-icon" height="24" width="24" viewBox="0 -40 448 448" fill="#1312128a" xmlns="http://www.w3.org/2000/svg"><path d="m408 319.929688v-319.929688l-12.207031 1.023438c-48.957031 4.046874-96.976563 15.75-142.304688 34.6875l-21.488281 8.921874v318.664063l15.648438-6.503906c46.90625-19.515625 96.570312-31.589844 147.199218-35.792969zm0 0"/><path d="m448 47.296875h-24v280c.015625 4.171875-3.183594 7.65625-7.34375 8l-20.488281 1.679687c-5.914063.488282-11.8125 1.09375-17.6875 1.816407-1.90625.230469-3.800781.535156-5.695313.800781-3.960937.527344-7.914062 1.0625-11.855468 1.6875-2.296876.367188-4.578126.796875-6.867188 1.199219-3.527344.617187-7.0625 1.230469-10.582031 1.925781-2.402344.480469-4.800781 1.019531-7.25 1.539062-3.351563.710938-6.703125 1.4375-10.03125 2.230469-2.496094.59375-4.984375 1.222657-7.464844 1.855469-3.238281.800781-6.460937 1.664062-9.679687 2.5625-2.503907.6875-5.007813 1.414062-7.503907 2.148438-3.199219.945312-6.351562 1.90625-9.511719 2.914062-2.472656.800781-4.949218 1.601562-7.414062 2.398438-3.164062 1.066406-6.3125 2.167968-9.449219 3.304687-2.398437.871094-4.800781 1.746094-7.253906 2.664063-1.097656.417968-2.1875.863281-3.28125 1.289062h183.359375zm0 0"/><path d="m52.207031 1.023438-12.207031-1.023438v319.953125l14.199219 1.207031c50.597656 4.230469 100.21875 16.378906 147.046875 36l14.753906 6.136719v-318.664063l-21.464844-8.914062c-45.332031-18.941406-93.359375-30.648438-142.328125-34.695312zm0 0"/><path d="m0 47.296875v320h183.488281c-.984375-.386719-1.96875-.800781-2.960937-1.167969-2.289063-.871094-4.597656-1.703125-6.902344-2.542968-3.25-1.179688-6.496094-2.328126-9.769531-3.425782-2.367188-.800781-4.742188-1.578125-7.121094-2.335937-3.246094-1.066407-6.503906-2.070313-9.765625-3.007813-2.402344-.703125-4.800781-1.410156-7.199219-2.082031-3.289062-.910156-6.585937-1.773437-9.890625-2.621094-2.398437-.617187-4.800781-1.234375-7.253906-1.808593-3.351562-.800782-6.722656-1.535157-10.089844-2.257813-2.398437-.519531-4.800781-1.046875-7.199218-1.527344-3.488282-.6875-6.992188-1.304687-10.496094-1.917969-2.296875-.402343-4.59375-.800781-6.894532-1.210937-3.867187-.613281-7.746093-1.132813-11.625-1.65625-1.960937-.261719-3.90625-.574219-5.863281-.796875-5.867187-.710938-11.734375-1.316406-17.601562-1.816406l-21.535157-1.824219c-4.152343-.355469-7.335937-3.835937-7.320312-8v-280zm0 0"/></svg>
          <div class="footer-item-title">Favorites</div>
        </router-link>
        <router-link to="/my-reviews" class="footer-item">
          <svg class="footer-icon" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.513 87.422c0-12.012-4.688-23.32-13.184-31.816l-42.422-42.422C325.529 4.805 313.636 0 301.8 0h-2.578v90h90.292l-.001-2.578z"/><path d="M273.937 309.537c2.871-8.716 7.881-16.831 14.414-23.408l101.562-101.153V120h-105.4c-8.291 0-14.513-6.709-14.513-15V0H45C20.186 0 0 20.186 0 45v422c0 24.814 20.186 45 45 45h299.513c24.814 0 45.4-20.186 45.4-45V355.049l-16.484 16.084c-6.679 6.621-14.501 11.44-23.32 14.385l-47.695 15.923-7.266.396c-12.012 0-23.379-5.845-30.439-15.63-7.002-9.741-8.906-22.368-5.098-33.779l14.326-42.891zM75 270h149.513c8.291 0 15 6.709 15 15s-6.709 15-15 15H75c-8.291 0-15-6.709-15-15s6.709-15 15-15zm-15-45c0-8.291 6.709-15 15-15h149.513c8.291 0 15 6.709 15 15s-6.709 15-15 15H75c-8.291 0-15-6.709-15-15zm0 120c0-8.291 6.709-15 15-15h149.513c8.291 0 15 6.709 15 15s-6.709 15-15 15H75c-8.291 0-15-6.709-15-15zm224.513 75c8.291 0 15 6.709 15 15s-6.708 15-15 15h-90c-8.291 0-15-6.709-15-15s6.709-15 15-15h90zM75 180c-8.291 0-15-6.709-15-15s6.709-15 15-15h209.513c8.291 0 15 6.709 15 15s-6.709 15-15 15H75z"/><path d="M301.111 322.808l-13.05 39.151c-1.956 5.865 3.625 11.444 9.49 9.485l39.128-13.068-35.568-35.568zM417.609 199.307l-98.789 98.789 42.605 42.605c22.328-22.332 65.773-65.783 98.784-98.794l-42.6-42.6zM503.185 156.284c-5.273-5.303-13.037-8.335-21.27-8.335-8.233 0-15.996 3.032-21.299 8.35l-21.797 21.797 42.598 42.598 21.799-21.799c11.717-11.735 11.716-30.849-.031-42.611z"/><path d="M503.215 198.896l.002-.002.086-.086a3.634 3.634 0 01-.088.088zM503.303 198.808l.133-.133-.133.133zM503.436 198.675c.097-.097.099-.099 0 0z"/></svg>
          <div class="footer-item-title">My reviews</div>
        </router-link>
      </footer>
    </div>
    <div id="loader">
      <svg class="loader" width="120" height="120" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390.307 390.307"><g fill="#ffc10d"><path d="M230.386 292.655v75.895h-70.465v-75.895c0-19.523 15.709-35.232 35.232-35.232s35.233 15.708 35.233 35.232z"/><path d="M279.194 136.016l23.273 232.533h-50.424v-75.895c0-31.418-25.471-56.889-56.889-56.889s-56.889 25.471-56.889 56.889v75.895H87.84l14.61-147.976h17.325c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.848-10.861-10.861-10.861h-15.127l2.198-21.657h34.651c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.913-10.861-10.861-10.861H108.98l2.133-19.523c0-7.046-4.331-11.895-10.861-11.895H62.305v-102.4h36.331v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861V21.657h42.796v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861V21.657h35.749v102.465H289.99c-5.948-.583-10.796 4.331-10.796 11.894z"/></g><path d="M159.921 368.549h70.465v-75.895c0-19.523-15.709-35.232-35.232-35.232s-35.232 15.709-35.232 35.232v75.895z" fill="#56ace0"/><path d="M338.798 0H280.81c-5.947 0-10.861 4.848-10.861 10.861v44.412h-32V10.861c0-5.948-4.848-10.861-10.86-10.861h-64.517c-5.947 0-10.861 4.848-10.861 10.861v44.412h-32V10.861C119.711 4.913 114.863 0 108.85 0H51.509c-5.947 0-10.861 4.848-10.861 10.861v124.121c0 5.947 4.848 10.861 10.861 10.861h36.848L65.085 378.376c-.517 5.947 4.331 12.477 10.861 11.895h238.481c7.564 0 11.895-7.046 10.279-13.576l-23.273-230.853h37.366c5.947 0 10.861-4.848 10.861-10.861V10.861C349.594 4.848 344.745 0 338.798 0zM230.386 368.549h-70.465v-75.895c0-19.523 15.709-35.232 35.232-35.232s35.232 15.709 35.232 35.232v75.895zm97.551-244.428H289.99c-5.947-.517-10.861 4.331-10.861 11.895l23.273 232.533h-50.424v-75.895c0-31.418-25.471-56.889-56.889-56.889s-56.889 25.471-56.889 56.89v75.895H87.776l14.61-147.976h17.325c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.848-10.861-10.861-10.861h-15.063l2.198-21.657h34.651c5.947 0 10.861-4.848 10.861-10.861 0-5.947-4.848-10.861-10.861-10.861H108.98l2.198-19.523c0-7.046-4.331-11.895-10.861-11.895H62.37v-102.4h36.331v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861v-44.41h42.796v44.412c0 5.947 4.848 10.861 10.861 10.861h53.657c5.947 0 10.861-4.848 10.861-10.861V21.657h35.749v102.465h-.067z" fill="#194f82"/></svg>
      <span class="shadow"></span>
    </div>
    <svg class="cancel-icon" @click="showSearchBar = false" v-show="showSearchBar" width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.971 47.971"><path d="M28.228 23.986L47.092 5.122a2.998 2.998 0 000-4.242 2.998 2.998 0 00-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 00-4.242 0 2.998 2.998 0 000 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 104.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 000-4.242L28.228 23.986z"/></svg>
    <input :disabled="!showSearchBar" v-model="searchInput" @keyup.esc="showSearchBar = false" class="search-bar" :show="showSearchBar">
    <div class="bg"></div>
  </div>
</template>

<script>
import 'firebase/auth';
import { firebase } from './firebase-connection.js';
import * as Api from './api.js';

export default {
  name: 'app',
  data: function() {
    return {
      user: null,
      userFavBooks: [],
      searchInput: '',
      showSearchBar: false,
    }
  },
  methods: {
    signOut: function() {
      firebase.auth().signOut();
      this.user = null;
      this.$router.push('/');
    }
  },
  watch: {
    user: async function(user, oldUser) {
      if (user && !oldUser) {
        this.userFavBooks = await Api.getFavsBooks({ user });
      }
    },
    showSearchBar: function(showSearchBar) {
      if (showSearchBar) {
        const searchBarNode = document.querySelector('.search-bar');
        requestAnimationFrame(_ => {
          searchBarNode.select();
          searchBarNode.focus();
        });
      } else {
        this.searchInput = '';
      }
    }
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      var loader = document.getElementById('loader');
      if (loader) {
        requestAnimationFrame(_ => {
          loader.remove();
          const el = document.querySelector('[unresolved]');
          if (el) {
            el.removeAttribute('unresolved');
          }
        });
      }
      if (user) {
        this.user = user;
        if (this.$route.path === '/home') return;
        this.$router.push('/home');
      }
    });
  },
}
</script>

<style>

html {
  width: 100%;
  height: 100%;
}

body {
  box-sizing: border-box;
  font-family: "Roboto", wf_segoe-ui_normal,"Helvetica Neue",Helvetica,Arial,sans-serif;
  height: 100%;
  margin: 0;
  width: 100%;
  user-select: none;
}

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
  position: absolute;
  right: 0;
  top: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

.search-bar {
  background: #174f82;
  border: none;
  box-sizing: border-box;
  color: #fff;
  display: block;
  font-size: 28px;
  font-weight: bold;
  height: 48px;
  left: 0;
  opacity: 0;
  padding: 0 16px;
  padding-left: 40px;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.3s ease;
  width: 100%;
  z-index: 2;
}

.cancel-icon {
  position: absolute;
  left: 10px;
  top: 18px;
  z-index: 9999;
  pointer-events: all;
  bottom: 0;
  fill: #eceff1;
  cursor: pointer;
}

.search-bar:focus {
  outline: none;
}

[show] {
  opacity: 1;
  pointer-events: all;
}

.app {
  height: 100%;
  width: 100%;
  background: #ECEFF1;
}

.welcome-page {
  background: url(./assets/welcome-bg.png);
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

#shell[unresolved] {
  display: block;
  opacity: 0 !important;
}

#shell {
  transition: all 0.33s linear;
  display: block;
  opacity: 1;
  height: 100%;
  contain: strict;
  display: grid;
  grid-auto-rows: 1fr 48px;
  overflow: auto;
}

footer {
  align-items: center;
  background: #fff;
  display: flex;
  justify-content: space-around;
  z-index: 2;
  border-top: 1px solid hsla(0,0%,53.3%,.4);
  color: #1312128a;
  font-size: 12px;
  cursor: default;
}

.footer-item {
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-weight: 500;
  height: 100%;
}

.footer-item-title {
  max-width: 100%;
  padding: 0 4px;
  box-sizing: border-box;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.footer-icon {
  display: inline-block;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  fill: currentColor;
  stroke: none;
}

.router-link-active {
  color: #184f82;
}

.search-icon {
  padding: 8px;
  margin-right: 15px;
  pointer-events: all;
}

.search-icon:focus {
  outline-color: #039BE5;
}

.header-logo {
  -webkit-tap-highlight-color: rgba(250, 250, 250, 0);
  align-items: center;
  display: flex;
  font-size: 17px;
  flex: 1;
  color: #333;
  font-weight: 700;
  text-decoration: none;
}

.header-logo:focus {
  outline: none;
}

.user-img {
  border-radius: 50%;
  pointer-events: all;
}

@media screen and (min-width: 1200px) {
  .bg {
    background: #ffc10c;
    display: block;
    height: 121px;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  .app {
    border-radius: 3px;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.06), 0 2px 5px 0 rgba(0,0,0,.2);
    height: calc(100% - 40px);
    margin: 0 auto;
    position: relative;
    top: 20px;
    width: 1200px;
  }
}

/* loader */
#loader {
  position: absolute;
  top: calc(50vh - 30px);
  left: calc(50% - 60px);
  z-index: 99999;
}

#loader .loader {
  z-index: 100;
  animation: jump .8s ease-in infinite;
}

#loader .shadow {
  position: absolute;
  z-index: -1;
  top: 84px;
  left: 0;
  display: block;
  border-radius: 100%;
  height: 20px;
  width: 120px;
  background: #000;
  opacity: .2;
  animation: scale-shadow .8s ease-in infinite;
}

@keyframes jump {
  0% {
    transform: translateY(0) scale(1.15, .8);
  }
  20% {
    transform: translateY(-35px) scaleY(1.1);
  }
  50% {
    transform: translateY(-50px) scale(1);
  }
  80% {
    transform: translateY(-35px) scale(1);
  }
  to {
    transform: translateY(0) scale(1.15, .8);
  }
}

@keyframes scale-shadow {
  0% {
    opacity: .2;
    transform: scale(1);
  }
  50% {
    opacity: .1;
    transform: scale(.5);
  }
  to {
    opacity: .2;
    transform: scale(1);
  }
}

</style>
