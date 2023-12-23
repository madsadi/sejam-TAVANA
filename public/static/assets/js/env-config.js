window._env_ = 
{
    //------------------- General Keys ----------------------------
    "OnlineTradingGatewayEndPoint": "http://stgotg.tech1a.co",
    "IdpEndPoint": "https://stgidp.tech1a.co",
    "JarchiEndPoint": "http://jarchi.stg-oms.svc.cluster.local:80",
    "CommissionStoreEndPoint": "http://commission-store.tech1a.co",
    "CommissionStoreRPCEndPoint": "http://stgcommission-storeRpc.tech1a.co",
    "NetFlowEndPoint": "http://stgnetflow.tech1a.co",
    "NetFlowRPCEndPoint": "http://stgnetflowrpc.tech1a.co",
    "AdminGatewayEndPoint": "http://stgadmin-gateway.tech1a.co",
    "AdminPanelEndPoint": "http://stgadmin-panel-client.tech1a.co",
    "OnlineTradingWebEndPoint": "http://stgotwebclient.tech1a.co",
    "CustomerManagementRPCEndPoint": "http://customer-management.stg-oms.svc.cluster.local:80",
    "MobileTradingEndPoint": "http://cluster.tech1a.co:9038",
    "SejamGatewayEndPoint": "http://stgsejam-gateway.tech1a.co",
    "FileManagerEndPoint": "http://stgfile-manager.tech1a.co",
    "SejamReactEndPoint": "http://stgsejam.tech1a.co",
    "WalletEndPoint": "http://atgwallet.tech1a.co",
    "MarketDataProviderEndPoint": "http://stgmarket-data-provider.tech1a.co",
    "MarketDataProviderRPCEndPoint": "http://stgmarket-data-provider.stg-oms.svc.cluster.local:80",
	"OrderMediatorRPCEndPoint": "http://stgorder-mediatorRPC.tech1a.co",
	"OrderStoreRPCEndPoint": "http://stgorder-storeRPC.tech1a.co",
	"WatchlistRPCEndPoint": "http://stgwatchlistRPC.tech1a.co",
	"PortfolioRPCEndPoint": "http://stgportfolioRPC.tech1a.co",
	"BookBuildingRPCEndPoint": "http://stgBook-Building-store.tech1a.co",
	"OrderSwitchRPCEndPoint": "http://stgorder-switch.stg-oms.svc.cluster.local:80",
	"MarketRuleRPCEndPoint": "http://stgmarket-rule-store.tech1a.co",
	"IdpUIEndPoint": "https://stgidp-client.tech1a.co",
	"TbsEndPoint": "http://tbsapi.onlintech1a.co/api",
    "OnlineRegistrationEndPoint": "http://OnlineRegistrationEndPoint.tech1a.co",

    "MarketerEndPoint": "http://stgmarketer.tech1a.co",
    "MarketerApiEndPoint": "http://stgmarketer-api.tech1a.co",
    "MarketDataProviderRPCEndPoint": "http://MarketDataProviderRPC.tech1a.co:",
    "CaptchaEndPoint": "https://stgcaptcha.tech1a.co",

    "SplunkHostEndPoint": "log.tech1a.co",
    "SplunkPort": 5142,
    "KafkaBootstrapServersEndPoint": "kafka-stg-kafka-headless.stg-kafka.svc.cluster.local:9092",
    "RegisterServicePermissionEndPoint": "https://stgidp.tech1a.co/api/service-permossion/register-service-permission",
    "TavanaCaptchaVerificationEndPoint": "https://stgcaptcha.tech1a.co/api/validate",
    "GoogleRecaptchaVerificationEndPoint": "http://www.google.com/recaptcha/api/siteverify",
    "GoogleRecaptchaServerKey": "6LeuUk8aAAAAAFjIwrWsSd0yIu5XUySlJ9hyeT38",

    //------------------  Jarchi Keys ------------------------------
    "JarchiConnectionString": "Server=172.24.34.19;Database=Stg_Jarchi;User Id=jarchi;Password=9KAD&*&U)z&wMT(I;",

    //------------------  CustomerManagement Keys ------------------------------
    "CustomerManagementConnectionString": "Data Source=172.24.34.19;Initial Catalog=Stg_CustomerRegistration;User Id=Customer_User;Password=A%FEg8NppUBQZ45e;MultipleActiveResultSets=True;",
    "TbsEndPoint": "http://tbsapi.onlintech1a.co/api",
    "OnlineRegistrationEndPoint": "http://stgsejam.tech1a.co",

    //------------------  Idp Keys ------------------------------
    "IdpConnectionString": "Server=172.24.34.19;Database=Stg_Idp;User Id=Idp;Password=IDP@97790;",
    "IdpUIEndPoint": "https://stgidp-client.tech1a.co",

    //------------------  FileManager Keys ------------------------------
    "FileManagerConnectionString": "Server=172.24.34.19;Database=Stg_FileStream;uid=FileStream;pwd=3WzFgJdQyF4JBhm3;Integrated Security=False",
        //------------------  Order Mediator Keys ------------------------------
    "OrderMediatorSQLConnectionString": "Server=172.24.34.19;Database=Stg_OrderStore;ID=oms;Password=Oms@123456;Integrated Security=False",
    //------------------  Admin Panel Keys ------------------------------
    "NetflowEndPoint": "http://stgnetflow.tech1a.co",
    "MarketerAdminEndPoint": "http://stgmarketer-admin.tech1a.co",

    //------------------  CommissionStore Keys ------------------------------
    "CommissionStoreConnectionString": "Data Source=172.24.34.19;Initial Catalog=Stg_CommissionStore;User ID=comStoreUser;Password=Com@123456;MultipleActiveResultSets=True",	
    //------------------  BookBuilding Keys ------------------------------
	"BookBuildingConnectionString": "Data Source=172.24.34.19;Initial Catalog=Stg_BookBuildingStore;User ID=oms;Password=Oms@123456;MultipleActiveResultSets=True",
    //------------------  CashRequest Keys ------------------------------
	"CashRequestConnectionString": "Data Source=172.24.34.19;Initial Catalog=Stg_CashRequest;User ID=CashRequestUser;Password=Cash@123456;MultipleActiveResultSets=True",
    //------------------  IntradayPortfolio Keys ------------------------------
	"IntradayPortfolioConnectionString": "Data Source=172.24.34.19;Initial Catalog=Stg_PortfolioManagment;User ID=Portfolio;Password=HrxG+egWNdK&Hng(;MultipleActiveResultSets=True;Application Name=My Application;Connection Timeout=120;TrustServerCertificate=True",
    //------------------  IntradayPortfolioMongo Keys ------------------------------
	"IntradayPortfolioMongoConnectionString": "mongodb://root:1219S4OiIhSXPJmOGfmdlFlsQ121@mongodb-mongo-mongo-headless.stg-mongodb.svc.cluster.local:27017/",
    //------------------  IpgTransaction Keys ------------------------------
	"IpgTransactionConnectionString": "Server=172.24.34.19;Database=Stg_IPGTransaction;uid=ipg;pwd=Ipg@123456;",
    //------------------  MarketDataProvider Keys ------------------------------
	"MarketDataProviderConnectionString": "Data Source=172.24.34.19;Initial Catalog=Stg_MarketData;User ID=MarketDataUser;Password=Market@123456;MultipleActiveResultSets=True;Application Name=My Application;Connection Timeout=120;",
    //------------------  MarketRuleStore Keys ------------------------------
	"MarketRuleStoreConnectionString": "Data Source=172.24.34.19;Initial Catalog=Stg_MarketRuleStore;User ID=oms;Password=Oms@123456;MultipleActiveResultSets=True",
    //------------------  NetFlow Keys ------------------------------
	"NetFlowConnectionString": "server=172.24.34.19;database=Stg_NetFlow;uid=netFlowUser;pwd=NetFlow@123456;",
    //------------------  OrderMediatorMongo Keys ------------------------------
	"OrderMediatorMongoConnectionString": "mongodb://root:1219S4OiIhSXPJmOGfmdlFlsQ121@mongodb-mongo-mongo-headless.stg-mongodb.svc.cluster.local:27017/",
    //------------------  OrderSwitchRedis Keys ------------------------------
	"OrderSwitchRedisConnectionString": "redis-headless.stg-redis.svc.cluster.local:6379,password=Duk0zfgYJhGWKDre",
    //------------------  TseTransmitter Keys ------------------------------
	"TseTransmitterConnectionString": "Data Source=172.24.34.19;Initial Catalog=Stg_TSETransmitter;User ID=transmitterUser;Password=Transmitter@123456;MultipleActiveResultSets=True",
    //------------------  Wallet Keys ------------------------------
	"WalletConnectionString": "Server=172.24.34.19;Database=Stg_CashFlow;uid=cfl;pwd=Cfl@123456;",
    //------------------  Watchlist Keys ------------------------------
	"WatchlistConnectionString": "Data Source=172.24.34.19;Initial Catalog=Stg_Watchlist;User ID=WatchList_User;Password=Watchlist@1234;MultipleActiveResultSets=True;",
     //------------------  Credit Management Keys ------------------------------
    "CreditManagementSQLConnectionString":  "Data Source=172.24.34.19;Initial Catalog=Stg-Credit;User ID=credit-management;Password=123456;MultipleActiveResultSets=True;Application Name=My Application;Connection Timeout=120;TrustServerCertificate=True"

}

 ;
