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
                    <el-input placeholder="Please enter your search content" v-model="queryInfo.query" clearable @clear="getFoodList">
                        <el-button slot="append" icon="el-icon-search" @click="getFoodList"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="displayList" border stripe :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="Food" prop="food"></el-table-column>
                <el-table-column label="Category" prop="category"></el-table-column>
                <el-table-column label="Calories per kg" prop="calories"></el-table-column>
                <el-table-column label="Details" prop="details" width = "800%"></el-table-column>
            </el-table>
            <div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[10]"
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
        this.getFoodList();
    },
    data() {
        return {
            // 查询信息实体
            queryInfo: {
                query: "",
                pageNum: 1,
                pageSize: 5
            },
            displayList:[],
            foodList: [
              { food: "Banana",
                category: "fruit",
                calories: "890",
                details: "Bananas are a healthful addition to a balanced diet, as they provide a range of vital nutrients, Vitamins and are a good source of fiber."
              },
              { food: "Apple",
                category: "fruit",
                calories: "500",
                details: "Apples Are Nutritious. Apples May Be Good for Weight Loss. Apples May Be Good for Your Heart. They're Linked to a Lower Risk of Diabetes."
              },
              { food: "Avocado",
                category: "fruit",
                calories: "1600",
                details: "Avocados are a great source of vitamins C, E, K, and B-6, as well as riboflavin, niacin, folate, pantothenic acid, magnesium, and potassium."
              },
              { food: "Mango",
                category: "fruit",
                calories: "600",
                details: "Mango is low in calories yet high in nutrients — particularly vitamin C, which aids immunity, iron absorption and growth and repair."
              },
              { food: "Pecans",
                category: "nut",
                calories: "70000",
                details: "Raw pecans pack a 1-2-3 punch of protein, healthy fats, and fiber that can help keep you energized and satisfied."
              },
              { food: "Beef, Rib eye",
                category: "meat",
                calories: "20000",
                details: "Fresh, lean beef is rich in various vitamins and minerals, especially iron and zinc."
              },
              { food: "Milk",
                category: "diary",
                calories: "420",
                details: "Milk Does More Than Build Strong Bones. Its Many Vitamins & Minerals Benefit Your Health. Milk Is An Essential Part Of Helping Every Body Thrive."
              },
              { food: "Egg",
                category: "egg",
                calories: "1551",
                details: "Eggs are rich sources of selenium, vitamin D, B6, B12 and minerals such as zinc, iron and copper. Egg yolks contain more calories and fat than the whites."
              },
              { food: "Chicken breast",
                category: "meat",
                calories: "1649",
                details: "Chicken is also a good source of vitamin B, vitamin D, calcium, iron, zinc, and trace amounts of vitamin A and vitamin C."
              },
              { food: "Spinach",
                category: "vegetable",
                calories: "230",
                details: "Spinach is necessary for energy metabolism, maintaining muscle and nerve function, heart rhythm, a healthy immune system, and maintaining blood pressure."
              },
            ],
            total: 10,
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
        getFoodList() {
            // const {data:res} = await this.$http.get("allSports", {params: this.queryInfo});
            // console.log(res);
            // this.sportList = res.data;
            // this.total = res.numbers;
          if(this.queryInfo.query === "") {
              this.displayList = this.foodList
          } else {
              this.displayList = this.foodList.filter(foodItem => foodItem.food === this.queryInfo.query);
          }
        },

        addSport() {
            // TODO: future implement
        },

        editSportInfo() {
            // TODO: future implement
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