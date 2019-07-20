/// <reference types="@rbxts/types" />
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
/**
 * Returns a table with information about the IP that called this function.
 *
 * Uses http://ip-api.com/json/
 */
declare function getIPData(): Promise<Pick<IPDataSuccess, "status" | "country" | "countryCode" | "region" | "regionName" | "city" | "zip" | "lat" | "lon" | "timezone" | "isp" | "org" | "as" | "query"> | IPDataFail>;
/**
 * Returns a table with information about the IP that called this function.
 *
 * Uses http://ip-api.com/json/
 *
 * @param fields The fields you want to be defined in your IPData table
 */
declare function getIPData<T extends keyof IPDataFields>(...fields: Array<T>): Promise<Pick<IPDataSuccess, T | "status"> | IPDataFail>;
export = getIPData;
