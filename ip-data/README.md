# ip-data

Wraps the following API: http://ip-api.com/docs/api:json

Demo usage:

```ts
import getIPData from "@rbxts/ip-data";
import { ServerLocation } from "MyRemoteEvents"
const UnknownLocationStr = "Server Location: Unknown";

// Only call getIPData once per server instance.
// Just replicate the necessary data to each client when they join.
getIPData("regionName", "country")
	.then(
		myData => {
			return myData.status === "success"
				? "Server Location: %s, %s".format(myData.regionName, myData.country)
				: UnknownLocationStr;
		},
		() => {
			return UnknownLocationStr;
		},
	)
	.then(locationString => {
		ServerLocation.FireAllClients(locationString);
		Players.PlayerAdded.Connect(plr => ServerLocation.FireClient(plr, locationString));
	});
```
