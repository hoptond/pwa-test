"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function getPopularRepos(_x, _x2, _x3) {
  return _getPopularRepos.apply(this, arguments);
}

function _getPopularRepos() {
  _getPopularRepos = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(name, startdate, enddate) {
    var response, data, repos, results;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("https://api.github.com/search/repositories?q=".concat(name, " pushed:").concat(startdate, "..").concat(enddate, "&sort=stars"));

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            data = _context.sent;
            repos = data.items.slice(0, 3);
            results = document.getElementById('results');
            repos.forEach(function (repo) {
              var listItem = document.createElement('li');
              listItem.innerText = repo.name;
              results.appendChild(listItem);
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getPopularRepos.apply(this, arguments);
}

function clearResults() {
  var results = document.getElementById('results');

  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }
}

document.querySelector('#submit').addEventListener('click', function (e) {
  var formData = new FormData(e.target.form);
  clearResults();
  getPopularRepos(formData.get('name'), formData.get('startdate'), formData.get('enddate'));
  document.querySelector('h4').classList.remove('hidden');
  e.preventDefault();
});