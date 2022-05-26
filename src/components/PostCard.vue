<template>
  <div class="Post" @click="openPost()">
    <div class="Post__header">
      <span>{{ post.author.fullname }} </span>
      <span>{{ dateHumanizer(post.createdAt) }}</span>
    </div>
    <br />
    <div class="Post__content">
      <p class="Post__title">{{ post.title }}</p>
      <div class="Post__image-container">
        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="Post__image"
        />
      </div>
      <p v-if="post.description" class="Post__description">
        {{ post.description }}
      </p>
    </div>
    <div>
      <button
        v-if="userId === post.author.id || isAdmin"
        type="button"
        class="Post__btn Button Button--secondary"
        @click.stop="$emit('deletePost', post.id)"
      >
        Supprimer
      </button>
    </div>
    <br />
    <div class="Post__footer">
      <span
        >{{ post.commentCount }}
        {{ post.commentCount > 0 ? "Commentaires" : "Commentaire" }}</span
      >
      <slot></slot>
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
            class="Button Button--secondary"
            @click.stop="
              $emit('deleteComment', { postId: post.id, commentId: comment.id })
            "
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
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

<style lang="scss" scoped>
@import "../assets/variables";

.Post {
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 1em;
  padding: 1em;
  background-color: white;
  color: $color-primary;
  border-radius: 20px;
  text-align: left;
  cursor: pointer;

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__title {
    font-size: 1.125em;
    font-weight: bold;
  }

  &__description {
    margin: 0 0 1em 0;
  }

  &__image-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__image {
    width: 100%;
    height: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-bottom: 1em;
  }

  &__btn {
    margin-bottom: 1em;
  }

  &__footer {
    background-color: $color-light-grey;
    padding: 1em;
  }

  &__comment {
    margin-top: 1em;
    padding: 1em;
    background-color: white;
  }

  &__comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }

  &__comment-content {
    margin-bottom: 1em;
  }
}
</style>
