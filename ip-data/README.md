# ip-data

Wraps the following API: http://ip-api.com/docs/api:json

Demo usage:

```ts
import getIPData from "@rbxts/ip-data";
import { ServerLocation } from "MyRemoteEvents"
const UnknownLocationStr = "Server Location: Unknown";

getIPData()
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
