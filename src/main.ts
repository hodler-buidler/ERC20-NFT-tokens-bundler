import { createApp } from 'vue'
import AntComponents from '@/plugins/AntComponents';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

app.use(AntComponents);

app.mount('#app');
