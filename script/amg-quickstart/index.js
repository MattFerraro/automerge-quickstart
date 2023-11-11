import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs";
import { next as Automerge } from "@automerge/automerge";

const repo = new Repo({
  storage: new NodeFSStorageAdapter("./db"),
  network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
});

// repo is already set up by the `repo-node-app` helper
const doc = repo.find("automerge:3qLBJq9yWg6PPY22mUcmHKvJ2eTG");
console.log(await doc.doc());

doc.change((d) => {
  d.counter.increment(1);
});

// This is required because we don't have a way of shutting down the repo
setTimeout(() => process.exit(), 1000);
