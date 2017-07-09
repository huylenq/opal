angular.module(
    'opal.services'
).factory(
    'Flow',
    function($q, $http, $modal, $cacheFactory, $injector){
        "use strict";
        var get_flow_service = function(){
            var OPAL_FLOW_SERVICE = $injector.get('OPAL_FLOW_SERVICE');
            if(OPAL_FLOW_SERVICE){
                return $injector.get(OPAL_FLOW_SERVICE);
            } else {

                return {
                    enter:  function(config, context) {
                        // Come from patient_list with no patient details,
                        // create a new episode as new patient
                        if (context.url === '/list/all_patients') {
                            return {
                                'controller': 'AddEpisodeCtrl',
                                'template'  : '/templates/modals/add_episode.html',
                                'resolve': {
                                    demographics: function() { return {}; },
                                    patientId: function() { return null; }
                                }
                            };
                        // Likely come from patient_detail (idk why it doesn't have the contxt.url)
                        // Create new episode for existing patient
                        } else if (config.patientId) {
                            return {
                                // 'controller': 'HospitalNumberCtrl',
                                // 'template'  : '/templates/modals/hospital_number.html/'
                                'controller': 'AddEpisodeCtrl',
                                'template'  : '/templates/modals/add_episode.html',
                                'resolve': {
                                    // No idea why they make demographics an array
                                    demographics: function() { return config.demographics; },
                                    patientId: function() { return context.patientId; }
                                }
                            };
                        } else {
                            window.alert("Error! Unknown flow entered from:", JSON.stringify(config), JSON.stringify(context));
                        }
                    },
                    exit: function(){
                        return  {
                            'controller': 'DischargeEpisodeCtrl',
                            'template'  : '/templates/modals/discharge_episode.html/'
                        };
                    }
                };
            }
        }

        var Flow = {

            enter: function(config, context){
                var deferred = $q.defer();
                var target = get_flow_service().enter(config, context);
                var result = $modal.open({
                    backdrop: 'static',
                    templateUrl: target.template,
                    controller:  target.controller,
                    resolve: Object.assign({
                        referencedata:   function(Referencedata){ return Referencedata.load() },
                        metadata:        function(Metadata){ return Metadata.load(); },
                        tags:            function(){ return config.current_tags},
                        hospital_number: function(){ return config.hospital_number; },
                        myVar: function() { return "Yes"; },
                        context:         function(){ return context; }
                    }, target.resolve)
                }).result;
                deferred.resolve(result);
                return deferred.promise;
            },

            exit: function(episode, config, context){
                var deferred = $q.defer();
                var target = get_flow_service().exit(episode);
                var result = $modal.open({
                    backdrop: 'static',
                    templateUrl: target.template,
                    controller:  target.controller,
                    keyboard: false,
                    resolve: Object.assign({
                        episode      : function() { return episode; },
                        referencedata: function(Referencedata){ return Referencedata.load() },
                        metadata     : function(Metadata){ return Metadata.load(); },
                        tags         : function() { return config.current_tags; },
                        context      : function(){ return context; }
      			    }, target.resolve)
                }).result;

                return deferred.promise;
            }

        };
        return Flow;
    }
);
