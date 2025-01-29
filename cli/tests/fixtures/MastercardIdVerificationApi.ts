// Type Defs

export interface paths {
    "/data-extractions/access-tokens": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * The provider token is retrieved by country code and SDK version
         * @description Return a provider token to be passed to the MIDS Liveness SDK module.
         */
        post: operations["retrieveDataExtractionAccessToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data-extractions/facematch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verifies the details of a selfie with an identity verification provider
         * @description Returns the Status of the Source Verification that has been processed by a trusted IVP.
         */
        post: operations["facematchVerification"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sms-otps": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Creates and Send a One-Time Passcode (OTP) via SMS
         * @description Create and Send a One-Time Passcode (OTP) via SMS to the address provided.
         */
        post: operations["sendSmsOtp"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/email-otps": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Creates and Send a One-Time Passcode (OTP) via Email
         * @description Create and Send a One-Time Passcode (OTP) via Email to the address provided.
         */
        post: operations["sendEmailOtp"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sms-otp-verifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verifies the provided code matches the SMS OTP
         * @description Verify provided code matches the SMS OTP.
         */
        post: operations["verifySmsOtp"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/email-otp-verifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verifies the provided code matches the Email OTP
         * @description Verify that the provided code matches One-Time Passcode (OTP) sent via Email during `/email-otps`.
         */
        post: operations["verifyEmailOtp"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/data-extractions/scans/{scan_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Returns the status of the document verification.
         * @description Returns the status of the document verification as it's being processed by the vendor.
         */
        get: operations["extractScannedDocumentData"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/source-verifications/{issuing_country}/medicare-cards": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verifies the details of a medicare card document with an identity verification provider
         * @description Returns the status of the Medicare Card source verification as it's being processed by the vendor. Biometrics are not used with this API, which means document scanning is not required for the users to verify their identity. This will be a one-time verification with no data being stored.
         */
        post: operations["verifyMedicareCard"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/source-verifications/{issuing_country}/passports": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verifies the details of a passport document with an identity verification provider
         * @description Returns the Status of the Source Verification that has been processed by a trusted IVP.
         */
        post: operations["verifyPassport"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/source-verifications/{issuing_country}/driving-licenses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verifies the details of a driving license document with an identity verification provider
         * @description Returns the Status of the Source Verification that has been processed by a trusted IVP.
         */
        post: operations["verifyDriversLicense"];
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
        /** @description Document Data. */
        DocumentVerificationExtractedDataDocumentData: {
            /**
             * @description Document Number.
             * @example N1234567
             */
            documentNumber: string;
            /**
             * @description Document Status. SUCCESS OR PENDING.
             * @example SUCCESS
             */
            documentStatus: string;
            /**
             * @description Document Type. PASSPORT OR DRIVER_LICENSE OR ID_CARD.
             * @example PASSPORT
             */
            documentType: string;
            /**
             * @description YYYY-MM-DD format.
             * @example 2020-09-09
             */
            dateOfBirth: string;
            /**
             * @description Users First Name.
             * @example John
             */
            firstName: string;
            /**
             * @description Users Last Name.
             * @example Smith
             */
            lastName: string;
            /**
             * Format: date
             * @description Document expiration date in YYYY-MM-DD format.
             * @example 2020-10-10
             */
            expiryDate: string;
            /**
             * @description M/F.
             * @example M
             */
            gender: string;
            /**
             * @description Document issuing country.
             * @example AUS
             */
            issuingCountry: string;
            /**
             * Format: date
             * @description Document issuing date.
             * @example 2020-09-09
             */
            issuingDate: string;
            /**
             * @description Document issuing place.
             * @example New York
             */
            issuingPlace?: string;
            /**
             * @description Document issuing authority.
             * @example United States
             */
            issuingAuthority?: string;
            /**
             * @description Users place of birth.
             * @example Boston
             */
            placeOfBirth?: string;
            /**
             * @description Users Address Line 1.
             * @example 123 Main St.
             */
            addressLine1?: string;
            /**
             * @description Users Address Line 2.
             * @example New York
             */
            addressLine2?: string;
            /**
             * @description Users zip code.
             * @example 10021
             */
            addressZipCode?: string;
            /**
             * @description Users City.
             * @example New York
             */
            addressCity?: string;
            /**
             * @description Users Country.
             * @example USA
             */
            addressCountry?: string;
            /**
             * @description Users Subdivision.
             * @example MO
             */
            addressSubdivision?: string;
            /**
             * @description Users State.
             * @example MO
             */
            issuingState?: string;
            /**
             * @description Users formatted Address.
             * @example 220 BLVD O FALLON MO
             */
            formattedAddress?: string;
            /**
             * @description Users Selfie Binary data, Base64 encoded.
             * @example /mJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanq.........................
             */
            selfie?: string;
            /**
             * @description Users document front binary data, Base64 encoded.
             * @example /mJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanq.........................
             */
            documentImageFront?: string;
            /**
             * @description Users document back binary data, Base64 encoded.
             * @example /mJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanq.........................
             */
            documentImageBack?: string;
            /**
             * @description Users document facemap binary data, Base64 encoded.
             * @example /mJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanq.........................
             */
            facemap?: string;
            /**
             * @description RG Number.
             * @example 12345
             */
            rgNumber?: string;
            /**
             * @description CPF Number.
             * @example 12345
             */
            cpf?: string;
            /**
             * @description Father's Name.
             * @example John Smith
             */
            fathersName?: string;
            /**
             * @description Mother's Name.
             * @example Paula Smith
             */
            mothersName?: string;
        };
        DocumentVerificationExtractedData: {
            documentData?: components["schemas"]["DocumentVerificationExtractedDataDocumentData"];
            /**
             * @description The status of the Status API, possible values are SUCCESS / PENDING.
             * @example SUCCESS
             */
            status: string;
            /**
             * @description The transaction ID provided in the API response must be logged by the Relying Party. The Relying Party is required to provide the transaction ID when contacting the Mastercard customer support team.
             * @example 1ec14310-e85c-11ea-adc1-0242ac120002
             */
            transactionId: string;
        };
        AccessToken: {
            /**
             * @description The transaction ID provided in the API response must be logged by the Relying Party. The Relying Party is required to provide the transaction ID when contacting the Mastercard customer support team.
             * @example 1ec14310-e85c-11ea-adc1-0242ac120002
             */
            transactionId: string;
            /**
             * @description The accountId is an identifier for the client's account on the identity verification provider used by ID Verification.
             * @example 14c01794-926a-426f-ad72-c45f8fbf78a4
             */
            accountId?: string;
            /**
             * @description The workflowId is the identifier for the scan on the identity verification provider used by ID Verification.
             * @example 5226539e-78e7-45ac-a924-072d1301c24c
             */
            workflowId?: string;
            /**
             * @description Token to initialize the SDK.
             * @example eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAB3NQQpCMQwE0Lt0baBJ0yZ159KtN0jTBgTBjYgg3t3__3KGN8w3rc_llc4JG6KUhrmoYjolc7_OvWfPKJ2hUzNgagE2hcC5hsYIUeOdH7gStVr6AtElwNUcrBNDFppYMjqxb9hvKzb9fNzfa4_HVkORomdoggsYp8HgPqAWF43VtsOcfn_stx4UsAAAAA.tDRVowYYcpQ03Vlt7D3MiovleiyRFQMv4qzXb7Lf_6CarphRrlWXan8-jE-YesNiAiT8tk0b-i8TKHGrcgT1VQ
             */
            sdkToken: string;
            /**
             * @description API Data Center. The accepted values are US, EU or SG.
             * @example US
             */
            apiDataCenter: string;
            /**
             * @description Web url to display in iframe.
             * @example https://mastercard.web.apac-1.jumio.link/web/v4/app?authorizationToken=eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAJXOQQ5CIQxF0b0wtkmBFqgzh07_Dkp_iWM10cS4d0FX4PTm5OW9gj9P93AMsaRaS845CVM4BDU776sLi5JGiM06UGGDLiUCRaLa0rDR6uJf7FH6mBwYtUyCBcSywBznbmMfGdPEj-H_cNt8TL35zfVql1V-12o0SZ3AGysQ1wKNFCGbsjlyUsTw_gANOZ5b4gAAAA.2bo6KfOvGIswNRNTXv6QtoGvHyNYp_j3LwHia9DtuWna3y_LLI1VgPZle46Q5cFHuuMJB7g7y4wHbtogBX2HfQ&locale=en-US
             */
            documentVerificationUrl?: string;
        };
        RetrieveAccessToken: {
            /**
             * @description The ISO 3166-1 alpha2 code which corresponds to the country from where the request to ID is originating from.
             * @example US
             */
            countryCode: string;
            /**
             * @description The platform where the request is generated from.
             * @example WEB
             * @enum {string}
             */
            channelType: "WEB" | "SDK";
            /**
             * @description The SDK's version that the application is using. Required if the channelType is `SDK`.
             * @example 1.0.0
             */
            sdkVersion?: string;
            /**
             * @description The preferred liveness type to be applied; Liveness Assurance (LA) or Genuine Presence Assurance (GPA), where GPA provides LA capability and also additional checks that ensure the user is genuinely present.
             * @example GPA
             * @enum {string}
             */
            livenessType?: "GPA" | "LA";
            /**
             * @description The URL to be redirected to if the token request is successful. Must be present if the channelType is WEB.
             * @example https://www.rp.com/success
             */
            successUrl?: string;
            /**
             * @description The URL to be redirected to if the token request is not successful. Must be present if the channelType is WEB.
             * @example https://www.rp.com/error
             */
            errorUrl?: string;
            /**
             * @description The IETF BCP 47 value which determines the language variant to be applied in the subsequent scanning dialogs accessed via the token.
             * @default en-US
             * @example en-GB
             */
            locale: string;
            /** @description An optional object which allows the Relying Party to limit the country and type of document which can be submitted, by not displaying a document selection screen within the user journey. If only one of the document type or issuing country fields is populated, then the associated dialog option on the document selection screen will continue be displayed. */
            document?: {
                /**
                 * @description Element used to restrict the issuing country of the document that can be uploaded by the user. Inclusion of a value for this element will result in the issuing country option being removed from the Document Selection screen. If a value is also included for the documentType element, then the Document Selection screen will not be displayed at all. The value submitted needs to comply to the ISO 3166-1 Alpha 3 standard.
                 * @example USA
                 */
                issuingCountry?: string;
                /**
                 * @description Element used to restrict the type of document that can be uploaded by the user. Inclusion of a value for this element will result in the document type option being removed from the Document Selection screen. If a value is also included for the issuingCountry element, then the Document Selection screen will not be displayed at all. The value submitted must be one of the following enum values.
                 * @example DRIVING_LICENSE
                 * @enum {string}
                 */
                documentType?: "DRIVING_LICENSE" | "ID_CARD" | "PASSPORT";
            };
            /**
             * @description Value which indicates the capabilities which are to be executed within the flow: <br/> <ul> <li> Document Extraction – Verifies a document is genuine and provides an extract of the details contained in that document.</li> <li> Document Extraction, Facematch and Liveness – Verifies a document is genuine, provides an extract of the details contained in that document, and verifies the user is live and is the subject of that document.</li> <li> Facematch – Matches a user to a previously verified document.</li> </ul> If no value is supplied then the full document extraction, liveness and face matching capability will be enacted by default.
             * @example DOCUMENT_EXTRACTION_FACEMATCH_LIVENESS
             * @enum {String}
             */
            workflowDefinition?: "DOCUMENT_EXTRACTION" | "DOCUMENT_EXTRACTION_FACEMATCH_LIVENESS" | "FACEMATCH";
            /**
             * @description Required only when the FACEMATCH enum is specified in the workflowDefinition field.<br/> The accountId value returned to the client in a previous access token call for the document which is to form the basis for the face-match.
             * @example 14c01794-926a-426f-ad72-c45f8fbf78a4
             */
            accountId?: string;
            /**
             * @description Required only when the FACEMATCH enum is specified in the workflowDefinition field.<br/> The workflowId value returned to the client in a previous access token call for the document which is to form the basis for the face-match.
             * @example 5226539e-78e7-45ac-a924-072d1301c24c
             */
            workflowId?: string;
        };
        OtpVerificationResult: {
            /**
             * @description `SUCCESS`, `FAILURE` or `ATTEMPTS_EXCEEDED`.
             * @example SUCCESS
             */
            responseCode: string;
            /**
             * @description A short message describing the response code.
             * @example OTP verified
             */
            responseMessage: string;
            /**
             * @description The transaction ID provided in the API response must be logged by the Relying Party. The Relying Party is required to provide the transaction ID when contacting the Mastercard customer support team.
             * @example 28eae1aa-6744-433e-879d-7da48d63e89a
             */
            transactionId: string;
            /**
             * Format: int32
             * @description The number of attempts remaining. This field is only populated for the `FAILURE` response code.
             * @example 2
             */
            attemptsRemaining?: number;
        };
        Otp: {
            /**
             * @description A random 128-bit UUID representing otp request.
             * @example 471dddb6-7204-4ac6-a94a-fdeb7a094a85
             */
            otpId: string;
            /**
             * @description The transaction ID provided in the API response must be logged by the Relying Party. The Relying Party is required to provide the transaction ID when contacting the Mastercard customer support team.
             * @example bd400bde-8ae1-4d7b-a39e-ebebb94e6d08
             */
            transactionId: string;
        };
        OtpVerification: {
            /**
             * @description The 6-digit code which was sent to the user.
             * @example 123456
             */
            code: string;
            /**
             * @description The otpId in the response body of create otp request.
             * @example 63d04933-02b6-4ea4-adf9-68696e675a01
             */
            otpId: string;
            /**
             * @description The ISO 3166-1 alpha2 code which corresponds to the country from where the request to ID is originating from.
             * @example BR
             */
            countryCode: string;
            /**
             * @description The value which best reflects the input of the User with regard to consent to use their data.
             * @example ACCEPT
             * @enum {string}
             */
            userConsent?: "ACCEPT" | "DECLINE" | "REVOKE" | "EXPIRE";
        };
        EmailOtp: {
            /**
             * @description The ISO 3166-1 alpha2 code which corresponds to the country from where the request to ID is originating from.
             * @example BR
             */
            countryCode: string;
            /**
             * @description The email address in which to send the OTP to.
             * @example john.dunne@domain.com
             */
            emailAddress: string;
            /**
             * @description The IETF BCP 47 value which determines the language variant to be applied in the OTP messages.
             * @default en-US
             * @example en-GB
             */
            locale: string;
            /**
             * @description The value which best reflects the input of the User with regard to consent to use their data.
             * @example ACCEPT
             * @enum {string}
             */
            userConsent?: "ACCEPT" | "DECLINE" | "REVOKE" | "EXPIRE";
        };
        SMSOtp: {
            /**
             * @description The ISO 3166-1 alpha2 code which corresponds to the country from where the request to ID is originating from.
             * @example BR
             */
            countryCode: string;
            /**
             * @description The phone number in which to send the OTP to. It should be prefixed with the international dialing code, without the '+'.
             * @example 553453554563
             */
            phoneNumber: string;
            /**
             * @description The IETF BCP 47 value which determines the language variant to be applied in the OTP messages.
             * @default en-US
             * @example en-GB
             */
            locale: string;
            /**
             * @description The value which best reflects the input of the User with regard to consent to use their data.
             * @example ACCEPT
             * @enum {string}
             */
            userConsent?: "ACCEPT" | "DECLINE" | "REVOKE" | "EXPIRE";
        };
        MedicareCardSourceVerificationRequestAttributes: {
            /**
             * @description The value which best reflects the input of the User with regard to consent to use their data.
             * @example ACCEPT
             * @enum {string}
             */
            userConsent: "ACCEPT" | "DECLINE" | "REVOKE" | "EXPIRE";
            /**
             * @description Medicard Color can be GREEN, BLUE OR YELLOW.
             * @example BLUE
             * @enum {string}
             */
            cardColor: "GREEN" | "BLUE" | "YELLOW";
            /**
             * @description Name Line 1.
             * @example Smith
             */
            nameLine1: string;
            /**
             * @description Unique number for Medicare card.
             * @example 1234567890
             */
            medicareCardNo: string;
            /**
             * @description Individual Reference Number.
             * @example 1
             */
            individualReferenceNo: string;
            /**
             * @description Country code (case insensitive) as described in the ISO 3166-1 alpha-3 international standard.
             * @example AUS
             */
            countryCode: string;
            /**
             * @description The expiry date as it appears on the card, following the color and format. Green card YYYY-MM, Yellow or Blue card YYYY-MM-DD.
             * @example 2000-12-31
             */
            expiryDate: string;
            /**
             * @description Name Line 2.
             * @example Steve
             */
            nameLine2?: string;
            /**
             * @description Name Line 3.
             * @example Baven
             */
            nameLine3?: string;
            /**
             * @description Name Line 4.
             * @example Mike
             */
            nameLine4?: string;
            /**
             * Format: date
             * @description YYYY-MM-DD format.
             * @example 2010-10-25
             */
            birthDate?: string;
        };
        MedicareCardSourceVerificationResult: {
            /**
             * @description Verification Results, following : DOCUMENT_VERIFIED - Document matches with the IVP registered document, DOCUMENT_NOT_VERIFIED - Document does not match with any of the IVP registered document, DOCUMENT_INVALID - Document is invalid or not electronically captured.
             * @example DOCUMENT_VERIFIED
             */
            verificationResult: string;
        };
        FacematchSourceVerificationResult: {
            /**
             * @description Verification Results, following: DOCUMENT_VERIFIED - Document matches with the IVP registered document, DOCUMENT_NOT_VERIFIED - Document does not match with any of the IVP registered document, DOCUMENT_INVALID - Document is invalid or not electronically captured
             * @example DOCUMENT_VERIFIED
             */
            verificationResult: string;
            /**
             * @description The workflowId is the identifier for the scan on the identity verification provider used by ID Verification.
             * @example 5226539e-78e7-45ac-a924-072d1301c24c
             */
            workflowId: string;
            /**
             * @description The accountId is an identifier for the client's account on the identity verification provider used by ID Verification.
             * @example 14c01794-926a-426f-ad72-c45f8fbf78a4
             */
            accountId: string;
        };
        PassportSourceVerificationRequestAttributes: {
            /**
             * @description Document Number.
             * @example N1234567
             */
            documentNumber: string;
            /**
             * @description The value which best reflects the input of the User with regard to consent to use their data.
             * @example ACCEPT
             * @enum {string}
             */
            userConsent: "ACCEPT" | "DECLINE" | "REVOKE" | "EXPIRE";
            /**
             * Format: date
             * @description YYYY-MM-DD format.
             * @example 1990-01-01
             */
            dateOfBirth: string;
            /**
             * @description Users First Name.
             * @example John
             */
            firstName: string;
            /**
             * @description Users Last Name.
             * @example Smith
             */
            lastName: string;
            /**
             * @description Users Gender.
             * @example M
             */
            gender?: string;
            /**
             * @description Whether visa verification is required.
             * @example true
             */
            visaMatched?: boolean;
            /**
             * @description Visa issuing country.
             * @example AUS
             */
            visaIssuingCountry?: string;
        };
        DriversLicenseSourceVerificationRequestAttributes: {
            /**
             * @description Document Number.
             * @example AB001234567
             */
            documentNumber: string;
            /**
             * @description The value which best reflects the input of the User with regard to consent to use their data.
             * @example ACCEPT
             * @enum {string}
             */
            userConsent: "ACCEPT" | "DECLINE" | "REVOKE" | "EXPIRE";
            /**
             * Format: date
             * @description YYYY-MM-DD format.
             * @example 1990-01-01
             */
            dateOfBirth: string;
            /**
             * @description Users First Name.
             * @example John
             */
            firstName: string;
            /**
             * @description Users Last Name.
             * @example Smith
             */
            lastName: string;
            /**
             * @description State code.
             * @example NSW
             */
            stateCode: string;
            /**
             * @description Users DVS Card Number.
             * @example AB45864
             */
            cardNumber: string;
        };
        SelfieVerificationRequest: {
            /**
             * @description User account ID
             * @example 14c01794-926a-426f-ad72-c45f8fbf78a4
             */
            accountId: string;
            /**
             * @description Base 64 selfie
             * @example /mJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanq.........................
             */
            selfie: string;
            /**
             * @description liveness type, GPA takes longer and provides more accuracy, LA is faster
             * @example GPA
             * @enum {string}
             */
            livenessType: "GPA" | "LA";
            /**
             * @description the platform of enrollment process
             * @example WEB
             * @enum {string}
             */
            channelType: "WEB" | "SDK";
        };
        SourceVerificationResult: {
            /**
             * @description Verification Results, following : DOCUMENT_VERIFIED - Document matches with the IVP registered document, DOCUMENT_NOT_VERIFIED - Document does not match with any of the IVP registered document, DOCUMENT_INVALID - Document is invalid or not electronically captured.
             * @example DOCUMENT_VERIFIED
             */
            verificationResult: string;
        };
        IdentityVerification: {
            /**
             * @description The transaction ID provided in the API response must be logged by the Relying Party. The Relying Party is required to provide the transaction ID when contacting the Mastercard customer support team.
             * @example 970b1f6f-d46b-4435-487a-6e4357b25430
             */
            transactionId?: string;
            name?: {
                /**
                 * Format: int32
                 * @description The user's first name.
                 * @example 100
                 */
                firstName?: number;
                /**
                 * Format: int32
                 * @description The user's last name.
                 * @example 100
                 */
                lastName?: number;
                /**
                 * Format: int32
                 * @description The user's name score.
                 * @example 100
                 */
                nameScore?: number;
            };
            /** @description The user's address. */
            address?: {
                /**
                 * Format: int32
                 * @description The user's street number.
                 * @example 100
                 */
                streetNumber?: number;
                /**
                 * @description Response from identity verification provider.
                 * @example true
                 */
                street?: boolean;
                /**
                 * @description Response from identity verification provider.
                 * @example true
                 */
                city?: boolean;
                /**
                 * @description Response from identity verification provider.
                 * @example true
                 */
                region?: boolean;
                /**
                 * @description Response from identity verification provider.
                 * @example true
                 */
                postalCode?: boolean;
                /**
                 * Format: int32
                 * @description The user's address score.
                 * @example 100
                 */
                addressScore?: number;
            };
            identifiers?: {
                /**
                 * @description Response from identity verification provider.
                 * @example true
                 */
                last4ssn?: boolean;
                /**
                 * @description Response from identity verification provider.
                 * @example true
                 */
                nationalId?: boolean;
                /**
                 * @description Response from identity verification provider.
                 * @example true
                 */
                dob?: boolean;
            };
            email?: {
                /**
                 * @description Response from identity verification provider.
                 * @example true
                 */
                emailAddress?: boolean;
            };
            /**
             * @description The user's phone number.
             * @example 19999999998
             */
            phoneNumber?: string;
            /**
             * @description An array of indicators that provide additional context about the Transaction. For complete list.
             *     |   Reason Code |   Description |
             *     |:--------------|:------------------|
             *     |AC|Normalized address was used to complete empty address fields prior to match.|
             *     |AU|Address Undeliverable.|
             *     |BA|Business Address.|
             *     |BL|Mobile Business Line.|
             *     |CN|First and Last name combined in one field.|
             *     |DA|Dual address (Ex. 123 Main St PO Box 99).|
             *     |DI|Death Indicator found on data.|
             *     |DT|Data retrieval timeout (verify API only).|
             *     |DV|High device change velocity.|
             *     |FN|Family name found and used in matching.|
             *     |GL|Mobile Government Line.|
             *     |HR|High-rise; address contains apartment or building sub-units.|
             *     |HV|High velocity of change events associated with phone.|
             *     |IA|Inactive address.|
             *     |LA|Low Tenure Address.|
             *     |LP|Low Tenure Device.|
             *     |LS|Low Tenure SIM.|
             *     |LT|Low Tenure Mobile Identity.|
             *     |MA|Address in the request associated with multiple active addresses.|
             *     |MI|Military address.|
             *     |NA|Address is valid and has been normalized prior to calculating the match score.|
             *     |NC|Name & Address information is not available.|
             *     |ND|Network Status information is not available.|
             *     |NM|Not a mobile line type.|
             *     |NN|Nick name found and used in matching. For example Bill matches with William.|
             *     |NP|Non personal line.|
             *     |NS|Names were swapped (first/last).|
             *     |NU|Phone number has been updated.|
             *     |NV|Phone number not valid.|
             *     |OL|How long the identity has been associated to a phone number. Long Tenure > 90 days.|
             *     |OS|How long the identity has been associated to a phone number. Short Tenure between 8 and 90 days.|
             *     |OU|The date attributes associated to the phone number is not available. Ownership Tenure is Unknown.|
             *     |OV|How long the identity has been associated to a phone number. Very Short < 7 days.|
             *     |P3|Postal code submitted matched first 3 digits.|
             *     |P5|Postal code submitted matched first 5 digits.|
             *     |P9|Postal code submitted matched first 9 digits.|
             *     |PM|Address associated with a Private Mailbox operator (Ex. UPS Store).|
             *     |PN|Mobile Phone number is not active.|
             *     |PO|Address is a PO Box.|
             *     |PT|Phone Number is currently in a ported state.|
             *     |RA|Raw Address matched better than normalized Address.|
             *     |RL|Phone Number is associated with a high-risk linetype (Non-Fixed `VoIP` or Prepaid `MVNO`).|
             *     |RM|Matching used only Raw data.|
             *     |SA|Sub-account line.|
             *     |UV|Unable to verify address.|
             *     |VA|Address is vacant (unoccupied in the past 90 days).|
             *     More details see [link](http://docs.payfone.com/v1.0/reference#reason-codes)
             *
             * @example [
             *       "LP",
             *       "LS"
             *     ]
             */
            reasonCodes?: string[];
            /**
             * @description Whether a user identity is verified.
             * @example true
             */
            verified?: boolean;
            /**
             * @description The line type. It can be either ``Mobile``, ``Landline``, ``FixedVoIP`` or ``NonFixedVoIP``.
             * @example Mobile
             */
            lineType?: string;
        };
        /** @description The fields to be scoped. */
        Identity: {
            /**
             * @description The transaction ID provided in the API response must be logged by the Relying Party. The Relying Party is required to provide the transaction ID when contacting the Mastercard customer support team.
             * @example 970b1f6f-d46b-4435-487a-6e4357b25430
             */
            transactionId: string;
            scopedFields: {
                /**
                 * @description The user's first name.
                 * @example John
                 */
                firstName?: string;
                /**
                 * @description The user's last name.
                 * @example Doe
                 */
                lastName?: string;
                /**
                 * @description The user's date of birth (YYYYMMDD).
                 * @example 19810627
                 */
                dob?: string;
                /**
                 * @description The national identification number.
                 * @example 123456789
                 */
                nationalId?: string;
                /** @description The user's address. */
                address?: {
                    /**
                     * @description The user's address description.
                     * @example 123 Main St
                     */
                    address?: string;
                    /**
                     * @description The user's extended address.
                     * @example Apt. 202
                     */
                    extendedAddress?: string;
                    /**
                     * @description The user's city.
                     * @example San Francisco
                     */
                    city?: string;
                    /**
                     * @description The user's region.
                     * @example CA
                     */
                    region?: string;
                    /**
                     * @description The user's postal code.
                     * @example 94015
                     */
                    postalCode?: string;
                };
                /**
                 * @description The user's email address.
                 * @example abc@def.com
                 */
                emailAddress?: string;
            };
        };
        IdentityVerificationUserInfo: {
            /**
             * @description Country code (case insensitive) as described in the ISO 3166-1 alpha-2 international standard.
             * @example US
             */
            countryCode: string;
            /**
             * @description Should be true, validation exception will be thrown if it is false.
             * @example true
             */
            optedInConsentStatus: boolean;
            /**
             * @description The phone number being queried in standard international format. It should be prefixed with the international dialling code, without the '+'.
             * @example 19999999999
             */
            phoneNumber: string;
            /**
             * @description The user's date of birth format YYYY-MM-DD. One of either dob or last4ssn is required.
             * @example 1984-01-15
             */
            dob?: string;
            /**
             * @description The User's last four social security number digits. One of either dob or last4ssn is required. If the countryCode is US then, last4ssn or nationalId is required.
             * @example 1234
             */
            last4ssn?: string;
            /**
             * @description The national identification number. If the countryCode is US then, last4ssn or nationalId is required. If both nationalId and last4ssn are present then, use only the nationalId.
             * @example 123456789
             */
            nationalId?: string;
            /**
             * @description The user's first name.
             * @example John
             */
            firstName?: string;
            /**
             * @description The user's last name.
             * @example Doe
             */
            lastName?: string;
            /**
             * @description The user's address.
             * @example 123 Main St
             */
            address?: string;
            /**
             * @description The user's address complement.
             * @example Apt. 202
             */
            extendedAddress?: string;
            /**
             * @description The user's city.
             * @example San Francisco
             */
            city?: string;
            /**
             * @description The user's region.
             * @example CA
             */
            region?: string;
            /**
             * @description If address matching is desired at a minimum ``postalCode`` is required.
             * @example 94015
             */
            postalCode?: string;
            /**
             * @description The user's email address.
             * @example abc@def.com
             */
            emailAddress?: string;
        };
        IdentityPrefill: {
            /**
             * @description Country code (case insensitive) as described in the ISO 3166-1 alpha-2 international standard.
             * @example US
             */
            countryCode: string;
            /**
             * @description The phone number being queried in standard international format. It should be prefixed with the international dialling code, without the '+'.
             * @example 19999999999
             */
            phoneNumber: string;
            /**
             * @description The fields to be scoped.  At least one field in the array should be present.
             * @example [
             *       "firstName",
             *       "lastName",
             *       "emailAddress"
             *     ]
             */
            scopedFields: string[];
            /**
             * @description Should be true, validation exception will be thrown if it is false.
             * @example true
             */
            optedInConsentStatus: boolean;
            /**
             * @description Date of birth.
             * @example 1984-01-15
             */
            dob?: string;
            /**
             * @description The User's last four social security number digits. One of either dob or last4ssn is required. If the countryCode is US then, last4ssn or nationalId is required.
             * @example 1234
             */
            last4ssn?: string;
            /**
             * @description The national identification number. If the countryCode is US then, last4ssn or nationalId is required. If both nationalId and last4ssn are present then, use only the nationalId. If the countryCode is US then this field must be a numeric value that is 9 digits long.
             * @example 123456789
             */
            nationalId?: string;
            /**
             * @description If false will not perform an eligibility check.
             * @default true
             * @example true
             */
            performEligibilityCheck: boolean;
        };
        DeviceIpAddress: {
            /**
             * @description Country code (case insensitive) as described in the ISO 3166-1 alpha-2 international standard.
             * @example US
             */
            countryCode: string;
            /**
             * @description Should be true, validation exception will be thrown if it is false.
             * @example true
             */
            optedInConsentStatus: boolean;
            /**
             * @description Both IPv4 and IPv6 are supported.
             * @example 166.137.217.20
             */
            deviceIp: string;
        };
        DevicePhoneNumber: {
            /**
             * @description The transaction ID provided in the API response must be logged by the Relying Party. The Relying Party is required to provide the transaction ID when contacting the Mastercard customer support team.
             * @example 970b1f6f-d46b-4435-487a-6e4357b25430
             */
            transactionId: string;
            /**
             * @description The phone number of the originating phone, prefixed with the international dialling code, without the ``+``.
             * @example 19999999999
             */
            phoneNumber: string;
        };
        DeviceVerificationFingerprint: {
            /**
             * @description Country code (case insensitive) as described in the ISO 3166-1 alpha-2 international standard.
             * @example US
             */
            countryCode: string;
            /**
             * @description Retrieved by calling the `redirectTargetUrl`.
             * @example 4f544a6a596a4d304d3249745a4752684f5330304d3249794c5745324e7a41744d44646d5a5459314d57526a593245306644413d3a4e5af1cf7e052335e57a51f3e0b1362fa58d4c220d9adef9179895b4c4beda59
             */
            verificationFingerprint: string;
            /**
             * @description Should be true, validation exception will be thrown if it is false.
             * @example true
             */
            optedInConsentStatus: boolean;
        };
        ApiError: {
            Errors: components["schemas"]["Errors"];
        };
        /**
         * @description List of Errors.
         * @example {
         *       "value": {
         *         "Errors": {
         *           "Error": [
         *             {
         *               "Source": "mids",
         *               "ReasonCode": "USER_PROFILE_ID_NOT_FOUND",
         *               "Description": "The provided userProfileId does not exist.",
         *               "Recoverable": false
         *             }
         *           ]
         *         }
         *       }
         *     }
         */
        Errors: {
            Error: components["schemas"]["ErrorList"];
        };
        /** @description Error Details. */
        ErrorList: components["schemas"]["Error"][];
        Error: {
            /**
             * @description Source of where the error occured.
             * @example mids
             */
            Source?: string;
            /**
             * @description Code of the error.
             * @example USER_PROFILE_ID_NOT_FOUND
             */
            ReasonCode?: string;
            /**
             * @description The cause of the error
             * @example The provided userProfileId does not exist
             */
            Description?: string;
            /**
             * @description Indiciates if the error can be recovered from.
             * @example false
             */
            Recoverable?: boolean;
            /**
             * @description Contains information about the error.
             * @example IOException Occured
             */
            Details?: string;
        };
    };
    responses: {
        /** @description Request didn't match an existing resource. */
        NotFoundError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ApiError"];
            };
        };
        /** @description Something was wrong with the request. */
        BadRequestError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ApiError"];
            };
        };
        /** @description Unauthorized request. */
        UnauthorizedError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ApiError"];
            };
        };
        /** @description Consent not given. */
        ForbiddenError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ApiError"];
            };
        };
        /** @description Success. */
        DataExtractionSuccessResponse: {
            headers: {
                "X-Transaction-ID": components["headers"]["X-Transaction-ID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["DocumentVerificationExtractedData"];
            };
        };
        /** @description Success. */
        SmsOtpGenerationSuccessResponse: {
            headers: {
                "X-Transaction-ID": components["headers"]["X-Transaction-ID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Otp"];
            };
        };
        /** @description Success. */
        EmailOtpGenerationSuccessReponse: {
            headers: {
                "X-Transaction-ID": components["headers"]["X-Transaction-ID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Otp"];
            };
        };
        /** @description Success. */
        SmsOtpVerificationSuccessResponses: {
            headers: {
                "X-Transaction-ID": components["headers"]["X-Transaction-ID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["OtpVerificationResult"];
            };
        };
        /** @description Success. */
        EmailOtpVerificationResponses: {
            headers: {
                "X-Transaction-ID": components["headers"]["X-Transaction-ID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["OtpVerificationResult"];
            };
        };
        /** @description Success. */
        AccessTokenSuccessResponse: {
            headers: {
                "X-Transaction-ID": components["headers"]["X-Transaction-ID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["AccessToken"];
            };
        };
        /** @description Success */
        FacematchResult: {
            headers: {
                "X-Transaction-ID": components["headers"]["X-Transaction-ID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["FacematchSourceVerificationResult"];
            };
        };
        /** @description Success. */
        MedicareCardSourceVerificationResponse: {
            headers: {
                "X-Transaction-ID": components["headers"]["X-Transaction-ID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["MedicareCardSourceVerificationResult"];
            };
        };
        /** @description Success. */
        DriversLicenseSourceVerificationResponse: {
            headers: {
                "X-Transaction-ID": components["headers"]["X-Transaction-ID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["SourceVerificationResult"];
            };
        };
        /** @description Success. */
        PassportSourceVerificationResponse: {
            headers: {
                "X-Transaction-ID": components["headers"]["X-Transaction-ID"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["SourceVerificationResult"];
            };
        };
    };
    parameters: {
        /**
         * @description Country of issue for the document in the ISO 3166-1 alpha-3 format, only AUS is an acceptable value for this parameter.
         * @example AUS
         */
        IssuingCountryParameter: string;
        /**
         * @description UUID returned to the application/webpage on completion of the users interactions with the ID-V SDK.
         * @example 5226539e-78e7-45ac-a924-072d1301c24c
         */
        ScanIdParameter: string;
        /**
         * @description The value which best reflects the input of the User with regard to Consent to use their data (ACCEPT, DECLINE, REVOKE, EXPIRE).
         * @example ACCEPT
         */
        UserConsentParameter: string;
        /**
         * @description Flag indicating if the selfie needs to be retrieved.
         * @example true
         */
        RetrieveSelfieParameter: string;
        /**
         * @description Flag indicating if the document images needs to be retrieved.
         * @example true
         */
        RetrieveDocumentImagesParameter: string;
        /**
         * @description Flag indicating if the facemap needs to be retrieved.
         * @example true
         */
        RetrieveFacemapParameter: string;
        /**
         * @description The type of document scanned (DRIVING_LICENSE, PASSPORT, ID_CARD).
         * @example DRIVING_LICENSE
         */
        DocumentTypeParameter: string;
        /**
         * @description The ISO 3166-1 alpha3 code which corresponds to the country from where the request to ID is originating from.
         * @example USA
         */
        CountryParameter: string;
        /**
         * @description worklflow definition parameter
         * @example DOCUMENT_EXTRACTION_FACEMATCH_LIVENESS
         */
        WorkflowDefinitionParameter: string | null;
        /**
         * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
         * @example true
         */
        EncryptedPayloadParameter: boolean;
    };
    requestBodies: {
        SmsOtpGenerationRequest: {
            content: {
                "application/json": components["schemas"]["SMSOtp"];
            };
        };
        EmailOtpGenerationRequest: {
            content: {
                "application/json": components["schemas"]["EmailOtp"];
            };
        };
        SmsOtpVerificationRequest: {
            content: {
                "application/json": components["schemas"]["OtpVerification"];
            };
        };
        EmailOtpVerficationRequest: {
            content: {
                "application/json": components["schemas"]["OtpVerification"];
            };
        };
        AccessTokenRequest: {
            content: {
                "application/json": components["schemas"]["RetrieveAccessToken"];
            };
        };
        MedicareCardSourceVerificationRequest: {
            content: {
                "application/json": components["schemas"]["MedicareCardSourceVerificationRequestAttributes"];
            };
        };
        PassportSourceVerificationRequest: {
            content: {
                "application/json": components["schemas"]["PassportSourceVerificationRequestAttributes"];
            };
        };
        DriversLicenseSourceVerificationRequest: {
            content: {
                "application/json": components["schemas"]["DriversLicenseSourceVerificationRequestAttributes"];
            };
        };
        SelfieVerificationRequest: {
            content: {
                "application/json": components["schemas"]["SelfieVerificationRequest"];
            };
        };
    };
    headers: {
        "X-Transaction-ID": string;
    };
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    retrieveDataExtractionAccessToken: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
                 * @example true
                 */
                "X-Encrypted-Payload"?: components["parameters"]["EncryptedPayloadParameter"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AccessTokenRequest"];
        responses: {
            200: components["responses"]["AccessTokenSuccessResponse"];
            400: components["responses"]["BadRequestError"];
        };
    };
    facematchVerification: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
                 * @example true
                 */
                "X-Encrypted-Payload"?: components["parameters"]["EncryptedPayloadParameter"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: components["requestBodies"]["SelfieVerificationRequest"];
        responses: {
            200: components["responses"]["FacematchResult"];
            400: components["responses"]["BadRequestError"];
            403: components["responses"]["ForbiddenError"];
        };
    };
    sendSmsOtp: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
                 * @example true
                 */
                "X-Encrypted-Payload"?: components["parameters"]["EncryptedPayloadParameter"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["SmsOtpGenerationRequest"];
        responses: {
            200: components["responses"]["SmsOtpGenerationSuccessResponse"];
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["UnauthorizedError"];
            403: components["responses"]["ForbiddenError"];
        };
    };
    sendEmailOtp: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
                 * @example true
                 */
                "X-Encrypted-Payload"?: components["parameters"]["EncryptedPayloadParameter"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["EmailOtpGenerationRequest"];
        responses: {
            200: components["responses"]["EmailOtpGenerationSuccessReponse"];
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["UnauthorizedError"];
            403: components["responses"]["ForbiddenError"];
        };
    };
    verifySmsOtp: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
                 * @example true
                 */
                "X-Encrypted-Payload"?: components["parameters"]["EncryptedPayloadParameter"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["SmsOtpVerificationRequest"];
        responses: {
            200: components["responses"]["SmsOtpVerificationSuccessResponses"];
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["UnauthorizedError"];
            403: components["responses"]["ForbiddenError"];
        };
    };
    verifyEmailOtp: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
                 * @example true
                 */
                "X-Encrypted-Payload"?: components["parameters"]["EncryptedPayloadParameter"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["EmailOtpVerficationRequest"];
        responses: {
            200: components["responses"]["EmailOtpVerificationResponses"];
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["UnauthorizedError"];
            403: components["responses"]["ForbiddenError"];
        };
    };
    extractScannedDocumentData: {
        parameters: {
            query: {
                /**
                 * @description The value which best reflects the input of the User with regard to Consent to use their data (ACCEPT, DECLINE, REVOKE, EXPIRE).
                 * @example ACCEPT
                 */
                user_consent: components["parameters"]["UserConsentParameter"];
                /**
                 * @description Flag indicating if the selfie needs to be retrieved.
                 * @example true
                 */
                retrieve_selfie: components["parameters"]["RetrieveSelfieParameter"];
                /**
                 * @description Flag indicating if the document images needs to be retrieved.
                 * @example true
                 */
                retrieve_document_images: components["parameters"]["RetrieveDocumentImagesParameter"];
                /**
                 * @description Flag indicating if the facemap needs to be retrieved.
                 * @example true
                 */
                retrieve_facemap: components["parameters"]["RetrieveFacemapParameter"];
                /**
                 * @description The type of document scanned (DRIVING_LICENSE, PASSPORT, ID_CARD).
                 * @example DRIVING_LICENSE
                 */
                document_type?: components["parameters"]["DocumentTypeParameter"];
                /**
                 * @description The ISO 3166-1 alpha3 code which corresponds to the country from where the request to ID is originating from.
                 * @example USA
                 */
                user_selected_country?: components["parameters"]["CountryParameter"];
            };
            header?: {
                /**
                 * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
                 * @example true
                 */
                "X-Encrypted-Payload"?: components["parameters"]["EncryptedPayloadParameter"];
            };
            path: {
                /**
                 * @description UUID returned to the application/webpage on completion of the users interactions with the ID-V SDK.
                 * @example 5226539e-78e7-45ac-a924-072d1301c24c
                 */
                scan_id: components["parameters"]["ScanIdParameter"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["DataExtractionSuccessResponse"];
            400: components["responses"]["BadRequestError"];
            403: components["responses"]["ForbiddenError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    verifyMedicareCard: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
                 * @example true
                 */
                "X-Encrypted-Payload"?: components["parameters"]["EncryptedPayloadParameter"];
            };
            path: {
                /**
                 * @description Country of issue for the document in the ISO 3166-1 alpha-3 format, only AUS is an acceptable value for this parameter.
                 * @example AUS
                 */
                issuing_country: components["parameters"]["IssuingCountryParameter"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["MedicareCardSourceVerificationRequest"];
        responses: {
            200: components["responses"]["MedicareCardSourceVerificationResponse"];
            400: components["responses"]["BadRequestError"];
            403: components["responses"]["ForbiddenError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    verifyPassport: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
                 * @example true
                 */
                "X-Encrypted-Payload"?: components["parameters"]["EncryptedPayloadParameter"];
            };
            path: {
                /**
                 * @description Country of issue for the document in the ISO 3166-1 alpha-3 format, only AUS is an acceptable value for this parameter.
                 * @example AUS
                 */
                issuing_country: components["parameters"]["IssuingCountryParameter"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["PassportSourceVerificationRequest"];
        responses: {
            200: components["responses"]["PassportSourceVerificationResponse"];
            400: components["responses"]["BadRequestError"];
            403: components["responses"]["ForbiddenError"];
        };
    };
    verifyDriversLicense: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Whether the request payload is encrypted with the Encyption Key generated from the Developer Zone Portal.
                 * @example true
                 */
                "X-Encrypted-Payload"?: components["parameters"]["EncryptedPayloadParameter"];
            };
            path: {
                /**
                 * @description Country of issue for the document in the ISO 3166-1 alpha-3 format, only AUS is an acceptable value for this parameter.
                 * @example AUS
                 */
                issuing_country: components["parameters"]["IssuingCountryParameter"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["DriversLicenseSourceVerificationRequest"];
        responses: {
            200: components["responses"]["DriversLicenseSourceVerificationResponse"];
            400: components["responses"]["BadRequestError"];
            403: components["responses"]["ForbiddenError"];
        };
    };
}

export type AccessToken = components["schemas"]["AccessToken"];
export type BodyDriversLicenseSourceVerificationRequestAttributes = DriversLicenseSourceVerificationRequestAttributes;
export type BodyEmailOtp = EmailOtp;
export type BodyMedicareCardSourceVerificationRequestAttributes = MedicareCardSourceVerificationRequestAttributes;
export type BodyOtpVerification = OtpVerification;
export type BodyPassportSourceVerificationRequestAttributes = PassportSourceVerificationRequestAttributes;
export type BodyRetrieveAccessToken = RetrieveAccessToken;
export type BodySMSOtp = SMSOtp;
export type BodySelfieVerificationRequest = SelfieVerificationRequest;
export type DocumentVerificationExtractedData = components["schemas"]["DocumentVerificationExtractedData"];
export type DriversLicenseSourceVerificationRequestAttributes = components["schemas"]["DriversLicenseSourceVerificationRequestAttributes"];
export type EmailOtp = components["schemas"]["EmailOtp"];
export type ExtractScannedDocumentData = NonNullable<operations["extractScannedDocumentData"]["parameters"]["header"]>;
export type FacematchSourceVerificationResult = components["schemas"]["FacematchSourceVerificationResult"];
export type FacematchVerification = NonNullable<operations["facematchVerification"]["parameters"]["header"]>;
export type HeadersExtractScannedDocumentData = ExtractScannedDocumentData;
export type HeadersFacematchVerification = FacematchVerification;
export type HeadersRetrieveDataExtractionAccessToken = RetrieveDataExtractionAccessToken;
export type HeadersSendEmailOtp = SendEmailOtp;
export type HeadersSendSmsOtp = SendSmsOtp;
export type HeadersVerifyDriversLicense = VerifyDriversLicense;
export type HeadersVerifyEmailOtp = VerifyEmailOtp;
export type HeadersVerifyMedicareCard = VerifyMedicareCard;
export type HeadersVerifyPassport = VerifyPassport;
export type HeadersVerifySmsOtp = VerifySmsOtp;
export type MedicareCardSourceVerificationRequestAttributes = components["schemas"]["MedicareCardSourceVerificationRequestAttributes"];
export type MedicareCardSourceVerificationResult = components["schemas"]["MedicareCardSourceVerificationResult"];
export type Otp = components["schemas"]["Otp"];
export type OtpVerification = components["schemas"]["OtpVerification"];
export type OtpVerificationResult = components["schemas"]["OtpVerificationResult"];
export type PassportSourceVerificationRequestAttributes = components["schemas"]["PassportSourceVerificationRequestAttributes"];
export type QueryExtractScannedDocumentData = ExtractScannedDocumentData;
export type ResponseAccessToken = AccessToken;
export type ResponseDocumentVerificationExtractedData = DocumentVerificationExtractedData;
export type ResponseFacematchSourceVerificationResult = FacematchSourceVerificationResult;
export type ResponseMedicareCardSourceVerificationResult = MedicareCardSourceVerificationResult;
export type ResponseOtp = Otp;
export type ResponseOtpVerificationResult = OtpVerificationResult;
export type ResponseSourceVerificationResult = SourceVerificationResult;
export type RetrieveAccessToken = components["schemas"]["RetrieveAccessToken"];
export type RetrieveDataExtractionAccessToken = NonNullable<operations["retrieveDataExtractionAccessToken"]["parameters"]["header"]>;
export type SMSOtp = components["schemas"]["SMSOtp"];
export type SelfieVerificationRequest = components["schemas"]["SelfieVerificationRequest"];
export type SendEmailOtp = NonNullable<operations["sendEmailOtp"]["parameters"]["header"]>;
export type SendSmsOtp = NonNullable<operations["sendSmsOtp"]["parameters"]["header"]>;
export type SourceVerificationResult = components["schemas"]["SourceVerificationResult"];
export type VerifyDriversLicense = NonNullable<operations["verifyDriversLicense"]["parameters"]["header"]>;
export type VerifyEmailOtp = NonNullable<operations["verifyEmailOtp"]["parameters"]["header"]>;
export type VerifyMedicareCard = NonNullable<operations["verifyMedicareCard"]["parameters"]["header"]>;
export type VerifyPassport = NonNullable<operations["verifyPassport"]["parameters"]["header"]>;
export type VerifySmsOtp = NonNullable<operations["verifySmsOtp"]["parameters"]["header"]>;

//API Def

import { Api } from "api-def";

const API = new Api({
  name: "Id Verification API",
  baseUrl: "https://api.mastercard.com.au/idverify",
  mutable: true,
});

export const retrieveDataExtractionAccessToken = API.endpoint()
  .responseOf<ResponseAccessToken>()
  .bodyOf<BodyRetrieveAccessToken>()
  .requestHeadersOf<HeadersRetrieveDataExtractionAccessToken>()
  .build({
    method: "post",
    path: "/data-extractions/access-tokens",
    id: "retrieveDataExtractionAccessToken",
  });

export const facematchVerification = API.endpoint()
  .responseOf<ResponseFacematchSourceVerificationResult>()
  .bodyOf<BodySelfieVerificationRequest>()
  .requestHeadersOf<HeadersFacematchVerification>()
  .build({
    method: "post",
    path: "/data-extractions/facematch",
    id: "facematchVerification",
  });

export const sendSmsOtp = API.endpoint()
  .responseOf<ResponseOtp>()
  .bodyOf<BodySMSOtp>()
  .requestHeadersOf<HeadersSendSmsOtp>()
  .build({
    method: "post",
    path: "/sms-otps",
    id: "sendSmsOtp",
  });

export const sendEmailOtp = API.endpoint()
  .responseOf<ResponseOtp>()
  .bodyOf<BodyEmailOtp>()
  .requestHeadersOf<HeadersSendEmailOtp>()
  .build({
    method: "post",
    path: "/email-otps",
    id: "sendEmailOtp",
  });

export const verifySmsOtp = API.endpoint()
  .responseOf<ResponseOtpVerificationResult>()
  .bodyOf<BodyOtpVerification>()
  .requestHeadersOf<HeadersVerifySmsOtp>()
  .build({
    method: "post",
    path: "/sms-otp-verifications",
    id: "verifySmsOtp",
  });

export const verifyEmailOtp = API.endpoint()
  .responseOf<ResponseOtpVerificationResult>()
  .bodyOf<BodyOtpVerification>()
  .requestHeadersOf<HeadersVerifyEmailOtp>()
  .build({
    method: "post",
    path: "/email-otp-verifications",
    id: "verifyEmailOtp",
  });

export const extractScannedDocumentData = API.endpoint()
  .paramsOf<"scan_id">()
  .responseOf<ResponseDocumentVerificationExtractedData>()
  .queryOf<QueryExtractScannedDocumentData>()
  .requestHeadersOf<HeadersExtractScannedDocumentData>()
  .build({
    method: "get",
    path: "/data-extractions/scans/{scan_id}",
    id: "extractScannedDocumentData",
  });

export const verifyMedicareCard = API.endpoint()
  .paramsOf<"issuing_country">()
  .responseOf<ResponseMedicareCardSourceVerificationResult>()
  .bodyOf<BodyMedicareCardSourceVerificationRequestAttributes>()
  .requestHeadersOf<HeadersVerifyMedicareCard>()
  .build({
    method: "post",
    path: "/source-verifications/{issuing_country}/medicare-cards",
    id: "verifyMedicareCard",
  });

export const verifyPassport = API.endpoint()
  .paramsOf<"issuing_country">()
  .responseOf<ResponseSourceVerificationResult>()
  .bodyOf<BodyPassportSourceVerificationRequestAttributes>()
  .requestHeadersOf<HeadersVerifyPassport>()
  .build({
    method: "post",
    path: "/source-verifications/{issuing_country}/passports",
    id: "verifyPassport",
  });

export const verifyDriversLicense = API.endpoint()
  .paramsOf<"issuing_country">()
  .responseOf<ResponseSourceVerificationResult>()
  .bodyOf<BodyDriversLicenseSourceVerificationRequestAttributes>()
  .requestHeadersOf<HeadersVerifyDriversLicense>()
  .build({
    method: "post",
    path: "/source-verifications/{issuing_country}/driving-licenses",
    id: "verifyDriversLicense",
  });

export default API;