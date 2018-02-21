app.directive('elementType', function () {
    return {
        restrict: "E",
        scope: {},
        templateUrl: 'ElementType.html',
        controller: function ($rootScope, $scope, $element) {
            $scope.elements = $rootScope.GetElementTypes;
            $scope.Delete = function (e) {
                $element.remove();
                $scope.$destroy();
            }
        }
    }
});

app.controller("CreateFormCtrl", ['$scope', '$rootScope', '$location', 'elementTypeService', 'dataService', '$compile',
    function ($scope, $rootScope, $location, elementTypeService, dataService, $compile) {
        $rootScope.GetElementTypes = elementTypeService.elementTypes();

        $scope.addElement = function () {
            var divElement = angular.element(document.querySelector('#elementTypeDiv'));
            var appendHtml = $compile('<element-Type></element-Type>')($scope);
            divElement.append(appendHtml);
        }
        $scope.OnSave = function (formElement) {
            if (formElement !== null && formElement !== undefined) {
                formElement.elements = retriveValue($scope);


                var form = formElement.elements;
                var schema = schemaGenerate(formElement);
                var formSchema = {"form": form, "schema": schema};
                var allContacts = angular.element(document.getElementsByTagName("element-Type"));
                dataService.saveForm(formSchema).then(function onSuccess(data) {
                        console.log(data);
                        var employeeList = [];
                        $location.url("/");

                    }
                ).catch(function onError(err) {
                    console.log(err);
                });
            }
        }

        function schemaGenerate(form) {
            var schema = {type: "object", title: form.name, properties: {}}

            angular.forEach(form.elements, function (value, key) {
                console.log("value.key -->", value.key);
                schema.properties[value.key] = {};
                if (value.type == 'checkbox') {
                    schema.properties[value.key] = {"type": "boolean"};
                    console.log(schema.properties);
                }
                else if (value.type == 'radios') {
                    schema.properties[value.key] = {"type": "string"};
                }
                else if (value.type == 'select') {
                    schema.properties[value.key] = {"type": "string"};
                }
                else if (value.type == 'checkboxes') {
                    schema.properties[value.key] = {
                        "type": "array", "items": {
                            "type": "string", "enum": [
                                "a",
                                "b",
                                "c"
                            ]
                        }
                    };
                }

            });
            console.log(schema)
            return schema;
        }

        function retriveValue() {
            console.log("$scope.$$childHead --> ", $scope.$$childHead)
            var UserContacts = [];
            var UserContactsJson = [];
            var ChildHeads = [$scope.$$childHead];
            var currentScope;
            while (ChildHeads.length) {
                currentScope = ChildHeads.shift();
                while (currentScope) {
                    if (currentScope.element !== undefined) {
                        console.log(currentScope.element);
                        var element = {
                            type: currentScope.element,
                            key: currentScope.key,
                            title: currentScope.title,
                            description: currentScope.description,
                            placeholder: currentScope.placeholder
                        };
                        if (currentScope.element == 'radios') {
                            element.titleMap = [{"a": "a"}, {"b": "b"}, {"c": "c"}];
                            console.log("element", element);
                        }
                        else if (currentScope.element == 'select') {
                            element.titleMap = [{"a": "a"}, {"b": "b"}, {"c": "c"}];
                            console.log("element", element);
                        }
                        UserContacts.push(element);
                    }


                    currentScope = currentScope.$$nextSibling;
                }
            }
            return UserContacts;
        }


    }]);