import { observable, action, runInAction, useStrict, computed } from 'mobx';
import { $http, Qs } from '../../utils/tools';

useStrict(true);
const params = Qs();
class Invite {

    @observable tab = 1;
    @observable invitions = [];
    @observable records = [];

    @action selectTab = (tab) => {
        this.tab = tab;
    }

    // get invitions list
    @action getInvitions = () => {
        $http.post('/cashman-web/service/redPacket/query-inviter-List?deviceId=' + params.deviceId
            + '&mobilePhone='+params.mobilePhone, { }).then(res =>{
            if(res.code == '00'){
                runInAction(() => this.invitions = res.data || []);
            }
        },err =>{
            // 
        });
    }

    // get records list
    @action getRecords = () => {
        $http.post('/cashman-web/service/redPacket/query-withdrow-record?deviceId=' + params.deviceId
            + '&mobilePhone='+params.mobilePhone,{ }).then(res =>{
            if(res.code == '00'){
                runInAction(() => this.records = res.data || []);
            }
        },err =>{
            // 
        });
    }

    @computed get totalMoney() {
        let total = 0;
        this.records.forEach((v) => { 
            if(v.status && (v.status==1 || v.status==2 || v.status==5 || v.status ==6)) {
                total += v.amount ? v.amount * 1 : 0 
            }
        });
        return total;
    }
}

export default new Invite();