export const getPosts = async (prisma) => {
    const posts = await prisma.post.findMany({
        where: {},
        orderBy: [
            {
                id: 'desc',
            },
        ],
        include: {
            author: true,
        }
    })

    return posts
}

export const getSubreddit = async (name, prisma) => {
    return await prisma.subreddit.findUnique({
        where: {
            name,
        },
    })
}

export const getPostsFromSubreddit = async (subreddit, prisma) => {
    const posts = await prisma.post.findMany({
        where: {
            // this could have been subredditName: subreddit, but Prisma's filter on relations is used https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filter-on-relations=
            subreddit: {
                name: subreddit,
            },
        },
        orderBy: [
            {
                id: 'desc',
            },
        ],
        include: {
            author: true,
        },
    })

    return posts
}

export const getPost = async (id, prisma) => {
    return await prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            author: true,
        },
    })
}