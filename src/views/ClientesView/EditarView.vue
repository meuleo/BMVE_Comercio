<template>
  <TheSideBar/>
	<TheEditar/>
</template>

<script>
  // import TheSideBar from '../navBar/TheSideBar.vue'
  import TheSideBar from '../../navbar/TheSideBar.vue'
	import TheEditar from '../../components/compras/TheEditar.vue'

  export default {
    components: {
      TheSideBar,
      TheEditar,
    }
  }
</script>