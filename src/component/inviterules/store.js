import { observable, action, runInAction, useStrict, computed } from 'mobx';
import { $http, Qs } from '../../utils/tools';

useStrict(true);
const params = Qs();
class InviteRules {

    @observable show = true;
    @observable rankList = [];
    @observable rankListTop3 = [];
    @observable rankListOther = [];

    @action showRule = () => {
        this.show = !this.show;
    }

    // get rankList list
    @action getRankList = () => {
        $http.get('/cashman-web/service/redPacket/queryRedPacketList?size=20&deviceId=' + params.deviceId
            + '&mobilePhone='+params.mobilePhone).then(res =>{
            if(res.code == '00'){
                let data = res.data;
                runInAction(() => {
                    this.rankListTop3 = data && data.length > 3 ? data.splice(0, 3) : (data || []);
                    this.rankListOther = data ? data : [];
                });
            }
        },err =>{});
    }
}

export default new InviteRules();