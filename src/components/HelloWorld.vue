<script setup lang="ts">
import '../assets/css/common.css';
import '../assets/css/slide.css';
import '../assets/css/page.css';
import '../assets/css/notes.css';
import '../assets/css/modal.css';
import '../assets/fontawesome/css/fontawesome.css';
import '../assets/fontawesome/css/solid.css';
import { loadFrame, iframe, NoteModel } from '../assets/js/highlight';
import { reactive, watch, computed, onMounted, nextTick, provide } from 'vue';
import ToolBox from "./Page_ToolBox.vue";
import HighlightPanel from "./HighlightPanelModal.vue";
import { Configuration, OpenAIApi } from "openai";
import {SlideAPI,CategoryAPI, NoteAPI} from "../utils/http/API"
import axios from 'axios'
import { categoryRequest } from '../assets/js/dataclass/category';
import { slideRequest } from '../assets/js/dataclass/slide';


const reloadFrame = (src : string) => {
    $('#myFrame').attr('src', '/TEST.html?url='.concat(src));
}

const data = reactive({
    pagesize: 999,
    activeSlideIndex: 0,
    activeSlideId: 0,
    activeCategoryId: 1,
    isShowSummary: false,
    isSummaryLoading: false
});

const slideData = reactive([
    {
        "categoryId": "category_Id1",
        "categoryName": "Tab Management",
        "slideContents": [
            {
                "id":"encode_id_1",
                "title":"How To Manage Your Browser Tabs, According To The Guy Who Invented Them",
                "thumbnail_url":"https://img.huffingtonpost.com/asset/5c34cdb02600003e0585e357.jpeg?cache=klkGL2xbQG&ops=scalefit_720_noupscale&format=webp",
                "link_url":"https://www.huffpost.com/entry/browser-tabs-tips_n_5c2e773de4b05c88b70785ee"
            },
            {
                "id":"encode_id_2",
                "title":"Too many tabs open: How to master tab clutter in 5 easy steps",
                "thumbnail_url":"https://able.ac/blog/content/images/2022/09/sticky-notes-on-a-green-wall.jpeg",
                "link_url":"https://able.ac/blog/having-too-many-browser-tabs-open-hurts-your-productivity-really-bad/"
            },
            {
                "id":"encode_id_3",
                "title":"7 Ways to Organize Your Browser Tabs and Boost Your Productivity",
                "thumbnail_url":"https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/12/browser-tab-clutter.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5",
                "link_url":"https://www.makeuseof.com/ways-to-organize-browser-clutter/"
            },
            {
                "id":"encode_id_4",
                "title":"How To Manage Multiple Browser Tabs",
                "thumbnail_url":"https://www.dignited.com/wp-content/uploads/2019/05/how-to-manage-browser-tabs.png",
                "link_url":"https://dignitedae.pages.dev/posts/how-to-manage-multiple-browser-tabs/#:~:text=How%20To%20Manage%20Multiple%20Browser%20Tabs%201%201.,left%20off%E2%80%9D%20...%207%207.%20Use%20Extensions%20"
            },
            {
                "id":"encode_id_5",
                "title":"You Have a Million Tabs Open. Here’s How to Manage Them",
                "thumbnail_url":"https://media.wired.com/photos/5f52a83bc36fa4bcfd9eca74/master/w_1600,c_limit/Gear-01-groups.jpg",
                "link_url":"https://www.wired.com/story/how-to-organize-browser-tabs/"
            }
        ]
    },
    {
        "categoryId": "category_Id2",
        "categoryName": "Interior Design",
        "slideContents": [
            {
                "id":"encode_id_1",
                "title":"World's best interior designers – the 21 top designers today",
                "thumbnail_url":"https://cdn.mos.cms.futurecdn.net/JnpMabcMap6R9chYUfbABg-1920-80.jpg.webp",
                "link_url":"https://www.homesandgardens.com/advice/world-s-best-interior-designers"
            },
            {
                "id":"encode_id_2",
                "title":"The Ultimate Guide to the Best Interior Design Websites",
                "thumbnail_url":"https://thomasdigital.com/wp-content/uploads/2021/07/screenshot-amylaudesign.com-2021.07.07-23_44_15.png",
                "link_url":"https://thomasdigital.com/industry/interior-design-websites#:~:text=Best%20Interior%20Design%20Websites%201%201.%20Amy%20Lau,...%208%208.%20Duet%20Design%20Group%20...%20%E6%9B%B4%E5%A4%9A%E9%A1%B9%E7%9B%AE"
            }
        ]
    },
    {
        "categoryId": "category_Id3",
        "categoryName": "MyTravelPlan_Tokyo",
        "slideContents": [
            {
                "id":"encode_id_1",
                "title":"airbnb",
                "thumbnail_url":"https://a0.muscache.com/im/pictures/c7485f26-ce45-4ea1-82cf-f6c974279a3c.jpg?im_w=720",
                "link_url":"https://www.airbnb.com.tw/s/Tokyo--Japan/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&price_filter_input_type=0&price_filter_num_nights=5&query=Tokyo%2C%20Japan&place_id=ChIJ51cu8IcbXWARiRtXIothAS4&date_picker_type=calendar&checkin=2023-06-04&checkout=2023-06-05&adults=2&source=structured_search_input_header&search_type=autocomplete_click&_set_bev_on_new_domain=1678112581_ZmJiZjJiMzY4Mzg5"
            },
            {
                "id":"encode_id_2",
                "title":"23 Cool And Quirky Things To Do In Asakusa",
                "thumbnail_url":"https://tokyotravelguide.com/wp-content/uploads/Denboin-Street-Asakusa-6.jpg",
                "link_url":"https://tokyotravelguide.com/"
            },
            {
                "id":"encode_id_3",
                "title":"High rise, fast-paced and neon-lit, Tokyo is as futuristic as it is historical",
                "thumbnail_url":"https://res-3.cloudinary.com/jnto/image/upload/w_750,h_1100,c_fill,f_auto,fl_lossy,q_auto/v1513936386/tokyo/Tokyo2258_24",
                "link_url":"https://www.japan.travel/en/destinations/kanto/tokyo/"
            }
        ]
    }
]);

const notes = reactive({
    datas:[] as NoteModel[]
});

const focusPage = (x: any, y: any) => {
    $(iframe).contents().find('html').animate({
        scrollLeft: x,
        scrollTop: y
    }, 500);
}

const setActiveSlide = (id: number) => {
    data.activeSlideIndex = displaySlide.data.findIndex(x => x.id === id);
}

const nextSlide = () => {
    if(data.activeSlideIndex + 1 < displaySlide.data.length){
        data.activeSlideIndex ++;
    }  
}

const previousSlide = () => {
    if(data.activeSlideIndex !== 0){
        data.activeSlideIndex --;
    }
}

const displaySlide = reactive({
    data: [] as any[]
});

const pagination = reactive({
    totalPages: computed(()=> Math.ceil(displaySlide.data.length / data.pagesize)),    
    curPage: 1
});

const changeCategory = async (result :any) => {
    await CategoryAPI.ＧetUderSlide(result).then((res) => {
        console.log("changeCategory");
        console.log(res);
        displaySlide.data = res.data;
        data.activeCategoryId = result;
        data.activeSlideIndex = 0;
        if(displaySlide.data.length > 0){
            reloadFrame(displaySlide.data[data.activeSlideIndex].weburl);
        }
    });
};

const addCategory = async (result :{ categoryId: number, categoryName: string}) => {
    //ADD SLIDE
    await CategoryAPI.ＧetUderSlide(result.categoryId).then(async (res) => {
        if (res.data.length === 0){
            await SlideAPI.CreateSlide(
                new slideRequest(result.categoryId,
                "new page",
                "https://www.google.com.tw/?hl=en",
                "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"))
                .then((res) => {
                    console.log(res);
            });
        }
    });
};

const newPage = async () => {
    await SlideAPI.CreateSlide(
                new slideRequest(data.activeCategoryId,
                "new page",
                "https://www.google.com.tw/?hl=en",
                "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"))
                .then((res) => {
                    console.log(res);
                });

    await CategoryAPI.ＧetUderSlide(data.activeCategoryId).then((res) => {
        displaySlide.data = res.data;
    });
};

const summaryData = reactive({
    summaryAnwser : "",
    forceStop: false
});

function typeWriter(text: string, delay: number, target: HTMLElement): void {
  let i = 0;
  const intervalId = setInterval(() => {
    target.textContent += text.charAt(i);
    i++;
    if (summaryData.forceStop){
        clearInterval(intervalId);
    }
    if (i > text.length - 1) {
      clearInterval(intervalId);
    }
  }, delay);
}

const getSummarize = async () => {
    const targetElement = document.getElementById("summaryarea");
    if(targetElement != null){
        //先清空
        targetElement.textContent = "";
    } 

    data.isShowSummary = true;
    const configuration = new Configuration({
        apiKey: "",
    });
    const openai = new OpenAIApi(configuration);
    const curLink = displaySlide.data[data.activeSlideIndex].weburl;
    data.isSummaryLoading = true;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Please summarize the content for me and make longer: " + curLink,
        max_tokens: 3000
    });
    data.isSummaryLoading = false;
    summaryData.summaryAnwser = completion.data.choices[0].text as string;
    const textToType = summaryData.summaryAnwser;
    const typingDelay = 10; // in milliseconds
      
    if(targetElement != null){
        summaryData.forceStop = false;
        typeWriter(textToType, typingDelay, targetElement);
    }   
}

provide('getSummarize', getSummarize);

onMounted(async () => {
    await SlideAPI.getＡll().then((res) => {
        displaySlide.data = res.data;
        data.activeSlideId = displaySlide.data[data.activeSlideIndex].id; 
    });
    NoteAPI.getＣategoryNote(data.activeCategoryId).then((res) => {
        console.log("getNoteOK");
        console.log(res);
    });
});

watch(() => ([pagination.curPage, data.pagesize]), async () => {
    const startIndex = data.pagesize * (pagination.curPage - 1)
    await SlideAPI.getＡll().then((res) => {
        displaySlide.data = res.data;
        data.activeSlideId = displaySlide.data[data.activeSlideIndex].id; 
    });
    //displaySlide.data = data.bookmarks.bookmarks.slice(startIndex, startIndex + data.pagesize);
},{deep: true, immediate: true});

watch(() => data.activeSlideIndex,
        async () => {
            await nextTick();
            data.activeSlideId = displaySlide.data[data.activeSlideIndex]?.id ?? 0; 
            data.isShowSummary = false;
            data.isSummaryLoading = false;
            summaryData.forceStop = true;
            if(displaySlide.data.length > 0){
                reloadFrame(displaySlide.data[data.activeSlideIndex].weburl);
            }
        },{immediate: true});

watch(() => data.activeCategoryId,
async () => {
    NoteAPI.getＣategoryNote(data.activeCategoryId).then((res) => {
        console.log("getNoteOK");
        notes.datas = res.data;
    });
},{immediate: true});


</script>

<template>
<!-- slide -->
        <div class="slide">
            <!-- action btns -->
            <div class="action-btn-groups">

            </div>

            <ol class="slide-items">
                <li v-for="(item, index) in displaySlide.data" v-bind:key="item.id" class="slide-item" v-bind:class="{'active': data.activeSlideIndex == index}" v-on:click="setActiveSlide(item.id);">                 
                    <div class="slide-img">
                        <img v-bind:src="item.pictureurl">
                    </div>
                    <div class="sub-title">
                        <span>{{item.title}}</span>
                    </div>
                </li>
            </ol>

            <div class="btn-add-slide" v-on:click="newPage">
                <span>+ New Page</span>
            </div>
        </div>

        <!-- page -->
        <div class="page">
            <ToolBox :activeid="data.activeCategoryId" @change-category="changeCategory" @add-category="addCategory"></ToolBox>
            <div class="paganation" >
                <span style="font-size: small;">
                    <button class="border-0 bg-transparent" v-on:click="previousSlide()">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>                    
                    {{ (data.activeSlideIndex + 1) + ' / ' + displaySlide.data.length}}
                    <button class="border-0 bg-transparent" v-on:click="nextSlide()">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <button class="border-0 bg-transparent">
                        <i class="fa-solid fa-play" style="color:lightcoral"></i>
                    </button>                    
                </span>                
            </div>
            <iframe id="myFrame" src="" v-on:load="loadFrame()"></iframe>
        </div>

        <!-- notes -->
        <div class="notes">
            <div class="head">
                <button class="border-0 bg-transparent">
                    <i class="fa-solid fa-note-sticky"></i>
                </button>
                <h2 class="title">Notes for this page</h2>
                <button class="border-0 bg-transparent">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
            <div class="body">
                <div class="message" v-for="(note) in notes.datas" v-on:click="focusPage(1, 1);">
                    <div class="prepend">
                        <div class="dots" :style="{'background-color': note.color}"></div>
                    </div>
                    <span>{{ note.note_text }}</span>
                </div>
            </div>
        </div>

        <HighlightPanel :slide_id="data.activeSlideId"></HighlightPanel>
        <div id="textmodal" class="textmodal" v-show="data.isShowSummary">
            <div v-if="data.isSummaryLoading">loading</div>
            <div class="textarea" id="summaryarea"></div>
        </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

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
        overflow-y: scroll;
    }

.textmodal .textarea{
    margin: 10px;
}
</style>
