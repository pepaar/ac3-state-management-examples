<h2 align="center">Apollo Client 3 State Management Examples</h2>

<p align="center">Learn how to use AC3 for local and remote state management</p>

## About

[Apollo Client 3](https://www.apollographql.com/docs/react/v3.0-beta/migrating/apollo-client-3-migration/) is a GraphQL client that allows you to easily query the exact data you need from a GraphQL server. In addition to fetching and mutating data, Apollo analyzes your queries and their results to construct a client-side cache of your data, which is kept up to date as further queries and mutations are run, fetching more results from the server.

We have found that it can be challenging for developers coming from another state management library (like [Redux](https://redux.js.org/)) to fully grasp the AC3-way of doing things.

### What we're building

This repo contains a Apollo backed version the Todo app

![](https://user-images.githubusercontent.com/6892666/76266873-4cd96a00-623f-11ea-8367-e0735d63a54f.png)

## Examples

### Apollo Todo Lists Example

> Summary: Hooking Apollo Client up to a remote GraphQL API, the client-side cache is smart enough to automatically update the cache after _most_ mutations successfully complete. For mutations that perform interactions against arrays or have additional client-side side-effects, we can help the cache decide what to do next by writing our update logic in the `useMutation`'s `update` function. This approach uses the `writeQuery` and `readQuery` APIs which are recommended for those starting out with Apollo Client.

### More

Check out main repository for advanced way on how to update cache with `cache.modify` and `cache.evict`.
This approach is recommended for users who are comfortable with how cache normalization works in Apollo Client and who want direct control over the cache.

[Check out the master respository for more examples](https://github.com/apollographql/ac3-state-management-examples/)
