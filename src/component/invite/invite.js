import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import classNames from "../base/classnames";
import helpImg from '../../images/help_icon.png';
import arrowRightImg from '../../images/arrow_right.png';
import { DateF, DateFN } from '../../utils/tools'

const statusObjI = {0:'已注册未申请',1:'已申请未放款',2:'已申请已放款'};
const statusObj = {1: '提现中', 2: '提现中', 3: '提现失败', 4: '提现失败', 5: '提现成功',6:'提现中'};

@inject('invite', 'common')
@observer
export default class Invite extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        this.props.invite.getInvitions();
        this.props.invite.getRecords();
        this.props.common.getInitInfo();
    }

    getStatusDescI = (status) => {
        return statusObjI[status]
    }

    getStatusDesc = (status) => {
        return statusObj[status]
    }

    render() {
        document.title = '邀提记录';
        const {
            tab, selectTab,
            invitions,
            records, totalMoney
        } = this.props.invite;
        const { linkIndex, inviteNow } = this.props.common;
        return (
            <div className="invite-wrap">
                {
                    /*<div className="header">
                        <a className="back_arr" href="javascript:void(0);" />
                        <h1>邀提记录</h1>
                    </div>*/
                }

                <div style={{paddingBottom: '2.8rem'}}>
                    <div className="invite-tabs">
                        <div className={classNames({'tabs-item': true, active: tab == 1})} onClick={()=>selectTab(1)}><span>邀请名单</span></div>
                        <div className={classNames({'tabs-item': true, active: tab == 2})} onClick={()=>selectTab(2)}><span>提现历史</span></div>
                    </div>
                    
                    <div style={{display: tab == 1 ? 'block' : 'none'}}>
                            {
                                invitions.length == 0 ? <div className="invite-non">
                                    <img src={require('../../images/icon_13.png')}></img>
                                    <p>当前您还未邀请好友或您的好友还未注册</p>
                                    <a href="javascript:void(0);" onClick={inviteNow}>立即邀请></a>
                                </div> : <div>
                                    <ul className="cash-list invite">
                                        <li className="cash-item">
                                            <div className="cash-col1">手机号</div>
                                            <div className="cash-col2">当前状态</div>
                                            <div className="cash-col3">获得奖金</div>
                                        </li>
                                        {
                                            invitions.map((item, index) => {
                                                return <li key={index} className="cash-item">
                                                    <div className="cash-col1 grey">{item.mobile}</div>
                                                    <div className="cash-col2">{this.getStatusDescI(item.status)}</div>
                                                    <div className="cash-col3">{item.amount == 0 ? "/":item.amount+'元'}</div>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            }
                    </div>
                    <div style={{display: tab == 2 ? 'block' : 'none'}}>
                        {   
                            records.length == 0 ? <div className="invite-non">
                                <img src={require('../../images/icon_13.png')}></img>
                                <p>您当前无提现记录</p>
                                <a href="javascript:void(0);" onClick={linkIndex}>立即提现></a>
                            </div> : <div>
                                <div className="total-wrap">
                                    <div className="total-info">累计提现</div>
                                    <div className="total-money">{totalMoney}元</div>
                                </div>
                                <ul className="cash-list">
                                    <li className="cash-item">
                                        <div className="cash-col1">提现金额</div>
                                        <div className="cash-col2">提现时间</div>
                                        <div className="cash-col3">提现状态</div>
                                    </li>
                                    {
                                        records.map((item, index) => {
                                            return <li key={index} className="cash-item">
                                                <div className="cash-col1">{item.amount}元</div>
                                                <div className="cash-col2 grey">{DateFN(item.insertTime)}</div>
                                                <div className="cash-col3">{this.getStatusDesc(item.status)}</div>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}