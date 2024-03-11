import { Api, RDS, StackContext } from "sst/constructs";

export function MarketplaceDatabaseStack({ stack }: StackContext) {
  const DATABASE = "MarketplaceDB";

  // Create the Aurora DB cluster
  const cluster = new RDS(stack, "Cluster", {
    engine: "postgresql13.9",
    defaultDatabaseName: DATABASE,
    migrations: "services/migrations",
  });

  stack.addOutputs({
    SecretArn: cluster.secretArn,
    ClusterIdentifier: cluster.clusterIdentifier,
  });

  return {
    cluster,
  };
}
