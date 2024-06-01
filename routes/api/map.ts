import { FreshContext, Handlers } from "$fresh/server.ts";

const MAP_API_KEY = Deno.env.get("MAP_API_KEY");

export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext) {
        const url = new URL(_req.url);
        const lat = url.searchParams.get("lat") || "";
        const long = url.searchParams.get("long") || "";
        const map = await fetch(`https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/pin-l+555555(${long},${lat})/${long},${lat},15,0/650x400?access_token=${MAP_API_KEY}`);
        return map;
    }
};