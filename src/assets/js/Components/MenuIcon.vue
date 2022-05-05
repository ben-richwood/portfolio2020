<template lang="html">
  <svg v-if="menu === 'about'" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <title>About</title>
      <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
  </svg>
  <svg v-else-if="menu === 'privacy'" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <title>Privacy</title>
      <path fill="currentColor" d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
  </svg>
  <svg v-else-if="menu === 'stats'" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <title>Stats</title>
      <path fill="currentColor" d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" />
  </svg>
  <svg v-else-if="menu === 'controls'" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <title>Controls</title>
      <path fill="currentColor" d="M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z" />
  </svg>
  <svg v-else-if="menu === 'settings'" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <title>Settings</title>
      <path fill="currentColor" d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z" />
  </svg>
  <svg v-else-if="menu === 'credit'" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <title>Credits</title>
      <path fill="currentColor" d="M17.63,5.84C17.27,5.33 16.67,5 16,5H5A2,2 0 0,0 3,7V17A2,2 0 0,0 5,19H16C16.67,19 17.27,18.66 17.63,18.15L22,12L17.63,5.84Z" />
  </svg>
  <svg v-else-if="menu === 'graphics'" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px" viewBox="0 0 24 24">
    <title>Graphics</title>
      <path fill="currentColor" d="M18,7V4A2,2 0 0,0 16,2H8A2,2 0 0,0 6,4V7H5V13L8,19V22H16V19L19,13V7H18M8,4H16V7H14V5H13V7H11V5H10V7H8V4Z" />
  </svg>
</template>

<script>
  export default {
    props: {
      menu: {type: String, required: true}
    }
  }
</script>

<style lang="scss" scoped>
  svg{
    margin: auto 0 auto 8px;
  }
</style>
