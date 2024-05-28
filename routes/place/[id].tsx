import { PageProps } from "$fresh/server.ts";
import { Header } from "../../components/Header.tsx";
import { Details } from "../../components/Details.tsx";

export default function Place(props: PageProps) {
    return (
        <div>
            <Header />
            <main>
                <Details label="Smokey Mountains Overlook" visitorCount={5} dateAdded={new Date} />
            </main>
        </div>
    )
}