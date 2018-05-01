(function () {
    'use strict';

    var app = angular.module('app.manage');

    app.controller('PersonSearch', PersonSearch);

    PersonSearch.$inject = ['$scope', '$modalInstance', 'courseOrSection', 'personSvc']; 

    function PersonSearch($scope, $modalInstance, courseOrSection, personSvc) {
        $scope.courseOrSection = courseOrSection;
        $scope.people = [];
        $scope.selectedPerson = {};
        try {
            $scope.facultyID1 = $scope.courseOrSection.SectionInfo.faculty[0].id;

        } catch (e) {
            console.log('Error: ',e);
        }


        try {
            if (angular.isDefined($scope.courseOrSection.SectionInfo.faculty[1])) {
                console.log('faculty2', $scope.courseOrSection.SectionInfo.faculty[1]);
                $scope.facultyID2 = $scope.courseOrSection.SectionInfo.faculty[1].id;
            }
        } catch (e) {
            console.log('Error: ', e);
        }


        console.log('faculty1:', $scope.facultyID1);
        $scope.search = function (firstName, lastName) {
            $scope.loading = true;
            personSvc.searchPeople(firstName, lastName)
                .then(function(result) {
                        angular.copy(result, $scope.people);
                        $scope.people.facultyID1 = $scope.facultyID1;
                        $scope.people.facultyID2 = $scope.facultyID2;
                        console.log('$scope:', $scope.people);
                    },
                    function(result) { throw "database error in PersonSearch.js"; }
                ).then(function () {
                $scope.loading = false;
                
            }); 
        }

        $scope.ok = function (person) {
            $scope.courseOrSection.secondApprover = person; //prune before POST/PUT
            $scope.courseOrSection.secondApproverId = person.id;
            $modalInstance.close($scope.courseOrSection);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

})()