<script setup>
const props = defineProps(['dataSource1']);
</script>

<template>
      <div>
        <input class="cust-input-style" type="text" placeholder="Enter name" v-model="props.dataSource1.name" />
        <input class="cust-input-style" type="number" placeholder="Enter age" v-model="props.dataSource1.age" />
        <input class="cust-input-style" type="text" placeholder="Enter address" v-model="props.dataSource1.address" />
      </div>
</template>