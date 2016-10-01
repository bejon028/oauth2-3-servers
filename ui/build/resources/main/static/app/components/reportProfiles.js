/**
 * Created by Md. Moniruzzaman (md.moniruzzaman@konasl.com) on 1/26/2016.
 */

angular.module('operationDeskAppServices')
    .constant('reportProfiles', {
        'recharge-pay-clearing':{
            title:'RECHARGE_PAY_REPORT',
            reportPath:'/reports/Recharge_Pay_Report',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true},
                {id: "MerchantID", type: 'TEXT', columnName: "Merchant ID", selectable: true},
                {id: "IssuerID", type: 'TEXT', columnName: "Issuer ID", selectable: true},
                {id: "IssuerMID", type: 'TEXT', columnName: "Issuer Merchant ID", selectable: true},
                {id: "AcquirerID", type: 'NUMBER', columnName: "Acquirer ID", selectable: true},
                {id: "CardServiceID", type: 'TEXT', columnName: "Card Service ID", selectable: true},
                {id: "PayType", type: 'TEXT', columnName: "Pay Type", selectable: true},
                {id: "PrepaidType", type: 'TEXT', columnName: "Prepaid type", selectable: true}
            ]
        },
        'recharge-clearing':{
            title:'RECHARGE_REPORT',
            reportPath:'/reports/Recharge_Report',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true},
                {id: "MerchantID", type: 'TEXT', columnName: "Merchant ID", selectable: true},
                {id: "IssuerID", type: 'TEXT', columnName: "Issuer ID", selectable: true},
                {id: "AcquirerID", type: 'NUMBER', columnName: "Acquirer ID", selectable: true},
                {id: "CardServiceID", type: 'TEXT', columnName: "Card Service ID", selectable: true},
                {id: "AcquirerType", type: 'TEXT', columnName: "Acquirer Type", selectable: true}
            ]
        },
        'pay-clearing':{
            title:'PAY_REPORT',
            reportPath:'/reports/Pay_Report',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true},
                {id: "MerchantID", type: 'TEXT', columnName: "Merchant ID", selectable: true},
                {id: "IssuerID", type: 'TEXT', columnName: "Issuer ID", selectable: true},
                {id: "AcquirerID", type: 'NUMBER', columnName: "Acquirer ID", selectable: true},
                {id: "CardServiceID", type: 'TEXT', columnName: "Card Service ID", selectable: true}
            ]
        },
        'refund-clearing':{
            title:'REFUND_REPORT',
            reportPath:'/reports/Refund_Report',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true},
                {id: "MerchantID", type: 'TEXT', columnName: "Merchant ID", selectable: true},
                {id: "IssuerID", type: 'TEXT', columnName: "Issuer ID", selectable: true},
                {id: "AcquirerID", type: 'NUMBER', columnName: "Acquirer ID", selectable: true},
                {id: "CardServiceID", type: 'TEXT', columnName: "Card Service ID", selectable: true},
                {id: "RefundType", type: 'TEXT', columnName: "Refund Type", selectable: true}
            ]
        },
        'card-service-clearing':{
            title:'CARD_SERVICE_CLEARING_REPORT',
            reportPath:'/reports/Card_Service_Clearing_Report',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true},
                {id: "IssuerID", type: 'TEXT', columnName: "Issuer ID", selectable: true},
                {id: "CardServiceID", type: 'TEXT', columnName: "Card Service ID", selectable: true}
            ]
        },
        'issuer-clearing':{
            title:'ISSUER_CLEARING_REPORT',
            reportPath:'/reports/Clearing_Issuer',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true},
                {id: "StartSettlementDate", type: 'NUMBER', columnName: "Start Settlement Date", selectable: true},
                {id: "EndSettlementDate", type: 'NUMBER', columnName: "End Settlement Date", selectable: true},
                {id: "IssuerID", type: 'TEXT', columnName: "Issuer ID", selectable: true} ,
                {id: "PrepaidType", type: 'TEXT', columnName: "Prepaid Type", selectable: true}
            ]
        },
        'merchant-clearing':{
            title:'MERCHANT_CLEARING_REPORT',
            reportPath:'/reports/Merchant_Clearing_Report',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true},
                {id: "MerchantID", type: 'TEXT', columnName: "Merchant ID", selectable: true},
                {id: "IssuerID", type: 'TEXT', columnName: "Issuer ID", selectable: true}
            ]
        },
        'acquirer-clearing-summary':{
            title:'ACQUIRER_CLEARING_REPORT_SUMMARY',
            reportPath:'/reports/Acquirer_Report_1.0',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true}
            ]
        },
        'account-transfer-summary':{
            title:'ACCOUNT_TRANSFER_REPORT_SUMMARY',
            reportPath:'/reports/Account_Transfer_Report_1.0',
            attributes: [
                {id: "StartSettleDate", type: 'NUMBER', columnName: "Start Settlement Date", selectable: true},
                {id: "EndSettleDate", type: 'NUMBER', columnName: "End Settlement Date", selectable: true}
            ]
        },
        'card-service-summary':{
            title:'CARD_SERVICE_REPORT_SUMMARY',
            reportPath:'/reports/Card_Service_Report_1.0',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true}
            ]
        },
        'gift-summary':{
            title:'GIFT_REPORT_SUMMARY',
            reportPath:'/reports/Gift_Report_1.0',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true}
            ]
        },
        'issuer-summary':{
            title:'ISSUER_REPORT_SUMMARY',
            reportPath:'/reports/Issuer_Report_1.0',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true}
            ]
        },
        'merchant-summary':{
            title:'MERCHANT_REPORT_SUMMARY',
            reportPath:'/reports/Merchant_Report_1.0',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true}
            ]
        },
        'pay-summary':{
            title:'PAY_REPORT_SUMMARY',
            reportPath:'/reports/Pay_Report_1.0',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true}
            ]
        },
        'process-fee-summary':{
            title:'PROCESS_FEE_REPORT_SUMMARY',
            reportPath:'/reports/Process_Fee_Report_1.0',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true}
            ]
        } ,
        'recharge-pay-summary':{
            title:'RECHARGE_PAY_REPORT_SUMMARY',
            reportPath:'/reports/Recharge_Pay_Report_2',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true}
            ]
        },
        'recharge-summary':{
            title:'RECHARGE_REPORT_SUMMARY',
            reportPath:'/reports/Recharge_Report_2',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true}
            ]
        },
        'refund-summary':{
            title:'REFUND_REPORT_SUMMARY',
            reportPath:'/reports/Refund_Report_1.0',
            attributes: [
                {id: "StartClearingDate", type: 'NUMBER', columnName: "Start Clearing Date", selectable: true},
                {id: "EndClearingDate", type: 'NUMBER', columnName: "End Clearing Date", selectable: true}
            ]
        },
        'settle-issuer-summary':{
            title:'SETTLEMENT_ISSUER_REPORT_SUMMARY',
            reportPath:'/reports/Sattlement_Issuer_Report_1.0',
            attributes: [
                {id: "StartSettleDate", type: 'NUMBER', columnName: "Start Settlement Date", selectable: true},
                {id: "EndSettleDate", type: 'NUMBER', columnName: "End Settlement Date", selectable: true}
            ]
        } ,
        'settle-acquirer-summary':{
            title:'SETTLEMENT_ACQUIRER_REPORT_SUMMARY',
            reportPath:'/reports/Settlement_Acquirer_Report_1.0',
            attributes: [
                {id: "StartSettleDate", type: 'NUMBER', columnName: "Start Settlement Date", selectable: true},
                {id: "EndSettleDate", type: 'NUMBER', columnName: "End Settlement Date", selectable: true}
            ]
        }  ,
        'settle-merchant-summary':{
            title:'SETTLEMENT_MERCHANT_REPORT_SUMMARY',
            reportPath:'/reports/Settlement_Merchant_Report_1.0',
            attributes: [
                {id: "StartSettleDate", type: 'NUMBER', columnName: "Start Settlement Date", selectable: true},
                {id: "EndSettleDate", type: 'NUMBER', columnName: "End Settlement Date", selectable: true}
            ]
        }
    });
