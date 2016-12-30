var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("Actions/Action", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("Models/Player", ["require", "exports", "Models/Piece"], function (require, exports, Piece_1) {
    "use strict";
    var INITIAL_PIECES_COUNT = 12;
    var Player = (function () {
        function Player(piecesColor) {
            this.moveFoward = false;
            this._color = piecesColor;
            this.initPieces(piecesColor);
        }
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
        Player.prototype.initPieces = function (piecesColor) {
            this._pieces = [];
            for (var i = 0; i < INITIAL_PIECES_COUNT; i++) {
                this._pieces.push(new Piece_1.default(this, piecesColor));
            }
        };
        return Player;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Player;
});
define("Models/Piece", ["require", "exports"], function (require, exports) {
    "use strict";
    var Piece = (function () {
        function Piece(player, color) {
            this.createDOMElement(color);
            this._player = player;
            this.isQueen = false;
            this.inGame = true;
        }
        Object.defineProperty(Piece.prototype, "isQueen", {
            get: function () {
                return this._isQueen;
            },
            set: function (isQueen) {
                this._isQueen = isQueen;
                if (isQueen) {
                    this.element.classList.add('queen');
                }
                else {
                    this.element.classList.remove('queen');
                }
            },
            enumerable: true,
            configurable: true
        });
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
        Piece.prototype.createDOMElement = function (color) {
            this.span = document.createElement('span');
            this.span.classList.add('piece');
            this.span.style.backgroundColor = color;
        };
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
            this.createDOMElement();
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
                if (piece !== null) {
                    if (!this.playable)
                        throw new InvalidPlayException_2.default('Place not playable');
                    if (!this.isEmpty())
                        throw new NonEmptyPlaceException_1.default(this);
                    piece.X = this.X;
                    piece.Y = this.Y;
                }
                this._piece = piece;
                this.appendsPieceElement();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Place.prototype, "element", {
            get: function () {
                return this.td;
            },
            enumerable: true,
            configurable: true
        });
        Place.prototype.createDOMElement = function () {
            this.td = document.createElement('td');
            this.td.style.backgroundColor = this.playable ? DARK_PLACE : LIGHT_PLACE;
        };
        Place.prototype.appendsPieceElement = function () {
            if (this.isEmpty()) {
                this.td.innerHTML = '';
            }
            else {
                this.element.appendChild(this.piece.element);
            }
        };
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
define("Actions/Helpers", ["require", "exports"], function (require, exports) {
    "use strict";
    function isEating(from, to) {
        return from !== null && to !== null &&
            !from.isEmpty() && !to.isEmpty();
    }
    exports.isEating = isEating;
    function isEatingAFriendPiece(from, to) {
        return isEating(from, to) &&
            from.piece.player === to.piece.player &&
            !from.equalsTo(to);
    }
    exports.isEatingAFriendPiece = isEatingAFriendPiece;
    function isEatingAnEnemyPiece(from, to) {
        return isEating(from, to) &&
            from.piece.player !== to.piece.player &&
            !from.equalsTo(to);
    }
    exports.isEatingAnEnemyPiece = isEatingAnEnemyPiece;
    function isMoveToTopRight(from, to) {
        return from.X === to.X - 1 && from.Y === to.Y + 1;
    }
    exports.isMoveToTopRight = isMoveToTopRight;
    function isMoveToTopLeft(from, to) {
        return from.X === to.X - 1 && from.Y === to.Y - 1;
    }
    exports.isMoveToTopLeft = isMoveToTopLeft;
    function isMoveToBotRight(from, to) {
        return from.X === to.X + 1 && from.Y === to.Y + 1;
    }
    exports.isMoveToBotRight = isMoveToBotRight;
    function isMoveToBotLeft(from, to) {
        return from.X === to.X + 1 && from.Y === to.Y - 1;
    }
    exports.isMoveToBotLeft = isMoveToBotLeft;
    function isAdvancingPlace(from, to) {
        if (from === null || from.isEmpty() || from.equalsTo(to))
            return false;
        if (from.piece.isQueen) {
            return isMoveToTopRight(from, to) || isMoveToTopLeft(from, to) ||
                isMoveToBotRight(from, to) || isMoveToBotLeft(from, to);
        }
        else if (from.piece.player.moveFoward) {
            return isMoveToTopRight(from, to) || isMoveToTopLeft(from, to);
        }
        else {
            return isMoveToBotRight(from, to) || isMoveToBotLeft(from, to);
        }
    }
    exports.isAdvancingPlace = isAdvancingPlace;
});
define("Actions/EatAction", ["require", "exports", "Exceptions/InvalidPlayException", "Exceptions/NonEmptyPlaceException", "Actions/Helpers"], function (require, exports, InvalidPlayException_3, NonEmptyPlaceException_2, Helpers_1) {
    "use strict";
    var EatAction = (function () {
        function EatAction(from, to, board) {
            this.OnEat = null;
            this.from = from;
            this.to = to;
            this.board = board;
        }
        EatAction.prototype.canPerform = function () {
            var _a = this, from = _a.from, to = _a.to;
            return Helpers_1.isEating(from, to) && Helpers_1.isAdvancingPlace(from, to);
        };
        EatAction.prototype.perform = function () {
            var placeToEat;
            try {
                placeToEat = this.getPlaceToEat();
                if (!placeToEat.isEmpty())
                    throw new NonEmptyPlaceException_2.default(placeToEat);
            }
            catch (ex) {
                if (ex instanceof InvalidPlayException_3.default)
                    return false;
            }
            return this.eat(placeToEat);
        };
        EatAction.prototype.eat = function (placeToEat) {
            var _a = this, from = _a.from, to = _a.to;
            var piece = from.piece;
            var eatedPiece = to.piece;
            eatedPiece.inGame = false;
            from.piece = null;
            from.selected = false;
            to.piece = null;
            to.selected = false;
            placeToEat.piece = piece;
            this.fireOnEat(placeToEat);
            return true;
        };
        EatAction.prototype.fireOnEat = function (newTo) {
            if (this.OnEat !== null) {
                this.OnEat(newTo);
            }
        };
        EatAction.prototype.getPlaceToEat = function () {
            var place;
            try {
                place = this.indentifyPlace();
            }
            catch (ex) {
                if (ex instanceof TypeError) {
                    place = undefined;
                }
            }
            if (place === undefined) {
                throw new InvalidPlayException_3.default("Place doesn't exists");
            }
            return place;
        };
        EatAction.prototype.indentifyPlace = function () {
            var _a = this, from = _a.from, to = _a.to;
            var place;
            if (Helpers_1.isMoveToTopRight(from, to)) {
                place = this.board[to.X + 1][to.Y - 1];
            }
            else if (Helpers_1.isMoveToTopLeft(from, to)) {
                place = this.board[to.X + 1][to.Y + 1];
            }
            else if (Helpers_1.isMoveToBotRight(from, to)) {
                place = this.board[to.X - 1][to.Y - 1];
            }
            else {
                place = this.board[to.X - 1][to.Y + 1];
            }
            return place;
        };
        return EatAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = EatAction;
});
define("Actions/SelectAction", ["require", "exports"], function (require, exports) {
    "use strict";
    var UnselectAction = (function () {
        function UnselectAction(from, to) {
            this.from = from;
            this.to = to;
        }
        UnselectAction.prototype.canPerform = function () {
            var _a = this, from = _a.from, to = _a.to;
            return from !== null && from.equalsTo(to);
        };
        UnselectAction.prototype.perform = function () {
            this.to.selected = false;
            return true;
        };
        return UnselectAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = UnselectAction;
});
define("Actions/UnselectAction", ["require", "exports"], function (require, exports) {
    "use strict";
    var SelectAction = (function () {
        function SelectAction(from, to) {
            this.from = from;
            this.to = to;
        }
        SelectAction.prototype.canPerform = function () {
            var _a = this, from = _a.from, to = _a.to;
            return from === null && !to.isEmpty();
        };
        SelectAction.prototype.perform = function () {
            this.to.selected = true;
            return true;
        };
        return SelectAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SelectAction;
});
define("consts", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.BOARD_WIDTH = 8;
    exports.BOARD_HEIGHT = 8;
});
define("Actions/CoronationAction", ["require", "exports", "consts"], function (require, exports, consts_1) {
    "use strict";
    var CoronationAction = (function () {
        function CoronationAction(to) {
            this.to = to;
        }
        CoronationAction.prototype.canPerform = function () {
            var to = this.to;
            if (this.doesntNeedSeeCoordinate())
                return false;
            var piece = to.piece;
            var player = piece.player;
            return (player.moveFoward && piece.X === consts_1.BOARD_HEIGHT - 1) ||
                (!player.moveFoward && piece.X === 0);
        };
        CoronationAction.prototype.doesntNeedSeeCoordinate = function () {
            var to = this.to;
            return to === null || to.isEmpty() || to.piece.isQueen;
        };
        CoronationAction.prototype.perform = function () {
            this.to.piece.isQueen = true;
            return true;
        };
        return CoronationAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CoronationAction;
});
define("Actions/PlayAction", ["require", "exports", "Actions/EatAction", "Actions/AdvanceAction", "Actions/SelectAction", "Actions/UnselectAction", "Actions/CoronationAction", "Actions/Helpers"], function (require, exports, EatAction_1, AdvanceAction_1, SelectAction_1, UnselectAction_1, CoronationAction_1, Helpers_2) {
    "use strict";
    var PlayAction = (function () {
        function PlayAction(from, to, board) {
            this._from = from;
            this._to = to;
            this._board = board;
        }
        Object.defineProperty(PlayAction.prototype, "from", {
            get: function () {
                return this._from;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayAction.prototype, "to", {
            get: function () {
                return this._to;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayAction.prototype, "board", {
            get: function () {
                return this._board;
            },
            enumerable: true,
            configurable: true
        });
        PlayAction.prototype.canPerform = function () {
            if (this.to === null)
                return false;
            else if (Helpers_2.isEatingAFriendPiece(this.from, this.to))
                return false;
            else
                return true;
        };
        PlayAction.prototype.perform = function () {
            if (!this.canPerform())
                return false;
            var perfomedSuccessfully = this.performActions();
            this.performAfterActions();
            return perfomedSuccessfully;
        };
        PlayAction.prototype.performActions = function () {
            var action, i;
            var actions = this.getSequencedActionList();
            for (i = 0; i < actions.length; i++) {
                action = actions[i];
                if (action.canPerform())
                    return action.perform();
            }
            return false;
        };
        PlayAction.prototype.getSequencedActionList = function () {
            var _a = this, from = _a.from, to = _a.to, board = _a.board;
            return [
                new SelectAction_1.default(from, to),
                new UnselectAction_1.default(from, to),
                this.getEatAction(from, to, board),
                new AdvanceAction_1.default(from, to),
            ];
        };
        PlayAction.prototype.getEatAction = function (from, to, board) {
            var _this = this;
            var eat = new EatAction_1.default(from, to, board);
            eat.OnEat = function (newTo) { return _this._to = newTo; };
            return eat;
        };
        PlayAction.prototype.performAfterActions = function () {
            var action, i;
            var actions = this.getAfterActionList();
            for (i = 0; i < actions.length; i++) {
                action = actions[i];
                if (action.canPerform()) {
                    action.perform();
                }
            }
        };
        PlayAction.prototype.getAfterActionList = function () {
            var to = this.to;
            return [
                new CoronationAction_1.default(to)
            ];
        };
        return PlayAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PlayAction;
});
define("Actions/AdvanceAction", ["require", "exports", "Actions/Helpers"], function (require, exports, Helpers_3) {
    "use strict";
    var AdvanceAction = (function () {
        function AdvanceAction(from, to) {
            this.from = from;
            this.to = to;
        }
        AdvanceAction.prototype.canPerform = function () {
            return Helpers_3.isAdvancingPlace(this.from, this.to);
        };
        AdvanceAction.prototype.perform = function () {
            var _a = this, from = _a.from, to = _a.to;
            var piece = from.piece;
            to.selected = false;
            from.selected = false;
            from.piece = null;
            to.piece = piece;
            return true;
        };
        return AdvanceAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = AdvanceAction;
});
define("Models/Mediator", ["require", "exports", "Actions/PlayAction", "Actions/Helpers"], function (require, exports, PlayAction_1, Helpers_4) {
    "use strict";
    var Mediator = (function () {
        function Mediator(pl1, pl2) {
            this._currentPlayer = pl1;
            this.player1 = pl1;
            this.player2 = pl2;
            this.createDOMElement();
            this.formatScoreElement();
        }
        Object.defineProperty(Mediator.prototype, "element", {
            get: function () {
                return this.socoreElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mediator.prototype, "currentPlayer", {
            get: function () {
                return this._currentPlayer;
            },
            enumerable: true,
            configurable: true
        });
        Mediator.prototype.play = function (from, to, board) {
            var play = new PlayAction_1.default(from, to, board);
            if (!this.canPlay(play))
                return false;
            return this.perform(play);
        };
        Mediator.prototype.canPlay = function (play) {
            var from = play.from, to = play.to;
            return to.isEmpty() ||
                this.isCurrentPlayer(to.piece.player) ||
                Helpers_4.isEatingAnEnemyPiece(from, to);
        };
        Mediator.prototype.perform = function (play) {
            var from = play.from, to = play.to;
            var advancingPlace = Helpers_4.isAdvancingPlace(from, to);
            var playSuccessful = play.perform();
            if (playSuccessful && advancingPlace) {
                this.alternateBetweenPlayers();
            }
            return playSuccessful;
        };
        Mediator.prototype.isCurrentPlayer = function (player) {
            return this._currentPlayer === player;
        };
        Mediator.prototype.alternateBetweenPlayers = function () {
            this.changePlayer();
            this.formatScoreElement();
            return this.currentPlayer;
        };
        Mediator.prototype.changePlayer = function () {
            if (this.isCurrentPlayer(this.player1)) {
                this._currentPlayer = this.player2;
            }
            else {
                this._currentPlayer = this.player1;
            }
        };
        Mediator.prototype.createDOMElement = function () {
            this.socoreElement = document.createElement('p');
            this.socoreElement.classList.add('checkers-score');
        };
        Mediator.prototype.formatScoreElement = function () {
            var littlePiece = this.getLittlePiceElement();
            this.socoreElement.innerHTML = 'É a vez do jogador ';
            this.socoreElement.appendChild(littlePiece);
        };
        Mediator.prototype.getLittlePiceElement = function () {
            var littlePiece = document.createElement('span');
            littlePiece.classList.add('little-piece');
            littlePiece.style.backgroundColor = this.currentPlayer.color;
            return littlePiece;
        };
        return Mediator;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Mediator;
});
define("Models/Board", ["require", "exports", "Models/Place", "Models/Mediator", "consts"], function (require, exports, Place_1, Mediator_1, consts_2) {
    "use strict";
    var Board = (function () {
        function Board(renderSelector, pl1, pl2) {
            this.setupMediator(pl1, pl2);
            this.setupBoard();
            this.setupPlayers(pl1, pl2);
            this.renderHTML(renderSelector);
        }
        Board.prototype.setupMediator = function (pl1, pl2) {
            this.mediator = new Mediator_1.default(pl1, pl2);
        };
        Board.prototype.setupPlayers = function (pl1, pl2) {
            pl1.moveFoward = true;
            pl2.moveFoward = false;
            this.initPieces(pl1);
            this.initPieces(pl2);
        };
        Board.prototype.setupBoard = function () {
            var x, y, playable, tr, place;
            playable = false;
            this.boardMask = [];
            this.selectedPlace = null;
            this.createTableDOMElement();
            for (x = 0; x < consts_2.BOARD_WIDTH; x++) {
                tr = document.createElement('tr');
                this.boardMask[x] = [];
                for (y = 0; y < consts_2.BOARD_HEIGHT; y++) {
                    place = this.createPlace(x, y, playable);
                    playable = !playable;
                    tr.appendChild(place.element);
                }
                this.table.appendChild(tr);
                playable = !playable;
            }
        };
        Board.prototype.initPieces = function (player) {
            var place, x, y;
            var initialLine = player.moveFoward ? 0 : 5;
            var piecesInBoardCount = 0;
            for (x = initialLine; x < initialLine + 3; x++) {
                for (y = 0; y < consts_2.BOARD_HEIGHT; y++) {
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
            place.element.addEventListener('click', this.play.bind(this, place));
            return place;
        };
        Board.prototype.play = function (place) {
            var couldPlay = this.mediator.play(this.selectedPlace, place, this.boardMask);
            if (!couldPlay)
                return;
            if (place.selected) {
                this.selectedPlace = place;
            }
            else {
                this.selectedPlace = null;
            }
        };
        Board.prototype.createTableDOMElement = function () {
            this.table = document.createElement('table');
            this.table.classList.add('checkers-board');
        };
        Board.prototype.renderHTML = function (renderSelector) {
            var rootElement = document.querySelector(renderSelector);
            rootElement.appendChild(this.mediator.element);
            rootElement.appendChild(this.table);
        };
        return Board;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Board;
});
define("Checkers", ["require", "exports", "Models/Board", "Models/Player"], function (require, exports, Board_1, Player_1) {
    "use strict";
    function startGame(elementSelector, player1Color, player2Color) {
        var player1 = new Player_1.default(player1Color);
        var player2 = new Player_1.default(player2Color);
        var board = new Board_1.default(elementSelector, player1, player2);
    }
    exports.startGame = startGame;
});
//# sourceMappingURL=checkers.js.map