// Type Defs

export interface paths {
    "/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * View notifications
         * @description View the details of multiple notifications
         */
        get: operations["get_notifications"];
        put?: never;
        /**
         * Create notification
         * @description Sends notifications to your users
         *
         */
        post: operations["create_notification"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/{notification_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * View notification
         * @description View the details of a single notification and outcomes associated with it
         */
        get: operations["get_notification"];
        put?: never;
        post?: never;
        /**
         * Stop a scheduled or currently outgoing notification
         * @description Used to stop a scheduled or currently outgoing notification
         */
        delete: operations["cancel_notification"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/{notification_id}/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Notification History
         * @description -> View the devices sent a message - OneSignal Paid Plan Required This method will return all devices that were sent the given notification_id of an Email or Push Notification if used within 7 days of the date sent. After 7 days of the sending date, the message history data will be unavailable. After a successful response is received, the destination url may be polled until the file becomes available. Most exports are done in ~1-3 minutes, so setting a poll interval of 10 seconds should be adequate. For use cases that are not meant to be consumed by a script, an email will be sent to the supplied email address. &#x1F6A7; Requirements A OneSignal Paid Plan. Turn on Send History via OneSignal API in Settings -> Analytics. Cannot get data before this was turned on. Must be called within 7 days after sending the message. Messages targeting under 1000 recipients will not have "sent" events recorded, but will show "clicked" events. Requires your OneSignal App's REST API Key, available in Keys & IDs.
         */
        post: operations["get_notification_history"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * View apps
         * @description View the details of all of your current OneSignal apps
         */
        get: operations["get_apps"];
        put?: never;
        /**
         * Create an app
         * @description Creates a new OneSignal app
         */
        post: operations["create_app"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * View an app
         * @description View the details of a single OneSignal app
         */
        get: operations["get_app"];
        /**
         * Update an app
         * @description Updates the name or configuration settings of an existing OneSignal app
         */
        put: operations["update_app"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/segments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create Segments
         * @description Create segments visible and usable in the dashboard and API - Required: OneSignal Paid Plan
         *     The Create Segment method is used when you want your server to programmatically create a segment instead of using the OneSignal Dashboard UI. Just like creating Segments from the dashboard you can pass in filters with multiple "AND" or "OR" operator's.
         *     &#x1F6A7;
         *     Does Not Update Segments
         *     This endpoint will only create segments, it does not edit or update currently created Segments. You will need to use the Delete Segments endpoint and re-create it with this endpoint to edit.
         *
         */
        post: operations["create_segments"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/segments/{segment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete Segments
         * @description Delete segments (not user devices) - Required: OneSignal Paid Plan
         *     You can delete a segment under your app by calling this API. You must provide an API key in the Authorization header that has admin access on the app.
         *     The segment_id can be found in the URL of the segment when viewing it in the dashboard.
         *
         */
        delete: operations["delete_segments"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/outcomes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * View Outcomes
         * @description View the details of all the outcomes associated with your app
         *
         *     &#x1F6A7;
         *     Requires Authentication Key
         *     Requires your OneSignal App's REST API Key, available in Keys & IDs.
         *
         *     &#x1F6A7;
         *     Outcome Data Limitations
         *     Outcomes are only accessible for around 30 days before deleted from our servers. You will need to export this data every month if you want to keep it.
         *
         */
        get: operations["get_outcomes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/live_activities/{activity_id}/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Update a Live Activity via Push
         * @description Updates a specified live activity.
         */
        post: operations["update_live_activity"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/live_activities/{activity_id}/token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Start Live Activity
         * @description Starts a Live Activity
         */
        post: operations["begin_live_activity"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/live_activities/{activity_id}/token/{subscription_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Stop Live Activity
         * @description Stops a Live Activity
         */
        delete: operations["end_live_activity"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Creates a User, optionally Subscriptions owned by the User as well as Aliases.
         *     Aliases provided in the payload will be used to look up an existing User. */
        post: operations["create_user"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/users/{external_user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Edit tags with external user id
         * @description Update an existing device's tags in one of your OneSignal apps using the External User ID.
         *     Warning - Android SDK Data Synchronization
         *     Tags added through the Android SDK tagging methods may not update if using the API to change or update the same tag.
         *     For example, if you use SDK method sendTag("key", "value1") then update the tag value to "value2" with this API endpoint. You will not be able to set the value back to "value1" through the SDK, you will need to change it to something different through the SDK to be reset.
         *     Recommendations if using this Endpoint on Android Mobile Apps:
         *     1 - Do not use the same tag keys for SDK and API updates
         *     2 - If you want to use the same key for both SDK and API updates, call the SDK getTags method first to update the device's tags.
         *     This is only applicable on the Android Mobile App SDKs.
         *     &#128216;
         *     Deleting Tags
         *     To delete a tag, include its key and set its value to blank. Omitting a key/value will not delete it.
         *     For example, if I wanted to delete two existing tags rank and category while simultaneously adding a new tag class, the tags JSON would look like the following:
         *     "tags": {
         *        "rank": "",
         *        "category": "",
         *        "class": "my_new_value"
         *     }
         *
         */
        put: operations["update_player_tags"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/users/by/{alias_label}/{alias_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Returns the User’s properties, Aliases, and Subscriptions. */
        get: operations["fetch_user"];
        put?: never;
        post?: never;
        /** @description Removes the User identified by (:alias_label, :alias_id), and all Subscriptions and Aliases */
        delete: operations["delete_user"];
        options?: never;
        head?: never;
        /** @description Updates an existing User’s properties. */
        patch: operations["update_user"];
        trace?: never;
    };
    "/apps/{app_id}/users/by/{alias_label}/{alias_id}/identity": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Lists all Aliases for the User identified by (:alias_label, :alias_id). */
        get: operations["fetch_user_identity"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** @description Upserts one or more Aliases to an existing User identified by (:alias_label, :alias_id). */
        patch: operations["identify_user_by_alias"];
        trace?: never;
    };
    "/apps/{app_id}/users/by/{alias_label}/{alias_id}/identity/{alias_label_to_delete}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** @description Deletes an alias by alias label */
        delete: operations["delete_alias"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/users/by/{alias_label}/{alias_id}/subscriptions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Creates a new Subscription under the User provided. Useful to add email addresses and SMS numbers to the User. */
        post: operations["create_subscription"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/apps/{app_id}/subscriptions/{subscription_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** @description Deletes the Subscription. */
        delete: operations["delete_subscription"];
        options?: never;
        head?: never;
        /** @description Updates an existing Subscription’s properties. */
        patch: operations["update_subscription"];
        trace?: never;
    };
    "/apps/{app_id}/subscriptions/{subscription_id}/user/identity": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Lists all Aliases for the User identified by :subscription_id. */
        get: operations["fetch_aliases"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** @description Upserts one or more Aliases for the User identified by :subscription_id. */
        patch: operations["identify_user_by_subscription_id"];
        trace?: never;
    };
    "/apps/{app_id}/subscriptions/{subscription_id}/owner": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** @description Transfers this Subscription to the User identified by the identity in the payload. */
        patch: operations["transfer_subscription"];
        trace?: never;
    };
    "/apps/{app_id}/subscriptions/{subscription_id}/iams": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Manifest of In-App Messages the Subscription is eligible to display by the SDK. */
        get: operations["get_eligible_iams"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/players": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * View devices
         * @description View the details of multiple devices in one of your OneSignal apps
         *     Unavailable for Apps Over 80,000 Users
         *     For performance reasons, this method is not available for larger apps. Larger apps should use the CSV export API endpoint, which is much more performant.
         *
         */
        get: operations["get_players"];
        put?: never;
        /**
         * Add a device
         * @description Register a new device to one of your OneSignal apps
         *     &#x1F6A7;
         *     Don't use this
         *     This API endpoint is designed to be used from our open source Mobile and Web Push SDKs. It is not designed for developers to use it directly, unless instructed to do so by OneSignal support.
         *     If you use this method instead of our SDKs, many OneSignal features such as conversion tracking, timezone tracking, language detection, and rich-push won't work out of the box. It will also make it harder to identify possible setup issues.
         *     This method is used to register a new device with OneSignal.
         *     If a device is already registered with the specified identifier, then this will update the existing device record instead of creating a new one.
         *     The returned player is a player / user ID. Use the returned ID to send push notifications to this specific user later, or to include this player when sending to a set of users.
         *     &#x1F6A7;
         *     iOS
         *     Must set test_type to 1 when building your iOS app as development. Omit this field in your production app builds.
         *
         */
        post: operations["create_player"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/players/{player_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * View device
         * @description View the details of an existing device in one of your OneSignal apps
         */
        get: operations["get_player"];
        /**
         * Edit device
         * @description Update an existing device in one of your OneSignal apps
         */
        put: operations["update_player"];
        post?: never;
        /**
         * Delete a user record
         * @description Delete player - Required:
         *     Used to delete a single, specific Player ID record from a specific OneSignal app.
         *
         */
        delete: operations["delete_player"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/players/csv_export?app_id={app_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Export CSV of Players
         * @description Generate a compressed CSV export of all of your current user data
         *     This method can be used to generate a compressed CSV export of all of your current user data. It is a much faster alternative than retrieving this data using the /players API endpoint.
         *     The file will be compressed using GZip.
         *     The file may take several minutes to generate depending on the number of users in your app.
         *     The URL generated will be available for 3 days and includes random v4 uuid as part of the resource name to be unguessable.
         *     &#x1F6A7;
         *     403 Error Responses          You can test if it is complete by making a GET request to the csv_file_url value. This file may take time to generate depending on how many device records are being pulled. If the file is not ready, a 403 error will be returned. Otherwise the file itself will be returned.
         *     &#x1F6A7;
         *     Requires Authentication Key
         *     Requires your OneSignal App's REST API Key, available in Keys & IDs.
         *     &#x1F6A7;
         *     Concurrent Exports
         *     Only one concurrent export is allowed per OneSignal account. Please ensure you have successfully downloaded the .csv.gz file before exporting another app.
         *     CSV File Format:
         *     - Default Columns:
         *       | Field | Details |
         *       | --- | --- |
         *       | id | OneSignal Player Id |
         *       | identifier | Push Token |
         *       | session_count | Number of times they visited the app or site
         *       | language | Device language code |
         *       | timezone | Number of seconds away from UTC. Example: -28800 |
         *       | game_version | Version of your mobile app gathered from Android Studio versionCode in your App/build.gradle and iOS uses kCFBundleVersionKey in Xcode. |
         *       | device_os | Device Operating System Version. Example: 80 = Chrome 80, 9 = Android 9 |
         *       | device_type | Device Operating System Type |
         *       | device_model | Device Hardware String Code. Example: Mobile Web Subscribers will have `Linux armv` |
         *       | ad_id | Based on the Google Advertising Id for Android, identifierForVendor for iOS. OptedOut means user turned off Advertising tracking on the device. |
         *       | tags | Current OneSignal Data Tags on the device. |
         *       | last_active | Date and time the user last opened the mobile app or visited the site. |
         *       | playtime | Total amount of time in seconds the user had the mobile app open. |
         *       | amount_spent | 	Mobile only - amount spent in USD on In-App Purchases. |
         *       | created_at | Date and time the device record was created in OneSignal. Mobile - first time they opened the app with OneSignal SDK. Web - first time the user subscribed to the site. |
         *       | invalid_identifier | t = unsubscribed, f = subscibed |
         *       | badge_count | Current number of badges on the device |
         *     - Extra Columns:
         *       | Field | Details |
         *       | --- | --- |
         *       | external_user_id | Your User Id set on the device |
         *       | notification_types | Notification types |
         *       | location | Location points (Latitude and Longitude) set on the device. |
         *       | country | Country code |
         *       | rooted | Android device rooted or not |
         *       | ip | IP Address of the device if being tracked. See Handling Personal Data. |
         *       | web_auth | Web Only authorization key. |
         *       | web_p256 | Web Only p256 key. |
         *
         */
        post: operations["export_players"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/{notification_id}/export_events?app_id={app_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Export CSV of Events
         * @description Generate a compressed CSV report of all of the events data for a notification.
         *     This will return a URL immediately upon success but it may take several minutes for the CSV to become available at that URL depending on the volume of data. Only one export can be in-progress per OneSignal account at any given time.
         */
        post: operations["export_events"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        App: {
            readonly id?: string;
            /** @description The name of your app, as displayed on your apps list on the dashboard.  This can be renamed. */
            name?: string;
            readonly players?: number;
            readonly messageable_players?: number;
            /** Format: date-time */
            readonly updated_at?: string;
            /** Format: date-time */
            readonly created_at?: string;
            /** @description Android: Your Google Project number.  Also known as Sender ID. */
            android_gcm_sender_id?: string;
            /** @description Android: Your Google Push Messaging Auth Key */
            gcm_key?: string | null;
            /** @description Chrome (All Browsers except Safari) (Recommended): The URL to your website.  This field is required if you wish to enable web push and specify other web push parameters. */
            chrome_web_origin?: string | null;
            /** @description Not for web push.  Your Google Push Messaging Auth Key if you use Chrome Apps / Extensions. */
            chrome_key?: string | null;
            /** @description Chrome (All Browsers except Safari): Your default notification icon. Should be 256x256 pixels, min 80x80. */
            chrome_web_default_notification_icon?: string | null;
            /** @description Chrome (All Browsers except Safari): A subdomain of your choice in order to support Web Push on non-HTTPS websites. This field must be set in order for the chrome_web_gcm_sender_id property to be processed. */
            chrome_web_sub_domain?: string | null;
            /**
             * @description iOS: Either sandbox or production
             * @enum {string|null}
             */
            apns_env?: "sandbox" | "production" | null;
            /** @description iOS: Your apple push notification p12 certificate file, converted to a string and Base64 encoded. */
            apns_p12?: string;
            /** @description iOS: Required if using p12 certificate.  Password for the apns_p12 file. */
            apns_p12_password?: string;
            readonly apns_certificates?: string | null;
            readonly safari_apns_certificates?: string;
            /** @description Safari: Your apple push notification p12 certificate file for Safari Push Notifications, converted to a string and Base64 encoded. */
            safari_apns_p12?: string;
            /** @description Safari: Password for safari_apns_p12 file */
            safari_apns_p12_password?: string;
            /** @description iOS: Required if using p8. Unique identifier for the p8 authentication key. */
            apns_key_id?: string | null;
            /** @description iOS: Required if using p8. Team ID generated by Apple for your developer account. */
            apns_team_id?: string | null;
            /** @description iOS: Required if using p8. Bundle ID for your app in the Apple ecosystem. */
            apns_bundle_id?: string | null;
            /** @description iOS: Required if using p8. Base64 encoded p8 key */
            apns_p8?: string | null;
            /** @description Safari (Recommended): The hostname to your website including http(s):// */
            safari_site_origin?: string | null;
            readonly safari_push_id?: string | null;
            readonly safari_icon_16_16?: string;
            readonly safari_icon_32_32?: string;
            readonly safari_icon_64_64?: string;
            readonly safari_icon_128_128?: string;
            /** @description Safari: A url for a 256x256 png notification icon. This is the only Safari icon URL you need to provide. */
            safari_icon_256_256?: string;
            /** @description All Browsers (Recommended): The Site Name. Requires both chrome_web_origin and safari_site_origin to be set to add or update it. */
            site_name?: string | null;
            readonly basic_auth_key?: string | null;
            /** @description The Id of the Organization you would like to add this app to. */
            organization_id?: string;
            /** @description iOS: Notification data (additional data) values will be added to the root of the apns payload when sent to the device.  Ignore if you're not using any other plugins, or not using OneSignal SDK methods to read the payload. */
            additional_data_is_root_payload?: boolean;
        };
        Apps: components["schemas"]["App"][];
        SegmentNotificationTarget: {
            /** @description The segment names you want to target. Users in these segments will receive a notification. This targeting parameter is only compatible with excluded_segments.
             *     Example: ["Active Users", "Inactive Users"]
             *      */
            included_segments?: string[];
            /** @description Segment that will be excluded when sending. Users in these segments will not receive a notification, even if they were included in included_segments. This targeting parameter is only compatible with included_segments.
             *     Example: ["Active Users", "Inactive Users"]
             *      */
            excluded_segments?: string[];
        };
        PlayerNotificationTarget: {
            /**
             * @deprecated
             * @description Specific playerids to send your notification to. _Does not require API Auth Key.
             *     Do not combine with other targeting parameters. Not compatible with any other targeting parameters.
             *     Example: ["1dd608f2-c6a1-11e3-851d-000c2940e62c"]
             *     Limit of 2,000 entries per REST API call
             *
             */
            include_player_ids?: string[] | null;
            /**
             * @deprecated
             * @description Target specific devices by custom user IDs assigned via API.
             *     Not compatible with any other targeting parameters
             *     Example: ["custom-id-assigned-by-api"]
             *     REQUIRED: REST API Key Authentication
             *     Limit of 2,000 entries per REST API call.
             *     Note: If targeting push, email, or sms subscribers with same ids, use with channel_for_external_user_ids to indicate you are sending a push or email or sms.
             *
             */
            include_external_user_ids?: string[] | null;
            /** @description Recommended for Sending Emails - Target specific email addresses.
             *     If an email does not correspond to an existing user, a new user will be created.
             *     Example: nick@catfac.ts
             *     Limit of 2,000 entries per REST API call
             *      */
            include_email_tokens?: string[];
            /** @description Recommended for Sending SMS - Target specific phone numbers. The phone number should be in the E.164 format. Phone number should be an existing subscriber on OneSignal. Refer our docs to learn how to add phone numbers to OneSignal.
             *     Example phone number: +1999999999
             *     Limit of 2,000 entries per REST API call
             *      */
            include_phone_numbers?: string[];
            /** @description Not Recommended: Please consider using include_player_ids or include_external_user_ids instead.
             *     Target using iOS device tokens.
             *     Warning: Only works with Production tokens.
             *     All non-alphanumeric characters must be removed from each token. If a token does not correspond to an existing user, a new user will be created.
             *     Example: ce777617da7f548fe7a9ab6febb56cf39fba6d38203...
             *     Limit of 2,000 entries per REST API call
             *      */
            include_ios_tokens?: string[];
            /** @description Not Recommended: Please consider using include_player_ids or include_external_user_ids instead.
             *     Target using Windows URIs. If a token does not correspond to an existing user, a new user will be created.
             *     Example: http://s.notify.live.net/u/1/bn1/HmQAAACPaLDr-...
             *     Limit of 2,000 entries per REST API call
             *      */
            include_wp_wns_uris?: string[];
            /** @description Not Recommended: Please consider using include_player_ids or include_external_user_ids instead.
             *     Target using Amazon ADM registration IDs. If a token does not correspond to an existing user, a new user will be created.
             *     Example: amzn1.adm-registration.v1.XpvSSUk0Rc3hTVVV...
             *     Limit of 2,000 entries per REST API call
             *      */
            include_amazon_reg_ids?: string[];
            /** @description Not Recommended: Please consider using include_player_ids or include_external_user_ids instead.
             *     Target using Chrome App registration IDs. If a token does not correspond to an existing user, a new user will be created.
             *     Example: APA91bEeiUeSukAAUdnw3O2RB45FWlSpgJ7Ji_...
             *     Limit of 2,000 entries per REST API call
             *      */
            include_chrome_reg_ids?: string[];
            /** @description Not Recommended: Please consider using include_player_ids or include_external_user_ids instead.
             *     Target using Chrome Web Push registration IDs. If a token does not correspond to an existing user, a new user will be created.
             *     Example: APA91bEeiUeSukAAUdnw3O2RB45FWlSpgJ7Ji_...
             *     Limit of 2,000 entries per REST API call
             *      */
            include_chrome_web_reg_ids?: string[];
            /** @description Not Recommended: Please consider using include_player_ids or include_external_user_ids instead.
             *     Target using Android device registration IDs. If a token does not correspond to an existing user, a new user will be created.
             *     Example: APA91bEeiUeSukAAUdnw3O2RB45FWlSpgJ7Ji_...
             *     Limit of 2,000 entries per REST API call
             *      */
            include_android_reg_ids?: string[];
            include_aliases?: {
                alias_label?: string[];
            } | null;
            /** @enum {string} */
            target_channel?: "push" | "email" | "sms";
        };
        NotificationTarget: components["schemas"]["SegmentNotificationTarget"] | components["schemas"]["PlayerNotificationTarget"];
        BasicNotification: components["schemas"]["NotificationTarget"] & {
            id?: string;
            readonly value?: number;
            /** @description Required for SMS Messages.
             *     An identifier for tracking message within the OneSignal dashboard or export analytics.
             *     Not shown to end user. */
            name?: string | null;
            /** @enum {string} */
            readonly aggregation?: "sum" | "count";
            /** @description Indicates whether to send to all devices registered under your app's Apple iOS platform. */
            isIos?: boolean | null;
            /** @description Indicates whether to send to all devices registered under your app's Google Android platform. */
            isAndroid?: boolean | null;
            /** @description Indicates whether to send to all devices registered under your app's Huawei Android platform. */
            isHuawei?: boolean | null;
            /** @description Indicates whether to send to all subscribed web browser users, including Chrome, Firefox, and Safari.
             *     You may use this instead as a combined flag instead of separately enabling isChromeWeb, isFirefox, and isSafari, though the three options are equivalent to this one.
             *      */
            isAnyWeb?: boolean | null;
            /** @description Indicates whether to send to all Google Chrome, Chrome on Android, and Mozilla Firefox users registered under your Chrome & Firefox web push platform. */
            isChromeWeb?: boolean | null;
            /** @description Indicates whether to send to all Mozilla Firefox desktop users registered under your Firefox web push platform. */
            isFirefox?: boolean | null;
            /** @description Does not support iOS Safari. Indicates whether to send to all Apple's Safari desktop users registered under your Safari web push platform. Read more iOS Safari */
            isSafari?: boolean | null;
            /** @description Indicates whether to send to all devices registered under your app's Windows platform. */
            isWP_WNS?: boolean | null;
            /** @description Indicates whether to send to all devices registered under your app's Amazon Fire platform. */
            isAdm?: boolean | null;
            /** @description This flag is not used for web push Please see isChromeWeb for sending to web push users. This flag only applies to Google Chrome Apps & Extensions.
             *     Indicates whether to send to all devices registered under your app's Google Chrome Apps & Extension platform.
             *      */
            isChrome?: boolean | null;
            /** @description Indicates if the message type when targeting with include_external_user_ids for cases where an email, sms, and/or push subscribers have the same external user id.
             *     Example: Use the string "push" to indicate you are sending a push notification or the string "email"for sending emails or "sms"for sending SMS.
             *      */
            channel_for_external_user_ids?: string;
            /** @description Required: Your OneSignal Application ID, which can be found in Keys & IDs.
             *     It is a UUID and looks similar to 8250eaf6-1a58-489e-b136-7c74a864b434.
             *      */
            app_id?: string;
            /** @description Correlation and idempotency key.
             *     A request received with this parameter will first look for another notification with the same external_id. If one exists, a notification will not be sent, and result of the previous operation will instead be returned. Therefore, if you plan on using this feature, it's important to use a good source of randomness to generate the UUID passed here.
             *     This key is only idempotent for 30 days. After 30 days, the notification could be removed from our system and a notification with the same external_id will be sent again.
             *       See Idempotent Notification Requests for more details
             *     writeOnly: true
             *      */
            external_id?: string | null;
            contents?: components["schemas"]["StringMap"] & unknown;
            headings?: components["schemas"]["StringMap"] & unknown;
            subtitle?: components["schemas"]["StringMap"] & unknown;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     A custom map of data that is passed back to your app. Same as using Additional Data within the dashboard. Can use up to 2048 bytes of data.
             *     Example: {"abc": 123, "foo": "bar", "event_performed": true, "amount": 12.1}
             *      */
            data?: Record<string, never> | null;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     Use "data" or "message" depending on the type of notification you are sending. More details in Data & Background Notifications.
             *      */
            huawei_msg_type?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: All
             *     The URL to open in the browser when a user clicks on the notification.
             *     Note: iOS needs https or updated NSAppTransportSecurity in plist
             *     This field supports inline substitutions.
             *     Omit if including web_url or app_url
             *     Example: https://onesignal.com
             *      */
            url?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: All Browsers
             *     Same as url but only sent to web push platforms.
             *     Including Chrome, Firefox, Safari, Opera, etc.
             *     Example: https://onesignal.com
             *      */
            web_url?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: All Browsers
             *     Same as url but only sent to web push platforms.
             *     Including iOS, Android, macOS, Windows, ChromeApps, etc.
             *     Example: https://onesignal.com
             *      */
            app_url?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS 10+
             *     Adds media attachments to notifications. Set as JSON object, key as a media id of your choice and the value as a valid local filename or URL. User must press and hold on the notification to view.
             *     Do not set mutable_content to download attachments. The OneSignal SDK does this automatically
             *     Example: {"id1": "https://domain.com/image.jpg"}
             *      */
            ios_attachments?: Record<string, never> | null;
            /** @description Channel: Push Notifications
             *     Platform: All
             *     Use a template you setup on our dashboard. The template_id is the UUID found in the URL when viewing a template on our dashboard.
             *     Example: be4a8044-bbd6-11e4-a581-000c2940e62c
             *      */
            template_id?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS
             *     Sending true wakes your app from background to run custom native code (Apple interprets this as content-available=1). Note: Not applicable if the app is in the "force-quit" state (i.e app was swiped away). Omit the contents field to prevent displaying a visible notification.
             *      */
            content_available?: boolean | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS 10+
             *     Always defaults to true and cannot be turned off. Allows tracking of notification receives and changing of the notification content in your app before it is displayed. Triggers didReceive(_:withContentHandler:) on your UNNotificationServiceExtension.
             *      */
            mutable_content?: boolean;
            /** @description Channel: Push Notifications
             *     Platform: iOS 13+
             *     Use to target a specific experience in your App Clip, or to target your notification to a specific window in a multi-scene App.
             *      */
            target_content_identifier?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     Picture to display in the expanded view. Can be a drawable resource name or a URL.
             *      */
            big_picture?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     Picture to display in the expanded view. Can be a drawable resource name or a URL.
             *      */
            huawei_big_picture?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Amazon
             *     Picture to display in the expanded view. Can be a drawable resource name or a URL.
             *      */
            adm_big_picture?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: ChromeApp
             *     Large picture to display below the notification text. Must be a local URL.
             *      */
            chrome_big_picture?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Chrome 56+
             *     Sets the web push notification's large image to be shown below the notification's title and text. Please see Web Push Notification Icons.
             *      */
            chrome_web_image?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS 8.0+, Android 4.1+, and derivatives like Amazon Buttons to add to the notification. Icon only works for Android.
             *     Buttons show in reverse order of array position i.e. Last item in array shows as first button on device.
             *     Example: [{"id": "id2", "text": "second button", "icon": "ic_menu_share"}, {"id": "id1", "text": "first button", "icon": "ic_menu_send"}]
             *      */
            buttons?: components["schemas"]["Button"][] | null;
            /** @description Channel: Push Notifications
             *     Platform: Chrome 48+
             *     Add action buttons to the notification. The id field is required.
             *     Example: [{"id": "like-button", "text": "Like", "icon": "http://i.imgur.com/N8SN8ZS.png", "url": "https://yoursite.com"}, {"id": "read-more-button", "text": "Read more", "icon": "http://i.imgur.com/MIxJp1L.png", "url": "https://yoursite.com"}]
             *      */
            web_buttons?: components["schemas"]["Button"][] | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS
             *     Category APS payload, use with registerUserNotificationSettings:categories in your Objective-C / Swift code.
             *     Example: calendar category which contains actions like accept and decline
             *     iOS 10+ This will trigger your UNNotificationContentExtension whose ID matches this category.
             *      */
            ios_category?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     The Android Oreo Notification Category to send the notification under. See the Category documentation on creating one and getting it's id.
             *      */
            android_channel_id?: string;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     The Android Oreo Notification Category to send the notification under. See the Category documentation on creating one and getting it's id.
             *      */
            huawei_channel_id?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     Use this if you have client side Android Oreo Channels you have already defined in your app with code.
             *      */
            existing_android_channel_id?: string;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     Use this if you have client side Android Oreo Channels you have already defined in your app with code.
             *      */
            huawei_existing_channel_id?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     Allowing setting a background image for the notification. This is a JSON object containing the following keys. See our Background Image documentation for image sizes.
             *      */
            android_background_layout?: {
                /** @description Asset file, android resource name, or URL to remote image. */
                image?: string;
                /** @description Title text color ARGB Hex format. Example(Blue) "FF0000FF". */
                headings_color?: string;
                /** @description Body text color ARGB Hex format. Example(Red) "FFFF0000". */
                contents_color?: string;
            };
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     Icon shown in the status bar and on the top left of the notification.
             *     If not set a bell icon will be used or ic_stat_onesignal_default if you have set this resource name.
             *     See: How to create small icons
             *      */
            small_icon?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     Icon shown in the status bar and on the top left of the notification.
             *     Use an Android resource path (E.g. /drawable/small_icon).
             *     Defaults to your app icon if not set.
             *      */
            huawei_small_icon?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     Can be a drawable resource name or a URL.
             *     See: How to create large icons
             *      */
            large_icon?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     Can be a drawable resource name or a URL.
             *     See: How to create large icons
             *      */
            huawei_large_icon?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Amazon
             *     If not set a bell icon will be used or ic_stat_onesignal_default if you have set this resource name.
             *     See: How to create small icons
             *      */
            adm_small_icon?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Amazon
             *     If blank the small_icon is used. Can be a drawable resource name or a URL.
             *     See: How to create large icons
             *      */
            adm_large_icon?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Chrome
             *     Sets the web push notification's icon. An image URL linking to a valid image. Common image types are supported; GIF will not animate. We recommend 256x256 (at least 80x80) to display well on high DPI devices. Firefox will also use this icon, unless you specify firefox_icon.
             *      */
            chrome_web_icon?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Chrome
             *     Sets the web push notification icon for Android devices in the notification shade. Please see Web Push Notification Badge.
             *      */
            chrome_web_badge?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Firefox
             *     Not recommended Few people need to set Firefox-specific icons. We recommend setting chrome_web_icon instead, which Firefox will also use.
             *     Sets the web push notification's icon for Firefox. An image URL linking to a valid image. Common image types are supported; GIF will not animate. We recommend 256x256 (at least 80x80) to display well on high DPI devices.
             *      */
            firefox_icon?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: ChromeApp
             *     This flag is not used for web push For web push, please see chrome_web_icon instead.
             *     The local URL to an icon to use. If blank, the app icon will be used.
             *      */
            chrome_icon?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS
             *     Sound file that is included in your app to play instead of the default device notification sound. Pass nil to disable vibration and sound for the notification.
             *     Example: "notification.wav"
             *      */
            ios_sound?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     &#9888;&#65039;Deprecated, this field doesn't work on Android 8 (Oreo) and newer devices!
             *     Please use Notification Categories / Channels noted above instead to support ALL versions of Android.
             *     Sound file that is included in your app to play instead of the default device notification sound. Pass nil to disable sound for the notification.
             *     NOTE: Leave off file extension for Android.
             *     Example: "notification"
             *      */
            android_sound?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     &#9888;&#65039;Deprecated, this field ONLY works on EMUI 5 (Android 7 based) and older devices.
             *     Please also set Notification Categories / Channels noted above to support EMUI 8 (Android 8 based) devices.
             *     Sound file that is included in your app to play instead of the default device notification sound. NOTE: Leave off file extension for and include the full path.
             *
             *     Example: "/res/raw/notification"
             *      */
            huawei_sound?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Amazon
             *     &#9888;&#65039;Deprecated, this field doesn't work on Android 8 (Oreo) and newer devices!
             *     Please use Notification Categories / Channels noted above instead to support ALL versions of Android.
             *     Sound file that is included in your app to play instead of the default device notification sound. Pass nil to disable sound for the notification.
             *     NOTE: Leave off file extension for Android.
             *     Example: "notification"
             *      */
            adm_sound?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Windows
             *     Sound file that is included in your app to play instead of the default device notification sound.
             *     Example: "notification.wav"
             *      */
            wp_wns_sound?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     &#9888;&#65039;Deprecated, this field doesn't work on Android 8 (Oreo) and newer devices!
             *     Please use Notification Categories / Channels noted above instead to support ALL versions of Android.
             *     Sets the devices LED notification light if the device has one. ARGB Hex format.
             *     Example(Blue): "FF0000FF"
             *      */
            android_led_color?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     &#9888;&#65039;Deprecated, this field ONLY works on EMUI 5 (Android 7 based) and older devices.
             *     Please also set Notification Categories / Channels noted above to support EMUI 8 (Android 8 based) devices.
             *     Sets the devices LED notification light if the device has one. RGB Hex format.
             *     Example(Blue): "0000FF"
             *      */
            huawei_led_color?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     Sets the background color of the notification circle to the left of the notification text. Only applies to apps targeting Android API level 21+ on Android 5.0+ devices.
             *     Example(Red): "FFFF0000"
             *      */
            android_accent_color?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     Accent Color used on Action Buttons and Group overflow count.
             *     Uses RGB Hex value (E.g. #9900FF).
             *     Defaults to device's theme color if not set.
             *      */
            huawei_accent_color?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android 5.0_
             *     &#9888;&#65039;Deprecated, this field doesn't work on Android 8 (Oreo) and newer devices!
             *     Please use Notification Categories / Channels noted above instead to support ALL versions of Android.
             *     1 = Public (default) (Shows the full message on the lock screen unless the user has disabled all notifications from showing on the lock screen. Please consider the user and mark private if the contents are.)
             *     0 = Private (Hides message contents on lock screen if the user set "Hide sensitive notification content" in the system settings)
             *     -1 = Secret (Notification does not show on the lock screen at all)
             *      */
            android_visibility?: number | null;
            /** @description Channel: Push Notifications
             *     Platform: Huawei
             *     &#9888;&#65039;Deprecated, this field ONLY works on EMUI 5 (Android 7 based) and older devices.
             *     Please also set Notification Categories / Channels noted above to support EMUI 8 (Android 8 based) devices.
             *     1 = Public (default) (Shows the full message on the lock screen unless the user has disabled all notifications from showing on the lock screen. Please consider the user and mark private if the contents are.)
             *     0 = Private (Hides message contents on lock screen if the user set "Hide sensitive notification content" in the system settings)
             *     -1 = Secret (Notification does not show on the lock screen at all)
             *      */
            huawei_visibility?: number | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS
             *     Describes whether to set or increase/decrease your app's iOS badge count by the ios_badgeCount specified count. Can specify None, SetTo, or Increase.
             *     `None` leaves the count unaffected.
             *     `SetTo` directly sets the badge count to the number specified in ios_badgeCount.
             *     `Increase` adds the number specified in ios_badgeCount to the total. Use a negative number to decrease the badge count.
             *      */
            ios_badgeType?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS
             *     Used with ios_badgeType, describes the value to set or amount to increase/decrease your app's iOS badge count by.
             *     You can use a negative number to decrease the badge count when used with an ios_badgeType of Increase.
             *      */
            ios_badgeCount?: number | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS 10+, Android
             *     Only one notification with the same id will be shown on the device. Use the same id to update an existing notification instead of showing a new one. Limit of 64 characters.
             *      */
            collapse_id?: string;
            /** @description Channel: Push Notifications
             *     Platform: All Browsers
             *     Display multiple notifications at once with different topics.
             *      */
            web_push_topic?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS 10+
             *     iOS can localize push notification messages on the client using special parameters such as loc-key. When using the Create Notification endpoint, you must include these parameters inside of a field called apns_alert. Please see Apple's guide on localizing push notifications to learn more.
             *      */
            apns_alert?: Record<string, never> | null;
            /** @description Channel: All
             *     Possible values are:
             *     timezone (Deliver at a specific time-of-day in each users own timezone)
             *     last-active Same as Intelligent Delivery . (Deliver at the same time of day as each user last used your app).
             *     If send_after is used, this takes effect after the send_after time has elapsed.
             *      */
            delayed_option?: string | null;
            /** @description Channel: All
             *     Use with delayed_option=timezone.
             *     Examples: "9:00AM"
             *     "21:45"
             *     "9:45:30"
             *      */
            delivery_time_of_day?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS, Android, Chrome, Firefox, Safari, ChromeWeb
             *     Time To Live - In seconds. The notification will be expired if the device does not come back online within this time. The default is 259,200 seconds (3 days).
             *     Max value to set is 2419200 seconds (28 days).
             *      */
            ttl?: number | null;
            /** @description Channel: Push Notifications
             *     Platform: Android, Chrome, ChromeWeb
             *     Delivery priority through the push server (example GCM/FCM). Pass 10 for high priority or any other integer for normal priority. Defaults to normal priority for Android and high for iOS. For Android 6.0+ devices setting priority to high will wake the device out of doze mode.
             *      */
            priority?: number | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS
             *     valid values: voip
             *     Set the value to voip for sending VoIP Notifications
             *     This field maps to the APNS header apns-push-type.
             *     Note: alert and background are automatically set by OneSignal
             *      */
            apns_push_type_override?: string;
            /** @description Channel: All
             *     Apps with throttling enabled:
             *       - the parameter value will be used to override the default application throttling value set from the dashboard settings.
             *       - parameter value 0 indicates not to apply throttling to the notification.
             *       - if the parameter is not passed then the default app throttling value will be applied to the notification.
             *     Apps with throttling disabled:
             *       - this parameter can be used to throttle delivery for the notification even though throttling is not enabled at the application level.
             *     Refer to throttling for more details.
             *      */
            throttle_rate_per_minute?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     Notifications with the same group will be stacked together using Android's Notification Grouping feature.
             *      */
            android_group?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Android
             *     Note: This only works for Android 6 and older. Android 7+ allows full expansion of all message.
             *     Summary message to display when 2+ notifications are stacked together. Default is "# new messages". Include $[notif_count] in your message and it will be replaced with the current number.
             *     Languages - The value of each key is the message that will be sent to users for that language. "en" (English) is required. The key of each hash is either a a 2 character language code or one of zh-Hans/zh-Hant for Simplified or Traditional Chinese. Read more: supported languages.
             *     Example: {"en": "You have $[notif_count] new messages"}
             *      */
            android_group_message?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Amazon
             *     Notifications with the same group will be stacked together using Android's Notification Grouping feature.
             *      */
            adm_group?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: Amazon
             *     Summary message to display when 2+ notifications are stacked together. Default is "# new messages". Include $[notif_count] in your message and it will be replaced with the current number. "en" (English) is required. The key of each hash is either a a 2 character language code or one of zh-Hans/zh-Hant for Simplified or Traditional Chinese. The value of each key is the message that will be sent to users for that language.
             *     Example: {"en": "You have $[notif_count] new messages"}
             *      */
            adm_group_message?: Record<string, never> | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS 12+
             *     This parameter is supported in iOS 12 and above. It allows you to group related notifications together.
             *     If two notifications have the same thread-id, they will both be added to the same group.
             *      */
            thread_id?: string | null;
            /** @description Channel: Push Notifications
             *     Platform: iOS 12+
             *     When using thread_id to create grouped notifications in iOS 12+, you can also control the summary. For example, a grouped notification can say "12 more notifications from John Doe".
             *     The summary_arg lets you set the name of the person/thing the notifications are coming from, and will show up as "X more notifications from summary_arg"
             *      */
            summary_arg?: string;
            /** @description Channel: Push Notifications
             *     Platform: iOS 12+
             *     When using thread_id, you can also control the count of the number of notifications in the group. For example, if the group already has 12 notifications, and you send a new notification with summary_arg_count = 2, the new total will be 14 and the summary will be "14 more notifications from summary_arg"
             *      */
            summary_arg_count?: number;
            /** @description Channel: Email
             *     Required.  The subject of the email.
             *      */
            email_subject?: string | null;
            /** @description Channel: Email
             *     Required unless template_id is set.
             *     HTML suported
             *     The body of the email you wish to send. Typically, customers include their own HTML templates here. Must include [unsubscribe_url] in an <a> tag somewhere in the email.
             *     Note: any malformed HTML content will be sent to users. Please double-check your HTML is valid.
             *      */
            email_body?: string;
            /** @description Channel: Email
             *     The name the email is from. If not specified, will default to "from name" set in the OneSignal Dashboard Email Settings.
             *      */
            email_from_name?: string | null;
            /** @description Channel: Email
             *     The email address the email is from. If not specified, will default to "from email" set in the OneSignal Dashboard Email Settings.
             *      */
            email_from_address?: string | null;
            /** @description Channel: Email
             *     The preheader text of the email.
             *     Preheader is the preview text displayed immediately after an email subject that provides additional context about the email content.
             *     If not specified, will default to null.
             *      */
            email_preheader?: string | null;
            /** @description Channel: Email
             *     Default is `false`. This field is used to send transactional notifications. If set to `true`, this notification will also be sent to unsubscribed emails. If a `template_id` is provided, the `include_unsubscribed` value from the template will be inherited. If you are using a third-party ESP, this field requires the ESP's list of unsubscribed emails to be cleared. */
            include_unsubscribed?: boolean;
            /** @description Channel: SMS
             *     Phone Number used to send SMS. Should be a registered Twilio phone number in E.164 format.
             *      */
            sms_from?: string | null;
            /** @description Channel: SMS
             *     URLs for the media files to be attached to the SMS content.
             *     Limit: 10 media urls with a total max. size of 5MBs.
             *      */
            sms_media_urls?: string[] | null;
            filters?: components["schemas"]["Filter"][] | null;
            /** @description Channel: All
             *     JSON object that can be used as a source of message personalization data for fields that support tag variable substitution.
             *     Push, SMS: Can accept up to 2048 bytes of valid JSON. Email: Can accept up to 10000 bytes of valid JSON.
             *     Example: {"order_id": 123, "currency": "USD", "amount": 25}
             *      */
            custom_data?: Record<string, never> | null;
        } & unknown;
        Notification: components["schemas"]["BasicNotification"] & {
            /**
             * Format: date-time
             * @description Channel: All
             *     Schedule notification for future delivery. API defaults to UTC -1100
             *     Examples: All examples are the exact same date & time.
             *     "Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)"
             *     "September 24th 2015, 2:00:00 pm UTC-07:00"
             *     "2015-09-24 14:00:00 GMT-0700"
             *     "Sept 24 2015 14:00:00 GMT-0700"
             *     "Thu Sep 24 2015 14:00:00 GMT-0700 (Pacific Daylight Time)"
             *     Note: SMS currently only supports send_after parameter.
             *
             */
            send_after?: string | null;
        };
        NotificationWithMeta: components["schemas"]["BasicNotification"] & components["schemas"]["DeliveryData"] & components["schemas"]["OutcomesData"] & {
            /** @description Number of notifications that have not been sent out yet. This can mean either our system is still processing the notification or you have delayed options set. */
            remaining?: number;
            /** @description Number of notifications that were successfully delivered. */
            successful?: number;
            /** @description Number of notifications that could not be delivered due to those devices being unsubscribed. */
            failed?: number;
            /** @description Number of notifications that could not be delivered due to an error. You can find more information by viewing the notification in the dashboard. */
            errored?: number;
            /** @description Number of users who have clicked / tapped on your notification. */
            converted?: number;
            /**
             * Format: int64
             * @description Unix timestamp indicating when the notification was created.
             */
            queued_at?: number;
            /**
             * Format: int64
             * @description Unix timestamp indicating when notification delivery should begin.
             */
            send_after?: number | null;
            /**
             * Format: int64
             * @description Unix timestamp indicating when notification delivery completed. The delivery duration from start to finish can be calculated with completed_at - send_after.
             */
            completed_at?: number | null;
            platform_delivery_stats?: components["schemas"]["PlatformDeliveryData"];
            /** @description Confirmed Deliveries number of devices that received the push notification. Paid Feature Only. Free accounts will see 0. */
            received?: number | null;
            /** @description number of push notifications sent per minute. Paid Feature Only. If throttling is not enabled for the app or the notification, and for free accounts, null is returned. Refer to Throttling for more details. */
            throttle_rate_per_minute?: number | null;
        };
        Button: {
            id: string;
            text?: string;
            icon?: string;
        };
        Buttons: components["schemas"]["Button"][];
        StringMap: {
            /** @description Text in English.  Will be used as a fallback */
            en?: string;
            /** @description Text in Arabic. */
            ar?: string;
            /** @description Text in Bosnian. */
            bs?: string;
            /** @description Text in Bulgarian. */
            bg?: string;
            /** @description Text in Catalan. */
            ca?: string;
            /** @description Text in Chinese (Simplified). */
            "zh-Hans"?: string;
            /** @description Text in Chinese (Traditional). */
            "zh-Hant"?: string;
            /** @description Alias for zh-Hans. */
            zh?: string;
            /** @description Text in Croatian. */
            hr?: string;
            /** @description Text in Czech. */
            cs?: string;
            /** @description Text in Danish. */
            da?: string;
            /** @description Text in Dutch. */
            nl?: string;
            /** @description Text in Estonian. */
            et?: string;
            /** @description Text in Finnish. */
            fi?: string;
            /** @description Text in French. */
            fr?: string;
            /** @description Text in Georgian. */
            ka?: string;
            /** @description Text in German. */
            de?: string;
            /** @description Text in Greek. */
            el?: string;
            /** @description Text in Hindi. */
            hi?: string;
            /** @description Text in Hebrew. */
            he?: string;
            /** @description Text in Hungarian. */
            hu?: string;
            /** @description Text in Indonesian. */
            id?: string;
            /** @description Text in Italian. */
            it?: string;
            /** @description Text in Japanese. */
            ja?: string;
            /** @description Text in Korean. */
            ko?: string;
            /** @description Text in Latvian. */
            lv?: string;
            /** @description Text in Lithuanian. */
            lt?: string;
            /** @description Text in Malay. */
            ms?: string;
            /** @description Text in Norwegian. */
            nb?: string;
            /** @description Text in Polish. */
            pl?: string;
            /** @description Text in Persian. */
            fa?: string;
            /** @description Text in Portugese. */
            pt?: string;
            /** @description Text in Punjabi. */
            pa?: string;
            /** @description Text in Romanian. */
            ro?: string;
            /** @description Text in Russian. */
            ru?: string;
            /** @description Text in Serbian. */
            sr?: string;
            /** @description Text in Slovak. */
            sk?: string;
            /** @description Text in Spanish. */
            es?: string;
            /** @description Text in Swedish. */
            sv?: string;
            /** @description Text in Thai. */
            th?: string;
            /** @description Text in Turkish. */
            tr?: string;
            /** @description Text in Ukrainian. */
            uk?: string;
            /** @description Text in Vietnamese. */
            vi?: string;
        };
        NotificationSlice: {
            total_count?: number;
            offset?: number;
            limit?: number;
            notifications?: components["schemas"]["NotificationWithMeta"][];
        };
        /** @description Hash of delivery statistics broken out by target device platform. */
        PlatformDeliveryData: {
            edge_web_push?: components["schemas"]["DeliveryData"];
            chrome_web_push?: components["schemas"]["DeliveryData"];
            firefox_web_push?: components["schemas"]["DeliveryData"];
            safari_web_push?: components["schemas"]["DeliveryData"];
            android?: components["schemas"]["DeliveryData"];
            ios?: components["schemas"]["DeliveryData"];
            sms?: components["schemas"]["DeliveryData"] & {
                /** @description Number of messages reported as delivered successfully by the SMS service provider. */
                provider_successful?: number | null;
                /** @description Number of recipients who didn't receive your message as reported by the SMS service provider. */
                provider_failed?: number | null;
                /** @description Number of errors reported by the SMS service provider. */
                provider_errored?: number | null;
            };
            email?: components["schemas"]["DeliveryData"] & {
                /** @description Number of times an email has been opened. */
                opened?: number | null;
                /** @description Number of unique recipients who have opened your email. */
                unique_opens?: number | null;
                /** @description Number of clicked links from your email. This can include the recipient clicking email links multiple times. */
                clicks?: number | null;
                /** @description Number of unique clicks that your recipients have made on links from your email. */
                unique_clicks?: number | null;
                /** @description Number of recipients who registered as a hard or soft bounce and didn't receive your email. */
                bounced?: number | null;
                /** @description Number of recipients who reported this email as spam. */
                reported_spam?: number | null;
                /** @description Number of recipients who opted out of your emails using the unsubscribe link in this email. */
                unsubscribed?: number | null;
            };
        };
        DeliveryData: {
            /** @description Number of messages delivered to push servers, mobile carriers, or email service providers. */
            successful?: number | null;
            /** @description Number of messages sent to unsubscribed devices. */
            failed?: number | null;
            /** @description Number of errors reported. */
            errored?: number | null;
            /** @description Number of messages that were clicked. */
            converted?: number | null;
            /** @description Number of devices that received the message. */
            received?: number | null;
        };
        Purchase: {
            /** @description The unique identifier of the purchased item. */
            sku: string;
            /** @description The amount, in USD, spent purchasing the item. */
            amount: string;
            /** @description The 3-letter ISO 4217 currency code. Required for correct storage and conversion of amount. */
            iso: string;
            count?: number;
        };
        OutcomeData: {
            id: string;
            value: number;
            /** @enum {string} */
            aggregation: "sum" | "count";
        };
        OutcomesData: {
            outcomes?: components["schemas"]["OutcomeData"][];
        };
        Filter: {
            /** @description Name of the field to use as the first operand in the filter expression. */
            field: string;
            /** @description If `field` is `tag`, this field is *required* to specify `key` inside the tags. */
            key?: string;
            /** @description Constant value to use as the second operand in the filter expression. This value is *required* when the relation operator is a binary operator. */
            value?: string;
            /**
             * @description Operator of a filter expression.
             * @enum {string}
             */
            relation: ">" | "<" | "=" | "!=" | "exists" | "not_exists" | "time_elapsed_gt" | "time_elapsed_lt";
        };
        Operator: {
            /**
             * @description Strictly, this must be either `"OR"`, or `"AND"`.  It can be used to compose Filters as part of a Filters object.
             * @enum {string}
             */
            operator?: "OR" | "AND";
        };
        FilterExpressions: components["schemas"]["Filter"] | components["schemas"]["Operator"];
        Segment: {
            /** @description UUID of the segment.  If left empty, it will be assigned automaticaly. */
            id?: string;
            /** @description Name of the segment.  You'll see this name on the Web UI. */
            name: string;
            /** @description Filter or operators the segment will have.  For a list of available filters with details, please see Send to Users Based on Filters. */
            filters: components["schemas"]["FilterExpressions"][];
        };
        Player: {
            /** @description The device's OneSignal ID */
            readonly id?: string;
            /** @description If true, this is the equivalent of a user being Unsubscribed */
            readonly invalid_identifier?: boolean;
            app_id?: string;
            /** @description Required
             *     The device's platform:
             *       0 = iOS
             *       1 = Android
             *       2 = Amazon
             *       3 = WindowsPhone (MPNS)
             *       4 = Chrome Apps / Extensions
             *       5 = Chrome Web Push
             *       6 = Windows (WNS)
             *       7 = Safari
             *       8 = Firefox
             *       9 = MacOS
             *       10 = Alexa
             *       11 = Email
             *       13 = For Huawei App Gallery Builds SDK Setup. Not for Huawei Devices using FCM
             *       14 = SMS
             *      */
            device_type: number;
            /** @description a custom user ID */
            external_user_id?: string | null;
            /** @description Only required if you have enabled Identity Verification and device_type is NOT 11 email. */
            external_user_id_auth_hash?: string;
            /** @description Email - Only required if you have enabled Identity Verification and device_type is email (11). */
            email_auth_hash?: string;
            /** @description Recommended: For Push Notifications, this is the Push Token Identifier from Google or Apple. For Apple Push identifiers, you must strip all non alphanumeric characters.
             *     Examples:
             *     iOS: 7abcd558f29d0b1f048083e2834ad8ea4b3d87d8ad9c088b33c132706ff445f0
             *     Android: APA91bHbYHk7aq-Uam_2pyJ2qbZvqllyyh2wjfPRaw5gLEX2SUlQBRvOc6sck1sa7H7nGeLNlDco8lXj83HWWwzV...
             *     For Email Addresses, set the full email address email@email.com and make sure to set device_type to 11.
             *      */
            identifier?: string | null;
            /** @description Language code. Typically lower case two letters, except for Chinese where it must be one of zh-Hans or zh-Hant. Example: en
             *      */
            language?: string;
            /** @description Number of seconds away from UTC. Example: -28800
             *      */
            timezone?: number | null;
            /** @description Version of your app. Example: 1.1
             *      */
            game_version?: string | null;
            /** @description Device make and model. Example: iPhone5,1
             *      */
            device_model?: string | null;
            /** @description Device operating system version. Example: 7.0.4
             *      */
            device_os?: string | null;
            /** @description The ad id for the device's platform:
             *     Android = Advertising Id
             *     iOS = identifierForVendor
             *     WP8.0 = DeviceUniqueId
             *     WP8.1 = AdvertisingId
             *      */
            ad_id?: string | null;
            /** @description Name and version of the sdk/plugin that's calling this API method (if any) */
            sdk?: string | null;
            /** @description Number of times the user has played the game, defaults to 1 */
            session_count?: number;
            /** @description Custom tags for the player. Only support string and integer key value pairs. Does not support arrays or other nested objects. Setting a tag value to null or an empty string will remove the tag. Example: {"foo":"bar","this":"that"}
             *     Limitations:
             *     - 100 tags per call
             *     - Android SDK users: tags cannot be removed or changed via API if set through SDK sendTag methods.
             *     Recommended to only tag devices with 1 kilobyte of data
             *     Please consider using your own Database to save more than 1 kilobyte of data. See: Internal Database & CRM
             *      */
            tags?: Record<string, never> | null;
            /** @description Amount the user has spent in USD, up to two decimal places */
            amount_spent?: number;
            /**
             * Format: int64
             * @description Unixtime when the player joined the game
             */
            created_at?: number;
            /**
             * Format: int64
             * @description Seconds player was running your app.
             */
            playtime?: number;
            /** @description Current iOS badge count displayed on the app icon
             *     NOTE: Not supported for apps created after June 2018, since badge count for apps created after this date are handled on the client.
             *      */
            badge_count?: number;
            /** @description Unixtime when the player was last active */
            last_active?: number;
            /** @description 1 = subscribed
             *     -2 = unsubscribed
             *     iOS - These values are set each time the user opens the app from the SDK. Use the SDK function set Subscription instead.
             *     Android - You may set this but you can no longer use the SDK method setSubscription later in your app as it will create synchronization issues.
             *      */
            notification_types?: number;
            /** @description This is used in deciding whether to use your iOS Sandbox or Production push certificate when sending a push when both have been uploaded. Set to the iOS provisioning profile that was used to build your app.
             *     1 = Development
             *     2 = Ad-Hoc
             *     Omit this field for App Store builds.
             *      */
            test_type?: number | null;
            /** @description Longitude of the device, used for geotagging to segment on. */
            long?: number;
            /** @description Latitude of the device, used for geotagging to segment on. */
            lat?: number;
            /** @description Country code in the ISO 3166-1 Alpha 2 format */
            country?: string;
        };
        Players: components["schemas"]["Player"][];
        PlayerSlice: {
            total_count?: number;
            offset?: number;
            limit?: number;
            players?: components["schemas"]["Player"][];
        };
        InvalidIdentifierError: {
            /** @description Returned if using include_external_user_ids */
            invalid_external_user_ids?: string[];
            /** @description Returned if using include_player_ids and some were valid and others were not. */
            invalid_player_ids?: string[];
        };
        /** @description Returned if no subscribed players.
         *      */
        NoSubscribersError: string[];
        Notification200Errors: components["schemas"]["InvalidIdentifierError"] | components["schemas"]["NoSubscribersError"];
        UpdateLiveActivityRequest: {
            /**
             * @description Type of live activity
             * @enum {string}
             */
            name: "headings" | "contents" | "ios_sound" | "priority_level";
            /** @enum {string} */
            event: "update" | "end";
            event_updates: Record<string, never>;
            /** @description Timestamp; only allowed if event is "end" */
            dismiss_at?: number;
        };
        BeginLiveActivityRequest: {
            push_token: string;
            subscription_id: string;
        };
        IdentityObject: {
            [key: string]: unknown;
        };
        PropertiesObject: {
            tags?: {
                [key: string]: unknown;
            };
            language?: string;
            timezone_id?: string;
            lat?: number;
            long?: number;
            country?: string;
            first_active?: number;
            last_active?: number;
            amount_spent?: number;
            purchases?: components["schemas"]["Purchase"][];
            ip?: string;
        };
        PropertiesDeltas: {
            session_time?: number;
            session_count?: number;
            purchases?: components["schemas"]["Purchase"][];
        };
        SubscriptionObject: {
            id?: string;
            /** @enum {string} */
            type?: "iOSPush" | "AndroidPush" | "FireOSPush" | "ChromeExtensionPush" | "ChromePush" | "WindowsPush" | "SafariLegacyPush" | "FirefoxPush" | "macOSPush" | "HuaweiPush" | "SafariPush" | "Email" | "SMS";
            token?: string;
            enabled?: boolean;
            notification_types?: number;
            session_time?: number;
            session_count?: number;
            sdk?: string;
            device_model?: string;
            device_os?: string;
            rooted?: boolean;
            test_type?: number;
            app_version?: string;
            net_type?: number;
            carrier?: string;
            web_auth?: string;
            web_p256?: string;
        };
        User: {
            properties?: components["schemas"]["PropertiesObject"];
            identity?: components["schemas"]["IdentityObject"];
            subscriptions?: components["schemas"]["SubscriptionObject"][];
            subscription_options?: {
                retain_previous_owner?: boolean;
            };
        };
        UpdateUserRequest: {
            properties?: components["schemas"]["PropertiesObject"];
            /** @default false */
            refresh_device_metadata: boolean;
            deltas?: components["schemas"]["PropertiesDeltas"];
        };
        CreateNotificationSuccessResponse: {
            id?: string;
            /** @description Estimated number of subscribers targetted by notification. */
            recipients?: number;
            external_id?: string | null;
            errors?: components["schemas"]["Notification200Errors"];
        };
        CancelNotificationSuccessResponse: {
            success?: boolean;
        };
        NotificationHistorySuccessResponse: {
            success?: boolean;
            destination_url?: string;
        };
        UpdatePlayerTagsSuccessResponse: {
            success?: boolean;
        };
        CreateSegmentSuccessResponse: {
            success?: boolean;
            /** @description UUID of created segment */
            id?: string;
        };
        CreateSegmentConflictResponse: {
            success?: boolean;
            errors?: string[];
        };
        DeleteSegmentSuccessResponse: {
            success?: boolean;
        };
        DeleteSegmentNotFoundResponse: {
            success?: boolean;
        };
        CreatePlayerSuccessResponse: {
            success?: boolean;
            id?: string;
        };
        DeletePlayerSuccessResponse: {
            success?: boolean;
        };
        DeletePlayerNotFoundResponse: {
            success?: boolean;
        };
        UpdatePlayerSuccessResponse: {
            success?: boolean;
        };
        ExportPlayersSuccessResponse: {
            csv_file_url?: string;
        };
        UpdateLiveActivitySuccessResponse: {
            notification_id?: string;
            errors?: components["schemas"]["Notification200Errors"];
        };
        CreateUserConflictResponse: {
            errors?: {
                code?: string;
                title?: string;
                meta?: {
                    conflicting_aliases?: Record<string, never>;
                };
            }[];
        };
        GenericError: {
            errors?: {
                code?: string;
                title?: string;
            }[];
        };
        RateLimiterError: {
            errors?: {
                code?: string;
                title?: string;
            }[];
        };
        CreateSubscriptionRequestBody: {
            subscription?: components["schemas"]["SubscriptionObject"];
            retain_previous_owner?: boolean;
        };
        UpdateSubscriptionRequestBody: {
            subscription?: components["schemas"]["SubscriptionObject"];
        };
        TransferSubscriptionRequestBody: {
            identity?: components["schemas"]["IdentityObject"];
        };
        UserIdentityRequestBody: {
            identity?: components["schemas"]["IdentityObject"];
        };
        UserIdentityResponse: {
            identity?: components["schemas"]["IdentityObject"];
        };
        ExportEventsSuccessResponse: {
            csv_file_url?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    get_notifications: {
        parameters: {
            query: {
                /** @description The app ID that you want to view notifications from */
                app_id: string;
                /** @description How many notifications to return.  Max is 50.  Default is 50. */
                limit?: number;
                /** @description Page offset.  Default is 0.  Results are sorted by queued_at in descending order.  queued_at is a representation of the time that the notification was queued at. */
                offset?: number;
                /** @description Kind of notifications returned:
                 *       * unset - All notification types (default)
                 *       * `0` - Dashboard only
                 *       * `1` - API only
                 *       * `3` - Automated only
                 *      */
                kind?: 0 | 1 | 3;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NotificationSlice"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    create_notification: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Notification"];
            };
        };
        responses: {
            /** @description OK, invalid_player_ids, invalid_external_user_ids or No Subscribed Players
             *     If a message was successfully created, you will get a 200 response and an id for the notification.
             *     If the 200 response contains "invalid_player_ids" or "invalid_external_user_ids" this will mark devices that exist in the provided app_id but are no longer subscribed.
             *     If no id is returned, then a message was not created and the targeted User IDs do not exist under the provided app_id.
             *     Any User IDs sent in the request that do not exist under the specified app_id will be ignored.
             *      */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateNotificationSuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    get_notification: {
        parameters: {
            query: {
                app_id: string;
            };
            header?: never;
            path: {
                notification_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NotificationWithMeta"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    cancel_notification: {
        parameters: {
            query: {
                app_id: string;
            };
            header?: never;
            path: {
                notification_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CancelNotificationSuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    get_notification_history: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The "id" of the message found in the Notification object */
                notification_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description -> "sent" - All the devices by player_id that were sent the specified notification_id.  Notifications targeting under 1000 recipients will not have "sent" events recorded, but will show "clicked" events. "clicked" - All the devices by `player_id` that clicked the specified notification_id.
                     * @enum {string}
                     */
                    events?: "sent" | "clicked";
                    /** @description The email address you would like the report sent. */
                    email?: string;
                    app_id?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NotificationHistorySuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    get_apps: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Apps"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    create_app: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["App"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["App"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    get_app: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An app id */
                app_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["App"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    update_app: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An app id */
                app_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["App"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["App"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    create_segments: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The OneSignal App ID for your app.  Available in Keys & IDs. */
                app_id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["Segment"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateSegmentSuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateSegmentConflictResponse"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    delete_segments: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The OneSignal App ID for your app.  Available in Keys & IDs. */
                app_id: string;
                /** @description The segment_id can be found in the URL of the segment when viewing it in the dashboard. */
                segment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeleteSegmentSuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeleteSegmentNotFoundResponse"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    get_outcomes: {
        parameters: {
            query: {
                /** @description Required
                 *     Comma-separated list of names and the value (sum/count) for the returned outcome data.
                 *     Note: Clicks only support count aggregation.
                 *     For out-of-the-box OneSignal outcomes such as click and session duration, please use the "os" prefix with two underscores. For other outcomes, please use the name specified by the user.
                 *     Example:os__session_duration.count,os__click.count,CustomOutcomeName.sum
                 *      */
                outcome_names: string;
                /** @description Optional
                 *     If outcome names contain any commas, then please specify only one value at a time.
                 *     Example: outcome_names[]=os__click.count&outcome_names[]=Sales, Purchase.count
                 *     where "Sales, Purchase" is the custom outcomes with a comma in the name.
                 *      */
                "outcome_names[]"?: string;
                /** @description Optional
                 *     Time range for the returned data. The values can be 1h (for the last 1 hour data), 1d (for the last 1 day data), or 1mo (for the last 1 month data).
                 *     Default is 1h if the parameter is omitted.
                 *      */
                outcome_time_range?: string;
                /** @description Optional
                 *     Platform id. Refer device's platform ids for values.
                 *     Example:
                 *     outcome_platform=0 for iOS
                 *     outcome_platform=7,8 for Safari and Firefox
                 *     Default is data from all platforms if the parameter is omitted.
                 *      */
                outcome_platforms?: string;
                /** @description Optional
                 *     Attribution type for the outcomes. The values can be direct or influenced or unattributed.
                 *     Example: outcome_attribution=direct
                 *     Default is total (returns direct+influenced+unattributed) if the parameter is omitted.
                 *      */
                outcome_attribution?: string;
            };
            header?: never;
            path: {
                /** @description The OneSignal App ID for your app.  Available in Keys & IDs. */
                app_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OutcomesData"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    update_live_activity: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The OneSignal App ID for your app.  Available in Keys & IDs. */
                app_id: string;
                /** @description Live Activity record ID */
                activity_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateLiveActivityRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UpdateLiveActivitySuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    begin_live_activity: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The OneSignal App ID for your app.  Available in Keys & IDs. */
                app_id: string;
                /** @description Live Activity record ID */
                activity_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BeginLiveActivityRequest"];
            };
        };
        responses: {
            /** @description OK */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    end_live_activity: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The OneSignal App ID for your app.  Available in Keys & IDs. */
                app_id: string;
                /** @description Live Activity record ID */
                activity_id: string;
                /** @description Subscription ID */
                subscription_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    create_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["User"];
            };
        };
        responses: {
            /** @description CREATED */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            /** @description CREATED */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            /** @description ACCEPTED */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Multiple User Identity Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateUserConflictResponse"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    update_player_tags: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The OneSignal App ID the user record is found under. */
                app_id: string;
                /** @description The External User ID mapped to teh device record in OneSignal.  Must be actively set on the device to be updated. */
                external_user_id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /** @description Custom tags for the device record.  Only support string key value pairs.  Does not support arrays or other nested objects.  Example `{"foo":"bar","this":"that"}`.
                     *     Limitations:
                     *     - 100 tags per call
                     *     - Android SDK users: tags cannot be removed or changed via API if set through SDK sendTag methods.
                     *     Recommended to only tag devices with 1 kilobyte of ata
                     *     Please consider using your own Database to save more than 1 kilobyte of data.  See: Internal Database & CRM
                     *      */
                    tags?: Record<string, never>;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UpdatePlayerTagsSuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    fetch_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                alias_label: string;
                alias_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    delete_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                alias_label: string;
                alias_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    update_user: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                alias_label: string;
                alias_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUserRequest"];
            };
        };
        responses: {
            /** @description ACCEPTED */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        properties?: components["schemas"]["PropertiesObject"];
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    fetch_user_identity: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                alias_label: string;
                alias_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        identity?: components["schemas"]["IdentityObject"];
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    identify_user_by_alias: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                alias_label: string;
                alias_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserIdentityRequestBody"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        identity?: components["schemas"]["IdentityObject"];
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    delete_alias: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                alias_label: string;
                alias_id: string;
                alias_label_to_delete: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        identity?: components["schemas"]["IdentityObject"];
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    create_subscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                alias_label: string;
                alias_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateSubscriptionRequestBody"];
            };
        };
        responses: {
            /** @description CREATED */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        subscription?: components["schemas"]["SubscriptionObject"];
                    };
                };
            };
            /** @description ACCEPTED */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        subscription?: components["schemas"]["SubscriptionObject"];
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Operation is not permitted due to user having the maximum number of subscriptions assigned */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    delete_subscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                subscription_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description ACCEPTED */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    update_subscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                subscription_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateSubscriptionRequestBody"];
            };
        };
        responses: {
            /** @description ACCEPTED */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    fetch_aliases: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                subscription_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserIdentityResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
        };
    };
    identify_user_by_subscription_id: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                subscription_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserIdentityRequestBody"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserIdentityResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    transfer_subscription: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                subscription_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TransferSubscriptionRequestBody"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserIdentityResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    get_eligible_iams: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                app_id: string;
                subscription_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        in_app_messages?: Record<string, never>[];
                    };
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    get_players: {
        parameters: {
            query: {
                /** @description The app ID that you want to view players from */
                app_id: string;
                /** @description How many devices to return. Max is 300. Default is 300 */
                limit?: number;
                /** @description Result offset. Default is 0. Results are sorted by id; */
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PlayerSlice"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    create_player: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Player"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreatePlayerSuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    get_player: {
        parameters: {
            query: {
                /** @description Your app_id for this device */
                app_id: string;
                /** @description Email - Only required if you have enabled Identity Verification and device_type is email (11). */
                email_auth_hash?: string;
            };
            header?: never;
            path: {
                /** @description Player's OneSignal ID */
                player_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Player"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    update_player: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Player's OneSignal ID */
                player_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Player"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UpdatePlayerSuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    delete_player: {
        parameters: {
            query: {
                /** @description The OneSignal App ID for your app.  Available in Keys & IDs. */
                app_id: string;
            };
            header?: never;
            path: {
                /** @description The OneSignal player_id */
                player_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeletePlayerSuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeletePlayerNotFoundResponse"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    export_players: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The app ID that you want to export devices from */
                app_id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /** @description Additional fields that you wish to include. Currently supports location, country, rooted, notification_types, ip, external_user_id, web_auth, and web_p256. */
                    extra_fields?: string[];
                    /** @description Export all devices with a last_active timestamp greater than this time.  Unixtime in seconds. */
                    last_active_since?: string;
                    /** @description Export all devices belonging to the segment. */
                    segment_name?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ExportPlayersSuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
    export_events: {
        parameters: {
            query: {
                /** @description The ID of the app that the notification belongs to. */
                app_id: string;
            };
            header?: never;
            path: {
                /** @description The ID of the notification to export events from. */
                notification_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ExportEventsSuccessResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GenericError"];
                };
            };
            /** @description Rate Limit Exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RateLimiterError"];
                };
            };
        };
    };
}

export type App = components["schemas"]["App"];
export type Apps = components["schemas"]["Apps"];
export type BasicNotification = components["schemas"]["BasicNotification"];
export type BeginLiveActivityRequest = components["schemas"]["BeginLiveActivityRequest"];
export type Button = components["schemas"]["Button"];
export type Buttons = components["schemas"]["Buttons"];
export type CancelNotification = operations["cancel_notification"]["parameters"]["query"];
export type CancelNotificationSuccessResponse = components["schemas"]["CancelNotificationSuccessResponse"];
export type CreateNotificationSuccessResponse = components["schemas"]["CreateNotificationSuccessResponse"];
export type CreatePlayerSuccessResponse = components["schemas"]["CreatePlayerSuccessResponse"];
export type CreateSegmentConflictResponse = components["schemas"]["CreateSegmentConflictResponse"];
export type CreateSegmentSuccessResponse = components["schemas"]["CreateSegmentSuccessResponse"];
export type CreateSubscriptionRequestBody = components["schemas"]["CreateSubscriptionRequestBody"];
export type CreateUserConflictResponse = components["schemas"]["CreateUserConflictResponse"];
export type DeletePlayer = operations["delete_player"]["parameters"]["query"];
export type DeletePlayerNotFoundResponse = components["schemas"]["DeletePlayerNotFoundResponse"];
export type DeletePlayerSuccessResponse = components["schemas"]["DeletePlayerSuccessResponse"];
export type DeleteSegmentNotFoundResponse = components["schemas"]["DeleteSegmentNotFoundResponse"];
export type DeleteSegmentSuccessResponse = components["schemas"]["DeleteSegmentSuccessResponse"];
export type DeliveryData = components["schemas"]["DeliveryData"];
export type ExportEvents = operations["export_events"]["parameters"]["query"];
export type ExportEventsSuccessResponse = components["schemas"]["ExportEventsSuccessResponse"];
export type ExportPlayersSuccessResponse = components["schemas"]["ExportPlayersSuccessResponse"];
export type Filter = components["schemas"]["Filter"];
export type FilterExpressions = components["schemas"]["FilterExpressions"];
export type GenericError = components["schemas"]["GenericError"];
export type GetNotification = operations["get_notification"]["parameters"]["query"];
export type GetNotifications = operations["get_notifications"]["parameters"]["query"];
export type GetOutcomes = operations["get_outcomes"]["parameters"]["query"];
export type GetPlayer = operations["get_player"]["parameters"]["query"];
export type GetPlayers = operations["get_players"]["parameters"]["query"];
export type IdentityObject = components["schemas"]["IdentityObject"];
export type InvalidIdentifierError = components["schemas"]["InvalidIdentifierError"];
export type NoSubscribersError = components["schemas"]["NoSubscribersError"];
export type Notification = components["schemas"]["Notification"];
export type Notification200Errors = components["schemas"]["Notification200Errors"];
export type NotificationHistorySuccessResponse = components["schemas"]["NotificationHistorySuccessResponse"];
export type NotificationSlice = components["schemas"]["NotificationSlice"];
export type NotificationTarget = components["schemas"]["NotificationTarget"];
export type NotificationWithMeta = components["schemas"]["NotificationWithMeta"];
export type Operator = components["schemas"]["Operator"];
export type OutcomeData = components["schemas"]["OutcomeData"];
export type OutcomesData = components["schemas"]["OutcomesData"];
export type PlatformDeliveryData = components["schemas"]["PlatformDeliveryData"];
export type Player = components["schemas"]["Player"];
export type PlayerNotificationTarget = components["schemas"]["PlayerNotificationTarget"];
export type PlayerSlice = components["schemas"]["PlayerSlice"];
export type Players = components["schemas"]["Players"];
export type PropertiesDeltas = components["schemas"]["PropertiesDeltas"];
export type PropertiesObject = components["schemas"]["PropertiesObject"];
export type Purchase = components["schemas"]["Purchase"];
export type RateLimiterError = components["schemas"]["RateLimiterError"];
export type Segment = components["schemas"]["Segment"];
export type SegmentNotificationTarget = components["schemas"]["SegmentNotificationTarget"];
export type StringMap = components["schemas"]["StringMap"];
export type SubscriptionObject = components["schemas"]["SubscriptionObject"];
export type TransferSubscriptionRequestBody = components["schemas"]["TransferSubscriptionRequestBody"];
export type UpdateLiveActivityRequest = components["schemas"]["UpdateLiveActivityRequest"];
export type UpdateLiveActivitySuccessResponse = components["schemas"]["UpdateLiveActivitySuccessResponse"];
export type UpdatePlayerSuccessResponse = components["schemas"]["UpdatePlayerSuccessResponse"];
export type UpdatePlayerTagsSuccessResponse = components["schemas"]["UpdatePlayerTagsSuccessResponse"];
export type UpdateSubscriptionRequestBody = components["schemas"]["UpdateSubscriptionRequestBody"];
export type UpdateUserRequest = components["schemas"]["UpdateUserRequest"];
export type User = components["schemas"]["User"];
export type UserIdentityRequestBody = components["schemas"]["UserIdentityRequestBody"];
export type UserIdentityResponse = components["schemas"]["UserIdentityResponse"];

// API Def

import { Api } from "api-def";

let hasConfig = false;
try {
  hasConfig = Boolean(require.resolve("./OneSignalJsonApi.config"));
} catch {}
const config = hasConfig ? require("./OneSignalJsonApi.config") : {};


const API = new Api({
  name: "OneSignal",
  baseUrl: "https://onesignal.com/api/v1",
  ...(config.default ?? config),
});

export const getNotifications = API.endpoint()
  .responseOf<NotificationSlice>()
  .queryOf<GetNotifications>()
  .build({
    method: "get",
    path: "/notifications",
    id: "get_notifications",
  });

export const createNotification = API.endpoint()
  .responseOf<CreateNotificationSuccessResponse>()
  .bodyOf<Notification>()
  .build({
    method: "post",
    path: "/notifications",
    id: "create_notification",
  });

export const getNotification = API.endpoint()
  .paramsOf<"notification_id">()
  .responseOf<NotificationWithMeta>()
  .queryOf<GetNotification>()
  .build({
    method: "get",
    path: "/notifications/{notification_id}",
    id: "get_notification",
  });

export const cancelNotification = API.endpoint()
  .paramsOf<"notification_id">()
  .responseOf<CancelNotificationSuccessResponse>()
  .queryOf<CancelNotification>()
  .build({
    method: "delete",
    path: "/notifications/{notification_id}",
    id: "cancel_notification",
  });

export const getNotificationHistory = API.endpoint()
  .paramsOf<"notification_id">()
  .responseOf<NotificationHistorySuccessResponse>()
  .build({
    method: "post",
    path: "/notifications/{notification_id}/history",
    id: "get_notification_history",
  });

export const getApps = API.endpoint()
  .responseOf<Apps>()
  .build({
    method: "get",
    path: "/apps",
    id: "get_apps",
  });

export const createApp = API.endpoint()
  .responseOf<App>()
  .bodyOf<App>()
  .build({
    method: "post",
    path: "/apps",
    id: "create_app",
  });

export const getApp = API.endpoint()
  .paramsOf<"app_id">()
  .responseOf<App>()
  .build({
    method: "get",
    path: "/apps/{app_id}",
    id: "get_app",
  });

export const updateApp = API.endpoint()
  .paramsOf<"app_id">()
  .responseOf<App>()
  .bodyOf<App>()
  .build({
    method: "put",
    path: "/apps/{app_id}",
    id: "update_app",
  });

export const createSegments = API.endpoint()
  .paramsOf<"app_id">()
  .responseOf<CreateSegmentSuccessResponse>()
  .bodyOf<Segment>()
  .build({
    method: "post",
    path: "/apps/{app_id}/segments",
    id: "create_segments",
  });

export const deleteSegments = API.endpoint()
  .paramsOf<"app_id" | "segment_id">()
  .responseOf<DeleteSegmentSuccessResponse>()
  .build({
    method: "delete",
    path: "/apps/{app_id}/segments/{segment_id}",
    id: "delete_segments",
  });

export const getOutcomes = API.endpoint()
  .paramsOf<"app_id">()
  .responseOf<OutcomesData>()
  .queryOf<GetOutcomes>()
  .build({
    method: "get",
    path: "/apps/{app_id}/outcomes",
    id: "get_outcomes",
  });

export const updateLiveActivity = API.endpoint()
  .paramsOf<"app_id" | "activity_id">()
  .responseOf<UpdateLiveActivitySuccessResponse>()
  .bodyOf<UpdateLiveActivityRequest>()
  .build({
    method: "post",
    path: "/apps/{app_id}/live_activities/{activity_id}/notifications",
    id: "update_live_activity",
  });

export const beginLiveActivity = API.endpoint()
  .paramsOf<"app_id" | "activity_id">()
  .bodyOf<BeginLiveActivityRequest>()
  .build({
    method: "post",
    path: "/apps/{app_id}/live_activities/{activity_id}/token",
    id: "begin_live_activity",
  });

export const endLiveActivity = API.endpoint()
  .paramsOf<"app_id" | "activity_id" | "subscription_id">()
  .build({
    method: "delete",
    path: "/apps/{app_id}/live_activities/{activity_id}/token/{subscription_id}",
    id: "end_live_activity",
  });

export const createUser = API.endpoint()
  .paramsOf<"app_id">()
  .responseOf<User>()
  .bodyOf<User>()
  .build({
    method: "post",
    path: "/apps/{app_id}/users",
    id: "create_user",
  });

export const updatePlayerTags = API.endpoint()
  .paramsOf<"app_id" | "external_user_id">()
  .responseOf<UpdatePlayerTagsSuccessResponse>()
  .build({
    method: "put",
    path: "/apps/{app_id}/users/{external_user_id}",
    id: "update_player_tags",
  });

export const fetchUser = API.endpoint()
  .paramsOf<"app_id" | "alias_label" | "alias_id">()
  .responseOf<User>()
  .build({
    method: "get",
    path: "/apps/{app_id}/users/by/{alias_label}/{alias_id}",
    id: "fetch_user",
  });

export const updateUser = API.endpoint()
  .paramsOf<"app_id" | "alias_label" | "alias_id">()
  .bodyOf<UpdateUserRequest>()
  .build({
    method: "patch",
    path: "/apps/{app_id}/users/by/{alias_label}/{alias_id}",
    id: "update_user",
  });

export const deleteUser = API.endpoint()
  .paramsOf<"app_id" | "alias_label" | "alias_id">()
  .build({
    method: "delete",
    path: "/apps/{app_id}/users/by/{alias_label}/{alias_id}",
    id: "delete_user",
  });

export const identifyUserByAlias = API.endpoint()
  .paramsOf<"app_id" | "alias_label" | "alias_id">()
  .bodyOf<UserIdentityRequestBody>()
  .build({
    method: "patch",
    path: "/apps/{app_id}/users/by/{alias_label}/{alias_id}/identity",
    id: "identify_user_by_alias",
  });

export const fetchUserIdentity = API.endpoint()
  .paramsOf<"app_id" | "alias_label" | "alias_id">()
  .build({
    method: "get",
    path: "/apps/{app_id}/users/by/{alias_label}/{alias_id}/identity",
    id: "fetch_user_identity",
  });

export const deleteAlias = API.endpoint()
  .paramsOf<"app_id" | "alias_label" | "alias_id" | "alias_label_to_delete">()
  .build({
    method: "delete",
    path: "/apps/{app_id}/users/by/{alias_label}/{alias_id}/identity/{alias_label_to_delete}",
    id: "delete_alias",
  });

export const createSubscription = API.endpoint()
  .paramsOf<"app_id" | "alias_label" | "alias_id">()
  .bodyOf<CreateSubscriptionRequestBody>()
  .build({
    method: "post",
    path: "/apps/{app_id}/users/by/{alias_label}/{alias_id}/subscriptions",
    id: "create_subscription",
  });

export const updateSubscription = API.endpoint()
  .paramsOf<"app_id" | "subscription_id">()
  .bodyOf<UpdateSubscriptionRequestBody>()
  .build({
    method: "patch",
    path: "/apps/{app_id}/subscriptions/{subscription_id}",
    id: "update_subscription",
  });

export const deleteSubscription = API.endpoint()
  .paramsOf<"app_id" | "subscription_id">()
  .build({
    method: "delete",
    path: "/apps/{app_id}/subscriptions/{subscription_id}",
    id: "delete_subscription",
  });

export const fetchAliases = API.endpoint()
  .paramsOf<"app_id" | "subscription_id">()
  .responseOf<UserIdentityResponse>()
  .build({
    method: "get",
    path: "/apps/{app_id}/subscriptions/{subscription_id}/user/identity",
    id: "fetch_aliases",
  });

export const identifyUserBySubscriptionId = API.endpoint()
  .paramsOf<"app_id" | "subscription_id">()
  .responseOf<UserIdentityResponse>()
  .bodyOf<UserIdentityRequestBody>()
  .build({
    method: "patch",
    path: "/apps/{app_id}/subscriptions/{subscription_id}/user/identity",
    id: "identify_user_by_subscription_id",
  });

export const transferSubscription = API.endpoint()
  .paramsOf<"app_id" | "subscription_id">()
  .responseOf<UserIdentityResponse>()
  .bodyOf<TransferSubscriptionRequestBody>()
  .build({
    method: "patch",
    path: "/apps/{app_id}/subscriptions/{subscription_id}/owner",
    id: "transfer_subscription",
  });

export const getEligibleIams = API.endpoint()
  .paramsOf<"app_id" | "subscription_id">()
  .build({
    method: "get",
    path: "/apps/{app_id}/subscriptions/{subscription_id}/iams",
    id: "get_eligible_iams",
  });

export const getPlayers = API.endpoint()
  .responseOf<PlayerSlice>()
  .queryOf<GetPlayers>()
  .build({
    method: "get",
    path: "/players",
    id: "get_players",
  });

export const createPlayer = API.endpoint()
  .responseOf<CreatePlayerSuccessResponse>()
  .bodyOf<Player>()
  .build({
    method: "post",
    path: "/players",
    id: "create_player",
  });

export const deletePlayer = API.endpoint()
  .paramsOf<"player_id">()
  .responseOf<DeletePlayerSuccessResponse>()
  .queryOf<DeletePlayer>()
  .build({
    method: "delete",
    path: "/players/{player_id}",
    id: "delete_player",
  });

export const getPlayer = API.endpoint()
  .paramsOf<"player_id">()
  .responseOf<Player>()
  .queryOf<GetPlayer>()
  .build({
    method: "get",
    path: "/players/{player_id}",
    id: "get_player",
  });

export const updatePlayer = API.endpoint()
  .paramsOf<"player_id">()
  .responseOf<UpdatePlayerSuccessResponse>()
  .bodyOf<Player>()
  .build({
    method: "put",
    path: "/players/{player_id}",
    id: "update_player",
  });

export const exportPlayers = API.endpoint()
  .paramsOf<"app_id">()
  .responseOf<ExportPlayersSuccessResponse>()
  .build({
    method: "post",
    path: "/players/csv_export?app_id={app_id}",
    id: "export_players",
  });

export const exportEvents = API.endpoint()
  .paramsOf<"notification_id">()
  .responseOf<ExportEventsSuccessResponse>()
  .queryOf<ExportEvents>()
  .build({
    method: "post",
    path: "/notifications/{notification_id}/export_events?app_id={app_id}",
    id: "export_events",
  });

export default API;