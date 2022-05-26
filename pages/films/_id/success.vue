<template lang="html">
  <div class="container">
    <h1>You have successfully booked a ticket for: {{ name }}</h1>
    <div class="info-request">
      <p>Date: <span>{{ info.showdate }}</span></p>
      <p>Time: <span>{{ info.daytime }}</span></p>
      <p>Row: <span>{{ info.row }}</span></p>
      <p>Row: <span>{{ info.seat }}</span></p>
      <p>Ticket key: <span>{{ info.ticketkey }}</span></p>
    </div>
  </div>
</template>
<script>
export default {
    async asyncData({ store }) {
    return { name: store.state.filmsSearch.name, info: store.state.filmsSearch.info };
  },
  data() {
    return {
      info: null,
      name: null
    };
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
  h1 {
    text-align: center;
  }

  .info-request {
    p {
      font-weight: 700;
      span {
        font-weight: normal;
      }
    }
  }
}
</style>