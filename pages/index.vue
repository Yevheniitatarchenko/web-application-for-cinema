<template lang="html">
  <div class="films-content">
    <div class="filters">
      <div class="filter-name">
        <label>Search films to name</label>
        <input
          v-model="form.name"
          type="text"
          name="name"
          placeholder="Enter the name movie"
        />
      </div>
      <div class="filter-genres">
        <label>Search films to genres</label>
        <Multiselect
          v-model="form.genres"
          :options="movieGenres"
          :show-labels="false"
          :searchable="false"
          :placeholder="'Select genres'"
        />
      </div>
    </div>
    <div v-if="films.length" class="list-films">
      <div v-for="(item, itemKey) in films" :key="itemKey" class="film">
        <img :src="item.image" alt="image" />
        <button @click="toDetailInfo(item)" class="to-details">
          <p>{{ item.name }}</p>
        </button>
      </div>
    </div>
    <h4 v-else>Not a single movie</h4>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import debounce from "lodash.debounce";
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect,
  },
  async asyncData({ $axios, query }) {
    try {
      let payload = {
        name: query.name ? query.name : "",
        genres: query.genres ? query.genres : "",
      };

      for (let propName in payload) {
        if (payload[propName] === "") {
          delete payload[propName];
        }
      }
      let filmInfo = await $axios.get("/movies", { params: { ...payload } });
      return {
        form: {
          name: query.name ? query.name : "",
          genres: query.genres ? query.genres : "",
        },
        films: filmInfo.data.data,
      };
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      form: {
        name: "",
        genres: "",
      },
      films: [],
      movieGenres: [
        "ACTION",
        "ADVENTURES",
        "COMEDY",
        "DRAMA",
        "HORROR",
        "WESTERNS",
      ],
    };
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.searchFilm();
        this.updateQueryParameters();
      },
    },
  },
  computed: {},
  methods: {
    ...mapMutations({
      SET_QUERY_SEARCH: "filmsSearch/SET_QUERY_SEARCH",
      SET_NAME_FILM: "filmsSearch/SET_NAME_FILM",
    }),
    updateQueryParameters() {
      let payload = {
        name: this.form.name,
        genres: this.form.genres,
      };
      for (let propName in payload) {
        if (payload[propName] !== "") {
          let queryParams = new URLSearchParams(window.location.search);
          queryParams.set(propName, payload[propName]);
          history.replaceState(null, null, "?" + queryParams.toString());
        }

        if (payload[propName] === "") {
          let queryParamsUrl = new URLSearchParams(window.location.search);
          let getParametr = queryParamsUrl.get(propName);
          if (getParametr) {
            queryParamsUrl.delete(propName, getParametr);
            history.replaceState(null, null, "?" + queryParamsUrl.toString());
          }
        }
      }
    },
    searchFilm: debounce(async function () {
      let payload = {
        name: this.form.name,
        genres: this.form.genres,
      };

      for (let propName in payload) {
        if (payload[propName] === "") {
          delete payload[propName];
        }
      }
      
      try {
        let res = await this.$axios.get("/movies", { params: { ...payload } });
        this.films = res.data.data;
      } catch (error) {
        console.log(error);
      }
    }, 300),
    toDetailInfo(item) {
      this.SET_QUERY_SEARCH(window.location.search);
      this.SET_NAME_FILM(item.name);
      this.$router.push(`/films/${item.id}`);
    },
  },
};
</script>
<style lang="scss">
.films-content {
  padding: 0 20px 20px 20px;
}

.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
  .filter-name,
  .filter-genres {
    width: 46%;
    display: flex;
    flex-direction: column;
    label {
      color: #0c1425;
    }
    @media (max-width: 500px) {
      width: 100%;
      &:last-child {
        margin-top: 20px;
      }
    }
  }
}

.list-films {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.film {
  position: relative;
  width: 230px;
  height: 340px;
  margin-bottom: 20px;
  margin-right: 20px;
  img {
    height: 100%;
    width: 100%;
  }
  .to-details {
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(#0c1425, 0.7);
    color: #fff;
    cursor: pointer;
    border: none;
    border-radius: 0;
    font-size: 24px;
    fs p {
      text-align: center;
    }
  }
  &:hover {
    .to-details {
      display: flex;
    }
  }
}

.multiselect {
  min-height: 45px;
  .multiselect__select {
    width: 28px;
    padding: 4px 1px;
    right: 8px;
    &:before {
      border: none;
      background: url("../assets/images/icons/icon-arrow-down.svg") no-repeat;
      height: 23px;
      width: 23px;
      min-width: 21px;
      display: block;
      top: calc(50% - 10px);
    }
  }
  &--active {
    .multiselect__select {
      top: 9px;
    }
    .multiselect__tags {
      border-bottom: 1px solid #e35721 !important;
      border-radius: 5px;
    }
  }
  .multiselect__tags {
    min-height: 45px;
    border: none;
    padding-top: 0;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 1.5px solid #e35721;
    .multiselect__single,
    .multiselect__placeholder {
      font-size: 15px;
      color: #0c1425;
      line-height: 24px;
      margin-bottom: 0;
      padding-top: 0;
      background-color: transparent;
    }
    .multiselect__placeholder {
      padding-left: 5px;
    }
  }
  .multiselect__content-wrapper {
    font-size: 15px;
    color: #0c1425;
    border: none;
    overflow: hidden;
    width: 100%;
    .multiselect__content {
      .multiselect__element {
        .multiselect__option {
          white-space: normal !important;
        }
      }
    }
    .multiselect__option--highlight {
      background-color: #0c1425;
    }
    .multiselect__option--selected {
      background-color: #e35721;
      color: #fff;
    }
  }
}
</style>
