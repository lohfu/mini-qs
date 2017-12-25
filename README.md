# mini-qs

Extremely small, client query string parser aiming for feature parity with Node.
In attempt to squeeze bytes, it does not handle any edge cases.

Currently the `escape` and `unescape` methods are not implemented, and thus not
exposed.

## Not For Use With Node

Use a script to replace requires or imports of `mini-qs` with the native
`querystring` module.

This probably requires you to use the default export in ES module environments though,
ie i think you h
