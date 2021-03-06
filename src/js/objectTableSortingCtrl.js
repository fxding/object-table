angular.module('objectTable').controller('objectTableSortingCtrl', ['$scope',
    function angTableCtrl($scope) {


        /* sorting [START]*/

        $scope.sort = {
            fields: [], // array to store readable sorted headers
            ascending: [] // sorting directions for each field
        };

        $scope.sortingArray = [];

        $scope.sortBy = function(field) {
             if (resizePressedEnd) {
                resizePressedEnd= false;
                return;
             };
            if ($scope.data.length) {
                var sortedHeader = $scope.headers[$scope.fields.indexOf(field)];
                if ($scope.sortingType == 'compound') {

                    if ($scope.sort.fields.indexOf(sortedHeader) == -1) {
                        $scope.sort.fields.push(sortedHeader);
                        $scope.sortingArray.push(field);
                        $scope.sort.ascending.push(true);
                    } else {
                        $scope.changeReversing(field, $scope.sort.fields.indexOf(sortedHeader));
                    }

                } else if ($scope.sortingType == 'simple') {
                    $scope.sort.fields = [sortedHeader];
                    $scope.changeReversing(field);
                }
            }

        };

        $scope.changeReversing = function(sortProperty, indexOfHeader) {
            if ($scope.sortingType == 'compound') {
                $scope.sort.ascending[indexOfHeader] = !$scope.sort.ascending[indexOfHeader];
                $scope.sortingArray[indexOfHeader] = $scope.sort.ascending[indexOfHeader] ? sortProperty : "-" + sortProperty;
            } else if ($scope.sortingType == 'simple') {
                $scope.sort.ascending[0] = !$scope.sort.ascending[0];
                $scope.sortingArray = $scope.sort.ascending[0] ? [sortProperty] : ["-" + sortProperty];
            }
        };

        /* highlight sorted headers */
        $scope.headerIsSortedClass = function(field) {
            if (!$scope.sortingArray.length) return;

            if ($scope.sortingType == 'simple') {
              if (field == $scope.sort.fields[0] || "-" + field == $scope.sort.fields[0]) {
                    return $scope.sort.ascending[0] ? 'table-sort-up' : 'table-sort-down';
              }
            } else if ($scope.sortingType == 'compound') {
                var rowIndex = $scope.sort.fields.indexOf(field);
                if (rowIndex != -1) {
                    return $scope.sort.ascending[rowIndex] ? 'table-sort-up' : 'table-sort-down';
                }
            }
        };

        /* COMPOUND SORTING: remove from array */
        $scope.removeSorting = function() {
            var index = $scope.sort.fields.indexOf(this.sortField);
            if (index > -1) {
                $scope.sort.fields.splice(index, 1);
                $scope.sort.ascending.splice(index, 1);
                $scope.sortingArray.splice(index, 1);
            }
            index = null;
        };
        /* sorting [END]*/


        /* column resizing*/
        var resizePressed = false,
        resizePressedEnd = false,
        start,startX, startWidth;

        $scope.resizeStart = function(e) {
            var target = e.target ? e.target : e.srcElement;
            if (target.classList.contains("resize")) {
                start = target.parentNode;
                resizePressed = true;
                startX = e.pageX;
                startWidth = target.parentNode.offsetWidth;
                document.addEventListener('mousemove', drag);
                e.stopPropagation();
                e.preventDefault();
            }
        };

        function drag(e) {
            if (resizePressed) {
                start.width = startWidth + (e.pageX - startX);
            }
        }

        $scope.resizeEnd = function(e) {
            if (resizePressed) {
                document.removeEventListener('mousemove', drag);
                e.stopPropagation();
                e.preventDefault();
                resizePressed = false;
                resizePressedEnd = true;
            }
        };

    }
]);
