<template>
  <div>
    <h1>Accueil</h1>
    <div class="container">
      <form class="PostForm">
        <div class="Form__group">
          <label class="PostForm__title" for="title">Titre</label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div class="Form__group row">
          <button
            class="PostForm__btn Button Button--primary"
            type="button"
            @click="postType = 'description'"
          >
            Description
          </button>
          <button
            class="PostForm__btn Button Button--primary"
            type="button"
            @click="postType = 'image'"
          >
            Image & GIF
          </button>
          <button
            class="PostForm__btn Button Button--primary"
            type="button"
            @click="postType = 'url'"
          >
            Url
          </button>
        </div>
        <div v-if="postType === 'description'" class="Form__group">
          <label for="description">Description</label>
          <input id="description" type="text" v-model="description" />
        </div>
        <div v-if="postType === 'url'" class="Form__group">
          <label for="url">url</label>
          <input id="url" type="text" v-model="imageUrl" />
        </div>
        <div v-if="postType === 'image'" class="Form__group">
          <label for="url">image & GIF</label>
          <input
            id="url"
            type="file"
            ref="imageFile"
            accept="image/*"
            @change="isImageSelected = true"
          />
        </div>
        <button
          type="button"
          class="Button"
          :class="isPostValid ? 'Button--primary' : 'Button--primary-disabled'"
          @click="createPost"
          :disabled="!isPostValid"
        >
          Poster
        </button>
      </form>
      <br />
      <br />
      <br />
      <div v-if="posts.length > 0">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @deleteComment="deleteComment"
          @deletePost="deletePost"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAllPosts, createPost, deletePost } from "../services/post";
import { deleteComment } from "../services/comment";
import PostCard from "../components/PostCard.vue";

export default {
  data() {
    return {
      posts: [],
      postType: "",
      title: "",
      description: "",
      imageUrl: "",
      isImageSelected: false,
    };
  },
  computed: {
    isPostValid() {
      switch (this.postType) {
        case "description":
          return this.title;
        case "image":
          return this.title && this.isImageSelected;
        case "url":
          return this.title && this.imageUrl;
        default:
          return false;
      }
    },
  },
  methods: {
    createPost() {
      const formData = new FormData();
      console.log(this.$refs);
      const imageFile = this.$refs.imageFile
        ? this.$refs.imageFile.files[0]
        : null;
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (this.title) {
        formData.append("title", this.title);
      }
      if (this.description) {
        formData.append("description", this.description);
      }
      if (this.imageUrl) {
        formData.append("image", this.imageUrl);
      }

      createPost(formData)
        .then(({ data }) => {
          this.title = this.description = this.imageUrl = this.postType = "";
          this.isImageSelected = false;
          this.posts.unshift(data.post);
        })
        .catch((error) => console.log(error));
    },
    deletePost(id) {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
        deletePost(id)
          .then(
            () => (this.posts = this.posts.filter((post) => post.id !== id))
          )
          .catch((error) => console.log(error));
      }
    },
    deleteComment({ postId, commentId }) {
      if (
        window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")
      ) {
        deleteComment(commentId)
          .then(() => {
            this.posts.map((post) => {
              if (post.id === postId) {
                post.commentCount--;
                post.comments = post.comments.filter(
                  (comment) => comment.id !== commentId
                );
              }

              return post;
            });
          })
          .catch((error) => console.log(error));
      }
    },
  },
  created() {
    getAllPosts()
      .then(({ data }) => {
        this.posts = data.posts.map((post) => {
          post.comments = post.comments.slice(0, 2);
          return post;
        });
      })
      .catch((error) => console.log(error));
  },
  components: {
    PostCard,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.PostForm {
  width: 500px;
  background-color: white;
  margin: 1em;
  padding: 1em;
  border-radius: 20px;

  &__title {
    font-size: 1.25em;
    font-weight: bold;
  }

  &__btn {
    margin-right: 1em;
  }
}

.row {
  flex-direction: row;
  align-items: stretch;
}
</style>
