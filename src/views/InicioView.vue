<template>
  <TheNavBar/>
	<TheInicio/>
</template>

<script>
  // import TheNavBar from '../navBar/TheNavBar.vue'
  import TheNavBar from '../navbar/TheSideBar.vue'
	import TheInicio from '../components/TheInicio.vue'

  export default {
    components: {
      TheNavBar,
      TheInicio,
    }
  }
</script>