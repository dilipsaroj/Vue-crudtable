import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const tableStore = defineStore('tables', () => {

  const dataSource = ref([
    {
      name: 'Mike',
      age: 32,
      address: '11 Downing Street',
      id: 1
    },
    {
      name: 'John',
      age: 42,
      address: '10 Downing Street',
      id: 2
    },
  ])

  const columns = ref([
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action'
    }

  ]);


  const handleOk = (...credentials: any[]) => {
    const [name, age, address, id, optType] = credentials;
    if (optType === 'add') {
      if (name && age && address) {
        dataSource.value.push({
          name: name,
          age: age,
          address: address,
          id: id
        })
      }
      else {
        return false
      }
    }
    else {
      let objIndex = dataSource.value.findIndex((item) => item.id === id)
      if (objIndex >= 0) {
        dataSource.value[objIndex].name = name
        dataSource.value[objIndex].age = age
        dataSource.value[objIndex].address = address
      }
      else {
        return false
      }
    }
  }

  const deleteHandler = (indexData: number) => {
      if (confirm("Are you sure want to delete?") == true) {
        dataSource.value.splice(indexData,1);
      }
    // if (confirm("Are you sure want to delete?") == true) {
    //   let delData = dataSource.value.filter((item, index) => index !== indexData);
    //   dataSource.value = delData
    // }
  };

  return { dataSource, columns, handleOk, deleteHandler }
})
