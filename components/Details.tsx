import { Attribute } from "./Attribute.tsx";

export interface DetailsInterface {
    label: string;
    visitorCount: number;
    dateAdded: Date;
}

export function Details({ label, visitorCount, dateAdded }: DetailsInterface) {
    return (
        <div>
            <div class="">
                <div class="material-symbols-outlined text-orange-100 bg-lime-950 rounded-full p-3 text-4xl m-auto">location_on</div>
            </div>
            <Attribute icon="location_on" label={label} />
            <Attribute icon="event" label={`Added ${dateAdded.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric" })}`} />
            <Attribute icon="person" label={`${visitorCount} visitors`} />
        </div>
    )
}