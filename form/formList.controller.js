app.controller('EmployeeCtrl', ['$scope', 'dataService', function ($scope, dataService) {
    $scope.forms = [];

    dataService.getAllForms().then(function (json) {
        if (json && angular.isArray(json)) {
            json.map(function (el) {
                $scope.forms.push(el);
            });
        }
        ;
    });

    $scope.model = null;
    $scope.form = null;
    $scope.schema = null;

    $scope.generate = function (id) {
        $scope.id = $scope.forms[id].id;
        $scope.form = $scope.forms[id].form;
        $scope.schema = $scope.forms[id].schema;
        $scope.model = {};

    };
    $scope.saveData = function (id) {
        console.log("$scope.form --> ", $scope.form);
        console.log("$scope.schema --> ", $scope.schema);
        console.log("$scope.model --> ", $scope.model);
        console.log("id --> ", id);
        dataService.saveData(id, $scope.model).then(function onSuccess(data) {
                $scope.model = data;
                console.log($scope.model);
            }
        ).catch(function onError(err) {
            console.log(err);
            $scope.personalInfo = {};
        });
    };


}]);