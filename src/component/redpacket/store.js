import { observable, action, runInAction, useStrict, computed } from 'mobx';
import { $http, Qs } from '../../utils/tools';
import Toast from '../common/toast';

useStrict(true);
const params = Qs();
class RedPacket {

    @observable money = {};
    @observable show = false;
    @observable redList = [];
    @observable showTips = false;
    @observable showInvite = false;
    @observable loading = false;
    @observable bankList =[];
    @observable bankIndex = -1;
    @observable cardNo = '';
    @observable bankCode = '';
    
    // 红包长度
    @computed get redLength () {
        return this.redList.length;
    }

    // css
    @computed get displayNone() {
        return {display: this.redList.length == 0 ? 'none':'block'};
    }

    // 获取当前余额和累计提现
    @action getBalance = () => {
        $http.get(`/cashman-web/service/redPacket/get-balance?mobilePhone=${params.mobilePhone}&deviceId=${params.deviceId}`)
            .then(res => {
                if(res.code == '00'){
                    runInAction(() => this.money = res.data || {});
                }
            }, err => {
                console.log(err)
            });
    }

    // 获取排行榜列表
    @action getRedList = () => {
        $http.get(`/cashman-web/service/redPacket/queryRedPacketListTop5?mobilePhone=${params.mobilePhone}&deviceId=${params.deviceId}`)
        .then(res => {
            if(res.code == '00'){
                runInAction(() => this.redList = res.data || []);
            }
        },err =>{
            // 
        })
    }

    //获取银行列表
    @action getBankList = () => {
        $http.post(`/refactoruser/getUserAndCardList?mobilePhone=${params.mobilePhone}&deviceId=${params.deviceId}&appVersion=${params.appVersion}&clientType=${params.clientType}`,{
            userId:params.userId
        }).then(res => {
            if(res.code == '0'){
               runInAction(()=>{
                this.bankList = res.data.userCardList || [];
               })
            }
        },err =>{
            // 
        })
    }

    // 提现弹窗提示
    @action showAlert = () => {
        if(this.money.amount >= 100){
            this.show = !this.show;
        }else{
            this.showTips = true;
            setTimeout(()=>{
                runInAction(()=>this.showTips = false);
            },1500)
        }
    }

    //选择银行卡
    @action.bound 
    selectBank (cardNo,bankCode,index) {
        this.bankIndex = index;
        this.cardNo = cardNo;
        this.bankCode = bankCode;
    }

    // 立即提现
    @action withdrawal = () => {
        if(this.loading){
            return;
        }
        if(this.cardNo == ''){
            Toast.show("请选择银行卡！");
        }else{
            this.loading = true;
           $http.post('/cashman-web/service/redPacket/withdrow?deviceId=' + params.deviceId
            + '&mobilePhone='+params.mobilePhone, {
            'phone': params.mobilePhone,
            'cardNo': this.cardNo,
            'bankCode': this.bankCode,
            }).then(res => {
                if(res.code == '00'){
                    runInAction(() => {
                        this.show = false;
                        this.loading = false;
                        Toast.show("您的提现申请已提交，预计30分钟内处理完毕，请耐心等待");
                    });
                    setTimeout(()=>window.location.reload(), 1100);
                }else{
                    Toast.show(res.msg || "提现失败！");
                }
            }, err => {
                this.loading = false;
                Toast.show("提现失败！");
            }) 
        }
        
       
        
    }

    @action goInvitePage = () => {
        window.location.href = '/invite' + window.location.search;
    }

    @action goInviteRule = () => {
        window.location.href = '/inviterules' + window.location.search;
    }

}

export default new RedPacket();