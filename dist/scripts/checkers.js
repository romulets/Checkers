var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
define("Models/Place", ["require", "exports", "Exceptions/InvalidPlayException", "Exceptions/NonEmptyPlaceException"], function (require, exports, InvalidPlayException_2, NonEmptyPlaceException_1) {
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
define("Models/PlayStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    var PlayStatus;
    (function (PlayStatus) {
        PlayStatus[PlayStatus["INVALID"] = 0] = "INVALID";
        PlayStatus[PlayStatus["FINISHED"] = 1] = "FINISHED";
        PlayStatus[PlayStatus["STILL_HAPPENING"] = 2] = "STILL_HAPPENING";
    })(PlayStatus = exports.PlayStatus || (exports.PlayStatus = {}));
});
define("Models/PlayResponse", ["require", "exports", "Models/PlayStatus"], function (require, exports, PlayStatus_1) {
    "use strict";
    var PlayResponse = (function () {
        function PlayResponse(playStatus, selectedPlace) {
            this._playStatus = playStatus;
            this._selectedPlace = selectedPlace || null;
        }
        Object.defineProperty(PlayResponse.prototype, "selectedPlace", {
            get: function () {
                return this._selectedPlace;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayResponse.prototype, "playStatus", {
            get: function () {
                return this._playStatus;
            },
            enumerable: true,
            configurable: true
        });
        PlayResponse.invalid = function () {
            return new PlayResponse(PlayStatus_1.PlayStatus.INVALID);
        };
        PlayResponse.finished = function () {
            return new PlayResponse(PlayStatus_1.PlayStatus.FINISHED);
        };
        PlayResponse.stillHappening = function (selectedPlace) {
            return new PlayResponse(PlayStatus_1.PlayStatus.STILL_HAPPENING, selectedPlace);
        };
        return PlayResponse;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PlayResponse;
});
define("Actions/Action", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("Actions/helpers", ["require", "exports", "Exceptions/InvalidPlayException"], function (require, exports, InvalidPlayException_3) {
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
    function indentifyNextPlaceAfterEat(from, to, board) {
        var place;
        try {
            place = getPlaceAfterEat(from, to, board);
        }
        catch (ex) {
            if (ex instanceof TypeError) {
                place = undefined;
            }
        }
        if (place === undefined || !place.isEmpty()) {
            throw new InvalidPlayException_3.default("Place doesn't exists");
        }
        return place;
    }
    exports.indentifyNextPlaceAfterEat = indentifyNextPlaceAfterEat;
    function getPlaceAfterEat(from, to, board) {
        var place;
        if (isMoveToTopRight(from, to)) {
            place = board[to.X + 1][to.Y - 1];
        }
        else if (isMoveToTopLeft(from, to)) {
            place = board[to.X + 1][to.Y + 1];
        }
        else if (isMoveToBotRight(from, to)) {
            place = board[to.X - 1][to.Y - 1];
        }
        else {
            place = board[to.X - 1][to.Y + 1];
        }
        return place;
    }
});
define("Actions/AdvanceAction", ["require", "exports", "Models/PlayResponse", "Actions/helpers"], function (require, exports, PlayResponse_1, helpers_1) {
    "use strict";
    var AdvanceAction = (function () {
        function AdvanceAction(from, to) {
            this.from = from;
            this.to = to;
        }
        AdvanceAction.prototype.canPerform = function () {
            return helpers_1.isAdvancingPlace(this.from, this.to);
        };
        AdvanceAction.prototype.perform = function () {
            var _a = this, from = _a.from, to = _a.to;
            var piece = from.piece;
            to.selected = false;
            from.selected = false;
            from.piece = null;
            to.piece = piece;
            return PlayResponse_1.default.finished();
        };
        return AdvanceAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = AdvanceAction;
});
define("Actions/ComboPlayAction", ["require", "exports", "Models/PlayResponse", "Exceptions/InvalidPlayException", "Actions/helpers"], function (require, exports, PlayResponse_2, InvalidPlayException_4, helpers_2) {
    "use strict";
    var ComboPlayAction = (function () {
        function ComboPlayAction(to, board, isAfterEat) {
            this.to = to;
            this.isAfterEat = isAfterEat;
            this.board = board;
        }
        ComboPlayAction.prototype.perform = function () {
            this.to.selected = true;
            this.fireOnDiscoverHasMoreMovies();
            return PlayResponse_2.default.stillHappening(this.to);
        };
        ComboPlayAction.prototype.fireOnDiscoverHasMoreMovies = function () {
            if (this.onDiscoverHasMoreMovies) {
                this.onDiscoverHasMoreMovies();
            }
        };
        ComboPlayAction.prototype.canPerform = function () {
            return this.isAfterEat && this.claimComboPlay();
        };
        ComboPlayAction.prototype.claimComboPlay = function () {
            if (this.to.isEmpty())
                return false;
            var piece = this.to.piece;
            if (piece.isQueen)
                return this.claimComboForQueen();
            if (piece.player.moveFoward)
                return this.claimComboForForwarder();
            else
                return this.claimComboForBackwarder();
        };
        ComboPlayAction.prototype.claimComboForQueen = function () {
            return this.claimComboForForwarder() || this.claimComboForBackwarder();
        };
        ComboPlayAction.prototype.claimComboForForwarder = function () {
            var _a = this.to, X = _a.X, Y = _a.Y;
            return this.canEatAt(X + 1, Y - 1) || this.canEatAt(X + 1, Y + 1);
        };
        ComboPlayAction.prototype.claimComboForBackwarder = function () {
            var _a = this.to, X = _a.X, Y = _a.Y;
            return this.canEatAt(X - 1, Y + 1) || this.canEatAt(X - 1, Y - 1);
        };
        ComboPlayAction.prototype.canEatAt = function (x, y) {
            try {
                return this.eatAt(x, y);
            }
            catch (ex) {
                if (ex instanceof InvalidPlayException_4.default || ex instanceof TypeError) {
                    return false;
                }
            }
        };
        ComboPlayAction.prototype.eatAt = function (x, y) {
            var intendedNextPlace, placeAfterEat;
            intendedNextPlace = this.board[x][y];
            placeAfterEat = helpers_2.indentifyNextPlaceAfterEat(this.to, intendedNextPlace, this.board);
            return !intendedNextPlace.isEmpty() &&
                helpers_2.isEatingAnEnemyPiece(this.to, intendedNextPlace);
        };
        return ComboPlayAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ComboPlayAction;
});
define("consts", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.BOARD_WIDTH = 8;
    exports.BOARD_HEIGHT = 8;
});
define("Actions/CrownQueenAction", ["require", "exports", "consts", "Models/PlayResponse"], function (require, exports, consts_1, PlayResponse_3) {
    "use strict";
    var CrownQueenAction = (function () {
        function CrownQueenAction(to) {
            this.to = to;
        }
        CrownQueenAction.prototype.canPerform = function () {
            var to = this.to;
            if (this.doesntNeedSeeCoordinate())
                return false;
            var piece = to.piece;
            var player = piece.player;
            return (player.moveFoward && piece.X === consts_1.BOARD_HEIGHT - 1) ||
                (!player.moveFoward && piece.X === 0);
        };
        CrownQueenAction.prototype.doesntNeedSeeCoordinate = function () {
            var to = this.to;
            return to === null || to.isEmpty() || to.piece.isQueen;
        };
        CrownQueenAction.prototype.perform = function () {
            this.to.piece.isQueen = true;
            return PlayResponse_3.default.finished();
        };
        return CrownQueenAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CrownQueenAction;
});
define("Actions/EatAction", ["require", "exports", "Models/PlayResponse", "Exceptions/InvalidPlayException", "Exceptions/NonEmptyPlaceException", "Actions/helpers"], function (require, exports, PlayResponse_4, InvalidPlayException_5, NonEmptyPlaceException_2, helpers_3) {
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
            return helpers_3.isEating(from, to) && helpers_3.isAdvancingPlace(from, to);
        };
        EatAction.prototype.perform = function () {
            var placeToEat;
            try {
                placeToEat = helpers_3.indentifyNextPlaceAfterEat(this.from, this.to, this.board);
                if (!placeToEat.isEmpty())
                    throw new NonEmptyPlaceException_2.default(placeToEat);
            }
            catch (ex) {
                if (ex instanceof InvalidPlayException_5.default)
                    return PlayResponse_4.default.invalid();
            }
            if (this.eat(placeToEat)) {
                return PlayResponse_4.default.finished();
            }
            else {
                return PlayResponse_4.default.invalid();
            }
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
        return EatAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = EatAction;
});
define("Actions/SelectAction", ["require", "exports", "Models/PlayResponse"], function (require, exports, PlayResponse_5) {
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
            return PlayResponse_5.default.stillHappening(this.to);
        };
        return SelectAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SelectAction;
});
define("Actions/UnselectAction", ["require", "exports", "Models/PlayResponse"], function (require, exports, PlayResponse_6) {
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
            return PlayResponse_6.default.stillHappening();
        };
        return UnselectAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = UnselectAction;
});
define("Actions/PlayAction", ["require", "exports", "Actions/EatAction", "Actions/SelectAction", "Models/PlayResponse", "Actions/AdvanceAction", "Actions/UnselectAction", "Actions/ComboPlayAction", "Actions/CrownQueenAction", "Actions/helpers"], function (require, exports, EatAction_1, SelectAction_1, PlayResponse_7, AdvanceAction_1, UnselectAction_1, ComboPlayAction_1, CrownQueenAction_1, helpers_4) {
    "use strict";
    var PlayAction = (function () {
        function PlayAction(from, to, board) {
            this._from = from;
            this._to = to;
            this._board = board;
            this._eatedPiece = false;
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
        Object.defineProperty(PlayAction.prototype, "eatedPiece", {
            get: function () {
                return this._eatedPiece;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayAction.prototype, "isAdvancingPlace", {
            get: function () {
                return helpers_4.isAdvancingPlace(this.from, this.to);
            },
            enumerable: true,
            configurable: true
        });
        PlayAction.prototype.canPerform = function () {
            if (this.to === null)
                return false;
            else if (helpers_4.isEatingAFriendPiece(this.from, this.to))
                return false;
            else
                return true;
        };
        PlayAction.prototype.perform = function () {
            if (!this.canPerform())
                return PlayResponse_7.default.invalid();
            this.playResponse = this.performActions();
            this.performAfterActions();
            return this.playResponse;
        };
        PlayAction.prototype.performActions = function () {
            var action, i;
            var actions = this.getSequencedActionList();
            for (i = 0; i < actions.length; i++) {
                action = actions[i];
                if (action.canPerform())
                    return action.perform();
            }
            return PlayResponse_7.default.invalid();
        };
        PlayAction.prototype.getSequencedActionList = function () {
            var _a = this, from = _a.from, to = _a.to, board = _a.board;
            return [
                new SelectAction_1.default(from, to),
                new UnselectAction_1.default(from, to),
                this.getEatAction(),
                new AdvanceAction_1.default(from, to),
            ];
        };
        PlayAction.prototype.getEatAction = function () {
            var _this = this;
            var eat = new EatAction_1.default(this.from, this.to, this.board);
            eat.OnEat = function (newTo) {
                _this._to = newTo;
                _this._eatedPiece = true;
            };
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
                new CrownQueenAction_1.default(to),
                this.getComboPlayAction()
            ];
        };
        PlayAction.prototype.getComboPlayAction = function () {
            var _this = this;
            var action = new ComboPlayAction_1.default(this.to, this.board, this._eatedPiece);
            action.onDiscoverHasMoreMovies = function () {
                _this.playResponse = PlayResponse_7.default.stillHappening(_this.to);
            };
            return action;
        };
        return PlayAction;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PlayAction;
});
define("Models/Mediator", ["require", "exports", "Actions/PlayAction", "Models/PlayResponse", "Models/PlayStatus", "Actions/helpers"], function (require, exports, PlayAction_1, PlayResponse_8, PlayStatus_2, helpers_5) {
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
                return PlayResponse_8.default.invalid();
            return this.perform(play);
        };
        Mediator.prototype.canPlay = function (play) {
            var from = play.from, to = play.to;
            return to.isEmpty() ||
                this.isSelectingCurrentPlayer(to.piece.player) ||
                helpers_5.isEatingAnEnemyPiece(from, to);
        };
        Mediator.prototype.perform = function (play) {
            var from = play.from, to = play.to;
            var playResponse = play.perform();
            if (playResponse.playStatus === PlayStatus_2.PlayStatus.FINISHED) {
                this.alternateBetweenPlayers();
            }
            return playResponse;
        };
        Mediator.prototype.isSelectingCurrentPlayer = function (player) {
            return this._currentPlayer === player;
        };
        Mediator.prototype.alternateBetweenPlayers = function () {
            this.changePlayer();
            this.formatScoreElement();
            return this.currentPlayer;
        };
        Mediator.prototype.changePlayer = function () {
            if (this.isSelectingCurrentPlayer(this.player1)) {
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
define("Models/Board", ["require", "exports", "Models/Place", "Models/Mediator", "Models/PlayStatus", "consts"], function (require, exports, Place_1, Mediator_1, PlayStatus_3, consts_2) {
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
            var playResponse = this.mediator.play(this.selectedPlace, place, this.boardMask);
            if (playResponse.playStatus === PlayStatus_3.PlayStatus.INVALID)
                return;
            this.selectedPlace = playResponse.selectedPlace;
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