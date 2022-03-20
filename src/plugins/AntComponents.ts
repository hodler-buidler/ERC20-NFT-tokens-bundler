import { Button, Radio, Result, Select, Skeleton } from 'ant-design-vue';
import { Plugin } from 'vue';

const AntComponents: Plugin = {
  install: (app) => {
    app.use(Button);
    app.use(Radio);
    app.use(Result);
    app.use(Select);
    app.use(Skeleton);
  },
};

export default AntComponents;
