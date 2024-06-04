import { FreshContext, Handlers, PageProps, RouteContext } from "$fresh/server.ts";
import { Header } from "../../components/Header.tsx";
import { Details } from "../../components/Details.tsx";
import { Post } from "../../components/Post.tsx";
import { PostData } from "../../components/Post.tsx";

interface DetailsData {
    label: string;
    visitorCount: number;
    dateAdded: Date;
    latitude: number;
    longitude: number;
}

const MONGO_API_KEY: string = Deno.env.get("MONGO_API_KEY") || "";

export const handler: Handlers<{ details: DetailsData, posts: PostData[] }> = {
    async GET(req, ctx) {
        const detailsQuery = {
            collection:"places",
            database:"travelers",
            dataSource:"wondering-traveler",
            projection: {
                _id: 0,
                label: 1,
                visitorCount: 1,
                dateAdded: 1,
                latitude: 1,
                longitude: 1
            },
            filter: {
                shortID: ctx.params.id.toLowerCase()
            }
        }

        const postsQuery = {
            collection: "posts",
            database: "travelers",
            dataSource: "wondering-traveler",
            projection: {
                _id: 0,
                username: 1,
                caption: 1,
                image: 1
            },
            filter: {
                placeID: ctx.params.id.toLowerCase()
            }
        }

        const data: { details: DetailsData, posts: PostData[] } = await Promise.all([
            fetch("https://us-east-1.aws.data.mongodb-api.com/app/data-xqjcxmf/endpoint/data/v1/action/findOne", {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Request-Headers": "*",
                    "api-key": MONGO_API_KEY
                },
                body: JSON.stringify(detailsQuery)
            }).then(res => res.json()),
            fetch("https://us-east-1.aws.data.mongodb-api.com/app/data-xqjcxmf/endpoint/data/v1/action/find", {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Request-Headers": "*",
                    "api-key": MONGO_API_KEY
                },
                body: JSON.stringify(postsQuery)
            }).then(res => res.json())
        ]).then(data => {
            return {
                details: data[0].document,
                posts: data[1].documents
            }
        })

        return ctx.render(data);
    }
}

export default function Place({ data: { details, posts} }: PageProps) {
    return (
        <div>
            <Header />
            <main>
                <img src={`/api/map?lat=${details.latitude}&long=${details.longitude}`} />
                <Details label={details.label} visitorCount={details.visitorCount} dateAdded={new Date(details.dateAdded)} />
                <div>
                    { posts.map((post: PostData) => (
                        <Post {...post} />
                    )) }
                </div>
            </main>
        </div>
    )
}