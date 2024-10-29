<template>
  <TheSideBar/>
	<TheListar/>
</template>

<script>
  // import TheSideBar from '../navBar/TheSideBar.vue'
  import TheSideBar from '../../navbar/TheSideBar.vue'
	import TheListar from '../../components/clientes/TheListar.vue'

  export default {
    components: {
      TheSideBar,
      TheListar,
    }
  }
</script>