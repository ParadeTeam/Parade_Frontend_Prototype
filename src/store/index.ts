import { createStore } from 'vuex'

export default createStore({
    state: { 
        slideData: [
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
        ]
     },
    mutations: {  },
    actions: {  },
    modules: {  }
})