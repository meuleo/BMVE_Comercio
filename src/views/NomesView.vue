<template>
	<TheNavBar2/>
	<TheNomes/>
</template>

<script>
	import TheNavBar2 from '../navbar/TheNavBar2.vue'
	import TheNomes from '../components/TheNomes.vue'

  export default {
    components: {
      TheNomes,
      TheNavBar2,
    }
  }
</script>