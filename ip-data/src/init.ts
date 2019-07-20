const HttpService = game.GetService("HttpService");

interface IPDataFields {
	/**
	 * Country name
	 *
	 * Example: "United States"
	 */
	readonly country: string;

	/**
	 * Two-letter country code ISO 3166-1 alpha-2
	 *
	 * Example: "US"
	 *
	 * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
	 */
	readonly countryCode: string;

	/**
	 * Region/state short code (FIPS or ISO)
	 *
	 * Examples: "CA", "10"
	 */
	readonly region: string;

	/**
	 * Region/State name
	 *
	 * Example: "California"
	 */
	readonly regionName: string;

	/**
	 * City name
	 *
	 * Example: "Mountain View"
	 */
	readonly city: string;

	/**
	 * District (subdivision of city)
	 *
	 * Example: "Old Farm District"
	 */
	readonly district: string;

	/**
	 * Zip code
	 *
	 * Example: 94043
	 */
	readonly zip: string;

	/**
	 * Latitude
	 *
	 * Example: 37.4192
	 */
	readonly lat: number;

	/**
	 * Longitude
	 *
	 * Example: -122.0574
	 */
	readonly lon: number;

	/**
	 * City timezone
	 *
	 * Example: "America/Los_Angeles"
	 */
	readonly timezone: string;

	/**
	 * Internet Service Provider Name
	 *
	 * Example: "Google"
	 */
	readonly isp: string;

	/**
	 * Organization name
	 *
	 * Example: "Google"
	 */
	readonly org: string;

	/**
	 * AS number and name, separated by space
	 *
	 * Example: "AS15169 Google Inc."
	 */
	readonly as: string;

	/**
	 * Reverse DNS of the IP
	 *
	 * Example: "wi-in-f94.1e100.net"
	 */
	readonly reverse: string;

	/**
	 * Mobile (cellular) connection
	 */
	readonly mobile: boolean;

	/**
	 * Proxy (anonymous)
	 */
	readonly proxy: boolean;

	/**
	 * IPv4 used for the query
	 */
	readonly query: string;

	/**
	 * Hidden value for some reason. Appears to be a rating of how accurate these values are, out of 10
	 *
	 * Example: 10
	 */
	readonly accuracy: number;
}

interface IPDataFail {
	readonly status: "fail";

	/**
	 * Included only when status is "fail".
	 *
	 * Will be one of the following: "private range", "reserved range", "invalid query", or a HttpService:GetAsync error
	 */
	readonly message: string;
}

interface IPDataSuccess extends IPDataFields {
	/**
	 * Whether the request was successful
	 */
	readonly status: "success";
}

// Each bit will represent one field
const fieldBits = {
	country: 0b1,
	countryCode: 0b10,
	region: 0b100,
	regionName: 0b1000,
	city: 0b10000,
	zip: 0b100000,
	lat: 0b1000000,
	lon: 0b10000000,
	timezone: 0b100000000,
	isp: 0b1000000000,
	org: 0b10000000000,
	as: 0b100000000000,
	reverse: 0b1000000000000,
	query: 0b10000000000000,
	status: 0b100000000000000,
	message: 0b1000000000000000,
	mobile: 0b10000000000000000,
	proxy: 0b100000000000000000,
	accuracy: 0b1000000000000000000,
	district: 0b10000000000000000000,
};

const FORCED_FIELDS_SUM = fieldBits.status + fieldBits.message;

function ipAPIAsync(binaryInteger: number) {
	return binaryInteger === FORCED_FIELDS_SUM
		? HttpService.GetAsync(`http://ip-api.com/json/`)
		: HttpService.GetAsync(`http://ip-api.com/json/?fields=${binaryInteger}`);
}

/**
 * Returns a table with information about the IP that called this function.
 *
 * Uses http://ip-api.com/json/
 */
async function getIPData(): Promise<
	| Pick<
			IPDataSuccess,
			| "status"
			| "country"
			| "countryCode"
			| "region"
			| "regionName"
			| "city"
			| "zip"
			| "lat"
			| "lon"
			| "timezone"
			| "isp"
			| "org"
			| "as"
			| "query"
	  >
	| IPDataFail
>;

/**
 * Returns a table with information about the IP that called this function.
 *
 * Uses http://ip-api.com/json/
 *
 * @param fields The fields you want to be defined in your IPData table
 */
async function getIPData<T extends keyof IPDataFields>(
	...fields: Array<T>
): Promise<Pick<IPDataSuccess, T | "status"> | IPDataFail>;

async function getIPData(...fields: Array<keyof IPDataFields>) {
	// This binary integer is equivalent, according to the API, to passing along a CSV
	// list of all the fields you would like returned back to you.
	// The reason we do this is to optimize bandwidth.
	let binaryInteger = FORCED_FIELDS_SUM;
	for (const field of fields) binaryInteger += fieldBits[field];
	const [success, data] = pcall(ipAPIAsync, binaryInteger);

	if (success) {
		return HttpService.JSONDecode(data) as IPDataSuccess;
	} else {
		return {
			status: "fail",
			message: data,
		} as IPDataFail;
	}
}

export = getIPData;
