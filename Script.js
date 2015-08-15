
var app = angular.module("RandomApp", []);
app.controller("appController", function ($scope, $http) {//injectables

    //Initializations
    $scope.showStatus = false;
    function makeVisible(flag) {
        $scope.showStatus = flag;
    }
    function changeClass(no) {

        var ele = document.getElementById("statusmessage");

        switch (no) {

            case 0:
                angular.element(ele).addClass("success");
                angular.element(ele).removeClass("failure");
                break;
            case 1:
                angular.element(ele).addClass("failure");
                angular.element(ele).removeClass("success");
                break;


        }
    }

    

    $scope.GenerateRandomValue = function () {


       
        if ($scope.Name != "") {

            var request = {

                method: "GET",
                url: "api.asmx/Generate",
                params: { "Name": $scope.Name },
                headers: {
                    'Content-Type': "x-www-form-urlencoded"
                },

            }


            $http(request).then(function (response) {

                if (response.status === 200 && typeof response.data == "string") {

                    var data = JSON.parse(response.data);

                    $scope.status ="Generated Random no is " + data;
                    makeVisible(true);
                    changeClass(0);

                }
                else if (response.status === 400) {

                    $scope.status = response.data;
                    makeVisible(true);
                    changeClass(1);

                }

            }, function (response) {

                $scope.status = response.status === 500 ? "Couldn't connect to server, Please try again..!" : "Error occured..!";
                makeVisible(true);
                changeClass(1);


            })
        }
        else {
            $scope.status = "Please enter your Name..!";
            makeVisible(true);
            changeClass(1);


        }
    }

})