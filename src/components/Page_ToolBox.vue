<script setup lang="ts">
    import { Configuration, OpenAIApi } from 'openai';
    import { reactive, watch, computed, onMounted, nextTick, inject } from 'vue';
    import { categoryRequest } from '../assets/js/dataclass/category';
    import { CategoryAPI } from '../utils/http/API';

    class category {
        id: number = 0;
        title: string = "";
        sequence: number = 0;
    }

    const props = defineProps({
        activeid: Number
    })

    const emit = defineEmits(['changeCategory','addCategory']);

    const categoryList = reactive({
        datas: new Array<category>()
    });

    const data = reactive({
        isExpand: false,
        isMenuShow: false,
        activeCategory: props.activeid,
        activeCategoryName: "",
        NewCategoryName: "",
        isShowSummary: false
    });

    const getSummarize = inject('getSummarize') as () => void;

    const toggleTools = () => data.isExpand = !data.isExpand;
    const toggleMenu = () => data.isMenuShow = !data.isMenuShow;
    const changeCategory = (item : category) => {
        data.activeCategory = item.id;
        data.activeCategoryName = categoryList.datas.find(x => x.id === data.activeCategory)?.title ?? "";
        toggleMenu();
        emit('changeCategory', data.activeCategory);
    };
    const isActive = (id: number) => {
        return id === data.activeCategory;
    }
    const AddNewCategory = async (name: string) => {
        //categoryList.datas.push({ categoryId: "category_Id"+ (categoryList.length + 1), categoryName: data.NewCategoryName});
        await CategoryAPI.CreateCategory(new categoryRequest(0,name,0)).then(response => {
            console.log(response.data);
        });
        await CategoryAPI.ＧetCategory().then((res) => {
            categoryList.datas = res.data;
        });
        emit('addCategory', { categoryId: categoryList.datas[categoryList.datas.length - 1].id, categoryName: data.NewCategoryName});
        data.NewCategoryName = "";        
    }
    onMounted(async () => {
        await CategoryAPI.ＧetCategory().then((res) => {
            categoryList.datas = res.data;
        });
        changeCategory(categoryList.datas[0]);
        toggleMenu();
        data.activeCategoryName = categoryList.datas.find(x => x.id === data.activeCategory)?.title ?? "";
    });
</script>

<template>
    <div id="toolbox" class="toolbox">
        <button class="border-0 bg-transparent" v-on:click="toggleTools()" v-if="!data.isExpand">
            <i class="fa-solid fa-angles-right"></i>
        </button>
        <div id="outtertools" v-if="data.isExpand">
            <button class="border-0 bg-transparent" v-on:click="toggleMenu()">
                <span style="padding-right: 10px;">{{ data.activeCategoryName }}</span>
                <i class="fa-solid fa-caret-down"></i>
            </button>
            <button class="border-0 bg-transparent" v-on:click="void(0)">
                <i class="fa-solid fa-share-nodes"></i>
            </button>
            <button class="border-0 bg-transparent" v-on:click="getSummarize">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <button class="border-0 bg-transparent" v-on:click="void(0)">
                <i class="fa-solid fa-upload"></i>
            </button>
            <button class="border-0 bg-transparent" v-on:click="void(0)">
                <i class="fa-solid fa-clock-rotate-left"></i>
            </button>
            <button class="border-0 bg-transparent" v-on:click="void(0)">
                <i class="fa-solid fa-bell"></i>
            </button>
            <button class="border-0 bg-transparent" v-on:click="toggleTools()">
                <i class="fa-solid fa-angles-left"></i>
            </button>
        </div>        
    </div>
    <div id="categorymenu" class="categorymenu" v-show="data.isMenuShow">
        <input class="border-0 bg-transparent" placeholder="+ Add New Category" 
        v-model="data.NewCategoryName" v-on:keyup.enter="AddNewCategory(data.NewCategoryName)"/>
        <hr>
        <button class="border-0 bg-transparent w100" v-for="item in categoryList.datas"
         v-bind:key="item.id"
         v-on:click="changeCategory(item)"
         v-bind:class="{'activeCate':isActive(item.id)}">
         {{ item.title }}
        </button>
    </div>
    <!-- <div id="textmodal" class="textmodal" v-show="data.isShowSummary"></div> -->
</template>

<style scoped>
    .textmodal{
        position: absolute;
        background-color: white;
        top: 10%;
        left: 25%;
        border-color: brown;
        border: 5px;
        border-style: dotted;
        box-shadow: 0 0 10px 10px rgb(0 0 0 / 30%);
        min-height: 100px;
        max-height: 350px;
        width: 500px;
        z-index: 3000;
    }
</style>
