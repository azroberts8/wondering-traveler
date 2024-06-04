export interface PostData {
    username: string,
    caption: string,
    image: string
}

export function Post({ username, caption, image }: PostData) {
    return (
        <div>
            <div>User: { username }</div>
            <div>Caption: { caption }</div>
            <div>Image: <img src={image} /></div>
        </div>
    )
}