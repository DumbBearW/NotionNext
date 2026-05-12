const CONFIG = {
  HEXO_HOME_BANNER_ENABLE: true,
  // 3.14.1以后的版本中，欢迎语在blog.config.js中配置，用英文逗号','隔开多个。
  HEXO_HOME_BANNER_GREETINGS: [
    'Hi，我是一个程序员',
    'Hi，我是一个打工人',
    'Hi，我是一个干饭人',
    '欢迎来到我的博客🎉'
  ], // 首页大图标语文字

  HEXO_HOME_NAV_BUTTONS: true, // 首页是否显示分类大图标按钮
  // 已知未修复bug, 在移动端开启true后会加载不出图片； 暂时建议设置为false。
  HEXO_HOME_NAV_BACKGROUND_IMG_FIXED: false, // 首页背景图滚动时是否固定，true 则滚动时图片不懂动； false则随鼠标滚动 ;
  // 是否显示开始阅读按钮
  HEXO_SHOW_START_READING: true,

  // 菜单配置
  HEXO_MENU_INDEX: true, // 显示首页
  HEXO_MENU_CATEGORY: true, // 显示分类
  HEXO_MENU_TAG: true, // 显示标签
  HEXO_MENU_ARCHIVE: true, // 显示归档
  HEXO_MENU_SEARCH: true, // 显示搜索
  HEXO_MENU_RANDOM: true, // 显示随机跳转按钮

  HEXO_POST_LIST_COVER: true, // 列表显示文章封面
  HEXO_POST_LIST_COVER_HOVER_ENLARGE: false, // 列表鼠标悬停放大

  HEXO_POST_LIST_COVER_DEFAULT: true, // 封面为空时用站点背景做默认封面
  HEXO_POST_LIST_SUMMARY: true, // 文章摘要
  HEXO_POST_LIST_PREVIEW: false, // 读取文章预览
  HEXO_POST_LIST_IMG_CROSSOVER: true, // 博客列表图片左右交错

  HEXO_ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  HEXO_ARTICLE_COPYRIGHT: true, // 显示文章版权声明
  HEXO_ARTICLE_NOT_BY_AI: false, // 显示非AI写作
  HEXO_ARTICLE_RECOMMEND: true, // 文章关联推荐

  HEXO_WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  HEXO_WIDGET_CUSTOM_CARD_TITLE: '', // 侧栏自定义卡片标题；留空则不显示标题
  HEXO_WIDGET_CUSTOM_CARD_CONTENT: '', // 侧栏自定义卡片内容；支持字符串或字符串数组，留空则隐藏卡片
  HEXO_WIDGET_CUSTOM_CARD_SCRIPT_SRC: 'https://keepandroidopen.org/banner.js?lang=zh-CN&animation=off&size=mini&hidebutton=off', // 侧栏自定义卡片脚本地址；脚本需支持按 id 插入
  HEXO_WIDGET_CUSTOM_CARD_LINK: '', // 侧栏自定义卡片链接；留空则不显示按钮
  HEXO_WIDGET_CUSTOM_CARD_LINK_TEXT: '查看详情', // 侧栏自定义卡片链接文字
  HEXO_WIDGET_ANALYTICS: false, // 显示统计卡
  HEXO_WIDGET_TO_TOP: true,
  HEXO_WIDGET_TO_COMMENT: true, // 跳到评论区
  HEXO_WIDGET_DARK_MODE: false, // 夜间模式
  HEXO_WIDGET_TOC: true, // 移动端悬浮目录

  HEXO_THEME_COLOR: '#928CEE' // 主题色配置（默认为 #928CEE）
}
export default CONFIG
