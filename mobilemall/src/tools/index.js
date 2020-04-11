
import { Toast } from 'vant';
//加载数据
export function loading() {
    Toast.loading({
      duration: 0,
      message: '数据加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    });
}
//取消加载
export function loadingClear() {
  Toast.clear()
}

