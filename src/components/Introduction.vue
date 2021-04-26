<template>
    <div>
        <h1>Sports and Info</h1>
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
            <el-table :data="displayList" border stripe :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="Sport name" prop="SportName" ></el-table-column>
                <el-table-column label="Calories per hour" prop="Calories"></el-table-column>
                <el-table-column label="Details" prop="Details" width="900%"></el-table-column>
<!--                <el-table-column label="Mark as Favorite" prop="Favorite">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
            <div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[20]"
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
            displayList: [],
            sportsList: [
              { SportName: "Yoga",
                Calories: "180 ~ 460",
                Details: "Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India.",
              },
              { SportName: "Jogging",
                Calories: "200 ~ 400",
                Details: "Jogging is a form of trotting or running at a slow or leisurely pace.",
              },
              { SportName: "Cycling",
                Calories: "600",
                Details: "Cycling, also called bicycling or biking, is the use of bicycles for transport, recreation, exercise or sport.",
              },
              { SportName: "Walking",
                Calories: "230 ~ 370",
                Details: "Walking is typically slower than running and other gaits.",
              },
              { SportName: "Swimming",
                Calories: "600 ~ 1000",
                Details: "Swimming keeps your heart and lungs healthy, improves strength and flexibility, increases stamina and even improves balance and posture.",
              },
              { SportName: "Dancing",
                Calories: "200 ~ 400",
                Details: "Dancing bolsters physical and mental health by helping to prevent falls, improve posture and flexibility, lift mood and ease anxiety.",
              },
              { SportName: "Badminton",
                Calories: "200 ~ 400",
                Details: "Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.",
              },
              { SportName: "Basketball",
                Calories: "470 ~ 740",
                Details: "Basketballs usually range in size from very small promotional items that are only a few inches in diameter to extra large balls nearly 2 feet in diameter used in training exercises.",
              },
              { SportName: "Billiards",
                Calories: "150 ~ 200",
                Details: "Various games played on a billiard table in which cues are used to strike balls against each other or into pockets around the edge of the table.",
              },
              { SportName: "Boxing",
                Calories: "700 ~ 1200",
                Details: "Boxing is known to be a good cardio exercise. Maintaining a good heart condition is really important, and boxing helps to maintain it.",
              },
              { SportName: "Bowling",
                Calories: "200",
                Details: "Bowling is a target sport and recreational activity in which a player rolls a ball toward pins (in pin bowling) or another target (in target bowling).",
              },
              { SportName: "Football",
                Calories: "600 ~ 800",
                Details: "Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.",
              },
              { SportName: "Golf",
                Calories: "200 ~ 400",
                Details: "Golf is a club-and-ball sport in which players use various clubs to hit balls into a series of holes on a course in as few strokes as possible.",
              },
              { SportName: "Hockey",
                Calories: "400 ~ 750",
                Details: "Hockey is a sport in which two teams play against each other by trying to manoeuvre a ball or a puck into the opponent's goal using a hockey stick.",
              },
            ],
            total: 14,
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
        getUserList() {
            console.log("ddd")
            if (this.queryInfo.query === "") {
                this.displayList = this.sportsList;
            } else {
                this.displayList = this.sportsList.filter(sport=> sport.SportName === this.queryInfo.query);
                console.log(this.displayList)
            }
        },
        
        editUserInfo() {
            console.log("ddd")
            this.getUserList();
        },
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