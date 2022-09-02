import React, {useState} from 'react'

const RighNav = ({stepExplain, blackIsNext, history, onClick}) => {

    const [state, setState] = useState({
        btn: []
    });

    const renderHistory = (stepExplain) => {
        let btns = [];
        for (let i = 0; i < stepExplain.length; i++) {
            btns.push(
                <div key={'history' + i}>
                    <div className="step">
                        {stepExplain[i].step}
                    </div>
                    {stepExplain[i].explain ? <div className="presuppose-item black-pieces presuppose-item-small"></div> : <div className="presuppose-item white-pieces presuppose-item-small"></div>}
                    &nbsp;
                    <span>落子</span> &nbsp;
                    <div onClick={() => { onClick(i + 1) }} className="step-button">Go</div>
                </div>
            )
        }
        return btns;
    }

    return (
            <div className="history">
                <header className="history-header">历史记录</header>
                <div className='history-content'>
                {renderHistory(stepExplain)}
                </div>
            </div>
        )
}
export default RighNav;
