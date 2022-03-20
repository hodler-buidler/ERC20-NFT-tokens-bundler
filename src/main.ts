import { createApp } from 'vue';
import AntComponents from '@/plugins/AntComponents';
import { createPinia } from 'pinia';
import 'ant-design-vue/dist/antd.css';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import '@/assets/styles/main.scss';
import { router } from '@/router';
import App from './App.vue';

/* Done that way because of issue: https://github.com/mercs600/vue3-perfect-scrollbar/issues/4 */
/* eslint-disable @typescript-eslint/no-var-requires */
const PerfectScrollbar = require('vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.esm').default;

const app = createApp(App);

app.use(PerfectScrollbar);
app.use(router);
app.use(createPinia());
app.use(AntComponents);

app.mount('#app');
