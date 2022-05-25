<template>
  <div
    class="Post"
    style="background-color: grey; width: 500px; margin: 1em; cursor: pointer"
    @click="openPost()"
  >
    <div class="Post__header">
      <span>{{ post.author.fullname }} </span>
      <span>{{ dateHumanizer(post.createdAt) }}</span>
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
    <div>
      <button
        v-if="userId === post.author.id || isAdmin"
        type="button"
        @click.stop="$emit('deletePost', post.id)"
      >
        Supprimer
      </button>
    </div>
    <br />
    <div class="Post__footer">
      <span>{{ post.commentCount }} Commentaires</span>
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
          <span>{{ dateHumanizer(comment.createdAt) }}</span>
        </div>
        <div class="Post__comment-content">
          {{ comment.content }}
        </div>
        <button
          v-if="userId === comment.author.id || isAdmin"
          type="button"
          @click.stop="
            $emit('deleteComment', { postId: post.id, commentId: comment.id })
          "
        >
          Supprimer
        </button>
      </div>
    </div>
    ===============================================
  </div>
</template>

<script>
import dateHumanizer from "../utils/dateHumanizer";

export default {
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    userId() {
      return localStorage.getItem("userId");
    },
    isAdmin() {
      return JSON.parse(localStorage.getItem("isAdmin"));
    },
  },
  methods: {
    dateHumanizer,
    openPost() {
      if (this.$route.name === "home") {
        this.$router.push({ name: "post", params: { id: this.post.id } });
      }
    },
  },
};
</script>
