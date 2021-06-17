interface ISalesforceHeaders {
    "X-LIVEAGENT-SESSION-KEY": string;
    "X-LIVEAGENT-AFFINITY": string;
    "X-LIVEAGENT-API-VERSION": '34' | number;
}

interface ICognigyArguments {
    userId: string;
    sessionId: string;
    urlToken: string;
    api: IFunctionExecutionArguments["api"];
}

interface ISalesforceServiceCloudAgentMessagesArguments extends IFunctionExecutionArguments {
    liveAgentUrl: string;
    headers: ISalesforceHeaders
}

interface IGetMessagePromise {
    agentAnswered: boolean;
    message: any;
}

export default async ({ parameters, api }: ISalesforceServiceCloudAgentMessagesArguments) => {

    const { sessionId, urlToken, userId } = parameters;
    const { liveAgentUrl, headers } = parameters;

    // Start polling for Salesforce Live Chat Agent messages
    const response = await getMessage(liveAgentUrl, headers, { sessionId, urlToken, userId, api }, 0);

    api.inject({
        data: response
    });

}

const getMessage = async (liveAgentUrl: string, headers: ISalesforceHeaders, { userId, urlToken, sessionId, api }: ICognigyArguments, counter: number): Promise<IGetMessagePromise> => {

    try {

        console.info(`[Salesforce Live Chat] Try to get agent messages in session: ${sessionId}`);

        // Ask the Salesforce service for new agent messages
        const messagesResponse = await api.httpRequest({
            method: 'get',
            url: `${liveAgentUrl}/System/Messages`,
            headers
        });

        // Send the latest chat message to Cognigy
        if (messagesResponse.data?.messages) {
            return {
                agentAnswered: true,
                message: messagesResponse.data.messages[0]
            }
        }

        // Wait three seconds until the Salesforce service will be polled again
        await new Promise(resolve => setTimeout(resolve, 4000));

        // Poll again until the maximum number of HTTP Requests is sent
        counter++;
        if (counter < 3) {
            await getMessage(liveAgentUrl, headers, { userId, urlToken, sessionId, api }, counter);
        }

        // If no message was sent in 5x3 seconds, send this information to the Flow
        return {
            agentAnswered: false,
            message: null
        }
    } catch (error) {
        return {
            agentAnswered: false,
            message: null
        }
    }
}
