interface Attrs {
    icon: string;
    label: string;
}

export function Attribute({ icon, label }: Attrs) {
    return (
        <div class="roboto-regular py-0.5">
            <div class="material-symbols-outlined inline-block align-middle px-1">{ icon }</div>
            <div class="inline-block align-middle px-1">{ label }</div>
        </div>
    )
}