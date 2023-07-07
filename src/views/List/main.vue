<template >
    <div class="container">
        <div class="left">
            <List />
        </div>
        <div class="right">
            <Container />
        </div>
    </div>
</template>
<script setup>
import List from './edm-list-nav/main.vue'
import Container from './edm-container/main.vue'
</script>
<style lang='less' scoped>
.container {
    display: flex;
    width: 1200px;
    margin: 0 auto;

    .left {
        width: 15%;
        margin-right: 50px;
    }

    .right {
        width: 85%;
        min-height: 200px;
    }
}
</style>