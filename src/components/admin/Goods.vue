<template>
    <div class="container">
        <h3>Goods</h3>
        <div class="content" style="width: 100%; height: 100%">
			<iframe :src="url" style="frameborder=no" frameborder="no" border="0" marginWidth=0
			 marginHeight=0 height="100%" width="100%"></iframe>
		</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: "https://www.underarmour.com/en-us/c/mens/?srule=now-trending"
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>