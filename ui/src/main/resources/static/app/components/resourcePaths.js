/**
 * Created by Abdullah Al Mamun on 10/22/2015.
 */

angular.module('operationDeskAppConstants', [])
    .constant('resourcePaths', {
        baseUrl: "http://localhost:8081/resource",
        accessMatrixPath: "auth/access-matrix",
        transactionLogsPaths: "transaction-logs",
        localePath: "locales",
        applicationSettingsPath: 'application-settings',
        enumPath: "enum"
    });