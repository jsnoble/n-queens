/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.getResults = function(allRows, n, board, hasConflict, func){

  if(allRows === n) {
   return  func();

  }

  for(var i = 0; i < n; i++){
    board.togglePiece(allRows, i);
    if(!board[hasConflict]()) {
     var result =  getResults (allRows+1, n, board,hasConflict, func);
    if(result){
      return result;
    }
    }
    board.togglePiece(allRows, i);
  }
};


window.findNRooksSolution = function(n) {
  var board = new Board({n:n});

  var finalSolution = getResults(0, n, board,'hasAnyRooksConflicts', function(){
   return _.map(board.rows(), function(row){
     return row.slice();
   }) ;
  });

  return finalSolution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var results = 0;
  var board = new Board({n:n});

  getResults(0, n, board,'hasAnyRooksConflicts', function(){
    results++;
  });

  return results;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});

  var finalSolution = getResults(0, n, board,'hasAnyQueensConflicts', function(){
    return _.map(board.rows(), function(row){
      return row.slice();
    }) ;
  }) || board.rows();

  return finalSolution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var results = 0;
  var board = new Board({n:n});

  getResults(0, n, board,'hasAnyQueensConflicts', function(){
    results++;
  });

  return results;

};
