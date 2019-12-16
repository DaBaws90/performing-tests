<template>
  <div>
    <h4>Componente de prueba</h4>
    <p v-if="$store.getters.isSuperAdmin">Texto visible solamente para super admins</p>
    <span class="counter">{{counter}}</span>
    <button class="add" @click="counter++">Increment</button>
    <button class="subtract" @click="counter--">Decrement</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    counter: 0
  })
}
</script>

<style>

</style>