import { IElement } from '../firstTest.test'
import {RequestHandler, ResponseComposition, RestContext, RestRequest, rest} from 'msw'

export const handlers:Array<RequestHandler> = [

    rest.get<never,never,{data: Array<IElement>}>('https://datausa.io/api/data', 
        (request:RestRequest<never, never>,response:ResponseComposition<{data: Array<IElement>;}>,context:RestContext) => {
            // Mocked http body content
            const bodyContent:{data: Array<IElement>} = { data: [
                {"ID Nation": '1', "ID Year": 2024, 'Population': 2},
                {"ID Nation": '1', "ID Year": 2023, 'Population': 1},
            ]};
        return response(context.status(200),context.json(bodyContent))
    })
]

export const error500Handlers:Array<RequestHandler> = [
    rest.get<never,never,{data: Array<IElement>}>('https://datausa.io/api/data', 
        (request:RestRequest<never, never>,response:ResponseComposition<{data: Array<IElement>;}>,context:RestContext) => {
        return response(context.status(500))
    })
]
