/**
 * Created by Md. Moniruzzaman (md.moniruzzaman@konasl.com) on 1/26/2016.
 */

angular.module('operationDeskAppServices')
    .constant('navigationProfile', [
        {
            "menuEntity": {
                "menuId": "logs",
                "menuPid": "0",
                "menuName": "Logs",
                "menuExe": "/"
            },
            "subMenuMultiLevelResponses": [
                {
                    "menuEntity": {
                        "menuId": "transaction-logs",
                        "menuPid": "logs",
                        "menuName": "Transaction Logs",
                        "menuExe": "/transaction-logs"
                    },
                    "subMenuMultiLevelResponses": []
                }
            ]
        },
        {
            "menuEntity": {
                "menuId": "settings",
                "menuPid": "0",
                "menuName": "Settings",
                "menuExe": "/"
            },
            "subMenuMultiLevelResponses": [
                {
                    "menuEntity": {
                        "menuId": "application-settings",
                        "menuPid": "settings",
                        "menuName": "Application Settings",
                        "menuExe": "/application-settings"
                    },
                    "subMenuMultiLevelResponses": []
                }
            ]
        }
    ]);
