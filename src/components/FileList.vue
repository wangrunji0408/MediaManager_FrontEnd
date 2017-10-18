<template>
  <div>
    <b-table striped hover :items="files" :fields="fields"></b-table>
    <!--<FileItem v-for="files"></FileItem>-->
  </div>
</template>

<script>
//  import FileItem from './FileItem.vue';
  const fields = [
    {
      key: 'name',
      sortable: true
    },
    {
      key: 'size',
      sortable: true
    },
    {
      key: 'modifyDate',
      sortable: true
    },
  ];
  const files = [
    { name: '1.txt', size: 10, modifyDate: '2015-12-13' },
    { name: '2.txt', size: 10, modifyDate: '2015-12-13' },
    { name: '3.txt', size: 10, modifyDate: '2015-12-13' },
  ];

  export default {
    name: 'FileList',
    data() {
      return {
        files: files
      }
    },
    components: {
//      FileItem
    }
  }
</script>
