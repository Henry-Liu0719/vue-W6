// import './assets/main.css'
import 'bootstrap/scss/bootstrap.scss'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
// import './assets/all.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import { createI18n } from 'vue-i18n';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// import { VeeValidate } from 'vee-validate';
// import VeeValidatePlugin from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import zhTW from './zh_TW.json';  // 假设你的资源文件在项目根目录下
// 直接注册中文语言包
localize('zh_TW', zhTW);
const i18n = createI18n({
  locale: 'zh_TW',
});
// 配置
configure({
  generateMessage: localize("zh_TW"),
  validateOnInput: true,
})
const app = createApp(App)

app.component('LoadingOverlay',Loading)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
// app.use(VeeValidatePlugin);
app.use(i18n);
// 注册 VeeValidate 插件
// app.use(VeeValidate, {
//   i18nRootKey: 'validation',  // 指定 i18nRootKey，可根据实际情况设置
// });
// 注册 VeeValidate 的组件
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app')

// import.meta.env.VITE_LOAD_LANG_FROM_URL && VeeValidateI18n.loadLocaleFromURL('./zh_TW.json').then(() => {
//   app.use(i18n);
//   app.mount('#app');
// });

