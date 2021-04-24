<template>
    <div class="container">
        <div class="search-div">
            <form class="search-form">
                <input class="search-bar" v-model="query" type="text"/>
                <!-- <button class="search-button" type="submit" @click="getRecipes">Search</button> -->
                <el-button class="search-button" slot="append" icon="el-icon-search" @click="getRecipes">Search</el-button>
            </form>
        </div>
        <div class="recipes" v-for="recipe in recipes">
            <div class="recipe">
                <h1>{{ recipe.recipe.label }}</h1>
                <ol>
                    <li v-for="ingredient in recipe.recipe.ingredients">
                        {{ingredient.text}}
                    </li>
                </ol>
                <p>Calories: {{recipe.recipe.calories}}</p>
                <img :src="recipe.recipe.image">
            </div>
            
            <!-- <h1>{title}</h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li key={ingredient.text + ingredient.calories}>
                        {ingredient.text}
                    </li>
                ))}
            </ol>
            <p>{calories}</p>
            <img className={style.image} src={image} alt=""></img> -->
             
        </div>
    </div>
</template>
<script>
export default {
    created() {
        this.getRecipes();
    },
    data() {
        return {
            recipes: [],
            APP_ID: "bc084cdd",
            APP_KEY: "22f56e6acf5445f6e93bdbf3c4422ed9",
            query: "banana"
        }
    },
    methods: {
        async getRecipes() {
            console.log(this.query, this.APP_ID, this.APP_KEY);
            const {data:res} = await this.$http.get(`https://api.edamam.com/search?q=${this.query}&app_id=${this.APP_ID}&app_key=${this.APP_KEY}`);
            console.log(res);
            this.recipes = res.hits;
        },
        onkeydown(e) {
            e.preventDefault();
            let key = e.keyCode;
            console.log(key);
            if (key === 13) {
                this.getRecipes();
            }
        }
    }
}
</script>
<style lang="less" scoped>
* {
    margin: 0;
    box-sizing: border-box;
}
.container {
    min-height: 100vh;
    text-align: center;
    background-image: linear-gradient(to top, #8181b8 0%, #6690df 100%);
}
.search-form {
  min-height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar {
  width: 50%;
  border: none;
  padding: 10px;
  margin-right: 10px;
}

.search-button {
  background: lightcoral;
  border: none;
  padding: 12px 20px;
  color: white;
}
.recipes {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.recipe {
    border-radius: 10px;
    box-shadow: 0px 5px 20px rgb(71, 71, 50);
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: white;
    align-items: center;
    min-width: 40%;
}
</style>