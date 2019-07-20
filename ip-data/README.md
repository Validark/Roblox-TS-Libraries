# ip-data

Demo usage

```ts
import getIPData from "@rbxts/ip-data";

const UnknownLocationStr = "Server Location: Unknown";

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
