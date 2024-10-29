<template>
  <TheSideBar/>
	<TheAdicionar/>
</template>

<script>
  // import TheSideBar from '../navBar/TheSideBar.vue'
  import TheSideBar from '../../navbar/TheSideBar.vue'
	import TheAdicionar from '../../components/fornecedores/TheAdicionar.vue'

  export default {
    components: {
      TheSideBar,
      TheAdicionar,
    }
  }
</script>