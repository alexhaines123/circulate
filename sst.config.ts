import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStacks/NotesApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { FrontendStack } from "./stacks/FrontendStack";
import { BucketStack } from "./stacks/FileStorageStacks/BucketStack";
import { NotesStorageStack } from "./stacks/StorageStacks/NotesStorageStack";
import { ProductStorageStack } from "./stacks/StorageStacks/ProductStorageStack";
import { ProductsApiStack } from "./stacks/ApiStacks/ProductsApiStack";
import { MarketplaceDatabaseStack } from "./stacks/DatabaseStacks/MarketplaceDatabaseStack";

export default {
  config(_input) {
    return {
      name: "circulate-test",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app
      .stack(BucketStack)
      .stack(MarketplaceDatabaseStack)
      .stack(NotesStorageStack)
      .stack(ProductStorageStack)
      .stack(ApiStack)
      .stack(ProductsApiStack)
      .stack(AuthStack)
      .stack(FrontendStack);
  },
} satisfies SSTConfig;
