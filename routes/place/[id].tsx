import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Header } from "../../components/Header.tsx";
import { Details } from "../../components/Details.tsx";

interface Details {
    label: string;
    visitorCount: number;
    dateAdded: Date;
    latitude: number;
    longitude: number;
}

export default function Place(props: PageProps) {
    return (
        <div>
            <Header />
            <main>
                <img src={`/api/map?lat=39.6825&long=-75.7526`} />
                <Details label="Smokey Mountains Overlook" visitorCount={5} dateAdded={new Date} />
            </main>
        </div>
    )
}