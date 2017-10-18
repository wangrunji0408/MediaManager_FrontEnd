<template>
  <div>
    <Upload action="">
      <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
    <FileList>

    </FileList>
  </div>
</template>

<script>
  import FileList from './FileList.vue'
  export default {
    data(){
      return {
      };
    },
    methods: {
    },
    components: {FileList}
  }
</script>
