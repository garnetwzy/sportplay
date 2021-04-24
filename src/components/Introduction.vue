<template>
    <div>
        <h1>Stats and Info</h1>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">Main</el-breadcrumb-item>
        <el-breadcrumb-item>Sports Platform</el-breadcrumb-item>
        <el-breadcrumb-item>Sports Introduction</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="25" type="flex" justify="center" align="middle">
                <el-col :span="10">
                    <el-input placeholder="Please input content to search for" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="sportsList" border stripe :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="Sport name" prop="SportName"></el-table-column>
                <el-table-column label="Calories per hour" prop="Calories"></el-table-column>
                <el-table-column label="Details" prop="Details"></el-table-column>
                <el-table-column label="Mark as Favorite" prop="Favorite">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>
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


        <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
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
            //hardcode the sportsList
            sportsList: [
              { SportName: "Yoga",
                Calories: "180 ~ 460",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Jogging",
                Calories: "200 ~ 400",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Cycling",
                Calories: "600",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Walking",
                Calories: "230 ~ 370",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Swimming",
                Calories: "600 ~ 1000",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Dancing",
                Calories: "200 ~ 400",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Badminton",
                Calories: "200 ~ 400",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Basketball",
                Calories: "470 ~ 740",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Billiards",
                Calories: "150 ~ 200",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Boxing",
                Calories: "700 ~ 1200",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Bowling",
                Calories: "200",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Football",
                Calories: "600 ~ 800",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Golf",
                Calories: "200 ~ 400",
                Details: "Null",
                Favorite: 0
              },
              { SportName: "Hockey",
                Calories: "400 ~ 750",
                Details: "Null",
                Favorite: 0
              },
            ],
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
                    { required: true, message: 'Please input username', trigger: 'blur' },
                    { min: 5, max: 8, message: '5 - 8 characters', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                    { min: 6, max: 8, message: '6 - 8 characters', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Please type in correct email address', trigger: 'blur' }
                ],
            },
            editFormRules: {
                password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                    { min: 6, max: 8, message: '6 - 8 characters', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { min: 5, max: 15, message: 'Please type in correct email address', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        handleSizeChange(newSize) {
            this.queryInfo.pageSize = newSize;
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pageNum = newPage;
        },
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        toggleAddDialogVisible() {
            this.addDialogVisible = !this.addDialogVisible;
        },
        async showEditDialog(id) {
            const { data:res } = await this.$http.get("getUpdate?id=" + id);
            this.editForm = res;
            this.editDialogVisible = true;
        },
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
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