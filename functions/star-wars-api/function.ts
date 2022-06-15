
export default async ({ parameters, api }: IFunctionExecutionArguments) => {

    /**
     * The parameters-object contains the parameters with which
     * this instances of your Function was started. The
     * data can be accessed and used for data-exchange with e.g.
     * your calling Flow.
     */
    const { path, index } = parameters;
    const { sessionId, urlToken, userId } = parameters;

    try {
        /**
         * The API can be used in your Function code
         * in order to perform actions with third-party systems as well
         * as the current system via its RESTful API.
         */
        const response = await api.httpRequest({
            method: "get",
            url: `https://swapi.dev/api/${path}/${index}/`,
            headers: {
                "Accept": "application/json"
            }
        });

        /**
         * Cleanup the result
         */
        delete response.data?.created;
        delete response.data?.edited;

        /**
         * Inject the API result into the current ongoing chat conversation
         */
        api.inject({
            sessionId,
            URLToken: urlToken,
            userId,
            text: "",
            data: response.data
        });

    } catch (error) {
        // Do something with the error message
        // api.inject({});
    }
}