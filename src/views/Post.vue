<template>
  <div>
    <h2>Post</h2>
    <div v-if="post">
      <PostCard
        :post="post"
        @deleteComment="deleteComment"
        @deletePost="deletePost"
      />
      <form class="CommentForm">
        <div class="Form__group">
          <label for="comment">Votre commentaire</label>
          <input id="comment" type="text" v-model="comment" />
        </div>

        <button
          type="button"
          @click="createComment"
          :disabled="!comment.length > 0"
        >
          Commenter
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { getPostById, deletePost } from "../services/post";
import { createComment, deleteComment } from "../services/comment";
import PostCard from "../components/PostCard.vue";

export default {
  data() {
    return {
      post: null,
      comment: "",
    };
  },
  methods: {
    createComment() {
      createComment({
        post_id: this.$route.params.id,
        content: this.comment,
      })
        .then(({ data }) => {
          this.post.comments.unshift(data.comment);
          this.comment = "";
        })
        .catch((error) => console.log(error));
    },
    deleteComment({ commentId }) {
      if (
        window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")
      ) {
        deleteComment(commentId)
          .then(() => {
            this.post.comments = this.post.comments.filter(
              (comment) => comment.id !== commentId
            );
          })
          .catch((error) => console.log(error));
      }
    },
    deletePost() {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
        deletePost(this.post.id)
          .then(() => this.$router.replace({ name: "home" }))
          .catch((error) => console.log(error));
      }
    },
  },
  created() {
    getPostById(this.$route.params.id)
      .then(({ data }) => (this.post = data.post))
      .catch((error) => console.log(error));
  },
  components: {
    PostCard,
  },
};
</script>
