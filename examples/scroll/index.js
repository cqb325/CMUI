import React from 'react';
import Events from '../../src/components/utils/Events';
import Scrollbar from './Scrollbar';

import './style.less';

class Comp extends React.Component {
    displayName = 'Comp';

    step = 40;

    static defaultProps = {
        barSize: 8,
        minThumb: 30
    };

    state = {
        horizontalThumbSize: 0,
        verticalThumbSize: 0,
        scrollTop: 0,
        scrollLeft: 0
    }

    componentDidMount () {
        this._isMounted = true;
        this.updateScrollSize();

        Events.on(this.wbox, 'scroll', this.spaceScroll);
        Events.on(this.hbox, 'scroll', this.xspaceScroll);
        Events.on(this.content, 'mousewheel', this.wheel);
        Events.on(this.content, 'DOMMouseScroll', this.wheel);
        Events.on(window, 'resize', this.windowResize);
    }

    componentWillUnmount () {
        this._isMounted = false;
        Events.off(this.wbox, 'scroll', this.spaceScroll);
        Events.off(this.hbox, 'scroll', this.xspaceScroll);
        Events.off(this.content, 'mousewheel', this.wheel);
        Events.off(window, 'resize', this.windowResize);
    }

    wheel = (e) => {
        if (e.preventDefault) {
            e.preventDefault();
        }
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        const delta = e.wheelDelta || -e.detail;
        if (delta > 0) {
            this.scrollUp();
        } else {
            this.scrollDown();
        }
    }

    spaceScroll = () => {
        this.content.scrollTop = this.wbox.scrollTop;
    }

    xspaceScroll = () => {
        this.content.scrollLeft = this.hbox.scrollLeft;
    }

    /**
     * 向上滚动
     */
    scrollUp () {
        let top = this.wbox.scrollTop;
        top = Math.max(top - this.step, 0);
        this.wbox.scrollTop = top;
        this.content.scrollTop = top;

        const body = this.content.firstChild;
        const bodyRect = body.getBoundingClientRect();
        const marginTop = this.wbox.getBoundingClientRect().height * top / bodyRect.height;
        this.setState({
            scrollTop: marginTop
        });
        this.emitChange(null, this.content.scrollTop);
    }

    /**
     * 向下滚动
     */
    scrollDown () {
        let top = this.wbox.scrollTop;
        top = top + this.step;

        const spacerHeight = this.wspacer.getBoundingClientRect().height;
        const boxHeight = this.content.getBoundingClientRect().height;

        this.wbox.scrollTop = top;
        if (top > spacerHeight - boxHeight) {
            top = spacerHeight - boxHeight;
        } else {
            top = this.wbox.scrollTop;
        }

        this.content.scrollTop = top;
        const body = this.content.firstChild;
        const bodyRect = body.getBoundingClientRect();
        const marginTop = this.wbox.getBoundingClientRect().height * this.content.scrollTop / bodyRect.height;
        this.setState({
            scrollTop: marginTop
        });
        this.emitChange(null, this.content.scrollTop);
    }

    windowResize = () => {
        this.updateScrollSize();
    }

    /**
     * 竖向滚动条滚动回调
     */
    onVerticalScrollChange = (scrollTop) => {
        const body = this.content.firstChild;
        const bodyRect = body.getBoundingClientRect();
        const height = this.wbox.getBoundingClientRect().height;
        const top = scrollTop / height * bodyRect.height;
        this.content.scrollTop = top;
        this.wbox.scrollTop = top;
        this.emitChange(null, top);
    }

    /**
     * 横向滚动条滚动回调
     */
    onHorizontalScrollChange = (scrollLeft) => {
        const body = this.content.firstChild;
        const bodyRect = body.getBoundingClientRect();
        const width = this.hbox.getBoundingClientRect().width;
        const left = scrollLeft / width * bodyRect.width;
        this.content.scrollLeft = left;
        this.wbox.scrollLeft = left;
        this.emitChange(left, null);
    }

    emitChange (left, top) {
        if (this.props.onScroll) {
            this.props.onScroll(left, top);
        }
    }

    updateScrollSize () {
        const body = this.content.firstChild;
        const bodyRect = body.getBoundingClientRect();
        this.wspacer.style.height = `${bodyRect.height}px`;
        this.hspacer.style.width = `${bodyRect.width}px`;

        const spacerWidth = this.wspacer.getBoundingClientRect().width;
        const spacerHeight = this.hspacer.getBoundingClientRect().height;
        const boxWidth = this.wbox.getBoundingClientRect().width;
        const boxHeight = this.hbox.getBoundingClientRect().height;
        const barwidth = this.props.barSize;
        const barHeight = this.props.barSize;
        if (boxWidth > spacerWidth) {
            this.content.style.right = `${barwidth}px`;
            this.hbox.style.right = `${barwidth}px`;
        } else {
            this.content.style.right = '0';
            this.hbox.style.right = 0;
        }
        if (boxHeight > spacerHeight) {
            this.content.style.bottom = `${barHeight}px`;
            this.wbox.style.bottom = `${barHeight}px`;
        } else {
            this.content.style.bottom = '0';
            this.wbox.style.right = 0;
        }

        const params = {};
        // 存在竖直滚动条
        if (boxWidth > spacerWidth) {
            const bh = this.wbox.getBoundingClientRect().height;
            const verticalThumbSize = bh * bh / bodyRect.height;
            params.verticalThumbSize = verticalThumbSize;
        } else {
            params.verticalThumbSize = 0;
        }
        if (boxHeight > spacerHeight) {
            const bw = this.hbox.getBoundingClientRect().width;
            const horizontalThumb = bw * bw / bodyRect.width;
            params.horizontalThumbSize = horizontalThumb;
        } else {
            params.horizontalThumbSize = 0;
        }

        if (this._isMounted) {
            this.setState(params);
        }
    }

    render () {
        return <div>
            <div style={{width: '50%', height: 600, background: '#fff', overflow: 'hidden', position: 'relative'}}>
                <div ref={(f) => this.wbox = f} style={{overflow: 'auto', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
                    <div ref={(f) => this.wspacer = f} style={{width: '100%'}}></div>
                </div>
                <div ref={(f) => this.hbox = f} style={{overflow: 'auto', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
                    <div ref={(f) => this.hspacer = f} style={{height: '100%'}}></div>
                </div>
                {
                    this.state.verticalThumbSize
                        ? <Scrollbar ref={(f) => this.verticalScroll = f} 
                            barSize={this.props.barSize}
                            thumbSize={this.state.verticalThumbSize}
                            scrollOffset={this.state.scrollTop}
                            style={{bottom: this.props.barSize}}
                            onChange={this.onVerticalScrollChange}
                        />
                        : null
                }
                {
                    this.state.horizontalThumbSize
                        ? <Scrollbar type='horizontal' ref={(f) => this.horizontalScroll = f} 
                            barSize={this.props.barSize}
                            thumbSize={this.state.horizontalThumbSize}
                            scrollOffset={this.state.scrollLeft}
                            style={{right: this.props.barSize}}
                            onChange={this.onHorizontalScrollChange}
                        />
                        : null
                }
                <div ref={(f) => this.content = f} style={{left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden', background: '#f7f7f7', position: 'absolute', zIndex: 10}}>
                    <div style={{display: 'inline-block'}}>
                        <div style={{width: 800}}>asdasd</div>
                        <div style={{width: 100, height: 100, overflow: 'scroll'}}>
                            <div style={{width: 200, height: 200}}></div>
                        </div>
                        <pre>{
                            `asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddA
                        asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                        asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd


                        asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                        sss
                        scrollDowns
                        scrollDown


                        scrollDown


                        scrollDown


                        scrollDown


                        scrollDown


                        scrollDown
                        scrollDown


                        scrollDown


                        scrollDown


                        scrollDown


                        scrollDown
                        scrollDown


                        scrollDown


                        scrollDown


                        scrollDown


                        scrollDown
                        scrollDown


                        scrollDown


                        scrollDown


                        scrollDown


                        scrollDown
                        `
                        }
                        </pre>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Comp;
