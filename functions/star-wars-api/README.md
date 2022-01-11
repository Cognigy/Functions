# The Star Wars API

This function provides an exmaple of how one could call an API using an HTTP request. In this case, the [Star Wars API]() is used in order to retrieve various information:

- People
- Planets
- Vehicles
- ...

## Example Execution

Within a Flow, the [Trigger Function](https://docs.cognigy.com/docs/cognigy-functions-1#triggering-a-function) Node can be used.

<img src="./docs/exampleFlow.png" width="400" />

Inside **Parameters** JSON field, additional information can be provided:

```json
{
    "path": "people",
    "index": "1"
}
```

Last but not least, one can add a Say Node in the **On Scheduled** path. This will be executed, as soon as the Function returned a result (injected). Therefore, the result will be stored in `{{input.data}}`.