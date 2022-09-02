import React from 'react'
import {Modal, Button } from 'antd'
import Chess from "./chess"
import RighNav from './right-nav'
import {useState} from 'react'

const Game = () => {

    const initstate = {
            visible: false,
            text: "",
            history: [
                [
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
                ],
                ],
                blackIsNext: true,
                step: 0,
                stepExplain: [],
            }

    const [state, setState] = useState(initstate);

    const isLine = (arr, player, b) => {
        arr.forEach((item, index) => {
            if (!item) {
                arr[index] = 'null'
            }
        });
        return arr.join().replace(/,/g, '').includes(String(player).repeat(5));
    }

    const through = (step) => {
        let { blackIsNext } = this.state;
        step % 2 === 0 ? blackIsNext = true : blackIsNext = false;
        setState({
            ...state,
            step,
            blackIsNext
        });
    }

    const calculateWinner = (square, blackIsNext, [x, y]) => {
        let player = blackIsNext ? 1 : 2;
        //横向
        let line1 = square[x].slice(y - 4 < 0 ? 0 : y - 4, y + 5);
        let line1Win = isLine(line1, player, 1)
        //纵向
        let line2 = square.slice(x - 4 < 0 ? 0 : x - 4, x + 5);
        let line2Win = isLine(line2.map(el => el[y]), player)
        //从右往左斜
        let line3Win = Boolean;
        {
            let before = square.slice(x - 4 < 0 ? 0 : x - 4, x + 1);
            let beforeLine = before.map((item, index) => {
                return item[y + before.length - (index + 1)]
            })
            let after = square.slice(x + 1, x + 5);

            let afterLine = after.map((item, index) => {
                return item[y - (index + 1)]
            })
            line3Win = isLine([...beforeLine, ...afterLine], player)
        }
        //从左往右斜
        let line4Win = Boolean;
        {
            let before = square.slice(x - 4 < 0 ? 0 : x - 4, x + 1);
            let beforeLine = before.map((item, index) => {
                return item[y - before.length + index + 1]
            })
            let after = square.slice(x + 1, x + 5);
            let afterLine = after.map((item, index) => {
                return item[y + index + 1]
            })
            line4Win = isLine([...beforeLine, ...afterLine], player)
        }
        if (line1Win || line2Win || line3Win || line4Win) {
            setState({
                ...state,
                visible: true,
                text: blackIsNext ? '黑子获胜' : '白子获胜'
            })
            
        }
    }

    
    
    const handleClick = ([x, y]) => {
        let { history, blackIsNext, step, stepExplain } = state;
        let lastEl = JSON.parse(JSON.stringify(history[step]));
        if (lastEl[x][y]) return;
        lastEl[x][y] = blackIsNext ? 1 : 2;

        stepExplain.splice(state.step, stepExplain.length);
        history.splice(state.step + 1, history.length)

        stepExplain.push({
            step:history.length,
            explain: blackIsNext,
        })
        history.push(lastEl);
        setState({
            ...state,
            history,
            blackIsNext: !blackIsNext,
            step: ++step,
            stepExplain
        });
        calculateWinner(lastEl, blackIsNext, [x, y]);
    }

    const reset = () => {
        // console.log("state.visible重置前", state.visible);
        setState({
            history: [
                [[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]],
            ],
            visible: false,
            text: "",
            blackIsNext: true,
            step: 0,
            stepExplain: [],
    })
    // console.log("state.visible重置后", state.visible);

    }

    let { history, step, blackIsNext, stepExplain, visible, text } = state;

    return (
        <>
            <div className="game">
                <Chess className="chess" square={history[step]} onClick={xy => handleClick(xy)} />
                <RighNav stepExplain={stepExplain} className="history" blackIsNext={blackIsNext} history={history.length} onClick={i => through(i)}/>
                <Modal 
                onCancel={() => reset()}
                footer={
                    [<Button 
                        key='reset' 
                        type="primary" 
                        onClick={() => reset()}>
                            再来一次
                    </Button>]
                    }
                okText="再来一次"
                title="提示" 
                visible={visible}
                >
                    {text}
                </Modal>
                
            </div>
            

        </>
    )
}

export default Game;