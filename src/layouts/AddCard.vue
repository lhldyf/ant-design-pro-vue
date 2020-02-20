<template>
  <div class="card">
    <!--    <a-card title="管理" >-->
    <!--      <a-button class="new-btn" type="dashed">-->
    <!--        <a-icon type="plus"/>-->
    <!--        新增-->
    <!--      </a-button>-->
    <!--      <a-button class="new-btn" type="dashed">-->
    <!--        <a-icon type="folder-open"/>-->
    <!--        导入-->
    <!--      </a-button>-->
    <!--    </a-card>-->
    <div class="content">
      <div class="left">
        <img class="img" src="~@/assets/icons/new.png">
        <h3 style="margin-top:20px;font-weight: 800;font-size: 14px;">新增</h3>
        <h5 class="desc">新建工作区</h5>
      </div>

      <div class="center">
        <img src="~@/assets/icons/shu.png">
      </div>

      <div class="right">
        <img class="img" src="~@/assets/icons/Import.png">
        <h3 style="margin-top:20px;font-weight: 800;font-size: 14px;">导入</h3>
        <h5 class="desc">可将工作区完整导入</h5>
      </div>

    </div>
    <br />
  </div>
</template>

<script>

export default {
  name: 'AddCard',
  data () {
    return {
      collapsed: false
    }
  },
  mounted () {

  },
  beforeDestroy () {

  }
}
</script>

<style lang="less" scoped>
  .card {
    display: flex;
    width: 53%;
  }

  .content {
    display: flex;
    background-color: white;
    height: 200px;
    width: 80%;
    align-items: center;
    position: relative;
  }

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .desc {
    color: grey;
    font-size: 12px;
    margin-top: 5px;
  }

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 25px;
    height: 30px;
  }

  .center {
    margin-right: 30px;
  }
</style>
