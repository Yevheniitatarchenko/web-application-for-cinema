<template>
  <div class="wrapper">
    <div class="header-cinema">
      <nuxt-link to="/" exact>Movies</nuxt-link>
      <div class="header-cinema__flag" />
    </div>
    <div class="content-cinema">
      <Nuxt />
    </div>
  </div>
</template>
<style lang="scss">
body {
  margin: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e6eef6;
  min-height: 100vh;
  color: #0c1425;
  font-family: 'Source Sans Pro', sans-serif;
}

.header-cinema {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #0c1425;
  height: 60px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 30px;
  text-transform: uppercase;

  &__flag {
    position: absolute;
    right: 20px;
    height: 30px;
    width: 45px;
    background-size: cover !important;
    background: url("../assets/images/icons/Flag-of-Ukraine.png") no-repeat;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
}

.content-cinema {
  max-width: 1350px;
  width: 100%;
}
label {
  margin-bottom: 10px;
}

input {
  height: 45px;
  padding: 0 10px 0 14px;
  border-radius: 5px;
  border: none;
  outline: none;
  color: #0c1425;
  background-color: transparent;
  border: 1.5px solid #e35721;

  &::placeholder {
    color: #0c1425;
  }
}

h1 {
  color: #0c1425;
}

h4 {
  text-align: center;
}

button {
  background-color: #e35721;
  border: none;
  color: #fff;
  border-radius: 30px;
  padding: 10px 25px;
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: rgba(#e35721, 0.8);
  }
}
</style>
