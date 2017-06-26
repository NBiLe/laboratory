export function getEndpoint(resource, endpoint) {
  let res = endpointsMap[resource];
  if (!res) { return; }

  return res.endpoints[endpoint];
}

export function getTemplate(...args) {
  let ep = getEndpoint(...args)
  if (!ep) { return; }

  return ep.path;
}

export const endpointsMap = {
  'accounts': {
    'label': '账户(Accounts)',
    'endpoints': {
      'single': {
        'label': '单个账户',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/accounts-single.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}',
        },
        'setupComponent': require('../components/SetupPanes/SingleAccount'),
      }
    }
  },
  'effects': {
    'label': '记录(Effects)',
    'endpoints': {
      'all': {
        'label': '总账的记录',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-all.html',
        'method': 'GET',
        'path': {
          template: '/effects{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'for_account': {
        'label': '账户的记录',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/effects{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': '账页的记录',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledger/{ledger}/effects{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      },
      'for_operation': {
        'label': '操作的记录',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-operation.html',
        'method': 'GET',
        'path': {
          template: '/operation/{operation}/effects{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForOperation'),
      },
      'for_transaction': {
        'label': '事务的记录',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-transaction.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}/effects',
        },
        'setupComponent': require('../components/SetupPanes/ForTransaction'),
      }
    }
  },
  'ledgers': {
    'label': '总账(ledgers)',
    'endpoints': {
      'all': {
        'label': '所有账页',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/ledgers-all.html',
        'method': 'GET',
        'path': {
          template: '/ledgers{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'single': {
        'label': '单个账页',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/ledgers-single.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}',
        },
        'setupComponent': require('../components/SetupPanes/SingleLedger'),
      }
    }
  },
  'offers': {
    'label': '挂单(offers)',
    'endpoints': {
      'for_account': {
        'label': '账户挂单',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/offers-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/offers{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      }
    }
  },
  'operations': {
    'label': '操作(operations)',
    'endpoints': {
      'all': {
        'label': '总账所有操作',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-all.html',
        'method': 'GET',
        'path': {
          template: '/operations{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'single': {
        'label': '单个操作',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-single.html',
        'method': 'GET',
        'path': {
          template: '/operations/{operation}',
        },
        'setupComponent': require('../components/SetupPanes/SingleOperation'),
      },
      'for_account': {
        'label': '账户操作',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/operations{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': '账页操作',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/operations{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      },
      'for_transaction': {
        'label': '事务操作',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-for-transaction.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}/operations{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForTransaction'),
      }
    }
  },
  'order_book': {
    'label': '订单(Order Book)',
    'endpoints': {
      'details': {
        'label': '细节',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/orderbook-details.html',
        'method': 'GET',
        'path': {
          template: '/order_book{?selling_asset_type,selling_asset_code,selling_asset_issuer,buying_asset_type,buying_asset_code,buying_asset_issuer}',
          'selling_asset_type': 'selling_asset.type',
          'selling_asset_code': 'selling_asset.code',
          'selling_asset_issuer': 'selling_asset.issuer',
          'buying_asset_type': 'buying_asset.type',
          'buying_asset_code': 'buying_asset.code',
          'buying_asset_issuer': 'buying_asset.issuer',
        },
        'setupComponent': require('../components/SetupPanes/OrderBookDetails'),
      },
      'trades': {
        'label': '交易详情',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/trades-for-orderbook.html',
        'method': 'GET',
        'path': {
          template: '/order_book/trades{?selling_asset_type,selling_asset_code,selling_asset_issuer,buying_asset_type,buying_asset_code,buying_asset_issuer,cursor,limit,order}',
          'selling_asset_type': 'selling_asset.type',
          'selling_asset_code': 'selling_asset.code',
          'selling_asset_issuer': 'selling_asset.issuer',
          'buying_asset_type': 'buying_asset.type',
          'buying_asset_code': 'buying_asset.code',
          'buying_asset_issuer': 'buying_asset.issuer',
        },
        'setupComponent': require('../components/SetupPanes/OrderBookTrades'),
      }
    }
  },
  'paths': {
    'label': '路径(Paths)',
    'endpoints': {
      'all': {
        'label': '路径支付',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/path-finding.html',
        'method': 'GET',
        'path': {
          template: '/paths{?source_account,destination_account,destination_asset_type,destination_asset_code,destination_asset_issuer,destination_amount}',
          'destination_asset_type': 'destination_asset.type',
          'destination_asset_code': 'destination_asset.code',
          'destination_asset_issuer': 'destination_asset.issuer',
        },
        'setupComponent': require('../components/SetupPanes/FindPaymentPaths'),
      }
    }
  },
  'payments': {
    'label': '支付(Payments)',
    'endpoints': {
      'all': {
        'label': '所有的支付操作',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-all.html',
        'method': 'GET',
        'path': {
          template: '/payments{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'for_account': {
        'label': '账户的支付操作',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/payments{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': '账页的支付操作',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/payments{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      },
      'for_transaction': {
        'label': '事务的支付操作',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-for-transaction.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}/payments{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForTransaction'),
      }
    }
  },
  'transactions': {
    'label': '业务(Transactions)',
    'endpoints': {
      'all': {
        'label': '所有业务',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-all.html',
        'method': 'GET',
        'path': {
          template: '/transactions{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'single': {
        'label': '单笔业务(get)',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-single.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}',
        },
        'setupComponent': require('../components/SetupPanes/SingleTransaction'),
      },
      'create': {
        'label': '单笔业务(post)',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-create.html',
        'method': 'POST',
        'disableStreaming': true,
        'path': {
          template: '/transactions',
        },
        'setupComponent': require('../components/SetupPanes/PostTransaction'),
      },
      'for_account': {
        'label': '账户业务',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/transactions{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': '账页业务',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/transactions{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      }
    }
  }
};
