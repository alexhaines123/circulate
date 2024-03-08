import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStacks/NotesApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { FrontendStack } from "./stacks/FrontendStack";
import { BucketStack } from "./stacks/StorageStacks/BucketStack";
import { NotesStorageStack } from "./stacks/StorageStacks/NotesStorageStack";
import { ProductStorageStack } from "./stacks/StorageStacks/ProductStorageStack";
import { ProductsApiStack } from "./stacks/ApiStacks/ProductsApiStack";

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
      .stack(NotesStorageStack)
      .stack(ProductStorageStack)
      .stack(ApiStack)
      .stack(ProductsApiStack)
      .stack(AuthStack)
      .stack(FrontendStack);
  },
} satisfies SSTConfig;
