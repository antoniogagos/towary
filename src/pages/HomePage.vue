<template>
   <div class="container" v-if="user">
    <BookList
        :user-fav-books="userFavBooks"
        :user="user"
        :search-input="searchInput"
        @add-to-fav="handleFavBook"
        @open-book-overlay="openBookOverlay"></BookList>
    <BookOverlay
        id="overlay"
        v-if="showModal"
        :user="user"
        :user-fav-books="userFavBooks"
        :selected-book="selectedBook"
        @add-to-fav="handleFavBook"
        @close="showModal = false"></BookOverlay>
  </div>

</template>

<script>
import BookList from '../components/BookList.vue';
import BookOverlay from '../components/BookOverlay.vue';
import { firebase } from '../firebase-connection.js';
import * as Api from '../api.js';

export default {
  name: 'app',
  components: {
    BookList,
    BookOverlay,
  },
  props: {
    user: { type: Object },
    userFavBooks: { type: Array },
    searchInput: { type: String }
  },
  data: function() {
    return {
      showModal: false,
      selectedBook: null,
    }
  },
  methods: {
    openBookOverlay: function(book) {
      this.showModal = true;
      this.selectedBook = book;
    },
    handleFavBook: async function(book) {
      const matched = this.userFavBooks.find(b => b.slug === book.slug);
      if (Boolean(matched)) {
        await this.removeBookFromFav(book);
      } else {
        await this.addBookToFav(book);
      }
    },
    addBookToFav: async function(book) {
      this.userFavBooks.push(Object.assign(book, { added: Date.now() }));
      book.upvotes += 1;
      await Api.addBookToFav({ user: this.user, book });
    },
    removeBookFromFav: async function(book) {
      const idx = this.userFavBooks.indexOf(book);
      this.userFavBooks.splice(idx, 1);
      book.upvotes -= 1;
      await Api.removeBookFromFav({ user: this.user, book });
    }
  },
}

</script>

<style>

.logo-container {
  display: flex;
  align-items: center;
  font-size: 62px;
  font-weight: bold;
  justify-content: center;
  padding-bottom: 60px;
  background: #FAFAFA;
}

.container {
  overflow: auto;
  padding-top: 55px;
}

.header-logo {
  -webkit-tap-highlight-color: rgba(250, 250, 250, 0);
  align-items: center;
  display: flex;
  font-size: 17px;
  color: #333;
  font-weight: 700;
  text-decoration: none;
}

.user-img {
  border-radius: 50%;
  pointer-events: all;
}

</style>
