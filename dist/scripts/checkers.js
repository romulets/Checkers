var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("Models/Player", ["require", "exports", "Models/Piece"], function (require, exports, Piece_1) {
    "use strict";
    var INITIAL__pieces_COUNT = 12;
    var Player = (function () {
        function Player(pieceColor) {
            this.forward = false;
            this._color = pieceColor;
            this.initPieces(pieceColor);
        }
        Player.prototype.initPieces = function (pieceColor) {
            this._pieces = [];
            for (var i = 0; i < INITIAL__pieces_COUNT; i++) {
                this._pieces.push(new Piece_1.default(this, pieceColor));
            }
        };
        Object.defineProperty(Player.prototype, "pieces", {
            get: function () {
                return this._pieces;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "color", {
            get: function () {
                return this._color;
            },
            enumerable: true,
            configurable: true
        });
        return Player;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Player;
});
define("Models/Piece", ["require", "exports"], function (require, exports) {
    "use strict";
    var Piece = (function () {
        function Piece(player, color) {
            this.isKing = false;
            this.span = document.createElement('span');
            this.span.classList.add('piece');
            this.span.style.backgroundColor = color;
            this._player = player;
        }
        Object.defineProperty(Piece.prototype, "element", {
            get: function () {
                return this.span;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Piece.prototype, "player", {
            get: function () {
                return this._player;
            },
            enumerable: true,
            configurable: true
        });
        return Piece;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Piece;
});
define("Exceptions/CheckersException", ["require", "exports"], function (require, exports) {
    "use strict";
    var CheckersException = (function () {
        function CheckersException(message) {
        }
        return CheckersException;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CheckersException;
});
define("Exceptions/InvalidPlayException", ["require", "exports", "Exceptions/CheckersException"], function (require, exports, CheckersException_1) {
    "use strict";
    var InvalidPlayException = (function (_super) {
        __extends(InvalidPlayException, _super);
        function InvalidPlayException() {
            var _this = _super.apply(this, arguments) || this;
            _this.name = 'InvalidPlayException';
            return _this;
        }
        return InvalidPlayException;
    }(CheckersException_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = InvalidPlayException;
});
define("Exceptions/NonEmptyPlaceException", ["require", "exports", "Exceptions/InvalidPlayException"], function (require, exports, InvalidPlayException_1) {
    "use strict";
    var NonEmptyPlaceException = (function (_super) {
        __extends(NonEmptyPlaceException, _super);
        function NonEmptyPlaceException(place) {
            var _this = _super.call(this, "The place " + place.toString() + " isn't empty") || this;
            _this.name = 'NonEmptyPlaceException';
            _this._place = place;
            return _this;
        }
        return NonEmptyPlaceException;
    }(InvalidPlayException_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = NonEmptyPlaceException;
});
define("Models/Place", ["require", "exports", "Exceptions/NonEmptyPlaceException", "Exceptions/InvalidPlayException"], function (require, exports, NonEmptyPlaceException_1, InvalidPlayException_2) {
    "use strict";
    var LIGHT_PLACE = '#CCC';
    var DARK_PLACE = '#AAA';
    var Place = (function () {
        function Place(playable) {
            this._piece = null;
            this._selected = false;
            this.playable = playable;
            this.td = document.createElement('td');
            this.td.style.backgroundColor = this.playable ? DARK_PLACE : LIGHT_PLACE;
        }
        Object.defineProperty(Place.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (selected) {
                this._selected = selected;
                var classList = this.td.classList;
                if (selected) {
                    classList.add('active');
                }
                else {
                    classList.remove('active');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Place.prototype, "piece", {
            get: function () {
                return this._piece;
            },
            set: function (piece) {
                if (!this.playable && piece !== null)
                    throw new InvalidPlayException_2.default('Place not playable');
                if (!this.isEmpty() && piece !== null)
                    throw new NonEmptyPlaceException_1.default(this);
                this._piece = piece;
                this.handleDOM();
            },
            enumerable: true,
            configurable: true
        });
        Place.prototype.handleDOM = function () {
            if (this.isEmpty()) {
                this.td.innerHTML = '';
            }
            else {
                this.element.appendChild(this.piece.element);
            }
        };
        Object.defineProperty(Place.prototype, "element", {
            get: function () {
                return this.td;
            },
            enumerable: true,
            configurable: true
        });
        Place.prototype.isEmpty = function () {
            return this._piece === null;
        };
        Place.prototype.isPlayable = function () {
            return this.playable;
        };
        Place.prototype.equalsTo = function (place) {
            if (place === null)
                return false;
            return this.X === place.X &&
                this.Y === place.Y;
        };
        return Place;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Place;
});
define("Actions/Play", ["require", "exports"], function (require, exports) {
    "use strict";
    var Play = (function () {
        function Play(from, to, board) {
            this.from = from;
            this.to = to;
            this.board = board;
        }
        Play.prototype.isEating = function () {
            return this.from !== null && this.to !== null &&
                !this.from.isEmpty() && !this.to.isEmpty();
        };
        Play.prototype.isEatingAFriendPiece = function () {
            return this.isEating() &&
                this.from.piece.player === this.to.piece.player;
        };
        Play.prototype.isEatingAnEnemyPiece = function () {
            return this.isEating() &&
                this.from.piece.player !== this.to.piece.player;
        };
        Play.prototype.canPlay = function () {
            if (this.to === null)
                return false;
            else if (this.isSelectingPiece())
                return true;
            else if (this.isUnselectingPiece())
                return true;
            else if (this.isEatingAFriendPiece())
                return false;
            else if (this.isAdvancingPlace())
                return true;
            else
                return false;
        };
        Play.prototype.isUnselectingPiece = function () {
            return this.from !== null && this.from.equalsTo(this.to);
        };
        Play.prototype.isSelectingPiece = function () {
            return this.from === null && !this.to.isEmpty();
        };
        Play.prototype.isAdvancingPlace = function () {
            var _a = this, from = _a.from, to = _a.to;
            if (from === null || from.isEmpty())
                return false;
            if (from.piece.isKing)
                return true;
            if (from.piece.player.forward) {
                return this.isMoveToTopRight() || this.isMoveToTopLeft();
            }
            else {
                return this.isMoveToBotRight() || this.isMoveToBotLeft();
            }
        };
        Play.prototype.isMoveToTopRight = function () {
            var _a = this, from = _a.from, to = _a.to;
            return from.X === to.X - 1 && from.Y === to.Y + 1;
        };
        Play.prototype.isMoveToTopLeft = function () {
            var _a = this, from = _a.from, to = _a.to;
            return from.X === to.X - 1 && from.Y === to.Y - 1;
        };
        Play.prototype.isMoveToBotRight = function () {
            var _a = this, from = _a.from, to = _a.to;
            return from.X === to.X + 1 && from.Y === to.Y + 1;
        };
        Play.prototype.isMoveToBotLeft = function () {
            var _a = this, from = _a.from, to = _a.to;
            return from.X === to.X + 1 && from.Y === to.Y - 1;
        };
        Play.prototype.performPlay = function () {
            if (!this.canPlay())
                return false;
            if (this.isSelectingPiece()) {
                this.to.selected = true;
            }
            else if (this.isUnselectingPiece()) {
                this.to.selected = false;
            }
            else if (this.isEating()) {
                return this.eat();
            }
            else if (this.isAdvancingPlace()) {
                this.advancePlace();
            }
            return true;
        };
        Play.prototype.eat = function () {
            var _a = this, from = _a.from, to = _a.to;
            var placeToEat = this.getPlaceToEat();
            var piece = from.piece;
            var eatedPiece = to.piece;
            from.piece = null;
            from.selected = false;
            to.piece = null;
            to.selected = false;
            placeToEat.piece = piece;
            return true;
        };
        Play.prototype.getPlaceToEat = function () {
            var to = this.to;
            var place;
            if (this.isMoveToTopRight()) {
                place = this.board[to.X + 1][to.Y - 1];
            }
            else if (this.isMoveToTopLeft()) {
                place = this.board[to.X + 1][to.Y + 1];
            }
            else if (this.isMoveToBotRight) {
                place = this.board[to.X - 1][to.Y - 1];
            }
            else {
                place = this.board[to.X - 1][to.Y + 1];
            }
            return place;
        };
        Play.prototype.advancePlace = function () {
            var piece = this.from.piece;
            this.to.selected = false;
            this.from.selected = false;
            this.from.piece = null;
            this.to.piece = piece;
        };
        return Play;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Play;
});
define("Models/GameController", ["require", "exports", "Actions/Play"], function (require, exports, Play_1) {
    "use strict";
    var GameController = (function () {
        function GameController(pl1, pl2) {
            this._currentPlayer = pl1;
            this.player1 = pl1;
            this.player2 = pl2;
            this.initElement();
            this.formatScoreElement();
        }
        GameController.prototype.initElement = function () {
            this.socoreElement = document.createElement('p');
            this.socoreElement.classList.add('checkers-score');
        };
        Object.defineProperty(GameController.prototype, "element", {
            get: function () {
                return this.socoreElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameController.prototype, "currentPlayer", {
            get: function () {
                return this._currentPlayer;
            },
            enumerable: true,
            configurable: true
        });
        GameController.prototype.isCurrentPlayer = function (player) {
            return this._currentPlayer === player;
        };
        GameController.prototype.changePlayer = function () {
            if (this.isCurrentPlayer(this.player1)) {
                this._currentPlayer = this.player2;
            }
            else {
                this._currentPlayer = this.player1;
            }
            this.formatScoreElement();
            return this.currentPlayer;
        };
        GameController.prototype.formatScoreElement = function () {
            var littlePiece = document.createElement('span');
            littlePiece.classList.add('little-piece');
            littlePiece.style.backgroundColor = this.currentPlayer.color;
            this.socoreElement.innerHTML = 'É a vez do jogador ';
            this.socoreElement.appendChild(littlePiece);
        };
        GameController.prototype.play = function (from, to, board) {
            var play = new Play_1.default(from, to, board);
            if (!to.isEmpty() && !this.isCurrentPlayer(to.piece.player) &&
                !play.isEatingAnEnemyPiece()) {
                return false;
            }
            var isAdvancingPlace = play.isAdvancingPlace();
            var isPlaySuccess = play.performPlay();
            if (isPlaySuccess && isAdvancingPlace) {
                this.changePlayer();
            }
            return isPlaySuccess;
        };
        return GameController;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = GameController;
});
define("Models/Board", ["require", "exports", "Models/Place", "Models/GameController"], function (require, exports, Place_1, GameController_1) {
    "use strict";
    var BOARD_WIDTH = 8;
    var BOARD_HEIGHT = 8;
    var Board = (function () {
        function Board(renderSelector, pl1, pl2) {
            this.boardMask = [];
            this.selectedPlace = null;
            this.setupGameController(pl1, pl2);
            this.setupBoard();
            this.setupPlayers(pl1, pl2);
            this.renderHTML(renderSelector);
        }
        Board.prototype.setupGameController = function (pl1, pl2) {
            this.gameController = new GameController_1.default(pl1, pl2);
        };
        Board.prototype.setupPlayers = function (pl1, pl2) {
            pl1.forward = true;
            this.initPieces(pl1);
            pl2.forward = false;
            this.initPieces(pl2);
        };
        Board.prototype.setupBoard = function () {
            var x, y, playable, tr, place;
            this.createTable();
            playable = false;
            for (x = 0; x < BOARD_WIDTH; x++) {
                tr = document.createElement('tr');
                this.boardMask[x] = [];
                for (y = 0; y < BOARD_HEIGHT; y++) {
                    place = this.createPlace(x, y, playable);
                    tr.appendChild(place.element);
                    playable = !playable;
                }
                playable = !playable;
                this.table.appendChild(tr);
            }
        };
        Board.prototype.initPieces = function (player) {
            var initialLine = player.forward ? 0 : 5;
            var place, x, y;
            var piecesInBoardCount = 0;
            for (x = initialLine; x < initialLine + 3; x++) {
                for (y = 0; y < BOARD_HEIGHT; y++) {
                    place = this.boardMask[x][y];
                    if (place.isPlayable()) {
                        place.piece = player.pieces[piecesInBoardCount];
                        piecesInBoardCount++;
                    }
                }
            }
        };
        Board.prototype.createPlace = function (x, y, playable) {
            var place = new Place_1.default(playable);
            place.X = x;
            place.Y = y;
            this.boardMask[x][y] = place;
            place.element.addEventListener('click', this.handleClick.bind(this, place));
            return place;
        };
        Board.prototype.handleClick = function (place) {
            var playSuccessful = this.gameController
                .play(this.selectedPlace, place, this.boardMask);
            if (!playSuccessful)
                return;
            if (place.selected) {
                this.selectedPlace = place;
            }
            else {
                this.selectedPlace = null;
            }
        };
        Board.prototype.createTable = function () {
            this.table = document.createElement('table');
            this.table.classList.add('checkers-board');
        };
        Board.prototype.renderHTML = function (renderSelector) {
            var rootElement = document.querySelector(renderSelector);
            rootElement.appendChild(this.gameController.element);
            rootElement.appendChild(this.table);
        };
        return Board;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Board;
});
define("Checkers", ["require", "exports", "Models/Board", "Models/Player"], function (require, exports, Board_1, Player_1) {
    "use strict";
    function init(selector, pl1Color, pl2Color) {
        var player1 = new Player_1.default(pl1Color);
        var player2 = new Player_1.default(pl2Color);
        var board = new Board_1.default(selector, player1, player2);
    }
    exports.init = init;
});
//# sourceMappingURL=checkers.js.map