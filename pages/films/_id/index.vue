<template lang="html">
  <div class="container">
    <div>
      <button @click="backToFilms">Back to films</button>
    </div>
    <div class="header">
      <h1>{{ film.name }}</h1>
      <button @click="toRequest">Book a ticket</button>
    </div>
    <div class="main-info">
      <img :src="film.image" alt="image" />
      <div class="description" v-html="film.description" />
    </div>
    <div class="list-info" v-html="film.additional" />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  async asyncData({ $axios, params }) {
    let payload = {
      movie_id: params.id
    };
    let filmInfo = await $axios.get("/movies", { params: { ...payload } })
    
    return {
      film: filmInfo.data.data[0],
      movie_id: payload.movie_id
    };
  },
  data() {
    return {
      film: null,
      movie_id: null
    };
  },
  computed: {
    ...mapState({
      querySearchString: (state) => state.filmsSearch.querySearchString
    })
  },
  methods: {
    toRequest() {
      this.$router.push(`/films/${this.movie_id}/request`)
    },
    backToFilms() {
      this.$router.push({ path: `/${this.querySearchString}` })
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #0c1425;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0 20px 0;
}

.main-info {
  display: flex;
  justify-content: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
    .description {
      margin: 20px 0 0 0;
    }
  }
}

.description {
  margin-left: 20px;
}

img {
  width: 230px;
  height: 340px;
}
</style>
