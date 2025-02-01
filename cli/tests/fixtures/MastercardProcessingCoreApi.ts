// Type Defs

export interface paths {
    "/clients": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Creates a client
         * @description Operation name: `createClient`
         *
         *     Operation is used to create a client.
         *     Client creation is the first step in the onboarding of the Issuer's customers into MP's CMS.
         *
         *     Upon successful client creation, a unique client identifier is returned.
         *     The Issuer shall create a client before they request for an account contract creation (`POST /accounts`) or a card contract creation (`POST /cards`).
         *
         */
        post: operations["createClient"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/{client_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves a client
         * @description Operation name: `getClient`
         *
         *     Operation is used to retrieve information about the specified client, existing in the MP's CMS.
         *
         */
        get: operations["getClient"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Updates a client
         * @description Operation name: `updateClient`
         *
         *     Operation is used to update client data in the MP's CMS.
         *     The method has been implemented as [JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7386), but not all field values can be cleared.
         *     Fields which can be cleared are listed below:
         *       * `client.additionalDate01`
         *       * `client.additionalDate02`
         *       * `client.clientBaseAddressData.state`
         *       * `client.clientBaseAddressData.city`
         *       * `client.clientBaseAddressData.postalCode`
         *       * `client.clientBaseAddressData.addressLine1`
         *       * `client.clientBaseAddressData.addressLine2`
         *       * `client.clientBaseAddressData.addressLine3`
         *       * `client.clientBaseAddressData.addressLine4`
         *       * `client.clientBaseAddressData.country`
         *       * `client.clientCompanyData.companyName`
         *       * `client.clientCompanyData.companyTradeName`
         *       * `client.clientCompanyData.companyDepartment`
         *       * `client.clientCompanyData.position`
         *       * `client.clientContactData.phoneNumberHome`
         *       * `client.clientContactData.phoneNumberMobile`
         *       * `client.clientContactData.phoneNumberWork`
         *       * `client.clientContactData.faxHome`
         *       * `client.clientContactData.fax`
         *       * `client.clientContactData.email`
         *       * `client.clientExpiryDate`
         *       * `client.clientIdentificationData.taxPosition`
         *       * `client.clientIdentificationData.taxpayerIdentifier`
         *       * `client.clientIdentificationData.identificationDocumentType`
         *       * `client.clientIdentificationData.identificationDocumentNumber`
         *       * `client.clientIdentificationData.identificationDocumentDetails`
         *       * `client.clientIdentificationData.socialNumber`
         *       * `client.clientPersonalData.language`
         *       * `client.clientPersonalData.maritalStatus`
         *       * `client.clientPersonalData.title`
         *       * `client.clientPersonalData.shortName`
         *       * `client.clientPersonalData.suffix`
         *       * `client.clientPersonalData.gender`
         *       * `client.clientPersonalData.firstName`
         *       * `client.clientPersonalData.middleName`
         *       * `client.clientPersonalData.lastName`
         *       * `client.clientPersonalData.birthDate`
         *       * `client.clientPersonalData.birthPlace`
         *       * `client.clientPersonalData.birthName`
         *       * `client.clientPersonalData.citizenship`
         *       * `client.clientPersonalData.secretPhrase`
         *       * `client.embossedData.title`
         *       * `client.embossedData.firstName`
         *       * `client.embossedData.lastName`
         *       * `client.embossedData.companyName`
         *
         */
        patch: operations["updateClient"];
        trace?: never;
    };
    "/clients/{client_id}/account-contracts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves a list of account contracts for a specified client
         * @description Operation name: `getAccountContractsByClient`
         *
         *     Operation is used to retrieve a list of account contracts for a specified client.
         *
         */
        get: operations["getAccountContractsByClient"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/{client_id}/card-contracts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves a list of card contracts for a specified client
         * @description Operation name: `getCardContractsByClient`
         *
         *     Operation is used to retrieve a list of card contracts for a specified client.
         *
         *     Additional filtering can be applied:
         *       * **Card contract opening date** - to retrieve cards created after defined date
         *       * **Card contract status** - to retrieve cards with specified statuses only
         *
         */
        get: operations["getCardContractsByClient"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Opens an event for a specified contract (account contract or card contract)
         * @description Operation name: `openEvent`
         *
         *     Operation is used to open event for a specified contract (**account contract** or **card contract**).
         *
         */
        post: operations["openEvent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/financials": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves contract's (account contract's or card contract's) financial information
         * @description Operation name: `getContractFinancials`
         *
         *     Operation is used to retrieve financial information for the contract (**account contract** or **card contract**).
         *
         */
        get: operations["getContractFinancials"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/balances": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves information about balances for a specified contract (account contract or card contract)
         * @description Operation name: `getContractBalances`
         *
         *     Operation is used to retrieve information about chosen contract balances. Operation can be used for (**account contract** or **card contract**).
         *
         *     The response will return information about specified balances.
         *
         *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
         *
         *     Available balances in the standard product:
         *     | `balanceCode` 	| **Description**                                                                                                     	| **Product applicability** 	|
         *     |---------------	|---------------------------------------------------------------------------------------------------------------------	|---------------------------	|
         *     | AVAILABLE     	| Balance type reflecting contract's amount available                                                                 	| Credit, Prepaid           	|
         *     | BLOCKED       	| Balance type reflecting amounts blocked after authorization                                                         	| Credit, Prepaid           	|
         *     | CR_LIMIT      	| Balance type reflecting contract's credit limit and additional authorization limit                                  	| Credit                    	|
         *     | DEPOSIT       	| Balance type reflecting a cardholder current balance                                                                	| Prepaid                   	|
         *     | DUE           	| Balance type calculated in latest cycle as cardholder due amount                                                    	| Credit                    	|
         *     | OUT_BALANCE   	| Outstanding balance                                                                                                 	| Prepaid                   	|
         *     | OVL           	| Balance type reflecting the difference between a contract's balance (`TOTAL_BALANCE`) and credit limit (`CR_LIMIT`) 	| Credit                    	|
         *     | PAST_DUE      	| Sum of all overdue balances (from OVD_1 up to OVD_6)                                                                	| Credit                    	|
         *     | STMT_BALANCE  	| Balance type calculated at end of cycle                                                                             	| Credit                    	|
         *     | TOTAL_BALANCE 	| Balance type reflecting contract's balance including balances of liability subcontracts                             	| Credit, Prepaid           	|
         *     | TOTAL_DUE     	| SUM of `DUE` and `PAST_DUE` balances. This is the amount presented in the Statement as Minimum to Pay               	| Credit                    	|
         *
         */
        get: operations["getContractBalances"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/technical-accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves information about technical accounts for a specified contract (account contract or card contract)
         * @description Operation name: `getTechnicalAccounts`
         *
         *     Operation is used to retrieve information about technical accounts configured for the contract (**account contract** or **card contract**).
         *
         *     Additional filtering can be applied:
         *       * **Technical account code** - to retrieve only selected technical account
         *
         *     Notes:
         *       * If a technical account code is not provided response will contain all technical accounts.
         *       * Technical accounts are created for the contract during 1st transfer of funds from or to a given technical account.
         *        Hence, right after contract creation response will not contain all possible technical accounts for the contract.
         *
         */
        get: operations["getTechnicalAccounts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/tree-summaries": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves summary of the contracts for a specified contract (account contract or card contract)
         * @description Operation name: `getContractTreeSummary`
         *
         *     Operation is used to retrieve summary of the contracts from the tree structure created in the MP's CMS for the specified contract (**account contract** or **card contract**).
         *
         *     The operation returns a summary of the contracts created under the specified contract and upper-level contracts from the tree structure created in the CMS. For example, if there is one account contract (top account contract) with one subaccount under which 3 card contracts have been created, then:
         *     * if the operation is used to retrieve tree summary for the top account contract then API returns 5 contracts (top account contract, subaccount contract and all 3 card contracts)
         *     * if the operation is used to retrieve tree summary for one of the card contracts then API returns 3 contracts (top account contract, subaccount contract and 1 card contract specified in the request)
         *
         */
        get: operations["getContractTreeSummary"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Creates an account contract
         * @description Operation name: `createAccountContract`
         *
         *     Operation is used to create an account contract.
         *
         *     Different types of account contracts can be created:
         *     * top or sub
         *     * prepaid, debit or credit
         *     * with liability or without liability
         *
         *     To create a top account contract, the Issuer must specify the `clientId` and leave the `parentAccountContractId` empty.
         *
         *     To create a subaccount contract, the Issuer must leave the `clientId` empty and specify the `parentAccountContractId`.
         *
         *     To create a credit account contract, the Issuer must specify the `creditData`.
         *
         *     To create an account contract with liability link to another account contract, the Issuer must fill in the `liabilityContract`.
         *
         *     Upon successful account contract creation, a unique `accountContractId` is returned. The identifier must be used later on in a card contract creation request (`POST /cards`).
         *
         */
        post: operations["createAccountContract"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{account_contract_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves an account contract
         * @description Operation name: `getAccountContract`
         *
         *     Operation is used to retrieve information about the specified account contract.
         *
         */
        get: operations["getAccountContract"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Updates an account contract
         * @description Operation name: `updateAccountContract`
         *
         *     Operation is used to update an account contract data.
         *
         *     The method has been implemented as [JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7386), but not all field values can be cleared.
         *
         *     Fields which can be cleared are listed below:
         *
         *     * `accountContractName`
         *
         *     * `cbsNumber`
         *
         */
        patch: operations["updateAccountContract"];
        trace?: never;
    };
    "/accounts/{account_contract_id}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Changes an account contract status
         * @description Operation name: `changeAccountContractStatus`
         *
         *     Operation is used to change an account contract status.
         *
         *     Change is possible according to configured priorities of account contract statuses. Change to status with lower priority is not possible. For example `Account closed` has higher priority than `Account OK` and changing from `Account closed` to `Account OK` is not possible.
         *
         */
        put: operations["changeAccountContractStatus"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{account_contract_id}/statuses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves account contract status.
         * @description Operation name: `getAccountContractStatus`
         *
         *     Operation is used to retrieve an account contract status detailed information.
         *
         */
        get: operations["getAccountContractStatus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{account_contract_id}/client-identifier": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Relinks an account contract to another client
         * @description Operation name: `changeAccountContractClient`
         *
         *     Operation is used to associate the account contract with a different client object.
         *
         *     The Issuer can choose the mode for changing a client for a contract tree:
         *       * **ALL** – the client will be changed for the entire account contract tree
         *       * **THIS** – the client will be changed only for the specified account contract
         *       * **DOWN** – the client will be changed for all contracts (including cards) in the hierarchy that are under the account contract.
         *
         */
        put: operations["changeAccountContractClient"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/main-contract": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Relinks a subaccount or card contract to another account contract
         * @description Operation name: `changeContractMainContract`
         *
         *     Operation is used to associate the subaccount or card contract with a different parent account contract. Optionally operation allows to also associate contract with a different client.
         *
         */
        put: operations["changeContractMainContract"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{account_contract_id}/sub-accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves a list of subaccount contracts for a specified account contract.
         * @description Operation name: `getSubAccountContracts`
         *
         *     Operation is used to retrieve a list of subaccounts for a specified account contract. The list contains basic information about subaccount contracts.
         *
         */
        get: operations["getSubAccountContracts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{account_contract_id}/card-contracts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves a list of card contracts for a specified account contract
         * @description Operation name: `getCardContractsByAccount`
         *
         *     Operation is used to retrieve card contracts for specified account contract.
         *
         *     Additional filtering can be applied:
         *       * **Card creation date** - to retrieve cards open date greater or equal than passed date
         *       * **Card statuses** - to retrieve cards with selected statuses only
         *
         */
        get: operations["getCardContractsByAccount"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Creates a card contract
         * @description Operation name: `createCardContract`
         *
         *     Operation is used to create a card contract.
         *
         *     Card contract creation is the final step in the Issuer's onboarding into MP's CMS.
         *     To create a card contract, the Issuer must specify the `accountContractId`. If the `clientId` is not provided, MP's CMS will assign the same Client as the account contract owner.
         *
         *     Upon successful card contract creation, a unique card contract identifier is returned.
         *
         */
        post: operations["createCardContract"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves a card contract
         * @description Operation name: `getCardContract`
         *
         *     Operation is used to retrieve details of a given card contract.
         *
         */
        get: operations["getCardContract"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Updates a card contract
         * @description Operation name: `updateCardContract`
         *
         *     Operation is used to update a card data.
         *     The method has been implemented as [JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7386), but not all field values can be cleared.
         *     Fields which can be cleared are listed below:
         *       * `cardContractName`
         *       * `cbsNumber`
         *       * `embossedData.title`
         *       * `embossedData.firstName`
         *       * `embossedData.lastName`
         *       * `embossedData.companyName`
         *
         */
        patch: operations["updateCardContract"];
        trace?: never;
    };
    "/cards/details-verifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verifies card details
         * @description Operation name: `verifyCardDetails`
         *
         *     Operation is used to verify card details.
         *
         */
        post: operations["verifyCardDetails"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set new status for the card contract
         * @description Operation name: `changeCardContractStatus`
         *
         *     Operation is used to change the card contract status.
         *
         *     In the MP's CMS, the Issuer can set either a temporary status (which can be reversed) or a permanent one (without the possibility to change it afterwards). The change is possible according to the configured priorities of card contract statuses. A change to a status with lower priority is not possible.
         *
         */
        put: operations["changeCardContractStatus"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/statuses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves card contract status.
         * @description Operation name: `getCardContractStatus`
         *
         *     Operation is used to retrieve card status detailed information.
         *
         */
        get: operations["getCardContractStatus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/client-identifier": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Relinks a card contract to another client
         * @description Operation name: `changeCardContractClient`
         *
         *     Operation is used to associate the card contract with a different client (change of client - cardholder).
         *
         */
        put: operations["changeCardContractClient"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/main-contract": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Relinks a card contract to another account contract
         * @description Operation name: `changeCardContractMainContract`
         *
         *     Operation is used to associate the card contract with a different account contract.
         *
         */
        put: operations["changeCardContractMainContract"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/online-pin-attempts-counter": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Resets Online PIN Try Counter
         * @description Operation name: `clearOnlinePinAttempts`
         *
         *     Operation is used to reset Online PIN Try Counter for a specified card contract.
         *
         */
        put: operations["clearOnlinePinAttempts"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/{client_id}/online-pin-attempts-counter": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Resets Online PIN Try Counter
         * @description Operation name: `clearOnlinePinAttemptsForClient`
         *
         *     Operation is used to reset Online PIN Try Counter for a specified client.
         *
         */
        put: operations["clearOnlinePinAttemptsForClient"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/active": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Activates a card plastic and unlocks the card for transaction use.
         * @description Operation name: `activateCard`
         *
         *     Operation is used to activate a card plastic for transaction use.
         *     When a new card contract is created, usually a card plastic is produced with the status `Locked` to prevent the card from unauthorized transactions.
         *     If the card plastic status is `Locked`, the cardholder is not able to perform any transactions as they will be rejected.
         *     Plastic activation unlocks the plastic and allows the cardholder to use it in POS, e-commerce, ATM, etc.
         *
         */
        put: operations["activateCard"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/pin": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Sets up new PIN for a card plastic
         * @description Operation name: `setPin`
         *
         *     Operation is used to set PIN for a card plastic. The card must have a PIN defined before a physical card is produced.
         *     MP's CMS does not validate the old PIN.
         *
         *     The Issuer is not allowed to send PIN value in clear text, instead, a PIN block shall be sent. Additionally, the PIN block must be encrypted.
         *
         *     The following encryption options are allowed:
         *       * **Symmetric** - a PIN block is secured with a ZPK (Zone Pin Key, exchanged with MP during the onboarding process).
         *
         *           When the ZPK encryption is used, the PIN block must be in ISO format 0.
         *       * **Asymmetric** - a PIN block is secured with a public RSA key received from MP's CMS in `GET /public-keys` response (API operation: `getPublicRsaKey`).
         *
         *           When the public RSA key encryption is used, the PIN block may be in ISO format 0 or format 1 (depending on the MP API configuration). In such case, the PIN block length is up to 2048 characters. A permitted value format is an ASCII/UTF-8 string of characters 0-9,A-F (ASN.1 DER cryptogram hex unpacked to string).
         *
         *     Note: Apart from the above encryption (symmetric or asymmetric) payload JWE encryption is used.
         *
         *     PIN block ISO formats usage:
         *       * **ISO-0 format** is used when full `cardContractNumber`(PAN) is known to the Issuer (usually for PCI-compliant Issuers).
         *       * **ISO-1 format** is used when full `cardContractNumber`(PAN) is not known to the Issuer (usually for non-PCI-compliant Issuers).
         *
         */
        put: operations["setPin"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/pins/searches": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Retrieves a PIN for a card plastic
         * @description Operation name: `getPin`
         *
         *     Operation is used to retrieve from MP's CMS the PIN defined for given card plastic (in the CMS card plastic exists also for a virtual card - card plastic is not always a physical card).
         *
         *     Note: If there is more than one card plastic with the same value of expiry date then the CMS system retrieves the PIN from the plastic which is currently treated as active by the CMS system.
         *
         *     The PIN is always retrieved in a secured way - asymmetric encryption is used. MP will encrypt the PIN returned in the response with public RSA key passed in request message in the `Customer-Public-Rsa-Key` header.
         *     The Public RSA key will be generated by the Issuer and the Issuer will have a matching private key that can be used to decrypt the PIN value.
         *
         *     Note: Apart from above symmetric encryption payload JWE encryption is used.
         *
         */
        post: operations["getPin"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/pins/verifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verifies a PIN
         * @description Operation name: `verifyPin`
         *
         *     Operation is used to verify the PIN for specified card plastic (in the CMS card plastic exists also for a virtual card - card plastic is not always a physical card).
         *
         *     The Issuer is not allowed to send the PIN value in clear text, instead, PIN block shall be sent. Additionally, the PIN block must be encrypted.
         *
         *     The following encryption options are allowed:
         *       * **Symmetric** - the PIN block secured with ZPK (Zone Pin Key, exchanged with MP).
         *         When ZPK encryption is used, the PIN block must be in ISO format 0.
         *       * **Asymmetric** - the PIN block secured with public RSA key received from MP's CMS in `GET /public-keys` response (API operation: `getPublicRsaKey`).
         *         When public RSA key encryption is used, the PIN block may be in ISO format 0 or format 1 (depending on MP API configuration).
         *         In such case, PIN block length is up to 2048 characters. ASCII/UTF-8 string of characters 0-9,A-F (ASN.1 DER cryptogram hex unpacked to string).
         *
         *       Note: Apart from the above encryption (symmetric or asymmetric) payload JWE encryption is used.
         *
         *     PIN block ISO formats usage:
         *       * **ISO-0** format is used when full `cardContractNumber`(PAN) is known to the Issuer (usually for PCI-compliant Issuers).
         *       * **ISO-1** format is used when full `cardContractNumber`(PAN) is not known to the Issuer (usually for non-PCI-compliant Issuers).
         *
         *     The verification result is returned in response.
         *
         *     Note: If there is more than one card plastic with the same value of expiry date then the CMS system will verify provided PIN with the PIN from the
         *     plastic currently treated as active by the CMS system.
         *
         */
        post: operations["verifyPin"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/card-verification-codes/searches": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Retrieves a CVC2 for a card plastic
         * @description Operation name: `getCvc`
         *
         *     Operation is used to retrieve a Card Verification Code (CVC2) for a given card plastic (card plastic exists also for a virtual card - is not always a physical card) from MP's CMS.
         *
         *       If there is no `cardContractId` matching the requested `expiryDate` HTTP 404 error with `INVALID_EXPIRY_DATE` `reasonCode` will be returned.
         *
         */
        post: operations["getCvc"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/card-verification-codes/verifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verifies a CVC2 of specific card plastic
         * @description Operation name: `verifyCvc`
         *
         *     Operation is used to verify a Card Verification Code 2 (CVC2) for specified card plastic (in the CMS card plastic exists also for a virtual card - card plastic is not always a physical card).
         *
         *     The verification result is returned in the response.
         *
         */
        post: operations["verifyCvc"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{card_contract_id}/plastics": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves information about all card plastics for a specified card contract
         * @description Operation name: `getCardPlastics`
         *
         *     Operation is used to retrieve information about all card plastics created under a specified card contract.
         *
         *     Each card plastic has a sequential number assigned. The card plastic number sequence starts with 1 and is increased by 1 for each reissued card, whenever a new card plastic is created under the same card contract.
         *
         */
        get: operations["getCardPlastics"];
        put?: never;
        /**
         * Reissues a card
         * @description Operation name: `reissueCard`
         *
         *     Operation is used to create a new card plastic object for a given card contract. By triggering the operation, the Issuer may execute the following cases:
         *       * issue a physical card for a virtual card
         *       * reissue an existing card (duplicate physical card, e.g. due to damage, ...)
         *       * renew an existing card
         *       * replace an existing card
         *
         *     In each case, a new card plastic object is created for a given card contract and the card plastic sequential number for the new object is incremented by 1.
         *
         *     Note: `newCardContractNumber` is not used when:
         *       * `reissueType` defines that a new card contract is not created (only a new `Plastic` is created under the same card contract)
         *       * `reissueType` defines that a card contract will be replaced with a PIN inheritance (the MP's CMS generates `newCardContractNumber` in this case)
         *
         */
        post: operations["reissueCard"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/{client_id}/addresses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves a list of addresses for the client
         * @description Operation name: `getClientAddresses`
         *
         *     Operation is used to retrieve a list of additional addresses assigned to the specified client object.
         *
         */
        get: operations["getClientAddresses"];
        put?: never;
        /**
         * Creates an address for a client
         * @description Operation name: `addClientAddress`
         *
         *     Operation is used to add an additional address for a specified client object.
         *
         *     MP's CMS allows to store many additional addresses related to the client. Each address type which will be added must be predefined in the CMS system.
         *
         *     The additional address can be used to store for example:
         *       * statement delivery address.
         *       * PIN mailer delivery address.
         *
         */
        post: operations["addClientAddress"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/{client_id}/addresses/{address_type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Updates an address of a selected type for the client
         * @description Operation name: `updateClientAddress`
         *
         *     Operation is used to update the additional address for a specified client object.
         *
         */
        put: operations["updateClientAddress"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/addresses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves a list of addresses for the contract (account contract or card contract)
         * @description Operation name: `getContractAddresses`
         *
         *     Operation is used to retrieve a list of additional addresses assigned to the specified contract (**account contract** or **card contract**).
         *
         */
        get: operations["getContractAddresses"];
        put?: never;
        /**
         * Creates an address for the contract (account contract or card contract)
         * @description Operation name: `addContractAddress`
         *
         *     Operation is used to add an additional address for a specified contract (**account contract** or **card contract**).
         *
         *     MP's CMS allows to store many additional addresses related to the contract. Each address type which will be added must be predefined in the CMS system.
         *
         *     Additional address can be used to store for example:
         *       * statement delivery address.
         *       * PIN mailer delivery address
         *
         */
        post: operations["addContractAddress"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/addresses/{address_type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Updates an address of a selected type for the contract (account contract or card contract)
         * @description Operation name: `updateContractAddress`
         *
         *     Operation is used to update the additional address for a specified contract (**account contract** or **card contract**).
         *
         */
        put: operations["updateContractAddress"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/{client_id}/classifiers/{classifier_code}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Sets up a client classifier
         * @description Operation name: `setClientClassifier`
         *
         *     Operation is used to set client classifier value.
         *
         *     Classifiers are a mechanism for storing configuration parameters. Represent rules or restrictions allowing flexible configuration of business processes:
         *       * Classifiers make it possible to segment clients into groups depending on the current status of a client
         *       * Classifiers make it possible to set conditions for executing various actions, depending on the current status of a client
         *
         *     For example, a client classifier can be used to mark the client as a migrated client.
         *
         */
        put: operations["setClientClassifier"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/{client_id}/classifiers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves a client classifier
         * @description Operation name: `getClientClassifiers`
         *
         *     Operation is used to retrieve selected client classifiers values.
         *
         *     Available classifier in the standard product on the client level:
         *     | `classifierCode`  	| `classifierValue` ` 	| **Description**                                                                                                                                                                        	| **Product   applicability** 	|
         *     |--------------------	|---------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-----------------------------	|
         *     | GDPR_DATA_ERASE    	| N                   	| According to the GDPR the right to be forgotten, Issuer can flag appropriate Client in the Workbench. It would be the only channel how such request could be raised by the issuer. 	| Prepaid                     	|
         *     | GDPR_DATA_ERASE    	| Y                   	| According to the GDPR the right to be forgotten, Issuer can flag appropriate Client in the Workbench. It would be the only channel how such request could be raised by the issuer. 	| Prepaid                     	|
         *
         */
        get: operations["getClientClassifiers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/classifiers/{classifier_code}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Sets up a contract's (account contract's or card contract's) classifier
         * @description Operation name: `setContractClassifier`
         *
         *     Operation is used to set the classifier value for the contract (**account contract** or **card contract**).
         *
         *     Classifiers are a mechanism for storing configuration parameters. Represent rules or restrictions allowing flexible configuration of business processes:
         *     *	Classifiers make it possible to segment separate contracts into groups depending on the current status of a contract (account contract or card contract)
         *     *	Classifiers make it possible to set conditions for executing various actions, depending on the current status of a contract (account contract or card contract)
         *
         *     Available classifiers in the standard product with possible values:
         *
         *     | `classifier_code`  	| `classifierValue`             	| **Contract level** 	| **Description**                                                                                                                          	| **Product   applicability**                                                                                                                	|
         *     |--------------------	|-------------------------------	|--------------------	|------------------------------------------------------------------------------------------------------------------------------------------	|--------------------------------------------------------------------------------------------------------------------------------------------	|
         *     | ABU                	| N                       	      | Card contract      	| ABU (Automatic Billing Updater) management Default: Y                                                                                    	| Any product                                                                                                                                	|
         *     | ABU                	| Y                             	| Card contract      	| ABU (Automatic Billing Updater) management Default: Y                                                                                    	| Any product                                                                                                                                	|
         *     | ALLOW_INTL         	| N                       	      | Card contract      	| Foreign transactions management Default - Y                                                                                             	| Credit, Debit                                                                                                                              	|
         *     | ALLOW_INTL         	| Y                             	| Card contract      	| Foreign transactions management Default - Y                                                                                         	    | Credit, Debit                                                                                                                              	|
         *     | ALLOW_MAGS         	| N                             	| Card contract      	| Magstripe transactions management Default: Y                                                                                            	| Debit                                                                                                                                      	|
         *     | ALLOW_MAGS         	| Y                             	| Card contract      	| Magstripe transactions management Default: Y                                                                                         	    | Debit                                                                                                                                      	|
         *     | CHARGE_OFF_STATE   	| OFF                           	| Any Contract       	| Charge off management                                                                                                                    	| Credit                                                                                                                                     	|
         *     | CHARGE_OFF_STATE   	| ON                            	| Any Contract       	| Charge off management                                                                                                                    	| Credit                                                                                                                                     	|
         *     | CTLS_FLAG          	| CTLS_FLAG_OFF 	                | Card contract      	| Contactless management Default: CTLS_FLAG_ON                                                                                          	  | Any product                                                                                                                                	|
         *     | CTLS_FLAG          	| CTLS_FLAG_ON 	                  | Card contract      	| Contactless management Default: CTLS_FLAG_ON                                                                                          	  | Any product                                                                                                                                	|
         *     | FEE_WAIVING        	| N                       	      | Any Contract       	| Switch to stop/start calculating turnovers for fee waiving Default - OFF                                                              	  | Credit, Prepaid                                                                                                                            	|
         *     | FEE_WAIVING        	| Y                             	| Any Contract       	| Switch to stop/start calculating turnovers for fee waiving Default - OFF                                                              	  | Credit, Prepaid                                                                                                                            	|
         *     | INS_FIXED          	| OFF                     	      | Any Contract       	| Switch to stop/start charging insurance fixed (INF) Default - OFF                                                                     	  | Credit, Prepaid                                                                                                                            	|
         *     | INS_FIXED          	| ON                     	        | Any Contract       	| Switch to stop/start charging insurance fixed (INF) Default - OFF                                                                     	  | Credit, Prepaid                                                                                                                            	|
         *     | INS_FIXED_AD       	| OFF                    	        | Any Contract       	| Switch to stop/start charging insurance fixed single (INFS) Default - OFF                                                             	  | Credit, Prepaid                                                                                                                            	|
         *     | INS_FIXED_AD       	| ON                             	| Any Contract       	| Switch to stop/start charging insurance fixed single (INFS) Default - OFF                                                             	  | Credit, Prepaid                                                                                                                            	|
         *     | INS_FIXED_AD_C     	| OFF                           	| Card contract      	| Insurance Fixed Single Card (INFSC) management Default - OFF                                                                          	  | Credit                                                                                                                                     	|
         *     | INS_FIXED_AD_C     	| ON                             	| Card contract      	| Insurance Fixed Single Card (INFSC) management Default - OFF                                                                          	  | Credit                                                                                                                                     	|
         *     | MEMB_FEE_DELAY     	| OFF                     	      | Any Contract       	| Membership fee delay management                                                                                                          	| Credit                                                                                                                                     	|
         *     | MEMB_FEE_DELAY     	| ON                     	        | Any Contract       	| Membership fee delay management                                                                                                          	| Credit                                                                                                                                     	|
         *     | MEMB_FEE_FREQ      	| B                 	            | Any Contract       	| Switch to signify what kind of recurring fee (Billing, Monthly, None or Yearly) to charge on contract.  Can be reversed. Default – Y. 	  | Credit	                                                                                                                                    |
         *     | MEMB_FEE_FREQ      	| M                	              | Any Contract       	| Switch to signify what kind of recurring fee (Billing, Monthly, None or Yearly) to charge on contract.  Can be reversed. Default – Y. 	  | Credit 	                                                                                                                                    |
         *     | MEMB_FEE_FREQ      	| N                 	            | Any Contract       	| Switch to signify what kind of recurring fee (Billing, Monthly, None or Yearly) to charge on contract.  Can be reversed. Default – Y. 	  | Credit	                                                                                                                                    |
         *     | MEMB_FEE_FREQ      	| Y                              	| Any Contract       	| Switch to signify what kind of recurring fee (Billing, Monthly, None or Yearly) to charge on contract.  Can be reversed. Default – Y. 	  | Credit 	                                                                                                                                    |
         *     | SDD_AGREED_TO_PAY  	| MTP                     	      | Any Contract       	| Simplified Direct debit option (Minimum to pay or Statement value). Default = MTP                                                        	| Credit                                                                                                                                     	|
         *     | SDD_AGREED_TO_PAY  	| STMT                      	    | Any Contract       	| Simplified Direct debit option (Minimum to pay or Statement value). Default = MTP                                                        	| Credit                                                                                                                                     	|
         *
         */
        put: operations["setContractClassifier"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/classifiers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves contract's (account contract's or card contract's) classifier
         * @description Operation name: `getContractClassifiers`
         *
         *     Operation is used to retrieve selected contract (**account contract** or **card contract**) classifier value.
         *
         *     Available classifiers in the standard product with possible values:
         *     | **classifierCode** 	| **classifierValue**                  	| **Contract level** 	| **Description**                                                                                                                                                                                        	| **Product   applicability**                                                                                                                	|
         *     |--------------------	|--------------------------------------	|--------------------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|--------------------------------------------------------------------------------------------------------------------------------------------	|
         *     | ABU                	| N                              	      | Card contract      	| ABU (Automatic Billing Updater) management Default: Y                                                                                                                                                  	| Any product                                                                                                                                	|
         *     | ABU                	| Y                                   	| Card contract      	| ABU (Automatic Billing Updater) management Default: Y                                                                                                                                                 	| Any product                                                                                                                                	|
         *     | ALLOW_INTL         	| N                              	      | Card contract      	| Foreign transactions management Default - Y                                                                                                                                                            	| Credit, Debit                                                                                                                              	|
         *     | ALLOW_INTL         	| Y                                   	| Card contract      	| Foreign transactions management Default - Y                                                                                                                                                       	    | Credit, Debit                                                                                                                              	|
         *     | ALLOW_MAGS         	| N                             	      | Card contract      	| Magstripe transactions management Default: Y                                                                                                                                                          	| Debit                                                                                                                                      	|
         *     | ALLOW_MAGS         	| Y                               	    | Card contract      	| Magstripe transactions management Default: Y                                                                                                                                                          	| Debit                                                                                                                                      	|
         *     | CHARGE_OFF_STATE   	| OFF                                 	| Any Contract       	| Charge off management                                                                                                                                                                                  	| Credit                                                                                                                                     	|
         *     | CHARGE_OFF_STATE   	| ON                            	      | Any Contract       	| Charge off management                                                                                                                                                                                  	| Credit                                                                                                                                     	|
         *     | CTLS_FLAG          	| CTLS_FLAG_OFF       	                | Card contract      	| Contactless management Default: CTLS_FLAG_ON                                                                                                                                                            | Any product                                                                                                                                 |
         *     | CTLS_FLAG          	| CTLS_FLAG_ON        	                | Card contract      	| Contactless management Default: CTLS_FLAG_ON                                                                                                                                                            | Any product                                                                                                                                 |
         *     | DLQ_LEVEL          	| 0 	                                  | Any Contract       	| Delinquency level 0 – No debt 1 – Due 2 – 7 – Overdue 30 – 180 Cannot be changed through `setContractClassifier`                                                                                      	| Credit                                                                                                                                     	|
         *     | DLQ_LEVEL          	| 1              	                      | Any Contract       	| Delinquency level 0 – No debt 1 – Due 2 – 7 – Overdue 30 – 180 Cannot be changed through `setContractClassifier`                                                                           	            | Credit                                                                                                                                     	|
         *     | DLQ_LEVEL          	| 2 	                                  | Any Contract       	| Delinquency level 0 – No debt 1 – Due 2 – 7 – Overdue 30 – 180 Cannot be changed through `setContractClassifier`                                                                                      	| Credit                                                                                                                                     	|
         *     | DLQ_LEVEL          	| 3 	                                  | Any Contract       	| Delinquency level 0 – No debt 1 – Due 2 – 7 – Overdue 30 – 180 Cannot be changed through `setContractClassifier`                                                                           	            | Credit                                                                                                                                     	|
         *     | DLQ_LEVEL          	| 4 	                                  | Any Contract       	| Delinquency level 0 – No debt 1 – Due 2 – 7 – Overdue 30 – 180 Cannot be changed through `setContractClassifier`                                                                           	            | Credit                                                                                                                                     	|
         *     | DLQ_LEVEL          	| 5 	                                  | Any Contract       	| Delinquency level 0 – No debt 1 – Due 2 – 7 – Overdue 30 – 180 Cannot be changed through `setContractClassifier`                                                                           	            | Credit                                                                                                                                     	|
         *     | DLQ_LEVEL          	| 6	                                    | Any Contract       	| Delinquency level 0 – No debt 1 – Due 2 – 7 – Overdue 30 – 180 Cannot be changed through `setContractClassifier`                                                                           	            | Credit                                                                                                                                     	|
         *     | DLQ_LEVEL          	| 7 	                                  | Any Contract       	| Delinquency level 0 – No debt 1 – Due 2 – 7 – Overdue 30 – 180 Cannot be changed through `setContractClassifier`                                                                                       	| Credit                                                                                                                                     	|
         *     | FEE_WAIVING        	| N                                   	| Any Contract       	| Switch to stop/start calculating turnovers for fee waiving Default - OFF                                                                                                                            	  | Credit, Prepaid                                                                                                                            	|
         *     | FEE_WAIVING        	| N                                   	| Any Contract       	| Switch to stop/start calculating turnovers for fee waiving Default - OFF                                                                                                                              	| Credit, Prepaid                                                                                                                            	|
         *     | GRACE_PERIOD       	| OFF                                 	| Account Contract   	| Switch to on/off grace period for given account contracted. Default - ON. Cannot be changed through `setContractClassifier`                                                                         	  | Credit                                                                                                                                     	|
         *     | GRACE_PERIOD       	| ON                                  	| Account Contract   	| Switch to on/off grace period for given account contracted. Default - ON. Cannot be changed through `setContractClassifier`                                                                         	  | Credit                                                                                                                                     	|
         *     | INS_FIXED          	| OFF                                 	| Any Contract       	| Switch to stop/start charging insurance fixed (INF) Default - OFF                                                                                                                                   	  | Credit, Prepaid                                                                                                                            	|
         *     | INS_FIXED          	| ON                            	      | Any Contract       	| Switch to stop/start charging insurance fixed (INF) Default - OFF                                                                                                                                   	  | Credit, Prepaid                                                                                                                            	|
         *     | INS_FIXED_AD       	| OFF                            	      | Any Contract       	| Switch to stop/start charging insurance fixed single (INFS) Default - OFF                                                                                                                           	  | Credit, Prepaid                                                                                                                            	|
         *     | INS_FIXED_AD       	| ON                            	      | Any Contract       	| Switch to stop/start charging insurance fixed single (INFS) Default - OFF                                                                                                                           	  | Credit, Prepaid                                                                                                                            	|
         *     | INS_FIXED_AD_C     	| OFF                            	      | Card contract      	| Insurance Fixed Single Card (INFSC) management Default - OFF                                                                                                                                        	  | Credit                                                                                                                                     	|
         *     | INS_FIXED_AD_C     	| ON                            	      | Card contract      	| Insurance Fixed Single Card (INFSC) management Default - OFF                                                                                                                                        	  | Credit                                                                                                                                     	|
         *     | MARKUP_ENABLED     	| N                               	    | Any Contract       	| Markup fees enabled Cannot be changed through `setContractClassifier`                                                                                                                               	  | Credit                                                                                                                                     	|
         *     | MARKUP_ENABLED     	| Y                               	    | Any Contract       	| Markup fees enabled Cannot be changed through `setContractClassifier`                                                                                                                               	  | Credit                                                                                                                                     	|
         *     | MEMB_FEE_DELAY     	| OFF                            	      | Any Contract       	| Membership fee delay management                                                                                                                                                                        	| Credit                                                                                                                                     	|
         *     | MEMB_FEE_DELAY     	| ON                            	      | Any Contract       	| Membership fee delay management                                                                                                                                                                        	| Credit                                                                                                                                     	|
         *     | MEMB_FEE_FREQ      	| B                         	          | Any Contract       	| Switch to signify what kind of recurring fee (Billing, Monthly, None or Yearly) to charge on contract.  Can be reversed. Default – Y                                                                   	| Credit 	                                                                                                                                    |
         *     | MEMB_FEE_FREQ      	| M                                    	| Any Contract       	| Switch to signify what kind of recurring fee (Billing, Monthly, None or Yearly) to charge on contract.  Can be reversed. Default – Y                                                                  	| Credit                                                                                                                                      |
         *     | MEMB_FEE_FREQ      	| N                          	          | Any Contract       	| Switch to signify what kind of recurring fee (Billing, Monthly, None or Yearly) to charge on contract.  Can be reversed. Default – Y                                                               	    | Credit 	                                                                                                                                    |
         *     | MEMB_FEE_FREQ      	| Y                          	          | Any Contract       	| Switch to signify what kind of recurring fee (Billing, Monthly, None or Yearly) to charge on contract.  Can be reversed. Default – Y                                                               	    | Credit 	                                                                                                                                    |
         *     | OVL_STATUS         	| N                               	    | Account Contract   	| Account Overlimit status indicated. Once account goes Overlimit then the classifier is switched to Y.  If reset, then the value is reverted to N. Cannot be changed through `setContractClassifier` 	  | Credit                                                                                                                                     	|
         *     | OVL_STATUS         	| Y                               	    | Account Contract   	| Account Overlimit status indicated. Once account goes Overlimit then the classifier is switched to Y.  If reset, then the value is reverted to N. Cannot be changed through `setContractClassifier` 	  | Credit                                                                                                                                     	|
         *     | SDD_AGREED_TO_PAY  	| MTP                          	        | Any Contract       	| Simplified Direct debit option (Minimum to pay or Statement value). Default = MTP                                                                                                                      	| Credit                                                                                                                                     	|
         *     | SDD_AGREED_TO_PAY  	| STMT                          	      | Any Contract       	| Simplified Direct debit option (Minimum to pay or Statement value). Default = MTP                                                                                                                      	| Credit                                                                                                                                     	|
         *     | STOCK              	| N                               	    | Account Contract   	| Identifying whether contract is STOCK (value = Y) or TARGET (value = N)/Cannot be changed through `setContractClassifier`                                                                           	  | Prepaid                                                                                                                                    	|
         *     | STOCK              	| Y                               	    | Account Contract   	| Identifying whether contract is STOCK (value = Y) or TARGET (value = N)/Cannot be changed through `setContractClassifier`                                                                           	  | Prepaid                                                                                                                                    	|
         *     | TRX_FEES_ENABLED   	| N                               	    | Any Contract       	| Transaction Fees Enabled Default - Y. Cannot be changed through `setContractClassifier`                                                                                                               	| Credit                                                                                                                                     	|
         *     | TRX_FEES_ENABLED   	| Y                               	    | Any Contract       	| Transaction Fees Enabled Default - Y. Cannot be changed through `setContractClassifier`                                                                                                               	| Credit                                                                                                                                     	|
         *
         */
        get: operations["getContractClassifiers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/{client_id}/custom-data": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Sets up a custom data for a client
         * @description Operation name: `setClientCustomData`
         *
         *     Operation is used to manage custom data of the client object:
         *       * add
         *       * update
         *       * remove
         *
         *     Client custom data allow the Issuer to store specific client-related information on client record in the MP's CMS.
         *     The tags may represent Issuer-specific field names and values, not available as separate, dedicated fields on client record.
         *     The Issuer can specify the tag name and its value.
         *
         *     Custom data tags are stored in fixed containers (four containers are available) in TAG=VALUE; format (for example: CATEGORY=A;GROUP=G1;).
         *
         *     Each container has length of 3900 characters.
         *
         */
        post: operations["setClientCustomData"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/{client_id}/custom-data/{tag_name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves selected custom data for a client
         * @description Operation name: `getClientCustomData`
         *
         *     Operation is used to retrieve selected custom data of the client object.
         *
         */
        get: operations["getClientCustomData"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/custom-data": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Sets up a custom data for a specified contract (account contract or card contract)
         * @description Operation name: `setContractCustomData`
         *
         *     Operation is used to manage custom data of the contract (**account contract** or **card contract**):
         *       * add
         *       * update
         *       * remove
         *
         *     Account contract custom data allow the Issuer to store specific contract-related information on a contract record in the MP's CMS.
         *     The tags may represent the Issuer-specific field names and values, not available as separate, dedicated fields on the contract record.
         *     The Issuer can specify the tag name and its value.
         *
         *     Custom data tags are stored in fixed containers (four containers are available) in TAG=VALUE; format (for example: CATEGORY=A;GROUP=G1;).
         *
         *     Each container has length of 255 characters.
         *
         */
        post: operations["setContractCustomData"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/custom-data/{tag_name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves selected custom data for a specified contract (account contract or card contract)
         * @description Operation name: `getContractCustomData`
         *
         *     Operation is used to retrieve selected custom data of the specified contract (**account contract** or **card contract**).
         *
         */
        get: operations["getContractCustomData"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/parameters/{parameter_code}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Sets up or changes a contract's parameter value.
         * @description Operation name: `setContractParameter`
         *
         *     Operation is used to set or change the contract (**account contract** or **card contract**) parameter value.
         *
         *     Contract parameters are used for storing the product configuration values.
         *     For example, contract parameters can store:
         *       * chosen billing day (for credit card)
         *       * the profile of the fees
         *       * the profile of the interest
         *
         *     The set of allowed contract parameters for the contract depends on the product based on which the contract is created.
         *     A list of possible contract parameter codes will be defined during the card product implementation project.
         *
         *     Available parameters in the standard product with possible values:
         *     | `parameter_code`           	| `parameterValue`                          	| **Contract level** 	| **Description**                              	| **Product applicability** 	|
         *     |----------------------------	|-------------------------------------------	|--------------------	|----------------------------------------------	|---------------------------	|
         *     | FUNCTIONAL_DATES           	| DATE_PLAN_01                              	| Account   Contract 	| Functional   dates plan management           	| Prepaid                   	|
         *     | FUNCTIONAL_DATES           	| DATE_PLAN_02                              	| Account   Contract 	| Functional   dates plan management           	| Prepaid                   	|
         *     | GL_PLAN                    	| GL_PLAN_01                                	| Account   Contract 	| GL plan   management                         	| Credit                    	|
         *     | INTEREST_PLAN              	| INT_PLAN_01 	                              | Account   Contract 	| Interest   plan management                   	| Credit                    	|
         *     | INTEREST_PLAN              	| INT_PLAN_02 	                              | Account   Contract 	| Interest   plan management                   	| Credit                    	|
         *     | INTEREST_PLAN              	| INT_PLAN_03 	                              | Account   Contract 	| Interest   plan management                   	| Credit                    	|
         *     | MTP_OPTION                 	| MTP_OPTION_01           	                  | Account   Contract 	| MTP   option management                      	| Credit                    	|
         *     | MTP_OPTION                 	| MTP_OPTION_02            	                  | Account   Contract 	| MTP   option management                      	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| NULL                    	                  | Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| 10                                        	| Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| 20                                        	| Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| 30                	                        | Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| 50                 	                        | Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| 75                                        	| Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | TARIFF_PLAN                	| FEE_PLAN_01	                                | Any   Contract     	| Fee plan   management                        	| Credit, Prepaid             |
         *     | TARIFF_PLAN                	| FEE_PLAN_02                                 | Any   Contract     	| Fee plan   management                        	| Credit, Prepaid             |
         *     | TARIFF_PLAN                	| FEE_PLAN_03 	                              | Any   Contract     	| Fee plan   management                        	| Credit                    	|
         *
         */
        put: operations["setContractParameter"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/parameters": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves information about contract (account contract or card contract) parameter(s).
         * @description Operation name: `getContractParameters`
         *
         *     Operation is used to retrieve information about contract parameter(s) (**account contract** or **card contract**).
         *
         *     The Issuer is allowed to provide parameter codes to retrieve information only about specific parameters.
         *
         *     Available parameters in the standard product with possible values:
         *     | `parameterCode`           	| `parameterValue`                          	| **Contract level** 	| **Description**                              	| **Product applicability** 	|
         *     |----------------------------	|-------------------------------------------	|--------------------	|----------------------------------------------	|---------------------------	|
         *     | FUNCTIONAL_DATES           	| DATE_PLAN_01                              	| Account   Contract 	| Functional   dates plan management           	| Prepaid                   	|
         *     | FUNCTIONAL_DATES           	| DATE_PLAN_02                              	| Account   Contract 	| Functional   dates plan management           	| Prepaid                   	|
         *     | GL_PLAN                    	| GL_PLAN_01                                	| Account   Contract 	| GL plan   management                         	| Credit                    	|
         *     | INTEREST_PLAN              	| INT_PLAN_01                               	| Account   Contract 	| Interest   plan management                   	| Credit                    	|
         *     | INTEREST_PLAN              	| INT_PLAN_02   	                            | Account   Contract 	| Interest   plan management                   	| Credit                    	|
         *     | INTEREST_PLAN              	| INT_PLAN_03   	                            | Account   Contract 	| Interest   plan management                   	| Credit                    	|
         *     | MTP_OPTION                 	| MTP_OPTION_01                             	| Account   Contract 	| MTP   option management                      	| Credit                    	|
         *     | MTP_OPTION                 	| MTP_OPTION_02                             	| Account   Contract 	| MTP   option management                      	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| NULL            	                          | Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| 10            	                            | Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| 20             	                            | Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| 30             	                            | Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| 50              	                          | Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | SDD_AGREED_TO_PAY_VARIANCE 	| 75                                        	| Card   contract    	| Variance   for Direct debit Statement option 	| Credit                    	|
         *     | TARIFF_PLAN                	| FEE_PLAN_01                             	  | Any   Contract     	| Fee plan   management                        	| Credit, Prepaid             |
         *     | TARIFF_PLAN                	| FEE_PLAN_02 	                              | Any   Contract     	| Fee plan   management                        	| Credit, Prepaid             |
         *     | TARIFF_PLAN                	| FEE_PLAN_03 	                              | Any   Contract     	| Fee plan   management                        	| Credit                    	|
         *
         */
        get: operations["getContractParameters"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/debits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Posts debit transaction to a contract (account contract or card contract)
         * @description Operation name: `debitContract`
         *
         *     Operation is used to post debit transaction for particular contract (**account contract** or **card contract**).
         *
         *     Available debit transactions in the standard product:
         *     | `transactionTypeCode` 	| **Description**             	| **Contract level** 	| **Product applicability** 	|
         *     |-----------------------	|-----------------------------	|--------------------	|---------------------------	|
         *     | BT1                   	| Balance Transfer            	| Account contract   	| Credit                    	|
         *     | FP                    	| Fee posting                 	| Account contract   	| Credit                    	|
         *     | I_TPD                 	| Transaction posting - debit 	| Account contract   	| Credit, Prepaid           	|
         *     | TPD                   	| Transaction posting - debit 	| Account contract   	| Credit                    	|
         *
         */
        post: operations["debitContract"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/credits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Posts credit transaction to a contract (account contract or card contract)
         * @description Operation name: `creditContract`
         *
         *     Operation is used to post credit transaction for particular contract (**account contract** or **card contract**).
         *
         *     Available credit transactions in the standard product:
         *     | `transactionTypeCode` 	| **Description**              	| **Contract level** 	| **Product applicability** 	|
         *     |-----------------------	|------------------------------	|--------------------	|---------------------------	|
         *     | I_TPC                 	| Transaction posting - credit 	| Account contract   	| Credit, Prepaid           	|
         *     | PT_1                  	| Payment to Client Contract   	| Account contract   	| Credit                    	|
         *     | TP                    	| Top-up prepaid card          	| Account contract   	| Prepaid                   	|
         *     | TPC_1                 	| Transaction posting - credit 	| Account contract   	| Credit, Prepaid           	|
         *
         */
        post: operations["creditContract"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/charge-fees": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Charges specified contract (account contract or card contract) with a fee configured in the MP's CMS
         * @description Operation name: `chargeFee`
         *
         *     Operation is used to charge the specified contract (**account contract** or **card contract**) with fee configured on MP's CMS.
         *
         *     Available fees in the standard product:
         *     | `feeTypeId` 	| **Description**          	| **Contract level** 	| **Product applicability** 	|
         *     |-------------	|--------------------------	|--------------------	|---------------------------	|
         *     | APSF        	| Paper statement fee      	| Account contract   	| Credit                    	|
         *     | AUCF        	| Urgent card fee          	| Card contract      	| Credit, Prepaid           	|
         *     | MFM         	| Miscellaneous custom fee 	| Account contract   	| Prepaid                   	|
         *
         */
        post: operations["chargeFee"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves transactions for a specified contract (account contract or card contract)
         * @description Operation name: `getTransactions`
         *
         *     Operation is used to retrieve transactions for a specified contract (**account contract** or **card contract**).
         *
         *     Additional filtering can be applied:
         *       * **Date from** - to define the start period
         *       * **Date to** - to define the end period
         *       * **Authorization filter mode** - to retrieve records with different impact on contract balance
         *       * **Authorized flag** - to retrieve records which were authorized or not
         *       * **Transaction type code** - to retrieve transactions of a specified type
         *
         *     Note: Date filters use CMS "transaction date" (`transactionDate` field) to filter the records.
         *
         */
        get: operations["getTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/transaction-documents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves transaction documents for a contract (account contract or card contract)
         * @description Operation name: `getContractTransactionDocuments`
         *
         *     Operation is used to retrieve transaction documents for a specified contract (**account contract** or **card contract**).
         *
         *     Additional filtering can be applied:
         *       * **Date from** - to define the start period
         *       * **Date to** - to define the end period
         *       * **Authorization filter** - to retrieve records with different impact on the contract balance
         *       * **Collect authorizations** - to retrieve only cleared transactions or also pending authorizations
         *       * **Contract hierarchy** - to enable contract hierarchy analysis
         *       * **Direction** - to retrieve only debit or credit transactions
         *       * **Transaction type code** - to retrieve transactions of a specified type
         *
         *     Note: Date filters use CMS posting date (`postingDate` field) to filter the records.
         *
         */
        get: operations["getContractTransactionDocuments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transaction-documents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves transaction documents by ID, ARN, RRN or SRN
         * @description Operation name: `getTransactionDocuments`
         *
         *
         *     Method is used to retrieve transaction documents by
         *
         *     * ID - Transaction document identifier
         *
         *     * ARN - Acquirer Reference Number
         *
         *     * RRN - Retrieval Reference Number
         *
         *     * SRN - Source Registration Number
         *
         *
         *     ID - Transaction document identifier
         *
         *
         *     ARN - Transaction identification number generated by the acquirer according to payment scheme rules
         *
         *
         *     RRN - Transaction identifier generated according to payment scheme rules
         *
         *
         *     SRN - Document registration number assigned by the sender
         *
         */
        get: operations["getTransactionDocuments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/{transaction_id}/fees": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves fees generated for a transaction.
         * @description Operation name: `getTransactionFees`
         *
         *     Operation is used to retrieve fees generated for a specified transaction.
         *
         */
        get: operations["getTransactionFees"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/usage-limits/{usage_limit_code}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Adds or updates a usage limit for a given contract (account contract or card contract)
         * @description Operation name: `setUsageLimit`
         *
         *     Operation is used to add or update a new usage limit for the contract (**account contract** or **card contract**).
         *
         *     MP API does not provide an option to create a new usage limit. Usage limits are defined during the setup phase of the product (card product).
         *     Each usage limit has default values stored on CMS configuration (Service Pack).
         *     Operation `setUsageLimit` allows to update those default values of a given usage limit for the specified contract.
         *     The updated values are immediately used in authorization checks.
         *
         *     Specifics of a combination of limit properties (`maxNumber`, `maxAmount`, `maxSingleAmount`) parameters:
         *       * Limit could be active (after overriding by `setUsageLimit`) with all 0 which means that all transactions belonging
         *         to this limit will be declined. If all three fields have zero values, all transactions are prohibited.
         *       * If at least one property is set to non-zero, the limit will allow transactions up to that number or amount respectively.
         *       * If at least one property is set to a big number (ex. `maxNumber` set to 999999999 which is unlikely to reach in normal circumstances),
         *         it will serve the same purpose as disabling limit.
         *
         *     **Examples:**
         *     1.  *`maxNumber`=0, `maxAmount`=1000, `maxSingleAmount`=200*
         *
         *         In this configuration, no limit is set on the total number of transactions (maxNumber) on a contract for a period.
         *         The total transaction amount for a period (maxAmount) and single transaction amount (maxSingleAmount) are limited.
         *
         *     2.  *`maxNumber`=10, `maxAmount`=0, `maxSingleAmount`=200*
         *
         *         In this configuration, the total number of transactions on a contract for a period and single transaction amount are limited.
         *         No limit is set on the total transaction amount for a period.
         *
         *     3.  *`maxNumber`=10, `maxAmount`=1000, `maxSingleAmount`=0*
         *
         *         In this configuration, the total number of transactions on a contract and the total transaction amount for a period are limited.
         *         No limit is set on the single transaction amount.
         *
         *     Note:
         *     If limiter parameters were changed several times, and the effective periods of the redefined parameters overlap, the system remembers the changed values in the overlapping time periods. For example:
         *       * On 01.10.2009 a card was opened for a client. A limit of 300 USD was set on this card for operations at ATMs.
         *       * The client requested that for a period of one month, beginning 05.10.2009, the limit on his card be increased from 300 USD to 600 USD.
         *       * On 10.10.2009 the client asked to increase the limit on his card from 600 USD to 900 USD for one day.
         *       * Therefore, from 01.10.2009 to 04.10.2009 the limit will be 300 USD, from 05.10.2009 to 09.10.2009 it will increase to 600 USD,
         *         on 10.10.2009 it will be 900 USD, and from 11.10.2009 to 05.11.2009 the limit will be 600 USD again. After 05.11.2009 the limit will return to 300 USD.
         *
         *     Available usage limits in the standard product. In the standard product usage limits are defined in the Parametrization Workbook (PPW), in the worksheet 4 *Usage Limits* and in the worksheet 5 *Top-up* (in case of dedicated usage limits for prepaid).
         *       | `usageLimitCode`      	| **Contract   level** 	| **Description**                                                         	| **Product applicability** 	|
         *       |-----------------------	|----------------------	|-------------------------------------------------------------------------	|---------------------------	|
         *       | BILLING_ATM           	| Card contract        	| Billing ATM withdrawal transactions                                     	| Credit                    	|
         *       | BILLING_CASH          	| Card contract        	| Billing ATM withdrawal and Cash advance transactions                    	| Credit                    	|
         *       | BILLING_ECOMM         	| Card contract        	| Billing e-commerce transactions                                         	| Credit                    	|
         *       | BILLING_MOTO          	| Card contract        	| Billing MOTO transactions                                               	| Credit                    	|
         *       | BILLING_RETAIL        	| Card contract        	| Billing Retail (POS, e-commerce, MOTO and other payments) transactions  	| Credit                    	|
         *       | BILLING_TOTAL         	| Card contract        	| Billing all types of transactions                                       	| Credit                    	|
         *       | DAILY_ATM             	| Card contract        	| Daily ATM withdrawal transactions                                       	| Any product               	|
         *       | DAILY_CASH            	| Card contract        	| Daily ATM withdrawal and Cash advance transactions                      	| Any product               	|
         *       | DAILY_ECOMM           	| Card contract        	| Daily e-commerce transactions                                           	| Any product               	|
         *       | DAILY_MOTO            	| Card contract        	| Daily MOTO transactions                                                 	| Any product               	|
         *       | DAILY_RETAIL          	| Card contract        	| Daily Retail (POS, e-commerce, MOTO and other payments) transactions    	| Any product               	|
         *       | DAILY_TOP_UP          	| Account contract     	| Cumulative daily top-up limit                                           	| Prepaid                   	|
         *       | DAILY_TOTAL           	| Card contract        	| Daily all types of transactions                                         	| Any product               	|
         *       | MONTHLY_ATM           	| Card contract        	| Monthly ATM withdrawal transactions                                     	| Any product               	|
         *       | MONTHLY_CASH          	| Card contract        	| Monthly ATM withdrawal and Cash advance transactions                    	| Any product               	|
         *       | MONTHLY_ECOMM         	| Card contract        	| Monthly e-commerce transactions                                         	| Any product               	|
         *       | MONTHLY_MOTO          	| Card contract        	| Monthly MOTO transactions                                               	| Any product               	|
         *       | MONTHLY_RETAIL        	| Card contract        	| Monthly Retail  (POS, e-commerce, MOTO and other payments) transactions 	| Any product               	|
         *       | MONTHLY_TOP_UP        	| Account contract     	| Cumulative monthly top-up limit                                         	| Prepaid                   	|
         *       | MONTHLY_TOTAL         	| Card contract        	| Monthly all types of transactions                                       	| Any product               	|
         *       | PREPAID_BALANCE_LIMIT 	| Account contract     	| Prepaid Balance Limit                                                   	| Prepaid                   	|
         *       | YEARLY_TOP_UP         	| Account contract     	| Cumulative yearly top-up limit                                          	| Prepaid                   	|
         *
         */
        put: operations["setUsageLimit"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/usage-limits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves a list of usage limits for a contract (account contract or card contract)
         * @description Operation name: `getUsageLimits`
         *
         *     Operation is used to retrieve specified usage limits for a given contract (**account contract** or **card contract**).
         *
         *     The response will contain only specified usage limits. If the request doesn't contain any limit code value then the response will be empty.
         *
         *     Note: Operation retrieves only the current (at the time of query) state of the limit.
         *
         *     Available usage limits in the standard product. In the standard product usage limits are defined in the Parametrization Workbook (PPW), in the worksheet 4 *Usage Limits* and in the worksheet 5 *Top-up* (in case of dedicated usage limits for prepaid).
         *       | `usageLimitCode`      	| **Contract   level** 	| **Description**                                                         	| **Product applicability** 	|
         *       |-----------------------	|----------------------	|-------------------------------------------------------------------------	|---------------------------	|
         *       | BILLING_ATM           	| Card contract        	| Billing ATM withdrawal transactions                                     	| Credit                    	|
         *       | BILLING_CASH          	| Card contract        	| Billing ATM withdrawal and Cash advance transactions                    	| Credit                    	|
         *       | BILLING_ECOMM         	| Card contract        	| Billing e-commerce transactions                                         	| Credit                    	|
         *       | BILLING_MOTO          	| Card contract        	| Billing MOTO transactions                                               	| Credit                    	|
         *       | BILLING_RETAIL        	| Card contract        	| Billing Retail (POS, e-commerce, MOTO and other payments) transactions  	| Credit                    	|
         *       | BILLING_TOTAL         	| Card contract        	| Billing all types of transactions                                       	| Credit                    	|
         *       | DAILY_ATM             	| Card contract        	| Daily ATM withdrawal transactions                                       	| Any product               	|
         *       | DAILY_CASH            	| Card contract        	| Daily ATM withdrawal and Cash advance transactions                      	| Any product               	|
         *       | DAILY_ECOMM           	| Card contract        	| Daily e-commerce transactions                                           	| Any product               	|
         *       | DAILY_MOTO            	| Card contract        	| Daily MOTO transactions                                                 	| Any product               	|
         *       | DAILY_RETAIL          	| Card contract        	| Daily Retail (POS, e-commerce, MOTO and other payments) transactions    	| Any product               	|
         *       | DAILY_TOP_UP          	| Account contract     	| Cumulative daily top-up limit                                           	| Prepaid                   	|
         *       | DAILY_TOTAL           	| Card contract        	| Daily all types of transactions                                         	| Any product               	|
         *       | MONTHLY_ATM           	| Card contract        	| Monthly ATM withdrawal transactions                                     	| Any product               	|
         *       | MONTHLY_CASH          	| Card contract        	| Monthly ATM withdrawal and Cash advance transactions                    	| Any product               	|
         *       | MONTHLY_ECOMM         	| Card contract        	| Monthly e-commerce transactions                                         	| Any product               	|
         *       | MONTHLY_MOTO          	| Card contract        	| Monthly MOTO transactions                                               	| Any product               	|
         *       | MONTHLY_RETAIL        	| Card contract        	| Monthly Retail  (POS, e-commerce, MOTO and other payments) transactions 	| Any product               	|
         *       | MONTHLY_TOP_UP        	| Account contract     	| Cumulative monthly top-up limit                                         	| Prepaid                   	|
         *       | MONTHLY_TOTAL         	| Card contract        	| Monthly all types of transactions                                       	| Any product               	|
         *       | PREPAID_BALANCE_LIMIT 	| Account contract     	| Prepaid Balance Limit                                                   	| Prepaid                   	|
         *       | YEARLY_TOP_UP         	| Account contract     	| Cumulative yearly top-up limit                                          	| Prepaid                   	|
         *
         */
        get: operations["getUsageLimits"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/usage-limits/{usage_limit_code}/original-values": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Restores original values of a usage limit for a given contract (account contract or card contract)
         * @description Operation name: `restoreUsageLimitOriginalValues`
         *
         *     Operation is used to restore usage limit default parameters specified in the CMS (Service Package) for the contract (**account contract** or **card contract**).
         *
         *     Available usage limits in the standard product. In the standard product usage limits are defined in the Parametrization Workbook (PPW), in the worksheet 4 *Usage Limits* and in the worksheet 5 *Top-up* (in case of dedicated usage limits for prepaid).
         *       | `usageLimitCode`      	| **Contract   level** 	| **Description**                                                         	| **Product applicability** 	|
         *       |-----------------------	|----------------------	|-------------------------------------------------------------------------	|---------------------------	|
         *       | BILLING_ATM           	| Card contract        	| Billing ATM withdrawal transactions                                     	| Credit                    	|
         *       | BILLING_CASH          	| Card contract        	| Billing ATM withdrawal and Cash advance transactions                    	| Credit                    	|
         *       | BILLING_ECOMM         	| Card contract        	| Billing e-commerce transactions                                         	| Credit                    	|
         *       | BILLING_MOTO          	| Card contract        	| Billing MOTO transactions                                               	| Credit                    	|
         *       | BILLING_RETAIL        	| Card contract        	| Billing Retail (POS, e-commerce, MOTO and other payments) transactions  	| Credit                    	|
         *       | BILLING_TOTAL         	| Card contract        	| Billing all types of transactions                                       	| Credit                    	|
         *       | DAILY_ATM             	| Card contract        	| Daily ATM withdrawal transactions                                       	| Any product               	|
         *       | DAILY_CASH            	| Card contract        	| Daily ATM withdrawal and Cash advance transactions                      	| Any product               	|
         *       | DAILY_ECOMM           	| Card contract        	| Daily e-commerce transactions                                           	| Any product               	|
         *       | DAILY_MOTO            	| Card contract        	| Daily MOTO transactions                                                 	| Any product               	|
         *       | DAILY_RETAIL          	| Card contract        	| Daily Retail (POS, e-commerce, MOTO and other payments) transactions    	| Any product               	|
         *       | DAILY_TOP_UP          	| Account contract     	| Cumulative daily top-up limit                                           	| Prepaid                   	|
         *       | DAILY_TOTAL           	| Card contract        	| Daily all types of transactions                                         	| Any product               	|
         *       | MONTHLY_ATM           	| Card contract        	| Monthly ATM withdrawal transactions                                     	| Any product               	|
         *       | MONTHLY_CASH          	| Card contract        	| Monthly ATM withdrawal and Cash advance transactions                    	| Any product               	|
         *       | MONTHLY_ECOMM         	| Card contract        	| Monthly e-commerce transactions                                         	| Any product               	|
         *       | MONTHLY_MOTO          	| Card contract        	| Monthly MOTO transactions                                               	| Any product               	|
         *       | MONTHLY_RETAIL        	| Card contract        	| Monthly Retail  (POS, e-commerce, MOTO and other payments) transactions 	| Any product               	|
         *       | MONTHLY_TOP_UP        	| Account contract     	| Cumulative monthly top-up limit                                         	| Prepaid                   	|
         *       | MONTHLY_TOTAL         	| Card contract        	| Monthly all types of transactions                                       	| Any product               	|
         *       | PREPAID_BALANCE_LIMIT 	| Account contract     	| Prepaid Balance Limit                                                   	| Prepaid                   	|
         *       | YEARLY_TOP_UP         	| Account contract     	| Cumulative yearly top-up limit                                          	| Prepaid                   	|
         *
         */
        put: operations["restoreUsageLimitOriginalValues"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/usage-limits/{usage_limit_code}/resetting-counters": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Resets counters for a specified usage limit for a given contract (account contract or card contract)
         * @description Operation name: `resetUsageLimitCounters`
         *
         *     Operation is used to reset counters for a specified usage limit for the contract (**account contract** or **card contract**).
         *
         *     Available usage limits in the standard product. In the standard product usage limits are defined in the Parametrization Workbook (PPW), in the worksheet 4 *Usage Limits* and in the worksheet 5 *Top-up* (in case of dedicated usage limits for prepaid).
         *       | `usageLimitCode`      	| **Contract   level** 	| **Description**                                                         	| **Product applicability** 	|
         *       |-----------------------	|----------------------	|-------------------------------------------------------------------------	|---------------------------	|
         *       | BILLING_ATM           	| Card contract        	| Billing ATM withdrawal transactions                                     	| Credit                    	|
         *       | BILLING_CASH          	| Card contract        	| Billing ATM withdrawal and Cash advance transactions                    	| Credit                    	|
         *       | BILLING_ECOMM         	| Card contract        	| Billing e-commerce transactions                                         	| Credit                    	|
         *       | BILLING_MOTO          	| Card contract        	| Billing MOTO transactions                                               	| Credit                    	|
         *       | BILLING_RETAIL        	| Card contract        	| Billing Retail (POS, e-commerce, MOTO and other payments) transactions  	| Credit                    	|
         *       | BILLING_TOTAL         	| Card contract        	| Billing all types of transactions                                       	| Credit                    	|
         *       | DAILY_ATM             	| Card contract        	| Daily ATM withdrawal transactions                                       	| Any product               	|
         *       | DAILY_CASH            	| Card contract        	| Daily ATM withdrawal and Cash advance transactions                      	| Any product               	|
         *       | DAILY_ECOMM           	| Card contract        	| Daily e-commerce transactions                                           	| Any product               	|
         *       | DAILY_MOTO            	| Card contract        	| Daily MOTO transactions                                                 	| Any product               	|
         *       | DAILY_RETAIL          	| Card contract        	| Daily Retail (POS, e-commerce, MOTO and other payments) transactions    	| Any product               	|
         *       | DAILY_TOP_UP          	| Account contract     	| Cumulative daily top-up limit                                           	| Prepaid                   	|
         *       | DAILY_TOTAL           	| Card contract        	| Daily all types of transactions                                         	| Any product               	|
         *       | MONTHLY_ATM           	| Card contract        	| Monthly ATM withdrawal transactions                                     	| Any product               	|
         *       | MONTHLY_CASH          	| Card contract        	| Monthly ATM withdrawal and Cash advance transactions                    	| Any product               	|
         *       | MONTHLY_ECOMM         	| Card contract        	| Monthly e-commerce transactions                                         	| Any product               	|
         *       | MONTHLY_MOTO          	| Card contract        	| Monthly MOTO transactions                                               	| Any product               	|
         *       | MONTHLY_RETAIL        	| Card contract        	| Monthly Retail  (POS, e-commerce, MOTO and other payments) transactions 	| Any product               	|
         *       | MONTHLY_TOP_UP        	| Account contract     	| Cumulative monthly top-up limit                                         	| Prepaid                   	|
         *       | MONTHLY_TOTAL         	| Card contract        	| Monthly all types of transactions                                       	| Any product               	|
         *       | PREPAID_BALANCE_LIMIT 	| Account contract     	| Prepaid Balance Limit                                                   	| Prepaid                   	|
         *       | YEARLY_TOP_UP         	| Account contract     	| Cumulative yearly top-up limit                                          	| Prepaid                   	|
         *
         */
        put: operations["resetUsageLimitCounters"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/usage-limits/{usage_limit_code}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Changes specified usage limit status for a given contract (account contract or card contract)
         * @description Operation name: `changeUsageLimitStatus`
         *
         *     Operation is used to manage the activity of the specified usage limit on a given contract (**account contract** or **card contract**).
         *
         *     The Issuer is able to:
         *       * switch off usage limit
         *       * switch on usage limit
         *
         *     Additionally, activity period can be provided (start and end timestamp).
         *
         *       * For switch off (SUSPEND):
         *         * activation date must be greater than the deactivation date
         *         * activation date must be greater than the system date
         *
         *       * For switch on (ACTIVE):
         *         * deactivation date must be greater than the activation date
         *         * deactivation date must be greater than the system date
         *
         *     Available usage limits in the standard product. In the standard product usage limits are defined in the Parametrization Workbook (PPW), in the worksheet 4 *Usage Limits* and in the worksheet 5 *Top-up* (in case of dedicated usage limits for prepaid).
         *       | `usageLimitCode`      	| **Contract   level** 	| **Description**                                                         	| **Product applicability** 	|
         *       |-----------------------	|----------------------	|-------------------------------------------------------------------------	|---------------------------	|
         *       | BILLING_ATM           	| Card contract        	| Billing ATM withdrawal transactions                                     	| Credit                    	|
         *       | BILLING_CASH          	| Card contract        	| Billing ATM withdrawal and Cash advance transactions                    	| Credit                    	|
         *       | BILLING_ECOMM         	| Card contract        	| Billing e-commerce transactions                                         	| Credit                    	|
         *       | BILLING_MOTO          	| Card contract        	| Billing MOTO transactions                                               	| Credit                    	|
         *       | BILLING_RETAIL        	| Card contract        	| Billing Retail (POS, e-commerce, MOTO and other payments) transactions  	| Credit                    	|
         *       | BILLING_TOTAL         	| Card contract        	| Billing all types of transactions                                       	| Credit                    	|
         *       | DAILY_ATM             	| Card contract        	| Daily ATM withdrawal transactions                                       	| Any product               	|
         *       | DAILY_CASH            	| Card contract        	| Daily ATM withdrawal and Cash advance transactions                      	| Any product               	|
         *       | DAILY_ECOMM           	| Card contract        	| Daily e-commerce transactions                                           	| Any product               	|
         *       | DAILY_MOTO            	| Card contract        	| Daily MOTO transactions                                                 	| Any product               	|
         *       | DAILY_RETAIL          	| Card contract        	| Daily Retail (POS, e-commerce, MOTO and other payments) transactions    	| Any product               	|
         *       | DAILY_TOP_UP          	| Account contract     	| Cumulative daily top-up limit                                           	| Prepaid                   	|
         *       | DAILY_TOTAL           	| Card contract        	| Daily all types of transactions                                         	| Any product               	|
         *       | MONTHLY_ATM           	| Card contract        	| Monthly ATM withdrawal transactions                                     	| Any product               	|
         *       | MONTHLY_CASH          	| Card contract        	| Monthly ATM withdrawal and Cash advance transactions                    	| Any product               	|
         *       | MONTHLY_ECOMM         	| Card contract        	| Monthly e-commerce transactions                                         	| Any product               	|
         *       | MONTHLY_MOTO          	| Card contract        	| Monthly MOTO transactions                                               	| Any product               	|
         *       | MONTHLY_RETAIL        	| Card contract        	| Monthly Retail  (POS, e-commerce, MOTO and other payments) transactions 	| Any product               	|
         *       | MONTHLY_TOP_UP        	| Account contract     	| Cumulative monthly top-up limit                                         	| Prepaid                   	|
         *       | MONTHLY_TOTAL         	| Card contract        	| Monthly all types of transactions                                       	| Any product               	|
         *       | PREPAID_BALANCE_LIMIT 	| Account contract     	| Prepaid Balance Limit                                                   	| Prepaid                   	|
         *       | YEARLY_TOP_UP         	| Account contract     	| Cumulative yearly top-up limit                                          	| Prepaid                   	|
         *
         */
        put: operations["changeUsageLimitStatus"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/service-limit-tariffs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Sets up an individual service limit tariff for the contract (account contract or card contract)
         * @description Operation name: `setServiceLimitTariff`
         *
         *     Operation is used to redefine individual Service Limit Tariff for a specified contract (**account contract** or **card contract**).
         *
         *     Service Tariff Role - is used to set up fee calculation rules in Services
         *     Service Limit Tariff Role - is used to set up Services for calculating the maximum and minimum transaction amount,
         *     or to specify account balance limitations, or to specify limitations related to Events that open or close when the value of a specific balance type changes.
         *
         */
        post: operations["setServiceLimitTariff"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/tariff-data": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves information about tariff configuration for a contract (account contract or card contract)
         * @description Operation name: `getContractTariffData`
         *
         *     Operation is used to retrieve information about tariff configuration for a given contract (**account contract** or **card contract**).
         *
         */
        get: operations["getContractTariffData"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/searches": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Returns clientId assigned to a given client identifier.
         * @description Operation name: `getClientId`
         *
         *     Operation is used to retrieve `clientId` of the client record identified by:
         *       * `clientNumber` assigned by the Issuer
         *       * `identificationDocumentNumber` assigned by the Issuer or
         *       * `socialNumber` assigned by the Issuer or
         *       * `taxpayerIdentifier` assigned by the Issuer
         *
         */
        post: operations["getClientId"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/searches": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Returns accountContractId assigned to a given account identifier.
         * @description Operation name: `getAccountContractId`
         *
         *     Operation is used to retrieve `accountContractId` of the account contract record identified by:
         *       * `accountContractNumber` (account contract number assigned by the Issuer) or
         *       * `cbsNumber` (Core Banking System number assigned usually by the Issuer)
         *
         *     An `accountContractId` is a unique, technical account contract identifier assigned by the MP's CMS system. The identifier is used in the MP API operations to identify particular account contract.
         *
         */
        post: operations["getAccountContractId"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/searches": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Returns cardContractId assigned to a given card contract identifier.
         * @description Operation name: `getCardContractId`
         *
         *     Operation is used to retrieve `cardContractId` of the card contract record identified by:
         *       * `cardContractNumber` (PAN of the card assigned by the Issuer or MP) or
         *       * `cbsNumber` (Core Banking System number assigned usually by the Issuer)
         *
         *     A `cardContractId` is a unique, technical card contract identifier assigned by the MP's CMS system. The identifier is used in the MP API operations to identify particular card contract.
         *
         */
        post: operations["getCardContractId"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/public-keys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves MP's public RSA key.
         * @description Operation name: `getPublicRsaKey`
         *
         *     Operation is used to request a public RSA key information from the MP. In the response to the request, MP will return the MP's public RSA key and its index.
         *
         *     Operation is used for PIN Block asymmetric encryption in `setPin` and `verifyPin` operations.
         *
         */
        get: operations["getPublicRsaKey"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/authentication-method": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Sets up a contract (account contract or card contract) authentication method.
         * @description Operation name: `setAuthenticationMethod`
         *
         *     Operation is used to set up a contract (**account contract** or **card contract**) authentication method.
         *
         */
        put: operations["setAuthenticationMethod"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/transactions/{transaction_id}/releasing-blocked-funds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Releases funds of the pending transaction.
         * @description Operation name: `releaseBlockedFunds`
         *
         *     Operation is used to release funds for the pending transaction before automatic cancelation occurs.
         *
         */
        put: operations["releaseBlockedFunds"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/{transaction_id}/reversal": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reverses selected transaction made by the Issuer.
         * @description Operation name: `reverseTransaction`
         *
         *     Operation is used to reverse selected transaction made by the Issuer. Transaction types that can be reversed must be preconfigured in the CMS during the onboarding process.
         *
         *     The transaction which can be reversed must be in posting status `Posted`. After a successful transaction reversal, the proper balance will be changed.
         *
         */
        post: operations["reverseTransaction"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contracts/{contract_id}/authentication-parameter-values": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieves the value of a given authentication parameter for a specified contract.
         * @description Operation name: `getAuthenticationParameterValue`
         *
         *     Operation is used to retrieve the value of a given authentication parameter for a specified contract.
         *
         */
        get: operations["getAuthenticationParameterValue"];
        put?: never;
        post?: never;
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
        /**
         * @description Transaction type code. The value which can be used for filtering of transactions provided on the input filter.
         *
         *     Transactions originated from the Banknet
         *     | `transactionTypeCode` 	| `transactionType`                     	|
         *     |:---------------------:	|---------------------------------------	|
         *     | 0512                  	| Retail with CashBack                  	|
         *     | 0513 1                	| CH Debit                              	|
         *     | 0515                  	| Retail                                	|
         *     | 0518                  	| Unique                                	|
         *     | 0522                  	| CashBack 2Prs                         	|
         *     | 0523 1                	| CH Debit 2Prs                         	|
         *     | 0525                  	| Retail 2Prs                           	|
         *     | 0528                  	| Unique 2Prs                           	|
         *     | 0614 2                	| CH Payment                            	|
         *     | 0616                  	| Refund                                	|
         *     | 0624 2                	| CH Payment 2Prs                       	|
         *     | 0626                  	| Credit 2Prs                           	|
         *     | 0717                  	| Cash Advance                          	|
         *     | 0719                  	| ATM Cash Withdrawal                   	|
         *     | 0727                  	| Cash 2Prs                             	|
         *     | 0729                  	| ATM Cash withdrawal - 2nd presentment 	|
         *
         *     Transactions originated from the Issuer in the standard product
         *     | `transactionTypeCode` 	| `transactionType`             	| **Product applicability** 	|
         *     |-----------------------	|-------------------------------	|---------------------------	|
         *     | APSF                  	| Paper statement fee           	| Credit                    	|
         *     | BT1                   	| Balance Transfer              	| Credit                    	|
         *     | FP                    	| Fee posting                   	| Credit                    	|
         *     | I_TPC                 	| PBB Transfer posting - credit 	| Credit, Prepaid           	|
         *     | I_TPD                 	| PBB Transfer posting - debit  	| Credit, Prepaid           	|
         *     | PT_1                  	| Payment To Client Contract    	| Credit                    	|
         *     | TP                    	| Prepaid Top-Up                	| Prepaid                   	|
         *     | TPC_1                 	| Transaction posting - credit  	| Credit, Prepaid           	|
         *     | TPD                   	| Transaction posting - debit   	| Credit                    	|
         *
         *     Fees originated from the CMS in the standard product
         *     | `transactionTypeCode` 	| `transactionType`                     	| **Product applicability** 	|
         *     |-----------------------	|---------------------------------------	|---------------------------	|
         *     | A1F                   	| ATM Fee                               	| Prepaid                   	|
         *     | AFM_1                 	| BCC CA Annual Fee Main Card           	| Prepaid                   	|
         *     | AUCF                  	| Urgent card fee                       	| Credit, Prepaid           	|
         *     | C1F                   	| Cash Fee                              	| Prepaid                   	|
         *     | CF1                   	| Country Fee                           	| Prepaid                   	|
         *     | FXF                   	| Foreign exchange (FX) fee             	| Credit                    	|
         *     | INFC                  	| Insurance Fixed Card                  	| Credit                    	|
         *     | INFS                  	| Insurance Fixed Single                	| Credit, Prepaid           	|
         *     | INFSC                 	| Insurance Fixed Single Card           	| Credit                    	|
         *     | INP                   	| Insurance Percentage                  	| Credit                    	|
         *     | IPP                   	| BCC Insurance fee: Payment Protection 	| Credit, Prepaid           	|
         *     | JFA                   	| Joining fee                           	| Prepaid                   	|
         *     | LC                    	| New Lost Card for PIN Set             	| Prepaid                   	|
         *     | LPF                   	| BCC Late Payment Fee                  	| Credit                    	|
         *     | M;                    	| New Card for PIN Set                  	| Prepaid                   	|
         *     | M0                    	| Plastic Renew Expired                 	| Prepaid                   	|
         *     | M19                   	| Plastic Renew Misc (no Prod)          	| Credit                    	|
         *     | M8                    	| Plastic Renew Misc                    	| Prepaid                   	|
         *     | MA_1                  	| Balance Inquiry Fee                   	| Prepaid                   	|
         *     | MF_1                  	| BCC Card Fee Billing                  	| Prepaid                   	|
         *     | MFM                   	| Misc Fee Manual                       	| Prepaid                   	|
         *     | MR                    	| Replaced Card for PIN Set (no Prod)   	| Credit                    	|
         *     | OVLF                  	| OVL Fee                               	| Credit                    	|
         *     | PFMCC                 	| Retail Fee based on MC                	| Prepaid                   	|
         *     | PZ                    	| PIN Change Fee                        	| Prepaid                   	|
         *     | RWCBTF                	| Retail with CB Transaction Fee        	| Credit                    	|
         *     | TPF                   	| Top-up fee                            	| Prepaid                   	|
         *     | VCP                   	| New Card for PIN Set (no Prod)        	| Credit                    	|
         *
         *     Interests originated from the CMS in the standard credit product
         *     | `transactionTypeCode` 	| `transactionType`                 	|
         *     |-----------------------	|-----------------------------------	|
         *     | ILBT3                 	| Overdue cash interest             	|
         *     | ILBT5                 	| Overdue balance transfer interest 	|
         *     | ILC3                  	| Balance transfer interest         	|
         *     | ILC5                  	| Overdue retail interest           	|
         *     | ILR3                  	| Retail interest                   	|
         *     | ILR5                  	| Cash interest                     	|
         *
         * @example 0719
         */
        transactionTypeCode: string;
        /**
         * @description Transaction type.
         *
         * @example ATM transactions
         */
        transactionType: string;
        /**
         * @description Transaction type classifier code, determines the way documents or macrotransactions are processed.
         *
         *     | **Possible values** 	|       **Description**      	|
         *     |:-------------------:	|:--------------------------:	|
         *     | T                   	|  Transaction               	|
         *     | M                   	|  Fee                       	|
         *     | I                   	|  Interests                 	|
         *     | U                   	|  Upper Normalization       	|
         *     | L                   	|  Lower Normalization       	|
         *     | D                   	|  Due Normalization         	|
         *     | A                   	|  Account Transfer          	|
         *     | C                   	|  Credit Limit              	|
         *     | R                   	|  Rev/Exp                   	|
         *     | B                   	|  Balance Inquiry           	|
         *     | S                   	|  Online Statement          	|
         *     | E                   	|  End Cycle                 	|
         *     | i                   	|  Interest Fee              	|
         *     | P                   	|  Online Payment            	|
         *     | p                   	|  External Payment          	|
         *     | d                   	|  Due Special               	|
         *     | u                   	|  Upper Limit Special       	|
         *     | r                   	|  Reserve for Bad Debts     	|
         *     | l                   	|  Lower Limit Special       	|
         *     | c                   	|  Additional Credit Limit   	|
         *     | X                   	|  Additional Online Service 	|
         *     | +                   	|  Top Up                   	|
         *     | V                   	|  Verification              	|
         *
         * @example M
         */
        serviceClassCode: string;
        /**
         * @description Contract number of the target side (target contract).
         *
         *     * For account contract - value unmasked.
         *     * For card contract - value can be
         *       * unmasked - full PAN visible
         *       * masked - full PAN masked according to defined mask (mask pattern is agreed with Issuer and configured in the MP API)
         *
         * @example 161212______0128
         */
        targetContractNumber: string;
        /**
         * @description Contract number of the source side (source contract).
         *
         *     * For account contract - value unmasked.
         *     * For card contract - value can be
         *       * unmasked - full PAN visible
         *       * masked - full PAN masked according to defined mask (mask pattern is agreed with Issuer and configured in the MP API)
         *
         *     In case of transaction done by card at POS field contains the terminal id.
         *
         * @example 871818______0074
         */
        sourceContractNumber: string;
        /**
         * @description Authentication parameter name.
         *
         * @example PHONE
         */
        authenticationParameterName: string;
        /**
         * @description Authentication parameter value.
         *
         * @example +48 123456789
         */
        authenticationParameterValue: string;
        /**
         * @description Contract authentication type code.
         *
         * @example 3DS_EXT_ENROLLMENT
         */
        authenticationTypeCode: string;
        BlockedFundsReleaseResult: {
            /**
             * @description Release blocked funds result.
             *
             *     | **Possible values**     	| **Description**                      	|
             *     |-------------------------	|--------------------------------------	|
             *     | RELEASE_FUNDS_PERFORMED 	| When blocked funds were released     	|
             *     | RELEASE_FUNDS_FAILURE   	| When blocked funds were not released 	|
             *
             * @example RELEASE_FUNDS_FAILURE
             */
            cancelHoldResult?: string;
        };
        AuthenticationParameterValue: {
            authenticationParameterValue?: components["schemas"]["authenticationParameterValue"];
        };
        ReverseTransactionReason: {
            /**
             * @description The reason for reversing the transaction, if not filled by the Issuer, will be filled with the default value.
             *
             * @example Reversal
             */
            reason?: string;
        };
        BlockedFundsRelease: {
            /**
             * @description Description of the reason which leads to the release of blocked funds.
             *
             * @example Transaction aborted
             */
            reason?: string;
        };
        /**
         * @description Production code specifies a code under which the new card contract will be created.
         *
         *     There are 4 major card entities defined by the product type:
         *      * plastic - should a card plastic be generated (Yes/No)
         *      * PAN - should a new PAN be set (generated by the MP or passed in an API request by the Issuer) or should the existing one be used
         *      * PIN - should a new PIN be set (generated by the MP or set by the Issuer) or should the existing one be used
         *      * Expiry date - should a new expiry date be set (generated by the MP or passed in an API request by the Issuer)
         *
         *     Possible values in the default configuration of the MP's CMS:
         *      * NWOPIN_NOPROD (new card)
         *         * physical card  - No
         *         * PAN - New
         *         * PIN - Not required
         *         * Expiry date - Set by the MP or the Issuer
         *
         *      * NWOPIN (new card)
         *         * physical card - Yes
         *         * PAN - New
         *         * PIN - New
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * RPLRE (duplicate card plastic)
         *         * physical card - Yes
         *         * PAN - Same
         *         * PIN - Same
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * RALLRE (duplicate card plastic)
         *         * physical card - Yes
         *         * PAN - Same
         *         * PIN - New random PIN generated by the MP
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * RPL (renew)
         *         * physical card - Yes
         *         * PAN - Same
         *         * PIN - Same
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * RPLRE_NOPROD (renew)
         *         * physical card - No
         *         * PAN - Same
         *         * PIN - Not required
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * NLOSTWOPIN (replacement)
         *         * physical card - Yes
         *         * PAN - New
         *         * PIN - New
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * RWOPIN_NOPROD (replacement)
         *         * physical card  - No
         *         * PAN - New
         *         * PIN - Not required
         *         * Expiry date - Set by the MP or the Issuer
         *
         *     Notes:
         *       * `productionCode` is configured in the MP's CMS and the Issuer is allowed to use only the value set by the MP (the Issuer cannot use their own value).
         *       * Passing `productionCode` field is optional. The MP's CMS allows to configure a default `productionCode` assigned to the `productCode`.
         *
         * @example NWOPIN_NOPROD
         */
        productionCode: string;
        /**
         * @description A code under which a card contract has been created.
         *
         *     Possible values in the default configuration of the MP's CMS:
         *       * NWOPIN_NOPROD (new card)
         *         * physical card - No
         *         * PAN - New
         *         * PIN - Not required
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * NWOPIN (new card)
         *         * physical card - Yes
         *         * PAN - New
         *         * PIN - New
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * RPLRE (duplicate card plastic)
         *         * physical card - Yes
         *         * PAN - Same
         *         * PIN - Same
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * RALLRE (duplicate card plastic)
         *         * physical card - Yes
         *         * PAN - Same
         *         * PIN - New random PIN generated by the MP
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * RPL (renew)
         *         * physical card - Yes
         *         * PAN - Same
         *         * PIN - Same
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * RPLRE_NOPROD (renew)
         *         * physical card - No
         *         * PAN - Same
         *         * PIN - Not required
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * NLOSTWOPIN (replacement)
         *         * physical card - Yes
         *         * PAN - New
         *         * PIN - New
         *         * Expiry date - Set by the MP or the Issuer
         *
         *       * RWOPIN_NOPROD (replacement)
         *         * physical card - No
         *         * PAN - New
         *         * PIN - Not required
         *         * Expiry date - Set by the MP or the Issuer
         *
         * @example RALLRE
         */
        cardContractProductionCode: string;
        /**
         * Format: int64
         * @description A unique technical client identifier, generated by the MP's CMS database engine.
         *     The identifier is generated when client creation is completed successfully and is returned in a client creation response (`POST /clients`).
         *
         * @example 40000
         */
        clientId: number;
        /**
         * @description Client's identifier generated by the Issuer's CBS system (Core Banking System). The identifier is stored in the MP's CMS so that - apart from the technical identifier `clientId` - the Issuer can distinguish between their customers.
         *
         *     `clientNumber` should be prefixed with a unique Issuer designation, for example "ABC_", as it must be unique in the MP's CMS.
         *
         *     Note: The Issuer designation "ABC_" is configured in the MP's CMS and the Issuer is allowed to use only the value agreed with the MP.
         *
         * @example ABC_5698521931
         */
        clientNumber: string;
        /**
         * @description Client type.
         *
         *     | **Possible values** 	| **Description**       	|
         *     |---------------------	|-----------------------	|
         *     | PNR                 	| Private NonResident   	|
         *     | PR                  	| Private Resident      	|
         *     | CR                  	| Corporate Resident    	|
         *     | CNR                 	| Corporate NonResident 	|
         *
         *     Notes:
         *       * The field cannot be freely used because the client type has an impact on many CMS internal procedures. The Issuer must always agree with the MP which value should be used (in most cases "PR" is the default value)
         *       * Please contact the MP representative should a value different than "PR" be needed, as using it requires configuration on the MP's side.
         *
         * @example PR
         */
        clientType: string;
        /**
         * Format: date
         * @description Date of client expiration (YYYY-MM-DD format). When the date is met in the MP's CMS, the Issuer will not be able to create new account contracts or new cards for the client.
         *
         * @example 2029-06-25
         */
        clientExpiryDate: string;
        /**
         * Format: int64
         * @description Contract record id from MP's CMS database.
         *
         * @example 70001
         */
        contractId: number;
        /**
         * @description Contract name.
         *
         * @example Contract name
         */
        contractName: string;
        /**
         * @description Contract's level in contract hierarchy.
         *     This field informs about the contract level and about the sequence number of the contract in the level.
         *
         *     For example, if there is one account contract with two card contracts system will assign:
         *       * . - for account contract
         *       * .1. - for 1st card contract
         *       * .2. - for 2nd card contract
         *
         *     If there is one account contract with two subaccount contracts with card contracts created under subaccounts system will assign:
         *       * . - for top account contract
         *       * .1. - for 1st subaccount contract
         *       * .1.1. - for 1st card contract
         *       * .1.2. - for 2nd card contract
         *       * .2. - for 2nd subaccount contract
         *       * .2.1. - for 1st card contract
         *       * .2.2. - for 2nd card contract
         *       * .2.3. - for 3rd card contract
         *
         * @example .
         */
        contractLevel: string;
        /**
         * Format: int64
         * @description Account's unique technical identifier from the MP's CMS database, which represents a parent account. The field is empty when an account is a top account. Non-empty value means the account has been created as a sub-account.
         *
         * @example 31412211
         */
        parentAccountContractId: number;
        /**
         * Format: int64
         * @description Unique technical identifier for an account contract generated by the MP's CMS.
         *     The identifier is generated when the account contract creation finishes successfully and is returned in the account contract creation response (`POST /accounts`).
         *
         * @example 60001
         */
        accountContractId: number;
        /**
         * @description Account contract identifier generated by the Issuer's CBS system (Core Banking System).
         *     The identifier is stored in the MP's CMS system so that the Issuer can distinguish between their accounts.
         *
         *     `accountContractNumber` should be prefixed with a unique Issuer designation, for example "ABC_", as it must be unique in the MP's CMS.
         *
         *     Note: The Issuer designation "ABC_" is configured in the MP's CMS and the Issuer is allowed to use only the value agreed with the MP.
         *
         * @example ABC_121235694296313
         */
        accountContractNumber: string;
        /**
         * @description Account contract name set by the Issuer.
         *
         * @example North Division Account
         */
        accountContractName: string;
        /**
         * Format: int64
         * @description Unique technical card contract identifier generated by the MP's CMS.
         *     The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
         *
         * @example 70001
         */
        cardContractId: number;
        /**
         * @description The card contract number represents the Primary Account Number (PAN). A PAN usually consists of 16 digits:
         *       * The first six digits are the Bank Identification Number (BIN): a unique number within the payment organization (Mastercard, VISA)
         *       * The following nine digits are the contract identification number, which can be generated randomly
         *       * The last digit is a Luhn check digit.
         *
         *     The Issuer may enter a PAN number generated by themselves or leave the field empty: in such case, the MP's CMS will generate a PAN number on behalf of the Issuer.
         *
         *     To generate a PAN, the MP's CMS must be configured with BIN ranges for a given card product.
         *
         * @example 535555______5312
         */
        cardContractNumberForReissue: string;
        /**
         * @description The card contract number represents the Primary Account Number (PAN). A PAN usually consists of 16 digits:
         *       * The first six digits are the Bank Identification Number (BIN): a unique number within the payment organization (Mastercard, VISA)
         *       * The following nine digits are the contract identification number, which can be generated randomly
         *       * The last digit is a Luhn check digit.
         *
         *     The Issuer may enter a PAN number generated by themselves or leave the field empty: in such case, the MP's CMS will generate a PAN number on behalf of the Issuer.
         *
         *     To generate a PAN, the MP's CMS must be configured with BIN ranges for a given card product.
         *
         * @example 1234567890123456
         */
        cardContractNumberForCreation: string;
        /**
         * @description The card contract number represents a Primary Account Number (PAN). A PAN usually consists of 16 digits:
         *       * The first six digits are the Bank Identification Number (BIN): a unique number within the payment organization (Mastercard, VISA)
         *       * The following nine digits are the contract identification number, which can be generated randomly
         *       * The last digit is a Luhn check digit.
         *
         *     The card contract number can be returned:
         *       * unmasked - with a full PAN visible
         *       * masked - with a full PAN masked according to the defined mask (a mask pattern is agreed with the Issuer and configured in the MP API)
         *
         * @example 123456______3456
         */
        cardContractNumber: string;
        /**
         * @description Card contract name. Free text field.
         *
         * @example Card contract name
         */
        cardContractName: string;
        /**
         * @description Card expiry date (YYMM format).
         *
         * @example 3004
         */
        cardExpiryDate: string;
        /**
         * @description New card expiry date (YYMM format).
         *
         * @example 3004
         */
        newCardExpiryDate: string;
        /**
         * @description Card expiry date (YYMM format).
         *
         *     The Issuer may pass their own expiry date in a card creation request, in such case the MP will set the value passed in a card creation request on the first *card plastic* which will be created under newly created card contract.
         *
         *     If the Issuer does not provide their own expiry date, the MP will generate an expiry date on behalf of the Issuer.
         *
         * @example 3004
         */
        cardExpiryDateForCreation: string;
        /**
         * Format: int64
         * @description Technical identifier of a card plastic record in the MP's CMS.
         *
         * @example 2188792
         */
        plasticId: number;
        /**
         * @description The sequence number of a `Plastic`, created under the given card contract.
         *     Every new `Plastic` created has the next number in a sequence following previous card plastics.
         *
         * @example 2
         */
        plasticSequenceNumber: string;
        /**
         * Format: date
         * @description For authorization documents - authorization request processing date,
         *     for financial documents - macrotransaction processing date (YYYY-MM-DD format).
         *
         * @example 2031-06-25
         */
        postingDate: string;
        /**
         * Format: int64
         * @description Response code, which, together with posting status field value, shows the transaction posting results.
         *
         *      -------------------------------------------------------------
         *     | `responseCode`        | `responseCodeDescription`           |
         *     |-----------------------|-------------------------------------|
         *     | 0   | Successfully completed
         *     | 1   | Refer to card issuer
         *     | 2   | Refer to card issuer's special condition
         *     | 3   |  Invalid merchant / source
         *     | 4   |  PICK UP
         *     | 5   |  Do not Honour
         *     | 6   |  Error
         *     | 7   |  Pick-up card, special condition
         *     | 8   |  Honour with identification
         *     | 9   |  Request in progress
         *     | 10  |  Approved for partial amount
         *     | 11  |  Approved (VIP)12  Invalid transaction
         *     | 13  |  Invalid amount
         *     | 14  |  No such card
         *     | 15  |  No such issuer
         *     | 16  |  Approved, update track 3
         *     | 17  |  Customer cancellation
         *     | 18  |  Customer dispute
         *     | 19  |  Re-enter transaction
         *     | 20  |  Invalid response
         *     | 21  |  No action taken
         *     | 22  |  Suspected malfunction
         *     | 23  |  Unacceptable transaction fee
         *     | 24  |  File update not supported by receiver
         *     | 25  |  No such record
         *     | 26  |  Duplicate record update, old record replaced
         *     | 27  |  File update field edit error
         *     | 28  |  File locked out while update
         *     | 29  |  File update error, contact acquirer
         *     | 30  |  Format error
         *     | 31  |  Issuer signed-off
         *     | 32  |  Completed partially
         *     | 33  |  Pick-up, expired card
         *     | 34  |  Suspect Fraud
         *     | 35  |  Pick-up, card acceptor contact acquirer
         *     | 36  |  Pick up, card restricted
         *     | 37  |  Pick up, call acquirer security
         *     | 38  |  Pick up, Allowable PIN tries exceeded
         *     | 39  |  No credit account
         *     | 40  |  Requested function not supported
         *     | 41  |  Pick up, lost card
         *     | 42  |  No universal account
         *     | 43  |  Pick up, stolen card
         *     | 44  |  No investment account
         *     | 45  |  Reserved for ISO use
         *     | 46  |  Contract closed
         *     | 47  |  Reserved for ISO use
         *     | 48  |  Reserved for ISO use
         *     | 49  |  Reserved for ISO use
         *     | 50  |  Do not renew
         *     | 51  |  Not sufficient funds
         *     | 52  |  No cheque account
         *     | 53  |  No savings account54  Expired card / target
         *     | 55  |  Incorrect PIN
         *     | 56  |  No card record
         *     | 57  |  Transaction not permitted to cardholder
         *     | 58  |  Transaction not permitted to terminal
         *     | 59  |  Suspected fraud
         *     | 60  |  Card acceptor contact acquirer
         *     | 61  |  Exceeds withdrawal amount limit
         *     | 62  |  Restricted card
         *     | 63  |  Security violation
         *     | 64  |  Wrong original amount
         *     | 65  |  Exceeds withdrawal frequency limit
         *     | 66  |  Call acquirers security department
         *     | 67  |  Card to be picked up at ATM
         *     | 68  |  Response received too late
         *     | 69  |  Reserved
         *     | 70  |  Invalid transaction; contact card issuer
         *     | 71  |  Decline PIN not changed
         *     | 72  |  Reserved
         *     | 73  |  Reserved
         *     | 74  |  Reserved
         *     | 75  |  Allowable number of PIN tries exceeded
         *     | 76  |  Wrong PIN, number of PIN tries exceeded
         *     | 77  |  Wrong Reference No.
         *     | 78  |  Record Not Found
         *     | 79  |  Already reversed
         *     | 80  |  Network error
         *     | 81  |  Foreign network error / PIN cryptographic error
         *     | 82  |  Time-out at issuer system / Bad CVV (VISA)
         *     | 83  |  Transaction failed
         *     | 84  |  Pre-authorization timed out
         *     | 85  |  No reason to decline
         *     | 86  |  Unable to validate PIN
         *     | 87  |  Purchase Approval Only
         *     | 88  |  Cryptographic failure
         *     | 89  |  Authentication failure
         *     | 90  |  Cutoff is in progress
         *     | 91  |  Issuer or switch is inoperative
         *     | 92  |  Unable to route at acquirer module
         *     | 93  |  Cannot be completed, violation of law
         *     | 94  |  Duplicate Transmission
         *     | 95  |  Reconcile error / Auth Not found
         *     | 96  |  System Malfunction
         *     | 97  |  Reserved
         *     | 98  |  Reserved
         *     | 99  |  Reserved
         *     | 101  |  Chain not found
         *     | 102  |  Incorrect Chain
         *     | 103  |  Multiple Adjustment
         *     | 111  |  Card BIN not on file
         *     | 112  |  Card type not in service for this device
         *     | 113  |  Invalid operation for this card
         *     | 115  |  Requested function not supported
         *     | 117  |  Suspicious Transaction
         *     | 119  |  Card BIN not in service for this device
         *     | 120  |  Card not in service for this device
         *     | 121  |  Repeat
         *     | 122  |  Previous doc not found
         *     | 123  |  Invalid reversal amount
         *     | 124  |  Capture period expired
         *     | 125  |  Invalid capture amount
         *     | 126  |  Invalid PIN block format
         *     | 128  |  No communication keys available for use
         *     | 129  |  Operation key buffer error
         *     | 130  |  Invalid Terminal ID
         *     | 131  |  Wrong Transaction Attributes
         *     | 132  |  Unmatched Transaction Condition
         *     | 133  |  The transaction has already been reversed
         *     | 140  |  Field 39 in response is absent
         *     | 141  |  Unexpected Field 39 received
         *     | 142  |  Destination Channel has deceased
         *     | 143  |  Check request declined by Billing Channel
         *     | 144  |  Payment request declined by Billing Channel
         *     | 145  |  Credit authorization declined
         *     | 146  |  Card not In service for international transfers
         *     | 147  |  Transaction declined by Terminal
         *     | 148  |  Tokenization is unavailable for card
         *     | 149  |  Invalid Resolution Method ID
         *     | 160  |  Device Hardware/Software Error
         *     | 161  |  Wrong device status
         *     | 162  |  Unknown status message
         *     | 163  |  HSM Response error
         *     | 164  |  Command rejected by device
         *     | 165  |  Authorization System malfunction
         *     | 166  |  Command aborted
         *     | 167  |  ISO Log Insert Error
         *     | 168  |  Field Mapper internal Error
         *     | 169  |  Limit not setup
         *     | 170  |  Message Authentication Key not defined
         *     | 171  |  Message Authentication Field Missing
         *     | 172  |  MAC verification Error
         *     | 173  |  MAC Generation error
         *     | 174  |  Security Hardware/Software error
         *     | 175  |  Security Module Channel Timeout
         *     | 176  |  Link is inactive. Device is not connected
         *     | 177  |  Device is not in transaction
         *     | 178  |  Device is already in transaction
         *     | 179  |  Device response timed out
         *     | 180  |  Amount is too small. Dispense not possible
         *     | 181  |  Amount is too big. Dispense not possible
         *     | 182  |  Amount has cent's
         *     | 183  |  Dispense not possible
         *     | 185  |  Invalid authorization amount
         *     | 188  |  The Cardholder has not taken MONEY
         *     | 189  |  Non working time for this device
         *     | 190  |  Device not configured or not valid
         *     | 191  |  Device contract not valid
         *     | 192  |  Device not on file
         *     | 193  |  Requested operation not on file for this device
         *     | 194  |  Operation is disabled for this device
         *     | 195  |  Currency is not available for device
         *     | 196  |  Internal System Malfunction
         *     | 198  |  Track 2 Format Error
         *     | 199  |  PIN Block Conversion Error
         *     | 200  |  The Cardholder has not taken his Card
         *     | 201  |  Device is connected to another controller
         *     | 203  |  Source contract expired
         *     | 214  |  Merchant card is not on file
         *     | 240  |  Instalments not supported
         *     | 241  |  Over than maximum supported amount for instalments
         *     | 242  |  Less than minimum supported amount for instalments
         *     | 243  |  Over maximum supported instalments
         *     | 244  |  Below minimum supported instalments
         *     | 245  |  Over maximum gratuity months
         *     | 246  |  Below minimum gratuity months
         *     | 247  |  Recurring not available
         *     | 248  |  Invalid Recurring parameters
         *     | 249  |  Unsupported Recurring operation
         *     | 254  |  Merchant card expired
         *     | 257  |  Merchant card contract has not been approved
         *     | 258  |  Device contract is not on file
         *     | 261  |  Device amount limits exceeded
         *     | 262  |  Rejected Some Documents in this Batch
         *     | 263  |  Wrong Invoice Party
         *     | 265  |  Device frequency limits exceeded
         *     | 270  |  CAT transaction is not compatible with MCC 6011
         *     | 271  |  Transaction attributes for chip card are present but Service Code not belongs to Integrated Circuit Card
         *     | 361  |  Merchant card amount limits exceeded
         *     | 365  |  Merchant card frequency limits exceeded
         *     | 405  |  Strong Customer Authentication Required
         *     | 457  |  CashBack disabled
         *     | 461  |  Exceeds CashBack amount limit
         *     -------------------------------------------------------------------
         *
         * @example 0
         */
        responseCode: number;
        /**
         * @description Description of the transaction response code.
         *
         * @example Successfully completed
         */
        responseCodeDescription: string;
        /**
         * Format: int64
         * @description Source contract identifier. Contract record ID from MP's CMS database.
         *
         * @example 70001
         */
        sourceContractId: number;
        /**
         * Format: int64
         * @description Target contract identifier. Contract record ID from MP's CMS database.
         *
         * @example 54023689
         */
        targetContractId: number;
        /**
         * Format: int64
         * @description Unique identifier of the document record in the CMS database.
         *
         * @example 90001
         */
        transactionId: number;
        /**
         * @description Merchant category code according to Visa rules (Merchant Category Code, MCC) or Mastercard rules (Standard Industry Code, SIC).
         *
         *     MCC consists of four digits and it's listed in ISO 18245 for retail financial services.
         *     Merchant Category Code (MCC) is used to classify merchants in types (i.e. one MCC is for hotels, one for automated fuel dispensers)
         *     or more specifically by merchant name (i.e. car rentals or airlines).
         *
         * @example 6011
         */
        mcc: string;
        /**
         * @description Merchant category description according to Visa rules (Merchant Category Code, MCC) or MasterCard rules (Standard Industry Code, SIC).
         *
         * @example 6011 ATM
         */
        mccDescription: string;
        /**
         * @description Three-letter country code (format according to ISO-3166, alpha-3 specification).
         *
         * @example USA
         */
        merchantCountry: string;
        /**
         * @description Terminal city, in other case value is null.
         *
         * @example BERLIN
         */
        merchantLocation: string;
        /**
         * @description Name of the retail outlet where the transaction was performed.
         *
         * @example DESC
         */
        merchantName: string;
        /**
         * @description Card contract status code. The codes are configured in the MP's CMS for each Issuer.
         *
         *     Generic solution allows the following codes:
         *     | **Possible values** 	| **Description**                                                                  	|
         *     |---------------------	|----------------------------------------------------------------------------------	|
         *     | 00                  	| Card is active and ready for use                                                 	|
         *     | 04                  	| Used for cards blocked due to Issuer's reasons (permanent status)                	|
         *     | 05                  	| Card does not honour (temporary status)                                          	|
         *     | 14                  	| Final state of card's lifecycle (permanent status). Set automatically by the CMS 	|
         *     | 41                  	| Card was lost (permanent status)                                                 	|
         *     | 43                  	| Card was stolen (permanent status)                                               	|
         *     | 57                  	| Card was deactivated on Issuer's request (permanent status)                      	|
         *     | 59                  	| Suspected fraud (temporary status). Usually set on Issuer's request              	|
         *
         *     *Disclaimer: please contact the MP representative should other codes be necessary.*
         *
         * @example 00
         */
        cardContractStatusCode: string;
        /**
         * @description Account contract status. The full list will be defined by the Issuer and MP during the onboarding process as they must be configured in the CMS.
         *
         *     The generic solution allows the following account contract statuses:
         *     | **Possible values** 	| **Description**                                                                     	|
         *     |---------------------	|-------------------------------------------------------------------------------------	|
         *     | 00                  	| Account contract is active and ready for use                                        	|
         *     | 00c                 	| Account contract closure procedure was initiated and is ongoing (transition period) 	|
         *     | 14                  	| Final stats of account contract's lifecycle. Set automatically by the CMS           	|
         *
         *     *Disclaimer: please contact the MP representative should other codes be necessary.*
         *
         * @example 00
         */
        accountContractStatusCode: string;
        /**
         * @description Card contract status name. Name assigned in the CMS system to the `statusCode`.
         *
         * @example Card OK
         */
        cardContractStatusName: string;
        /**
         * @description Account contract status name. Name assigned in the CMS system to the `statusCode`.
         *
         * @example Account OK
         */
        accountContractStatusName: string;
        /**
         * @description Contract status code agreed with the Issuer according to the external system requirements.
         *     The MP's CMS configuration allows many external status codes to be assigned to the same `statusCode`.
         *
         * @example 00
         */
        externalStatusCode: string;
        /**
         * @description External status name.
         *
         * @example Card OK
         */
        cardContractExternalStatusName: string;
        /**
         * @description External status name.
         *
         * @example Account OK
         */
        accountContractExternalStatusName: string;
        /**
         * @description Main Product Code.
         *
         * @example ACCOUNT_EUR
         */
        mainProductCode: string;
        /**
         * @description Product code of the parent contract.
         *
         * @example ACC_EUR
         */
        parentProductCode: string;
        /**
         * @description Contract's own blocked amount, which has not been unblocked yet - not including blocked amount on additional cards.
         *
         *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
         *
         * @example 751.28
         */
        blockedAmount: number;
        /**
         * @description Usually field presents the contract's credit limit available for a specific contract itself.
         *
         *     Only in specific product configuration ('SeeMain' authorization scenario configured in the CMS), the field will show credit limit of the parent contract.
         *
         *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
         *
         * @example 1231.78
         */
        creditLimit: number;
        /**
         * @description Type of relation with an upper-level Liability contract (if any).
         *
         *     | **Possible values** 	| **Description**    	|
         *     |---------------------	|--------------------	|
         *     | A                   	| Only Check Balance 	|
         *     | N                   	| Affiliated         	|
         *     | R                   	| Reporting          	|
         *     | Y                   	| Full Liability     	|
         *
         * @example Y
         */
        liabilityCategory: string;
        /**
         * Format: int64
         * @description PIN attempts counter.
         *
         * @example 55
         */
        pinAttemptsCounter: number;
        /**
         * Format: int64
         * @description Maximum number of PIN attempts.
         *
         * @example 55
         */
        maxPinAttempts: number;
        /**
         * @description Branch code under which a contract (an account contract or a card contract) has been created on the Issuer's side and which has been passed in a contract creation request. (`POST /accounts` or `POST /cards`). The value can be later used by the Issuer for reporting purposes.
         *
         * @example BRANCH_A
         */
        branchCode: string;
        /**
         * @description Branch name (assigned to the branch code).
         *
         * @example Branch A
         */
        branchName: string;
        /**
         * @description Contract identifier (for an account contract or a card contract) generated on the Issuer's side and passed to the MP's CMS in the contract creation request. (`POST /accounts` or `POST /cards`).
         *
         * @example CBS83863371812033
         */
        cbsNumber: string;
        /**
         * @description The field defines the subtype code of a contract. The value should be set only for products (an account contract or a card contract) for which a subtype definition is allowed.
         *
         *     *Disclaimer: `subtypeCode` is configured in the MP's CMS and the Issuer is allowed to use only the value configured by the MP (the Issuer cannot use their own values).*
         *
         * @example CA-p
         */
        subtypeCode: string;
        /**
         * @description Product code defines the configuration used for the contract creation (account or card). Product code is linked in the MP's CMS to certain parameters which define how a contract will be used (for example if it is a card contract or an account contract, a debit or a credit contract, etc.).
         *
         *     *Disclaimer: `productCode` is configured in the MP's CMS and the Issuer is allowed to use only the value configured by the MP (the Issuer cannot use their own value).*
         *
         *     In the standard product account `productCode` can be found in the Parametrization Workbook (PPW) in the *CD.1.3.003* and *CD.1.3.004* (in case of pre-embossed issuing mode).
         *
         * @example STD-DEBCH-EUR
         */
        accountProductCode: string;
        /**
         * @description Product code defines the configuration used for the contract creation (account or card). Product code is linked in the MP's CMS to certain parameters which define how a contract will be used (for example if it is a card contract or an account contract, a debit or a credit contract, etc.).
         *
         *     *Disclaimer: `productCode` is configured in the MP's CMS and the Issuer is allowed to use only the value configured by the MP (the Issuer cannot use their own value).*
         *
         *     In the standard product card `productCode` can be found in the Parametrization Workbook (PPW) in the *CD.1.4.005*.
         *
         * @example STD-MCDEBVF-EUR
         */
        cardProductCode: string;
        /**
         * @description Tag container name indicates where the custom tag will be stored. The values to choose from are fixed.
         *
         *     | **Possible values** 	|
         *     |---------------------	|
         *     | ADD_INFO_01         	|
         *     | ADD_INFO_02         	|
         *     | ADD_INFO_03         	|
         *     | ADD_INFO_04         	|
         *
         * @example ADD_INFO_01
         * @enum {string}
         */
        tagContainer: "ADD_INFO_01" | "ADD_INFO_02" | "ADD_INFO_03" | "ADD_INFO_04";
        /**
         * @description Tag name. The Issuer can specify any name representing some meaning to the client/contract object.
         *
         *     The tag name can be set by the Issuer, prior configuration of its name in the MP's CMS is not necessary.
         *
         *     The tag name should not contain characters ['=', ';', ' '].
         *
         * @example TAG_01
         */
        tagName: string;
        /**
         * @description Tag value. To clear a tag value, an empty value must be sent ('').
         *
         *     The tag value should not contain characters ['=', ';']
         *
         * @example TAG_01_VALUE
         */
        tagValue: string;
        /**
         * @description Flag informing if the tag should be removed from its container field.
         *
         * @example false
         */
        removeTag: boolean;
        /**
         * Format: date-time
         * @description Date and time of the most recent change to the object (YYYY-MM-DDThh:mm:ssZ format).
         *
         * @example 2019-06-25T12:51:30Z
         */
        amendmentDate: string;
        /**
         * Format: int64
         * @description Officer ID of the MP's CMS user who made the last change to the object.
         *
         * @example 14300
         */
        amendmentOfficerId: number;
        /**
         * @description Officer name of the MP's CMS user who made the last change to the object.
         *
         * @example John Smith
         */
        amendmentOfficerName: string;
        /**
         * Format: date
         * @description Date of the contract record creation in the MP's CMS (YYYY-MM-DD format).
         *
         * @example 2019-06-25
         */
        dateOpen: string;
        /**
         * @description Name of the product code used to create contract.
         *
         * @example Standard Debit Account
         */
        accountProductName: string;
        /**
         * @description Name of the product code used to create contract.
         *
         * @example Standard Mastercard Individual Debit Card
         */
        cardProductName: string;
        /**
         * Format: int64
         * @description Unique technical client identifier, generated by the MP's CMS database engine.
         *     The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`).
         *     When a client is assigned to a card contract in the card contract creation request, they become a cardholder and are authorized to perform transactions using the card.
         *
         * @example 41537005
         */
        cardholderId: number;
        /**
         * @description Client (cardholder) short name.
         *
         * @example Madley
         */
        cardholderShortName: string;
        /**
         * @description Free text describing the reason for status change.
         *
         * @example COMMENT
         */
        statusChangeReason: string;
        /**
         * @description Department accepting the creation request on the Issuer's side. The value can be later used by the Issuer for reporting purposes.
         *
         *     *Disclaimer: Please contact MP's representative should new values be required.*
         *     Available values will need to be agreed upon by the MP and the Issuer prior to the onboarding process as they need to be configured on the MP's side.
         *
         * @example Department
         */
        orderDepartment: string;
        /**
         * @description Service groups are an additional client and contract classifier.
         *     For example, according to additional classification, VIP clients can be distinguished as a separate group.
         *     Service groups can be used to configure various filters for viewing data or generating reports.
         *
         *     *Disclaimer: Please contact the MP representative should new values be required. Available values will need to be agreed upon by the MP and the Issuer prior to the onboarding process as they need to be configured on the MP's side.*
         *
         * @example 021
         */
        serviceGroupCode: string;
        /**
         * @description Address type. Additional addresses allow to store any address related to the client or the contract (account contract or card contract).
         *
         *     | **Default possible values** 	| **Description**             	|
         *     |-----------------------------	|-----------------------------	|
         *     | PIN                         	| PIN mailer delivery address 	|
         *     | STMT                        	| Statement delivery address  	|
         *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process as they are configured in the CMS system.*
         *
         * @example PIN
         */
        addressType: string;
        /**
         * @description First address line.
         *
         * @example Mrs. Alice Smith Apartment
         */
        addressLine1: string;
        /**
         * @description Second address line.
         *
         * @example 1c 213
         */
        addressLine2: string;
        /**
         * @description Third address line.
         *
         * @example Derrick Street
         */
        addressLine3: string;
        /**
         * @description Fourth address line.
         *
         * @example 2nd floor
         */
        addressLine4: string;
        /**
         * @description City.
         *
         * @example Boston
         */
        city: string;
        /**
         * @description Postal code. The MP's CMS will not validate the correctness of the postal code.
         *
         * @example 02130
         */
        postalCode: string;
        /**
         * @description State. The MP's CMS will not validate the correctness of the state name.
         *
         * @example MA
         */
        state: string;
        /**
         * @description Three-letter country code (format according to ISO-3166, alpha-3 specification).
         *
         * @example USA
         */
        country: string;
        /**
         * @description Client's email address. The MP's CMS will verify if the value contains the "@" character and will return an error if it does not.
         *     Requests without the "@" character in the `email` field will be rejected.
         *
         * @example johndoe@example.com
         */
        email: string;
        /**
         * @description First name.
         *
         * @example John
         */
        firstName: string;
        /**
         * @description Last name.
         *
         * @example Doe
         */
        lastName: string;
        /**
         * @description Public RSA key generated by a Customer (the Issuer). ASCII/UTF-8 string of characters 0-9,A-F (ASN.1 DER Public hex unpacked to string) or PEM concatenated Base64 without BEGIN and END lines.
         *
         *     The MP will use this key to additionally encrypt sensitive data sent by the MP to the Issuer in responses of the MP's API operations.
         *
         * @example 30820122300D06092A864886F70D01010105000382010F003082010A0282010100C98A4398C273D64ABDE2F654FE5C4B0423A789ACAD9F0FE6AB00A75ACF1C974FA35F7DF89560A950F5DC4F5915C6615DA1055BD28C7C32E99191C8CDB67AB7C410DAC0B37CB545D9D2A07677A4DE4BE51529343300AE5B2790067EA885AE485A3A40E6F9C62311109562766634D7F816F9F4A4ACF9791ED281A0FF550D10C8A213F52D9DAB3E5472A3BEFFC5B8E5528BE5B9C853DF5EE95C891CD956E80737CDAC5E48B756524F2EB15AA6DCFD966FD39C58BCA9D1BE37D97EA19FC33483AE9DDE0536D61CBA12C6D1F757110A3531A9543812482CDC200F93EEDA2AC4D492B76560EB7094F90CE8A273D3623A8389FBF5F8F1B17990F1B9EB876C17C3CC2EC50203010001
         */
        customerPublicRsaKey: string;
        /**
         * Format: int64
         * @description Installment chain identifier.
         *
         * @example 261983
         */
        installmentChainId: number;
        /**
         * @description Status of installment plan.
         *
         *     | **Possible values**  	|
         *     |----------------------	|
         *     | Waiting              	|
         *     | Inactive             	|
         *     | Preview              	|
         *     | Preview Closed       	|
         *     | Open                 	|
         *     | Partially Paid       	|
         *     | Overdue              	|
         *     | Paid                 	|
         *     | Closed               	|
         *     | Written Off          	|
         *     | Revised              	|
         *     | Waived               	|
         *     | Not Ready            	|
         *     | Moved                	|
         *     | Rejected             	|
         *     | Simulated            	|
         *     | External             	|
         *     | Corrected            	|
         *     | Outstanding          	|
         *     | Complete Outstanding 	|
         *
         * @example Inactive
         */
        installmentPlanStatus: string;
        /**
         * Format: int64
         * @description Number of billing cycle. Starting from 0. Increased by 1 for every new billing cycle.
         *
         * @example 1
         */
        billingCycleNumber: number;
        /**
         * @description Classifier code.
         *
         *     *Disclaimer: Classifiers are preconfigured in the MP's CMS system. A list of possible classifier codes will be defined during the onboarding process as they are a part of product configuration in the MP's CMS.*
         *
         * @example TEST_CLASSIFIER_01
         */
        classifierCode: string;
        /**
         * @description Classifier value.
         *
         *     *Disclaimer: Classifiers are preconfigured in the MP's CMS system. A list of possible classifier values will be defined during the onboarding process as they are a part of product configuration in the MP's CMS.*
         *
         * @example VALUE_1A
         */
        classifierValue: string;
        /**
         * @description Parameter code.
         *
         *     *Disclaimer: Parameters are preconfigured in the MP's CMS system. A list of possible parameter codes will be defined during the onboarding process as they are a part of product configuration in the MP's CMS.*
         *
         * @example TEST_PARAMETER_01
         */
        parameterCode: string;
        /**
         * @description Parameter value.
         *
         *     *Disclaimer: Parameters are preconfigured in the MP's CMS system. A list of possible parameter values will be defined during the onboarding process as they are a part of product configuration in the MP's CMS.*
         *
         * @example 45
         */
        parameterValue: string;
        /**
         * @description The technical attribute used in the Workbench (CMS GUI) screens.
         *
         *     | **Possible values** 	|
         *     |---------------------	|
         *     | N                   	|
         *     | Y                   	|
         *
         * @example N
         */
        leaf: string;
        /**
         * @description The code of the balance type.
         *
         *     *Disclaimer: Balance type codes are configured in the MP's CMS.*
         *
         * @example AVAILABLE
         */
        contractBalanceCode: string;
        /**
         * @description Account balance at the beginning of the billing cycle.
         *
         *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
         *
         * @example 0
         */
        billingStartBalance: number;
        /**
         * @description Index of a public RSA key used for initiateDigitizationData encryption. A value is received from the MP in the response of `GET /public-keys` (API operation: `getPublicRsaKey`).
         *
         * @example A1564386531162
         */
        keyIndex: string;
        /**
         * @description Used to ensure idempotency for the PATCH methods.
         *     This header should be populated with an `ETag` received in the response header from the GET call of the same resource being updated.
         *     See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for more details.
         *
         * @example "7fedf39c3c2952a62821de4b480d1d6f"
         */
        ifMatch: string;
        /**
         * @description Authorization code.
         *
         * @example 179651
         */
        authorizationCode: string;
        /**
         * @description 12-digit Retrieval Reference Number.
         *
         * @example 212357021766
         */
        rrn: string;
        /**
         * @description Source Registration Number.
         *
         * @example 122357012766
         */
        srn: string;
        /**
         * Format: int32
         * @description The number of items that are in this offset batch.
         *
         * @example 1
         */
        paginationCount: number;
        /**
         * Format: int32
         * @description The number of items the list has been limited to.
         *
         * @example 1
         */
        paginationLimit: number;
        /**
         * Format: int64
         * @description The number of items the start of the list has been offset from.
         *
         * @example 0
         */
        paginationOffset: number;
        /**
         * Format: int64
         * @description The total number of items that are in the entire collection.
         *
         * @example 15
         */
        paginationTotal: number;
        /**
         * Format: date
         * @example 2021-06-25
         */
        date: string;
        /**
         * @description The code of usage limit configured in the MP's CMS. Usage limit code defines the type of usage limit.
         *
         * @example DAILY_TOTAL
         */
        usageLimitCode: string;
        CardContractCreation: {
            accountContractId: components["schemas"]["accountContractId"];
            clientId?: components["schemas"]["clientId"];
            cardContract: components["schemas"]["CardContractData"];
            /** @description Contract custom data allow the Issuer to pass specific contract tags during the creation request.
             *     The tags may represent Issuer-specific field names and values, not available as separate, dedicated fields.
             *     The Issuer can specify a tag name and its value.
             *
             *     Custom data tags are stored in fixed containers (four containers are available) in a TAG=VALUE; format
             *     (for example: CATEGORY=A;GROUP=G1;).
             *
             *     Each container has a length of 255 characters.
             *      */
            cardContractCustomData?: components["schemas"]["CustomDataTag"][];
        };
        /** @description Card basic information. */
        CardContractData: {
            branchCode?: components["schemas"]["branchCode"];
            cardContractNumber?: components["schemas"]["cardContractNumberForCreation"];
            cardContractName?: components["schemas"]["cardContractName"];
            cardSubtypeCode?: components["schemas"]["subtypeCode"];
            cbsNumber?: components["schemas"]["cbsNumber"];
            /**
             * @description Contract currency (format according to ISO 4217, alphanumeric code).
             *     Must be set for a product which references several account schemes in different currencies, otherwise, it will be ignored.
             *
             * @example EUR
             */
            currency?: string;
            embossedData?: components["schemas"]["EmbossedData"];
            cardExpiryDate?: components["schemas"]["cardExpiryDateForCreation"];
            productCode: components["schemas"]["cardProductCode"];
            productionCode?: components["schemas"]["productionCode"];
        };
        CardContractIdentifier: {
            cardContractId?: components["schemas"]["cardContractId"];
        };
        /** @description Data embossing is used by the Issuer to specify what text shall be embossed on the physical card. Data embossing in the MP's CMS can be specified at the **client level** and at the **card contract level**. Once a card contract is created, the MP's CMS executes the card personalization process which produces data required for physical card production. The following rules apply:
         *       * If both places (client's embossed data and card's embossed data) are filled, then the personalization process takes the values from the card contract.
         *       * If the client's embossed data are not filled and a card contract creation request is being processed without data embossing passed, then the MP's CMS will not allow to create a card contract – a creation request will be rejected with proper information.
         *       * The MP's CMS creates two printed lines based on four embossing fields:
         *         * 1st printed line: `title` + space + `firstName` + space + `lastName`,
         *         * 2nd printed line: `companyName`
         *       * The `lastName` field must always be filled for card production. In the special case when a client wishes to store only the company name, it must be placed in the `lastName` field instead of the `companyName` field.
         *       * The MP's CMS validates the length of printed lines and allows only a limited number of characters:
         *         * 1st printed line:
         *
         *             Length for the `title`, `firstName` and `lastName` combined is set by default to 26 (the system also counts the spaces between the fields, so for example `firstName`=’Adam’, `lastName`=’Smith’ will have a total length of 10, not 9).
         *         * 2nd printed line:
         *
         *             The length for the `companyName` field is set by default to 26.
         *
         *       * The MP's CMS allows to pass in data embossing only a limited set of characters (by default, only capital letters are allowed), as they have to be printed on the physical card using a standard font (default values are already configured). The MP's CMS validates the characters sent by the Issuer against the permitted ones. In case a passed character is not permitted, proper information will be returned and the request will be rejected.
         *
         *       *Disclaimer: Please contact the MP representative should other embossed characters be required. The available set of characters will need to be agreed by the MP and the Issuer prior to the onboarding process as it needs to be configured on the MP's side.*
         *      */
        EmbossedData: {
            /**
             * @description Company name to be embossed.
             *
             * @example COMPANY
             */
            companyName?: string;
            /**
             * @description First name to be embossed.
             *
             * @example JOHN
             */
            firstName?: string;
            /**
             * @description Last name to be embossed.
             *
             * @example DOE
             */
            lastName?: string;
            /**
             * @description Client's title to be embossed.
             *
             *     | **Possible values (default)** 	|
             *     |-------------------------------	|
             *     | MR                            	|
             *     | MRS                           	|
             *     | MISS                          	|
             *
             *     *Disclaimer: Please contact the MP representative should other values be required. Available values will need to be agreed by the MP and the Issuer prior to the onboarding process as they need to be configured on the MP's side.*
             *
             * @example MR
             */
            title?: string;
        };
        CustomDataTags: components["schemas"]["CustomDataTag"][];
        CustomDataTag: {
            removeTag?: components["schemas"]["removeTag"];
            tagContainer: components["schemas"]["tagContainer"];
            tagName: components["schemas"]["tagName"];
            tagValue?: components["schemas"]["tagValue"];
        };
        TransactionCustomData: {
            /**
             * @description Tag name. Tag name should not contain characters ['=', ';', ' ']
             *
             * @example TAG_NAME_1
             */
            tagName: string;
            /**
             * @description Tag value. Tag value should not contain characters ['=', ';']
             *
             * @example TAG_VALUE_A
             */
            tagValue: string;
        };
        CustomDataTagValue: {
            tagContainer: components["schemas"]["tagContainer"];
            tagName: components["schemas"]["tagName"];
            tagValue?: components["schemas"]["tagValue"];
        };
        /** @description A top level object of errors. */
        ErrorWrapper: {
            Errors: components["schemas"]["Errors"];
        };
        /** @description An object that contains a list of errors. */
        Errors: {
            Error: components["schemas"]["ErrorList"];
        };
        /** @description A list of errors. */
        ErrorList: components["schemas"]["Error"][];
        /** @description A single error. */
        Error: {
            /**
             * @description The application/component that generated this error.
             * @example MASTERCARD PROCESSING
             */
            Source?: string;
            /**
             * @description Reason code is a unique constant identifying the error case encountered during the request processing.
             *
             * @example OPERATION_DENIED
             */
            ReasonCode?: string;
            /**
             * @description User-friendly short description of the reasonCode.
             *
             * @example Operation <operationId> is disabled in your API configuration.
             */
            Description?: string;
            /**
             * @description Optional detailed description provides information about the data received and calculated during the request processing, to help the user with diagnosing errors.
             *
             * @example You must have permission to use this operation.
             */
            Details?: string;
            /**
             * @description Recoverable flag indicates whether this error will always be returned for this request or if retrying could change the outcome.
             *
             * @example false
             */
            Recoverable?: boolean;
        };
        CardContractModification: {
            cbsNumber?: components["schemas"]["cbsNumber"];
            cardContractName?: components["schemas"]["cardContractName"];
            embossedData?: components["schemas"]["EmbossedData"];
            /** @description Contract custom data allow the Issuer to pass specific contract tags during the creation request.
             *     The tags may represent Issuer-specific field names and values, not available as separate, dedicated fields.
             *     The Issuer can specify a tag name and its value.
             *
             *     Custom data tags are stored in fixed containers (four containers are available) in a TAG=VALUE; format (for example CATEGORY=A;GROUP=G1;).
             *
             *     Each container has a length of 255 characters.
             *      */
            cardContractCustomData?: components["schemas"]["CustomDataTag"][];
        };
        AccountContractCardContracts: {
            count: components["schemas"]["paginationCount"];
            limit: components["schemas"]["paginationLimit"];
            offset: components["schemas"]["paginationOffset"];
            total: components["schemas"]["paginationTotal"];
            /** @description List of `CardContractSummary`.
             *      */
            accountContractCardContracts: components["schemas"]["CardContractSummary"][];
        };
        CardContractSummary: {
            accountContractId: components["schemas"]["accountContractId"];
            accountContractNumber?: components["schemas"]["accountContractNumber"];
            baseCardContractStatusData?: components["schemas"]["BaseCardContractStatusData"];
            blockedAmount?: components["schemas"]["blockedAmount"];
            cardContractId: components["schemas"]["cardContractId"];
            cardContractName?: components["schemas"]["cardContractName"];
            cardContractNumber: components["schemas"]["cardContractNumber"];
            cardholderId: components["schemas"]["cardholderId"];
            cardholderShortName?: components["schemas"]["cardholderShortName"];
            cbsNumber?: components["schemas"]["cbsNumber"];
            creditLimit?: components["schemas"]["creditLimit"];
            /**
             * @description Card contract currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency?: string;
            /**
             * @description Card contract currency (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            currencyNumericCode?: string;
            dateOpen?: components["schemas"]["dateOpen"];
            liabilityCategory?: components["schemas"]["liabilityCategory"];
            mainProductCode?: components["schemas"]["mainProductCode"];
            parentProductCode?: components["schemas"]["parentProductCode"];
            productCode?: components["schemas"]["cardProductCode"];
            productName?: components["schemas"]["cardProductName"];
        };
        CardContractWithEncryptedCardContractNumber: components["schemas"]["CardContract"] & {
            /**
             * @description Unmasked card contract number (PAN) encrypted with the `Customer-Public-Rsa-Key`.  Field is returned if `Customer-Public-Rsa-Key` header is not empty.
             * @example 6742858EA388164FC1C687916E9D4A8F091BA7267A57B6B2DA5B4330126EFE71F9D01A85F536994DD01DEB57AF7BBEE6A45DB5608BC68AF055D78C0DFFBAAD27C743DA8D057B9A4DA685913074E902DD2584ABEA4058BF18BFD35EA493D0A40F96D9AC914FE43180DCCCEE11387FA0C1DB2D0C12E9D41796495A946EEE13A728470C1013DD4FB147841FC0D8622400F983E3AB78F0FA2EDF890A4AF99178A296A8B0E4C31BDB73929D445FE56AEFC16B6D30DA0A01ADB34768C66EE567026259B8745B7DEC9B0AF4C4EBB744EE5CCBA0D277461AA1DFE6557ABAA2C2DD67B1A02DF712C3B24B1745717B526FE753A7AEABE10088A1FAD9B7D946E41766F1F769
             */
            encryptedCardContractNumber?: string;
        };
        CardContract: {
            accountContractId: components["schemas"]["accountContractId"];
            accountContractNumber?: components["schemas"]["accountContractNumber"];
            amendmentDate?: components["schemas"]["amendmentDate"];
            amendmentOfficerId?: components["schemas"]["amendmentOfficerId"];
            amendmentOfficerName?: components["schemas"]["amendmentOfficerName"];
            /**
             * @description Available card balance.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1401.21
             */
            availableBalance?: number;
            blockedAmount?: components["schemas"]["blockedAmount"];
            branchCode?: components["schemas"]["branchCode"];
            branchName?: components["schemas"]["branchName"];
            cardExpiryDate?: components["schemas"]["cardExpiryDate"];
            cardContractId: components["schemas"]["cardContractId"];
            cardContractName?: components["schemas"]["cardContractName"];
            cardContractNumber: components["schemas"]["cardContractNumber"];
            cardContractStatusData?: components["schemas"]["CardContractStatusData"];
            cardholderId: components["schemas"]["cardholderId"];
            cardholderShortName?: components["schemas"]["cardholderShortName"];
            cbsNumber?: components["schemas"]["cbsNumber"];
            creditLimit?: components["schemas"]["creditLimit"];
            /**
             * @description Card contract currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency?: string;
            /**
             * @description Card contract currency (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            currencyNumericCode?: string;
            dateOpen?: components["schemas"]["dateOpen"];
            embossedData?: components["schemas"]["EmbossedData"];
            liabilityCategory?: components["schemas"]["liabilityCategory"];
            maxPinAttempts?: components["schemas"]["maxPinAttempts"];
            parentProductCode?: components["schemas"]["parentProductCode"];
            pinAttemptsCounter?: components["schemas"]["pinAttemptsCounter"];
            previousCardContractId?: components["schemas"]["previousCardContractId"];
            previousCardContractNumber?: components["schemas"]["previousCardContractNumber"];
            productCode?: components["schemas"]["cardProductCode"];
            productName?: components["schemas"]["cardProductName"];
            sequenceNumber?: components["schemas"]["plasticSequenceNumber"];
        };
        /**
         * Format: int64
         * @description Unique technical identifier of the previous card contract, generated for the current card contract by the MP's CMS.
         *     The identifier is generated when the previous card contract creation is successfully completed and is returned in a new card contract creation response. (`POST /cards`).
         *
         * @example 77691090
         */
        previousCardContractId: number;
        /**
         * @description The previous card contract number for the current card contract represents the Primary Account Number (PAN). PAN is usually composed of 16 digits:
         *       * The first six digits are the Bank Identification Number (BIN): a unique number within a payment organization (Mastercard, VISA)
         *       * The following nine digits: contract identification number, which can be generated randomly
         *       * The last digit is a Luhn check digit.
         *
         *     The card contract number can be returned:
         *       * unmasked - with a full PAN visible
         *       * masked - with a full PAN masked according to the defined mask (a mask pattern is agreed with the Issuer and configured in the MP API)
         *
         * @example 535773______2767
         */
        previousCardContractNumber: string;
        BaseCardContractStatusData: {
            externalStatusCode?: components["schemas"]["externalStatusCode"];
            externalStatusName?: components["schemas"]["cardContractExternalStatusName"];
            statusCode?: components["schemas"]["cardContractStatusCode"];
            statusName?: components["schemas"]["cardContractStatusName"];
        };
        CardContractStatusData: {
            /**
             * @description Card plastic production status.
             *
             *     | **Possible values**  	| **Description**                                                                                                           	|
             *     |----------------------	|---------------------------------------------------------------------------------------------------------------------------	|
             *     | Marked               	| The card is marked for production                                                                                         	|
             *     | Sent                 	| The card's data has been exported to the PIN Management module                                                            	|
             *     | Ready                	| The card's data has been imported from the PIN Management module                                                          	|
             *     | Locked               	| The card is locked; this corresponds to an issued but not activated card                                                  	|
             *     | Marked Applet        	| The smart card applet has been marked for production                                                                      	|
             *     | To Close             	| Do not issue plastic for this card contract. This status is used, for example, if the previous plastic was stolen or lost 	|
             *     | To Request           	| The smart card applet is ready to be sent to a third-party vendor                                                         	|
             *     | Waiting for Response 	| The smart card applet is waiting for a response from a third-party vendor                                                 	|
             *     | Waiting for Subs     	| The smart card is waiting for a response from a third-party vendor                                                        	|
             *
             * @example Ready
             */
            productionStatus?: string;
        } & components["schemas"]["BaseCardContractStatusData"];
        CardContractStatusWithReason: {
            reason?: components["schemas"]["statusChangeReason"];
            /**
             * @description Card status code. The codes are configured in the MP's CMS for each Issuer.
             *
             *     | **Possible values** 	| **Description**                                                                  	|
             *     |---------------------	|----------------------------------------------------------------------------------	|
             *     | 00                  	| Card is active and ready for use                                                 	|
             *     | 04                  	| Used for cards blocked due to Issuer's reasons (permanent status)                	|
             *     | 05                  	| Card does not honour (temporary status)                                          	|
             *     | 41                  	| Card was lost (permanent status)                                                 	|
             *     | 43                  	| Card was stolen (permanent status)                                               	|
             *     | 57                  	| Card was deactivated on Issuer's request (permanent status)                      	|
             *     | 59                  	| Suspected fraud (temporary status). Usually set on Issuer's request              	|
             *
             *      *Disclaimer: Please contact the MP representative in case other status codes are necessary.*
             *
             * @example 00
             */
            statusCode: string;
        };
        CardContractActivation: {
            /**
             * @description This field must be always `true`. Executing this action will unblock the `Plastic` of the card contract and allow the card to be used for transactions.
             *     Card contract will be activated (status of the `Plastic` will be changed to `Active`).
             *
             * @example true
             */
            activated: boolean;
        };
        ClientCardContracts: {
            count: components["schemas"]["paginationCount"];
            limit: components["schemas"]["paginationLimit"];
            offset: components["schemas"]["paginationOffset"];
            total: components["schemas"]["paginationTotal"];
            /** @description List of `CardContract`.
             *      */
            clientCardContracts: components["schemas"]["CardContract"][];
        };
        Plastic: {
            cardContractId: components["schemas"]["cardContractId"];
            cardContractNumber: components["schemas"]["cardContractNumber"];
            cardExpiryDate?: components["schemas"]["cardExpiryDate"];
            /**
             * @description Name of a chip scheme used to create a physical card. For smart cards (cards with a chip), the chip scheme defines a set of transaction limiters saved in the chip memory during the card personalization (physical production).
             *
             * @example BNK ADVANCE DEBIT
             */
            chipScheme?: string;
            /**
             * @description Client company name (free text field).
             *
             * @example Company
             */
            companyName?: string;
            /**
             * Format: date
             * @description Start date of a card's effective period (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            effectiveDate?: string;
            /**
             * @description Value embossed on a physical card.
             *
             * @example MR JOHN DOE
             */
            embossedName?: string;
            /**
             * @description Issuer's office that sent the card production order.
             *
             * @example Office A
             */
            orderSource?: string;
            /**
             * @description Issuer's office to which the issued card and a PIN mailer will be sent.
             *
             * @example Target Office
             */
            orderTarget?: string;
            /**
             * @description The name of a personalization file (a file sent to the personalization bureau).
             *
             *     Personalization files are generated by the MP. The process of file generation is executed by the MP several times per day, according to a defined schedule. All created cards marked for production are processed and placed in a personalization file.
             *
             * @example PM_REQ_0018__20200129_000003MDSDEU.xml
             */
            personalizationFileName?: string;
            plasticId: components["schemas"]["plasticId"];
            productionCode?: components["schemas"]["cardContractProductionCode"];
            /**
             * Format: date
             * @description Date of generating a card plastic personalization file (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            productionDate?: string;
            /**
             * @description | **Possible values** 	|
             *     |---------------------	|
             *     | Produce Card        	|
             *     | Replace Card        	|
             *
             * @example Produce Card
             */
            productionEvent?: string;
            /**
             * @description Free text describing `productionCode`.
             * @example Replace All - Renew
             */
            productionReason?: string;
            /**
             * @description Card issuing method.
             *
             *     | **Possible values** 	| **Description**                                                                                                                    	|
             *     |---------------------	|------------------------------------------------------------------------------------------------------------------------------------	|
             *     | Replace All         	| A new card will be issued and a PIN mailer will be printed, e.g. when a new card is issued or a stolen card is replaced.           	|
             *     | Replace Plastic     	| Only a card will be issued, e.g. to replace an expired card.                                                                       	|
             *     | Reorder PIN         	| A new PIN will be issued.                                                                                                          	|
             *     | Replace CVV         	| A card with a new CVV value will be issued.                                                                                        	|
             *     | Replace PIN         	| The same PIN mailer will be printed again (this action is only allowed by a special agreement between the Issuer and the MP's CMS) 	|
             *     | Replace Add Parms   	| In the current system version, this production type is used to issue a PIN2.                                                       	|
             *     | Replace Chip Data   	| Calculation of encryption values for smart cards (no PIN code is generated and no PIN mailer is printed).                          	|
             *     | REPRINT_PIN         	| Obsolete.                                                                                                                          	|
             *
             * @example Replace All
             */
            productionType?: string;
            sequenceNumber: components["schemas"]["plasticSequenceNumber"];
            /**
             * @description Card status determines whether transactions may be performed with the card.
             *
             *     | **Possible values** 	| **Description**                                                                                                                   	|
             *     |---------------------	|-----------------------------------------------------------------------------------------------------------------------------------	|
             *     | Active              	| The card is active and may be used to perform transactions                                                                        	|
             *     | Inactive            	| The card has been marked                                                                                                          	|
             *     | Closed              	| Status of an old card after a new card is issued; transactions with the old card may be performed until the new card is activated 	|
             *     | Locked              	| The card is locked; this corresponds to an issued but not activated card                                                          	|
             *     | Rejected            	| An error occurred at the data preparation and personalization step                                                                	|
             *     | From File           	| The request to reissue the card (received via batch file) is being processed by the MP's CMS                                      	|
             *     | Locked for Online   	|                                                                                                                                   	|
             *     | Deferred            	|                                                                                                                                   	|
             *
             * @example Closed
             */
            status: string;
        };
        CardContractPlastics: {
            /** @description Object contains list of `Plastic` records for the given card contract.
             *      */
            cardContractPlastics: components["schemas"]["Plastic"][];
        };
        CardContractReissue: {
            /**
             * @description Primary Account Number (PAN) of a new card contract, which shall be created in the MP's CMS.
             *
             * @example 5355840352135312
             */
            newCardContractNumber?: string;
            newCardExpiryDate?: components["schemas"]["newCardExpiryDate"];
            /**
             * @description Card contract identifier generated on the Issuer's side and passed to the MP's CMS.
             *     The value will be stored on a newly created card contract in the CMS.
             *
             * @example CBS15863242747061
             */
            newCbsNumber?: string;
            /**
             * @description Reissue type defines how a new card plastic should be produced and determines the value of the card plastic's `productionCode`.
             *
             *     Possible values according to the default configuration:
             *
             *     | **Possible values**          	| **Description**                                                           	|
             *     |------------------------------	|---------------------------------------------------------------------------	|
             *     | REISSUE                      	| Issue a new card plastic for an existing card contract                    	|
             *     | RENEW                        	| Renew an existing card plastic                                            	|
             *     | RENEW_D                      	| Renew an existing card without physical card creation                     	|
             *     | REPLACE                      	| Replace an existing card plastic                                          	|
             *     | REPLACE_D                    	| Replace an existing card without physical card creation                   	|
             *     | REPLACE_WITH_PIN_INHERITANCE 	| Replace an existing card without physical card creation with the same PIN 	|
             *     | REPRINT                       | Order a PIN reprint for a physical card                                       |
             *
             *     | **Possible values**          	| **Physical card** 	| **PAN** 	|       **Expiry date**       	|                    **PIN**                    	|
             *     |------------------------------	|:-----------------:	|:-------:	|:---------------------------:	|:---------------------------------------------:	|
             *     | REISSUE                      	|        YES        	|   Same  	| Set by the MP or the Issuer 	| Same (if previously set) or set by the Issuer 	|
             *     | RENEW                        	|        YES        	|   Same  	| Set by the MP or the Issuer 	|                      Same                     	|
             *     | RENEW_D                      	|         NO        	|   Same  	| Set by the MP or the Issuer 	|                  Not required                 	|
             *     | REPLACE                      	|        YES        	|   New   	| Set by the MP or the Issuer 	|                      New                      	|
             *     | REPLACE_D                    	|         NO        	|   New   	| Set by the MP or the Issuer 	|                  Not required                 	|
             *     | REPLACE_WITH_PIN_INHERITANCE 	|         NO        	|   New   	| Set by the MP or the Issuer 	|                      Same                     	|
             *     | REPRINT                       |        N/A          |   N/A     | N/A                           |                      Same                       |
             *
             *     *Disclaimer: `reissueType` is configured in the MP's CMS and the Issuer is allowed to use only the values configured by the MP.*
             *
             * @example REISSUE
             */
            reissueType: string;
        };
        ReissuedCardContract: {
            newCardContractId: components["schemas"]["cardContractId"];
            newCardContractNumber: components["schemas"]["cardContractNumberForReissue"];
            newCardExpiryDate: components["schemas"]["newCardExpiryDate"];
            newSequenceNumber: components["schemas"]["plasticSequenceNumber"];
            plasticId: components["schemas"]["plasticId"];
        };
        ReverseTransactionId: {
            /**
             * Format: int64
             * @description Unique identifier of the document record in the CMS database.
             *
             * @example 2829673
             */
            transactionId: number;
        };
        TransactionId: {
            transactionId: components["schemas"]["transactionId"];
        };
        AccountContractStatus: {
            /**
             * Format: date-time
             * @description The date and time of setting the status (YYYY-MM-DDThh:mm:ssZ format).
             *
             * @example 2020-09-21T12:14:01Z
             */
            changeDate?: string;
            externalStatusCode?: components["schemas"]["externalStatusCode"];
            externalStatusName?: components["schemas"]["accountContractExternalStatusName"];
            /**
             * Format: int64
             * @description The system user ID assigned the status value.
             *
             * @example 27051
             */
            officerId?: number;
            /**
             * @description The system user name who assigned the status value.
             *
             * @example OfficerName
             */
            officerName?: string;
            /**
             * @description Previous status code. The full list will be defined by the Issuer and MP during the onboarding process as they must be configured in the CMS.
             *
             *     The generic solution allows the following account contract statuses:
             *     | **Possible values** 	| **Description**                                                                     	|
             *     |---------------------	|-------------------------------------------------------------------------------------	|
             *     | 00                  	| Account contract is active and ready for use                                        	|
             *     | 00c                 	| Account contract closure procedure was initiated and is ongoing (transition period) 	|
             *     | 14                  	| Final stats of account contract's lifecycle. Set automatically by the CMS           	|
             *
             *     *Disclaimer: please contact the MP representative should other codes be necessary.*
             *
             * @example 00
             */
            previousStatusCode?: string;
            /**
             * @description Previous status name.
             * @example Account OK
             */
            previousStatusName?: string;
            /**
             * @description The reason comment for status change.
             *
             * @example COMMENT
             */
            statusChangeReason?: string;
            /**
             * @description Current status code. The full list will be defined by the Issuer and MP during the onboarding process as they must be configured in the CMS.
             *
             *     The generic solution allows the following account contract statuses:
             *     | **Possible values** 	| **Description**                                                                     	|
             *     |---------------------	|-------------------------------------------------------------------------------------	|
             *     | 00                  	| Account contract is active and ready for use                                        	|
             *     | 00c                 	| Account contract closure procedure was initiated and is ongoing (transition period) 	|
             *     | 14                  	| Final stats of account contract's lifecycle. Set automatically by the CMS           	|
             *
             *     *Disclaimer: please contact the MP representative should other codes be necessary.*
             *
             * @example 00
             */
            statusCode?: string;
            statusName?: components["schemas"]["accountContractStatusName"];
        };
        CardContractStatus: {
            /**
             * Format: date-time
             * @description The date and time of setting the status (YYYY-MM-DDThh:mm:ssZ format).
             *
             * @example 2020-09-21T12:14:01Z
             */
            changeDate?: string;
            externalStatusCode?: components["schemas"]["externalStatusCode"];
            externalStatusName?: components["schemas"]["cardContractExternalStatusName"];
            /**
             * Format: int64
             * @description The system user ID assigned the status value.
             *
             * @example 27051
             */
            officerId?: number;
            /**
             * @description The system user name who assigned the status value.
             *
             * @example OfficerName
             */
            officerName?: string;
            /**
             * @description Previous status code. The codes are configured in the MP's CMS for each Issuer.
             *
             *     Generic solution allows the following codes:
             *     | **Possible values** 	| **Description**                                                                  	|
             *     |---------------------	|----------------------------------------------------------------------------------	|
             *     | 00                  	| Card is active and ready for use                                                 	|
             *     | 04                  	| Used for cards blocked due to Issuer's reasons (permanent status)                	|
             *     | 05                  	| Card does not honour (temporary status)                                          	|
             *     | 14                  	| Final state of card's lifecycle (permanent status). Set automatically by the CMS 	|
             *     | 41                  	| Card was lost (permanent status)                                                 	|
             *     | 43                  	| Card was stolen (permanent status)                                               	|
             *     | 57                  	| Card was deactivated on Issuer's request (permanent status)                      	|
             *     | 59                  	| Suspected fraud (temporary status). Usually set on Issuer's request              	|
             *
             *     *Disclaimer: please contact the MP representative should other codes be necessary.*
             *
             * @example 00
             */
            previousStatusCode?: string;
            /**
             * @description Previous status name.
             * @example Card OK
             */
            previousStatusName?: string;
            /**
             * @description The reason comment for status change.
             *
             * @example COMMENT
             */
            statusChangeReason?: string;
            /**
             * @description Current status code. The codes are configured in the MP's CMS for each Issuer.
             *
             *     Generic solution allows the following codes:
             *     | **Possible values** 	| **Description**                                                                  	|
             *     |---------------------	|----------------------------------------------------------------------------------	|
             *     | 00                  	| Card is active and ready for use                                                 	|
             *     | 04                  	| Used for cards blocked due to Issuer's reasons (permanent status)                	|
             *     | 05                  	| Card does not honour (temporary status)                                          	|
             *     | 14                  	| Final state of card's lifecycle (permanent status). Set automatically by the CMS 	|
             *     | 41                  	| Card was lost (permanent status)                                                 	|
             *     | 43                  	| Card was stolen (permanent status)                                               	|
             *     | 57                  	| Card was deactivated on Issuer's request (permanent status)                      	|
             *     | 59                  	| Suspected fraud (temporary status). Usually set on Issuer's request              	|
             *
             *     *Disclaimer: please contact the MP representative should other codes be necessary.*
             *
             * @example 00
             */
            statusCode?: string;
            statusName?: components["schemas"]["cardContractStatusName"];
        };
        ContractTariffs: {
            count: components["schemas"]["paginationCount"];
            limit: components["schemas"]["paginationLimit"];
            offset: components["schemas"]["paginationOffset"];
            total: components["schemas"]["paginationTotal"];
            /** @description List of `ContractTariff`.
             *      */
            contractTariffs: components["schemas"]["ContractTariff"][];
        };
        BaseClient: {
            additionalDate01?: components["schemas"]["additionalDate01"];
            additionalDate02?: components["schemas"]["additionalDate02"];
            clientBaseAddressData?: components["schemas"]["ClientBaseAddressData"];
            clientCompanyData?: components["schemas"]["ClientCompanyData"];
            clientContactData?: components["schemas"]["ClientContactData"];
            clientIdentificationData?: components["schemas"]["ClientIdentificationData"];
            clientPersonalData?: components["schemas"]["ClientPersonalData"];
            clientExpiryDate?: components["schemas"]["clientExpiryDate"];
            embossedData?: components["schemas"]["EmbossedData"];
        };
        Client: {
            amendmentDate?: components["schemas"]["amendmentDate"];
            amendmentOfficerId?: components["schemas"]["amendmentOfficerId"];
            amendmentOfficerName?: components["schemas"]["amendmentOfficerName"];
            clientId: components["schemas"]["clientId"];
            clientNumber: components["schemas"]["clientNumber"];
            clientType?: components["schemas"]["clientType"];
            dateOpen?: components["schemas"]["dateOpen"];
            orderDepartment?: components["schemas"]["orderDepartment"];
            serviceGroupCode?: components["schemas"]["serviceGroupCode"];
        } & components["schemas"]["BaseClient"];
        ClientCreation: {
            /** @description Client custom data allow the Issuer to pass specific client tags during the creation request.
             *     The tags may represent Issuer-specific field names and values, not available as separate, dedicated fields.
             *     The Issuer can specify a tag name and its value.
             *
             *     Custom data tags are stored in fixed containers (four containers are available) in a TAG=VALUE; format
             *     (for example: CATEGORY=A;GROUP=G1;).
             *
             *     Each container has a length of 3900 characters.
             *      */
            clientCustomData?: components["schemas"]["CustomDataTag"][];
            clientNumber: components["schemas"]["clientNumber"];
            clientType: components["schemas"]["clientType"];
            orderDepartment?: components["schemas"]["orderDepartment"];
            serviceGroupCode?: components["schemas"]["serviceGroupCode"];
        } & components["schemas"]["BaseClient"];
        ClientIdentifier: {
            clientId: components["schemas"]["clientId"];
        };
        /**
         * Format: date-time
         * @description Additional date to meet the Issuer's individual needs.
         *     It can be any date which the Issuer wants to store on the client record - for example, the date when the client signed the agreement. (YYYY-MM-DDThh:mm:ssZ format).
         *
         * @example 2021-01-27T09:59:44Z
         */
        additionalDate01: string;
        /**
         * Format: date-time
         * @description Additional date to meet the Issuer's individual needs.
         *     It can be any date which the Issuer wants to store on the client record - for example, the date when the client signed the agreement. (YYYY-MM-DDThh:mm:ssZ format).
         *
         * @example 2021-02-15T20:58:39Z
         */
        additionalDate02: string;
        /** @description Client's base address stored in the MP's CMS at the client level.
         *      */
        ClientBaseAddressData: {
            addressLine1?: components["schemas"]["addressLine1"];
            addressLine2?: components["schemas"]["addressLine2"];
            addressLine3?: components["schemas"]["addressLine3"];
            addressLine4?: components["schemas"]["addressLine4"];
            city?: components["schemas"]["city"];
            country?: components["schemas"]["country"];
            postalCode?: components["schemas"]["postalCode"];
            state?: components["schemas"]["state"];
        };
        /** @description The client's company object represents a repository where the Issuer can store information on what company the client belongs to.
         *      */
        ClientCompanyData: {
            /**
             * @description Company department name.
             *
             * @example Department
             */
            companyDepartment?: string;
            /**
             * @description Company name.
             *
             * @example Company
             */
            companyName?: string;
            /**
             * @description Company trade name.
             *
             * @example Company Trade
             */
            companyTradeName?: string;
            /**
             * @description Client's position in their company.
             *
             * @example Employee
             */
            position?: string;
        };
        /** @description Client's contact data.
         *      */
        ClientContactData: {
            email?: components["schemas"]["email"];
            /**
             * @description Fax number.
             *
             *     Note: The pattern for this field is configured in the MP's API during the onboarding process.
             *
             * @example 0048123456777
             */
            fax?: string;
            /**
             * @description Home fax number.
             *
             *     Note: The pattern for this field is configured in the MP's API during the onboarding process.
             *
             * @example 0048123456888
             */
            faxHome?: string;
            /**
             * @description Home phone number.
             *
             *     Note: The pattern for this field is configured in the MP's API during the onboarding process.
             *
             * @example 0048123456999
             */
            phoneNumberHome?: string;
            /**
             * @description Mobile phone number (i.e. used for SMS notifications).
             *
             *     Note: The pattern for this field is configured in the MP's API during the onboarding process.
             *
             * @example 0048123456778
             */
            phoneNumberMobile?: string;
            /**
             * @description Work phone number.
             *
             *     Note: The pattern for this field is configured in the MP's API during the onboarding process.
             *
             * @example 0048123456789
             */
            phoneNumberWork?: string;
        };
        /** @description Client's identification data.
         *      */
        ClientIdentificationData: {
            /**
             * @description Client identification document details. Free text field, could be the document's date of issue.
             *
             * @example 161235698529429
             */
            identificationDocumentDetails?: string;
            /**
             * @description Client's identification document number e.g. national ID document, passport number.
             *     Free text field. The MP's CMS will not validate the correctness of the identification number.
             *
             * @example 161235698529328
             */
            identificationDocumentNumber?: string;
            /**
             * @description Client's identification document type. Free text, e.g. National ID, Passport.
             *
             * @example Passport
             */
            identificationDocumentType?: string;
            /**
             * @description Client's social security number. The MP's CMS will not validate the correctness of the social security number.
             *
             * @example 161235698529227
             */
            socialNumber?: string;
            /**
             * @description Additional information related to tax purposes. Free text field.
             *
             * @example Tax position
             */
            taxPosition?: string;
            /**
             * @description Identification number used for tax purposes.
             *
             * @example 161235698529531
             */
            taxpayerIdentifier?: string;
        };
        /** @description Client's personal data.
         *      */
        ClientPersonalData: {
            /**
             * Format: date
             * @description Date of birth (format: YYYY-MM-DD).
             *
             * @example 2021-06-25
             */
            birthDate?: string;
            /**
             * @description Birth name.
             *
             * @example Doe
             */
            birthName?: string;
            /**
             * @description Place of birth.
             *
             * @example Warsaw
             */
            birthPlace?: string;
            /**
             * @description Client's citizenship. The allowed format is ISO 3166-1 alfa-3 country code (3-letter country designation).
             *
             * @example USA
             */
            citizenship?: string;
            firstName?: components["schemas"]["firstName"];
            /**
             * @description Gender.
             *
             *     | **Possible values** 	| **Description** 	|
             *     |---------------------	|-----------------	|
             *     | F                   	| Female          	|
             *     | M                   	| Male            	|
             *     | N                   	| Not specified   	|
             *
             * @example M
             */
            gender?: string;
            /**
             * @description Language symbol.
             *     It follows the Internet Engineering Task Force (IETF) [BCP 47](https://tools.ietf.org/html/bcp47#appendix-A) standard.
             *
             *     *Disclaimer: Please contact the MP representative should the language code be used. Available values will need to be agreed upon by the MP and the Issuer prior to the onboarding process as they need to be configured on the MP's side and have an impact on different areas of configuration (e.g. statement file generating, workbench screens, etc.).*
             *
             * @example en
             */
            language?: string;
            lastName?: components["schemas"]["lastName"];
            /**
             * @description Client's marital status.
             *
             *     | **Possible values** 	| **Description** 	|
             *     |---------------------	|-----------------	|
             *     | DD                    | Divorced          |
             *     | DM                    | Married           |
             *     | DS                    | Single            |
             *     | DX                    | Miscellaneous     |
             *
             *     *Disclaimer: Please contact the MP representative should other values be required. Available values will need to be agreed upon by the MP and the Issuer prior to the onboarding process as they need to be configured on the MP's side.*
             *
             * @example DS
             */
            maritalStatus?: string;
            /**
             * @description Middle name.
             *
             * @example Carl
             */
            middleName?: string;
            /**
             * @description Secret phrase can be used by the Issuer to authenticate a client.
             *     E.g. mother's maiden name used for authentication process between the client and the call center.
             *
             * @example secret
             */
            secretPhrase?: string;
            /**
             * @description Client's short name.
             *
             * @example Madley
             */
            shortName?: string;
            /**
             * @description Client's name suffix. May be used in formal correspondence with the client.
             *     The Issuer can choose any text the client wishes, e.g. PhD, Dr.
             *
             *     *Disclaimer: Please contact the MP representative should the suffix be used. Available values will need to be agreed upon by the MP and the Issuer prior to the onboarding process as they need to be configured on the MP's side.*
             *
             * @example PhD
             */
            suffix?: string;
            /**
             * @description Client's title.
             *
             *     | **Possible values (default)** 	|
             *     |-------------------------------	|
             *     | MR                            	|
             *     | MRS                           	|
             *     | MISS                          	|
             *
             *     *Disclaimer: Please contact the MP representative should other values be required. Available values will need to be agreed upon by the MP and the Issuer prior to the onboarding process as they need to be configured on the MP's side.*
             *
             * @example MR
             */
            title?: string;
        };
        ClientModification: {
            /** @description Client custom data allow the Issuer to pass specific client tags during the creation request.
             *     The tags may represent Issuer-specific field names and values, not available as separate, dedicated fields.
             *     The Issuer can specify a tag name and its value.
             *
             *     Custom data tags are stored in fixed containers (four containers are available) in a TAG=VALUE; format
             *     (for example: CATEGORY=A;GROUP=G1;).
             *
             *     Each container has a length of 3900 characters.
             *      */
            clientCustomData?: components["schemas"]["CustomDataTag"][];
        } & components["schemas"]["BaseClient"];
        PinSearchCriteria: {
            cardExpiryDate: components["schemas"]["cardExpiryDate"];
            cardSequenceNumber?: components["schemas"]["plasticSequenceNumber"];
        };
        EncryptedPin: {
            /**
             * @description Card contract number - PAN encrypted with `Customer-Public-Rsa-Key`.
             *
             * @example 43165173F6A016EDF4075FFBC4F38DD8C1F59C0ACE3BC35853AB91A2A93AC20FC166C26723CCD261CCE41AE142D0AB0CF08CD1996CA6499D8301ABD9964EAE00B932786357FEF1DD7425D8D332980ABE18642438864CB3313CCFA4A5C4490F6A3D4348037295E9957309757E8D18835F7616869DB4692665EF765948A3D3C61B6B75C0CA130A80AFB8A937B203E009A8FC26BB8FBBFEA4E41FC186416D58129FDADC1F80AB88458A8212551CD874157C3F19F876D1E747D525E534885709906647AF017F0EC7662FD76F886EBAFDB9EF558C1ED5AC3B1A38CB5A34D70FF1517C819CCE26054798E40F9FFECC3B37146D4A3F4AF5B25A4D4554C1B08AA14FAD8B
             */
            encryptedCardContractNumber: string;
            /**
             * @description PIN block encrypted with ZPK (Zone PIN Key) returned in `encryptedZpk`.
             *
             * @example 0B8315C81719E9CA
             */
            encryptedPinBlock: string;
            /**
             * @description Hex-encoded Zone PIN Key encrypted with `Customer-Public-Rsa-Key`.
             *
             *     Before encrypting with `Customer-Public-Rsa-Key`, ZPK is wrapped under Standard Key Block type.
             *
             *     The standard key block format is a TLV (Type-Length-Value) encoding scheme with length as represented in Hexadecimal.
             *
             * @example 21CB78205C03CC9DEF06497F3DCC413DA9C25C51473F3BDADCA61F56184B0D199E9E0C175A5E082A4ED9044C5F2D21A930A255203D4A051EF6108B496FAA5ABFCFA146CF76A61DA330F84BEF2F2701BC17282FB6BC542F0E3F50AC3C4D27FC32E7009E5C8D406D019E7D6679DEEF09463CFCDB7957263597D65C1D31472B5E1B72252CE491BE0C67415A8D4F935F11F6CA2909511FAE7B9D453FEE102AD8BF0CD69C34CAC4028627855221AD381FD1376F6AB99F0C6693B384089C1ACEB5ED63ACB3ED0B644CFDC39EEC87887D8D5C60B5EF50CF29041F19C91FF84F677F27108D6FC0DEC9FB6575A36C65C630C20D3DA2D071135B3F829674493799C64F908B
             */
            encryptedZpk: string;
        };
        ClientAddresses: {
            /** @description List of `Address` for the client.
             *      */
            clientAddresses: components["schemas"]["Address"][];
        };
        ContractAddresses: {
            /** @description List of `Address` for the contract.
             *      */
            contractAddresses: components["schemas"]["Address"][];
        };
        BaseAddress: {
            addressLine1?: components["schemas"]["addressLine1"];
            addressLine2?: components["schemas"]["addressLine2"];
            addressLine3?: components["schemas"]["addressLine3"];
            addressLine4?: components["schemas"]["addressLine4"];
            city?: components["schemas"]["city"];
            country?: components["schemas"]["country"];
            email?: components["schemas"]["email"];
            firstName?: components["schemas"]["firstName"];
            lastName?: components["schemas"]["lastName"];
            postalCode?: components["schemas"]["postalCode"];
            state?: components["schemas"]["state"];
        };
        AddressCreation: {
            addressType: components["schemas"]["addressType"];
        } & components["schemas"]["BaseAddress"];
        Address: {
            addressType: components["schemas"]["addressType"];
            /**
             * @description Flag informing about the status of the address. The address can be enabled or disabled.
             *
             * @example true
             */
            enabled: boolean;
        } & components["schemas"]["BaseAddress"];
        AddressModification: {
            /**
             * @description Flag informing about the status of the address. The address can be enabled or disabled.
             *
             * @example true
             */
            enabled?: boolean;
        } & components["schemas"]["BaseAddress"];
        AccountContractCreation: {
            /** @description A contract classifier is an additional system configuration allowing the MP platform to execute specific flows in the system.
             *
             *     *Disclaimer: possible values of contract classifiers shall be provided by the MP.*
             *      */
            accountContractClassifiers?: components["schemas"]["AccountContractClassifier"][];
            accountContractData: components["schemas"]["AccountContractData"];
            /** @description A contract parameters allow the MP platform to execute specific flows in the system.
             *
             *     *Disclaimer: possible values of contract parameters shall be provided by the MP.*
             *      */
            accountContractParameters?: components["schemas"]["AccountContractParameter"][];
            creditData?: components["schemas"]["CreditData"];
            liabilityContract?: components["schemas"]["LiabilityContract"];
        };
        /** @description Liability defines the type of relation between the current product and its parent product in a "Liability" hierarchy.
         *
         *     Liability information allows the Issuer to define how the MP's CMS shall check the 'Open To Buy' amount when a transaction is performed by the cardholder.
         *
         *     A liability link is set between two account contracts during the account contract creation request (`POST /accounts`).
         *      */
        LiabilityContract: {
            /**
             * @description Type of link between an upper-level liability account contract and the account contract being created. Usually, the link is created to indicate one corporate headquarter account and many corporate branch accounts.
             *
             *     Possible values are:
             *     * Y - Full Liability
             *
             *       * Every corporate branch is independently responsible for the repayment of its loans and loan interest.
             *       * All branches as a whole should not exceed the general corporate credit limit.
             *       * Transactions executed in any corporate branch are regulated by usage limiters set for the entire corporation.
             *       * Product parameters available when opening a corporate client's contract depend on the product parameters set for the corporate branch.
             *
             *     * N - Affiliated
             *
             *       * Every corporate branch is independently responsible for the repayment of its loans and loan interest.
             *       * All branches as a whole should not exceed the general corporate credit limit.
             *       * Transactions executed in any corporate branch are regulated by usage limiters set for the entire corporation.
             *
             *     * A - Only Check Balance
             *
             *       * Every corporate client has an independent credit limit and is independently responsible for the repayment of their loan and its interest.
             *       * Product parameters available when opening a corporate client's account depend on the product parameters for the corporate branch.
             *
             *     * R - Reporting
             *       * This link type is used to gather statistical data on account activity within its tree. The data are required for generating "non-financial" reports, such as statements on all corporate accounts – without their consolidated totals.
             *
             * @example Y
             * @enum {string}
             */
            liabilityCategory: "Y" | "N" | "A" | "R";
            /**
             * @description Technical identifier of an upper-level liability account contract to which a liability link is set for the account contract being created.
             *
             * @example 125879812
             */
            liabilityContractId: string;
        };
        /** @description Account contract data represents basic account information for any account: is it a top account or a sub-account, a debit or a credit account.
         *      */
        AccountContractData: {
            accountContractName?: components["schemas"]["accountContractName"];
            accountContractNumber: components["schemas"]["accountContractNumber"];
            accountContractSubtypeCode?: components["schemas"]["subtypeCode"];
            branchCode?: components["schemas"]["branchCode"];
            cbsNumber?: components["schemas"]["cbsNumber"];
            clientId?: components["schemas"]["clientId"];
            /**
             * @description Account currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency?: string;
            /** @description Contract custom data allow the Issuer to pass specific contract tags during the creation request.
             *     The tags may represent Issuer-specific field names and values, not available as separate, dedicated fields.
             *     The Issuer can specify a tag name and its value.
             *
             *     Custom data tags are stored in fixed containers (four containers are available) in a TAG=VALUE; format
             *     (for example: CATEGORY=A;GROUP=G1;).
             *
             *     Each container has a length of 255 characters.
             *      */
            customData?: components["schemas"]["CustomDataTag"][];
            parentAccountContractId?: components["schemas"]["parentAccountContractId"];
            productCode: components["schemas"]["accountProductCode"];
            serviceGroupCode?: components["schemas"]["serviceGroupCode"];
        };
        CreditData: {
            /**
             * @description The day when a billing cycle for the credit account ends. As a result:
             *      * billing is closed
             *      * interest may be charged for the outstanding balance
             *      * a Minimum To Pay amount is calculated
             *      * a statement is generated
             *
             *     In the generic solution, the possible values are integers between 1 and 31. If value 31 is chosen, `billingDay` is set to the end of the month.
             *
             * @example 10
             */
            billingDay?: string;
            /**
             * @description Information on the amount of granted credit limit assigned to the account.
             *     Credit limit must be provided in the account currency.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 20
             */
            creditLimitAmount?: number;
        };
        AccountContractClassifier: {
            classifierCode: components["schemas"]["classifierCode"];
            classifierValue: components["schemas"]["classifierValue"];
        };
        AccountContractParameter: {
            parameterCode: components["schemas"]["parameterCode"];
            parameterValue: components["schemas"]["parameterValue"];
        };
        AccountContractModification: {
            accountContractName?: components["schemas"]["accountContractName"];
            cbsNumber?: components["schemas"]["cbsNumber"];
            /** @description Contract custom data allow the Issuer to pass specific contract tags during the creation request.
             *     The tags may represent Issuer-specific field names and values, not available as separate, dedicated fields.
             *     The Issuer can specify the tag name and its value.
             *
             *     Custom data tags are stored in fixed containers (four containers are available) in TAG=VALUE; format
             *     (for example: CATEGORY=A;GROUP=G1;).
             *
             *     Each container has length 255 characters.
             *      */
            customData?: components["schemas"]["CustomDataTag"][];
        };
        AccountContractStatusWithReason: {
            reason?: components["schemas"]["statusChangeReason"];
            /**
             * @description Account contract status. The full list will be defined by the Issuer and MP during the onboarding process as they must be configured in the CMS.
             *
             *     The generic solution allows the following account contract statuses:
             *     | **Possible values** 	| **Description**                                                                     	|
             *     |---------------------	|-------------------------------------------------------------------------------------	|
             *     | 00                  	| Account contract is active and ready for use                                        	|
             *     | 00c                 	| Account contract closure procedure was initiated and is ongoing (transition period) 	|
             *
             * @example 00
             */
            statusCode: string;
        };
        SubAccountContracts: {
            count: components["schemas"]["paginationCount"];
            limit: components["schemas"]["paginationLimit"];
            offset: components["schemas"]["paginationOffset"];
            total: components["schemas"]["paginationTotal"];
            /** @description List of `AccountContract`.
             *      */
            subAccountContracts: components["schemas"]["AccountContract"][];
        };
        ContractSummaryTree: {
            count: components["schemas"]["paginationCount"];
            limit: components["schemas"]["paginationLimit"];
            offset: components["schemas"]["paginationOffset"];
            total: components["schemas"]["paginationTotal"];
            /** @description List of `ContractSummary`.
             *      */
            contractSummaries: components["schemas"]["ContractSummary"][];
        };
        ContractSummary: {
            /**
             * @description Contract's contract category.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | Account             	|
             *     | Card                	|
             *     | Device              	|
             *
             * @example Card
             */
            contractCategory?: string;
            contractId: components["schemas"]["contractId"];
            contractLevel?: components["schemas"]["contractLevel"];
            contractName?: components["schemas"]["contractName"];
            /**
             * @description Contract number (can be masked if PAN present).
             *
             * @example 915555______0017
             */
            contractNumber?: string;
            leaf?: components["schemas"]["leaf"];
            /**
             * @description Type of link between upper-level liability account contract and account contract being created. Usually, the link is created to
             *     indicate one corporate headquarter account and many corporate branches accounts.
             *
             *     Possible values are:
             *     * Y - Full Liability
             *
             *       * Every corporate branch is independently responsible for the repayment of its loans and loan interest.
             *       * All branches as a whole should not exceed the general corporate credit limit.
             *       * Transactions executed in any corporate branch are regulated by usage limiters set for the entire corporation.
             *       * Product parameters available when opening a corporate client's contract depend on the product parameters set for the corporate branch.
             *
             *     * N - Affiliated
             *       * Every corporate branch is independently responsible for the repayment of its loans and loan interest.
             *       * All branches as a whole should not exceed the general corporate credit limit.
             *       * Transactions executed in any corporate branch are regulated by usage limiters set for the entire corporation.
             *
             *     * A - Only Check Balance
             *       * Every corporate client has an independent credit limit and is independently responsible for the repayment of his/her loan and its interest.
             *       * Product parameters available when opening a corporate client's accounts depend on the product parameters for the corporate branch.
             *
             *     * R - Reporting
             *       * This link type is used to gather statistical data on account activity within its tree. This data is needed for generating "non-financial" reports, such as statements on all corporate accounts – without their consolidated totals.
             *
             * @example Y
             */
            liabilityCategory?: string;
            /**
             * Format: int64
             * @description Liability contract record id from the CMS database.
             *
             * @example 4124881
             */
            liabilityContractId?: number;
            /**
             * @description Liability contract number.
             *
             * @example 3219843718
             */
            liabilityContractNumber?: string;
        };
        ContractBalances: {
            /** @description List of `ContractBalance`.
             *      */
            contractBalances: components["schemas"]["ContractBalance"][];
        };
        ContractBalance: {
            balanceCode: components["schemas"]["contractBalanceCode"];
            /**
             * @description Currency in which the balance amount is expressed (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            balanceCurrency?: string;
            /**
             * Format: int64
             * @description Balance record ID.
             *
             * @example 89516416
             */
            balanceId: number;
            /**
             * @description The current amount of the contract balance specified by the `balanceCode` attribute.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 9811.31
             */
            balanceValue?: number;
        };
        Event: {
            /**
             * @description The amount parameter for the event. Only one of 2 options: (`amount` and `currency`) or (`parameterString`) may be input in `POST /contracts/{contract_id}/events`.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 100
             */
            amount?: number;
            /**
             * @description The currency parameter for the event (format according to ISO 4217, alphanumeric code).
             *     Only one of 2 options: (`amount` and `currency`) or (`parameterString`) may be input in `POST /contracts/{contract_id}/events`.
             *
             * @example EUR
             */
            currency?: string;
            /**
             * Format: date
             * @description Event closing date (YYYY-MM-DD format).
             *
             * @example 2031-06-25
             */
            endDate?: string;
            /**
             * @description Event code which will be executed in the MP's CMS. A list of possible codes will be defined by the MP during the project based on Issuer requirements.
             *
             * @example MDES_TKN_DEACTIVATE
             */
            eventCode: string;
            /**
             * @description The parameter string for the event. Only one of 2 options: (`amount` and `currency`) or (`parameterString`) may be input in `POST /contracts/{contract_id}/events`.
             *
             * @example VALUE
             */
            parameterString?: string;
            /**
             * @description Reason of the Event.
             *
             * @example MP_API_OPEN_EVENT
             */
            reason?: string;
            /**
             * Format: date
             * @description Event opening date (YYYY-MM-DD format).
             *
             * @example 2031-06-25
             */
            startDate?: string;
        };
        ClientAccountContracts: {
            count: components["schemas"]["paginationCount"];
            limit: components["schemas"]["paginationLimit"];
            offset: components["schemas"]["paginationOffset"];
            total: components["schemas"]["paginationTotal"];
            /** @description List of `AccountContract`.
             *      */
            clientAccountContracts: components["schemas"]["AccountContract"][];
        };
        AccountContract: {
            accountContractBalances: components["schemas"]["AccountContractBalances"];
            /**
             * Format: int64
             * @description Unique technical identifier for an account contract generated by the MP's CMS.
             *     The identifier is generated when the account contract creation finishes successfully and is returned in the account contract creation response (`POST /accounts`).
             *
             * @example 60002
             */
            accountContractId: number;
            /**
             * @description Contract level in the contract hierarchy. This field informs about the contract level and about the sequential number of the contract within that level.
             *
             *     For example, if there is one account with two cards, the system will assign:
             *       * . - for the account contract
             *       * .1. - for the first card contract
             *       * .2. - for the second card contract
             *
             *     If there is one account with two subaccounts with cards created
             *     under subaccounts, the system will assign:
             *       * . - for the account
             *       * .1. - for the first subaccount contract
             *       * .1.1. - for the first card contract
             *       * .1.2. - for the second card contract
             *       * .2. - for the second subaccount contract
             *       * .2.1. - for the first card contract
             *       * .2.2. - for the second card contract
             *       * .2.3. - for the third card contract
             *
             * @example .1.
             */
            accountContractLevel: string;
            accountContractName?: components["schemas"]["accountContractName"];
            accountContractNumber: components["schemas"]["accountContractNumber"];
            accountContractOwner: components["schemas"]["AccountContractOwner"];
            accountContractStatusData: components["schemas"]["AccountContractStatusData"];
            /**
             * @description Name of an account contract's subtype code which has been used during the account creation.
             *     The name may be returned even when a subtype code has not been passed by the Issuer in an account creation request.
             *
             * @example 018-Private Client Account
             */
            accountContractSubtype?: string;
            /**
             * @description Additional tagged specified field.
             *
             * @example FIRST_CYCLE=2020-01-01;AS=&lt;ASV160927172745>&lt;SOV160927172745>;SP=&lt;SPV180802100310>&lt;SPA1002>;INIT_EVNT;
             */
            additionalParameters?: string;
            amendmentDate?: components["schemas"]["amendmentDate"];
            amendmentOfficerId?: components["schemas"]["amendmentOfficerId"];
            amendmentOfficerName?: components["schemas"]["amendmentOfficerName"];
            /**
             * Format: int64
             * @description Technical identifier of a billing account (the value is set by the MP's CMS).
             *     A billing account contract defines the account used for settlements and the main account in the account hierarchy.
             *
             * @example 60002
             */
            billingAccountContractId: number;
            /**
             * @description Account contract identifier of a billing account. The value is defined in the Issuer's system and is passed to the MP's CMS during the billing account creation request (`POST /accounts`).
             *
             * @example ABC_121235694296313
             */
            billingAccountContractNumber: string;
            branchCode?: components["schemas"]["branchCode"];
            branchName?: components["schemas"]["branchName"];
            cbsNumber?: components["schemas"]["cbsNumber"];
            /**
             * @description Account contract currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency?: string;
            /**
             * @description Account contract currency (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            currencyNumericCode?: string;
            /**
             * Format: date
             * @description Date of contract closure (YYYY-MM-DD format).
             *
             * @example 2021-12-31
             */
            dateClose?: string;
            dateOpen: components["schemas"]["dateOpen"];
            /**
             * Format: date
             * @description Payment due date for the billing cycle (YYYY-MM-DD format).
             *
             *     Date by which a cardholder has to repay the **Minimum To Pay** amount to avoid excess charges and delinquency processing.
             *     This date is usually printed on the cardholder's statement.
             *
             *     The date is calculated by the MP's CMS when a billing cycle is closed, according to the Issuer-specific configuration.
             *     Possible configuration:
             *       * First day of the cycle (no grace days)
             *       * Number of days (X days) after the first day of the cycle.
             *
             * @example 2021-06-25
             */
            dueDate?: string;
            /**
             * Format: date
             * @description Contract's last billing date (the date when the last cycle was closed) (YYYY-MM-DD format).
             *
             * @example 2021-12-28
             */
            lastBillingDate?: string;
            leaf?: components["schemas"]["leaf"];
            /**
             * Format: int64
             * @description Technical identifier (set by the MP's CMS) of a liability account contract linked to a specific account contract.
             *     An empty value means that the given account contract has not been created with liability information.
             *
             * @example 60001
             */
            liabilityAccountContractId?: number;
            /**
             * @description Account contract number (set by the Issuer) of a liability account contract linked to a specific account contract.
             *
             *     An empty value means that the given account contract has not been created with liability information.
             *
             * @example ABC_35697292146
             */
            liabilityAccountContractNumber?: string;
            /**
             * @description Type of relation with an upper-level Liability contract (if any).
             *
             *     | **Possible values** 	| **Description**    	|
             *     |---------------------	|--------------------	|
             *     | A                   	| Only Check Balance 	|
             *     | N                   	| Affiliated         	|
             *     | R                   	| Reporting          	|
             *     | Y                   	| Full Liability     	|
             *
             * @example Y
             */
            liabilityCategory?: string;
            mainProductCode?: components["schemas"]["mainProductCode"];
            /**
             * Format: date
             * @description Contract's nearest billing date (in the future) (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            nextBillingDate?: string;
            parentAccountContractId?: components["schemas"]["parentAccountContractId"];
            /**
             * @description Account contract number (set by the Issuer) which represents a parent account contract.
             *     The field is empty in case a specific account contract is a top account contract.
             *     A non-empty value means that the given account contract has been created as a sub-account.
             *
             * @example ABC_35697292146
             */
            parentAccountContractNumber?: string;
            parentProductCode?: components["schemas"]["parentProductCode"];
            /**
             * Format: date
             * @description The date on which the delinquency arose. It is set when funds are transferred from a standard account to a delinquency account.
             *
             *     The field is filled only when a past due balance exists (past due amount is not repaid).
             *     The date on which delinquency arises is set in the Past Due Date field when funds are transferred from a standard account to a delinquency account (format: YYYY-MM-DD)
             *
             * @example 2021-06-25
             */
            pastDueDate?: string;
            /**
             * Format: int64
             * @description The total number of days is calculated from `pastDueDate`.
             *     The field is filled only when a past due balance exists (past due amount is not repaid).
             *
             *     For example, delinquency arose on 01 March. This date is shown in the `pastDueDate` field. On 15 March, the total number of past due days shown in the Past Due Days field is 15 days.
             *
             * @example 233
             */
            pastDueDays?: number;
            productCode?: components["schemas"]["accountProductCode"];
            productName: components["schemas"]["accountProductName"];
            serviceGroupCode?: components["schemas"]["serviceGroupCode"];
            /**
             * @description Name of a service group code which has been passed by the Issuer in an account creation request.
             *
             * @example GROUP1
             */
            serviceGroupName?: string;
            /**
             * Format: int64
             * @description Technical identifier from the MP's CMS which represents the top account contract of a specific account contract.
             *
             *     When an account contract is created as a top account, the value returned is the same as the technical identifier from the MP's CMS of the given account contract.
             *
             * @example 60001
             */
            topAccountContractId: number;
            /**
             * @description Contract number (set by the Issuer) which represents the top account contract of a specific account contract.
             *
             *     When an account contract is created as a top account, the value returned is the same as the contract name of the given account.
             *
             * @example ABC_35697292146
             */
            topAccountContractNumber: string;
        };
        /** @description This section is returned for every account and it contains information on the account owner.
         *     In case when an account has been created as a sub-account, the MP's CMS assigns a client owner taken from the parent account.
         *      */
        AccountContractOwner: {
            /**
             * Format: int64
             * @description Technical identifier of a client which is the owner of an account contract.
             *     The identifier is created by the MP's CMS during the client creation request (`POST /clients`).
             *
             * @example 453135
             */
            accountContractOwnerId: number;
            /**
             * @description Client number of the account owner, set by the Issuer in a client creation request (`POST /clients`).
             *
             * @example ABC_685400081
             */
            accountContractOwnerNumber: string;
            /**
             * @description Client's full name.
             *
             * @example John Doe
             */
            accountContractOwnerName?: string;
        };
        AccountContractBalances: {
            /**
             * @description An additional authorization limit is used to increase the contract's available amount during the authorization.
             *     If the authorization amount is greater than the available amount but smaller than the available amount and the additional authorization limit combined, the authorization will be permitted. The amount exceeding the granted credit limit will be reflected in an over-limit account.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 123.12
             */
            additionalLimit?: number;
            /**
             * @description Open To Buy: amount available for a client to perform transactions.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1401.21
             */
            available?: number;
            /**
             * @description The amount used by a client, without contract blockages. For debit cards, the amount represents posted transactions, for credit cards it represents the amount owed to the Issuer.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 15123.56
             */
            balance?: number;
            /**
             * @description The amount resulting from a transaction approval on the MP's side, when the transaction is not yet posted to a client contract.
             *     The purpose of amount blocking is to decrease the Open To Buy amount so that the client will not use more money than is available at the account contract level.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 751.28
             */
            blockedAmount?: number;
            /**
             * @description Granted credit limit (applicable to credit cards only) is the amount the Issuer grants a client for their expenditures.
             *     Used to calculate the available amount each time the cardholder performs a transaction, a fee or interest is posted.
             *
             *     By default, the amount is presented as a positive number (without a minus sign) but can be a negative number depending on CMS configuration.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1231.78
             */
            creditLimit?: number;
            /**
             * @description Amount, which is owed to the Issuer and which the client was obliged to repay by a certain due date but failed to repay.
             *     A past due amount is also known as a **past due Minimum To Pay amount**.
             *
             *     By default, the amount is presented as a negative number (with a minus sign) but can be a positive number depending on CMS configuration.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 241.21
             */
            pastDue?: number;
            /**
             * @description Amount, which is owed to the Issuer and which a client is obliged to repay by the nearest due date.
             *     When the client fails to do so, they may be subject to extra charges and the contract becomes delinquent. At that moment, the total due amount becomes the past due amount.
             *
             *     By default, the amount is presented as a negative number (with a minus sign) but can be a positive number depending on CMS configuration.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 381.14
             */
            totalDue?: number;
        };
        AccountContractStatusData: {
            statusCode?: components["schemas"]["accountContractStatusCode"];
            statusName?: components["schemas"]["accountContractStatusName"];
            externalStatusCode?: components["schemas"]["externalStatusCode"];
            externalStatusName?: components["schemas"]["accountContractExternalStatusName"];
        };
        ContractTariff: {
            /**
             * @description Apply mode.
             *
             *     | **Possible values** 	| **Description** 	|
             *     |---------------------	|-----------------	|
             *     | D                   	| Skip            	|
             *     | N                   	| Inactive        	|
             *     | Y                   	| From tariff     	|
             *
             * @example D
             */
            applyMode?: string;
            /**
             * Format: int64
             * @description Tariff data identifier.
             *
             * @example 17960
             */
            activeTariffDataId?: number;
            /**
             * @description Additional minimum allowed amount, e.g. minimum loan payment.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 765
             */
            baseAmount?: number;
            /**
             * Format: int64
             * @description Contract technical identifier.
             *
             * @example 70001
             */
            contractId?: number;
            /**
             * @description Currency of the fee (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency?: string;
            /**
             * @description Currency of the fee (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            currencyNumericCode?: string;
            /**
             * @description Tariff domain organization.
             *
             *     | **Possible values** 	|     **Description**    	|
             *     |:-------------------:	|:----------------------:	|
             *     |          F          	|  Financial Institution 	|
             *     |          A          	|      Account Scheme    	|
             *     |          S          	|       Service Pack     	|
             *     |          P          	|         Product        	|
             *     |          T          	|     Product Template   	|
             *     |          O          	|         Personal       	|
             *     |          E          	|          Event         	|
             *     |          G          	|          Group         	|
             *     |          C          	|       Counterparty     	|
             *     |          M          	|         Grouped        	|
             *
             * @example P
             */
            domainFrom?: string;
            /**
             * Format: int32
             * @description Tariff domain level in tariff hierarchy.
             *
             * @example 14
             */
            domainLevel?: number;
            /**
             * @description Tariff domain name.
             *
             * @example INB Acc general tariffs
             */
            domainName?: string;
            /**
             * Format: int32
             * @description Due period value.
             *
             * @example 12
             */
            duePeriod?: number;
            /**
             * @description Additional interest rate, e.g. fee rate charged on revenue from account interest.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1223311
             */
            feeRateValue?: number;
            /**
             * @description Type of currency exchange rate.
             *
             *     | **Possible values** 	| **Description** 	|
             *     |---------------------	|-----------------	|
             *     | B                   	| Buy/Sell        	|
             *     | M                   	| Middle          	|
             *
             * @example B
             */
            fxRateType?: string;
            /**
             * @description Account number in the general ledger, used for synthetic accounting.
             *
             * @example 110101
             */
            generalLedgerNumber?: string;
            /**
             * @description General ledger number name.
             *
             * @example Accounts receivables - households-110101
             */
            generalLedgerNumberName?: string;
            /**
             * Format: int64
             * @description Global tariff identifier.
             *
             * @example 7564
             */
            globalTariffId?: number;
            /**
             * Format: int32
             * @description The time interval used, for example, to specify a time shift for merchant reimbursement or to specify a loan grace period.
             *
             * @example 5634
             */
            gracePeriod?: number;
            /**
             * Format: int32
             * @description Minimum allowed counter value.
             *
             * @example 43
             */
            minCount?: number;
            /**
             * Format: int32
             * @description Maximum allowed counter value.
             *
             * @example 34
             */
            maxCount?: number;
            /**
             * @description Maximum allowed amount, e.g. maximum fee or maximum transaction amount.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 8444
             */
            maxAmount?: number;
            /**
             * @description Minimum allowed amount, e.g. minimum fee or minimum transaction amount.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 6543
             */
            minAmount?: number;
            /**
             * @description Personalisation type.
             *
             *     | **Possible values** 	|      **Description**      	|
             *     |:-------------------:	|:-------------------------:	|
             *     |          G          	|           Global          	|
             *     |          P          	|          Personal         	|
             *     |          D          	|        Personalised       	|
             *     |          T          	| Personal (Template Based) 	|
             *     |          L          	|          Template         	|
             *
             * @example G
             */
            personalisationType?: string;
            /**
             * Format: int64
             * @description Personal tariff identifier.
             *
             * @example 8112
             */
            personalTariffId?: number;
            /**
             * @description The interest rate on an account or fee rate.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 433111
             */
            rateValue?: number;
            /**
             * @description Additional allowed amount, e.g. maximum payment in installment schedule.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 7444312
             */
            singleAmount?: number;
            /**
             * Format: date
             * @description Date from which tariff data is active (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            startDate?: string;
            /**
             * @description Tariff code.
             *
             * @example MTP_CALC_RULE
             */
            tariffCode?: string;
            /**
             * Format: int64
             * @description Tariff domain identifier.
             *
             * @example 11460
             */
            tariffDomainId?: number;
            /**
             * @description Tariff domain code.
             *
             * @example GL
             */
            tariffDomainCode?: string;
            /**
             * Format: int64
             * @description Tariff identifier.
             *
             * @example 16270
             */
            tariffId?: number;
            /**
             * @description Tariff name.
             *
             * @example INB MTP Calculation Rule 1
             */
            tariffName?: string;
            /**
             * @description Tariff role.
             *
             *     | **Possible values** 	| **Description**            	|
             *     |---------------------	|----------------------------	|
             *     | SERVICE             	|  Service                   	|
             *     | SERVICE_LIMIT       	|  Service Limit             	|
             *     | SERVICE_VD          	|  Service Value Days        	|
             *     | INTEREST            	|  Interest                  	|
             *     | AGEING              	|  Ageing                    	|
             *     | USAGE               	|  Usage                     	|
             *     | INTEREST_TAX        	|  Interest Tax              	|
             *     | BILLING             	|  Billing Scheme            	|
             *     | GL                  	|  General Ledger Numeration 	|
             *     | INST_FEE            	|  Installment Fee           	|
             *     | INSTALLMENT         	|  Installment Scheme        	|
             *     | THRESHOLD           	|  Threshold                 	|
             *     | TECHNICAL           	|  Technical                 	|
             *     | FX                  	|  Conversion                	|
             *     | REDEFINITION        	|  Redefinition              	|
             *
             * @example AGEING
             */
            tariffRole?: string;
            /**
             * Format: date
             * @description Date from which tariff data is active (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            tariffStartDate?: string;
            /**
             * @description Tariff type code.
             *
             * @example MTP_CALC_RULE
             */
            tariffTypeCode?: string;
            /**
             * @description Tariff type name.
             *
             * @example BCC MTP Calculation Rule
             */
            tariffTypeName?: string;
            /**
             * @description Tariff value.
             *
             * @example Zero tariff
             */
            tariffValue?: string;
            /**
             * @description A flag that indicates whether the tariff is volume-based.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | N                   	|
             *     | Y                   	|
             *
             * @example Y
             */
            volumeBased?: string;
        };
        ContractFinancial: {
            /**
             * @description Amount of additional credit limit assigned to the contract. Amount expressed in the contract currency.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 172.23
             */
            additionalCreditLimit?: number;
            /**
             * Format: date
             * @description Additional credit limit effective date (YYYY-MM-DD format). Defines when additional credit limit becomes effective.
             *
             * @example 2021-06-25
             */
            additionalCreditLimitEffectiveDate?: string;
            /**
             * Format: date
             * @description Additional credit limit expiration date (YYYY-MM-DD format). Defines when additional credit limit expires.
             *
             * @example 2021-06-25
             */
            additionalCreditLimitExpiryDate?: string;
            amendmentDate: components["schemas"]["amendmentDate"];
            /**
             * @description Contract's available amount. Amount expressed in the contract currency.
             *
             *     Presented as a positive amount (without a minus sign) but can be a negative number depending on the CMS configuration.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 12114.21
             */
            availableAmount?: number;
            /**
             * @description Contract's balance. Amount expressed in the contract currency.
             *
             *     Presented as a negative amount (with a minus sign) but can be a positive number depending on CMS configuration.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 15123.56
             */
            balance?: number;
            /**
             * @description The amount of contract's blocked funds. Amount expressed in the contract currency.
             *
             *     Presented as a positive amount (without a minus sign) but can be a negative number depending on CMS configuration.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 301.19
             */
            blockedAmount?: number;
            clientId: components["schemas"]["clientId"];
            contractId: components["schemas"]["contractId"];
            /**
             * @description Credit limit assigned to the contract. Amount expressed in the contract currency.
             *
             *     Presented as a positive amount (without a minus sign) but can be a negative number depending on CMS configuration.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1231.78
             */
            creditLimit?: number;
            /**
             * Format: date
             * @description Date when the credit limit becomes effective (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            creditLimitEffectiveDate?: string;
            /**
             * @description Currency of the due amount (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency: string;
            /**
             * @description Currency of the due amount (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            currencyNumericCode?: string;
            /**
             * @description Due amount for the current billing cycle. Amount expressed in the contract currency.
             *
             *     Presented as a negative amount (with a minus sign) but can be a positive number depending on CMS configuration.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 165.99
             */
            currentDueAmount?: number;
            /**
             * @description Delinquency history.
             *     24-digit field showing the cardholder's short delinquency history of the last 24 billing cycles,
             *     each digit corresponds to a single billing cycle and may take on these values:
             *       * Digits 1, 2, 3, ... etc. extended by '+' symbol - the value of delinquency level in given cycle.
             *         * 0 - monthly payment was made on time
             *         * 1 - monthly payment was overdue one month
             *         * 2 - monthly payment was overdue for two months, etc.
             *       * '+' symbol - funds on Due balance.
             *       * '_' symbol - there is no history for the billing cycle.
             *       * 'E' symbol - no debt in the billing cycle
             *
             *     The field should be read from right to left. The first character represents the recent billing cycle.
             *
             *     Examples:
             *
             *     1) The value 321+E___________________ means the following:
             *       - 3 - funds are on OVD_03 balance in the current cycle
             *       - 2 - funds were on OVD_02 balance in the previous cycle
             *       - 1 - funds were on OVD_01 balance
             *       - '+' - funds on Due balance
             *       - E - there was no debt in this cycle
             *       - All the rest 19 characters are indicated as '_' since there are only 5 billing cycles in the contract history.
             *
             *     2) Let's have a contract, which has monthly billing and which is 10 months old by today. The contract has a debit transaction right after its creation and has never been paid. We will see the following history: E654321+++______________
             *
             *     That should be read as follows. From right to left: from 10 to 7 months ago the funds were on Due balance (+), 6 months ago funds were on OVD_01 balance (1), 5 months ago funds were on OVD_02 balance (2), ..., 1 month ago funds were on OVD_06 balance (6), the current period is not closed, so it's marked as 'E' - no debt.
             *
             *     Then client repaid and does not have any debts for the next 10 months. The history will change as follows: EEEEEEEEEEE654321+++____
             *
             * @example 888887654321++E_________
             */
            delinquencyHistory?: string;
            /**
             * @description Contract's disputed amount. Amount expressed in the contract currency.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 230.3
             */
            disputeAmount?: number;
            /**
             * Format: date
             * @description Payment due date for the billing cycle (YYYY-MM-DD format).
             *
             *     Date by which cardholder has to repay **Minimum To Pay** amount to avoid excess charges and delinquency processing.
             *     This date is usually printed on the cardholder's statement.
             *
             *     The date is calculated by the CMS when the billing cycle is closed, according to Issuer-specific configuration.
             *     Possible configuration:
             *       * First day of the cycle (no grace days)
             *       * Number of days (X days) after the first day of the cycle.
             *
             * @example 2021-04-28
             */
            dueDate?: string;
            /**
             * Format: date
             * @description Contract's last billing grace date (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            graceDate?: string;
            /**
             * @description Amount expressed in the contract currency.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 49.3
             */
            lastPaymentAmount?: number;
            /**
             * Format: date
             * @description Date the last payment was made (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            lastPaymentDate?: string;
            /**
             * Format: int64
             * @description Main contract record id from the CMS database.
             *
             * @example 541984165419
             */
            mainContractId?: number;
            /**
             * @description The contract number of the main contract.
             *
             * @example 915555______0017
             */
            mainContractNumber?: string;
            /**
             * @description Contract's overlimit amount.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 689.9
             */
            overlimitAmount?: number;
            /**
             * Format: int64
             * @description Parent contract record id from the CMS database.
             *
             * @example 67038174
             */
            parentContractId?: number;
            /**
             * @description The contract number of the parent contract number.
             *
             * @example ABC_11810015631
             */
            parentContractNumber?: string;
            /**
             * @description Contract's overdue amount. Amount expressed in the contract currency.
             *
             *     Presented as a negative amount (with a minus sign) but can be a positive number depending on CMS configuration.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 140.11
             */
            pastDueAmount?: number;
            /**
             * Format: date
             * @description The date on which the delinquency arose (format: YYYY-MM-DD). It is set when funds are transferred from a standard account to a delinquency account.
             *
             *     The field is filled only when a past due balance exists (past due amount is not repaid).
             *     The date on which delinquency arises is set in the Past Due Date field when funds are transferred from a standard account to a delinquency account
             *
             * @example 2021-06-25
             */
            pastDueDate?: string;
            /**
             * Format: int32
             * @description The total number of days is calculated from `pastDueDate`.
             *     The field is filled only when a past due balance exists (past due amount is not repaid).
             *
             *     For example, delinquency arose on 01 March. This date is shown in the `pastDueDate` field. On 15 March, the total number of past due days shown in the Past Due Days field is 15 days.
             *
             * @example 233
             */
            pastDueDays?: number;
            /**
             * @description Previous credit limit assigned to the contract. Amount expressed in the contract currency.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1240.1
             */
            previousCreditLimit?: number;
            /**
             * Format: date
             * @description Previous credit limit effective date. The date when the previous credit limit became effective (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            previousCreditLimitEffectiveDate?: string;
            /**
             * @description Temporary credit limit assigned to the contract. Amount expressed in the contract currency.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1000
             */
            temporaryCreditLimit?: number;
            /**
             * Format: date
             * @description Temporary credit limit effective date. Defines when temporary credit limit becomes effective for the contract (YYYY-MM-DD format).
             *
             * @example 2030-06-25
             */
            temporaryCreditLimitEffectiveDate?: string;
            /**
             * Format: date
             * @description Temporary credit limit expiration date. Defines when temporary credit limit expires (YYYY-MM-DD format).
             *
             * @example 2030-07-25
             */
            temporaryCreditLimitExpiryDate?: string;
            /**
             * @description Contract's total due amount. Amount expressed in the contract currency.
             *
             *     Presented as a negative amount (with a minus sign) but can be a positive number depending on CMS configuration.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1500
             */
            totalDueAmount?: number;
        };
        AccountContractIdentifierWithClientIdentifier: {
            accountContractId: components["schemas"]["accountContractId"];
            clientId?: components["schemas"]["clientId"];
        };
        AccountContractIdentifier: {
            accountContractId: components["schemas"]["accountContractId"];
        };
        ClientIdentifierWithRelinkType: {
            clientId: components["schemas"]["clientId"];
            /**
             * @description The field is used to choose the mode for changing a client for a contract tree.
             *
             *     | **Possible values** 	| **Description**                                                                                                     	|
             *     |---------------------	|---------------------------------------------------------------------------------------------------------------------	|
             *     | ALL                 	| the client will be changed for the entire account contract tree                                                     	|
             *     | THIS                	| the client will be changed only for the specified account contract                                                  	|
             *     | DOWN                	| the client will be changed for all contracts (including cards) in the hierarchy that are under the account contract 	|
             *
             *     The default value is "ALL".
             *
             * @default ALL
             * @example ALL
             * @enum {string}
             */
            relinkType: "ALL" | "THIS" | "DOWN";
        };
        TechnicalAccounts: {
            /** @description List of `TechnicalAccount`.
             *      */
            technicalAccounts: components["schemas"]["TechnicalAccount"][];
        };
        TechnicalAccount: {
            /**
             * @description Identification number of the account template the account is based on.
             *
             * @example 203040
             */
            accountTemplateId?: string;
            /**
             * @description Alphanumeric description of the account template the account is based on.
             *
             * @example BCC Current Retail
             */
            accountTemplateName?: string;
            /**
             * Format: int64
             * @description Technical account priority, which influences the order of account interest accrual and the order of repayments to loan accounts.
             *
             * @example 67
             */
            ageingPriority?: number;
            /**
             * @description Identification number of the technical account to which funds are transferred when due normalization is performed.
             *
             * @example 21611840
             */
            ageingTechnicalAccountId?: string;
            /**
             * @description Alphanumeric description of the technical account to which funds are transferred when due normalization is performed.
             *
             * @example BCC Billed Grace Retail
             */
            ageingTechnicalAccountName?: string;
            /**
             * @description General ledger account number used for analytic accounting.
             *
             * @example CCREUR-LOAN-978
             */
            analyticNumber?: string;
            /**
             * @description Current technical account balance.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1240.1
             */
            balance?: number;
            billingCycleNumber?: components["schemas"]["billingCycleNumber"];
            /**
             * @description Technical account category.
             *
             *     | **Possible values** 	|      **Description**      	|
             *     |:-------------------:	|:-------------------------:	|
             *     |          C          	|       Personal Limit      	|
             *     |          S          	|        Shared Limit       	|
             *     |          D          	|           Dispute         	|
             *     |          I          	|        Pay Immediate      	|
             *     |          P          	|         Payment Due       	|
             *     |          O          	|            Other          	|
             *     |          T          	|       Transit To ...      	|
             *     |          X          	|           Primary         	|
             *     |          p          	|  Credit Limit Payment Due 	|
             *     |          i          	|    Credit Limit Overdue   	|
             *
             * @example O
             */
            category?: string;
            /**
             * Format: int64
             * @description Contract record id from the CMS database of contract for which technical account is created.
             *
             * @example 984621965
             */
            contractId?: number;
            /**
             * @description Contract number for which technical account is created.
             *
             * @example 111235697296337
             */
            contractNumber?: string;
            /**
             * @description Technical account currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency?: string;
            /**
             * @description Technical account currency (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            currencyNumericCode?: string;
            /**
             * @description Rule for calculating due normalization dates for the technical account.
             *
             *     | **Possible values** 	| **Description**  	|
             *     |---------------------	|------------------	|
             *     | S                   	|  Sliding         	|
             *     | s                   	|  Sliding + Clear 	|
             *     | O                   	|  Value Date Due  	|
             *     | E                   	|  End Cycle Due   	|
             *     | C                   	|  Contract Due    	|
             *     | P                   	|  Payment Due     	|
             *     | L                   	|  Long Payment Due	|
             *     | F                   	|  Fixed Day Due   	|
             *     | Q                   	|  Quarter         	|
             *     | N                   	|  None            	|
             *
             * @example S
             */
            dueType?: string;
            /**
             * Format: date
             * @description Technical cycle end date (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            endDate?: string;
            /**
             * @description Shows whether the technical account balance is considered during the amount available calculation.
             *
             * @example true
             */
            inAmountAvailable?: boolean;
            /**
             * @description Interest fee rate for the technical account.
             *
             *     The field can contain values up to 2 decimal places. A dot is used as a decimal separator.
             *
             * @example 156.56
             */
            interestFeeRate?: number;
            /**
             * @description Interest rate for the technical account.
             *
             *     The field can contain values up to 2 decimal places. A dot is used as a decimal separator.
             *
             * @example 10
             */
            interestRate?: number;
            /**
             * @description Identification number of the technical account to which interest accrued for the account is transferred.
             *
             * @example 21611750
             */
            interestTechnicalAccountId?: string;
            /**
             * @description Alphanumeric description of the technical account to which interest accrued for the account is transferred.
             *
             * @example Cl Loan Int
             */
            interestTechnicalAccountName?: string;
            /**
             * @description Minimum technical account balance.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 100
             */
            lowerLimit?: number;
            /**
             * @description Identification number of the technical account to which excessive funds will be transferred if the account balance exceeds the value of the `upperLimit` field.
             *
             * @example 21611760
             */
            overLimitTechnicalAccountId?: string;
            /**
             * @description Alphanumeric description of the technical account to which excessive funds will be transferred if the account balance exceeds the value of the `upperLiimit` field.
             *
             * @example CH Current/Credits
             */
            overLimitTechnicalAccountName?: string;
            /**
             * @description Technical account's blocked amount not considering blocked amounts of the subcontracts.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 150.9
             */
            ownBlockedAmount?: number;
            /**
             * Format: int64
             * @description Technical account priority, which influences the order of account interest accrual and the order of repayments to loan accounts.
             *
             * @example 67
             */
            paymentPriority?: number;
            startBalance?: components["schemas"]["billingStartBalance"];
            /**
             * Format: date
             * @description Technical cycle start date (YYYY-MM-DD format).
             *
             * @example 2021-06-25
             */
            startDate?: string;
            /**
             * @description General ledger account number used for synthetic accounting.
             *
             * @example CCREUR-LOAN-978
             */
            syntheticNumber?: string;
            /**
             * Format: int64
             * @description Unique identifier of the technical account record in the database.
             *
             * @example 2156184
             */
            technicalAccountId?: number;
            /**
             * @description Technical account code.
             *
             * @example BF
             */
            technicalAccountCode?: string;
            /**
             * @description Technical account name.
             *
             * @example Cl Loan Int
             */
            technicalAccountName?: string;
            /**
             * @description Technical account type.
             *
             * @example BCC Current Retail
             */
            technicalAccountType?: string;
            /**
             * @description Technical account's blocked amount considering blocked amounts of the subcontracts.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 199.9
             */
            totalBlockedAmount?: number;
            /**
             * @description Maximum technical account balance.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 5000
             */
            upperLimit?: number;
        };
        ClassifierCreation: {
            classifierValue: components["schemas"]["classifierValue"];
            /**
             * Format: date
             * @description Date until which the classifier should obtain new value (YYYY-MM-DD format).
             *
             * @example 2031-06-25
             */
            endDate?: string;
            /**
             * Format: date
             * @description Date from which the classifier should obtain new value (YYYY-MM-DD format).
             *
             * @example 2031-06-25
             */
            startDate?: string;
        };
        ClientClassifiers: {
            /** @description List of `Classifier` for the client.
             *      */
            clientClassifiers: components["schemas"]["Classifier"][];
        };
        ContractClassifiers: {
            /** @description List of `Classifier` for the contract.
             *      */
            contractClassifiers: components["schemas"]["Classifier"][];
        };
        Classifier: {
            classifierCode: components["schemas"]["classifierCode"];
            /**
             * @description Classifier name.
             *
             * @example ABU
             */
            classifierName?: string;
            classifierValue?: components["schemas"]["classifierValue"];
            /**
             * @description Classifier value name.
             *
             * @example Yes
             */
            classifierValueName?: string;
            /**
             * @description Classifier status. Shows whether the classifier value is currently active or not.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | Active              	|
             *     | Inactive            	|
             *     | Closed              	|
             *
             * @example Active
             */
            status: string;
        };
        CvcVerificationResult: {
            /**
             * @description Verification results.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | CVC2_CORRECT        	|
             *     | CVC2_NOT_CORRECT    	|
             *
             * @example CVC2_CORRECT
             */
            verificationResult: string;
        };
        CvcVerification: {
            cardExpiryDate: components["schemas"]["cardExpiryDate"];
            /**
             * @description Card Verification Code 2 (CVC2). Other names: Card Security Code (CSC), Card Verification Value 2 (CVV2).
             *
             * @example 347
             */
            cardVerificationCode: string;
        };
        PinVerification: {
            cardExpiryDate: components["schemas"]["cardExpiryDate"];
            cardSequenceNumber?: components["schemas"]["plasticSequenceNumber"];
            /**
             * @description PIN block in encrypted form.
             *     The Issuer is allowed to use only the following formats of the PIN block:
             *       * ISO-0 format
             *       * ISO-1 format
             *
             *     If the PIN block is encrypted with asymmetric encryption using a public RSA key then:
             *       * Key-Index field must be provided
             *       * MP must configure in API the ISO format used by the Issuer.
             *
             *     If the PIN block is encrypted with symmetric encryption using ZPK (Zone Pin Key) then:
             *       * Key-Index field shouldn't be provided
             *       * only ISO-0 format is allowed.
             *
             * @example 69DF3BAA5CAF165A940FC1F8AE68573B8AF93F5EDB20E208953E87CC50C19F0BB11A448AE76FA87A8940EE290FEBC2518DDAAB85BF4AA393FAE060F4CD30CC73AAFF3755680E59FC59BF8D2303B7990C1EC648A0D24D66D57DAB0147434B54955FEA38890C1AFDE6C60EE6D9174BC567D151669576D0395A1B235AF4CD7C581EF238FD26E1DF53085B09DDA9A81EE9DA02D7C7C9E0C266B60C7E9BAC046DCF704EC6CA31486CF6B562C28D47CD6ED124CAE28D3A2E590CFBAA90604090F601B16423E375D6CC01FAC5E0125F7BCC735ED53F88CB7D34FDEFBB19A0EE09F156E337150CE96B2A16419D0F0981CCE44EC8A946CEA69A238AA04EC46FDFFE91A03D
             */
            pinBlock: string;
        };
        PinVerificationResult: {
            /**
             * @description Verification result.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | PIN_CORRECT         	|
             *     | PIN_NOT_CORRECT     	|
             *     | VERIFICATION_ERROR  	|
             *
             * @example PIN_CORRECT
             */
            verificationResult: string;
        };
        PinCreation: {
            cardExpiryDate: components["schemas"]["cardExpiryDate"];
            cardSequenceNumber?: components["schemas"]["plasticSequenceNumber"];
            /**
             * @description PIN block in encrypted form.
             *     The Issuer is allowed to use only the following formats of the PIN block:
             *       * ISO-0 format
             *       * ISO-1 format
             *
             *     If the PIN block is encrypted with asymmetric encryption using a public RSA key, then:
             *       * `Key-Index` field must be provided
             *       * The MP must configure in an API configuration the ISO format used by the Issuer.
             *
             *     If the PIN block is encrypted with symmetric encryption using a ZPK (Zone Pin Key), then:
             *       * The `Key-Index` field should not be provided.
             *       * Only the ISO-0 format is allowed.
             *
             * @example 69DF3BAA5CAF165A940FC1F8AE68573B8AF93F5EDB20E208953E87CC50C19F0BB11A448AE76FA87A8940EE290FEBC2518DDAAB85BF4AA393FAE060F4CD30CC73AAFF3755680E59FC59BF8D2303B7990C1EC648A0D24D66D57DAB0147434B54955FEA38890C1AFDE6C60EE6D9174BC567D151669576D0395A1B235AF4CD7C581EF238FD26E1DF53085B09DDA9A81EE9DA02D7C7C9E0C266B60C7E9BAC046DCF704EC6CA31486CF6B562C28D47CD6ED124CAE28D3A2E590CFBAA90604090F601B16423E375D6CC01FAC5E0125F7BCC735ED53F88CB7D34FDEFBB19A0EE09F156E337150CE96B2A16419D0F0981CCE44EC8A946CEA69A238AA04EC46FDFFE91A03D
             */
            newPinBlock: string;
        };
        ParameterModification: {
            parameterValue: components["schemas"]["parameterValue"];
        };
        ContractParameters: {
            /** @description List of `ContractParameter`
             *      */
            contractParameters: components["schemas"]["ContractParameter"][];
        };
        ContractParameter: {
            /**
             * @description Contract parameter code.
             *
             * @example MTP_CALC_RULE
             */
            parameterCode: string;
            /**
             * @description Contract parameter name.
             *
             * @example MTP Calculation rule
             */
            parameterName?: string;
            /**
             * @description Contract parameter value.
             *
             * @example 45
             */
            parameterValue?: string;
        };
        ChargeFee: {
            /**
             * @description Amount to charge a fee. If the field is not passed in the request, the amount is taken from the tariff level.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1200
             */
            amount?: number;
            /**
             * @description Transaction currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency?: string;
            /**
             * @description Identifier of the fee type in the MP's CMS system.
             *
             * @example MB_1
             */
            feeTypeId: string;
            /**
             * Format: date
             * @description Posting date (YYYY-MM-DD format). If empty, current banking date will be used.
             *     If future date, fee record will stay in `Waiting` status and will be posted only when banking date reaches defined `postingDate`. Past date not recommended.
             *
             * @example 2031-06-25
             */
            postingDate?: string;
            /**
             * @description Unique reference number for fee transaction record.
             *     If filled system will check the uniqueness of this value. It will not be possible to create two records with the same value.
             *     Exported as SRN (Source Reference Number).
             *
             * @example 122357012766
             */
            uniqueReferenceNumber: string;
        };
        Transactions: {
            count: components["schemas"]["paginationCount"];
            limit: components["schemas"]["paginationLimit"];
            offset: components["schemas"]["paginationOffset"];
            total: components["schemas"]["paginationTotal"];
            /** @description List of `Transaction`.
             *      */
            transactions: components["schemas"]["Transaction"][];
        };
        Transaction: {
            /**
             * @description Currency of account which was debited/credited for base amount and fee amount. (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            accountCurrency?: string;
            /**
             * @description Currency of account which was debited/credited for base amount and fee amount. (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            accountCurrencyNumericCode?: string;
            /**
             * @description Acquirer Reference Number.
             *
             * @example 06116638346121300000317
             */
            arn?: string;
            authorizationCode?: components["schemas"]["authorizationCode"];
            /**
             * @description Determines whether the transaction was authorized.
             *
             * @example true
             */
            authorized?: boolean;
            /**
             * Format: int64
             * @description Unique identifier of the authorization document record in the MP's CMS database.
             *
             * @example 3177523
             */
            authorizationId?: number;
            /**
             * @description Amount which contract is debited/credited for, not including fee amount.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1567.23
             */
            baseAmount?: number;
            /** @description List of `TransactionCustomData`.
             *      */
            customTransactionData?: components["schemas"]["TransactionCustomData"][];
            /**
             * @description Custom Transaction Condition Code.
             *
             * @example ATMC
             */
            customTransactionCondition?: string;
            /**
             * @description Custom transaction type code.
             *
             * @example IBF
             */
            customTransactionTypeCode?: string;
            /**
             * @description Fee amount for which the contract is debited for, associated with the transaction.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 910.18
             */
            feeAmount?: number;
            /**
             * @description Description of fees included in the total `feeAmount`.
             *     Final format of the field depends on the product setup. Typical presentation format: [`feeCode` `feeAmount` `feeCurrency`], [`feeCode` `feeAmount` `feeCurrency`]
             *
             * @example 2.00 (EUR)
             */
            feeDescription?: string;
            /**
             * Format: int64
             * @description Unique identifier of the financial document record in the MP's CMS database.
             *
             * @example 1254151
             */
            financialDocumentId?: number;
            /**
             * @description Description of FX Rates used in the transaction. It shows details related to currency conversion applied during the transaction posting.
             *     The format varies on several factors, first of all, whether this is a cross-rate or not.
             *       * In case of '1 step conversion (direct)':
             *         [<FX rate type>:] <FX rate> (<From currency> -> <To currency>)
             *       * For '2-step conversion (via intermediate currency)':
             *         [<FX rate type>:] <FX rate1> (<From currency1> -> <To currency1>); <FX rate2> (<From currency2> -> <To currency3>)
             *       * In case of cross-rate ('2-steps conversion (with no intermediate currency)'):
             *         [<FX rate type>:] <FX rate> (<From currency> -> <To currency>) (cross rate)
             *
             *     Examples:
             *       * 0.8 (USD -> EUR)
             *       * PS Rate: 0.801 (EUR -> GBP)
             *       * PS Rate: 0.8009 (EUR -> GBP)
             *       * PS Rate: 0.832468 (USD -> EUR); 1.5 (EUR -> GBP)
             *
             * @example PS Rate: 0.203 (PLN -> EUR)
             */
            fxRate?: string;
            installmentChainId?: components["schemas"]["installmentChainId"];
            installmentPlanStatus?: components["schemas"]["installmentPlanStatus"];
            mcc?: components["schemas"]["mcc"];
            mccDescription?: components["schemas"]["mccDescription"];
            merchantCountry?: components["schemas"]["merchantCountry"];
            merchantLocation?: components["schemas"]["merchantLocation"];
            merchantName?: components["schemas"]["merchantName"];
            postingDate?: components["schemas"]["postingDate"];
            responseCode?: components["schemas"]["responseCode"];
            responseCodeDescription?: components["schemas"]["responseCodeDescription"];
            rrn?: components["schemas"]["rrn"];
            serviceClassCode?: components["schemas"]["serviceClassCode"];
            /**
             * @description Settlement Amount:
             *     - for transactions from Payment Scheme contains amount which Payment Scheme sent to debit/credit card for;
             *     - for on-us transactions contains the amount which the CMS is debiting/crediting on the contract;
             *     - for internal transactions (like due normalizations or interest accruals) has the same value as the transaction amount.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 128
             */
            settlementAmount?: number;
            /**
             * @description Settlement currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            settlementCurrency?: string;
            /**
             * @description Settlement currency (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            settlementCurrencyNumericCode?: string;
            sourceContractCbsNumber?: components["schemas"]["cbsNumber"];
            sourceContractId?: components["schemas"]["sourceContractId"];
            sourceContractNumber?: components["schemas"]["sourceContractNumber"];
            srn?: components["schemas"]["srn"];
            targetContractCbsNumber?: components["schemas"]["cbsNumber"];
            targetContractId?: components["schemas"]["targetContractId"];
            targetContractNumber?: components["schemas"]["targetContractNumber"];
            /**
             * @description Masked token number.
             *
             * @example 161212______0128
             */
            tokenNumberSafe?: string;
            /**
             * @description Transaction amount.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 471.9
             */
            transactionAmount?: number;
            /**
             * @description Transaction currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            transactionCurrency?: string;
            /**
             * @description Transaction currency (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            transactionCurrencyNumericCode?: string;
            /**
             * Format: date-time
             * @description Transaction date. Timestamp (format: YYYY-MM-DDThh:mm:ssZ).
             *
             * @example 2031-06-25T12:00:00Z
             */
            transactionDate?: string;
            /**
             * @description Description of the transaction from the CMS system.
             *
             * @example Fee Posting
             */
            transactionDescription?: string;
            transactionId?: components["schemas"]["transactionId"];
            /**
             * @description Transaction status. May contains the following values:
             *
             *     | **Possible values**    	| **Description**                                                     	|
             *     |------------------------	|---------------------------------------------------------------------	|
             *     | Funds blocked          	| Funds were blocked as a result of the authorization                 	|
             *     | Authorisation reversed 	| Funds were unblocked as a result of a reverse authorization         	|
             *     | Authorisation expired  	| Funds were unblocked as financial documents have not been processed 	|
             *     | Processed              	| The document has been successfully posted                           	|
             *     | Reversed               	| Reversal document was successfully posted                           	|
             *
             *     In case of an unsuccessful transaction, field will contain `responseCodeDescription`.
             *
             * @example Reversed
             */
            transactionStatus?: string;
            transactionType?: components["schemas"]["transactionType"];
            transactionTypeCode?: components["schemas"]["transactionTypeCode"];
            /**
             * @description Wallet identifier.
             *
             *      | **Sample values**   | **Description**                                                                                   |
             *      |-------------------  |-------------------------------------------------------------------------------------------------- |
             *      | 103                 | Apple Pay                                                                                         |
             *      | 216                 | Android Pay                                                                                       |
             *      | 217                 | Samsung Pay                                                                                       |
             *      | 327                 | Remote Commerce Programs (e.g. MDES for Merchants, Mastercard Secure Card on File, Click to Pay)  |
             *      | 337                 | Garmin Pay                                                                                        |
             *
             *      Other values possible.
             *
             * @example 103
             */
            walletId?: string;
        };
        CvcSearchCriteria: {
            cardExpiryDate: components["schemas"]["cardExpiryDate"];
        };
        Cvc: {
            /**
             * @description Card Verification Code 2 (CVC2), known also as a Card Security Code (CSC) or a Card Verification Value 2 (CVV2).
             *
             *     Field is returned if `Customer-Public-Rsa-Key` header is empty.
             *
             * @example 347
             */
            cardVerificationCode?: string;
            /**
             * @description Card verification code encrypted with the `Customer-Public-Rsa-Key`.
             *
             *     Field is returned if `Customer-Public-Rsa-Key` header is not empty.
             *
             * @example 87D039805B7EDBF7CFD3E72658355A3855C0CB6F1456D6B10498AD63B06904D0282ECCBB5B6A59775C78B9373C13BF53629096451CD3B66501CF198D48A755AC2EC8EC2F204A1E0C29994E14A816300A75791743B82C3C8884EFF363A8CF6D64BF88CD507ADEEA2112734FDAD0E73588FE3CE3D89469A819A9BE807D2C87BCEC3F868DAFF4B27CD213A9E1D60FF8A05CD0EB2EA551D75A38650E926BB79283FBA469642C88FEE332B02C58860EFEF41DB0D2866DE44C8F89573EB2B7C99EBAE994E0AF16F8C8E9839DFCA4C21D2CDB08B8D35456C46113546B0EE3DDF1F329A7939E6EF77C3BD213A02BB47F4DAFD74314AAE020FA0C390E908658A669517A7A
             */
            encryptedCardVerificationCode?: string;
        };
        TransactionFees: {
            /** @description List of `TransactionFee`.
             *      */
            transactionFees: components["schemas"]["TransactionFee"][];
        };
        TransactionFee: {
            /**
             * @description Fee amount.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 199.9
             */
            amount?: number;
            /**
             * @description Currency of the fee (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency?: string;
            /**
             * @description Currency of the fee (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            currencyNumericCode?: string;
            /**
             * @description Fee code of the fee which should be applied for the transaction. The fee code which can be used must be configured in the MP's CMS.
             *
             * @example FX_FEE
             */
            feeCode: string;
            /**
             * Format: int64
             * @description Fee record id from the CMS system.
             *
             * @example 84650468
             */
            feeId: number;
            /**
             * @description Name of the fee from the CMS system.
             *
             * @example Retail (EuroCard Acq)
             */
            feeName?: string;
            /**
             * Format: int64
             * @description Transaction record id to which the given fee was generated.
             *
             * @example 900001
             */
            transactionId: number;
        };
        OnlinePinAttemptsClearance: {
            /**
             * @description This field must be always `true`. Flag informing if Online PIN Try Counter should be cleared.
             *
             * @example true
             */
            cleared: boolean;
        };
        OnlinePinAttemptsClearanceForClient: {
            /**
             * @description This field must be always `true`. Flag determines if the reset of PIN attempts will happen only on the client or also on all client cards.
             *
             * @example true
             */
            clearAttemptsOnClientCards: boolean;
        };
        TransactionDocuments: {
            count: components["schemas"]["paginationCount"];
            limit: components["schemas"]["paginationLimit"];
            offset: components["schemas"]["paginationOffset"];
            total: components["schemas"]["paginationTotal"];
            /** @description List of `TransactionDocument`.
             *      */
            transactionDocuments: components["schemas"]["TransactionDocument"][];
        };
        TransactionDocument: {
            transactionBaseInfo: components["schemas"]["TransactionBaseInfo"];
            transactionTypeInfo: components["schemas"]["TransactionTypeInfo"];
            transactionIdentifiers: components["schemas"]["TransactionIdentifiers"];
            transactionAddInfo?: components["schemas"]["TransactionAddInfo"];
            transactionMerchantInfo?: components["schemas"]["TransactionMerchantInfo"];
            transactionValues?: components["schemas"]["TransactionValues"];
        };
        TransactionAddInfo: {
            /**
             * @description Additional transaction data (TAG=VALUE; format)
             *
             * @example PSCR=Y0;CVR=204000044000
             */
            addInfo?: string;
            /**
             * @description Transaction attributes. Attributes which determine the value of `transactionCondition` field.
             *
             * @example 67;,ATM,TERM_UNATT,TERM,TERM_CHIP,TERM_KEY_ENTRY,AUTHENTICATED;
             */
            attributes1?: string;
            /**
             * @description Secondary transaction attributes.
             *
             * @example CARD_CHIP,CHIP_SVC,READ_CHIP,DATA_TRACK,DATA_CHIP
             */
            attributes2?: string;
            /**
             * @description Transaction conditions. The transaction condition value is specified at financial document (transaction) record creation.
             *     MP's CMS creates the value based on the transaction message received from the device.
             *     The type of transaction condition depends on the executed transaction type.
             *     Transaction conditions define the document processing method.
             *
             * @example ATMC
             */
            transactionCondition?: string;
        };
        TransactionBaseInfo: {
            cardExpiryDate?: components["schemas"]["cardExpiryDate"];
            cardSequenceNumber?: components["schemas"]["plasticSequenceNumber"];
            postingDate?: components["schemas"]["postingDate"];
            /**
             * @description Document processing status.
             *
             *     | **Possible values** 	| **Description**                                                                                                                                                                                                                                                                                                                                 	|
             *     |---------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
             *     | Closed              	| Reversal (document) has been successfully posted.                                                                                                                                                                                                                                                                                               	|
             *     | Decline             	| Document was rejected when it was processed.                                                                                                                                                                                                                                                                                                    	|
             *     | Decline Service     	| Document has been posted with the dispute contract.                                                                                                                                                                                                                                                                                             	|
             *     | From Stand-In       	| Obsolete status.                                                                                                                                                                                                                                                                                                                                	|
             *     | InActive            	| Document status after its reversal document was successfully posted, or authorization document status after its financial document was successfully posted.                                                                                                                                                                                     	|
             *     | Posted              	| Document has been successfully posted.                                                                                                                                                                                                                                                                                                          	|
             *     | PostPone            	| Status used for documents in specific chains on acquiring side.                                                                                                                                                                                                                                                                                 	|
             *     | Processed           	| Intermediary status of a document during processing. This status is often given for example, to a financial document in the "When available" category during the processing stage if the required amount is not available on contract accounts.                                                                                                 	|
             *     | Rejected            	| Document was rejected when it was loaded (for authorization documents).                                                                                                                                                                                                                                                                         	|
             *     | Suspended           	| Authorization document is waiting to be posted.                                                                                                                                                                                                                                                                                                 	|
             *     | System              	| Status assigned to Product Inspector technical docs.                                                                                                                                                                                                                                                                                            	|
             *     | Under Workflow      	| The document is being processed in the Workflow Management module. This status is assigned to documents when it is necessary to stop standard processing of documents for additional checks (manual review). For example, when manually entering a batch of documents, or if the corresponding documents were not found during reconciliation.” 	|
             *     | Waiting             	| Document is waiting.                                                                                                                                                                                                                                                                                                                            	|
             *
             * @example Decline Service
             */
            postingStatus?: string;
            responseCode?: components["schemas"]["responseCode"];
            responseCodeDescription?: components["schemas"]["responseCodeDescription"];
            /**
             * Format: date
             * @description Date when the transaction amount was converted from the settlement currency of the source bank into the settlement currency of the target bank (YYYY-MM-DD format).
             *
             * @example 2031-06-25
             */
            settlementDate?: string;
            sourceContractId?: components["schemas"]["sourceContractId"];
            sourceContractNumber?: components["schemas"]["sourceContractNumber"];
            targetContractId?: components["schemas"]["targetContractId"];
            targetContractNumber?: components["schemas"]["targetContractNumber"];
            /**
             * Format: date-time
             * @description Transaction date and time. (format: YYYY-MM-DDThh:mm:ssZ)
             *
             * @example 2031-06-25T12:00:00Z
             */
            transactionDate?: string;
        };
        TransactionIdentifiers: {
            /**
             * @description ARN - Acquiring Reference Number.
             *
             * @example 06116638346121300000317
             */
            arn?: string;
            /**
             * @description Original authorization number which, in case of annulation or devolution transaction, allows identifying the original transaction.
             *
             * @example 981561
             */
            authorizationCode?: string;
            /**
             * Format: int64
             * @description Identifier of the original transaction document in a document chain.
             *
             * @example 12479
             */
            originalTransactionDocumentId?: number;
            /**
             * Format: int64
             * @description Identifier of the previous transaction document in a document chain.
             *
             * @example 8494
             */
            previousTransactionDocumentId?: number;
            /**
             * @description Payment scheme reference number.
             *
             * @example 17167
             */
            paymentSchemeReferenceNumber?: string;
            rrn?: components["schemas"]["rrn"];
            srn?: components["schemas"]["srn"];
            transactionId?: components["schemas"]["transactionId"];
        };
        TransactionMerchantInfo: {
            mcc?: components["schemas"]["mcc"];
            mccDescription?: components["schemas"]["mccDescription"];
            merchantCountry?: components["schemas"]["merchantCountry"];
            merchantLocation?: components["schemas"]["merchantLocation"];
            merchantName?: components["schemas"]["merchantName"];
        };
        TransactionTypeInfo: {
            /**
             * @description Transaction type's direction.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | Credit              	|
             *     | Debit               	|
             *     | None                	|
             *
             * @example Credit
             */
            direction?: string;
            /**
             * @description Transaction document request category name.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | Adjustment          	|
             *     | Advice              	|
             *     | Part Advice         	|
             *     | Request             	|
             *     | Reversal            	|
             *
             * @example Request
             */
            requestCategory?: string;
            serviceClassCode?: components["schemas"]["serviceClassCode"];
            /**
             * @description Source contract category.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | Account             	|
             *     | Card                	|
             *     | Device              	|
             *
             * @example Device
             */
            sourceCategory?: string;
            /**
             * @description Transaction message code for incoming documents.
             *
             * @example CHANGE_PIN
             */
            sourceCode?: string;
            /**
             * @description Target contract category.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | Account             	|
             *     | Card                	|
             *     | Device              	|
             *
             * @example Account
             */
            targetCategory?: string;
            /**
             * @description Transaction document category.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | Auth                	|
             *     | Fin                 	|
             *     | DataCapture         	|
             *     | PreAuth             	|
             *     | Transit Auth        	|
             *     | Transit Preauth     	|
             *     | Auth Check          	|
             *     | Auth Check Transit  	|
             *     | PostAuth            	|
             *
             * @example PreAuth
             */
            transactionDocumentCategory?: string;
            transactionType?: components["schemas"]["transactionType"];
            transactionTypeCode?: components["schemas"]["transactionTypeCode"];
        };
        TransactionValues: {
            /**
             * @description Amount of interchange fee.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 49.9
             */
            interchangeFee?: number;
            /**
             * @description Interchange fee currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            interchangeFeeCurrency?: string;
            /**
             * @description Interchange fee currency (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            interchangeFeeCurrencyNumericCode?: string;
            /**
             * @description Transaction amount in the currency specified in the `reconciliationCurrency` field.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 209.9
             */
            reconciliationAmount?: number;
            /**
             * @description Currency used by the source bank to present transaction data to the payment scheme (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            reconciliationCurrency?: string;
            /**
             * @description Currency code defining currency of the amount in the field `reconciliationAmount` (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            reconciliationCurrencyNumericCode?: string;
            /**
             * @description Transaction settlement amount if present or otherwise transaction cardholder billing amount.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 140.9
             */
            settlementAmount?: number;
            /**
             * @description Currency code defining currency of the amount in the field `settlementAmount` (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            settlementCurrency?: string;
            /**
             * @description Currency code defining currency of the amount in the field `settlementAmount` (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            settlementCurrencyNumericCode?: string;
            /**
             * @description Amount of transaction in original currency.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 130.9
             */
            sourceAmount?: number;
            /**
             * @description Currency code defining currency of the amount in the field `sourceAmount` (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            sourceCurrency?: string;
            /**
             * @description Currency code defining currency of the amount in the field `sourceAmount` (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            sourceCurrencyNumericCode?: string;
            /**
             * @description Amount of any additional fee transaction related in account currency. Fees applied by the MP.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 123.1
             */
            transactionFeeAmount?: number;
            /**
             * @description Currency code defining currency of the fee in the field `transactionFeeAmount` (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            transactionFeeCurrency?: string;
            /**
             * @description Currency code defining currency of the fee in the field `transactionFeeAmount` (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            transactionFeeCurrencyNumericCode?: string;
        };
        TransactionContractDebit: {
            /**
             * @description Transaction amount to be deducted from the contract’s balance.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             *     Note: For some specific `transactionTypeCode` values (for example, `APSF` - paper statement fee) transaction amount is taken from the tariff level configured in the CMS (the `amount` value from the request is ignored, and cannot override the amount defined in the CMS for the tariff).
             *
             * @example 1254
             */
            amount: number;
            /**
             * @description Transaction currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency: string;
            /** @description An array that allows passing additional information to the created transaction record.
             *     Maximum length of all `tagName` and `tagValue` amounts to 255 characters.
             *      */
            customData?: components["schemas"]["TransactionCustomData"][];
            /**
             * @description Transaction description.
             *
             * @example Payment From Client Contract
             */
            description: string;
            /**
             * @description Fee code of the fee which should be applied for the transaction. The fee code which can be used must be configured in the MP's CMS.
             *
             * @example FX_FEE
             */
            feeCode?: string;
            /**
             * Format: date
             * @description Transaction posting date (YYYY-MM-DD format). If not filled the sysdate will be placed in the field.
             *
             * @example 2031-06-25
             */
            postingDate?: string;
            /**
             * @description Transaction type code. Transaction type code which can be used must be configured in the MP's CMS.
             *
             * @example FP
             */
            transactionTypeCode: string;
            /**
             * @description Transaction type extensions make it possible to more exactly determine the service that should be used to process a transaction.
             *     Transaction type extension is defined on transaction type configuration.
             *
             * @example Ext
             */
            transactionTypeExtension?: string;
            /**
             * @description Unique reference number for the transaction. If filled system will check the uniqueness of this value.
             *     It will not be possible to create two records with the same value. Exported as SRN (Source Reference Number).
             *
             * @example 122357012766
             */
            uniqueReferenceNumber?: string;
        };
        UsageLimitModification: {
            /**
             * Format: date-time
             * @description Effective date and time of the usage limit. (YYYY-MM-DDThh:mm:ssZ format)
             *
             * @example 2031-06-25T12:51:30Z
             */
            activityPeriodStartDate?: string;
            /**
             * Format: date-time
             * @description Expiration date and time of the usage limit. Date must be greater or equal to `activityPeriodStartDate`. (YYYY-MM-DDThh:mm:ssZ format)
             *
             * @example 2031-07-25T12:51:30Z
             */
            activityPeriodEndDate?: string;
            /**
             * @description Additional information (TAG=VALUE; format). Can be used to pass additional parameters for usage limit definition.
             *
             *     *Disclaimer: Possible usage of additional information should be agreed upon with the MP representative for each additional parameter (tag) passed to the CMS system.*
             *
             * @example EXC_SIC_LIST=0004;
             */
            addInfo?: string;
            /**
             * @description The currency of the maximum total amount of all transactions (`maxAmount`) and of a single transaction (`maxSingleAmount`) (format according to ISO 4217, alphanumeric code).
             *
             *     **Conditional mandatory field** - required if `maxAmount`, `maxSingleAmount` are passed.
             *
             * @example EUR
             */
            currency?: string;
            /**
             * @description Maximum transaction amount permitted for the specific limit period. Zero amount indicates no restrictions.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1851.1
             */
            maxAmount?: number;
            /**
             * Format: int64
             * @description Maximum number of transactions permitted for the specific limit period.
             *
             * @example 10
             */
            maxNumber?: number;
            /**
             * @description This field (if it is filled in) is used in calculating threshold values for the amount or number of transactions, depending on the value of the Algorithm field in the CMS.
             *     For example, for algorithms related to calculating the average or total value for the amount of transactions, the limit is calculated as a set percentage of the average or total calculated amount of transactions.
             *     If the algorithm is related to calculating the average or the total number of transactions, a set percentage is applied to the calculated number of transactions.
             *     For the 'Fixed' algorithm, a percentage is only applied to the `maxAmount` amount.
             *     I.e. if this field is filled in, the value received with it redefines the value of the `maxAmount` or `maxNumber` field (depending on the algorithm).
             *
             *     For a specific balance type, this field determines the maximum permissible total transaction amount for a set period, as a percentage of the available funds (amount available) of the corresponding balance type.
             *     If the balance type for a limiter is not specified, the maximum permissible transaction amount is calculated as a percentage of the contract credit limit.
             *
             *     A null value in this field means that no limits are set.
             *
             *     The field can contain values up to 2 decimal places. A dot is used as a decimal separator.
             *
             * @example 4
             */
            maxPercent?: number;
            /**
             * @description The maximum amount permitted for one transaction. Zero amount indicates no restrictions.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1000
             */
            maxSingleAmount?: number;
        };
        UsageLimitOriginalValue: {
            /**
             * @description This field must be always `true`. This is an action that restores usage limit parameters specified in the CMS (Service Package).
             *
             * @example true
             */
            restore: boolean;
        };
        UsageLimitResetting: {
            /**
             * @description This field must be always `true`. This is an action that resets counters for a usage limit.
             *
             * @example true
             */
            reset: boolean;
        };
        UsageLimits: {
            /** @description List of `UsageLimit`
             *      */
            usageLimits: components["schemas"]["UsageLimit"][];
        };
        UsageLimit: {
            /**
             * Format: date-time
             * @description Effective date and time of the usage limit (YYYY-MM-DDThh:mm:ssZ format).
             *
             * @example 2031-06-25T12:51:30Z
             */
            activityPeriodStartDate?: string;
            /**
             * Format: date-time
             * @description Expiration date and time of the usage limit (YYYY-MM-DDThh:mm:ssZ format).
             *     Date must be greater or equal to `activityPeriodStartDateDate`.
             *
             * @example 2031-07-25T12:51:30Z
             */
            activityPeriodEndDate?: string;
            /**
             * @description Additional Information (TAG=VALUE; format).
             *
             * @example EXC_SIC_LIST=0004;
             */
            addInfo?: string;
            /**
             * @description The currency of the maximum total amount of all transactions (`maxAmount`) and of a single transaction (`maxSingleAmount`) (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency?: string;
            /**
             * @description The currency of the maximum total amount of all transactions (`maxAmount`) and of a single transaction (`maxSingleAmount`) (format according to ISO 4217, numeric code).
             *
             * @example 978
             */
            currencyNumericCode?: string;
            currentUsage?: components["schemas"]["CurrentUsage"];
            /**
             * @description Maximum transaction amount permitted for the specific limit period. Zero amount indicates no restrictions.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 3000
             */
            maxAmount?: number;
            /**
             * Format: int64
             * @description Maximum number of transactions permitted for the specific limit period.
             *
             * @example 30
             */
            maxNumber?: number;
            /**
             * @description This field (if it is filled in) is used in calculating threshold values for the amount or number of transactions, depending on the value of the Algorithm field.
             *     For example, for algorithms related to calculating the average or total value for the amount of transactions, the limit is calculated as a set percentage of the average or total calculated amount of transactions.
             *     If the algorithm is related to calculating the average or total number of transactions, a set percentage is applied to the calculated number of transactions.
             *     For the 'Fixed' algorithm, a percentage is only applied to the `maxAmount` amount.
             *     I.e. if this field is filled in, the value received with it redefines the value of the `maxAmount` or `maxNumber` field (depending on the algorithm).
             *     For a specific balance type, this field determines the maximum permissible total transaction amount for a set period, as a percentage of the available funds (amount available) of the corresponding balance type.
             *     If the balance type for a limiter is not specified, the maximum permissible transaction amount is calculated as a percentage of the contract credit limit.
             *
             *     A null value in this field means that no limits are set.
             *
             *     The field can contain values up to 2 decimal places. A dot is used as a decimal separator.
             *
             * @example 10
             */
            maxPercent?: number;
            /**
             * @description Maximum amount permitted for one transaction. Zero amount indicates no restrictions.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 500
             */
            maxSingleAmount?: number;
            /**
             * @description Usage limit status.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | Active              	|
             *     | Closed              	|
             *     | Temporarily Active  	|
             *     | Temporarily Closed  	|
             *     | Expired             	|
             *     | Template Closed     	|
             *     | Service Deactivated 	|
             *     | Redefined           	|
             *
             * @example Active
             */
            status: string;
            usageLimitCode: components["schemas"]["usageLimitCode"];
        };
        CurrentUsage: {
            /**
             * @description The current state of limit usage - the amount of transactions to perform.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1250.6
             */
            availableAmount?: number;
            /**
             * Format: int64
             * @description The current state of limit usage - number of transactions to perform.
             *
             * @example 18
             */
            availableNumber?: number;
            /**
             * @description The current state of limit usage - the amount of already performed transactions.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 1749.4
             */
            usedAmount?: number;
            /**
             * Format: int64
             * @description The current state of limit usage - number of already performed transactions.
             *
             * @example 12
             */
            usedNumber?: number;
        };
        UsageLimitStatus: {
            /**
             * Format: date-time
             * @description Activation date and time of the usage limit (YYYY-MM-DDThh:mm:ssZ format).
             *
             * @example 2031-05-18T12:00:00Z
             */
            activationDate?: string;
            /**
             * Format: date-time
             * @description Deactivation date and time of the usage limit (YYYY-MM-DDThh:mm:ssZ format).
             *
             * @example 2031-05-18T12:00:00Z
             */
            deactivationDate?: string;
            /**
             * @description Status of usage limit.
             *     Only two actions on usage limit are possible to be set from the external system - Activation and Suspending
             *       * ACTIVE - will activate the usage limit
             *       * SUSPEND - will suspend the usage limit
             *
             * @example ACTIVE
             * @enum {string}
             */
            status: "ACTIVE" | "SUSPEND";
        };
        PublicRsaKeyData: {
            /**
             * @description Index of a public RSA key.
             * @example A1564386531162
             */
            keyIndex: string;
            /**
             * @description Public RSA key generated by the MP. ASCII/UTF-8 string of characters 0-9,A-F (ASN.1 DER Public hex unpacked to string) or PEM concatenated Base64 without BEGIN and END lines.
             *     The Issuer should use this key to encrypt sensitive data which requires secure transfer to the MP.
             *
             * @example 30820122300D06092A864886F70D01010105000382010F003082010A0282010100A7D079A8769BCD340574E8E6C0A2810C377279E5EA0B422B9132F955860730E7637DFAB0A1C6F117B25E3DB3D2A5A9F2691BBC7E0178ADFD12908C3E6E6D3A77AA26E25A6570FCC423561628879E918DC0C798527318308C70BBE2BC4597B83B96CB3680FE6F8E60D68B465E2B30558712A2D63A544239BE7B5F2A49C82FB3388A22644741A945EC9ACB3F219C3B6826241BE1706EF384100EC83D0D7FAE6CCF4E69E0EE02BF84C21553FA1999A8DB91C4193D1E671D5A22B1876E1DC81F1ED7033F3A26FF62E492A63ADA58AAE248D5E47896592CB9A7023CB8B8700882B4DCBF34C16F7FA00DF4C3931A4612E0E2A09586780E89D28FAAA195C07ADE88286F0203010001
             */
            publicRsaKey: string;
        };
        ServiceLimitTariff: {
            /**
             * @description Tariff's currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency?: string;
            /**
             * Format: date
             * @description Tariff's end date (YYYY-MM-DD format).
             *
             * @example 2031-06-25
             */
            endDate?: string;
            /**
             * @description The maximum amount of a transaction that can be made without authorization.
             *
             *     The field can contain values up to 2 decimal places. A dot is used as a decimal separator.
             *
             * @example 30
             */
            floorLimit?: number;
            /**
             * @description Minimum allowed transaction amount or account balance or minimum threshold value of an Event related to balance type value changes.
             *     A zero value in the field means that there are no limitations.
             *
             *     The field can contain values up to 2 decimal places. A dot is used as a decimal separator.
             *
             * @example 10
             */
            minTransactionAmount?: number;
            /**
             * @description Maximum allowed transaction amount or account balance, or maximum threshold value of an Event related to balance type value changes.
             *     A zero value in the field means that there are no limitations.
             *
             *     The field can contain values up to 2 decimal places. A dot is used as a decimal separator.
             *
             * @example 200
             */
            maxTransactionAmount?: number;
            /**
             * Format: date
             * @description Tariff's effective date (YYYY-MM-DD format).
             *
             *     If the value is not transmitted in the request the local date is used.
             *
             * @example 2031-06-25
             */
            startDate?: string;
            /**
             * @description Tariff code from the CMS system. Uniquely identify service limit tariff which must be defined in the CMS during the onboarding process.
             *
             * @example INT_R
             */
            tariffCode: string;
        };
        AccountContractIdentifierSearch: {
            /**
             * @description This field must contain an identifier value according to the type specified by `accountContractIdentifierType` field (`ACCOUNT_CONTRACT_NUMBER` or `CBS_NUMBER`).
             *
             * @example CBS83863371812033
             */
            accountContractIdentifier: string;
            /**
             * @description Type of account contract identifier, corresponding to the value sent in `accountContractIdentifier` field.
             *
             *     | **Possible values**      	| **Description**                                                                                                                    	|
             *     |--------------------------	|------------------------------------------------------------------------------------------------------------------------------------	|
             *     | CBS_NUMBER               	| Search will be executed based on the CBS Number (Core Banking System Number)                                                       	|
             *     | ACCOUNT_CONTRACT_NUMBER  	| Search will be executed based on the account contract number assigned by the Issuer during the account creation (`POST /accounts`)  |
             *
             * @example CBS_NUMBER
             * @enum {string}
             */
            accountContractIdentifierType: "CBS_NUMBER" | "ACCOUNT_CONTRACT_NUMBER";
        };
        CardContractIdentifierSearch: {
            /**
             * @description This field must contain an identifier value according to the type specified by `cardContractIdentifierType` field (`CARD_CONTRACT_NUMBER` or `CBS_NUMBER`).
             *
             * @example CBS83863371812034
             */
            cardContractIdentifier: string;
            /**
             * @description Type of card contract identifier, corresponding to the value sent in `cardContractIdentifier` field.
             *
             *     | **Possible values**   	| **Description**                                                                                                              	|
             *     |-----------------------	|------------------------------------------------------------------------------------------------------------------------------	|
             *     | CBS_NUMBER            	| Search will be executed based on the CBS Number (Core Banking System Number)                                                 	|
             *     | CARD_CONTRACT_NUMBER  	| Search will be executed based on the card contract number assigned by the Issuer during the card creation (`POST /cards`)   	|
             *
             * @example CBS_NUMBER
             * @enum {string}
             */
            cardContractIdentifierType: "CBS_NUMBER" | "CARD_CONTRACT_NUMBER";
        };
        ClientIdentifierSearch: {
            /**
             * @description This field must contain an identifier value according to the type specified by `clientIdentifierType` field (`clientNumber`, `identificationDocumentNumber`, `socialNumber` or `taxpayerIdentifier`).
             *
             * @example 4718181
             */
            clientIdentifier: string;
            /**
             * @description Type of client identifier, corresponding to the value sent in clientIdentifier field.
             *
             *     | **Possible values**            	| **Description**                                                 	|
             *     |--------------------------------	|-----------------------------------------------------------------	|
             *     | CLIENT_NUMBER                  	| Search will be executed based on Client Number                  	|
             *     | IDENTIFICATION_DOCUMENT_NUMBER 	| Search will be executed based on registration Number            	|
             *     | SOCIAL_NUMBER                  	| Search will be executed based on Social Number                  	|
             *     | TAXPAYER_IDENTIFIER           	| Search will be executed based on Taxpayer Identification Number 	|
             *
             * @example CLIENT_NUMBER
             * @enum {string}
             */
            clientIdentifierType: "CLIENT_NUMBER" | "IDENTIFICATION_DOCUMENT_NUMBER" | "SOCIAL_NUMBER" | "TAXPAYER_IDENTIFIER";
        };
        /**
         * @description Parameter defines a field that will be returned in a response.
         *
         * @example cardContractNumber
         */
        fieldSelection: string;
        AuthenticationMethod: {
            /** @description The list of `AuthenticationParameter`.
             *
             *     The list can contain only those parameters which are required. The others will be created automatically with the default value (if it is set) or without value.
             *
             *     To update the parameter value for the authentication method which has already been set to contract it is required to put only those pairs of parameters and values which are to be updated.
             *
             *     To reset the authentication method parameter value it is required to put only the parameter name to the `authenticationParameter` list.
             *      */
            authenticationParameters?: components["schemas"]["AuthenticationParameter"][];
            authenticationTypeCode: components["schemas"]["authenticationTypeCode"];
            /**
             * @description Contract authentication type name.
             *
             * @example TypeName
             */
            authenticationTypeName?: string;
        };
        AuthenticationParameter: {
            name: components["schemas"]["authenticationParameterName"];
            value?: components["schemas"]["authenticationParameterValue"];
        };
        TransactionContractCredit: {
            /**
             * @description Transaction amount.
             *
             *     The field can contain values up to 4 decimal places. A dot is used as a decimal separator.
             *
             * @example 20
             */
            amount: number;
            /**
             * @description Transaction currency (format according to ISO 4217, alphanumeric code).
             *
             * @example EUR
             */
            currency: string;
            /** @description The Field allows passing additional information to the created transaction record.
             *     Should be sent as: TAG_01=TAG_01_VALUE;TAG_02=TAG_02_VALUE;
             *
             *     Max length of tag name: 32, max length of tag value: 32. Total max length: 255
             *     The tag name and the tag value should not contain characters ['=', ';', ' '].
             *      */
            customData?: components["schemas"]["TransactionCustomData"][];
            /**
             * @description Transaction description. In the CMS system stored and exported as merchant name.
             *
             * @example Description
             */
            description: string;
            /**
             * @description Fee code of the fee which should be applied for transaction.
             *
             *     *Disclaimer: Fee code which can be used must be configured in the MP's CMS.*
             *
             * @example FX_FEE
             */
            feeCode?: string;
            /**
             * Format: date
             * @description Transaction posting date (YYYY-MM-DD format). If not filled the sysdate will be placed in the field.
             *
             * @example 2031-06-25
             */
            postingDate?: string;
            /**
             * @description Transaction type code which can be used must be configured in the MP's CMS.
             *
             * @example PT_1
             */
            transactionTypeCode: string;
            /**
             * @description Transaction type extensions make it possible to more exactly determine the service that should be used to process a transaction.
             *     Transaction type extension is defined on transaction type configuration.
             *
             * @example Description
             */
            transactionTypeExtension?: string;
            /**
             * @description Unique reference number for the transaction. If filled system will check the uniqueness of this value.
             *     It will not be possible to create two records with the same value. Exported as SRN (Source Reference Number).
             *
             * @example 122357012766
             */
            uniqueReferenceNumber?: string;
        };
        CardContractDetailsVerification: {
            /**
             * @description A card contract number represents a Primary Account Number (PAN). A PAN usually consists of 16 digits:
             *       * The first six digits are the Bank Identification Number (BIN): a unique number within the payment organization (Mastercard, VISA)
             *       * The following nine digits are the contract identification number, which can be generated randomly
             *       * The last digit is a Luhn check digit.
             *
             * @example 5355848943515330
             */
            cardContractNumber: string;
            cardExpiryDate?: components["schemas"]["cardExpiryDate"];
            /**
             * @description Card Verification Code 2 (CVC2), known also as a Card Security Code (CSC) or a Card Verification Value 2 (CVV2).
             *
             * @example 347
             */
            cardVerificationCode?: string;
        };
        CardContractDetailsVerificationResult: {
            cardContractId?: components["schemas"]["cardContractId"];
            /**
             * @description Card contract number verification result.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | PAN_CORRECT         	|
             *     | PAN_CANCELLED       	|
             *
             * @example PAN_CORRECT
             */
            cardContractNumberVerificationResult: string;
            /**
             * @description Expiry date verification result.
             *
             *     | **Possible values**      	|
             *     |--------------------------	|
             *     | EXPIRY_DATE_CORRECT      	|
             *     | EXPIRY_DATE_NOT_CORRECT  	|
             *     | EXPIRY_DATE_NOT_PROVIDED 	|
             *
             * @example EXPIRY_DATE_CORRECT
             */
            cardExpiryDateVerificationResult: string;
            cbsNumber?: components["schemas"]["cbsNumber"];
            /**
             * @description CVC2 verification result.
             *
             *     | **Possible values** 	|
             *     |---------------------	|
             *     | CVC2_CORRECT        	|
             *     | CVC2_NOT_CORRECT    	|
             *     | CVC2_NOT_PROVIDED   	|
             *
             * @example CVC2_CORRECT
             */
            cvc2VerificationResult: string;
        };
        ClientCustomDataTagValues: {
            /** @description List of `CustomDataTagValue` for the client.
             *      */
            clientCustomDataTagValues: components["schemas"]["CustomDataTagValue"][];
        };
        ContractCustomDataTagValues: {
            /** @description List of `CustomDataTagValue` for the contract.
             *      */
            contractCustomDataTagValues: components["schemas"]["CustomDataTagValue"][];
        };
    };
    responses: {
        /** @description The authentication parameter value has been fetched successfully.
         *      */
        AuthenticationParameterValue: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["AuthenticationParameterValue"];
            };
        };
        /** @description The result of the release of the funds.
         *      */
        BlockedFundsReleaseResult: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["BlockedFundsReleaseResult"];
            };
        };
        /** @description A client has been successfully updated. */
        ClientUpdated: {
            headers: {
                /**
                 * @description A hash of a response body used to uniquely identify a particular version of a client.
                 *     This value needs to be passed as an `If-Match` header to the PATCH methods of the same resource to ensure idempotency.
                 *     See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for details.
                 *
                 * @example 7fedf39c3c2952a62821de4b480d1d6f
                 */
                ETag?: string;
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The account contract has been successfully relinked to another client.
         *      */
        AccountRelinked: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The contract has been successfully relinked.
         *      */
        SubAccountRelinked: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The account contract has been successfully updated.
         *      */
        AccountUpdated: {
            headers: {
                /**
                 * @description A hash of a response body used to uniquely identify a particular version of a client.
                 *     This value needs to be passed as an `If-Match` header to the PATCH methods of the same resource to ensure idempotency.
                 *     See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for details.
                 *
                 * @example 7fedf39c3c2952a62821de4b480d1d6f
                 */
                ETag?: string;
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The server has successfully changed an account contract status.
         *      */
        AccountStatusChanged: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The card contract has been successfully relinked to another client.
         *      */
        CardRelinkedToAnotherClient: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The card contract has been successfully relinked to another account contract.
         *      */
        CardRelinkedToAnotherAccount: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The card contract has been successfully updated.
         *      */
        CardUpdated: {
            headers: {
                /**
                 * @description A hash of a response body used to uniquely identify a particular version of a card.
                 *     This value needs to be passed as an `If-Match` header to the PATCH methods of the same resource to ensure idempotency.
                 *     See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for details.
                 *
                 * @example 7fedf39c3c2952a62821de4b480d1d6f
                 */
                ETag?: string;
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The card contract status has been successfully managed.
         *      */
        CardStatusChanged: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The online PIN try counter has been successfully reset.
         *      */
        OnlinePinTryCounterReset: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The card has been unlocked. */
        CardPlasticUnlocked: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The address of a selected type for a client has been successfully updated.
         *      */
        ClientAddressUpdated: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The address of a selected type for a contract has been successfully updated.
         *      */
        ContractAddressUpdated: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The contract parameter value has been successfully set up or changed.
         *      */
        ContractParameterSetOrChanged: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The usage limit for a contract has been successfully added or updated.
         *      */
        ContractUsageLimitAddedOrUpdated: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The usage limit for a contract has been successfully restored.
         *      */
        ContractUsageLimitRestored: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The counters for the specified usage limit has been successfully reset.
         *      */
        ContractUsageLimitCounterReset: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The usage limit status has been successfully changed.
         *      */
        ContractUsageLimitStatusChanged: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The individual service limit tariff has been successfully set up.
         *      */
        ServiceLimitTariffSetUp: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The custom data for a contract has been successfully set up.
         *      */
        ContractCustomDataSetUp: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The custom data for a client has been successfully set up.
         *      */
        ClientCustomDataSetUp: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The Contract classifier has been successfully set up.
         *      */
        ContractClassifierSetUp: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The client classifier has been successfully set up.
         *      */
        ClientClassifierSetUp: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The address for a contract has been successfully created.
         *      */
        ContractAddressCreated: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The address for a client has been successfully created.
         *      */
        ClientAddressCreated: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description A new PIN has been successfully set up. */
        CardPlasticNewPinSetUp: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The event for the specified contract has been successfully opened.
         *      */
        ContractEventCreated: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestInvalidContractTypeError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestInvalidTransactionTypeError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestInvalidClientTypeError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestInvalidCardContractTypeError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestInvalidAccountContractTypeError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestNullCardContractIdentifierError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestNullAccountContractIdentifierError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestNullClientIdentifierError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestNullClientNumberError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestNullClassifierCodeError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestNullCardContractError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestNullCardContractNumberError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestMissingDataTypeToSecureError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The server cannot process the request due to bad request.
         *      */
        BadRequestMissingTransactionSelectorTypeError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The URI did not match an existing resource.
         *      */
        ContractNotFoundError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The URI did not match an existing resource.
         *      */
        TransactionNotFoundError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The URI did not match an existing resource.
         *      */
        CardContractNotFoundError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The URI did not match an existing resource.
         *      */
        AccountContractNotFoundError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The URI did not match an existing resource.
         *      */
        ClientNotFoundError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description You do not have the permission to do this operation.
         *      */
        OperationDeniedError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description Precondition failed. Check the description field in the response for details.
         *      */
        PreconditionError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ErrorWrapper"];
            };
        };
        /** @description The client identifier has been fetched successfully.
         *      */
        ClientIdentifier: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientIdentifier"];
            };
        };
        /** @description The client has been successfully created, see the `Location` header.
         *      */
        ClientIdentifierCreated: {
            headers: {
                /**
                 * @description The URI of the created client.
                 *
                 * @example /clients/681084084
                 */
                Location?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientIdentifier"];
            };
        };
        /** @description The client has been successfully fetched.
         *      */
        Client: {
            headers: {
                /**
                 * @description A hash of a response body used to uniquely identify a particular version of a client.
                 *     This value needs to be passed as an `If-Match` header to the PATCH methods of the same resource to ensure idempotency.
                 *     See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for details.
                 *
                 * @example 7fedf39c3c2952a62821de4b480d1d6f
                 */
                ETag?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["Client"];
            };
        };
        /** @description The list of account contracts for a specified client has been fetched successfully.
         *      */
        ClientAccountContracts: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientAccountContracts"];
            };
        };
        /** @description The list of card contracts has been fetched successfully.
         *      */
        ClientCardContracts: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientCardContracts"];
            };
        };
        /** @description The financial information has been fetched successfully.
         *      */
        ContractFinancial: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ContractFinancial"];
            };
        };
        /** @description The list of balances has been fetched successfully.
         *      */
        ContractBalances: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ContractBalances"];
            };
        };
        /** @description The list of technical accounts has been fetched successfully.
         *      */
        TechnicalAccounts: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["TechnicalAccounts"];
            };
        };
        /** @description The account contract has been successfully created, see the `Location` header.
         *      */
        AccountContractIdentifierCreated: {
            headers: {
                /**
                 * @description The URI of the created account contract.
                 *
                 * @example /accounts/3519804984
                 */
                Location?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["AccountContractIdentifier"];
            };
        };
        /** @description The account contract identifier has been fetched successfully.
         *      */
        AccountContractIdentifier: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["AccountContractIdentifier"];
            };
        };
        /** @description An account contract has been successfully fetched. */
        AccountContract: {
            headers: {
                /**
                 * @description A hash of a response body used to uniquely identify a particular version of a account contract.
                 *     This value needs to be passed as an `If-Match` header to the PATCH methods of the same resource to ensure idempotency.
                 *     See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for details.
                 *
                 * @example 7fedf39c3c2952a62821de4b480d1d6f
                 */
                ETag?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["AccountContract"];
            };
        };
        /** @description The list of subaccounts has been fetched successfully.
         *      */
        SubAccountContracts: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["SubAccountContracts"];
            };
        };
        /** @description The list of card contract summaries has been fetched successfully.
         *      */
        AccountContractCardContracts: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["AccountContractCardContracts"];
            };
        };
        /** @description The summary tree has been fetched successfully.
         *      */
        ContractSummaryTree: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ContractSummaryTree"];
            };
        };
        /** @description The card contract has been successfully created, see the `Location` header.
         *      */
        CardContractIdentifierCreated: {
            headers: {
                /**
                 * @description The URI of the created card contract.
                 *
                 * @example /cards/68412281
                 */
                Location?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractIdentifier"];
            };
        };
        /** @description The CVC2 search was performed successfully.
         *      */
        Cvc: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["Cvc"];
            };
        };
        /** @description The CVC2 verification result has been fetched successfully.
         *      */
        CvcVerificationResult: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["CvcVerificationResult"];
            };
        };
        /** @description The PIN verification result has been fetched successfully.
         *      */
        PinVerificationResult: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["PinVerificationResult"];
            };
        };
        /** @description The encrypted PIN block has been fetched successfully.
         *      */
        EncryptedPin: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["EncryptedPin"];
            };
        };
        /** @description The list of card plastics has been successfully fetched.
         *      */
        CardContractPlastics: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractPlastics"];
            };
        };
        /** @description The list of parameters has been fetched successfully.
         *      */
        ContractParameters: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ContractParameters"];
            };
        };
        /** @description The list of client addresses has been fetched successfully.
         *      */
        ClientAddresses: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientAddresses"];
            };
        };
        /** @description The list of contract addresses has been fetched successfully.
         *      */
        ContractAddresses: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ContractAddresses"];
            };
        };
        /** @description The list of client custom data tags has been fetched successfully.
         *      */
        ClientCustomDataTagValues: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientCustomDataTagValues"];
            };
        };
        /** @description The list of contract custom data tags has been fetched successfully.
         *      */
        ContractCustomDataTagValues: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ContractCustomDataTagValues"];
            };
        };
        /** @description The list of transactions has been fetched successfully.
         *      */
        Transactions: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["Transactions"];
            };
        };
        /** @description The list of transaction documents has been fetched successfully.
         *      */
        TransactionDocuments: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["TransactionDocuments"];
            };
        };
        /** @description The list of transaction fees has been fetched successfully.
         *      */
        TransactionFees: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["TransactionFees"];
            };
        };
        /** @description The list of usage limits has been fetched successfully.
         *      */
        UsageLimits: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["UsageLimits"];
            };
        };
        /** @description The list of client classifiers has been fetched successfully.
         *      */
        ClientClassifiers: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientClassifiers"];
            };
        };
        /** @description The list of contract classifiers has been fetched successfully.
         *      */
        ContractClassifiers: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ContractClassifiers"];
            };
        };
        /** @description The card contract identifier has been fetched successfully.
         *      */
        CardContractIdentifier: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractIdentifier"];
            };
        };
        /** @description The RSA key has been successfully fetched.
         *      */
        PublicRsaKeyData: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["PublicRsaKeyData"];
            };
        };
        /** @description A card contract has been successfully fetched. */
        CardContract: {
            headers: {
                /**
                 * @description A hash of a response body used to uniquely identify a particular version of a card contract.
                 *     This value needs to be passed as an `If-Match` header to the PATCH methods of the same resource to ensure idempotency.
                 *     See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for details.
                 *
                 * @example 7fedf39c3c2952a62821de4b480d1d6f
                 */
                ETag?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractWithEncryptedCardContractNumber"];
            };
        };
        /** @description The card contract has been successfully reissued.
         *      */
        ReissuedCardContract: {
            headers: {
                /**
                 * @description The URI of the reissued card contract.
                 * @example /cards/70001
                 */
                Location?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ReissuedCardContract"];
            };
        };
        /** @description The authentication method has been set up.
         *      */
        AuthenticationMethodSetUp: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description The debit transaction has been posted.
         *      */
        DebitTransactionId: {
            headers: {
                /**
                 * @description The URI of the created transaction.
                 * @example /transaction-documents?transaction_selector_type=ID&transaction_selector_value=90001
                 */
                Location?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["TransactionId"];
            };
        };
        /** @description The credit transaction has been posted.
         *      */
        CreditTransactionId: {
            headers: {
                /**
                 * @description The URI of the created transaction.
                 * @example /transaction-documents?transaction_selector_type=ID&transaction_selector_value=90001
                 */
                Location?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["TransactionId"];
            };
        };
        /** @description The contract has been charged successfully.
         *      */
        ChargeTransactionId: {
            headers: {
                /**
                 * @description The URI of the created transaction.
                 * @example /transaction-documents?transaction_selector_type=ID&transaction_selector_value=90001
                 */
                Location?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["TransactionId"];
            };
        };
        /** @description The transaction has been successfully reversed.
         *      */
        ReverseTransactionId: {
            headers: {
                /**
                 * @description The URI of the created transaction.
                 * @example /transaction-documents?transaction_selector_type=ID&transaction_selector_value=2829673
                 */
                Location?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ReverseTransactionId"];
            };
        };
        /** @description The contract tariffs has been fetched successfully.
         *      */
        ContractTariffs: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["ContractTariffs"];
            };
        };
        /** @description The account contract status has been retrieved successfully.
         *      */
        AccountContractStatus: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["AccountContractStatus"];
            };
        };
        /** @description The card contract status has been retrieved successfully.
         *      */
        CardContractStatus: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractStatus"];
            };
        };
        /** @description The card details verification result.
         *      */
        CardContractDetailsVerificationResult: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractDetailsVerificationResult"];
            };
        };
    };
    parameters: {
        /**
         * @description Contract authentication type code.
         *
         * @example 3DS_EXT_ENROLLMENT
         */
        authenticationTypeCode: components["schemas"]["authenticationTypeCode"];
        /**
         * @description Contract authentication parameter name.
         *
         * @example PHONE
         */
        authenticationParameterName: components["schemas"]["authenticationParameterName"];
        /**
         * @description Public RSA key generated by the Issuer. ASCII/UTF-8 string of characters 0-9, A-F, ASN.1 DER Public hex unpacked to string or PEM concatenated Base64 without BEGIN and END lines.
         *
         *     Key is used to encrypt sensitive data (`encryptedCardContractNumber`, `encryptedZpk`) returned by the MP in the response.
         *
         * @example 30820122300D06092A864886F70D01010105000382010F003082010A0282010100A7D079A8769BCD340574E8E6C0A2810C377279E5EA0B422B9132F955860730E7637DFAB0A1C6F117B25E3DB3D2A5A9F2691BBC7E0178ADFD12908C3E6E6D3A77AA26E25A6570FCC423561628879E918DC0C798527318308C70BBE2BC4597B83B96CB3680FE6F8E60D68B465E2B30558712A2D63A544239BE7B5F2A49C82FB3388A22644741A945EC9ACB3F219C3B6826241BE1706EF384100EC83D0D7FAE6CCF4E69E0EE02BF84C21553FA1999A8DB91C4193D1E671D5A22B1876E1DC81F1ED7033F3A26FF62E492A63ADA58AAE248D5E47896592CB9A7023CB8B8700882B4DCBF34C16F7FA00DF4C3931A4612E0E2A09586780E89D28FAAA195C07ADE88286F0203010001
         */
        mandatoryCustomerPublicRsaKey: components["schemas"]["customerPublicRsaKey"];
        /**
         * @description Public RSA key generated by the Issuer. ASCII/UTF-8 string of characters 0-9, A-F, ASN.1 DER Public hex unpacked to string or PEM concatenated Base64 without BEGIN and END lines.
         *
         *     Key is used to encrypt sensitive data returned by the MP in the response.
         *
         * @example 30820122300D06092A864886F70D01010105000382010F003082010A0282010100A7D079A8769BCD340574E8E6C0A2810C377279E5EA0B422B9132F955860730E7637DFAB0A1C6F117B25E3DB3D2A5A9F2691BBC7E0178ADFD12908C3E6E6D3A77AA26E25A6570FCC423561628879E918DC0C798527318308C70BBE2BC4597B83B96CB3680FE6F8E60D68B465E2B30558712A2D63A544239BE7B5F2A49C82FB3388A22644741A945EC9ACB3F219C3B6826241BE1706EF384100EC83D0D7FAE6CCF4E69E0EE02BF84C21553FA1999A8DB91C4193D1E671D5A22B1876E1DC81F1ED7033F3A26FF62E492A63ADA58AAE248D5E47896592CB9A7023CB8B8700882B4DCBF34C16F7FA00DF4C3931A4612E0E2A09586780E89D28FAAA195C07ADE88286F0203010001
         */
        optionalCustomerPublicRsaKey: components["schemas"]["customerPublicRsaKey"];
        /**
         * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
         *
         * @example 40000
         */
        clientId: components["schemas"]["clientId"];
        /**
         * @description Unique technical identifier for an account contract generated by the MP's CMS. The identifier is generated when account contract creation finishes successfully and is returned in an account contract creation response (`POST /accounts`).
         *
         * @example 60001
         */
        accountContractId: components["schemas"]["accountContractId"];
        /**
         * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
         *
         * @example 70001
         */
        cardContractId: components["schemas"]["cardContractId"];
        /**
         * @description Unique technical contract identifier generated by the CMS.
         *
         *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
         *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
         *       * card contract creation response (`POST /cards`, field: `cardContractId`).
         *
         * @example 70001
         */
        contractId: components["schemas"]["contractId"];
        /**
         * @description Transaction type's direction.
         *
         *     | **Possible values** 	|
         *     |---------------------	|
         *     | CREDIT              	|
         *     | DEBIT               	|
         *     | NONE                	|
         *
         * @example DEBIT
         */
        direction: "CREDIT" | "DEBIT" | "NONE";
        /**
         * @description Contracts hierarchy analysis mode.
         *
         *     | **Possible values** 	| **Description**                                                                               	|
         *     |---------------------	|-----------------------------------------------------------------------------------------------	|
         *     | N                   	| Search for transactions without contract's hierarchy analysis (default value)                 	|
         *     | M                   	| Main-Sub hierarchies only                                                                     	|
         *     | R                   	| Related Cards only. In this mode Liability and Main-Sub contract hierarchies are not analyzed 	|
         *     | Y                   	| Liability and Main-Sub contract hierarchies are analyzed                                      	|
         *
         * @example R
         */
        contractHierarchy: "N" | "M" | "R" | "Y";
        /**
         * @description The number of items you want the list to be limited to.
         *
         * @example 1
         */
        limit: number;
        /**
         * @description The number of items to offset the start of the list from.
         *
         * @example 0
         */
        offset: number;
        /**
         * @description The response message can return only the data represented by field names specified in this field.
         *     The Issuer can choose any field name being returned for a card contract object or can leave the field empty (in such case all data will be returned).
         *
         * @example cardContractNumber,embossedData
         */
        fieldsSelection: components["schemas"]["fieldSelection"][];
        /** @description List of balance codes. The response will return information about specified balances.
         *
         *     Note: Response will contain only specified balance codes that does exist in the CMS. If none exists or a list does not contain any value then the response will not return any data (HTTP 200 will be returned with an empty array `[]`).
         *
         *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
         *      */
        contractBalanceCodes: string[];
        /**
         * @description Index of the MP's public RSA key received in a `GET /public-keys` response (API operation: `getPublicRsaKey`).
         *
         *     If `Key-Index` is provided, then the `newPinBlock` field must be encrypted using the MP's public RSA key received together with the `Key-Index` from the MP in `GET /public-keys` response (API operation: `getPublicRsaKey`).
         *
         * @example A1564386531162
         */
        keyIndex: components["schemas"]["keyIndex"];
        /**
         * @description Used to ensure idempotency for the PATCH methods.
         *     This header should be populated with the `ETag` received in the response header from the GET call of the same resource being updated. See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for more details.
         *
         * @example 5c7d022061b0874200bfed735c6b9308
         */
        ifMatch: components["schemas"]["ifMatch"];
        /**
         * @description Date from (YYYY-MM-DD format).
         *
         * @example 2031-06-25
         */
        transactionDateFrom: components["schemas"]["date"];
        /**
         * @description Date to (YYYY-MM-DD format).
         *
         * @example 2032-06-25
         */
        transactionDateTo: components["schemas"]["date"];
        /** @description The list of `transactionTypeCode` separated by commas.
         *
         *     Transactions originated from the Banknet
         *     | `transactionTypeCode` 	| `transactionType`                     	|
         *     |:---------------------:	|---------------------------------------	|
         *     | 0512                  	| Retail with CashBack                  	|
         *     | 0513 1                	| CH Debit                              	|
         *     | 0515                  	| Retail                                	|
         *     | 0518                  	| Unique                                	|
         *     | 0522                  	| CashBack 2Prs                         	|
         *     | 0523 1                	| CH Debit 2Prs                         	|
         *     | 0525                  	| Retail 2Prs                           	|
         *     | 0528                  	| Unique 2Prs                           	|
         *     | 0614 2                	| CH Payment                            	|
         *     | 0616                  	| Refund                                	|
         *     | 0624 2                	| CH Payment 2Prs                       	|
         *     | 0626                  	| Credit 2Prs                           	|
         *     | 0717                  	| Cash Advance                          	|
         *     | 0719                  	| ATM Cash Withdrawal                   	|
         *     | 0727                  	| Cash 2Prs                             	|
         *     | 0729                  	| ATM Cash withdrawal - 2nd presentment 	|
         *
         *     Transactions originated from the Issuer in the standard product
         *     | `transactionTypeCode` 	| `transactionType`             	| **Product applicability** 	|
         *     |-----------------------	|-------------------------------	|---------------------------	|
         *     | APSF                  	| Paper statement fee           	| Credit                    	|
         *     | BT1                   	| Balance Transfer              	| Credit                    	|
         *     | FP                    	| Fee posting                   	| Credit                    	|
         *     | I_TPC                 	| PBB Transfer posting - credit 	| Credit, Prepaid           	|
         *     | I_TPD                 	| PBB Transfer posting - debit  	| Credit, Prepaid           	|
         *     | PT_1                  	| Payment To Client Contract    	| Credit                    	|
         *     | TP                    	| Prepaid Top-Up                	| Prepaid                   	|
         *     | TPC_1                 	| Transaction posting - credit  	| Credit, Prepaid           	|
         *     | TPD                   	| Transaction posting - debit   	| Credit                    	|
         *
         *     Fees originated from the CMS in the standard product
         *     | `transactionTypeCode` 	| `transactionType`                     	| **Product applicability** 	|
         *     |-----------------------	|---------------------------------------	|---------------------------	|
         *     | A1F                   	| ATM Fee                               	| Prepaid                   	|
         *     | AFM_1                 	| BCC CA Annual Fee Main Card           	| Prepaid                   	|
         *     | AUCF                  	| Urgent card fee                       	| Credit, Prepaid           	|
         *     | C1F                   	| Cash Fee                              	| Prepaid                   	|
         *     | CF1                   	| Country Fee                           	| Prepaid                   	|
         *     | FXF                   	| Foreign exchange (FX) fee             	| Credit                    	|
         *     | INFC                  	| Insurance Fixed Card                  	| Credit                    	|
         *     | INFS                  	| Insurance Fixed Single                	| Credit, Prepaid           	|
         *     | INFSC                 	| Insurance Fixed Single Card           	| Credit                    	|
         *     | INP                   	| Insurance Percentage                  	| Credit                    	|
         *     | IPP                   	| BCC Insurance fee: Payment Protection 	| Credit, Prepaid           	|
         *     | JFA                   	| Joining fee                           	| Prepaid                   	|
         *     | LC                    	| New Lost Card for PIN Set             	| Prepaid                   	|
         *     | LPF                   	| BCC Late Payment Fee                  	| Credit                    	|
         *     | M;                    	| New Card for PIN Set                  	| Prepaid                   	|
         *     | M0                    	| Plastic Renew Expired                 	| Prepaid                   	|
         *     | M19                   	| Plastic Renew Misc (no Prod)          	| Credit                    	|
         *     | M8                    	| Plastic Renew Misc                    	| Prepaid                   	|
         *     | MA_1                  	| Balance Inquiry Fee                   	| Prepaid                   	|
         *     | MF_1                  	| BCC Card Fee Billing                  	| Prepaid                   	|
         *     | MFM                   	| Misc Fee Manual                       	| Prepaid                   	|
         *     | MR                    	| Replaced Card for PIN Set (no Prod)   	| Credit                    	|
         *     | OVLF                  	| OVL Fee                               	| Credit                    	|
         *     | PFMCC                 	| Retail Fee based on MC                	| Prepaid                   	|
         *     | PZ                    	| PIN Change Fee                        	| Prepaid                   	|
         *     | RWCBTF                	| Retail with CB Transaction Fee        	| Credit                    	|
         *     | TPF                   	| Top-up fee                            	| Prepaid                   	|
         *     | VCP                   	| New Card for PIN Set (no Prod)        	| Credit                    	|
         *
         *     Interests originated from the CMS in the standard credit product
         *     | `transactionTypeCode` 	| `transactionType`                 	|
         *     |-----------------------	|-----------------------------------	|
         *     | ILBT3                 	| Overdue cash interest             	|
         *     | ILBT5                 	| Overdue balance transfer interest 	|
         *     | ILC3                  	| Balance transfer interest         	|
         *     | ILC5                  	| Overdue retail interest           	|
         *     | ILR3                  	| Retail interest                   	|
         *     | ILR5                  	| Cash interest                     	|
         *      */
        transactionTypeCodes: string[];
        /** @description Allows defining the type of selector passed in the `transaction_selector_value`.
         *      */
        transactionSelectorType: "ARN" | "ID" | "RRN" | "SRN";
        /** @description Allows defining the value for the transactions selector.
         *
         *     * If `transaction_selector_type` is equal to `ARN` then maxLength of `transaction_selector_value` is 32
         *
         *     * If `transaction_selector_type` is equal to `ID` then maxLength of `transaction_selector_value` is 18
         *
         *     * If `transaction_selector_type` is equal to `RRN` then maxLength of `transaction_selector_value` is 12
         *
         *     * If `transaction_selector_type` is equal to `SRN` then maxLength of `transaction_selector_value` is 32
         *      */
        transactionSelectorValue: string;
        /** @description Allows collecting information about authorization documents.
         *     The parameter is used in combination with the `authorization_filter_mode` parameter.
         *      */
        transactionCollectAuthorizations: "Y" | "N";
        /**
         * @description Address type. Additional addresses allow to store any address related to the client or contract (account contract or card contract).
         *
         *     | **Default possible values** 	| **Description**             	|
         *     |-----------------------------	|-----------------------------	|
         *     | PIN                         	| PIN mailer delivery address 	|
         *     | STMT                        	| Statement delivery address  	|
         *
         *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process as they are configured in the CMS system.*
         *
         * @example PIN
         */
        addressType: components["schemas"]["addressType"];
        /**
         * @description Code of the contract parameter for which the value will be set.
         *
         *     *Disclaimer: Parameter codes are configured in the MP's CMS and the Issuer is allowed to use only the value configured by the MP (the Issuer cannot use their own values).*
         *
         * @example MTP_CALC_RULE
         */
        parameterCode: components["schemas"]["parameterCode"];
        /**
         * @description The list of contract parameters which should be returned.
         *
         *     Note: Response will contain only specified parameter codes that does exist in the CMS. If none exists or a list does not contain any value then the response will not return any data (HTTP 200 will be returned with an empty array `[]`).
         *
         *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
         *
         * @example ATM_CALC_RULE,MTP_CALC_RULE
         */
        parameterCodes: components["schemas"]["parameterCode"][];
        /**
         * @description Code of the classifier for which the value will be set.
         *
         *     *Disclaimer: Classifier codes are configured in the MP's CMS and the Issuer is allowed to use only the value configured by the MP (the Issuer cannot use their own values).*
         *
         * @example TEST_CLASSIFIER_01
         */
        classifierCode: components["schemas"]["classifierCode"];
        /** @description The list of classifiers which should be returned.
         *
         *     Note: Response will contain only specified classifier codes that does exist in the CMS. If none exists or a list does not contain any value then the response will not return any data (HTTP 200 will be returned with an empty array `[]`).
         *
         *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
         *      */
        classifierCodes: components["schemas"]["classifierCode"][];
        /**
         * @description Tag name
         *
         * @example TAG_01
         */
        tagName: string;
        /**
         * @description Transaction record id from the CMS system.
         *
         * @example 90001
         */
        transactionId: number;
        /**
         * @description Code of the account, which is related to the given contract.
         *
         * @example BF
         */
        technicalAccountCode: string;
        /**
         * @description Specifies records filtering mode.
         *
         *     | **Possible values** 	| **Description**                   	|
         *     |---------------------	|-----------------------------------	|
         *     | A                   	| Not Matched Affecting Balance     	|
         *     | N                   	| Not Affecting Balance             	|
         *     | S                   	| Successful Only Affecting Balance 	|
         *     | U                   	| All Records                       	|
         *
         *     Depending on its value the following authorizations are output:
         *       * A (default value) - authorizations that lead to a contract's balance changes and haven't matched with financial documents (they are waiting for financial documents or already closed or declined).
         *       * N - cardholder's requests not changing a contract's balance (Balance Inquiry, Online Statement, Top Up, Additional Online Service, Verification).
         *       * S - active authorizations that lead to a contract's balance changes, waiting for a financial document to be matched. This option is similar to 'A' but excludes closed and declined authorizations.
         *       * U - authorizations that lead to a contract's balance changes and cardholder's requests that do not change a contract's balance. Closed and declined authorizations are considered too.
         *
         * @example A
         */
        transactionAuthorizationFilterMode: "A" | "N" | "S" | "U";
        /**
         * @description Determines whether the transaction was authorized.
         *
         * @example Y
         */
        transactionAuthorized: "Y" | "N";
        /** @description The list of usage limit codes which should be returned.
         *
         *     Note: Response will contain only specified limit codes that does exist in the CMS. If none exists or a list does not contain any value then the response will not return any data (HTTP 200 will be returned with an empty array `[]`).
         *
         *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
         *      */
        usageLimitCodes: components["schemas"]["usageLimitCode"][];
        /**
         * @description Unique usage limit code which defines the contract's usage limit for which action should be executed.
         *
         *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
         *
         * @example DAILY_TOTAL
         */
        usageLimitCode: components["schemas"]["usageLimitCode"];
        /**
         * @description Definition specifying what type of sensitive data an RSA key data will be used for.
         *
         *     | **Possible values** 	| **Description**          	|
         *     |---------------------	|--------------------------	|
         *     | PIN_BLOCK           	| For PIN block encryption 	|
         *
         * @example PIN_BLOCK
         */
        dateTypeToSecure: "PIN_BLOCK";
        /**
         * @description The list of `Status`. The response will contain contracts with specified statuses only.
         *
         *     If the list does not contain any value then the response will contain all cards without filtering by status.
         *
         * @example 41,05
         */
        statuses: string[];
        /**
         * @description Response will return card contracts with creation date >= than date passed in the request (YYYY-MM-DD format).
         *
         *     If not filled card contracts are returned without checking the creation date.
         *
         * @example 2019-06-24
         */
        creationDateFrom: string;
        /**
         * @description Tariff code.
         *
         * @example MTP_CALC_RULE
         */
        tariffCode: string;
        /**
         * @description Tariff type code.
         *
         * @example MTP_CALC_RULE
         */
        tariffTypeCode: string;
        /**
         * @description Personalisation type.
         *
         *     | **Possible values** 	|      **Description**      	|
         *     |:-------------------:	|:-------------------------:	|
         *     |          G          	|           Global          	|
         *     |          P          	|          Personal         	|
         *     |          D          	|        Personalised       	|
         *     |          T          	| Personal (Template Based) 	|
         *     |          L          	|          Template         	|
         *
         * @example G
         */
        personalisationType: "G" | "P" | "D" | "T" | "L";
        /**
         * @description Tariff domain code.
         *
         * @example GL
         */
        tariffDomainCode: string;
        /**
         * @description Tariff role.
         *
         *       | **Possible values** 	| **Description**            	|
         *       |---------------------	|----------------------------	|
         *       | SERVICE             	|  Service                   	|
         *       | SERVICE_LIMIT       	|  Service Limit             	|
         *       | SERVICE_VD          	|  Service Value Days        	|
         *       | INTEREST            	|  Interest                  	|
         *       | AGEING              	|  Ageing                    	|
         *       | USAGE               	|  Usage                     	|
         *       | INTEREST_TAX        	|  Interest Tax              	|
         *       | BILLING             	|  Billing Scheme            	|
         *       | GL                  	|  General Ledger Numeration 	|
         *       | INST_FEE            	|  Installment Fee           	|
         *       | INSTALLMENT         	|  Installment Scheme        	|
         *       | THRESHOLD           	|  Threshold                 	|
         *       | TECHNICAL           	|  Technical                 	|
         *       | FX                  	|  Conversion                	|
         *       | REDEFINITION        	|  Redefinition              	|
         *
         * @example AGEING
         */
        tariffRole: "SERVICE" | "SERVICE_LIMIT" | "SERVICE_VD" | "INTEREST" | "AGEING" | "USAGE" | "INTEREST_TAX" | "BILLING" | "GL" | "INST_FEE" | "INSTALLMENT" | "THRESHOLD" | "TECHNICAL" | "FX" | "REDEFINITION";
        /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
         *      */
        idempotencyKey: string;
    };
    requestBodies: {
        BlockedFundsRelease: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["BlockedFundsRelease"];
            };
        };
        ReverseTransactionReason: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["ReverseTransactionReason"];
            };
        };
        ClientCreation: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientCreation"];
            };
        };
        ClientIdentifierWithRelinkType: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientIdentifierWithRelinkType"];
            };
        };
        ClientIdentifier: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientIdentifier"];
            };
        };
        AccountContractIdentifierWithClientIdentifier: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["AccountContractIdentifierWithClientIdentifier"];
            };
        };
        AccountContractIdentifier: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["AccountContractIdentifier"];
            };
        };
        Event: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["Event"];
            };
        };
        AccountContractCreation: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["AccountContractCreation"];
            };
        };
        AccountContractStatusWithReason: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["AccountContractStatusWithReason"];
            };
        };
        CardContractCreation: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractCreation"];
            };
        };
        CardContractModification: {
            content: {
                "application/merge-patch+json;charset=utf-8": components["schemas"]["CardContractModification"];
            };
        };
        CvcSearchCriteria: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["CvcSearchCriteria"];
            };
        };
        CvcVerification: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["CvcVerification"];
            };
        };
        PinVerification: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["PinVerification"];
            };
        };
        PinCreation: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["PinCreation"];
            };
        };
        PinSearchCriteria: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["PinSearchCriteria"];
            };
        };
        CardContractActivation: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractActivation"];
            };
        };
        CardContractStatusWithReason: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractStatusWithReason"];
            };
        };
        OnlinePinAttemptsClearance: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["OnlinePinAttemptsClearance"];
            };
        };
        OnlinePinAttemptsClearanceForClient: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["OnlinePinAttemptsClearanceForClient"];
            };
        };
        AddressCreation: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["AddressCreation"];
            };
        };
        AddressModification: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["AddressModification"];
            };
        };
        ClassifierCreation: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClassifierCreation"];
            };
        };
        CustomDataTags: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["CustomDataTags"];
            };
        };
        ParameterModification: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["ParameterModification"];
            };
        };
        TransactionContractDebit: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["TransactionContractDebit"];
            };
        };
        ChargeFee: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["ChargeFee"];
            };
        };
        ServiceLimitTariff: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["ServiceLimitTariff"];
            };
        };
        UsageLimitModification: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["UsageLimitModification"];
            };
        };
        UsageLimitOriginalValue: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["UsageLimitOriginalValue"];
            };
        };
        UsageLimitResetting: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["UsageLimitResetting"];
            };
        };
        UsageLimitStatus: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["UsageLimitStatus"];
            };
        };
        AccountContractIdentifierSearch: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["AccountContractIdentifierSearch"];
            };
        };
        CardContractIdentifierSearch: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractIdentifierSearch"];
            };
        };
        ClientIdentifierSearch: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["ClientIdentifierSearch"];
            };
        };
        ClientModification: {
            content: {
                "application/merge-patch+json;charset=utf-8": components["schemas"]["ClientModification"];
            };
        };
        AccountContractModification: {
            content: {
                "application/merge-patch+json;charset=utf-8": components["schemas"]["AccountContractModification"];
            };
        };
        CardContractReissue: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractReissue"];
            };
        };
        AuthenticationMethod: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["AuthenticationMethod"];
            };
        };
        TransactionContractCredit: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["TransactionContractCredit"];
            };
        };
        CardContractDetailsVerification: {
            content: {
                "application/json;charset=utf-8": components["schemas"]["CardContractDetailsVerification"];
            };
        };
    };
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    createClient: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ClientCreation"];
        responses: {
            201: components["responses"]["ClientIdentifierCreated"];
            400: components["responses"]["BadRequestNullClientNumberError"];
            403: components["responses"]["OperationDeniedError"];
        };
    };
    getClient: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["Client"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    updateClient: {
        parameters: {
            query?: never;
            header: {
                /**
                 * @description Used to ensure idempotency for the PATCH methods.
                 *     This header should be populated with the `ETag` received in the response header from the GET call of the same resource being updated. See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for more details.
                 *
                 * @example 5c7d022061b0874200bfed735c6b9308
                 */
                "If-Match": components["parameters"]["ifMatch"];
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ClientModification"];
        responses: {
            204: components["responses"]["ClientUpdated"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
            412: components["responses"]["PreconditionError"];
        };
    };
    getAccountContractsByClient: {
        parameters: {
            query?: {
                /**
                 * @description The number of items you want the list to be limited to.
                 *
                 * @example 1
                 */
                limit?: components["parameters"]["limit"];
                /**
                 * @description The number of items to offset the start of the list from.
                 *
                 * @example 0
                 */
                offset?: components["parameters"]["offset"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ClientAccountContracts"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    getCardContractsByClient: {
        parameters: {
            query?: {
                /**
                 * @description Response will return card contracts with creation date >= than date passed in the request (YYYY-MM-DD format).
                 *
                 *     If not filled card contracts are returned without checking the creation date.
                 *
                 * @example 2019-06-24
                 */
                creation_date_from?: components["parameters"]["creationDateFrom"];
                /**
                 * @description The list of `Status`. The response will contain contracts with specified statuses only.
                 *
                 *     If the list does not contain any value then the response will contain all cards without filtering by status.
                 *
                 * @example 41,05
                 */
                statuses?: components["parameters"]["statuses"];
                /**
                 * @description The number of items you want the list to be limited to.
                 *
                 * @example 1
                 */
                limit?: components["parameters"]["limit"];
                /**
                 * @description The number of items to offset the start of the list from.
                 *
                 * @example 0
                 */
                offset?: components["parameters"]["offset"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ClientCardContracts"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    openEvent: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["Event"];
        responses: {
            200: components["responses"]["ContractEventCreated"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getContractFinancials: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ContractFinancial"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getContractBalances: {
        parameters: {
            query: {
                /** @description List of balance codes. The response will return information about specified balances.
                 *
                 *     Note: Response will contain only specified balance codes that does exist in the CMS. If none exists or a list does not contain any value then the response will not return any data (HTTP 200 will be returned with an empty array `[]`).
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
                 *      */
                balance_codes: components["parameters"]["contractBalanceCodes"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ContractBalances"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getTechnicalAccounts: {
        parameters: {
            query?: {
                /**
                 * @description Code of the account, which is related to the given contract.
                 *
                 * @example BF
                 */
                technical_account_code?: components["parameters"]["technicalAccountCode"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["TechnicalAccounts"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getContractTreeSummary: {
        parameters: {
            query?: {
                /**
                 * @description The number of items you want the list to be limited to.
                 *
                 * @example 1
                 */
                limit?: components["parameters"]["limit"];
                /**
                 * @description The number of items to offset the start of the list from.
                 *
                 * @example 0
                 */
                offset?: components["parameters"]["offset"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ContractSummaryTree"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    createAccountContract: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AccountContractCreation"];
        responses: {
            201: components["responses"]["AccountContractIdentifierCreated"];
            400: components["responses"]["BadRequestNullClassifierCodeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    getAccountContract: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for an account contract generated by the MP's CMS. The identifier is generated when account contract creation finishes successfully and is returned in an account contract creation response (`POST /accounts`).
                 *
                 * @example 60001
                 */
                account_contract_id: components["parameters"]["accountContractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["AccountContract"];
            400: components["responses"]["BadRequestInvalidAccountContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["AccountContractNotFoundError"];
        };
    };
    updateAccountContract: {
        parameters: {
            query?: never;
            header: {
                /**
                 * @description Used to ensure idempotency for the PATCH methods.
                 *     This header should be populated with the `ETag` received in the response header from the GET call of the same resource being updated. See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for more details.
                 *
                 * @example 5c7d022061b0874200bfed735c6b9308
                 */
                "If-Match": components["parameters"]["ifMatch"];
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical identifier for an account contract generated by the MP's CMS. The identifier is generated when account contract creation finishes successfully and is returned in an account contract creation response (`POST /accounts`).
                 *
                 * @example 60001
                 */
                account_contract_id: components["parameters"]["accountContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AccountContractModification"];
        responses: {
            204: components["responses"]["AccountUpdated"];
            400: components["responses"]["BadRequestInvalidAccountContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["AccountContractNotFoundError"];
            412: components["responses"]["PreconditionError"];
        };
    };
    changeAccountContractStatus: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for an account contract generated by the MP's CMS. The identifier is generated when account contract creation finishes successfully and is returned in an account contract creation response (`POST /accounts`).
                 *
                 * @example 60001
                 */
                account_contract_id: components["parameters"]["accountContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AccountContractStatusWithReason"];
        responses: {
            204: components["responses"]["AccountStatusChanged"];
            400: components["responses"]["BadRequestInvalidAccountContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["AccountContractNotFoundError"];
        };
    };
    getAccountContractStatus: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for an account contract generated by the MP's CMS. The identifier is generated when account contract creation finishes successfully and is returned in an account contract creation response (`POST /accounts`).
                 *
                 * @example 60001
                 */
                account_contract_id: components["parameters"]["accountContractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["AccountContractStatus"];
            400: components["responses"]["BadRequestInvalidAccountContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["AccountContractNotFoundError"];
        };
    };
    changeAccountContractClient: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for an account contract generated by the MP's CMS. The identifier is generated when account contract creation finishes successfully and is returned in an account contract creation response (`POST /accounts`).
                 *
                 * @example 60001
                 */
                account_contract_id: components["parameters"]["accountContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ClientIdentifierWithRelinkType"];
        responses: {
            204: components["responses"]["AccountRelinked"];
            400: components["responses"]["BadRequestInvalidAccountContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["AccountContractNotFoundError"];
        };
    };
    changeContractMainContract: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AccountContractIdentifierWithClientIdentifier"];
        responses: {
            204: components["responses"]["SubAccountRelinked"];
            400: components["responses"]["BadRequestInvalidAccountContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getSubAccountContracts: {
        parameters: {
            query?: {
                /**
                 * @description The number of items you want the list to be limited to.
                 *
                 * @example 1
                 */
                limit?: components["parameters"]["limit"];
                /**
                 * @description The number of items to offset the start of the list from.
                 *
                 * @example 0
                 */
                offset?: components["parameters"]["offset"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for an account contract generated by the MP's CMS. The identifier is generated when account contract creation finishes successfully and is returned in an account contract creation response (`POST /accounts`).
                 *
                 * @example 60001
                 */
                account_contract_id: components["parameters"]["accountContractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["SubAccountContracts"];
            400: components["responses"]["BadRequestInvalidAccountContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["AccountContractNotFoundError"];
        };
    };
    getCardContractsByAccount: {
        parameters: {
            query?: {
                /**
                 * @description Response will return card contracts with creation date >= than date passed in the request (YYYY-MM-DD format).
                 *
                 *     If not filled card contracts are returned without checking the creation date.
                 *
                 * @example 2019-06-24
                 */
                creation_date_from?: components["parameters"]["creationDateFrom"];
                /**
                 * @description The list of `Status`. The response will contain contracts with specified statuses only.
                 *
                 *     If the list does not contain any value then the response will contain all cards without filtering by status.
                 *
                 * @example 41,05
                 */
                statuses?: components["parameters"]["statuses"];
                /**
                 * @description The number of items you want the list to be limited to.
                 *
                 * @example 1
                 */
                limit?: components["parameters"]["limit"];
                /**
                 * @description The number of items to offset the start of the list from.
                 *
                 * @example 0
                 */
                offset?: components["parameters"]["offset"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for an account contract generated by the MP's CMS. The identifier is generated when account contract creation finishes successfully and is returned in an account contract creation response (`POST /accounts`).
                 *
                 * @example 60001
                 */
                account_contract_id: components["parameters"]["accountContractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["AccountContractCardContracts"];
            400: components["responses"]["BadRequestInvalidAccountContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["AccountContractNotFoundError"];
        };
    };
    createCardContract: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CardContractCreation"];
        responses: {
            201: components["responses"]["CardContractIdentifierCreated"];
            400: components["responses"]["BadRequestNullCardContractError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["AccountContractNotFoundError"];
        };
    };
    getCardContract: {
        parameters: {
            query?: {
                /**
                 * @description The response message can return only the data represented by field names specified in this field.
                 *     The Issuer can choose any field name being returned for a card contract object or can leave the field empty (in such case all data will be returned).
                 *
                 * @example cardContractNumber,embossedData
                 */
                fields?: components["parameters"]["fieldsSelection"];
            };
            header?: {
                /**
                 * @description Public RSA key generated by the Issuer. ASCII/UTF-8 string of characters 0-9, A-F, ASN.1 DER Public hex unpacked to string or PEM concatenated Base64 without BEGIN and END lines.
                 *
                 *     Key is used to encrypt sensitive data returned by the MP in the response.
                 *
                 * @example 30820122300D06092A864886F70D01010105000382010F003082010A0282010100A7D079A8769BCD340574E8E6C0A2810C377279E5EA0B422B9132F955860730E7637DFAB0A1C6F117B25E3DB3D2A5A9F2691BBC7E0178ADFD12908C3E6E6D3A77AA26E25A6570FCC423561628879E918DC0C798527318308C70BBE2BC4597B83B96CB3680FE6F8E60D68B465E2B30558712A2D63A544239BE7B5F2A49C82FB3388A22644741A945EC9ACB3F219C3B6826241BE1706EF384100EC83D0D7FAE6CCF4E69E0EE02BF84C21553FA1999A8DB91C4193D1E671D5A22B1876E1DC81F1ED7033F3A26FF62E492A63ADA58AAE248D5E47896592CB9A7023CB8B8700882B4DCBF34C16F7FA00DF4C3931A4612E0E2A09586780E89D28FAAA195C07ADE88286F0203010001
                 */
                "Customer-Public-Rsa-Key"?: components["parameters"]["optionalCustomerPublicRsaKey"];
            };
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["CardContract"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    updateCardContract: {
        parameters: {
            query?: never;
            header: {
                /**
                 * @description Used to ensure idempotency for the PATCH methods.
                 *     This header should be populated with the `ETag` received in the response header from the GET call of the same resource being updated. See [RFC7232](https://datatracker.ietf.org/doc/html/rfc7232) for more details.
                 *
                 * @example 5c7d022061b0874200bfed735c6b9308
                 */
                "If-Match": components["parameters"]["ifMatch"];
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CardContractModification"];
        responses: {
            204: components["responses"]["CardUpdated"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
            412: components["responses"]["PreconditionError"];
        };
    };
    verifyCardDetails: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CardContractDetailsVerification"];
        responses: {
            200: components["responses"]["CardContractDetailsVerificationResult"];
            400: components["responses"]["BadRequestNullCardContractNumberError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    changeCardContractStatus: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CardContractStatusWithReason"];
        responses: {
            204: components["responses"]["CardStatusChanged"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    getCardContractStatus: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["CardContractStatus"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    changeCardContractClient: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ClientIdentifier"];
        responses: {
            204: components["responses"]["CardRelinkedToAnotherClient"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    changeCardContractMainContract: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AccountContractIdentifier"];
        responses: {
            204: components["responses"]["CardRelinkedToAnotherAccount"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    clearOnlinePinAttempts: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["OnlinePinAttemptsClearance"];
        responses: {
            204: components["responses"]["OnlinePinTryCounterReset"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    clearOnlinePinAttemptsForClient: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["OnlinePinAttemptsClearanceForClient"];
        responses: {
            204: components["responses"]["OnlinePinTryCounterReset"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    activateCard: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CardContractActivation"];
        responses: {
            204: components["responses"]["CardPlasticUnlocked"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    setPin: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Index of the MP's public RSA key received in a `GET /public-keys` response (API operation: `getPublicRsaKey`).
                 *
                 *     If `Key-Index` is provided, then the `newPinBlock` field must be encrypted using the MP's public RSA key received together with the `Key-Index` from the MP in `GET /public-keys` response (API operation: `getPublicRsaKey`).
                 *
                 * @example A1564386531162
                 */
                "Key-Index"?: components["parameters"]["keyIndex"];
            };
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["PinCreation"];
        responses: {
            204: components["responses"]["CardPlasticNewPinSetUp"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    getPin: {
        parameters: {
            query?: never;
            header: {
                /**
                 * @description Public RSA key generated by the Issuer. ASCII/UTF-8 string of characters 0-9, A-F, ASN.1 DER Public hex unpacked to string or PEM concatenated Base64 without BEGIN and END lines.
                 *
                 *     Key is used to encrypt sensitive data (`encryptedCardContractNumber`, `encryptedZpk`) returned by the MP in the response.
                 *
                 * @example 30820122300D06092A864886F70D01010105000382010F003082010A0282010100A7D079A8769BCD340574E8E6C0A2810C377279E5EA0B422B9132F955860730E7637DFAB0A1C6F117B25E3DB3D2A5A9F2691BBC7E0178ADFD12908C3E6E6D3A77AA26E25A6570FCC423561628879E918DC0C798527318308C70BBE2BC4597B83B96CB3680FE6F8E60D68B465E2B30558712A2D63A544239BE7B5F2A49C82FB3388A22644741A945EC9ACB3F219C3B6826241BE1706EF384100EC83D0D7FAE6CCF4E69E0EE02BF84C21553FA1999A8DB91C4193D1E671D5A22B1876E1DC81F1ED7033F3A26FF62E492A63ADA58AAE248D5E47896592CB9A7023CB8B8700882B4DCBF34C16F7FA00DF4C3931A4612E0E2A09586780E89D28FAAA195C07ADE88286F0203010001
                 */
                "Customer-Public-Rsa-Key": components["parameters"]["mandatoryCustomerPublicRsaKey"];
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["PinSearchCriteria"];
        responses: {
            200: components["responses"]["EncryptedPin"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    verifyPin: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Index of the MP's public RSA key received in a `GET /public-keys` response (API operation: `getPublicRsaKey`).
                 *
                 *     If `Key-Index` is provided, then the `newPinBlock` field must be encrypted using the MP's public RSA key received together with the `Key-Index` from the MP in `GET /public-keys` response (API operation: `getPublicRsaKey`).
                 *
                 * @example A1564386531162
                 */
                "Key-Index"?: components["parameters"]["keyIndex"];
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["PinVerification"];
        responses: {
            200: components["responses"]["PinVerificationResult"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    getCvc: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description Public RSA key generated by the Issuer. ASCII/UTF-8 string of characters 0-9, A-F, ASN.1 DER Public hex unpacked to string or PEM concatenated Base64 without BEGIN and END lines.
                 *
                 *     Key is used to encrypt sensitive data returned by the MP in the response.
                 *
                 * @example 30820122300D06092A864886F70D01010105000382010F003082010A0282010100A7D079A8769BCD340574E8E6C0A2810C377279E5EA0B422B9132F955860730E7637DFAB0A1C6F117B25E3DB3D2A5A9F2691BBC7E0178ADFD12908C3E6E6D3A77AA26E25A6570FCC423561628879E918DC0C798527318308C70BBE2BC4597B83B96CB3680FE6F8E60D68B465E2B30558712A2D63A544239BE7B5F2A49C82FB3388A22644741A945EC9ACB3F219C3B6826241BE1706EF384100EC83D0D7FAE6CCF4E69E0EE02BF84C21553FA1999A8DB91C4193D1E671D5A22B1876E1DC81F1ED7033F3A26FF62E492A63ADA58AAE248D5E47896592CB9A7023CB8B8700882B4DCBF34C16F7FA00DF4C3931A4612E0E2A09586780E89D28FAAA195C07ADE88286F0203010001
                 */
                "Customer-Public-Rsa-Key"?: components["parameters"]["optionalCustomerPublicRsaKey"];
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CvcSearchCriteria"];
        responses: {
            200: components["responses"]["Cvc"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    verifyCvc: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CvcVerification"];
        responses: {
            200: components["responses"]["CvcVerificationResult"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    getCardPlastics: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["CardContractPlastics"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    reissueCard: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical identifier for a card contract generated by the MP's CMS. The identifier is generated when card contract creation finishes successfully and is returned in a card contract creation response (`POST /cards`).
                 *
                 * @example 70001
                 */
                card_contract_id: components["parameters"]["cardContractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CardContractReissue"];
        responses: {
            201: components["responses"]["ReissuedCardContract"];
            400: components["responses"]["BadRequestInvalidCardContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    getClientAddresses: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ClientAddresses"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    addClientAddress: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AddressCreation"];
        responses: {
            200: components["responses"]["ClientAddressCreated"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    updateClientAddress: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
                /**
                 * @description Address type. Additional addresses allow to store any address related to the client or contract (account contract or card contract).
                 *
                 *     | **Default possible values** 	| **Description**             	|
                 *     |-----------------------------	|-----------------------------	|
                 *     | PIN                         	| PIN mailer delivery address 	|
                 *     | STMT                        	| Statement delivery address  	|
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process as they are configured in the CMS system.*
                 *
                 * @example PIN
                 */
                address_type: components["parameters"]["addressType"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AddressModification"];
        responses: {
            204: components["responses"]["ClientAddressUpdated"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    getContractAddresses: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ContractAddresses"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    addContractAddress: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AddressCreation"];
        responses: {
            200: components["responses"]["ContractAddressCreated"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    updateContractAddress: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
                /**
                 * @description Address type. Additional addresses allow to store any address related to the client or contract (account contract or card contract).
                 *
                 *     | **Default possible values** 	| **Description**             	|
                 *     |-----------------------------	|-----------------------------	|
                 *     | PIN                         	| PIN mailer delivery address 	|
                 *     | STMT                        	| Statement delivery address  	|
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process as they are configured in the CMS system.*
                 *
                 * @example PIN
                 */
                address_type: components["parameters"]["addressType"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AddressModification"];
        responses: {
            204: components["responses"]["ContractAddressUpdated"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    setClientClassifier: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
                /**
                 * @description Code of the classifier for which the value will be set.
                 *
                 *     *Disclaimer: Classifier codes are configured in the MP's CMS and the Issuer is allowed to use only the value configured by the MP (the Issuer cannot use their own values).*
                 *
                 * @example TEST_CLASSIFIER_01
                 */
                classifier_code: components["parameters"]["classifierCode"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ClassifierCreation"];
        responses: {
            204: components["responses"]["ClientClassifierSetUp"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    getClientClassifiers: {
        parameters: {
            query: {
                /** @description The list of classifiers which should be returned.
                 *
                 *     Note: Response will contain only specified classifier codes that does exist in the CMS. If none exists or a list does not contain any value then the response will not return any data (HTTP 200 will be returned with an empty array `[]`).
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
                 *      */
                classifier_codes: components["parameters"]["classifierCodes"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ClientClassifiers"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    setContractClassifier: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
                /**
                 * @description Code of the classifier for which the value will be set.
                 *
                 *     *Disclaimer: Classifier codes are configured in the MP's CMS and the Issuer is allowed to use only the value configured by the MP (the Issuer cannot use their own values).*
                 *
                 * @example TEST_CLASSIFIER_01
                 */
                classifier_code: components["parameters"]["classifierCode"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ClassifierCreation"];
        responses: {
            204: components["responses"]["ContractClassifierSetUp"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getContractClassifiers: {
        parameters: {
            query: {
                /** @description The list of classifiers which should be returned.
                 *
                 *     Note: Response will contain only specified classifier codes that does exist in the CMS. If none exists or a list does not contain any value then the response will not return any data (HTTP 200 will be returned with an empty array `[]`).
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
                 *      */
                classifier_codes: components["parameters"]["classifierCodes"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ContractClassifiers"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    setClientCustomData: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CustomDataTags"];
        responses: {
            200: components["responses"]["ClientCustomDataSetUp"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    getClientCustomData: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical client identifier, generated by the MP's CMS database engine. The identifier is generated when client creation finishes successfully and is returned in a client creation response (`POST /clients`, field `clientId`).
                 *
                 * @example 40000
                 */
                client_id: components["parameters"]["clientId"];
                /**
                 * @description Tag name
                 *
                 * @example TAG_01
                 */
                tag_name: components["parameters"]["tagName"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ClientCustomDataTagValues"];
            400: components["responses"]["BadRequestInvalidClientTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    setContractCustomData: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CustomDataTags"];
        responses: {
            200: components["responses"]["ContractCustomDataSetUp"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getContractCustomData: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
                /**
                 * @description Tag name
                 *
                 * @example TAG_01
                 */
                tag_name: components["parameters"]["tagName"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ContractCustomDataTagValues"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    setContractParameter: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
                /**
                 * @description Code of the contract parameter for which the value will be set.
                 *
                 *     *Disclaimer: Parameter codes are configured in the MP's CMS and the Issuer is allowed to use only the value configured by the MP (the Issuer cannot use their own values).*
                 *
                 * @example MTP_CALC_RULE
                 */
                parameter_code: components["parameters"]["parameterCode"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ParameterModification"];
        responses: {
            204: components["responses"]["ContractParameterSetOrChanged"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getContractParameters: {
        parameters: {
            query: {
                /**
                 * @description The list of contract parameters which should be returned.
                 *
                 *     Note: Response will contain only specified parameter codes that does exist in the CMS. If none exists or a list does not contain any value then the response will not return any data (HTTP 200 will be returned with an empty array `[]`).
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
                 *
                 * @example ATM_CALC_RULE,MTP_CALC_RULE
                 */
                parameter_codes: components["parameters"]["parameterCodes"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ContractParameters"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    debitContract: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["TransactionContractDebit"];
        responses: {
            201: components["responses"]["DebitTransactionId"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    creditContract: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["TransactionContractCredit"];
        responses: {
            201: components["responses"]["CreditTransactionId"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    chargeFee: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ChargeFee"];
        responses: {
            201: components["responses"]["ChargeTransactionId"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getTransactions: {
        parameters: {
            query: {
                /**
                 * @description Date from (YYYY-MM-DD format).
                 *
                 * @example 2031-06-25
                 */
                date_from: components["parameters"]["transactionDateFrom"];
                /**
                 * @description Date to (YYYY-MM-DD format).
                 *
                 * @example 2032-06-25
                 */
                date_to: components["parameters"]["transactionDateTo"];
                /**
                 * @description Specifies records filtering mode.
                 *
                 *     | **Possible values** 	| **Description**                   	|
                 *     |---------------------	|-----------------------------------	|
                 *     | A                   	| Not Matched Affecting Balance     	|
                 *     | N                   	| Not Affecting Balance             	|
                 *     | S                   	| Successful Only Affecting Balance 	|
                 *     | U                   	| All Records                       	|
                 *
                 *     Depending on its value the following authorizations are output:
                 *       * A (default value) - authorizations that lead to a contract's balance changes and haven't matched with financial documents (they are waiting for financial documents or already closed or declined).
                 *       * N - cardholder's requests not changing a contract's balance (Balance Inquiry, Online Statement, Top Up, Additional Online Service, Verification).
                 *       * S - active authorizations that lead to a contract's balance changes, waiting for a financial document to be matched. This option is similar to 'A' but excludes closed and declined authorizations.
                 *       * U - authorizations that lead to a contract's balance changes and cardholder's requests that do not change a contract's balance. Closed and declined authorizations are considered too.
                 *
                 * @example A
                 */
                authorization_filter_mode?: components["parameters"]["transactionAuthorizationFilterMode"];
                /**
                 * @description Determines whether the transaction was authorized.
                 *
                 * @example Y
                 */
                authorized?: components["parameters"]["transactionAuthorized"];
                /**
                 * @description The number of items you want the list to be limited to.
                 *
                 * @example 1
                 */
                limit?: components["parameters"]["limit"];
                /**
                 * @description The number of items to offset the start of the list from.
                 *
                 * @example 0
                 */
                offset?: components["parameters"]["offset"];
                /** @description The list of `transactionTypeCode` separated by commas.
                 *
                 *     Transactions originated from the Banknet
                 *     | `transactionTypeCode` 	| `transactionType`                     	|
                 *     |:---------------------:	|---------------------------------------	|
                 *     | 0512                  	| Retail with CashBack                  	|
                 *     | 0513 1                	| CH Debit                              	|
                 *     | 0515                  	| Retail                                	|
                 *     | 0518                  	| Unique                                	|
                 *     | 0522                  	| CashBack 2Prs                         	|
                 *     | 0523 1                	| CH Debit 2Prs                         	|
                 *     | 0525                  	| Retail 2Prs                           	|
                 *     | 0528                  	| Unique 2Prs                           	|
                 *     | 0614 2                	| CH Payment                            	|
                 *     | 0616                  	| Refund                                	|
                 *     | 0624 2                	| CH Payment 2Prs                       	|
                 *     | 0626                  	| Credit 2Prs                           	|
                 *     | 0717                  	| Cash Advance                          	|
                 *     | 0719                  	| ATM Cash Withdrawal                   	|
                 *     | 0727                  	| Cash 2Prs                             	|
                 *     | 0729                  	| ATM Cash withdrawal - 2nd presentment 	|
                 *
                 *     Transactions originated from the Issuer in the standard product
                 *     | `transactionTypeCode` 	| `transactionType`             	| **Product applicability** 	|
                 *     |-----------------------	|-------------------------------	|---------------------------	|
                 *     | APSF                  	| Paper statement fee           	| Credit                    	|
                 *     | BT1                   	| Balance Transfer              	| Credit                    	|
                 *     | FP                    	| Fee posting                   	| Credit                    	|
                 *     | I_TPC                 	| PBB Transfer posting - credit 	| Credit, Prepaid           	|
                 *     | I_TPD                 	| PBB Transfer posting - debit  	| Credit, Prepaid           	|
                 *     | PT_1                  	| Payment To Client Contract    	| Credit                    	|
                 *     | TP                    	| Prepaid Top-Up                	| Prepaid                   	|
                 *     | TPC_1                 	| Transaction posting - credit  	| Credit, Prepaid           	|
                 *     | TPD                   	| Transaction posting - debit   	| Credit                    	|
                 *
                 *     Fees originated from the CMS in the standard product
                 *     | `transactionTypeCode` 	| `transactionType`                     	| **Product applicability** 	|
                 *     |-----------------------	|---------------------------------------	|---------------------------	|
                 *     | A1F                   	| ATM Fee                               	| Prepaid                   	|
                 *     | AFM_1                 	| BCC CA Annual Fee Main Card           	| Prepaid                   	|
                 *     | AUCF                  	| Urgent card fee                       	| Credit, Prepaid           	|
                 *     | C1F                   	| Cash Fee                              	| Prepaid                   	|
                 *     | CF1                   	| Country Fee                           	| Prepaid                   	|
                 *     | FXF                   	| Foreign exchange (FX) fee             	| Credit                    	|
                 *     | INFC                  	| Insurance Fixed Card                  	| Credit                    	|
                 *     | INFS                  	| Insurance Fixed Single                	| Credit, Prepaid           	|
                 *     | INFSC                 	| Insurance Fixed Single Card           	| Credit                    	|
                 *     | INP                   	| Insurance Percentage                  	| Credit                    	|
                 *     | IPP                   	| BCC Insurance fee: Payment Protection 	| Credit, Prepaid           	|
                 *     | JFA                   	| Joining fee                           	| Prepaid                   	|
                 *     | LC                    	| New Lost Card for PIN Set             	| Prepaid                   	|
                 *     | LPF                   	| BCC Late Payment Fee                  	| Credit                    	|
                 *     | M;                    	| New Card for PIN Set                  	| Prepaid                   	|
                 *     | M0                    	| Plastic Renew Expired                 	| Prepaid                   	|
                 *     | M19                   	| Plastic Renew Misc (no Prod)          	| Credit                    	|
                 *     | M8                    	| Plastic Renew Misc                    	| Prepaid                   	|
                 *     | MA_1                  	| Balance Inquiry Fee                   	| Prepaid                   	|
                 *     | MF_1                  	| BCC Card Fee Billing                  	| Prepaid                   	|
                 *     | MFM                   	| Misc Fee Manual                       	| Prepaid                   	|
                 *     | MR                    	| Replaced Card for PIN Set (no Prod)   	| Credit                    	|
                 *     | OVLF                  	| OVL Fee                               	| Credit                    	|
                 *     | PFMCC                 	| Retail Fee based on MC                	| Prepaid                   	|
                 *     | PZ                    	| PIN Change Fee                        	| Prepaid                   	|
                 *     | RWCBTF                	| Retail with CB Transaction Fee        	| Credit                    	|
                 *     | TPF                   	| Top-up fee                            	| Prepaid                   	|
                 *     | VCP                   	| New Card for PIN Set (no Prod)        	| Credit                    	|
                 *
                 *     Interests originated from the CMS in the standard credit product
                 *     | `transactionTypeCode` 	| `transactionType`                 	|
                 *     |-----------------------	|-----------------------------------	|
                 *     | ILBT3                 	| Overdue cash interest             	|
                 *     | ILBT5                 	| Overdue balance transfer interest 	|
                 *     | ILC3                  	| Balance transfer interest         	|
                 *     | ILC5                  	| Overdue retail interest           	|
                 *     | ILR3                  	| Retail interest                   	|
                 *     | ILR5                  	| Cash interest                     	|
                 *      */
                transaction_type_codes?: components["parameters"]["transactionTypeCodes"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["Transactions"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getContractTransactionDocuments: {
        parameters: {
            query: {
                /**
                 * @description Date from (YYYY-MM-DD format).
                 *
                 * @example 2031-06-25
                 */
                date_from: components["parameters"]["transactionDateFrom"];
                /**
                 * @description Date to (YYYY-MM-DD format).
                 *
                 * @example 2032-06-25
                 */
                date_to: components["parameters"]["transactionDateTo"];
                /**
                 * @description Specifies records filtering mode.
                 *
                 *     | **Possible values** 	| **Description**                   	|
                 *     |---------------------	|-----------------------------------	|
                 *     | A                   	| Not Matched Affecting Balance     	|
                 *     | N                   	| Not Affecting Balance             	|
                 *     | S                   	| Successful Only Affecting Balance 	|
                 *     | U                   	| All Records                       	|
                 *
                 *     Depending on its value the following authorizations are output:
                 *       * A (default value) - authorizations that lead to a contract's balance changes and haven't matched with financial documents (they are waiting for financial documents or already closed or declined).
                 *       * N - cardholder's requests not changing a contract's balance (Balance Inquiry, Online Statement, Top Up, Additional Online Service, Verification).
                 *       * S - active authorizations that lead to a contract's balance changes, waiting for a financial document to be matched. This option is similar to 'A' but excludes closed and declined authorizations.
                 *       * U - authorizations that lead to a contract's balance changes and cardholder's requests that do not change a contract's balance. Closed and declined authorizations are considered too.
                 *
                 * @example A
                 */
                authorization_filter_mode?: components["parameters"]["transactionAuthorizationFilterMode"];
                /** @description Allows collecting information about authorization documents.
                 *     The parameter is used in combination with the `authorization_filter_mode` parameter.
                 *      */
                collect_authorizations?: components["parameters"]["transactionCollectAuthorizations"];
                /**
                 * @description Contracts hierarchy analysis mode.
                 *
                 *     | **Possible values** 	| **Description**                                                                               	|
                 *     |---------------------	|-----------------------------------------------------------------------------------------------	|
                 *     | N                   	| Search for transactions without contract's hierarchy analysis (default value)                 	|
                 *     | M                   	| Main-Sub hierarchies only                                                                     	|
                 *     | R                   	| Related Cards only. In this mode Liability and Main-Sub contract hierarchies are not analyzed 	|
                 *     | Y                   	| Liability and Main-Sub contract hierarchies are analyzed                                      	|
                 *
                 * @example R
                 */
                contract_hierarchy?: components["parameters"]["contractHierarchy"];
                /**
                 * @description Transaction type's direction.
                 *
                 *     | **Possible values** 	|
                 *     |---------------------	|
                 *     | CREDIT              	|
                 *     | DEBIT               	|
                 *     | NONE                	|
                 *
                 * @example DEBIT
                 */
                direction?: components["parameters"]["direction"];
                /**
                 * @description The number of items you want the list to be limited to.
                 *
                 * @example 1
                 */
                limit?: components["parameters"]["limit"];
                /**
                 * @description The number of items to offset the start of the list from.
                 *
                 * @example 0
                 */
                offset?: components["parameters"]["offset"];
                /** @description The list of `transactionTypeCode` separated by commas.
                 *
                 *     Transactions originated from the Banknet
                 *     | `transactionTypeCode` 	| `transactionType`                     	|
                 *     |:---------------------:	|---------------------------------------	|
                 *     | 0512                  	| Retail with CashBack                  	|
                 *     | 0513 1                	| CH Debit                              	|
                 *     | 0515                  	| Retail                                	|
                 *     | 0518                  	| Unique                                	|
                 *     | 0522                  	| CashBack 2Prs                         	|
                 *     | 0523 1                	| CH Debit 2Prs                         	|
                 *     | 0525                  	| Retail 2Prs                           	|
                 *     | 0528                  	| Unique 2Prs                           	|
                 *     | 0614 2                	| CH Payment                            	|
                 *     | 0616                  	| Refund                                	|
                 *     | 0624 2                	| CH Payment 2Prs                       	|
                 *     | 0626                  	| Credit 2Prs                           	|
                 *     | 0717                  	| Cash Advance                          	|
                 *     | 0719                  	| ATM Cash Withdrawal                   	|
                 *     | 0727                  	| Cash 2Prs                             	|
                 *     | 0729                  	| ATM Cash withdrawal - 2nd presentment 	|
                 *
                 *     Transactions originated from the Issuer in the standard product
                 *     | `transactionTypeCode` 	| `transactionType`             	| **Product applicability** 	|
                 *     |-----------------------	|-------------------------------	|---------------------------	|
                 *     | APSF                  	| Paper statement fee           	| Credit                    	|
                 *     | BT1                   	| Balance Transfer              	| Credit                    	|
                 *     | FP                    	| Fee posting                   	| Credit                    	|
                 *     | I_TPC                 	| PBB Transfer posting - credit 	| Credit, Prepaid           	|
                 *     | I_TPD                 	| PBB Transfer posting - debit  	| Credit, Prepaid           	|
                 *     | PT_1                  	| Payment To Client Contract    	| Credit                    	|
                 *     | TP                    	| Prepaid Top-Up                	| Prepaid                   	|
                 *     | TPC_1                 	| Transaction posting - credit  	| Credit, Prepaid           	|
                 *     | TPD                   	| Transaction posting - debit   	| Credit                    	|
                 *
                 *     Fees originated from the CMS in the standard product
                 *     | `transactionTypeCode` 	| `transactionType`                     	| **Product applicability** 	|
                 *     |-----------------------	|---------------------------------------	|---------------------------	|
                 *     | A1F                   	| ATM Fee                               	| Prepaid                   	|
                 *     | AFM_1                 	| BCC CA Annual Fee Main Card           	| Prepaid                   	|
                 *     | AUCF                  	| Urgent card fee                       	| Credit, Prepaid           	|
                 *     | C1F                   	| Cash Fee                              	| Prepaid                   	|
                 *     | CF1                   	| Country Fee                           	| Prepaid                   	|
                 *     | FXF                   	| Foreign exchange (FX) fee             	| Credit                    	|
                 *     | INFC                  	| Insurance Fixed Card                  	| Credit                    	|
                 *     | INFS                  	| Insurance Fixed Single                	| Credit, Prepaid           	|
                 *     | INFSC                 	| Insurance Fixed Single Card           	| Credit                    	|
                 *     | INP                   	| Insurance Percentage                  	| Credit                    	|
                 *     | IPP                   	| BCC Insurance fee: Payment Protection 	| Credit, Prepaid           	|
                 *     | JFA                   	| Joining fee                           	| Prepaid                   	|
                 *     | LC                    	| New Lost Card for PIN Set             	| Prepaid                   	|
                 *     | LPF                   	| BCC Late Payment Fee                  	| Credit                    	|
                 *     | M;                    	| New Card for PIN Set                  	| Prepaid                   	|
                 *     | M0                    	| Plastic Renew Expired                 	| Prepaid                   	|
                 *     | M19                   	| Plastic Renew Misc (no Prod)          	| Credit                    	|
                 *     | M8                    	| Plastic Renew Misc                    	| Prepaid                   	|
                 *     | MA_1                  	| Balance Inquiry Fee                   	| Prepaid                   	|
                 *     | MF_1                  	| BCC Card Fee Billing                  	| Prepaid                   	|
                 *     | MFM                   	| Misc Fee Manual                       	| Prepaid                   	|
                 *     | MR                    	| Replaced Card for PIN Set (no Prod)   	| Credit                    	|
                 *     | OVLF                  	| OVL Fee                               	| Credit                    	|
                 *     | PFMCC                 	| Retail Fee based on MC                	| Prepaid                   	|
                 *     | PZ                    	| PIN Change Fee                        	| Prepaid                   	|
                 *     | RWCBTF                	| Retail with CB Transaction Fee        	| Credit                    	|
                 *     | TPF                   	| Top-up fee                            	| Prepaid                   	|
                 *     | VCP                   	| New Card for PIN Set (no Prod)        	| Credit                    	|
                 *
                 *     Interests originated from the CMS in the standard credit product
                 *     | `transactionTypeCode` 	| `transactionType`                 	|
                 *     |-----------------------	|-----------------------------------	|
                 *     | ILBT3                 	| Overdue cash interest             	|
                 *     | ILBT5                 	| Overdue balance transfer interest 	|
                 *     | ILC3                  	| Balance transfer interest         	|
                 *     | ILC5                  	| Overdue retail interest           	|
                 *     | ILR3                  	| Retail interest                   	|
                 *     | ILR5                  	| Cash interest                     	|
                 *      */
                transaction_type_codes?: components["parameters"]["transactionTypeCodes"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["TransactionDocuments"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getTransactionDocuments: {
        parameters: {
            query: {
                /** @description Allows defining the type of selector passed in the `transaction_selector_value`.
                 *      */
                transaction_selector_type: components["parameters"]["transactionSelectorType"];
                /** @description Allows defining the value for the transactions selector.
                 *
                 *     * If `transaction_selector_type` is equal to `ARN` then maxLength of `transaction_selector_value` is 32
                 *
                 *     * If `transaction_selector_type` is equal to `ID` then maxLength of `transaction_selector_value` is 18
                 *
                 *     * If `transaction_selector_type` is equal to `RRN` then maxLength of `transaction_selector_value` is 12
                 *
                 *     * If `transaction_selector_type` is equal to `SRN` then maxLength of `transaction_selector_value` is 32
                 *      */
                transaction_selector_value: components["parameters"]["transactionSelectorValue"];
                /**
                 * @description The number of items you want the list to be limited to.
                 *
                 * @example 1
                 */
                limit?: components["parameters"]["limit"];
                /**
                 * @description The number of items to offset the start of the list from.
                 *
                 * @example 0
                 */
                offset?: components["parameters"]["offset"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["TransactionDocuments"];
            400: components["responses"]["BadRequestMissingTransactionSelectorTypeError"];
            403: components["responses"]["OperationDeniedError"];
        };
    };
    getTransactionFees: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Transaction record id from the CMS system.
                 *
                 * @example 90001
                 */
                transaction_id: components["parameters"]["transactionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["TransactionFees"];
            400: components["responses"]["BadRequestInvalidTransactionTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["TransactionNotFoundError"];
        };
    };
    setUsageLimit: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
                /**
                 * @description Unique usage limit code which defines the contract's usage limit for which action should be executed.
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
                 *
                 * @example DAILY_TOTAL
                 */
                usage_limit_code: components["parameters"]["usageLimitCode"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["UsageLimitModification"];
        responses: {
            204: components["responses"]["ContractUsageLimitAddedOrUpdated"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getUsageLimits: {
        parameters: {
            query: {
                /** @description The list of usage limit codes which should be returned.
                 *
                 *     Note: Response will contain only specified limit codes that does exist in the CMS. If none exists or a list does not contain any value then the response will not return any data (HTTP 200 will be returned with an empty array `[]`).
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
                 *      */
                usage_limit_codes: components["parameters"]["usageLimitCodes"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["UsageLimits"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    restoreUsageLimitOriginalValues: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
                /**
                 * @description Unique usage limit code which defines the contract's usage limit for which action should be executed.
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
                 *
                 * @example DAILY_TOTAL
                 */
                usage_limit_code: components["parameters"]["usageLimitCode"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["UsageLimitOriginalValue"];
        responses: {
            204: components["responses"]["ContractUsageLimitRestored"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    resetUsageLimitCounters: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
                /**
                 * @description Unique usage limit code which defines the contract's usage limit for which action should be executed.
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
                 *
                 * @example DAILY_TOTAL
                 */
                usage_limit_code: components["parameters"]["usageLimitCode"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["UsageLimitResetting"];
        responses: {
            204: components["responses"]["ContractUsageLimitCounterReset"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    changeUsageLimitStatus: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
                /**
                 * @description Unique usage limit code which defines the contract's usage limit for which action should be executed.
                 *
                 *     *Disclaimer: Possible values which can be sent must be defined by MP and Issuer during the onboarding process.*
                 *
                 * @example DAILY_TOTAL
                 */
                usage_limit_code: components["parameters"]["usageLimitCode"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["UsageLimitStatus"];
        responses: {
            204: components["responses"]["ContractUsageLimitStatusChanged"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    setServiceLimitTariff: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ServiceLimitTariff"];
        responses: {
            200: components["responses"]["ServiceLimitTariffSetUp"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getContractTariffData: {
        parameters: {
            query?: {
                /**
                 * @description The number of items you want the list to be limited to.
                 *
                 * @example 1
                 */
                limit?: components["parameters"]["limit"];
                /**
                 * @description The number of items to offset the start of the list from.
                 *
                 * @example 0
                 */
                offset?: components["parameters"]["offset"];
                /**
                 * @description Personalisation type.
                 *
                 *     | **Possible values** 	|      **Description**      	|
                 *     |:-------------------:	|:-------------------------:	|
                 *     |          G          	|           Global          	|
                 *     |          P          	|          Personal         	|
                 *     |          D          	|        Personalised       	|
                 *     |          T          	| Personal (Template Based) 	|
                 *     |          L          	|          Template         	|
                 *
                 * @example G
                 */
                personalisation_type?: components["parameters"]["personalisationType"];
                /**
                 * @description Tariff code.
                 *
                 * @example MTP_CALC_RULE
                 */
                tariff_code?: components["parameters"]["tariffCode"];
                /**
                 * @description Tariff domain code.
                 *
                 * @example GL
                 */
                tariff_domain_code?: components["parameters"]["tariffDomainCode"];
                /**
                 * @description Tariff role.
                 *
                 *       | **Possible values** 	| **Description**            	|
                 *       |---------------------	|----------------------------	|
                 *       | SERVICE             	|  Service                   	|
                 *       | SERVICE_LIMIT       	|  Service Limit             	|
                 *       | SERVICE_VD          	|  Service Value Days        	|
                 *       | INTEREST            	|  Interest                  	|
                 *       | AGEING              	|  Ageing                    	|
                 *       | USAGE               	|  Usage                     	|
                 *       | INTEREST_TAX        	|  Interest Tax              	|
                 *       | BILLING             	|  Billing Scheme            	|
                 *       | GL                  	|  General Ledger Numeration 	|
                 *       | INST_FEE            	|  Installment Fee           	|
                 *       | INSTALLMENT         	|  Installment Scheme        	|
                 *       | THRESHOLD           	|  Threshold                 	|
                 *       | TECHNICAL           	|  Technical                 	|
                 *       | FX                  	|  Conversion                	|
                 *       | REDEFINITION        	|  Redefinition              	|
                 *
                 * @example AGEING
                 */
                tariff_role?: components["parameters"]["tariffRole"];
                /**
                 * @description Tariff type code.
                 *
                 * @example MTP_CALC_RULE
                 */
                tariff_type_code?: components["parameters"]["tariffTypeCode"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ContractTariffs"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    getClientId: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ClientIdentifierSearch"];
        responses: {
            200: components["responses"]["ClientIdentifier"];
            400: components["responses"]["BadRequestNullClientIdentifierError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ClientNotFoundError"];
        };
    };
    getAccountContractId: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AccountContractIdentifierSearch"];
        responses: {
            200: components["responses"]["AccountContractIdentifier"];
            400: components["responses"]["BadRequestNullAccountContractIdentifierError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["AccountContractNotFoundError"];
        };
    };
    getCardContractId: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["CardContractIdentifierSearch"];
        responses: {
            200: components["responses"]["CardContractIdentifier"];
            400: components["responses"]["BadRequestNullCardContractIdentifierError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["CardContractNotFoundError"];
        };
    };
    getPublicRsaKey: {
        parameters: {
            query: {
                /**
                 * @description Definition specifying what type of sensitive data an RSA key data will be used for.
                 *
                 *     | **Possible values** 	| **Description**          	|
                 *     |---------------------	|--------------------------	|
                 *     | PIN_BLOCK           	| For PIN block encryption 	|
                 *
                 * @example PIN_BLOCK
                 */
                data_type_to_secure: components["parameters"]["dateTypeToSecure"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["PublicRsaKeyData"];
            400: components["responses"]["BadRequestMissingDataTypeToSecureError"];
            403: components["responses"]["OperationDeniedError"];
        };
    };
    setAuthenticationMethod: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["AuthenticationMethod"];
        responses: {
            204: components["responses"]["AuthenticationMethodSetUp"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    releaseBlockedFunds: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
                /**
                 * @description Transaction record id from the CMS system.
                 *
                 * @example 90001
                 */
                transaction_id: components["parameters"]["transactionId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["BlockedFundsRelease"];
        responses: {
            200: components["responses"]["BlockedFundsReleaseResult"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
    reverseTransaction: {
        parameters: {
            query?: never;
            header?: {
                /** @description Unique identifier generated by the issuer. Mastercard Processing uses this identifier to recognize subsequent retries of the same request and ensure idempotent behaviour by sending the same response without repeating the operation again.
                 *      */
                "Idempotency-Key"?: components["parameters"]["idempotencyKey"];
            };
            path: {
                /**
                 * @description Transaction record id from the CMS system.
                 *
                 * @example 90001
                 */
                transaction_id: components["parameters"]["transactionId"];
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ReverseTransactionReason"];
        responses: {
            201: components["responses"]["ReverseTransactionId"];
            400: components["responses"]["BadRequestInvalidTransactionTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["TransactionNotFoundError"];
        };
    };
    getAuthenticationParameterValue: {
        parameters: {
            query: {
                /**
                 * @description Contract authentication parameter name.
                 *
                 * @example PHONE
                 */
                authentication_parameter_name: components["parameters"]["authenticationParameterName"];
                /**
                 * @description Contract authentication type code.
                 *
                 * @example 3DS_EXT_ENROLLMENT
                 */
                authentication_type_code: components["parameters"]["authenticationTypeCode"];
            };
            header?: never;
            path: {
                /**
                 * @description Unique technical contract identifier generated by the CMS.
                 *
                 *     The identifier is generated when contract (account or card) creation finishes successfully and is returned in:
                 *       * account contract creation response (`POST /accounts`, field: `accountContractId`).
                 *       * card contract creation response (`POST /cards`, field: `cardContractId`).
                 *
                 * @example 70001
                 */
                contract_id: components["parameters"]["contractId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["AuthenticationParameterValue"];
            400: components["responses"]["BadRequestInvalidContractTypeError"];
            403: components["responses"]["OperationDeniedError"];
            404: components["responses"]["ContractNotFoundError"];
        };
    };
}

export type AccountContract = components["schemas"]["AccountContract"];
export type AccountContractCardContracts = components["schemas"]["AccountContractCardContracts"];
export type AccountContractCreation = components["schemas"]["AccountContractCreation"];
export type AccountContractIdentifier = components["schemas"]["AccountContractIdentifier"];
export type AccountContractIdentifierSearch = components["schemas"]["AccountContractIdentifierSearch"];
export type AccountContractIdentifierWithClientIdentifier = components["schemas"]["AccountContractIdentifierWithClientIdentifier"];
export type AccountContractModification = components["schemas"]["AccountContractModification"];
export type AccountContractStatus = components["schemas"]["AccountContractStatus"];
export type AccountContractStatusWithReason = components["schemas"]["AccountContractStatusWithReason"];
export type AddClientAddress = NonNullable<operations["addClientAddress"]["parameters"]["header"]>;
export type AddContractAddress = NonNullable<operations["addContractAddress"]["parameters"]["header"]>;
export type AddressCreation = components["schemas"]["AddressCreation"];
export type AddressModification = components["schemas"]["AddressModification"];
export type AuthenticationMethod = components["schemas"]["AuthenticationMethod"];
export type AuthenticationParameterValue = components["schemas"]["AuthenticationParameterValue"];
export type BlockedFundsRelease = components["schemas"]["BlockedFundsRelease"];
export type BlockedFundsReleaseResult = components["schemas"]["BlockedFundsReleaseResult"];
export type BodyAccountContractCreation = AccountContractCreation;
export type BodyAccountContractIdentifier = AccountContractIdentifier;
export type BodyAccountContractIdentifierSearch = AccountContractIdentifierSearch;
export type BodyAccountContractIdentifierWithClientIdentifier = AccountContractIdentifierWithClientIdentifier;
export type BodyAccountContractModification = AccountContractModification;
export type BodyAccountContractStatusWithReason = AccountContractStatusWithReason;
export type BodyAddressCreation = AddressCreation;
export type BodyAddressModification = AddressModification;
export type BodyAuthenticationMethod = AuthenticationMethod;
export type BodyBlockedFundsRelease = BlockedFundsRelease;
export type BodyCardContractActivation = CardContractActivation;
export type BodyCardContractCreation = CardContractCreation;
export type BodyCardContractDetailsVerification = CardContractDetailsVerification;
export type BodyCardContractIdentifierSearch = CardContractIdentifierSearch;
export type BodyCardContractModification = CardContractModification;
export type BodyCardContractReissue = CardContractReissue;
export type BodyCardContractStatusWithReason = CardContractStatusWithReason;
export type BodyChargeFee = ChargeFee;
export type BodyClassifierCreation = ClassifierCreation;
export type BodyClientCreation = ClientCreation;
export type BodyClientIdentifier = ClientIdentifier;
export type BodyClientIdentifierSearch = ClientIdentifierSearch;
export type BodyClientIdentifierWithRelinkType = ClientIdentifierWithRelinkType;
export type BodyClientModification = ClientModification;
export type BodyCustomDataTags = CustomDataTags;
export type BodyCvcSearchCriteria = CvcSearchCriteria;
export type BodyCvcVerification = CvcVerification;
export type BodyEvent = Event;
export type BodyOnlinePinAttemptsClearance = OnlinePinAttemptsClearance;
export type BodyOnlinePinAttemptsClearanceForClient = OnlinePinAttemptsClearanceForClient;
export type BodyParameterModification = ParameterModification;
export type BodyPinCreation = PinCreation;
export type BodyPinSearchCriteria = PinSearchCriteria;
export type BodyPinVerification = PinVerification;
export type BodyReverseTransactionReason = ReverseTransactionReason;
export type BodyServiceLimitTariff = ServiceLimitTariff;
export type BodyTransactionContractCredit = TransactionContractCredit;
export type BodyTransactionContractDebit = TransactionContractDebit;
export type BodyUsageLimitModification = UsageLimitModification;
export type BodyUsageLimitOriginalValue = UsageLimitOriginalValue;
export type BodyUsageLimitResetting = UsageLimitResetting;
export type BodyUsageLimitStatus = UsageLimitStatus;
export type CardContractActivation = components["schemas"]["CardContractActivation"];
export type CardContractCreation = components["schemas"]["CardContractCreation"];
export type CardContractDetailsVerification = components["schemas"]["CardContractDetailsVerification"];
export type CardContractDetailsVerificationResult = components["schemas"]["CardContractDetailsVerificationResult"];
export type CardContractIdentifier = components["schemas"]["CardContractIdentifier"];
export type CardContractIdentifierSearch = components["schemas"]["CardContractIdentifierSearch"];
export type CardContractModification = components["schemas"]["CardContractModification"];
export type CardContractPlastics = components["schemas"]["CardContractPlastics"];
export type CardContractReissue = components["schemas"]["CardContractReissue"];
export type CardContractStatus = components["schemas"]["CardContractStatus"];
export type CardContractStatusWithReason = components["schemas"]["CardContractStatusWithReason"];
export type CardContractWithEncryptedCardContractNumber = components["schemas"]["CardContractWithEncryptedCardContractNumber"];
export type ChargeFee = NonNullable<operations["chargeFee"]["parameters"]["header"]>;
export type ClassifierCreation = components["schemas"]["ClassifierCreation"];
export type Client = components["schemas"]["Client"];
export type ClientAccountContracts = components["schemas"]["ClientAccountContracts"];
export type ClientAddresses = components["schemas"]["ClientAddresses"];
export type ClientCardContracts = components["schemas"]["ClientCardContracts"];
export type ClientClassifiers = components["schemas"]["ClientClassifiers"];
export type ClientCreation = components["schemas"]["ClientCreation"];
export type ClientCustomDataTagValues = components["schemas"]["ClientCustomDataTagValues"];
export type ClientIdentifier = components["schemas"]["ClientIdentifier"];
export type ClientIdentifierSearch = components["schemas"]["ClientIdentifierSearch"];
export type ClientIdentifierWithRelinkType = components["schemas"]["ClientIdentifierWithRelinkType"];
export type ClientModification = components["schemas"]["ClientModification"];
export type ContractAddresses = components["schemas"]["ContractAddresses"];
export type ContractBalances = components["schemas"]["ContractBalances"];
export type ContractClassifiers = components["schemas"]["ContractClassifiers"];
export type ContractCustomDataTagValues = components["schemas"]["ContractCustomDataTagValues"];
export type ContractFinancial = components["schemas"]["ContractFinancial"];
export type ContractParameters = components["schemas"]["ContractParameters"];
export type ContractSummaryTree = components["schemas"]["ContractSummaryTree"];
export type ContractTariffs = components["schemas"]["ContractTariffs"];
export type CreateAccountContract = NonNullable<operations["createAccountContract"]["parameters"]["header"]>;
export type CreateCardContract = NonNullable<operations["createCardContract"]["parameters"]["header"]>;
export type CreateClient = NonNullable<operations["createClient"]["parameters"]["header"]>;
export type CreditContract = NonNullable<operations["creditContract"]["parameters"]["header"]>;
export type CustomDataTags = components["schemas"]["CustomDataTags"];
export type Cvc = components["schemas"]["Cvc"];
export type CvcSearchCriteria = components["schemas"]["CvcSearchCriteria"];
export type CvcVerification = components["schemas"]["CvcVerification"];
export type CvcVerificationResult = components["schemas"]["CvcVerificationResult"];
export type DebitContract = NonNullable<operations["debitContract"]["parameters"]["header"]>;
export type EncryptedPin = components["schemas"]["EncryptedPin"];
export type Event = components["schemas"]["Event"];
export type GetAccountContractId = NonNullable<operations["getAccountContractId"]["parameters"]["header"]>;
export type GetAccountContractsByClient = operations["getAccountContractsByClient"]["parameters"]["query"];
export type GetAuthenticationParameterValue = operations["getAuthenticationParameterValue"]["parameters"]["query"];
export type GetCardContract = NonNullable<operations["getCardContract"]["parameters"]["header"]>;
export type GetCardContractId = NonNullable<operations["getCardContractId"]["parameters"]["header"]>;
export type GetCardContractsByAccount = operations["getCardContractsByAccount"]["parameters"]["query"];
export type GetCardContractsByClient = operations["getCardContractsByClient"]["parameters"]["query"];
export type GetClientClassifiers = operations["getClientClassifiers"]["parameters"]["query"];
export type GetClientId = NonNullable<operations["getClientId"]["parameters"]["header"]>;
export type GetContractBalances = operations["getContractBalances"]["parameters"]["query"];
export type GetContractClassifiers = operations["getContractClassifiers"]["parameters"]["query"];
export type GetContractParameters = operations["getContractParameters"]["parameters"]["query"];
export type GetContractTariffData = operations["getContractTariffData"]["parameters"]["query"];
export type GetContractTransactionDocuments = operations["getContractTransactionDocuments"]["parameters"]["query"];
export type GetContractTreeSummary = operations["getContractTreeSummary"]["parameters"]["query"];
export type GetCvc = NonNullable<operations["getCvc"]["parameters"]["header"]>;
export type GetPin = NonNullable<operations["getPin"]["parameters"]["header"]>;
export type GetPublicRsaKey = operations["getPublicRsaKey"]["parameters"]["query"];
export type GetSubAccountContracts = operations["getSubAccountContracts"]["parameters"]["query"];
export type GetTechnicalAccounts = operations["getTechnicalAccounts"]["parameters"]["query"];
export type GetTransactionDocuments = operations["getTransactionDocuments"]["parameters"]["query"];
export type GetTransactions = operations["getTransactions"]["parameters"]["query"];
export type GetUsageLimits = operations["getUsageLimits"]["parameters"]["query"];
export type HeadersAddClientAddress = AddClientAddress;
export type HeadersAddContractAddress = AddContractAddress;
export type HeadersChargeFee = ChargeFee;
export type HeadersCreateAccountContract = CreateAccountContract;
export type HeadersCreateCardContract = CreateCardContract;
export type HeadersCreateClient = CreateClient;
export type HeadersCreditContract = CreditContract;
export type HeadersDebitContract = DebitContract;
export type HeadersGetAccountContractId = GetAccountContractId;
export type HeadersGetCardContract = GetCardContract;
export type HeadersGetCardContractId = GetCardContractId;
export type HeadersGetClientId = GetClientId;
export type HeadersGetCvc = GetCvc;
export type HeadersGetPin = GetPin;
export type HeadersOpenEvent = OpenEvent;
export type HeadersReissueCard = ReissueCard;
export type HeadersReverseTransaction = ReverseTransaction;
export type HeadersSetClientCustomData = SetClientCustomData;
export type HeadersSetContractCustomData = SetContractCustomData;
export type HeadersSetPin = SetPin;
export type HeadersSetServiceLimitTariff = SetServiceLimitTariff;
export type HeadersUpdateAccountContract = UpdateAccountContract;
export type HeadersUpdateCardContract = UpdateCardContract;
export type HeadersUpdateClient = UpdateClient;
export type HeadersVerifyCardDetails = VerifyCardDetails;
export type HeadersVerifyCvc = VerifyCvc;
export type HeadersVerifyPin = VerifyPin;
export type OnlinePinAttemptsClearance = components["schemas"]["OnlinePinAttemptsClearance"];
export type OnlinePinAttemptsClearanceForClient = components["schemas"]["OnlinePinAttemptsClearanceForClient"];
export type OpenEvent = NonNullable<operations["openEvent"]["parameters"]["header"]>;
export type ParameterModification = components["schemas"]["ParameterModification"];
export type PinCreation = components["schemas"]["PinCreation"];
export type PinSearchCriteria = components["schemas"]["PinSearchCriteria"];
export type PinVerification = components["schemas"]["PinVerification"];
export type PinVerificationResult = components["schemas"]["PinVerificationResult"];
export type PublicRsaKeyData = components["schemas"]["PublicRsaKeyData"];
export type QueryGetAccountContractsByClient = GetAccountContractsByClient;
export type QueryGetAuthenticationParameterValue = GetAuthenticationParameterValue;
export type QueryGetCardContract = GetCardContract;
export type QueryGetCardContractsByAccount = GetCardContractsByAccount;
export type QueryGetCardContractsByClient = GetCardContractsByClient;
export type QueryGetClientClassifiers = GetClientClassifiers;
export type QueryGetContractBalances = GetContractBalances;
export type QueryGetContractClassifiers = GetContractClassifiers;
export type QueryGetContractParameters = GetContractParameters;
export type QueryGetContractTariffData = GetContractTariffData;
export type QueryGetContractTransactionDocuments = GetContractTransactionDocuments;
export type QueryGetContractTreeSummary = GetContractTreeSummary;
export type QueryGetPublicRsaKey = GetPublicRsaKey;
export type QueryGetSubAccountContracts = GetSubAccountContracts;
export type QueryGetTechnicalAccounts = GetTechnicalAccounts;
export type QueryGetTransactionDocuments = GetTransactionDocuments;
export type QueryGetTransactions = GetTransactions;
export type QueryGetUsageLimits = GetUsageLimits;
export type ReissueCard = NonNullable<operations["reissueCard"]["parameters"]["header"]>;
export type ReissuedCardContract = components["schemas"]["ReissuedCardContract"];
export type ResponseAccountContract = AccountContract;
export type ResponseAccountContractCardContracts = AccountContractCardContracts;
export type ResponseAccountContractIdentifier = AccountContractIdentifier;
export type ResponseAccountContractStatus = AccountContractStatus;
export type ResponseAuthenticationParameterValue = AuthenticationParameterValue;
export type ResponseBlockedFundsReleaseResult = BlockedFundsReleaseResult;
export type ResponseCardContractDetailsVerificationResult = CardContractDetailsVerificationResult;
export type ResponseCardContractIdentifier = CardContractIdentifier;
export type ResponseCardContractPlastics = CardContractPlastics;
export type ResponseCardContractStatus = CardContractStatus;
export type ResponseCardContractWithEncryptedCardContractNumber = CardContractWithEncryptedCardContractNumber;
export type ResponseClient = Client;
export type ResponseClientAccountContracts = ClientAccountContracts;
export type ResponseClientAddresses = ClientAddresses;
export type ResponseClientCardContracts = ClientCardContracts;
export type ResponseClientClassifiers = ClientClassifiers;
export type ResponseClientCustomDataTagValues = ClientCustomDataTagValues;
export type ResponseClientIdentifier = ClientIdentifier;
export type ResponseContractAddresses = ContractAddresses;
export type ResponseContractBalances = ContractBalances;
export type ResponseContractClassifiers = ContractClassifiers;
export type ResponseContractCustomDataTagValues = ContractCustomDataTagValues;
export type ResponseContractFinancial = ContractFinancial;
export type ResponseContractParameters = ContractParameters;
export type ResponseContractSummaryTree = ContractSummaryTree;
export type ResponseContractTariffs = ContractTariffs;
export type ResponseCvc = Cvc;
export type ResponseCvcVerificationResult = CvcVerificationResult;
export type ResponseEncryptedPin = EncryptedPin;
export type ResponsePinVerificationResult = PinVerificationResult;
export type ResponsePublicRsaKeyData = PublicRsaKeyData;
export type ResponseReissuedCardContract = ReissuedCardContract;
export type ResponseReverseTransactionId = ReverseTransactionId;
export type ResponseSubAccountContracts = SubAccountContracts;
export type ResponseTechnicalAccounts = TechnicalAccounts;
export type ResponseTransactionDocuments = TransactionDocuments;
export type ResponseTransactionFees = TransactionFees;
export type ResponseTransactionId = TransactionId;
export type ResponseTransactions = Transactions;
export type ResponseUsageLimits = UsageLimits;
export type ReverseTransaction = NonNullable<operations["reverseTransaction"]["parameters"]["header"]>;
export type ReverseTransactionId = components["schemas"]["ReverseTransactionId"];
export type ReverseTransactionReason = components["schemas"]["ReverseTransactionReason"];
export type ServiceLimitTariff = components["schemas"]["ServiceLimitTariff"];
export type SetClientCustomData = NonNullable<operations["setClientCustomData"]["parameters"]["header"]>;
export type SetContractCustomData = NonNullable<operations["setContractCustomData"]["parameters"]["header"]>;
export type SetPin = NonNullable<operations["setPin"]["parameters"]["header"]>;
export type SetServiceLimitTariff = NonNullable<operations["setServiceLimitTariff"]["parameters"]["header"]>;
export type SubAccountContracts = components["schemas"]["SubAccountContracts"];
export type TechnicalAccounts = components["schemas"]["TechnicalAccounts"];
export type TransactionContractCredit = components["schemas"]["TransactionContractCredit"];
export type TransactionContractDebit = components["schemas"]["TransactionContractDebit"];
export type TransactionDocuments = components["schemas"]["TransactionDocuments"];
export type TransactionFees = components["schemas"]["TransactionFees"];
export type TransactionId = components["schemas"]["TransactionId"];
export type Transactions = components["schemas"]["Transactions"];
export type UpdateAccountContract = NonNullable<operations["updateAccountContract"]["parameters"]["header"]>;
export type UpdateCardContract = NonNullable<operations["updateCardContract"]["parameters"]["header"]>;
export type UpdateClient = NonNullable<operations["updateClient"]["parameters"]["header"]>;
export type UsageLimitModification = components["schemas"]["UsageLimitModification"];
export type UsageLimitOriginalValue = components["schemas"]["UsageLimitOriginalValue"];
export type UsageLimitResetting = components["schemas"]["UsageLimitResetting"];
export type UsageLimitStatus = components["schemas"]["UsageLimitStatus"];
export type UsageLimits = components["schemas"]["UsageLimits"];
export type VerifyCardDetails = NonNullable<operations["verifyCardDetails"]["parameters"]["header"]>;
export type VerifyCvc = NonNullable<operations["verifyCvc"]["parameters"]["header"]>;
export type VerifyPin = NonNullable<operations["verifyPin"]["parameters"]["header"]>;

// API Def

import { Api } from "api-def";



const API = new Api({
  name: "Mastercard Processing Core API",
  baseUrl: "https://api.mastercard.com/global-processing/core",
});

export const createClient = API.endpoint()
  .responseOf<ResponseClientIdentifier>()
  .bodyOf<BodyClientCreation>()
  .requestHeadersOf<HeadersCreateClient>()
  .build({
    method: "post",
    path: "/clients",
    id: "createClient",
  });

export const getClient = API.endpoint()
  .paramsOf<"client_id">()
  .responseOf<ResponseClient>()
  .build({
    method: "get",
    path: "/clients/{client_id}",
    id: "getClient",
  });

export const updateClient = API.endpoint()
  .paramsOf<"client_id">()
  .bodyOf<BodyClientModification>()
  .requestHeadersOf<HeadersUpdateClient>()
  .build({
    method: "patch",
    path: "/clients/{client_id}",
    id: "updateClient",
  });

export const getAccountContractsByClient = API.endpoint()
  .paramsOf<"client_id">()
  .responseOf<ResponseClientAccountContracts>()
  .queryOf<QueryGetAccountContractsByClient>()
  .build({
    method: "get",
    path: "/clients/{client_id}/account-contracts",
    id: "getAccountContractsByClient",
  });

export const getCardContractsByClient = API.endpoint()
  .paramsOf<"client_id">()
  .responseOf<ResponseClientCardContracts>()
  .queryOf<QueryGetCardContractsByClient>()
  .build({
    method: "get",
    path: "/clients/{client_id}/card-contracts",
    id: "getCardContractsByClient",
  });

export const openEvent = API.endpoint()
  .paramsOf<"contract_id">()
  .bodyOf<BodyEvent>()
  .requestHeadersOf<HeadersOpenEvent>()
  .build({
    method: "post",
    path: "/contracts/{contract_id}/events",
    id: "openEvent",
  });

export const getContractFinancials = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseContractFinancial>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/financials",
    id: "getContractFinancials",
  });

export const getContractBalances = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseContractBalances>()
  .queryOf<QueryGetContractBalances>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/balances",
    id: "getContractBalances",
  });

export const getTechnicalAccounts = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseTechnicalAccounts>()
  .queryOf<QueryGetTechnicalAccounts>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/technical-accounts",
    id: "getTechnicalAccounts",
  });

export const getContractTreeSummary = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseContractSummaryTree>()
  .queryOf<QueryGetContractTreeSummary>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/tree-summaries",
    id: "getContractTreeSummary",
  });

export const createAccountContract = API.endpoint()
  .responseOf<ResponseAccountContractIdentifier>()
  .bodyOf<BodyAccountContractCreation>()
  .requestHeadersOf<HeadersCreateAccountContract>()
  .build({
    method: "post",
    path: "/accounts",
    id: "createAccountContract",
  });

export const getAccountContract = API.endpoint()
  .paramsOf<"account_contract_id">()
  .responseOf<ResponseAccountContract>()
  .build({
    method: "get",
    path: "/accounts/{account_contract_id}",
    id: "getAccountContract",
  });

export const updateAccountContract = API.endpoint()
  .paramsOf<"account_contract_id">()
  .bodyOf<BodyAccountContractModification>()
  .requestHeadersOf<HeadersUpdateAccountContract>()
  .build({
    method: "patch",
    path: "/accounts/{account_contract_id}",
    id: "updateAccountContract",
  });

export const changeAccountContractStatus = API.endpoint()
  .paramsOf<"account_contract_id">()
  .bodyOf<BodyAccountContractStatusWithReason>()
  .build({
    method: "put",
    path: "/accounts/{account_contract_id}/status",
    id: "changeAccountContractStatus",
  });

export const getAccountContractStatus = API.endpoint()
  .paramsOf<"account_contract_id">()
  .responseOf<ResponseAccountContractStatus>()
  .build({
    method: "get",
    path: "/accounts/{account_contract_id}/statuses",
    id: "getAccountContractStatus",
  });

export const changeAccountContractClient = API.endpoint()
  .paramsOf<"account_contract_id">()
  .bodyOf<BodyClientIdentifierWithRelinkType>()
  .build({
    method: "put",
    path: "/accounts/{account_contract_id}/client-identifier",
    id: "changeAccountContractClient",
  });

export const changeContractMainContract = API.endpoint()
  .paramsOf<"contract_id">()
  .bodyOf<BodyAccountContractIdentifierWithClientIdentifier>()
  .build({
    method: "put",
    path: "/contracts/{contract_id}/main-contract",
    id: "changeContractMainContract",
  });

export const getSubAccountContracts = API.endpoint()
  .paramsOf<"account_contract_id">()
  .responseOf<ResponseSubAccountContracts>()
  .queryOf<QueryGetSubAccountContracts>()
  .build({
    method: "get",
    path: "/accounts/{account_contract_id}/sub-accounts",
    id: "getSubAccountContracts",
  });

export const getCardContractsByAccount = API.endpoint()
  .paramsOf<"account_contract_id">()
  .responseOf<ResponseAccountContractCardContracts>()
  .queryOf<QueryGetCardContractsByAccount>()
  .build({
    method: "get",
    path: "/accounts/{account_contract_id}/card-contracts",
    id: "getCardContractsByAccount",
  });

export const createCardContract = API.endpoint()
  .responseOf<ResponseCardContractIdentifier>()
  .bodyOf<BodyCardContractCreation>()
  .requestHeadersOf<HeadersCreateCardContract>()
  .build({
    method: "post",
    path: "/cards",
    id: "createCardContract",
  });

export const getCardContract = API.endpoint()
  .paramsOf<"card_contract_id">()
  .responseOf<ResponseCardContractWithEncryptedCardContractNumber>()
  .queryOf<QueryGetCardContract>()
  .requestHeadersOf<HeadersGetCardContract>()
  .build({
    method: "get",
    path: "/cards/{card_contract_id}",
    id: "getCardContract",
  });

export const updateCardContract = API.endpoint()
  .paramsOf<"card_contract_id">()
  .bodyOf<BodyCardContractModification>()
  .requestHeadersOf<HeadersUpdateCardContract>()
  .build({
    method: "patch",
    path: "/cards/{card_contract_id}",
    id: "updateCardContract",
  });

export const verifyCardDetails = API.endpoint()
  .responseOf<ResponseCardContractDetailsVerificationResult>()
  .bodyOf<BodyCardContractDetailsVerification>()
  .requestHeadersOf<HeadersVerifyCardDetails>()
  .build({
    method: "post",
    path: "/cards/details-verifications",
    id: "verifyCardDetails",
  });

export const changeCardContractStatus = API.endpoint()
  .paramsOf<"card_contract_id">()
  .bodyOf<BodyCardContractStatusWithReason>()
  .build({
    method: "put",
    path: "/cards/{card_contract_id}/status",
    id: "changeCardContractStatus",
  });

export const getCardContractStatus = API.endpoint()
  .paramsOf<"card_contract_id">()
  .responseOf<ResponseCardContractStatus>()
  .build({
    method: "get",
    path: "/cards/{card_contract_id}/statuses",
    id: "getCardContractStatus",
  });

export const changeCardContractClient = API.endpoint()
  .paramsOf<"card_contract_id">()
  .bodyOf<BodyClientIdentifier>()
  .build({
    method: "put",
    path: "/cards/{card_contract_id}/client-identifier",
    id: "changeCardContractClient",
  });

export const changeCardContractMainContract = API.endpoint()
  .paramsOf<"card_contract_id">()
  .bodyOf<BodyAccountContractIdentifier>()
  .build({
    method: "put",
    path: "/cards/{card_contract_id}/main-contract",
    id: "changeCardContractMainContract",
  });

export const clearOnlinePinAttempts = API.endpoint()
  .paramsOf<"card_contract_id">()
  .bodyOf<BodyOnlinePinAttemptsClearance>()
  .build({
    method: "put",
    path: "/cards/{card_contract_id}/online-pin-attempts-counter",
    id: "clearOnlinePinAttempts",
  });

export const clearOnlinePinAttemptsForClient = API.endpoint()
  .paramsOf<"client_id">()
  .bodyOf<BodyOnlinePinAttemptsClearanceForClient>()
  .build({
    method: "put",
    path: "/clients/{client_id}/online-pin-attempts-counter",
    id: "clearOnlinePinAttemptsForClient",
  });

export const activateCard = API.endpoint()
  .paramsOf<"card_contract_id">()
  .bodyOf<BodyCardContractActivation>()
  .build({
    method: "put",
    path: "/cards/{card_contract_id}/active",
    id: "activateCard",
  });

export const setPin = API.endpoint()
  .paramsOf<"card_contract_id">()
  .bodyOf<BodyPinCreation>()
  .requestHeadersOf<HeadersSetPin>()
  .build({
    method: "put",
    path: "/cards/{card_contract_id}/pin",
    id: "setPin",
  });

export const getPin = API.endpoint()
  .paramsOf<"card_contract_id">()
  .responseOf<ResponseEncryptedPin>()
  .bodyOf<BodyPinSearchCriteria>()
  .requestHeadersOf<HeadersGetPin>()
  .build({
    method: "post",
    path: "/cards/{card_contract_id}/pins/searches",
    id: "getPin",
  });

export const verifyPin = API.endpoint()
  .paramsOf<"card_contract_id">()
  .responseOf<ResponsePinVerificationResult>()
  .bodyOf<BodyPinVerification>()
  .requestHeadersOf<HeadersVerifyPin>()
  .build({
    method: "post",
    path: "/cards/{card_contract_id}/pins/verifications",
    id: "verifyPin",
  });

export const getCvc = API.endpoint()
  .paramsOf<"card_contract_id">()
  .responseOf<ResponseCvc>()
  .bodyOf<BodyCvcSearchCriteria>()
  .requestHeadersOf<HeadersGetCvc>()
  .build({
    method: "post",
    path: "/cards/{card_contract_id}/card-verification-codes/searches",
    id: "getCvc",
  });

export const verifyCvc = API.endpoint()
  .paramsOf<"card_contract_id">()
  .responseOf<ResponseCvcVerificationResult>()
  .bodyOf<BodyCvcVerification>()
  .requestHeadersOf<HeadersVerifyCvc>()
  .build({
    method: "post",
    path: "/cards/{card_contract_id}/card-verification-codes/verifications",
    id: "verifyCvc",
  });

export const reissueCard = API.endpoint()
  .paramsOf<"card_contract_id">()
  .responseOf<ResponseReissuedCardContract>()
  .bodyOf<BodyCardContractReissue>()
  .requestHeadersOf<HeadersReissueCard>()
  .build({
    method: "post",
    path: "/cards/{card_contract_id}/plastics",
    id: "reissueCard",
  });

export const getCardPlastics = API.endpoint()
  .paramsOf<"card_contract_id">()
  .responseOf<ResponseCardContractPlastics>()
  .build({
    method: "get",
    path: "/cards/{card_contract_id}/plastics",
    id: "getCardPlastics",
  });

export const addClientAddress = API.endpoint()
  .paramsOf<"client_id">()
  .bodyOf<BodyAddressCreation>()
  .requestHeadersOf<HeadersAddClientAddress>()
  .build({
    method: "post",
    path: "/clients/{client_id}/addresses",
    id: "addClientAddress",
  });

export const getClientAddresses = API.endpoint()
  .paramsOf<"client_id">()
  .responseOf<ResponseClientAddresses>()
  .build({
    method: "get",
    path: "/clients/{client_id}/addresses",
    id: "getClientAddresses",
  });

export const updateClientAddress = API.endpoint()
  .paramsOf<"client_id" | "address_type">()
  .bodyOf<BodyAddressModification>()
  .build({
    method: "put",
    path: "/clients/{client_id}/addresses/{address_type}",
    id: "updateClientAddress",
  });

export const addContractAddress = API.endpoint()
  .paramsOf<"contract_id">()
  .bodyOf<BodyAddressCreation>()
  .requestHeadersOf<HeadersAddContractAddress>()
  .build({
    method: "post",
    path: "/contracts/{contract_id}/addresses",
    id: "addContractAddress",
  });

export const getContractAddresses = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseContractAddresses>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/addresses",
    id: "getContractAddresses",
  });

export const updateContractAddress = API.endpoint()
  .paramsOf<"contract_id" | "address_type">()
  .bodyOf<BodyAddressModification>()
  .build({
    method: "put",
    path: "/contracts/{contract_id}/addresses/{address_type}",
    id: "updateContractAddress",
  });

export const setClientClassifier = API.endpoint()
  .paramsOf<"client_id" | "classifier_code">()
  .bodyOf<BodyClassifierCreation>()
  .build({
    method: "put",
    path: "/clients/{client_id}/classifiers/{classifier_code}",
    id: "setClientClassifier",
  });

export const getClientClassifiers = API.endpoint()
  .paramsOf<"client_id">()
  .responseOf<ResponseClientClassifiers>()
  .queryOf<QueryGetClientClassifiers>()
  .build({
    method: "get",
    path: "/clients/{client_id}/classifiers",
    id: "getClientClassifiers",
  });

export const setContractClassifier = API.endpoint()
  .paramsOf<"contract_id" | "classifier_code">()
  .bodyOf<BodyClassifierCreation>()
  .build({
    method: "put",
    path: "/contracts/{contract_id}/classifiers/{classifier_code}",
    id: "setContractClassifier",
  });

export const getContractClassifiers = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseContractClassifiers>()
  .queryOf<QueryGetContractClassifiers>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/classifiers",
    id: "getContractClassifiers",
  });

export const setClientCustomData = API.endpoint()
  .paramsOf<"client_id">()
  .bodyOf<BodyCustomDataTags>()
  .requestHeadersOf<HeadersSetClientCustomData>()
  .build({
    method: "post",
    path: "/clients/{client_id}/custom-data",
    id: "setClientCustomData",
  });

export const getClientCustomData = API.endpoint()
  .paramsOf<"client_id" | "tag_name">()
  .responseOf<ResponseClientCustomDataTagValues>()
  .build({
    method: "get",
    path: "/clients/{client_id}/custom-data/{tag_name}",
    id: "getClientCustomData",
  });

export const setContractCustomData = API.endpoint()
  .paramsOf<"contract_id">()
  .bodyOf<BodyCustomDataTags>()
  .requestHeadersOf<HeadersSetContractCustomData>()
  .build({
    method: "post",
    path: "/contracts/{contract_id}/custom-data",
    id: "setContractCustomData",
  });

export const getContractCustomData = API.endpoint()
  .paramsOf<"contract_id" | "tag_name">()
  .responseOf<ResponseContractCustomDataTagValues>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/custom-data/{tag_name}",
    id: "getContractCustomData",
  });

export const setContractParameter = API.endpoint()
  .paramsOf<"contract_id" | "parameter_code">()
  .bodyOf<BodyParameterModification>()
  .build({
    method: "put",
    path: "/contracts/{contract_id}/parameters/{parameter_code}",
    id: "setContractParameter",
  });

export const getContractParameters = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseContractParameters>()
  .queryOf<QueryGetContractParameters>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/parameters",
    id: "getContractParameters",
  });

export const debitContract = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseTransactionId>()
  .bodyOf<BodyTransactionContractDebit>()
  .requestHeadersOf<HeadersDebitContract>()
  .build({
    method: "post",
    path: "/contracts/{contract_id}/debits",
    id: "debitContract",
  });

export const creditContract = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseTransactionId>()
  .bodyOf<BodyTransactionContractCredit>()
  .requestHeadersOf<HeadersCreditContract>()
  .build({
    method: "post",
    path: "/contracts/{contract_id}/credits",
    id: "creditContract",
  });

export const chargeFee = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseTransactionId>()
  .bodyOf<BodyChargeFee>()
  .requestHeadersOf<HeadersChargeFee>()
  .build({
    method: "post",
    path: "/contracts/{contract_id}/charge-fees",
    id: "chargeFee",
  });

export const getTransactions = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseTransactions>()
  .queryOf<QueryGetTransactions>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/transactions",
    id: "getTransactions",
  });

export const getContractTransactionDocuments = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseTransactionDocuments>()
  .queryOf<QueryGetContractTransactionDocuments>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/transaction-documents",
    id: "getContractTransactionDocuments",
  });

export const getTransactionDocuments = API.endpoint()
  .responseOf<ResponseTransactionDocuments>()
  .queryOf<QueryGetTransactionDocuments>()
  .build({
    method: "get",
    path: "/transaction-documents",
    id: "getTransactionDocuments",
  });

export const getTransactionFees = API.endpoint()
  .paramsOf<"transaction_id">()
  .responseOf<ResponseTransactionFees>()
  .build({
    method: "get",
    path: "/transactions/{transaction_id}/fees",
    id: "getTransactionFees",
  });

export const setUsageLimit = API.endpoint()
  .paramsOf<"contract_id" | "usage_limit_code">()
  .bodyOf<BodyUsageLimitModification>()
  .build({
    method: "put",
    path: "/contracts/{contract_id}/usage-limits/{usage_limit_code}",
    id: "setUsageLimit",
  });

export const getUsageLimits = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseUsageLimits>()
  .queryOf<QueryGetUsageLimits>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/usage-limits",
    id: "getUsageLimits",
  });

export const restoreUsageLimitOriginalValues = API.endpoint()
  .paramsOf<"contract_id" | "usage_limit_code">()
  .bodyOf<BodyUsageLimitOriginalValue>()
  .build({
    method: "put",
    path: "/contracts/{contract_id}/usage-limits/{usage_limit_code}/original-values",
    id: "restoreUsageLimitOriginalValues",
  });

export const resetUsageLimitCounters = API.endpoint()
  .paramsOf<"contract_id" | "usage_limit_code">()
  .bodyOf<BodyUsageLimitResetting>()
  .build({
    method: "put",
    path: "/contracts/{contract_id}/usage-limits/{usage_limit_code}/resetting-counters",
    id: "resetUsageLimitCounters",
  });

export const changeUsageLimitStatus = API.endpoint()
  .paramsOf<"contract_id" | "usage_limit_code">()
  .bodyOf<BodyUsageLimitStatus>()
  .build({
    method: "put",
    path: "/contracts/{contract_id}/usage-limits/{usage_limit_code}/status",
    id: "changeUsageLimitStatus",
  });

export const setServiceLimitTariff = API.endpoint()
  .paramsOf<"contract_id">()
  .bodyOf<BodyServiceLimitTariff>()
  .requestHeadersOf<HeadersSetServiceLimitTariff>()
  .build({
    method: "post",
    path: "/contracts/{contract_id}/service-limit-tariffs",
    id: "setServiceLimitTariff",
  });

export const getContractTariffData = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseContractTariffs>()
  .queryOf<QueryGetContractTariffData>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/tariff-data",
    id: "getContractTariffData",
  });

export const getClientId = API.endpoint()
  .responseOf<ResponseClientIdentifier>()
  .bodyOf<BodyClientIdentifierSearch>()
  .requestHeadersOf<HeadersGetClientId>()
  .build({
    method: "post",
    path: "/clients/searches",
    id: "getClientId",
  });

export const getAccountContractId = API.endpoint()
  .responseOf<ResponseAccountContractIdentifier>()
  .bodyOf<BodyAccountContractIdentifierSearch>()
  .requestHeadersOf<HeadersGetAccountContractId>()
  .build({
    method: "post",
    path: "/accounts/searches",
    id: "getAccountContractId",
  });

export const getCardContractId = API.endpoint()
  .responseOf<ResponseCardContractIdentifier>()
  .bodyOf<BodyCardContractIdentifierSearch>()
  .requestHeadersOf<HeadersGetCardContractId>()
  .build({
    method: "post",
    path: "/cards/searches",
    id: "getCardContractId",
  });

export const getPublicRsaKey = API.endpoint()
  .responseOf<ResponsePublicRsaKeyData>()
  .queryOf<QueryGetPublicRsaKey>()
  .build({
    method: "get",
    path: "/public-keys",
    id: "getPublicRsaKey",
  });

export const setAuthenticationMethod = API.endpoint()
  .paramsOf<"contract_id">()
  .bodyOf<BodyAuthenticationMethod>()
  .build({
    method: "put",
    path: "/contracts/{contract_id}/authentication-method",
    id: "setAuthenticationMethod",
  });

export const releaseBlockedFunds = API.endpoint()
  .paramsOf<"contract_id" | "transaction_id">()
  .responseOf<ResponseBlockedFundsReleaseResult>()
  .bodyOf<BodyBlockedFundsRelease>()
  .build({
    method: "put",
    path: "/contracts/{contract_id}/transactions/{transaction_id}/releasing-blocked-funds",
    id: "releaseBlockedFunds",
  });

export const reverseTransaction = API.endpoint()
  .paramsOf<"transaction_id">()
  .responseOf<ResponseReverseTransactionId>()
  .bodyOf<BodyReverseTransactionReason>()
  .requestHeadersOf<HeadersReverseTransaction>()
  .build({
    method: "post",
    path: "/transactions/{transaction_id}/reversal",
    id: "reverseTransaction",
  });

export const getAuthenticationParameterValue = API.endpoint()
  .paramsOf<"contract_id">()
  .responseOf<ResponseAuthenticationParameterValue>()
  .queryOf<QueryGetAuthenticationParameterValue>()
  .build({
    method: "get",
    path: "/contracts/{contract_id}/authentication-parameter-values",
    id: "getAuthenticationParameterValue",
  });

export default API;