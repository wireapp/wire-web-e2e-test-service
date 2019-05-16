# E2E Test Service
End-to-end Test Service (ETS) for Wire's test automation suite.

## Version: 1.16.1

### Terms of service
https://wire.com/legal/

**Contact information:**
opensource@wire.com

**License:** [GPL-3.0](https://github.com/wireapp/wire-web-ets/blob/master/LICENSE)

### /clients

#### DELETE
##### Summary:

Delete all clients

##### Description:

**Notes**:

You can either set `backend` or `customBackend`. If you set neither, the "staging" backend will be used. If you set both, `backend` takes the precedence.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Login data | Yes | [BasicLogin](#basiclogin) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | object |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance

#### PUT
##### Summary:

Create a new instance

##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Login data | Yes | [Login](#login) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}

#### DELETE
##### Summary:

Delete an instance

##### Description:



##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | object |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

#### GET
##### Summary:

Get information about an instance

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Instance](#instance) |
| 404 | Not found | [NotFoundError](#notfounderror) |

### /instance/{instanceId}/archive

#### POST
##### Summary:

Archive a conversation

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/availability

#### POST
##### Summary:

Set a user's availability

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body | Type can be 0 (`NONE`), 1 (`AVAILABLE`), 2 (`AWAY`), 3 (`BUSY`). | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/clear

#### POST
##### Summary:

Clear a conversation

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/clients

#### GET
##### Summary:

Get all clients of an instance

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [ [Client](#client) ] |
| 404 | Not found | [NotFoundError](#notfounderror) |

### /instance/{instanceId}/delete

#### POST
##### Summary:

Delete a message locally

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/deleteEverywhere

#### POST
##### Summary:

Delete a message for everyone

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/fingerprint

#### GET
##### Summary:

Get the fingerprint from the instance's client

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | object |
| 404 | Not found | [NotFoundError](#notfounderror) |

### /instance/{instanceId}/getMessages

#### POST
##### Summary:

Get all messages

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [ [Message](#message) ] |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/mute

#### POST
##### Summary:

Mute a conversation

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendConfirmationDelivered

#### POST
##### Summary:

Send a delivery confirmation for a message

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendConfirmationRead

#### POST
##### Summary:

Send a read confirmation for a message

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendEphemeralConfirmationDelivered

#### POST
##### Summary:

Send a delivery confirmation for an ephemeral message

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendEphemeralConfirmationRead

#### POST
##### Summary:

Send a read confirmation for an ephemeral message

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendFile

#### POST
##### Summary:

Send a file to a conversation

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  |  |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendImage

#### POST
##### Summary:

Send an image to a conversation

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  |  |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendLocation

#### POST
##### Summary:

Send a location to a conversation

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  |  |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendPing

#### POST
##### Summary:

Send a ping to a conversation

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  |  |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendReaction

#### POST
##### Summary:

Send a reaction to a message

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  |  |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendSessionReset

#### POST
##### Summary:

Send a session reset message

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  |  |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendText

#### POST
##### Summary:

Send a text message to a conversation

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | [TextMessage](#textmessage) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  |  |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/sendTyping

#### POST
##### Summary:

Send a typing indicator to a conversation

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes |  |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [InstanceAndName](#instanceandname) |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instance/{instanceId}/updateText

#### POST
##### Summary:

Update a text message in a conversation

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| instanceId | path | ID of instance to return | Yes | string (uuid) |
| body | body |  | Yes | [TextMessage](#textmessage) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  |  |
| 404 | Not found | [NotFoundError](#notfounderror) |
| 422 | Validation error | [ValidationError](#validationerror) |

### /instances

#### GET
##### Summary:

Get all instances

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 |  | [Instance](#instance) |
| 404 | Not found | [NotFoundError](#notfounderror) |

### Models


#### BackendData

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | Yes |
| rest | string |  | Yes |
| ws | string |  | Yes |

#### BasicLogin

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| backend | string |  | No |
| customBackend | [BackendData](#backenddata) |  | No |
| email | string (email) |  | Yes |
| password | password |  | Yes |

#### Client

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| class | string |  | No |
| cookie | string |  | No |
| id | string (uuid) |  | No |
| location | object |  | No |
| model | string |  | No |
| time | dateTime |  | No |
| type | string |  | No |

#### Confirmation

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| firstMessageId | string (uuid) |  | Yes |
| moreMessageIds | [ string (uuid) ] |  | No |
| type | integer |  | Yes |

#### Instance

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Instance |  |  |  |

#### InstanceAndName

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| instanceId | string (uuid) |  | No |
| name | string |  | No |

#### LinkPreview

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| image | object |  | No |
| permanentUrl | string |  | No |
| summary | string |  | No |
| title | string |  | No |
| tweet | object |  | No |
| url | string (url) |  | No |
| urlOffset | string (number) |  | No |

#### Login

**Notes**:

You can either set `backend` or `customBackend`. If you set neither, the "staging" backend will be used. If you set both, `backend` takes the precedence.

`deviceClass` can be set to any string if `backend` is unset and `customBackend` is set.

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Login |  | **Notes**: You can either set `backend` or `customBackend`. If you set neither, the "staging" backend will be used. If you set both, `backend` takes the precedence. `deviceClass` can be set to any string if `backend` is unset and `customBackend` is set. |  |

#### Mention

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| length | string (number) |  | No |
| start | string (number) |  | No |
| userId | string (uuid) |  | No |

#### Message

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| content | object |  | No |
| confirmations | [  ] |  | No |
| conversation | string (uuid) |  | Yes |
| expectsReadConfirmation | boolean |  | No |
| from | string (uuid) |  | Yes |
| id | string (uuid) |  | Yes |
| messageTimer | string (number) |  | Yes |
| state | string |  | Yes |
| timestamp | string |  | Yes |
| type | undefined (string) |  | Yes |

#### NotFoundError

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| error | string |  | No |
| stack | string |  | No |

#### TextMessage

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| conversationId | string (uuid) |  | No |
| expectsReadConfirmation | boolean |  | No |
| linkPreview | [LinkPreview](#linkpreview) |  | No |
| mentions | [ [Mention](#mention) ] |  | No |
| messageTimer | string (number) |  | No |
| quote | object |  | No |
| text | string |  | No |

#### ValidationError

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| error | string |  | No |
