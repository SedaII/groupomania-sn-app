<template>
  <div class="Post">
    <div class="Post__header">
      <span>{{ post.author.fullname }} </span>
      <span>{{ post.createdAt }}</span>
    </div>
    <br />
    <div class="Post__title">
      <span>{{ post.title }}</span>
      <br />
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        style="width: 100px; height: 100px"
      />
      <span v-if="post.description">{{ post.description }}</span>
    </div>
    <br />
    <div class="Post__footer">
      <span>{{ post.comments ? post.comments.length : 0 }} Commentaires</span>
    </div>
    <br />
    <div v-if="post.comments.length > 0" class="Post__comment-container">
      <div
        v-for="comment in post.comments"
        :key="comment.id"
        class="Post__comment"
      >
        <div class="Post__comment-header">
          <span>{{ comment.author.fullname }} </span>
          <span>{{ comment.createdAt }}</span>
        </div>
        <div class="Post__comment-content">
          {{ comment.content }}
        </div>
      </div>
    </div>
    ===============================================
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
