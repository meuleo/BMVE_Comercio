<template>
  <TheSideBar/>
	<TheListar/>
</template>

<script>
  // import TheSideBar from '../navBar/TheSideBar.vue'
  import TheSideBar from '../../navbar/TheSideBar.vue'
	import TheListar from '../../components/funcionarios/TheListar.vue'

  export default {
    components: {
      TheSideBar,
      TheListar,
    }
  }
</script>