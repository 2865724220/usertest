import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import classNames from "../base/classnames";
// import helpImg from '../../images/help_icon.png';
// import arrowRightImg from '../../images/arrow_right.png';
import { DateF } from '../../utils/tools'

@inject('inviterules', 'common')
@observer
export default class InviteRules extends Component{
    constructor(){
        super();
        this.timer = null;
    }
    componentDidMount(){
      TDAPP.onEvent("老邀新(红包)");
      this.props.inviterules.getRankList();
      this.props.common.getInitInfo();
      this.timer = setTimeout(() => jQuery(".txtScroll-top").slide({
        titCell:".hd ul",
        mainCell:".bd ul",
        autoPage:true,
        effect:"topLoop",
        easing:"easeOutQuad",
        autoPlay:true,
        vis:7,
        delayTime:400
      }), 100);
    }

    componentWillUnmount(){
      clearTimeout(this.timer)
    }

    render() {
        document.title = '邀提规则';
        const {
          show, showRule,
          rankListTop3, rankListOther
        } = this.props.inviterules;
        const { linkIndex, inviteNow } = this.props.common;
        return (
          <div className="page">
            <div className="wrapper invit-new">
                <div className="banner-box">
                    <img src={require("../../assets/images/invite2/a_01.png")} className="invite-banner" alt=""/>
                    <div className="red-packet">
                        <h2>邀请好友注册并在活动期间成功借款</h2>
                        <h2>达1500元即可获得<span>现金红包</span></h2>
                        <h3>￥<span>40</span></h3>
                        <p>每成功邀请<em>1</em>名好友，可获得奖金<em>40</em>元</p>
                    </div>
                </div>
              <div className="invite-main">
                <div className="invite-record">
                    <div className="invite-record-title2">
                       <img src={require("../../assets/images/invite2/a_07.png")} alt=""/>
                    </div>
                    <div className="invite-record-inner">
                    <dl className="invite-listnew">
                      <dt>
                        <span>排名</span>
                        <span>手机号码</span>
                        <span>获得奖金</span>
                      </dt>
                      {
                        rankListTop3.map((item, index) => {
                          return <dd key={index}>
                            <span>{index + 1}</span>
                            <span>{item.phone}</span>
                            <span><em>{item.amount}元</em></span>
                          </dd>
                        })
                      }
                    </dl>
                    
                    <div className="txtScroll-top">
                      <div className="bd">
                        <ul className="infoList">
                          {
                            rankListOther.map((item, index) => {
                              return <li key={index}>
                                <span>{index + 4}</span>
                                <span>{item.phone}</span>
                                <span><em>{item.amount}元</em></span>
                              </li>
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                    
                </div>
                  <div className="activity-explain">
                    <p>*本活动最终解释权归极速现金侠所有</p>
                    <p>本活动与苹果公司无关！</p>
                  </div>
              </div>
              <div className="invite-footer">
                <a rel="external" href="javascript:;" id="role-btn" onClick={showRule}>活动规则</a>
                <a rel="external" href="javascript:;" className="reward" id="reward-btn" onClick={inviteNow}>邀请得奖金</a>
                <a rel="external" href="javascript:;" onClick={linkIndex}>我的奖励</a>
              </div>
            </div>
            <div className="role-tc" style={{display: show ? 'block' : 'none'}}>
              <img src={require("../../assets/images/invite2/a_04.png")} alt="" className="title-img"/>
              <dl className="role-info">
                <dt><img src={require("../../assets/images/invite2/a_05.png")} alt=""/></dt>
                <dd>
                  <span>①</span>
                  <p>在11月14日（含当天）之后，新用户首次成功借款，对应的邀请人将获得40元现金红包，通过活动页面查看我的奖励并完成红包提现;</p>
                </dd>
                <dd>
                  <span>②</span>
                  <p>邀请人数越多，预计获得红包越多，上不封顶;</p>
                </dd>
                <dd>
                  <span>③</span>
                  <p>累计红包可完成提现，具体规则请参照红包提现页面。</p>
                </dd>
              </dl>
              <div className="tips">*本活动最终解释权归极速现金侠所有</div>
              <div style={{fontSize: '12px', color: '#f77b26',lineHeight: '20px',textAlign: 'center'}}>本活动与苹果公司无关！</div>
              <img src={require("../../assets/images/invite2/a_11.png")} alt="" className="role-tc-close" onClick={showRule}/>
            </div>
            <div className="mask" style={{display: show ? 'block' : 'none'}}></div>
          </div>
        )
    }
}