<template>
    <div>
        <!-- 面包屑导航 -->
        <h1>User List</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">Main</el-breadcrumb-item>
        <el-breadcrumb-item>Auth Management</el-breadcrumb-item>
        <el-breadcrumb-item>User List</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="25" type="flex" justify="center" align="middle">
                <el-col :span="10">
                    <el-input placeholder="Please input content to search for" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="toggleAddDialogVisible">Add User</el-button>
                </el-col>
            </el-row>
            <el-table :data="userList" border stripe :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="Username" prop="username"></el-table-column>
                <el-table-column label="Email" prop="email"></el-table-column>
                <el-table-column label="Password" prop="password"></el-table-column>
                <el-table-column label="Role" prop="role"></el-table-column>
                <el-table-column label="State" prop="state">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="Action">
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

        <el-dialog title="Add user" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="addUser">Confirm</el-button>
            </span>
        </el-dialog>

        <el-dialog title="Edit user info" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="editUserInfo">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    created() {
        this.getUserList();
    },
    data() {
        return {
            // 查询信息实体
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 5
            },
            userList: [],
            total: 0,
            addDialogVisible: false,
            addForm: {
                username: "",
                password: "",
                email: "",
            },
            editForm: {

            },
            editDialogVisible: false,
            addFormRules: {
                username: [
                    { required: true, message: 'Please input Username', trigger: 'blur' },
                    { min: 5, max: 8, message: '5 ~ 8 characters', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                    { min: 6, max: 8, message: '6 ~ 8 characters', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Please type in correct email address', trigger: 'blur' }
                ],
            },
            editFormRules: {
                password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                    { min: 6, max: 8, message: '6 ~ 8 characters', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Please type in correct email address', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        async getUserList() {
            const {data:res} = await this.$http.get("allUser", {params: this.queryInfo});
            this.userList = res.data;
            this.total = res.numbers;
        },
        handleSizeChange(newSize) {
            this.queryInfo.pageSize = newSize;
            this.getUserList();
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pageNum = newPage;
            this.getUserList();
        },
        async userStateChanged(userInfo) {
            var formData = new FormData();
            formData.append('id', userInfo.id);
            formData.append('state', userInfo.state);
            const { data:res } = this.$http.put('/userState', formData);
            // this.$http.put(`userState?id=${userInfo.id}&state=${userInfo.state}`);
            console.log(res);
            if (typeof res != 'undefined') {
                userInfo.id = !userInfo.id;
                return this.$message.error("Failed to change user state!");
            }
            this.$message.success("Success!")
        },
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return;
                const { data:res } = await this.$http.post("addUser", this.addForm);
                if (res != "success") {
                    return this.$message.error("Failed to add user!");
                }
                this.$message.success("Success!")
                this.addDialogVisible = false;
                this.getUserList();
            });
        },
        toggleAddDialogVisible() {
            this.addDialogVisible = !this.addDialogVisible;
        },
        async deleteUser(id) {
            const confirmResult = await this.$confirm('This action will delete user permanently, click to continue.', 'Reminder', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).catch(err => err);
            if (confirmResult != 'confirm') {
                return this.$message.Info("Deletion cancelled");
            }
            const { data:res } = await this.$http.delete("deleteUser?id=" + id);
            if (res != "success") {
                return this.$message.error("Failed to delete user!");
            }
            this.$message.success("Success!");
            this.getUserList();
        },
        async showEditDialog(id) {
            const { data:res } = await this.$http.get("getUpdate?id=" + id);
            this.editForm = res;
            this.editDialogVisible = true;
        },
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        editUserInfo() {
            this.$refs.editFormRef.validate(async valid => {
                if (!valid) return;
                const { data:res} = await this.$http.put("editUser", this.editForm);
                if (res != "success") {
                    return this.$message.error("Failed to edit user!");
                }
                this.$message.success("Success!");
                this.editDialogVisible = false;
                this.getUserList();
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