import React, { useState } from 'react';

import Square from './square';


const Chess = ({square, onClick}) => {

    // 绘制棋盘
    const paintChess= () => {
        let chess = [];
        for (let i = 1; i <= 324; i++) {
            chess.push(<Square key={'square' + i} />)
        };
        // console.log("chess", chess);
        for (let i = 1; i <= 5; i++) {
            chess.push(<div key={'chess' + i} className={'dot dot' + i}></div>)
        }
        return chess;
    }
    
    // 落子的位置
    const paintPre = () => {
        let presuppose = [];
        for (let i = 0; i < 19; i++) {
            let presupposeRow = [];
            for (let j = 0; j < 19; j++) {
                let status = square[i][j];
                let className = status === 1 ? 'black-pieces' : status === 2 ? 'white-pieces' : '';
                presupposeRow.push(<div key={'presuppose-item' + j} className={"presuppose-item " + className} onClick={onClick.bind(null, [i, j])}></div>)
            };
            presuppose.push(<div key={'presuppose' + i} className="presuppose-row">{presupposeRow}</div>)
        }
        return presuppose;
    }


    return (
        <>
            <div className="chess-box">
                <div className="chess">
                    {paintChess()}
                </div>
                <div className="presuppose">
                    {paintPre()}
                </div>
            </div>
            
        </>
    )

}

export default Chess;