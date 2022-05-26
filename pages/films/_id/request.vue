<template lang="html">
  <div>
    <button @click="toDetails">Back to details info</button>
    <h1>Select the date and time of the session</h1>
    <div class="custom-calendar">
      <div class="calendar-content">
        <div
          v-for="(weekday, dayKey) in movieShows"
          :id="startDate.add(dayKey + 7, 'day').format('ddd')"
          :key="`weekday-${dayKey}`"
          :class="[
            'weekday',
            weekday.showdate === form.selectDate ? 'selected' : ''
          ]"
        >
          <div class="header">
            <p>
              {{ startDate.add(dayKey + 7, "day").format("ddd") }}
            </p>
            <p>
              {{ startDate.add(dayKey, "day").format("D") }}
            </p>
          </div>
          <div
            v-for="(daytime, daytimeKey) in weekday.daytime"
            :key="`weekday-${daytimeKey}`"
            class="time-list"
          >
            <button
              :class="[
                'time',
                weekday.showdate === form.selectDate &&
                daytime === form.selectTime ? 'selected' : ''
              ]"
              @click="selectValue(weekday.showdate, daytime)"
            >
              {{ daytime }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <h1 v-if="showPlaces.length">Select a row and place</h1>
    <div
      v-if="showPlaces.length"
      class="custom-calendar"
      :style="{ height: heightCalendar + 'px' }"
    >
      <div id="row-and-place" class="calendar-content">
        <div
          v-for="(row, key) in showPlaces"
          :key="`weekday-${key}`"
          :class="[
            'weekday row',
            row[0].row === form.row ? 'selected' : ''
          ]"
        >
          <div class="header">
            <p>Row</p>
            <p>
              {{ row[0].row }}
            </p>
          </div>
          <div
            v-for="(seat, placeKey) in row[1]"
            :key="`seat-${placeKey}`"
            class="time-list"
          >
            <button
              :class="[
                'time',
                row[0].row === form.row && seat.seat === form.seat ? 'selected' : ''
              ]"
              @click="selectRowAndSeat(row[0].row, seat.seat)"
            >
              {{ seat.seat }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="button-calendar">
      <button v-if="visibleButton & !fullHeight" @click="visibleTimes">View full</button>
      <button v-if="fullHeight" @click="hideTimes">Hide</button>
    </div>
    <div class="wrapper-btn">
      <button
        @click="bookPlace"
        :class="[
          { 'disabled': !form.seat }
        ]"
      >
        Book place
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  async asyncData({ $axios, params }) {
    let payload = {
      movie_id: params.id
    };

    let movieShows = [];
    movieShows = await $axios.get("/movieShows", { params: { ...payload } });
    movieShows = Object.values(movieShows.data.data)[0].map((time) => {
      return {
        showdate: time.showdate,
        daytime: time.daytime.split(";")
      };
    });
    return {
      movieShows: movieShows,
      movie_id: payload.movie_id
    };
  },
  data() {
    return {
      form: {
        selectDate: "",
        selectTime: "",
        row: "",
        seat: ""
      },
      movie_id: null,
      movieShows: null,
      showPlaces: [],
      startDate: this.$dayjs("2021-06-27"),
      fullHeight: null,
      visibleButton: false
    };
  },
  watch: {
    "form.selectTime": {
      // deep: true,
      handler() {
        this.getShowPlaces()
      },
    },
  },
  computed: {
    heightCalendar() {
      return this.fullHeight ? this.fullHeight : 415
    },
  },
  updated() {
    let elementId = document.getElementById("row-and-place");

    if (elementId) {
      let heightTimesCalendar = document.getElementById("row-and-place").clientHeight;
      if (heightTimesCalendar > 415) {
        this.visibleButton = true
      }
    }
  },
  methods: {
    ...mapMutations({
      SET_INFO_REQUEST: "filmsSearch/SET_INFO_REQUEST"
    }),
    toDetails() {
      this.$router.push(`/films/${this.movie_id}`)
    },
    selectValue(date, time) {
      if (this.form.selectDate == date && this.form.selectTime == time) {
        this.form.selectDate = "";
        this.form.selectTime = "";
      } else {
        this.form.selectDate = date;
        this.form.selectTime = time;
      }
    },
    selectRowAndSeat(row, seat) {
      this.form.row = row;
      this.form.seat = seat;
    },
    async getShowPlaces() {
      let payload = {
        movie_id: this.movie_id,
        daytime: this.form.selectTime,
        showdate: this.form.selectDate
      };
      try {
        let res = await this.$axios.get("/showPlaces", {
          params: { ...payload },
        });
        this.showPlaces = res.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    async bookPlace() {
      let payload = {
        movie_id: this.movie_id,
        daytime: this.form.selectTime,
        showdate: this.form.selectDate,
        row: this.form.row,
        seat: this.form.seat
      };
      try {
        let res = await this.$axios.post("/bookPlace", payload);
        let info = {
          row: res.data.data.row,
          seat: res.data.data.seat,
          showdate: res.data.data.showdate,
          daytime: res.data.data.daytime,
          ticketkey: res.data.data.ticketkey
        }
        this.SET_INFO_REQUEST(info);
        this.$router.push(`/films/${this.movie_id}/success`);
      } catch (e) {
        console.log(e);
      }
    },
    visibleTimes() {
      this.fullHeight = document.getElementById("row-and-place").clientHeight;
    },
    hideTimes() {
      this.fullHeight = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-calendar {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  margin: 0 20px 50px 20px;
  height: fit-content;
  overflow-x: auto;
  &::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: #1f2324;
  }

  &::-webkit-scrollbar {
    height: 8px;
    background-color: #1f2324;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #0b1015;
  }
  
  #row-and-place {
    min-width: 750px;
  }
  
  .calendar-content {
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: fit-content;
  }

  .weekday {
    border-radius: 25px 25px 0 0;
    height: fit-content;
    margin-right: 19px;
    max-width: 115px;
    width: 100%;
    height: fit-content;
    @media (max-width: 768px) {
      margin-right: 15px;
    }
    @media (max-width: 500px) {
      margin-right: 12px;
    }

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(#e35721, 0.8);
      padding: 10px 0 10px 0;
      margin-bottom: 20px;
      border-radius: 25px;
      color: #fff;
      p {
        margin: 0;
      }

      @media (max-width: 768px) {
        border-radius: 15px;
      }
      @media (max-width: 500px) {
        border-radius: 13px;
      }
    }

    .time-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 12px;
      .time {
        background-color: transparent;
        color: #0c1425;
        border: none;
        padding: 6px 0 6px 0;
        margin: 0;
        width: 100%;
        border-radius: 0;
        &.selected,
        &:hover {
          background-color: rgba(#e35721, 0.8);
          font-weight: 400;
        }
      }
    }

    &.selected,
    &:hover {
      background-color: rgba(#e35721, 0.1);

      .header {
        background: #e35721;

        p {
          color: #fbfbfb !important;
        }
      }
    }

    &:last-child {
      margin-right: 0 !important;
    }

    &.row {
      margin-right: 10px;
      .header {
        border-radius: 15px;
      }
    }
  }
}

h1 {
  text-align: center;
  margin: 0 10px 30px 10px;
}

.wrapper-btn {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  button {
    margin-right: 20px;
  }
}

button {
  margin: 30px 0 30px 20px;
  &.disabled {
    pointer-events: none;
    background-color: rgba(#e35721, 0.8);
  }
}

.button-calendar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 0 0 0 30px;
  }
}

</style>
