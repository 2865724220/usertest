import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import classNames from "../base/classnames";
import helpImg from '../../assets/images/help_icon.png';
import arrowRightImg from '../../assets/images/arrow_right.png';
import Toast from '../common/toast';
import { Qs } from '../../utils/tools';
const params = Qs();

@inject('redpacket', 'common')
@observer
export default class RedPacket extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        this.props.common.getVersionsManagers(() => {
            this.props.redpacket.getBalance();
            this.props.redpacket.getRedList();
            this.props.common.getInitInfo();
            this.props.redpacket.getBankList();
        });
    }

    render() {
        document.title = '我的红包';
        const {
            money, goInviteRule, goInvitePage,
            redList, displayNone,
            showAlert, show, showTips,
            withdrawal,bankList,selectCard,bankIndex,selectBank
        } = this.props.redpacket;
        // const { isOpen, initInfo, cardInfo, inviteNow, loading} = this.props.common;
        const { isOpen, initInfo, cardInfo, loading} = this.props.common;
        return (
            isOpen ? <div className="redpacket-wrap">
                <div style={{paddingBottom: '2.8rem'}}>
                    <div className="loan-limit">
                        <p>累计已获得</p>
                        <h2>{money.total || 0}<span style={{'fontSize':'1rem'}}>元</span></h2>
                    </div>
                    <ul className="input-list">
                        <li className="next-step">
                            <div className="label">当前余额：{money.amount || 0}元</div>
                            <a href="javascript:void(0);" className="link" onClick={showAlert}>提现</a>
                        </li>
                        <li className="next-step" onClick={goInvitePage}>
                            <div className="label">邀提记录</div>
                            <img className="icon-arrow_right" src={require("../../assets/images/arrow_right.png")}/>
                        </li>
                    </ul>
                    <ul className="rank-list">
                        <li className="rank-title clearfix">
                            <div className="label">累计排行榜</div>

                            {/*<a  href="javascript:void(0);" className="link" onClick={goInviteRule}>邀请规则</a>*/}
                        </li>
                        <li style={displayNone} className="rank-item">
                            <div className="rank-num">排名</div>
                            <div className="rank-mobile">手机号</div>
                            <div className="rank-money grey">累计已获得</div>
                        </li>
                        {
                            redList && redList.length == 0
                            ? <li className="blank-non">暂时无人登顶，还不赶紧行动~</li>
                            : redList.map((item,index) => {
                                return index < redList.length - 1 ?
                                   <li className="rank-item" key={index}>
                                            <div className="rank-num">{item.index}</div>
                                            <div className="rank-mobile">{item.phone}</div>
                                            <div className="rank-money">{item.amount}元</div>
                                    </li>
                                    :
                                    <li className="rank-item" key={index}>
                                        <div className="not-rank">{item.index + (item.amount == "0" ? "" : "(当前排名)")}</div>
                                        <div className="not-rank-money">{item.amount}元</div>
                                    </li>
                            })
                        }
                    </ul>
                    {
                        // <p style={displayNone} className="rank-time">排行榜每日7点更新</p>
                    }
                </div>

                <div className="help-tc" style={{display: show ? 'block':'none'}} >
                    <div className="overlay"></div>
                    <div className="cash-alert">
                        <div className="cash-alert-t">提示</div>
                        <p className="cash-alert-row"><span>本次提现：</span><span className="cash-money">{money.amount || 0}</span><span>元</span></p>
                        {/*<p className="cash-alert-row" onClick={() => {
                            window.location.href = initInfo.card_url+`?mobilePhone=${params.mobilePhone}&deviceId=${params.deviceId}`;
                        }}><span>到账银行卡：</span><span>{
                                cardInfo.bank_name ?  cardInfo.bank_name + '(' + cardInfo.card_no_end + ')' : '去绑定银行卡'
                            }</span><span className="arrow-right"></span></p>*/}
                        {
                            bankList.length > 0
                            ?<div className="bankWrapT">
                              <p className="bankTitlep">到账银行卡：</p> 
                                <ul>
                                    {
                                       bankList.map((item,index) =>{
                                            return <li className="bankSelectLi" key={index} className={ bankIndex == index ?'bankSelectLi activeB':'bankSelectLi'} onClick={()=>selectBank(item.card_no,item.bankCode,index)}>
                                                <div className="bankSelect clearfix">{item.bankName +'('+ item.card_no.substr(item.card_no.length-4) +')'}
                                                    <span className="circleS fr"></span>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>
                             </div>:<div className="cash-alert-row">去绑定银行卡</div>   
                        }
                        <div className="cash-alert-f clearfix">
                            <span onClick={showAlert}>取消</span>
                            <span onClick={withdrawal}>立即提现</span>
                        </div>
                    </div>
                </div>

                <div className="cash-tips" style={{display: showTips ? 'block':'none'}}>
                    最低需要100元才可提现，赶紧邀请朋友来借钱吧
                </div>

                {/*<a href="javascript:void(0);" className="invite-btn" onClick={inviteNow}>立即邀请</a>*/}
            </div> : <div className="construting" style={{display: loading ? 'none' : 'block'}}>
                <img src={require('../../assets/images/group-2-copy-2.png')} />
                <p className="desc">正在建设中...</p>
            </div>
        )
    }
}