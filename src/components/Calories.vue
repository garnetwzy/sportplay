<template>
    <div>
        <!-- 面包屑导航 -->
        <h1>Calories</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">Main</el-breadcrumb-item>
        <el-breadcrumb-item>Sports Platform</el-breadcrumb-item>
        <el-breadcrumb-item>Calories</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="25" type="flex" justify="center" align="middle">
                <el-col :span="10">
                    <el-input placeholder="Please enter your search content" v-model="queryInfo.query" clearable @clear="getSportList">
                        <el-button slot="append" icon="el-icon-search" @click="getSportList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="toggleAddDialogVisible">Add Sport</el-button>
                </el-col>
            </el-row>
            <el-table :data="sportList" border stripe :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="Calories" prop="calories"></el-table-column>
                <el-table-column label="Hours" prop="hours"></el-table-column>
                <el-table-column label="Date" prop="date"></el-table-column>
                <el-table-column label="Operation">
                    <template slot-scope="scope">
                        <!-- 修改 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)" ></el-button>
                        <!-- 删除 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[1, 2, 5, 100]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>

        <el-dialog title="Add sport" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="Calories" prop="calories">
                    <el-input v-model="addForm.calories"></el-input>
                </el-form-item>
                <el-form-item label="Hours" prop="hours">
                    <el-input v-model="addForm.hours"></el-input>
                </el-form-item>
                <el-form-item label="Date" prop="date">
                    <el-input v-model="addForm.date"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="addSport">Submit</el-button>
            </span>
        </el-dialog>

        <el-dialog title="Edit sport info" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="Calories" prop="calories">
                    <el-input v-model="editForm.calories"></el-input>
                </el-form-item>
                <el-form-item label="Hours" prop="hours">
                    <el-input v-model="editForm.hours"></el-input>
                </el-form-item>
                <el-form-item label="Date" prop="date">
                    <el-input v-model="editForm.date"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="editSportInfo">Submit</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    created() {
        this.getSportList();
    },
    data() {
        return {
            // 查询信息实体
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 5
            },
            sportList: [],
            total: 0,
            addDialogVisible: false,
            addForm: {
                calories: "",
                hours: "",
                date: "",
            },
            editForm: {

            },
            editDialogVisible: false,
            addFormRules: {
                sportName: [
                    { required: true, message: 'Please enter sport name', trigger: 'blur' },
                    { min: 3, max: 15, message: 'Length between 3 and 15 characters', trigger: 'blur' }
                ],
                calories: [
                    { required: true, message: 'Please enter its calories per hour', trigger: 'blur' },
                    { min: 1, max: 4, message: 'Length between 1 and 4 characters', trigger: 'blur' }
                ],
                hours: [
                    { required: true, message: 'Please enter the time you spent', trigger: 'blur' },
                    { min: 1, max: 4, message: 'Length between 1 and 4 characters', trigger: 'blur' }
                ],
                date: [
                    { required: true, message: 'Enter the date', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Please enter a valid date format', trigger: 'blur' }
                ],
            },
            editFormRules: {
                hours: [
                    { required: true, message: 'Please enter the time you spent', trigger: 'blur' },
                    { min: 1, max: 4, message: 'Length between 1 and 4 characters', trigger: 'blur' }
                ],
                date: [
                    { required: true, message: 'Enter the date', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Please enter a valid date format', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        async getSportList() {
            const {data:res} = await this.$http.get("allSports", {params: this.queryInfo});
            console.log(res);
            this.sportList = res.data;
            this.total = res.numbers;
        },
        handleSizeChange(newSize) {
            this.queryInfo.pageSize = newSize;
            this.getSportList();
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pageNum = newPage;
            this.getSportList();
        },
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        addSport() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return;
                const { data:res } = await this.$http.post("addSports", this.addForm);
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
        async deleteSport(id) {
            const confirmResult = await this.$confirm('此操作将永久删除sport，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            if (confirmResult != 'confirm') {
                return this.$message.Info("已取消删除");
            }
            const { data:res } = await this.$http.delete("deleteSport?id=" + id);
            if (res != "success") {
                return this.$message.error("删除失败！");
            }
            this.$message.success("删除成功！");
            this.getSportList();
        },
        async showEditDialog(id) {
            const { data:res } = await this.$http.get("getUpdate?id=" + id);
            this.editForm = res;
            this.editDialogVisible = true;
        },
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        editSportInfo() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return;
                const { data:res} = await this.$http.put("editSports", this.editForm);
                if (res != "success") {
                    return this.$message.error("操作失败！");
                }
                this.$message.success("操作成功！");
                this.editDialogVisible = false;
                this.getSportList();
            });
        },
    }
}
</script>
<style lang="less" scoped>
.el-breadcrumb{
    margin-bottom: 15px;
    font-size: 17px;
}
</style>