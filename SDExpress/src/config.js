module.exports = function(){
	var config = {
		dbConnection : {
			default: "Driver={SQL Server Native Client 11.0};Server=10.43.43.156;Trusted_Connection={Yes};Database={ConfigStore}",
			
			qa: "Driver={SQL Server Native Client 11.0};Server=10.43.43.156;Trusted_Connection={Yes};Database={ConfigStore}",
			
			dev:"Driver={SQL Server Native Client 11.0};Server=cns-etdbdevvs1;UID=configstoreuser;PWD=configstoreuserdev;Database={ConfigStore}"
		},
		
		dbCommand :{
			ConnectionString:{		
				get: "SELECT TOP 500 * FROM ConfigStore.dbo.ConnectionString WITH(NOLOCK) WHERE [Namespace] LIKE ? AND ServerEnvironmentName LIKE ? AND [Value] LIKE ? AND ConfigVersion=1",
				
				create:"INSERT INTO[ConfigStore].[dbo].[ConnectionString]([Namespace],[ServerEnvironmentName],[ConfigVersion],[Value],[InsertDate],[InsertBy_id],[SaveDate],[SaveBy_id],[UpdateDate])VALUES(?,?,'1',?,GETDATE(),-1,GETDATE(),-1,GETDATE())",
				
				update:"UPDATE TOP(1) ConfigStore.dbo.ConnectionString SET [Value]=?,[UpdateDate]=GETDATE() WHERE [Namespace]=? AND [ServerEnvironmentName]=? AND [ConfigVersion]=1",
				
				delete:"DELETE TOP(1) ConfigStore.dbo.ConnectionString WHERE [Namespace]=? AND [ServerEnvironmentName]=? AND [ConfigVersion]=1"
			},
			
			ConnectionStringNamespace:{
				get:"SELECT TOP 500 * FROM ConfigStore.dbo.ConnectionStringNamespace WITH(NOLOCK) WHERE [Namespace] LIKE ?",
				
				create:"INSERT INTO[ConfigStore].[dbo].[ConnectionStringNamespace]([Namespace],[ConfigVersion],[InsertDate],[InsertBy_id],[SaveDate],[SaveBy_id],[UpdateDate])VALUES(?,'1',GETDATE(),-1,GETDATE(),-1,GETDATE())",
							
				delete:"DELETE TOP(1) ConfigStore.dbo.[ConnectionStringNamespace] WHERE [Namespace]=? AND [ConfigVersion]=1"
			}
		}
	}
	return config;
}

