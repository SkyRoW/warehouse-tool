import { Injectable } from "@nestjs/common";

@Injectable()
export class FlexiBeeHttpService {
    private baseUrl: string;
    private basicAuth: string;

    constructor() {
        const server = process.env['FLEXIBEE_SERVER'];
        const company = process.env['FLEXIBEE_COMPANY'];
        const username = process.env['FLEXIBEE_USERNAME'];
        const password = process.env['FLEXIBEE_PASSWORD'];

        this.baseUrl =  `https://${server}/c/${company}/`;
        const base64auth = Buffer.from(`${username}:${password}`).toString('base64');
        this.basicAuth = `Basic ${base64auth}`
    }

    async get<T>(url: string, headers?: Record<string, string>) {
        return this.request<T>(this.baseUrl+url, {
            method: 'GET',
            headers,
    })
    }

    private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
        try {
            const response = await fetch(url, { 
                ...options,
                headers: {
                    "Accept": "application/json",
                    "Authorization": this.basicAuth ?? "",
                    ...(options?.headers),
                  }
             });
            if (!response.ok) {
                throw new Error(`Http error: ${response.status} ${response.statusText}`);
            }
            const json = await response.json();
            return json.winstrom as Promise<T>;
        } catch (error) {
            console.error(`Error in htpp request to ${url}:`, error);
            throw new Error("Failed to fetch data");
        }
    }
}