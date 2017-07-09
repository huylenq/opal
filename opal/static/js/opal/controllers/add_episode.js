angular.module('opal.controllers')
    .controller(
        'AddEpisodeCtrl',
        function($scope, $http,
                 $timeout, $routeParams,
                 $modalInstance, $rootScope,
                 Episode, FieldTranslater,
                 referencedata,
                 demographics,
                 patientId,
                 tags){
            "use strict";
            var currentTags = [];
            var DATE_FORMAT = 'DD/MM/YYYY';
            _.extend($scope, referencedata.toLookuplists());
            $scope.editing = {
                tagging: [{}],
                location: {},
                demographics: demographics,
                date_of_admission: new Date()
            };

            $scope.editing.tagging = {};

            if(tags && tags.tag){
                $scope.editing.tagging[tags.tag] = true;
            }

            if(tags && tags.subtag){
                $scope.editing.tagging[tags.subtag] = true;
            }

            $scope.save = function() {
                var doa = $scope.editing.date_of_admission;
                if (doa) {
                    if(!angular.isString(doa)){
                        doa = moment(doa).format(DATE_FORMAT);
                    }
                    $scope.editing.date_of_admission = doa;
                }

                var toSave = FieldTranslater.jsToPatient($scope.editing);
                $http.post('/api/v0.1/episode/', toSave).success(function(episode) {
                    episode = new Episode(episode);
                    $modalInstance.close(episode);
                });
            };

            $scope.cancel = function() {
                $modalInstance.close(null);
	        };

        });
