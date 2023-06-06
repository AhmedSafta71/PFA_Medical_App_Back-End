"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("lodash"),
    toLength = _require.toLength;

var APIFeatures =
/*#__PURE__*/
function () {
  function APIFeatures(query, queryStr) {
    _classCallCheck(this, APIFeatures);

    this.query = query;
    this.queryStr = queryStr;
  }

  _createClass(APIFeatures, [{
    key: "search",
    value: function search() {
      console.log("entred in search");
      var keyword = this.queryStr.nameDoctor != '' ? {
        surname: {
          $regex: new RegExp(this.queryStr.nameDoctor, 'i')
        },
        city: {
          $regex: new RegExp(this.queryStr.city, 'i')
        },
        speciality: {
          $regex: new RegExp(this.queryStr.speciality, 'i')
        }
      } : {};
      this.query = this.query.find(keyword);
      return this;
    } //pagination

  }, {
    key: "pagination",
    value: function pagination(resPerPage) {
      var currentPage = Number(this.queryStr.page) || 1;
      var skip = resPerPage * (currentPage - 1); //limit: function to limit the number of products per page 

      this.query = this.query.limit(resPerPage).skip(skip);
      console.log("paginatione made");
      return this;
    }
  }]);

  return APIFeatures;
}();

module.exports = APIFeatures;