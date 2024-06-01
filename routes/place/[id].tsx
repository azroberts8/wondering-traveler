import { FreshContext, Handlers, PageProps, RouteContext } from "$fresh/server.ts";
import { Header } from "../../components/Header.tsx";
import { Details } from "../../components/Details.tsx";

interface Details {
    label: string;
    visitorCount: number;
    dateAdded: Date;
    latitude: number;
    longitude: number;
}

const MONGO_API_KEY: string = Deno.env.get("MONGO_API_KEY") || "";

export const handler: Handlers<Details> = {
    async GET(req, ctx) {
        const query = {
            "collection":"places",
            "database":"travelers",
            "dataSource":"wondering-traveler",
            "filter": {
                "_id": { "$oid": ctx.params.id }
            }
        }
        const details: Details = await fetch("https://us-east-1.aws.data.mongodb-api.com/app/data-xqjcxmf/endpoint/data/v1/action/findOne", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "api-key": MONGO_API_KEY
            },
            body: JSON.stringify(query)
        })
            .then(res => res.json());
        return ctx.render(details);
    }
}

export default function Place({ params, data }: PageProps) {
    return (
        <div>
            <Header />
            <main>
                <img src={`/api/map?lat=${data.document.latitude}&long=${data.document.longitude}`} />
                <Details label={data.document.label} visitorCount={data.document.visitorCount} dateAdded={new Date(data.document.dateAdded)} />
            </main>
        </div>
    )
}