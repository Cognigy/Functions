export default async ({ parameters, api }: IFunctionExecutionArguments) => {

    const { milliseconds } = parameters;

    await new Promise(resolve => setTimeout(resolve, milliseconds));

    api.inject({
        data: {
            timeout: true
        }   
    });
}