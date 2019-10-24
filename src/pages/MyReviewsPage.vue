<template>
   <div class="review-list">
      <div class="review" v-for="(review, index) in reviews" :key="index">
        <div class="review-header">
          <div>{{ review.title }}</div>
          <div>{{computeReviewDate(review.date)}}</div>
        </div>
        <div class="review-comment">{{ review.comment }}</div>
        
      </div>
  </div>

</template>

<script>
import { firebase } from '../firebase-connection.js';
import * as Api from '../api.js';

export default {
  name: 'app',
  props: {
    user: {
      type: Object,
    },
  },
  mounted: async function() {
    const reviews = await Api.getUserReviews({ user: this.user });
    if (reviews) {
      reviews.sort((a, b) => b.date.toMillis() - a.date.toMillis());
    }
    this.reviews = reviews;
  },
  data: function() {
    return {
      reviews: []
    }
  },
  methods: {
    computeReviewDate: function(date) {
      const formatted = date.toMillis();
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'long'}).format(formatted);
    }
  },
}

</script>

<style scoped>

.review-list {
  padding-top: 48px;
}

.review {
  margin: 10px;
  background: #56ace01f;
  border-bottom-right-radius: 8px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.24);
  border-bottom-left-radius: 8px;
}

.review-header {
  font-weight: 500;
  padding: 10px;
  background: #184f8226;
  color: #174f82;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.review-comment {
  color: #3e3e3e;
  padding: 10px;
}

.review-date {
  margin-left: auto;
}

</style>
