var app = angular.module('formApp', ['ngSanitize', 'schemaForm', 'ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'view/form.list.html',
            controller: 'EmployeeCtrl'
        })
        .when('/create', {
            templateUrl: 'view/create.form.html',
            controller: 'CreateFormCtrl'
        })
        .otherwise({
            redirectTo: '/myform'
        });
}]);
app.service('dataService', ['$http', '$q', function ($http, $q) {


    this.getAllForms = function getAllForms() {
        console.log("getAllForms");
        var deferred = $q.defer();
        $http.get('http://localhost:8024/assignment/api/form')
            .then(function (response) {
                deferred.resolve(response.data);
                console.log(response);
            })
            .catch(function (response) {
                deferred.reject(response);
            });

        return deferred.promise;

    };


    /*this.getTest = function getTest() {
        console.log("getTest");
        var deferred = $q.defer();
        $http.get('http://localhost:8024/assignment/api/form/1')
            .then(function (response) {
                deferred.resolve(response.data);
                console.log(response);
            })
            .catch(function (response) {
                deferred.reject(response);
            });

        return deferred.promise;

    };*/

    /*this.getDataByFormIdAndDataId = function (formId, dataId) {
        console.log("getTest");
        var deferred = $q.defer();
        $http.get('http://localhost:8024/assignment/api/form/' + formId + '/' + dataId)
            .then(function (response) {
                deferred.resolve(response.data);
                console.log(response);
            })
            .catch(function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    }*/

    this.saveData = function (id, data) {
        var defferd = $q.defer();
        $http.post('http://localhost:8024/assignment/api/form/' + id + '/data', data)
            .then(function (response) {
                defferd.resolve(response.data);
                console.log(response);
            })
            .catch(function (response) {
                defferd.reject(response);
            });
        return defferd.promise;
    }

    this.saveForm = function (form) {
        console.log(form);
        var defferd = $q.defer();
        $http.post('http://localhost:8024/assignment/api/form', form)
            .then(function (response) {
                defferd.resolve(response.data);
                console.log(response);
            })
            .catch(function (response) {
                defferd.reject(response);
            });
        return defferd.promise;
    }

}]);


app.service("elementTypeService", [function () {
    var list = [];
    return {
        elementTypes: function () {
            list.push({value: "text", name: 'Input Text'});
            list.push({value: "textarea", name: 'Text Area'});
            list.push({value: "radios", name: 'Radio Button'});
            list.push({value: "checkbox", name: 'Check Box'});
            list.push({value: "checkboxes", name: 'Check Boxes'});
            list.push({value: "select", name: 'Drop Down'});
            return list;
        }
    }
}]);