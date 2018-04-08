import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "../base/classnames";
import helpImg from '../../images/help_icon.png';
import arrowRightImg from '../../images/arrow_right.png';
import { $http } from '../../utils/tools'

export default class Loan extends Component{
    constructor(){
        super();
        this.state = {
            show: false,
            showSelect: false,
            period: '',
            loanInfoList: {},
            periods: [],
            counterFee: '',
            realMoney: '',
            reMoney: '',
            loanTcInfo: ''
        }
    }
    componentDidMount(){
        $http.post('/credit-loan/get-loan-b', {
            "phone":"13965114817",
            "deviceId":"863846027009648",
            "borrowId":"3680531"
        }).then((res) => {
            if(res.data.item && res.code === "0")     {
                 this.setState({
                     //返回信息详情
                     loanInfoList: res.data.item,
                     //页面默认的天数
                     period: res.data.item.period,
                     //接口里面的期数列表
                     periods: res.data.item.periods,
                 });
                 //遍历期数列表，根据页面默认期数展示各项默认数据
                const periodsAry = this.state.periods;
                for(let i=0;i<periodsAry.length; i++){
                    if(this.state.period === periodsAry[i]){
                        this.setState({
                            //对应借款天数的服务费
                            counterFee: this.state.loanInfoList.counter_fee[i],
                            //对应借款天数的实际到账
                            realMoney: this.state.loanInfoList.real_money[i],
                            //对应借款天数的应还金额
                            reMoney: this.state.loanInfoList.re_money[i],
                        });

                    };
                };
            }
        }, (err) => {
            console.log(err);
        });
        // 费用明细接口
        $http.get('/credit-loan/get-detail-fee?period=14&money=2000').then((res) => {
            if(res.data.item && res.code === "0"){
                this.setState({
                    //返回服务费用信息详情
                    loanTcInfo: res.data.item,
                });
            }
        }, (err) => {
            console.log(err);
        })
    }
    //费用详情弹窗显示
    show(){
        this.setState({
            show: true,
        })
    }
    //点击按钮 费用详情弹窗隐藏
    okClick(){
        this.setState({
            show: false,
        })
    }
    //点击选择期数 期数选择弹窗显示
    showSelect(){
        this.setState({
            showSelect: true,
        })
    }
    //获取期数选择弹窗里的数据
    handleValue(res){
        this.setState({
            showSelect: false,
            period: res,
        });
        //遍历期数列表，根据页面默认期数展示各项默认数据
        const periodsAry = this.state.periods;
        for(let i=0;i<periodsAry.length; i++){
            if(res === periodsAry[i]){
                this.setState({
                    //对应借款天数的服务费
                    counterFee: this.state.loanInfoList.counter_fee[i],
                    //对应借款天数的实际到账
                    realMoney: this.state.loanInfoList.real_money[i],
                    //对应借款天数的应还金额
                    reMoney: this.state.loanInfoList.re_money[i],
                });

            };
        };
        // const periodsAry = this.state.periods;
        // for(let i=0;i<periodsAry.length; i++){
        //         if(res === periodsAry[i]){
        //             let counterFee = this.state.loanInfoList.counter_fee[i];
        //             let realMoney = this.state.loanInfoList.real_money[i];
        //             let reMoney = this.state.loanInfoList.re_money[i];
        //             this.state.chargeList.push({
        //                 'counterFee': counterFee,
        //                 'realMoney': realMoney,
        //                 'reMoney': reMoney
        //             });
        //             console.log(this.state.chargeList[0].counterFee);
        //         };
        // };
    };
    render() {
        //费用详情弹窗类名配置
        const helpTcDivCls = classNames({
           'help-tc': true,
            'show': this.state.show,
        });
        //选择框弹窗类名配置
        const selectTcDivCls = classNames({
            'select-tc': true,
            'show': this.state.showSelect,
        });
        const {loanInfoList,periods} = this.state;
        return (
            <div className="loan-wrap">
                <div className="header">
                    <a className="back_arr" href="javascript:void(0);" />
                    <h1>如意借</h1>
                </div>

                <div className="loan-wrap">
                    <div className="loan-limit">
                        <p>借款金额（元）</p>
                        <h2>{loanInfoList.money}</h2>
                    </div>
                    <div className="sub-title">此产品只向少部分用户开放，申请必放款，赶紧申请吧～</div>
                    <form>
                        <ul className="input-list">
                            <li className="next-step">
                                <div className="label">选择期数</div>
                                <img src={ arrowRightImg } alt="" className="icon-arrow_right" />
                                    <div className="input-c">
                                        <input type="text" value = { this.state.period + '天'} readOnly={true} onClick={this.showSelect.bind(this)} />
                                    </div>
                            </li>
                            <li className="next-step">
                                <div className="label">服务费用</div>
                                <img src={ helpImg } alt="" className="icon-help" onClick={this.show.bind(this)} />
                                    <div className="input-c">
                                        <input type="text" value={this.state.counterFee + '元'} disabled />
                                    </div>
                            </li>
                            <li>
                                <div className="label">实际到账</div>
                                <div className="input-c">
                                    <input type="text" value={this.state.realMoney + '元'} disabled />
                                </div>
                            </li>
                            <li className="next-step"><a href="javascript:;">
                                <div className="label">到账银行</div>
                                <img src={ arrowRightImg } alt="" className="icon-arrow_right" />
                                    <div className="input-c">
                                        <input type="text" value={ this.state.loanInfoList.bank_name + ( this.state.loanInfoList.card_no_lastFour ) } disabled />
                                    </div>
                            </a>
                            </li>
                        </ul>
                        <ul className="input-list">
                            <li>
                                <div className="label">还款金额</div>
                                <div className="input-c">
                                    <input type="text" value={this.state.reMoney + '元'} disabled />
                                </div>
                            </li>
                            <li>
                                <div className="label">还款时间</div>
                                {/*<!-- 若跨年则显示2018-06-10 -->*/}
                                <div className="input-c">
                                    <input type="text" value={this.state.loanInfoList.re_date} disabled />
                                </div>
                            </li>
                        </ul>
                    </form>
                    {/*<!-- 费用详情弹窗 start -->*/}
                    <div className = { helpTcDivCls }>
                        <div className="help-tc-inner">
                            <div className="help-tc-title">费用详情</div>
                            <div className="help-text">
                                <dl>
                                    <dt>信用审查费：</dt>
                                    <dd>{this.state.loanTcInfo.credits_fee}元</dd>
                                </dl>
                                <dl>
                                    <dt>账户管理费：</dt>
                                    <dd>{this.state.loanTcInfo.accountManagers_fee}元</dd>
                                </dl>
                                <dl>
                                    <dt>借款利息：</dt>
                                    <dd>{this.state.loanTcInfo.accruals_fee}元</dd>
                                </dl>
                                <div className="line"></div>
                                <dl className="resault">
                                    <dt>综合费用：</dt>
                                    <dd>{this.state.loanTcInfo.credits_fee + this.state.loanTcInfo.accountManagers_fee + this.state.loanTcInfo.accruals_fee }</dd>
                                </dl>
                            </div>
                            <a href="javascript:void(0);" className="submit-btn confirm-btn submit-open" onClick={this.okClick.bind(this)}>朕知道了</a>
                        </div>
                        <div className="overlay" />
                    </div>
                    {/*<!-- 费用详情弹窗 end -->*/}

                    {/*<!-- 期数选择弹窗 start -->*/}
                    <div className = { selectTcDivCls }>
                        <ul className="select-tc-inner">
                            {
                                periods.map((res,index) =>
                                    <li key={index} onClick={this.handleValue.bind(this,res)}>
                                    {res+'天'}
                                    </li>
                                )
                            }
                        </ul>
                        <div className="overlay" />
                    </div>
                    {/*<!-- 期数选择弹窗 end -->*/}
                    {/*<!-- 可以提交则加类名submit-open -->*/}
                    <a href="javascript:void(0);" className="submit-btn submit-open">立即申请</a>
                </div>

            </div>
        )
    }
}
Loan.propTypes = {
    show: PropTypes.bool,
    showSelect: PropTypes.bool,
    data: PropTypes.array,
}