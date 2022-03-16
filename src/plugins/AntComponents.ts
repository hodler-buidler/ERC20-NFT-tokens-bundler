import { Button } from 'ant-design-vue';
import { Plugin } from 'vue';

const AntComponents: Plugin = {
  install: (app) => {
    app.use(Button);
  },
};

export default AntComponents;
