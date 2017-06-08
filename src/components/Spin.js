/**
 * @author cqb 2016-05-05.
 * @module Loadding
 */

import React from 'react';
import classNames from 'classnames';
import BaseComponent from './core/BaseComponent';

/**
 * WaterSpin 类
 * @class WaterSpin
 * @constructor
 * @extend BaseComponent
 */
class WaterSpin extends BaseComponent {
    constructor(props) {
        super(props);

        this.addState({
            percent: parseFloat(props.percent) || 0,
            spinning: props.spinning || false
        });

    }

    /**
     * 设置百分比
     * @param percent
     */
    setPercent(percent){
        this.setState({percent});
        if(percent == 100){
            if(this.props.onFinish){
                this.props.onFinish();
            }
            this.emit("finish");
        }
    }

    /**
     * 获取百分比
     * @returns {number|*|string}
     */
    getPercent(){
        return this.state.percent;
    }

    render(){
        let top = (100 - this.state.percent)+"%";
        let fontSize = this.props.size / 250 * 75;
        return(
            <div className="cm-water-spin-wrap" style={{width: this.props.size, height: this.props.size}}>
                <div className="cm-water-spin-inner">
                    <div className="cm-water-spin-text" style={{fontSize: fontSize, lineHeight: (this.props.size-10)+"px"}}>{this.state.percent+"%"}</div>
                    <div className="cm-water-spin" style={{top: top}}></div>
                    <div className="cm-water-glare"></div>
                </div>
            </div>
        );
    }
}

WaterSpin.defaultProps = {
    size: 250
};


/**
 * SVGSpin 类
 * @class SVGSpin
 * @constructor
 * @extend BaseComponent
 */
class SVGSpin extends BaseComponent {
    constructor(props) {
        super(props);

        this.addState({
            spinning: props.spinning || false
        });

    }

    show(){
        this.setState({
            spinning: true
        });
    }

    hide(){
        this.setState({
            spinning: false
        });
    }

    renderSpin(){
        if(this.state.spinning){
            return (
                <div className="cm-svg-spin-inner">
                    <div className="cm-svg-spin">
                        <svg width="32px" height="32px" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-gears">
                            <rect x="0" y="0" width="100" height="100" fill="none" className="bk"></rect>
                            <g className="cm-svg-spin-gear1">
                                <path d="M79.9,52.6C80,51.8,80,50.9,80,
                                        50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,
                                        35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,
                                        27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,
                                        5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,
                                        1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,
                                        6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,
                                        6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,
                                        1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,
                                        80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z
                                        M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z"
                                      fill="#1f2d3d" transform="rotate(27 50 50)">
                                    { /*<animateTransform attributeName="transform" type="rotate" from="90 50 50" to="0 50 50" dur="1s" repeatCount="indefinite"></animateTransform>*/}
                                </path>
                            </g>
                            <g className="cm-svg-spin-gear2">
                                <path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,
                                        35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,
                                        20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,
                                        4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,
                                        0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,
                                        4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,
                                        4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z
                                        M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="#20A0FF" transform="rotate(63 50 50)">
                                    {/*<animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform>*/}
                                </path>
                            </g>
                        </svg>
                    </div>
                    <div className="cm-svg-spin-text">{this.props.title||"loading..."}</div>
                </div>
            );
        }else{
            return null;
        }
    }

    render(){
        let className = classNames(this.props.className, "cm-svg-spin-wrap");
        let containerClassName = classNames("cm-spin-container",{
            "cm-svg-spin-blur": this.state.spinning
        });
        let spin = this.renderSpin();
        return(
            <div className={className}>
                { spin }
                <div className={containerClassName}>{this.props.children}</div>
            </div>
        );
    }
}



let SpinMap = {
    mask:
    <span>
        <div className="cm-mask cm-mask-top">
            <div className="cm-mask-plane"></div>
        </div>
        <div className="cm-mask cm-mask-middle">
            <div className="cm-mask-plane"></div>
        </div>
        <div className="cm-mask cm-mask-bottom">
            <div className="cm-mask-plane"></div>
        </div>
    </span>,

    waves:
    <div className="cm-waves"></div>
};

/**
 * CssSpin 类
 * @class CssSpin
 * @constructor
 * @extend BaseComponent
 */
class CssSpin extends BaseComponent {
    constructor(props) {
        super(props);

        this.addState({
            spinning: props.spinning || false
        });

    }

    /**
     *
     */
    show(){
        this.setState({
            spinning: true
        });
    }

    /**
     *
     */
    hide(){
        this.setState({
            spinning: false
        });
    }

    /**
     *
     * @returns {*}
     */
    renderSpin(){
        if(this.state.spinning){
            return (
                <div className="cm-spin-inner">
                    <div className="cm-spin">
                        {SpinMap[this.props.type]}
                    </div>
                    <div className="cm-spin-text">{this.props.title||"loading..."}</div>
                </div>
            );
        }else{
            return null;
        }
    }

    render(){
        let className = classNames(this.props.className, "cm-spin-wrap",{
            [`cm-spin-${this.props.type}`]: this.props.type
        });
        let containerClassName = classNames("cm-container", {
            "cm-spin-blur": this.state.spinning
        });
        let spin = this.renderSpin();
        return(
            <div className={className}>
                { spin }
                <div className={containerClassName}>{this.props.children}</div>
            </div>
        );
    }
}

export default {WaterSpin,CssSpin,SVGSpin};
