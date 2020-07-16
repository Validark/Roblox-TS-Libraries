/// <reference types="@rbxts/types" />
interface IPDataSuccess {
    /**
     * Whether the request was successful
     */
    status: "success";
    /**
     * Continent name
     *
     * Example: North America
     */
    continent: string;
    /**
     * Two-letter continent code
     *
     * Example: NA
     */
    continentCode: string;
    /**
     * Country name
     *
     * Example: "United States"
     */
    country: string;
    /**
     * Two-letter country code ISO 3166-1 alpha-2
     *
     * Example: "US"
     *
     * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    countryCode: string;
    /**
     * Region/state short code (FIPS or ISO)
     *
     * Examples: "CA", "10"
     */
    region: string;
    /**
     * Region/State name
     *
     * Example: "California"
     */
    regionName: string;
    /**
     * City name
     *
     * Example: "Mountain View"
     */
    city: string;
    /**
     * District (subdivision of city)
     *
     * Example: "Old Farm District"
     */
    district: string;
    /**
     * Zip code
     *
     * Example: 94043
     */
    zip: string;
    /**
     * Latitude
     *
     * Example: 37.4192
     */
    lat: number;
    /**
     * Longitude
     *
     * Example: -122.0574
     */
    lon: number;
    /**
     * City timezone
     *
     * Example: "America/Los_Angeles"
     */
    timezone: string;
    /**
     * National currency
     *
     * Example: USD
     */
    currency: string;
    /**
     * Internet Service Provider Name
     *
     * Example: "Google"
     */
    isp: string;
    /**
     * Organization name
     *
     * Example: "Google"
     */
    org: string;
    /**
     * AS number and name, separated by space
     *
     * Example: "AS15169 Google Inc."
     */
    as: string;
    /**
     * AS name (RIR). Empty for IP blocks not being announced in BGP tables.
     *
     * Example: GOOGLE
     */
    asname: string;
    /**
     * Reverse DNS of the IP
     *
     * Example: "wi-in-f94.1e100.net"
     */
    reverse: string;
    /**
     * Mobile (cellular) connection
     */
    mobile: boolean;
    /**
     * Proxy (anonymous)
     */
    proxy: boolean;
    /**
     * IPv4 used for the query
     */
    query: string;
    /**
     * A rating of how accurate these values are, presumably out of 10
     *
     * Example: 10
     */
    accuracy: number;
}
interface IPDataFail {
    status: "fail";
    /**
     * Describes why the request failed
     */
    message: "private range" | "reserved range" | "invalid query";
}
declare const _default: () => Promise<IPDataSuccess | IPDataFail>;
export = _default;
