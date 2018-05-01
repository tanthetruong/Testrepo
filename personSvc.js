//personSvc.js

(function() {
    'use strict';

    var app = angular.module('app.manage');

    app.factory('personSvc', personSvc);

    personSvc.$inject = ['$http', '$q'];

    function personSvc($http, $q) {
        return {
            searchPeople: _searchPeople,
            getPerson: _getPerson,
            getStudent: _getStudent
        }

        function _searchPeople(firstName, lastName) {
            var d = $q.defer();
            $http.get('../api/narrativeEvaluations/person?firstName=' + firstName + "&lastName=" + lastName).then(function (result) {
                d.resolve(result.data); 
            }

            , function (result) {
                //d.reject(result.data);
                //throw result.data;
                throw "database error at personSvc";
            }); 
            return d.promise; 
        }

        function _getPerson(id) {
            var d = $q.defer();
            $http.get('../api/narrativeEvaluations/person?id=' + id).then(function (result) {
                d.resolve(result.data);
            }, function (err) {
                d.reject(err);
            });
            return d.promise;
        }

        function _getStudent(id) {
            var d = $q.defer();
            $http.get('../api/narrativeEvaluations/student?studentId=' + id).then(function (result) {
                d.resolve(result.data);
            }, function (err) {
                d.reject(err);
            });
            return d.promise;
        }
    }; 

})()