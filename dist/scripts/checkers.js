define("Models/Piece", ["require", "exports"], function (require, exports) {
    "use strict";
    var Piece = (function () {
        function Piece(color) {
            this.Y = 0;
            this.X = 0;
            this.color = color;
        }
        Piece.prototype.render = function () {
            return "<span data-color=\"" + this.color + "\" class=\"piece\"></span>";
        };
        return Piece;
    }());
    exports.__esModule = true;
    exports["default"] = Piece;
});
define("Models/Player", ["require", "exports", "Models/Piece"], function (require, exports, Piece_1) {
    "use strict";
    var INITIAL_PIECES_COUNT = 12;
    var Player = (function () {
        function Player(pieceColor) {
            this.initPieces(pieceColor);
        }
        Player.prototype.initPieces = function (pieceColor) {
            this.pieces = [];
            for (var i = 0; i < INITIAL_PIECES_COUNT; i++) {
                this.pieces.push(new Piece_1["default"](pieceColor));
            }
        };
        return Player;
    }());
    exports.__esModule = true;
    exports["default"] = Player;
});
define("Models/Board", ["require", "exports"], function (require, exports) {
    "use strict";
    var Board = (function () {
        function Board(renderSelector, pl1, pl2) {
            this.boardMaks = [];
            this.renderHTML(renderSelector);
        }
        Board.prototype.renderHTML = function (renderSelector) {
            var table = this.getTable();
            document.querySelector(renderSelector).appendChild(table);
        };
        Board.prototype.getTable = function () {
            var table = document.createElement('table');
            table.classList.add('checkers-board');
            return table;
        };
        return Board;
    }());
    exports.__esModule = true;
    exports["default"] = Board;
});
define("Checkers", ["require", "exports", "Models/Board", "Models/Player"], function (require, exports, Board_1, Player_1) {
    "use strict";
    function init(selector, pl1Color, pl2Color) {
        var player1 = new Player_1["default"](pl1Color);
        var player2 = new Player_1["default"](pl2Color);
        var board = new Board_1["default"](selector, player1, player2);
    }
    exports.init = init;
});
//# sourceMappingURL=checkers.js.map