'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function ucfirst(str) {
  return "".concat(str.charAt(0).toUpperCase()).concat(str.slice(1));
}
function calcParamsMatrix(date) {
  // количество дней в указанном месяце
  var countDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // индекс первого дня в неделе указанного месяца

  var indexOfFirstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1; // высота массива

  var heightArray = Math.floor((countDays + indexOfFirstDay) / 7) + Number((countDays + indexOfFirstDay) % 7 > 0); // количество дней в предыдущем месяце

  var lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); // день, с которого начинается отсчет

  var startMonth = indexOfFirstDay > 0 ? new Date(date.setMonth(date.getMonth() - 1)) : new Date(date);
  var startDay = new Date(startMonth.getFullYear(), startMonth.getMonth(), lastDayPrevMonth - indexOfFirstDay + 1);
  return [countDays, indexOfFirstDay, heightArray, startDay];
}
function getTitles(data) {
  return data.reduce(function (arr, el) {
    arr.push(el[0]);
    return arr;
  }, []);
}
function getKeyMonth(currentYear, date) {
  var strMonth = date.toLocaleDateString('ru-RU', {
    month: 'long'
  });
  var keyMonth = ucfirst(strMonth);

  if (currentYear !== date.getFullYear()) {
    keyMonth += "'".concat(date.getFullYear().toString().slice(2, 4));
  }

  return keyMonth;
}
function padZero(val) {
  return String(val).length === 1 ? "0".concat(val) : val;
}

var DAY_STATE_NOT_AVAILABLE = 'not_available';
var DAY_STATE_DISABLE = 'disable';
var DAY_STATE_ACTIVE = 'active';

function MonthStructure() {
  this.days = [];
  this.daysTemp = [];
}

MonthStructure.prototype.init = function (date) {
  var _calcParamsMatrix = calcParamsMatrix(date),
      _calcParamsMatrix2 = _slicedToArray(_calcParamsMatrix, 4),
      countDays = _calcParamsMatrix2[0],
      indexOfFirstDay = _calcParamsMatrix2[1],
      heightArray = _calcParamsMatrix2[2],
      startDay = _calcParamsMatrix2[3];

  var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  for (var i = 0; i < heightArray; i++) {
    this.days.push(Array(7));
  }

  for (var _i = 0; _i < 7 * heightArray; _i++) {
    var nextDay = new Date(startDay);
    nextDay.setDate(startDay.getDate() + _i);
    var day = {
      state: DAY_STATE_NOT_AVAILABLE,
      today: Boolean(today.getTime() === nextDay.getTime()),
      date: "".concat(nextDay.getFullYear(), "-").concat(nextDay.getMonth() + 1, "-").concat(nextDay.getDate()),
      day: nextDay.getDate(),
      payload: null
    };

    if (_i >= indexOfFirstDay && _i <= indexOfFirstDay + countDays - 1) {
      day.state = DAY_STATE_DISABLE;
    }

    this.daysTemp.push(day);
  }
};

MonthStructure.prototype.addDay = function (date) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var dayNum = date.getDate();
  var i = this.daysTemp.findIndex(function (el) {
    return el.state === DAY_STATE_DISABLE && el.day === dayNum;
  });
  this.daysTemp[i].state = DAY_STATE_ACTIVE;
  this.daysTemp[i].date = "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1, "-").concat(date.getDate());
  this.daysTemp[i].payload = payload;
};

MonthStructure.prototype.processDays = function () {
  var k = 0;

  for (var i = 0; i < this.days.length; i++) {
    for (var j = 0; j < 7; j++) {
      this.days[i][j] = this.daysTemp[k];
      k++;
    }
  }
};

var dataProcessing = function dataProcessing(data) {
  var monthArray = [];

  try {
    var currentYear = new Date().getFullYear(); // заполняем пропущенные месяцы

    var arrForGenerateEmptyMonth = generateArrMonth(data); // наполняем месяцы

    var monthMap = new Map();

    var _iterator = _createForOfIteratorHelper(arrForGenerateEmptyMonth),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        var date = new Date(item);
        var keyMonth = getKeyMonth(currentYear, date);
        var m = addMonth(date);
        monthMap.set(keyMonth, m);
      } // проставляем активные дни

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var _iterator2 = _createForOfIteratorHelper(data),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _item = _step2.value;

        var _date = new Date(_item.date);

        var _keyMonth = getKeyMonth(currentYear, _date);

        var _m = monthMap.get(_keyMonth);

        _m.addDay(_date, _item);
      } // чистим служебные данные

    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    monthArray = Array.from(monthMap);
    monthArray.map(function (el) {
      el[1].processDays();
      delete el[1].daysTemp;
    });
  } catch (err) {
    console.warn(err);
  }

  return monthArray;
};

var addMonth = function addMonth(date) {
  var m = new MonthStructure();
  m.init(date);
  return m;
};

var generateArrMonth = function generateArrMonth(data) {
  var month = [];
  var tmp = [];
  data.forEach(function (el) {
    tmp.push(el.date);
  });
  tmp.sort();

  if (tmp.length > 1) {
    var firstYear = new Date(tmp[0]).getFullYear();
    var firstMonth = new Date(tmp[0]).getMonth() + 1;
    var lastYear = new Date(tmp[tmp.length - 1]).getFullYear();
    var lastMonth = new Date(tmp[tmp.length - 1]).getMonth() + 1;

    for (var y = firstYear; y <= lastYear; y++) {
      var startM = 1;
      var endM = 12;

      if (y === firstYear) {
        startM = firstMonth;
      }

      if (y === lastYear) {
        endM = lastMonth;
      }

      for (var m = startM; m <= endM; m++) {
        month.push("".concat(y, "-").concat(padZero(m), "-01"));
      }
    }
  } else {
    month.push(tmp[0]);
  }

  return month;
};

var Title = function Title(_ref) {
  var titles = _ref.titles,
      monthCount = _ref.monthCount,
      activeMonth = _ref.activeMonth,
      setActiveMonth = _ref.setActiveMonth;

  var turnMonth = function turnMonth(direction) {
    if (direction === 'left') {
      if (activeMonth > 0) {
        setActiveMonth(activeMonth - 1);
      }
    } else {
      if (activeMonth < monthCount - 1) {
        setActiveMonth(activeMonth + 1);
      }
    }
  };

  var getClasses = function getClasses(direction) {
    var classes = 'btn btn-secondary px-2';

    if (direction === 'left') {
      if (activeMonth === 0) {
        classes += ' disabled';
      }
    } else {
      if (activeMonth === monthCount - 1) {
        classes += ' disabled';
      }
    }

    return classes;
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "row no-gutters align-items-center mb-4"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col-auto"
  }, /*#__PURE__*/React__default["default"].createElement("button", {
    className: getClasses('left'),
    onClick: function onClick() {
      return turnMonth('left');
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M15 19l-7-7 7-7"
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "sr-only"
  }, "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043C\u0435\u0441\u044F\u0446"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col px-3 text-lg text-center font-weight-medium"
  }, titles[activeMonth]), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col-auto"
  }, /*#__PURE__*/React__default["default"].createElement("button", {
    className: getClasses('right'),
    onClick: function onClick() {
      return turnMonth('right');
    }
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M9 5l7 7-7 7"
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "sr-only"
  }, "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043C\u0435\u0441\u044F\u0446"))));
};

var Context = /*#__PURE__*/React.createContext({});
var ContextProvider = function ContextProvider(_ref) {
  var children = _ref.children,
      value = _ref.value;
  return /*#__PURE__*/React__default["default"].createElement(Context.Provider, {
    value: value
  }, children);
};

var notAvailableDay = function notAvailableDay(day) {
  var classes = !day.today ? 'btn btn-lg btn-block disabled px-1' : 'btn btn-lg btn-block border-primary disabled px-1';
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classes
  }, day.day);
};

var disableDay = function disableDay(day) {
  var classes = !day.today ? 'btn btn-lg btn-block bg-light disabled px-1' : 'btn btn-lg btn-block bg-light border-primary disabled px-1';
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classes
  }, day.day);
};

var activeDay = function activeDay(day, dayClick) {
  var classes = !day.today ? 'btn btn-lg btn-block btn-primary-light px-1' : 'btn btn-lg btn-block btn-primary-light border-primary px-1';
  return /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: dayClick,
    className: classes
  }, day.day);
};

var styledDays = function styledDays() {
  var days = new Map();
  days.set(DAY_STATE_NOT_AVAILABLE, notAvailableDay);
  days.set(DAY_STATE_DISABLE, disableDay);
  days.set(DAY_STATE_ACTIVE, activeDay);
  return days;
};

var Day = function Day(_ref) {
  var data = _ref.data;

  var _useContext = React.useContext(Context),
      onDayClick = _useContext.onDayClick;

  var days = styledDays();

  var dayClick = function dayClick() {
    if (data.state === DAY_STATE_ACTIVE && typeof onDayClick === 'function') {
      onDayClick(data.date, data.payload);
    }
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col px-1"
  }, days.get(data.state)(data, dayClick));
};

var Week = function Week(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "row row-gutter-8 my-2"
  }, data.map(function (day, i) {
    return /*#__PURE__*/React__default["default"].createElement(Day, {
      key: i,
      data: day
    });
  }));
};

var Month = function Month(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "row no-gutters mb-3 text-xs text-muted text-center"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col"
  }, "\u041F\u041D"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col"
  }, "\u0412\u0422"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col"
  }, "\u0421\u0420"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col"
  }, "\u0427\u0422"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col"
  }, "\u041F\u0422"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col"
  }, "\u0421\u0411"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "col"
  }, "\u0412\u0421")), data[1].days.map(function (week, i) {
    return /*#__PURE__*/React__default["default"].createElement(Week, {
      key: i,
      data: week
    });
  }));
};

var Calendar = function Calendar(_ref) {
  var data = _ref.data,
      shiftToDate = _ref.shiftToDate;
  var calendar = React.useMemo(function () {
    return dataProcessing(data);
  }, [data]);
  var titles = getTitles(calendar);
  var monthCount = calendar.length;
  var initActiveMonth = 0;

  if (typeof shiftToDate === 'string') {
    try {
      var keyMonthArray = getKeyMonth(new Date().getFullYear(), new Date(shiftToDate));
      initActiveMonth = calendar.findIndex(function (el) {
        return el[0] === keyMonthArray;
      });
    } catch (err) {
      console.warn(err);
    }
  }

  var _useState = React.useState(initActiveMonth),
      _useState2 = _slicedToArray(_useState, 2),
      activeMonth = _useState2[0],
      setActiveMonth = _useState2[1];

  return /*#__PURE__*/React__default["default"].createElement("div", {
    id: "calendar",
    className: "my-4"
  }, !!monthCount && /*#__PURE__*/React__default["default"].createElement(React.Fragment, null, /*#__PURE__*/React__default["default"].createElement(Title, {
    titles: titles,
    monthCount: monthCount,
    activeMonth: activeMonth,
    setActiveMonth: setActiveMonth
  }), /*#__PURE__*/React__default["default"].createElement(Month, {
    data: calendar[activeMonth]
  })));
};

function App(_ref) {
  var data = _ref.data,
      shiftToDate = _ref.shiftToDate,
      onDayClick = _ref.onDayClick;
  return /*#__PURE__*/React__default["default"].createElement(ContextProvider, {
    value: {
      onDayClick: onDayClick
    }
  }, /*#__PURE__*/React__default["default"].createElement(Calendar, {
    data: data,
    shiftToDate: shiftToDate
  }));
}

module.exports = App;
//# sourceMappingURL=index.js.map
