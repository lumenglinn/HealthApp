export default {
  pages: [

    'pages/index/index',
    'pages/orderDetail/index',
    'pages/orderList/index',
    'pages/cart/index',
    // 'pages/workerList/index',
    'pages/workerDetail/index',
    'pages/register/index',
    'pages/result/index',
    'pages/mine/index',
    'pages/registerProtocol/index',
    'pages/hospital/index',
  ],
  tabBar: {
    list: [
      {
        'iconPath': './assets/image/tabBar/list.png',
        'selectedIconPath': './assets/image/tabBar/list-active.png',
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        'iconPath': './assets/image/tabBar/cart.png',
        'selectedIconPath': './assets/image/tabBar/cart-active.png',
        pagePath: 'pages/cart/index',
        text: '购物车'
      },
      {
        'iconPath': './assets/image/tabBar/mine.png',
        'selectedIconPath': './assets/image/tabBar/mine-active.png',
        pagePath: 'pages/mine/index',
        text: '我'
      }],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#fafafa',
    'borderStyle': 'white'
  },
  // #04a9f5
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
