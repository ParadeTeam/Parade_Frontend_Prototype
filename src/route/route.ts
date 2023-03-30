import Home from '../components/HelloWorld.vue';
import Test from '../components/Test.vue';
import  {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/Home',
        component: Home
    },
    {
        path: '/TEST',
        component: Test
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes:routes
});

export default router;