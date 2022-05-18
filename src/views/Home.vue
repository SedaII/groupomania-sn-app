<template>
  <div>
    <h1>Home</h1>
    <div class="container" v-if="posts.length > 0">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { getAllPosts } from "../services/post";
import PostCard from "../components/PostCard.vue";

export default {
  data() {
    return {
      posts: [],
    };
  },
  created() {
    getAllPosts()
      .then(({ data }) => {
        this.posts = data.posts;
        console.log(this.post);
      })
      .catch((error) => console.log(error));
  },
  components: {
    PostCard,
  },
};
</script>
