<template>
  <div>
    <div
        @click="$emit('open-book-overlay', book)"
        @keyup.enter="$emit('open-book-overlay', book)"
        class="book"
        v-for="(book, index) in showingBooks"
        :key="index"
        tabindex="0">
      <div class="book-info">
        <div class="book-header-info">
          <div class="book-position">{{ computeBookPos(book.slug) }}. </div>
          <div class="book-title">{{ book.title }}</div>
          <div class="book-rating"> {{ book.rating }}/10 </div>
        </div>
        <div class="book-synopsis">{{ book.synopsis }}</div>
        <div class="book-footer">
          <div class="book-author">{{ book.author }}</div>
          <button :key="book.slug" :liked="computeUserLikeBook(book, userLikedBooks)" @click="onClickUpvote(book, $event)" class="book-upvote-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" class="style-scope yt-icon"></path></g></svg>
            <div class="book-upvotes-number">{{ book.upvotes }}</div>
          </button>
        </div>
      </div>
      <div class="book-cover-container">
        <img :src="book.cover" class="book-cover"/>
      </div>
    </div>
    <div v-show="!this.searchInput.length > 0" class="navigation">
      <div class="nav-btn prev" v-show="page > 0" @click="page -= 1">Previous page</div>
      <div class="nav-btn forward" v-show="books.length > booksPerPage * (page + 1)" @click="page += 1">Next page</div>
    </div>
    <div class="spinner" v-if="loading"></div>
  </div>
</template>

<script>

  import * as Api from '../api.js';

  export default {
    name: 'BookList',
    data: function() {
      return {
        books: [],
        filteredBooks: [],
        booksPerPage: 5,
        page: 0,
        userLikedBooks: [],
        loading: true,
      }
    },
    props: {
      user: { type: Object },
      userFavBooks: { type: Array },
      searchInput: { type: String },
    },
    computed: {
      paginatedBooks: function() {
        if (this.books) {
          const start = (this.page * this.booksPerPage);
          this.page > 0 ? start - 1 : '';
          const end = (this.page * this.booksPerPage + this.booksPerPage);
          return this.books.slice(start, end);
        }
      },
      showingBooks: function() {
        return this.searchInput.length > 0 ? this.filteredBooks : this.paginatedBooks;
      }
    },
    watch: {
      searchInput: function(searchInput) {
        this.$nextTick(_ => {
          const booksMatched = new Set();
          for (let book of this.books) {
            if (book.title.toLowerCase().match(searchInput.toLowerCase())) {
              booksMatched.add(book);
            }
            if (book.synopsis.toLowerCase().match(searchInput.toLowerCase())) {
              booksMatched.add(book);
            }
          }
         this.filteredBooks = [...booksMatched];
        });
      }
    },
    mounted: function () {
      if (this.books.length > 0) return;
      this.$nextTick(async function() {
        const req = await fetch('http://localhost:3000/books');
        const resp = await req.json();
        this.books = resp.books;
        this.loading = false;
      });
    },
    methods: {
      onClickUpvote: async function(book, evt) {
        evt.stopPropagation();
        const target = evt.currentTarget;
        const matched = this.userFavBooks.find(b => b.slug === book.slug);
        this.$emit('add-to-fav', book);
        if (Boolean(matched)) {
          requestAnimationFrame(_ => target.removeAttribute('liked', "true"));
        } else {
          requestAnimationFrame(_ => target.setAttribute('liked', "true"));
        }
      },
      computeUserLikeBook: function(book) {
       return Boolean(this.userFavBooks.find(b => b.slug === book.slug));
      },
      computeBookPos(slug) {
        return this.books.findIndex(b => b.slug === slug) + 1;
      },
    }
  }
</script>

<style scoped>

  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
  }

  .nav-btn {
    color: #174f82;
    border: 1px solid #174f82;
    padding: 4px 12px;
    border-radius: 3px;
    cursor: pointer;
  }

  .forward {
    margin-left: auto;
  }

  .book-list {
    box-sizing: border-box;
    flex: 1 1 0%;
    min-height: 100%;
    overflow: auto;
    padding: 5px 10px;
  }

  .book {
    align-items: center;
    background: rgb(255, 255, 255);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 1px 0px;
    box-sizing: border-box;
    padding: 10px;
    display: grid;
    grid-template-columns: 70% 30%;
    cursor: pointer;
    margin: 0 10px 6px 10px;
  }

  .book:focus {
    outline-color: #039BE5;
  }

  .book-cover {
    width: 20vw;
    max-height: 170px;
    max-width: 113px;
    border-radius: 8px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.16);
  }

  .book-author {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .book-info {
    padding-left: 10px;
  }

  .book-title {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 90%;
    white-space: nowrap;
    padding: 0 5px;
    flex: 1;
  }

  .separator {
    margin: 0 5px;
  }

  .book-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .book-synopsis {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin: 20px 0;
    font-size: 14px;
  }

  .book-title, .book-position {
    color: #184f82;
    font-weight: 500;
    font-size: 20px;
  }

  .book-header-info {
    display: flex;
    align-items: center;
  }

  .book-upvote-btn {
    color: #636363;
    fill: #909090;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    width: 70px;
    height: 24px;
    padding: 0;
    justify-content: center;
  }

  .book-upvote-btn:focus {
    outline-color: #039BE5;
  }

  .book-upvotes-number {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 500;
    margin-left: 5px;
    font-size: 14px;
  }

  .book-cover-container {
    display: flex;
    justify-content: center;
  }

  [liked] {
    transition: all .1s ease;
    background: #BF360C;
    fill: #ffffff;
    color: #ffffff;
    border-radius: 4px;
  }

  .spinner {
    width: 40px;
    height: 40px;
    margin: 100px auto;
    background-color: #333;

    border-radius: 100%;  
    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
    animation: sk-scaleout 1.0s infinite ease-in-out;
  }

  @-webkit-keyframes sk-scaleout {
    0% { -webkit-transform: scale(0) }
    100% {
      -webkit-transform: scale(1.0);
      opacity: 0;
    }
  }

  @keyframes sk-scaleout {
    0% { 
      -webkit-transform: scale(0);
      transform: scale(0);
    } 100% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
      opacity: 0;
    }
  }
 
</style>
