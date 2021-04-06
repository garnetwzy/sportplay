<template>
    <div>
        <el-calendar>
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template
            slot="dateCell"
            slot-scope="{date, data}">
            <p :class="data.isSelected ? 'is-selected' : ''" @click="toggleAddDialogVisible">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
            {{date}}
            </p>
        </template>
        </el-calendar>

        <el-dialog title="添加运动" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="运动名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="运动时长" prop="length">
                    <el-input v-model="addForm.length"></el-input>
                </el-form-item>
                <el-form-item label="卡路里" prop="calories">
                    <el-input v-model="addForm.calories"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addSport">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
      return {
        value: new Date(),
        addForm: {
            name: "",
            length: "",
            calories: "",
        },
        addDialogVisible: false,
        addFormRules: {
                name: [
                    { required: true, message: '请输入运动名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                length: [
                    { required: true, message: '请输入运动时长', trigger: 'blur' },
                    { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
                ],
                calories: [
                    { required: true, message: '请输入消耗卡路里', trigger: 'blur' },
                    { min: 1, max: 5, message: '请根据模版数据计算消耗卡路里', trigger: 'blur' }
                ],
            },
      }
    },
    methods: {
        log() {
            console.log("clicked!!!");
        },
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        addSport() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return;
                const { data:res } = await this.$http.post("addSport", this.addForm);
                if (res != "success") {
                    return this.$message.error("操作失败！！！");
                }
                this.$message.success("操作成功！！！")
                this.addDialogVisible = false;
                this.getSportList();
            });
        },
        toggleAddDialogVisible() {
            this.addDialogVisible = !this.addDialogVisible;
        },
    }
}
</script>
<style lang="less" scoped>
.is-selected {
    color: #1989FA;
  }
</style>