import { Header } from './header';

export class Response {
    mockId: string;
    statusCode: number;
    contentType: string;
    encoding: string;
    body: object;
    headers: Header[];
    delay: number

}
