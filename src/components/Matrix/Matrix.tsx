import { render } from '@testing-library/react';
import React, { Component } from 'react';


interface State {
  matrix: boolean[][];
}

class Matrix extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      matrix: this.fillArray(),
    }
}

fillArray = () => {
  var newMatrix = new Array(10);
  for(let i=0;i<10;i++) {
    newMatrix[i] = new Array(10).fill(false);
  }
  return newMatrix;
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
  }

  neighbours.push(top)
  neighbours.push(rightTop)
  neighbours.push(right)
  neighbours.push(rightBottom)
  neighbours.push(bottom)
  neighbours.push(lefBottom)
  neighbours.push(left)
  neighbours.push(leftTop)

  console.log(neighbours)
  console.log('row',lengthColumn)
  console.log('col',lengthRow)


  // if(indexRow == 0) {
  //   var left= m[indexRow][indexColumn-1];
  //   var lefBottom = m[indexRow+1][indexColumn-1];
  //   var bottom = m[indexRow+1][indexColumn];
  //   var right = m[indexRow][indexColumn+1];
  //   var rightBottom = m[indexRow+1][indexColumn+1];
  // }

  // if(indexRow == lengthColumn - 1) {
  //   var leftTop = m[indexRow-1][indexColumn-1];
  //   var left= m[indexRow][indexColumn-1];
  //   var top = m[indexRow-1][indexColumn];
  //   var rightTop = m[indexRow+1][indexColumn+1];
  //   var right = m[indexRow][indexColumn+1];
  // }

  // if(indexColumn == 0) {
  //   var top = m[indexRow-1][indexColumn];
  //   var bottom = m[indexRow+1][indexColumn];
  //   var rightTop = m[indexRow+1][indexColumn+1];
  //   var right = m[indexRow][indexColumn+1];
  //   var rightBottom = m[indexRow+1][indexColumn+1];
  // }

  // if(indexColumn == lengthRow - 1) {
  //   var leftTop = m[indexRow-1][indexColumn-1];
  //   var left= m[indexRow][indexColumn-1];
  //   var lefBottom = m[indexRow+1][indexColumn-1];
  //   var top = m[indexRow-1][indexColumn];
  //   var bottom = m[indexRow+1][indexColumn];
  // }



}

componentDidMount() {

  console.log(this.state.matrix)
}

  render() {
    return (
      <React.Fragment>
        <h1>Game of Life</h1>
        <div className="matrix"> 
          {this.state.matrix && this.state.matrix.map((itemRow, indexRow) => {
            return(
              <div className="rows">
                {itemRow.map((itemColumn, indexColumn)=> {
                  return(
                  <button className="cell" onClick={(ev) => this.handleChange(ev, indexColumn, indexRow)}>
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
