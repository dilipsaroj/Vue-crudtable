<script setup lang="ts">
import { reactive, ref, isProxy, toRaw } from 'vue';
import { tableStore } from './stores/tableData'
import { storeToRefs } from 'pinia';
import AddEditModal from './components/AddEditModal.vue'

const open = ref(false);
const modalTitle = ref('Add Table')
const optType = ref('')

interface Person {
  name: string;
  age: number;
  address: string;
  id: number
}

const dataSource1 = ref<Person>({
  name: '',
  address: '',
  age: 0,
  id: 0
})

// console.log(dataSource1.value.age)

const tableValue = tableStore();
const { dataSource, columns } = storeToRefs(tableValue)

const showModal = (operationType: string) => {

  open.value = true;
  if (operationType !== "add") {
    modalTitle.value = "Edit table"
  }
  else {
    optType.value = 'add'
    modalTitle.value = "Add table"
    dataSource1.value.name = ""
    dataSource1.value.age = 0
    dataSource1.value.address = ""
    dataSource1.value.id = Math.floor(Math.random() * 1000)
  }

};

const handleOk = () => {
  tableValue.handleOk(dataSource1.value.name, dataSource1.value.age, dataSource1.value.address, dataSource1.value.id, optType.value)
  open.value = false;
}

const deleteHandler = (indexData: number) => {
  tableValue.deleteHandler(indexData)
};

const editModal = (operationType: string, indexData: number) => {
  optType.value = 'edit'
  showModal(operationType)
  const rowdata = dataSource.value.filter((item, index) => index === indexData)
  let new_data = JSON.parse(JSON.stringify(rowdata[0]))
  if (operationType === "edit") {

    dataSource1.value.name = new_data.name
    dataSource1.value.age = new_data.age
    dataSource1.value.address = new_data.address
    dataSource1.value.id = new_data.id
  }
  else {
    dataSource1.value.name = ""
    dataSource1.value.age = 0
    dataSource1.value.address = ""
    dataSource1.value.id = 0
  }
};

</script>

<template>
  <main>

    <AButton @click="showModal('add')" :style="{ 'margin-bottom': '10px' }">Add</AButton>
    <AModal v-model:open="open" :title="modalTitle" @ok="handleOk">
      <AddEditModal :dataSource1="dataSource1" />
    </AModal>

    <ATable :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, index }">
        <template v-if="column.key === 'action'">
          <span>
            <AButton @click="deleteHandler(index)">Delete</AButton>
            <AButton v-bind:style="{ 'margin-left': '10px' }" @click="editModal('edit', index)">
              Edit</AButton>
          </span>
        </template>
      </template>
    </ATable>

  </main>
</template>