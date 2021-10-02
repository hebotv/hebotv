import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Input IPTV M3U URI': 'Input IPTV M3U URI',
      'Start': 'Start',
      'All categories': 'All categories',
      'Search...': 'Search...',
      'All languages': 'All languages',
      'Home': 'Home',
      'Channels': 'Channels',
    },
  },
  'zh-CN': {
    translation: {
      'Input IPTV M3U URI': '输入 IPTV M3U 地址',
      'Start': '开始',
      'All categories': '所有类目',
      'All languages': '所有语言',
      'Search...': '搜索...',
      'Home': '首页',
      'Channels': '频道列表',
      'Chinese': '中文',
      'Japanese': '日语',
      'Animation': '动画',
      'Auto': '汽车',
      'Business': '商业',
      'Classic': '经典',
      'Comedy': '喜剧',
      'Cooking': '烹饪',
      'Culture': '文化',
      'Documentary': '纪录片',
      'Education': '教育',
      'Entertainment': '娱乐',
      'Family': '家庭',
      'General': '一般',
      'Genral': '一般',
      'Kids': '儿童',
      'Legislative': '立法',
      'Lifestyle': '生活方式',
      'Local': '本地',
      'Movies': '电影',
      'Music': '音乐',
      'News': '新闻',
      'Outdoor': '户外',
      'Relax': '放松',
      'Religious': '宗教',
      'Science': '科学',
      'Series': '系列',
      'Shop': '商店',
      'Sports': '体育',
      'Travel': '旅游',
      'Weather': '天气'
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: navigator.language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
