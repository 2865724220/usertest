/**
 * Created by Administrator on 2017/10/20 0020.
 */
import React, { Component } from "react";
import deleteImg from '../../images/delete.jpg';


export default class LoanConfirm extends Component {
    render(){
        return (
            <div className="loan-confirmed">
                <div className="header">
                    <a className="back_arr" href="javascript:void(0);"></a>
                    <h1>借款确认</h1>
                </div>
                {/*<!-- main start -->*/}
                <div className="loan-wrap">
                    <ul className="input-list">
                        <li>
                            <div className="label">借款金额</div>
                            <div className="input-c">
                                <input type="text" value="1000元" disabled="true" />
                            </div>
                        </li>
                        <li>
                            <div className="label">借款期数</div>
                            <div className="input-c">
                                <input type="text" value="7天" disabled="true" />
                            </div>
                        </li>
                        <li>
                            <div className="label">服务费用</div>
                            <div className="input-c">
                                <input type="text" value="180元" disabled="true" />
                            </div>
                        </li>
                        <li>
                            <div className="label">实际到账</div>
                            <div className="input-c">
                                <input type="text" value="850元" disabled="true" />
                            </div>
                        </li>
                        <li>
                            <div className="label">到账银行</div>
                            <div className="input-c">
                                <input type="text" value="招商银行借记卡 (4313)" disabled="true" />
                            </div>
                        </li>
                    </ul>
                    <div className="prompt-message">您将在<em>7天</em>后还款<em>1000</em>元</div>
                    {/*<!-- 可以提交则加类名submit-open -->*/}
                    <a href="javascript:;" className="submit-btn submit-open">确认申请</a>
                    <div className="agree-info">
                        <i className="checked"></i>
                        <span>我已阅读并同意
                          <a href="如意借款协议.html">《如意借款协议》</a>
                          <a href="平台服务协议.html">《平台服务协议》</a>
                      </span>
                    </div>
                    {/*<!-- 提交成功弹窗 start -->*/}
                    <div className="help-tc">
                        <div className="help-tc-inner">
                            <div className="help-text">
                                <div className="resault-msg"><i className="resault-img"></i>您的订单已提交成功</div>
                            </div>
                            <a href="javascript:;" className="sure-btn">朕知道了</a>
                        </div>
                        <div className="overlay"></div>
                    </div>
                    {/*<!-- 提交成功弹窗 end -->*/}
                    {/*<!-- 输入密码弹窗 start -->*/}
                    <div className="password-modal">
                        <div className="password-body">
                            <div className="password-title">
                                <span>请设置交易密码</span> <em>关闭</em>
                            </div>
                            <div className="loan-money">
                                <p>借款金额</p>
                                <h3>¥ 1000.00</h3>
                            </div>
                            <div className="password-con clearfix">
                                <ul className="password-dot clearfix">
                                    <li className=""><i></i></li>
                                    <li className=""><i></i></li>
                                    <li className=""><i></i></li>
                                    <li className=""><i></i></li>
                                    <li className=""><i></i></li>
                                    <li className=""><i></i></li>
                                </ul>
                                <div className="skip-links">
                                    {/*<!--当校验第一次输入的密码时显示-->*/}
                                    <p className="password-msg">请再输入一次前一次输入的交易密码</p>
                                    {/*<!--当为请输入交易密码时-->*/}
                                    <a href="javascript:;" className="forget-password">忘记交易密码？</a>
                                </div>
                            </div>
                        </div>
                        <div className="keyboard">
                            <ul className="board-num clearfix">
                                <li><span>1</span></li>
                                <li><span>2</span></li>
                                <li><span>3</span></li>
                                <li><span>4</span></li>
                                <li><span>5</span></li>
                                <li><span>6</span></li>
                                <li><span>7</span></li>
                                <li><span>8</span></li>
                                <li><span>9</span></li>
                                <li><span>关闭</span></li>
                                <li><span>0</span></li>
                                <li><img src={ deleteImg } className="keyboard-delete" /></li>
                            </ul>
                        </div>
                    </div>
                    {/*<!-- 输入密码弹窗 end -->*/}
                </div>
            </div>
        )
    }
}