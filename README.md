# JSON Patch Generation Sandbox

### Utility for creating and testing json patches.

 - json8 x 106,495 ops/sec ±0.99% (91 runs sampled)
 - fast-json-patch x 156,940 ops/sec ±1.34% (87 runs sampled)
 - jiff x 98,351 ops/sec ±1.19% (89 runs sampled)
 - deep-diff x 56,751 ops/sec ±1.01% (90 runs sampled)

### Fastest is fast-json-patch

fast-json-patch also works correctly on arrays with multiple json elements.