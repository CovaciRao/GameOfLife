import { render } from '@testing-library/react';
import React, { Component } from 'react';


interface State {
  matrix: boolean[][],
  gameState: boolean,
}

class Matrix extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      matrix: this.fillArray(),
      gameState: false,
    }
}

fillArray = () => {
  var newMatrix = new Array(10);
  for(let i=0;i<10;i++) {
    newMatrix[i] = new Array(10).fill(false);
  }
  return newMatrix;
}

handleStartGame = (ev: React.MouseEvent<HTMLButtonElement>) => {
  const currentState = this.state.gameState;
  this.setState({
    gameState: !currentState,
  })
}

handleClear  = (ev: React.MouseEvent<HTMLButtonElement>) => {
  this.setState({
    matrix: this.fillArray(),
  })
}

handleChange = (ev: React.MouseEvent<HTMLButtonElement>, indexColumn: number, indexRow: number) => {
  const matrixClone = this.state.matrix;
  matrixClone[indexRow][indexColumn] = !matrixClone[indexRow][indexColumn];
  this.getNeighbours(indexRow, indexColumn);
  this.setState({
    matrix: matrixClone.slice()
  })

}

getNeighbours(indexRow: number, indexColumn: number) {
  const m = this.state.matrix;
  const lengthColumn = 10;
  const lengthRow = 10;
  let neighbours = [];

  var leftTop  = false;
  var left = false;
  var lefBottom = false; 
  var top  = false;
  var bottom = false; 
  var rightTop = false; 
  var right = false;
  var rightBottom = false; 

  console.log(indexRow, indexColumn)

  if(indexRow > 0 && indexColumn > 0 && indexRow < lengthColumn-1 && indexColumn < lengthRow-1) {
    leftTop = m[indexRow-1][indexColumn-1];
    left= m[indexRow][indexColumn-1];
    lefBottom = m[indexRow+1][indexColumn-1];
    top = m[indexRow-1][indexColumn];
    bottom = m[indexRow+1][indexColumn];
    rightTop = m[indexRow-1][indexColumn+1];
    right = m[indexRow][indexColumn+1];
    rightBottom = m[indexRow+1][indexColumn+1];
  } else if(indexRow == 0 && indexColumn > 0 && indexColumn < lengthColumn-1) {
    left= m[indexRow][indexColumn-1];
    lefBottom = m[indexRow+1][indexColumn-1];
    bottom = m[indexRow+1][indexColumn];
    right = m[indexRow][indexColumn+1];
    rightBottom = m[indexRow+1][indexColumn+1];
  } else if(indexColumn == lengthRow - 1 && indexRow > 0 && indexRow < lengthColumn-1) {
    leftTop = m[indexRow-1][indexColumn-1];
    left= m[indexRow][indexColumn-1];
    lefBottom = m[indexRow+1][indexColumn-1];
    top = m[indexRow-1][indexColumn];
    bottom = m[indexRow+1][indexColumn];
  } else if(indexRow == lengthRow - 1 && indexColumn > 0 && indexColumn < lengthColumn-1) {
    leftTop = m[indexRow-1][indexColumn-1];
    left= m[indexRow][indexColumn-1];
    top = m[indexRow-1][indexColumn];
    rightTop = m[indexRow-1][indexColumn+1];
    right = m[indexRow][indexColumn+1];
  } else if(indexColumn == 0 && indexRow > 0 && indexRow < lengthColumn-1) {
    top = m[indexRow-1][indexColumn];
    bottom = m[indexRow+1][indexColumn];
    rightTop = m[indexRow-1][indexColumn+1];
    right = m[indexRow][indexColumn+1];
    rightBottom = m[indexRow+1][indexColumn+1];
  } else if(indexRow == 0 && indexColumn == 0) {
    bottom = m[indexRow+1][indexColumn];
    right = m[indexRow][indexColumn+1];
    rightBottom = m[indexRow+1][indexColumn+1];
  } else if(indexRow == 0 && indexColumn == lengthRow -1) {
    left= m[indexRow][indexColumn-1];
    lefBottom = m[indexRow+1][indexColumn-1];
    bottom = m[indexRow+1][indexColumn];
  } else if(indexRow == lengthRow -1 && indexColumn == lengthRow -1) {
    leftTop = m[indexRow-1][indexColumn-1];
    left= m[indexRow][indexColumn-1];
    top = m[indexRow-1][indexColumn];
  } else if(indexRow == lengthRow -1 && indexColumn == 0) {
    top = m[indexRow-1][indexColumn];
    rightTop = m[indexRow-1][indexColumn+1];
    right = m[indexRow][indexColumn+1];
  } 

  neighbours.push(top)
  neighbours.push(rightTop)
  neighbours.push(right)
  neighbours.push(rightBottom)
  neighbours.push(bottom)
  neighbours.push(lefBottom)
  neighbours.push(left)
  neighbours.push(leftTop)
  var nrNeighbours = 0;
  neighbours.forEach(element => {
    if(element){
      nrNeighbours++;
    }
  });
  return nrNeighbours;
}

setLifeCyle(indexRow: number, indexColumn: number) {
  let neighbours = this.getNeighbours(indexRow,indexColumn);
  const m = this.state.matrix;
  // if(m[indexRow][indexColumn] && (neighbours == 2 || neighbours == 3))
}

componentDidMount() {

  console.log(this.state.matrix)
}

  render() {
    return (
      <React.Fragment>
        <h1>Game of Life</h1>
        <button onClick={(ev) => this.handleStartGame(ev)}>{!this.state.gameState ? 'Starting' : 'Stop'}</button>
        <button onClick={(ev) => this.handleClear(ev)}>
          Clear
        </button>
        <div className="matrix"> 
          {this.state.matrix && this.state.matrix.map((itemRow, indexRow) => {
            return(
              <div className="rows">
                {itemRow.map((itemColumn, indexColumn)=> {
                  return(
                  <button className={!itemColumn ? 'cell' : 'cell cell-alive'} onClick={(ev) => this.handleChange(ev, indexColumn, indexRow)}>
                    <span>{!itemColumn ? '0' : '1'}</span>
                  </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Matrix;
