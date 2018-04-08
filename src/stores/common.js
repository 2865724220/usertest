import { observable, action, runInAction, useStrict, computed } from 'mobx';
import Toast from '../component/common/toast';
import { $http, Qs } from '../utils/tools';

useStrict(true);
const params = Qs();
class ComStore {
    @observable isOpen = false;
    @observable cardInfo = {};
    @observable initInfo = {};
    @observable loading = false;

    @computed get logined () {
        return params.deviceId && params.mobilePhone && (params.sessionId||params.sessionid)
    }

    // 返回首页
    @action linkIndex = () => {
        if(!this.logined){
            Toast.show('请先登录');
            return;
        }
        window.location.href = '/redpacket' + window.location.search;
    }

    @action getVersionsManagers = (cb) => {
        this.loading = true;
        setTimeout(()=>Toast.show('加载中...'));
        $http.get('/versionsManagers/getMyRedSwitch?deviceId=' + params.deviceId + '&mobilePhone='+params.mobilePhone+
            '&appName=' + params.appName + '&appVersion=1.1.1&clientType=android').then(res => {
            Toast.hide();
            if(res.code == "0"){
                runInAction(() => {
                    this.isOpen = res.data.item.isOpen == "1" ? true : false;
                    this.loading = false;
                    if(this.isOpen){
                        cb();

                    }
                });
            }
        }, err => {
            Toast.hide();
            runInAction(()=>{
                this.loading = false;
            })

        })
    }

    // 获取用户相关信息
    @action getInitInfo = () => {
        $http.get('/credit-user/get-info-red?deviceId=' + params.deviceId + '&mobilePhone='+params.mobilePhone+
            '&appName=' + params.appName + '&appVersion=1.1.1&clientType=android').then(res => {
                if(res.code == "0"){
                    runInAction(() => {
                        if(res.data){
                            this.initInfo = res.data.item;
                            this.cardInfo = res.data.item.card_info;
                        }
                    });
                }
        }, err => {})
    }

    // 立即邀请
    // @action inviteNow = () => {
    //     if(!this.logined){
    //         Toast.show('请先登录');
    //         return;
    //     }
    //     if(this.initInfo.share_title && this.initInfo.share_body &&
    //         this.initInfo.share_url && this.initInfo.share_logo){
    //         let data = JSON.stringify({
    //             type: 0,
    //             share_title: this.initInfo.share_title,
    //             share_body: this.initInfo.share_body,
    //             share_url: this.initInfo.share_url,
    //             share_logo: this.initInfo.share_logo
    //         });
    //         if(isiOS){
    //             shareMethod(data)
    //         }else{
    //             nativeMethod.shareMethod(data)
    //         }
    //     }else{
    //         Toast.show('暂时无法分享');
    //     }
    // }
}

export default new ComStore();