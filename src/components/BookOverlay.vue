<template>
  <transition name="modal">
    <div class="modal-wrapper">
      <header>
        <svg class="arrow-icon" @click="$emit('close')" fill="#184f82" width="24" height="24" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
        <div class="header-title">{{ selectedBook.title }}</div>
      </header>
      <div class="container">
        <div class="book-info">
          <img class="book-cover" :src="selectedBook.cover"/>
          <div class="book-details">
            <div class="book-title">{{ selectedBook.title }}</div>
            <div class="book-rating">Rating: {{ selectedBook.rating}}</div>
            <div class="book-synopsis">{{selectedBook.synopsis}}</div>
            <div class="book-footer">
              <div class="book-author">Author: {{selectedBook.author}}</div>
              <button @click="$emit('add-to-fav', selectedBook)" :liked="addedToFav" class="fav-btn">
                <div v-show="addedToFav">
                  <svg class="fav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.997 51.997" width="14" height="14"><path d="M51.911 16.242c-.759-8.354-6.672-14.415-14.072-14.415-4.93 0-9.444 2.653-11.984 6.905-2.517-4.307-6.846-6.906-11.697-6.906C6.759 1.826.845 7.887.087 16.241c-.06.369-.306 2.311.442 5.478 1.078 4.568 3.568 8.723 7.199 12.013l18.115 16.439 18.426-16.438c3.631-3.291 6.121-7.445 7.199-12.014.748-3.166.502-5.108.443-5.477z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFF"/></svg>
                  You like it
                </div>
                <div v-show="!addedToFav">
                  <svg class="fav-icon" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.701 471.701"><path d="M433.601 67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7 13.6-92.4 38.3l-12.9 12.9-13.1-13.1c-24.7-24.7-57.6-38.4-92.5-38.4-34.8 0-67.6 13.6-92.2 38.2-24.7 24.7-38.3 57.5-38.2 92.4 0 34.9 13.7 67.6 38.4 92.3l187.8 187.8c2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-3.9l188.2-187.5c24.7-24.7 38.3-57.5 38.3-92.4.1-34.9-13.4-67.7-38.1-92.4zm-19.2 165.7l-178.7 178-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3s10.7-53.7 30.3-73.2c19.5-19.5 45.5-30.3 73.1-30.3 27.7 0 53.8 10.8 73.4 30.4l22.6 22.6c5.3 5.3 13.8 5.3 19.1 0l22.4-22.4c19.6-19.6 45.7-30.4 73.3-30.4 27.6 0 53.6 10.8 73.2 30.3 19.6 19.6 30.3 45.6 30.3 73.3.1 27.7-10.7 53.7-30.3 73.3z"/></svg>
                  Add to favorites
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="comment-section">
          <div class="comment-section--title">Comments</div>
          <div class="comment-list">
            <div class="comment" v-for="(comment, index) in bookComments" :key="index">
              <img width="45" height="45" class="comment-user-picture" :src="comment.picture"/>
              <div class="comment-user-info">
                <div class="comment-username">{{ comment.name }}</div>
                <div class="comment-text">{{ comment.comment }}</div>
              </div>
            </div>
          </div>
        </div>
        <textarea placeholder="Add a comment..." maxlength="200" v-model="comment"></textarea>
        <div class="add-comment-btn" @click="onClickAddComment(comment)">Post comment</div>
      </div>
    </div>
  </transition>
</template>

<script>

  import * as Api from '../api.js';

  export default {
    name: 'BookOverlay',
    data: function() {
      return {
        comment: '',
        bookComments: []
      }
    },
    mounted: async function() {
      this.bookComments = await Api.getBookComments({ book: this.selectedBook });
    },
    props: {
      selectedBook: {
        type: Object,
        required: true,
      },
      user: { type: Object },
      userFavBooks: { type: Array }
    },
    methods: {
      onClickAddComment: async function(comment) {
        if (comment.length === 0) return;
        const { photoURL, displayName } = this.user.providerData[0];
        this.comment = '';
        this.bookComments.push({
          id: this.selectedBook.slug,
          picture: photoURL,
          name: displayName,
          userId: this.user.uid,
          comment
        });
        await Api.addBookComment({book: this.selectedBook, user: this.user, comment});
      }
    },
    computed: {
      addedToFav: function() {
        return Boolean(this.userFavBooks.find(b => b.slug === this.selectedBook.slug));
      }
    }
  }
</script>

<style scoped>

  header {
    pointer-events: all;
    color: #184f82;
    background: #fff;
    height: 60px;
    font-size: 20px;
  }

  .book-info {
    align-items: flex-start;
    display: flex;
  }

  textarea {
    font-size: 16px;
    background: #ECEFF1;
    border: none;
    border-radius: 6px;
    resize: none;
    padding: 10px;
    height: 100px;
  }

  textarea:focus {
    outline: none;
  }

  .add-comment-btn {
    width: 140px;
    text-align: center;
    padding: 8px 0;
    margin-top: 10px;
    background: #174f82;
    color: #fffffff2;
    border-radius: 4px;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.24);
  }

  .fav-btn {
    cursor: pointer;
    background: inherit;
    border: 1px solid #BF360C;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 16px;
    color: #BF360C;
    transition: all .1s ease;
    width: 152px;
  }

  .fav-btn:focus {
    outline: none;
  }

  .comment-section {
    padding: 15px 0px;
  }

  .comment-section--title {
    letter-spacing: 0.5px;
    font-weight: 500;
    color: #424242;
    padding-bottom: 10px;
    border-bottom: 2px solid #e5e5e5;
    margin-bottom: 10px;
  }

  .comment {
    display: flex;
    align-items: flex-start;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #f0f0f5;
  }

  .comment-list > .comment:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .comment-username {
    font-weight: 500;
  }

  .comment-text {
    color: #424242;
  }

  .comment-user-picture {
    border-radius: 50%;
  }

  .comment-user-info {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }

  [liked] {
    color: #ffffff;
    background: #BF360C;
  }

  .fav-btn > div {
    display: flex;
    align-items: center;
  }

  .arrow-icon {
    margin-right: 20px;
    cursor: pointer;
  }

  .fav-icon {
    padding-right: 5px;
    fill: #BF360C;
  }

  .header-title {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 90%;
  }

  .book-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;
    color: #000000c7;
    fill: #000000c7;
  }

  .book-details {
    padding: 0 25px;
  }

  .container {
    display: grid;
    grid-template-rows: max-content 1fr max-content max-content;
    margin: 10px 20px;
    margin-top: 80px;
    box-sizing: border-box;
  }

  @media only screen and (max-width: 700px) {
    .book-info {
      display: grid;
      grid-template-rows: max-content 1fr;
    }
    .book-cover {
      margin-bottom: 10px;
    }
    .book-details {
      padding: 0;
    }
  }

  .book-cover {
    object-fit: contain;
    width: 115px;
    border-radius: 12px;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.14);
  }

  .book-title {
    font-size: 20px;
    font-weight: bold;
  }

  .book-rating {
    font-weight: 500;
    font-size: 18px;
    margin: 15px 0;
  }

  .book-author {
    font-style: italic;
  }

  .modal-wrapper {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    transition: opacity .3s ease;
    background: #f7f7fa;
    overflow: auto;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>