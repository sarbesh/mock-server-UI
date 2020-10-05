import {Response} from './response';

export const RESPONSES: Response[] = [{
    "mockId": "testMockResponseId",
    "statusCode": 200,
    "delay": 2,
    "contentType": "application/json",
    "encoding": "UTF-8",
    "body": {
      "message": "json body",
      "text": "this is test, \n what a wonder full day"
    },
    "headers": [
      {
        "name": "header1",
        "value": "value1"
      },
      {
        "name": "header3",
        "value": "value3"
      },
      {
        "name": "header2",
        "value": "value2"
      }
    ]
  },
  {
    "mockId": "MockResponseId",
    "statusCode": 200,
    "contentType": "application/json",
    "encoding": "UTF-8",
    "body": {
      "data": "Hello World!"
    },
    "headers": [
      {
        "name": "header1",
        "value": "value1"
      }
    ],
    "delay": 0
  }
];